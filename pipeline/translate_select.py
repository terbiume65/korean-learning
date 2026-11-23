"""Translate candidates + examples with Google, then select the best word/meaning."""
import glob
import json
import os
import re
import subprocess
import sys
import time
import urllib.parse

from opencc import OpenCC

CC = OpenCC("t2s")

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(ROOT, "data")
SOURCE = os.path.join(ROOT, "source", "recordings")
WORK = os.path.join(ROOT, "pipeline", "work")
AUDIO = os.path.join(ROOT, "korean-app", "audio")
BIN = os.path.join(ROOT, "pipeline", "bin")
RAW = os.path.join(WORK, "entries_raw")
OUT = os.path.join(WORK, "entries_selected.json")

BASE = "https://clients5.google.com/translate_a/t?client=dict-chrome-ex&sl=ko&tl=zh-CN&"
CACHE_PATH = os.path.join(WORK, "translation_cache.json")


def load_cache():
    if os.path.exists(CACHE_PATH):
        return json.load(open(CACHE_PATH))
    return {}


def translate_many(qs, cache):
    todo = [q for q in dict.fromkeys(qs) if q and q not in cache]
    for i in range(0, len(todo), 40):
        batch = todo[i:i + 40]
        url = BASE + "&".join("q=" + urllib.parse.quote(q) for q in batch)
        for attempt in range(3):
            p = subprocess.run(["curl", "-sS", "-m", "60", url], capture_output=True, text=True)
            try:
                data = json.loads(p.stdout)
                if isinstance(data, list) and len(data) == len(batch):
                    for q, t in zip(batch, data):
                        cache[q] = t
                    break
            except Exception:
                pass
            time.sleep(2 + attempt * 3)
        else:
            print("FAILED batch", batch[:3], flush=True)
        time.sleep(0.35)
        if (i // 40) % 5 == 0:
            json.dump(cache, open(CACHE_PATH, "w"), ensure_ascii=False, indent=0)
    return cache


def stem(w):
    if w.endswith("하다") and len(w) > 2:
        return w[:-2]
    if w.endswith("다") and len(w) > 1:
        return w[:-1]
    return w


def char_overlap(a, b):
    return len(set(a) & set(b))


def score_word(c, ex_ko, ex_zh, cache):
    w = c["text"]
    t = CC.convert(cache.get(w, ""))
    score = 0.0
    if w in ex_ko:
        score += 5
    st = stem(w)
    if len(st) >= 1 and st in ex_ko:
        score += 4
    if t:
        if t in ex_zh:
            score += 10
        score += 1.5 * char_overlap(t, ex_zh)
        if len(t) <= 6:
            score += 1
    score += {"whisper": 3, "burst_ko": 2, "burst_auto": 1, "example": 1}.get(c["source"], 0)
    if c["source"] == "example":
        if c.get("noun"):
            score += 3
        if len(w) > 4:
            score -= 3
    return score


def pick_word(wc, ex_ko, ex_zh, cache):
    if not wc:
        return None
    main = [c for c in wc if c["source"] != "example"]
    fallback = [c for c in wc if c["source"] == "example"]
    best = max(main, key=lambda c: (score_word(c, ex_ko, ex_zh, cache), -c["start"])) if main else None
    best_score = score_word(best, ex_ko, ex_zh, cache) if best else -1
    if best_score < 4 and fallback:
        alt = max(fallback, key=lambda c: (score_word(c, ex_ko, ex_zh, cache), -c["start"]))
        if score_word(alt, ex_ko, ex_zh, cache) > best_score:
            best = alt
    if best:
        best = normalize_word(best, wc, ex_ko, ex_zh, cache)
        # expand a truncated word using a longer form that appears in the example
        longer = [c for c in wc
                  if c is not best and len(c["text"]) > len(best["text"])
                  and c["text"].startswith(best["text"])
                  and c["text"] in ex_ko
                  and CC.convert(cache.get(c["text"], "")) in ex_zh]
        if longer:
            best = max(longer, key=lambda c: len(c["text"]))
            best["text"] = dedupe_word(best["text"])
    return best


def dedupe_word(w):
    for n in (3, 2):
        if len(w) >= 2 * n and w[-n:] == w[-2 * n:-n]:
            return w[:-n]
    if len(w) >= 3 and w[-1] == w[-2]:
        return w[:-1]
    return w


VERB_END = ("고", "는", "아", "어", "지", "게", "면", "서", "니까", "지만",
            "다가", "려고", "러", "은", "을", "던", "해", "나", "가")


def normalize_word(chosen, wc, ex_ko, ex_zh, cache):
    w = chosen["text"]
    if w.endswith("다"):
        return chosen
    looks_verbal = any(w + e in ex_ko for e in VERB_END)
    if not looks_verbal:
        return chosen
    options = []
    for c in wc:
        cw = c["text"]
        if cw == w or not cw.endswith("다"):
            continue
        if cw.startswith(w) or w in cw or (len(w) >= 2 and w[:-1] in cw):
            options.append(c)
    if not options:
        return chosen
    return max(options, key=lambda c: (score_word(c, ex_ko, ex_zh, cache), len(c["text"])))


def split_meaning(m):
    m = CC.convert(m)
    parts = [p.strip() for p in re.split(r"[、,，/;；]", m) if p.strip()]
    out = list(parts) if parts else [m]
    # unpack concatenated glosses like 街道距离材料
    for p in parts or [m]:
        if len(p) >= 4:
            for n in (2, 3):
                for i in range(0, len(p) - n + 1):
                    out.append(p[i:i + n])
    return list(dict.fromkeys(out))


def tidy_meaning(m):
    m = CC.convert(m or "").strip()
    m = re.sub(r"[或和与及等]+$", "", m).strip()
    if not m or len(m) > 6:
        return ""
    if len(m) > 2 and m[0] in "我你他她它":
        return ""
    return m


def pick_meaning(cands, word_zh, ex_zh):
    word_zh = tidy_meaning(word_zh)
    ex_zh = CC.convert(ex_zh) if ex_zh else ""
    orig_parts = []
    for m in cands:
        orig_parts.extend(p.strip() for p in re.split(r"[、,，/;；]", CC.convert(m)) if p.strip())
    parts = []
    for m in orig_parts or [word_zh]:
        parts.extend(split_meaning(m))
    parts = [p for p in dict.fromkeys(tidy_meaning(p) for p in parts) if p]
    if not parts:
        return word_zh, []
    in_ex = [p for p in parts if len(p) >= 2 and p in ex_zh]
    if word_zh and word_zh in ex_zh:
        primary = max([word_zh] + in_ex, key=len)
    elif in_ex:
        primary = max(in_ex, key=len)
    elif word_zh and char_overlap(word_zh, ex_zh) >= 1:
        primary = word_zh
    else:
        plausible = [p for p in parts if 2 <= len(p) <= 4]
        if plausible:
            plausible.sort(key=lambda p: (
                0 if len(p) <= 3 else 1,
                -char_overlap(p, word_zh),
                -char_overlap(p, ex_zh),
                parts.index(p),
            ))
            primary = plausible[0]
        else:
            primary = word_zh
    alts = [p for p in orig_parts
            if p != primary and 2 <= len(p) <= 4 and p in ex_zh]
    return primary, list(dict.fromkeys(alts))[:2]


def main(files=None):
    cache = load_cache()
    raws = {}
    for p in sorted(glob.glob(os.path.join(RAW, "*.json"))):
        sid = os.path.basename(p)[:-5]
        if files and sid not in files:
            continue
        raws[sid] = json.load(open(p))
    qs = []
    for sid, entries in raws.items():
        for e in entries:
            qs.append(e["example"])
            qs.extend(c["text"] for c in e["word_candidates"])
    translate_many(qs, cache)
    json.dump(cache, open(CACHE_PATH, "w"), ensure_ascii=False, indent=0)

    out = []
    for sid, entries in raws.items():
        for e in entries:
            ex_ko = e["example"]
            ex_zh = CC.convert(cache.get(ex_ko, ""))
            chosen = pick_word(e["word_candidates"], ex_ko, ex_zh, cache)
            if not chosen:
                continue
            word = chosen["text"]
            word_zh = CC.convert(cache.get(word, ""))
            meaning, alts = pick_meaning(e["meaning_candidates"], word_zh, ex_zh)
            st = stem(word)
            flags = []
            word_ok = bool(word in ex_ko or (len(st) >= 1 and st in ex_ko)
                           or (word and word[0] in ex_ko))
            if not word_ok:
                flags.append("word_not_in_example")
            meaning_ok = bool(meaning and (meaning in ex_zh or char_overlap(meaning, ex_zh) > 0))
            if not meaning_ok:
                flags.append("meaning_unverified")
            if len(word) <= 1:
                flags.append("short_word")
            confidence = "high" if (word_ok and meaning_ok) else ("medium" if (word_ok or meaning_ok) else "low")
            out.append({
                "file": sid,
                "word": word,
                "meaning_zh": meaning,
                "alt_meanings": alts,
                "example_ko": ex_ko,
                "example_zh": ex_zh,
                "word_zh_literal": word_zh,
                "meaning_source": "translation" if meaning == word_zh else "audio",
                "word_source": chosen["source"],
                "meaning_candidates": e["meaning_candidates"],
                "flags": flags,
                "confidence": confidence,
                "start": e["start"],
                "end": e["end"],
                "ex_start": e["ex_start"],
                "word_start": e.get("word_start"),
                "word_end": e.get("word_end"),
            })
    out.sort(key=lambda x: (int(x["file"]), x["start"]))
    json.dump(out, open(OUT, "w"), ensure_ascii=False, indent=1)
    print("entries:", len(out), "translations:", len(cache))
    return out


if __name__ == "__main__":
    main(set(sys.argv[1:]) or None)
