"""Parse bursts into raw entries with word/meaning candidates."""
import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(ROOT, "data")
SOURCE = os.path.join(ROOT, "source", "recordings")
WORK = os.path.join(ROOT, "pipeline", "work")
AUDIO = os.path.join(ROOT, "korean-app", "audio")
BIN = os.path.join(ROOT, "pipeline", "bin")
SV = os.path.join(WORK, "bursts_sv")
TR = os.path.join(WORK, "transcripts")
OUT = os.path.join(WORK, "entries_raw")
os.makedirs(OUT, exist_ok=True)

KANA = re.compile(r"[\u3040-\u30ffー]")
HANGUL = re.compile(r"[\uac00-\ud7a3]")
CJK = re.compile(r"[\u4e00-\u9fff]")
SENT_END = re.compile(r"(요|까|죠|네|습니다|니다|어요|아요|지요|군요|는데요)[.!?]?$")


def overlap(a, b, c, d):
    return max(0.0, min(b, d) - max(a, c))


def nospace(s):
    return re.sub(r"\s+", "", s)


def similar(a, b):
    a, b = nospace(a), nospace(b)
    if not a or not b:
        return False
    if a == b:
        return True
    n = 0
    for x, y in zip(a, b):
        if x != y:
            break
        n += 1
    return n >= max(1, min(len(a), len(b)) - 1)


def is_example(b):
    text = b["text"]
    if "," in text or "，" in text:
        parts = [p.strip() for p in re.split(r"[,，]", text) if p.strip()]
        if len(parts) >= 2 and similar(parts[0], parts[1]):
            return False
    toks = (b["text_ko"] or text).split()
    if b["dur"] < 1.0:
        return False
    if b["dur"] >= 1.5 and b["hangul"] >= 4:
        return True
    if b["dur"] >= 1.0 and b["hangul"] >= 5 and len(toks) >= 3:
        return True
    if b["lang"] == "ko" and b["hangul"] >= 5 and b["dur"] >= 1.0:
        return True
    return False


def clean_word(s):
    s = nospace(s)
    s = re.sub(r"[^\uac00-\ud7a3]", "", s)
    return s


def clean_meaning(s):
    s = s.strip(" .,!?、，。:;·…")
    if not s or KANA.search(s) or re.search(r"[A-Za-z0-9]", s):
        return ""
    if not CJK.search(s):
        return ""
    if len(s) > 8:
        return ""
    return s


def load(sid):
    bursts = json.load(open(os.path.join(SV, sid + ".json")))["bursts"]
    tr = json.load(open(os.path.join(TR, sid + ".json")))
    return bursts, tr["ko"]["segments"], tr.get("zh", {}).get("segments", [])


def parse_file(sid):
    bursts, ko_segs, zh_segs = load(sid)
    examples = []
    i = 0
    while i < len(bursts):
        if not is_example(bursts[i]):
            i += 1
            continue
        group = [bursts[i]]
        j = i + 1
        while j < len(bursts):
            b = bursts[j]
            if is_example(b) and b["start"] - group[-1]["end"] < 1.2:
                # only merge if no non-example burst in between
                between = [x for x in bursts
                           if x["start"] >= group[-1]["end"] - 0.05 and x["end"] <= b["start"] + 0.05]
                if not between:
                    group.append(b)
                    j += 1
                    continue
            break
        examples.append(group)
        i = j

    entries = []
    prev_end = 0.0
    for group in examples:
        ex_start, ex_end = group[0]["start"], group[-1]["end"]
        shorts = [b for b in bursts if b["start"] >= prev_end - 0.1 and b["end"] <= ex_start + 0.1]
        # word candidates from whisper word segments in the word-repetition region
        wc = []
        word_pool = shorts[:2]
        if word_pool:
            region_start = word_pool[0]["start"] - 0.3
            region_end = word_pool[-1]["end"] + 0.3
        else:
            region_start, region_end = ex_start - 3.0, ex_start
        for s in ko_segs:
            if overlap(region_start, region_end, s["start"], s["end"]) > 0.2:
                toks = s["text"].split()
                if len(toks) <= 2 and not SENT_END.search(s["text"]):
                    w = clean_word(s["text"].split(",")[0])
                    if w:
                        wc.append({"text": w, "source": "whisper", "start": s["start"], "end": s["end"]})
        # burst candidates
        for b in word_pool:
            for txt, src in ((b["text_ko"], "burst_ko"), (b["text"], "burst_auto")):
                w = clean_word(txt.split(",")[0]) if txt else ""
                if w and len(w) <= 10 and (len(w) >= 2 or src == "burst_ko"):
                    wc.append({"text": w, "source": src, "start": b["start"], "end": b["end"]})
        # drop 1-char fragments that are substrings of a longer candidate
        texts = {c["text"] for c in wc}
        wc = [c for c in wc if not (len(c["text"]) == 1 and any(c["text"] != t and c["text"] in t for t in texts))]
        # dedupe candidates by text, keeping strongest source
        rank = {"whisper": 3, "burst_ko": 2, "burst_auto": 1}
        best = {}
        for c in wc:
            if c["text"] not in best or rank[c["source"]] > rank[best[c["text"]]["source"]]:
                best[c["text"]] = c
        wc = sorted(best.values(), key=lambda c: (-rank[c["source"]], c["start"]))
        # fallback: nouns from the example, for words whisper/sensevoice missed
        STOP = {"저", "제", "나", "너", "우리", "오늘", "어제", "내일", "지금",
                "여기", "거기", "저기", "이것", "그것", "저것", "정말", "아주",
                "너무", "많이", "그", "이", "저", "것", "수", "때", "등", "및",
                "그리고", "하지만", "그래서", "아니", "네", "예"}
        example_guess = " ".join(
            s["text"] for s in ko_segs
            if overlap(ex_start, ex_end, s["start"], s["end"]) > 0.35
        )
        nouns = []
        for tok in re.findall(r"[\uac00-\ud7a3]+", example_guess):
            base = tok
            stripped = False
            for p in ("에서는", "에게서", "한테서", "으로는", "에서", "에게", "한테",
                      "으로", "부터", "까지", "처럼", "보다", "하고", "은", "는",
                      "이", "가", "을", "를", "에", "도", "만", "와", "과", "의",
                      "로", "께", "야"):
                if base.endswith(p) and len(base) > len(p) + 1:
                    base = base[:-len(p)]
                    stripped = True
                    break
            if len(base) >= 2 and base not in STOP and base not in nouns:
                nouns.append(base)
                wc.append({"text": base, "source": "example", "noun": stripped,
                           "start": ex_start, "end": ex_end})
        # mark repetitions (first two similar candidates)
        reps = []
        for c in wc:
            if not reps:
                reps.append(c)
            elif len(reps) < 2 and similar(c["text"], reps[0]["text"]):
                reps.append(c)
        rep_texts = {c["text"] for c in reps}
        # meanings: short bursts after the word-repetition region
        word_ids = {id(b) for b in word_pool}
        mc = []
        for b in shorts:
            if id(b) in word_ids:
                continue
            m = clean_meaning(b["text"])
            if m and m not in mc:
                mc.append(m)
            else:
                for z in zh_segs:
                    if overlap(b["start"], b["end"], z["start"], z["end"]) > 0.4:
                        m2 = clean_meaning(z["text"])
                        if m2 and m2 not in mc:
                            mc.append(m2)
                        break
        # example text from ko segments
        parts = []
        for s in ko_segs:
            if overlap(ex_start, ex_end, s["start"], s["end"]) > 0.35 and HANGUL.search(s["text"]):
                parts.append(s["text"].strip())
        example = " ".join(parts)
        if not example:
            example = " ".join(b["text_ko"] or b["text"] for b in group if HANGUL.search(b["text_ko"] or b["text"]))
        entries.append({
            "file": sid,
            "word_candidates": wc,
            "rep_texts": sorted(rep_texts),
            "meaning_candidates": mc,
            "example": example,
            "start": shorts[0]["start"] if shorts else ex_start,
            "end": ex_end,
            "ex_start": ex_start,
            "word_start": word_pool[0]["start"] if word_pool else (reps[0]["start"] if reps else None),
            "word_end": word_pool[-1]["end"] if word_pool else (reps[-1]["end"] if reps else None),
        })
        prev_end = ex_end
    return entries


if __name__ == "__main__":
    ids = sys.argv[1:]
    if not ids:
        ids = [f[:-5] for f in sorted(os.listdir(SV)) if f.endswith(".json")]
    for sid in ids:
        if not (os.path.exists(os.path.join(SV, sid + ".json")) and
                os.path.exists(os.path.join(TR, sid + ".json"))):
            continue
        entries = parse_file(sid)
        json.dump(entries, open(os.path.join(OUT, sid + ".json"), "w"), ensure_ascii=False, indent=1)
        print("=" * 15, sid, len(entries))
        for e in entries:
            print("  ", [c["text"] for c in e["word_candidates"]][:6], "|", e["meaning_candidates"][:5], "|", e["example"][:60])
