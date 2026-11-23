"""Export the parsed entries as JSON/CSV/TSV and optional audio clips."""
import csv
import json
import os
import re
import subprocess
import sys

from korean_romanizer.romanizer import Romanizer
from opencc import OpenCC

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(ROOT, "data")
SOURCE = os.path.join(ROOT, "source", "recordings")
WORK = os.path.join(ROOT, "pipeline", "work")
AUDIO = os.path.join(ROOT, "korean-app", "audio")
BIN = os.path.join(ROOT, "pipeline", "bin")
IN = os.path.join(WORK, "entries_selected.json")
HANJA = os.path.join(WORK, "hanja_map.json")
HANJA_OV = os.path.join(DATA, "hanja_overrides.json")
OVERRIDES = os.path.join(DATA, "overrides.json")
OUT_JSON = os.path.join(DATA, "vocab.json")
OUT_CSV = os.path.join(DATA, "vocab.csv")
OUT_TSV = os.path.join(DATA, "vocab.tsv")
ANKI_TSV = os.path.join(DATA, "anki_notes.tsv")

CC = OpenCC("t2s")
HANJA_DATA = json.load(open(HANJA)) if os.path.exists(HANJA) else {}
HANJA_OVERRIDES = json.load(open(HANJA_OV)) if os.path.exists(HANJA_OV) else {}
HANJA_TRUST = set(json.load(open(os.path.join(DATA, "hanja_trust.json")))) if os.path.exists(
    os.path.join(DATA, "hanja_trust.json")
) else set()


def romanize(s):
    try:
        return Romanizer(s).romanize()
    except Exception:
        return ""


def hanja_for(word):
    if word in HANJA_OVERRIDES:
        h = HANJA_OVERRIDES[word]
        return {"hanja": h, "hanja_simplified": CC.convert(h),
                "candidates": [h], "ambiguous": False, "trusted": True}
    return HANJA_DATA.get(word, {})


def load_overrides():
    if os.path.exists(OVERRIDES):
        return json.load(open(OVERRIDES))
    return {}


def clean_text(s):
    s = re.sub(r"\s+", " ", (s or "")).strip()
    return s


def normalize_word_final(word, example):
    w = re.sub(r"(이에요|예요|입니다|입니까)$", "", word)
    for p in ("에서는", "에게서", "한테서", "으로는", "에서", "에게", "한테",
              "으로", "부터", "까지", "처럼", "보다", "하고", "은", "는",
              "을", "를", "에", "도", "만", "와", "과", "의",
              "로", "께"):
        if w.endswith(p) and len(w) >= len(p) + 1:
            stem = w[:-len(p)]
            if stem in example or (stem + "다") in example:
                w = stem
                break
    return w


def trim_example(word, example):
    if len(example) <= 60 and "," not in example and "，" not in example:
        result = example
    else:
        sents = [s.strip() for s in re.split(r"(?<=[.!?])\s+", example) if s.strip()]
        sents = [s for s in sents if not (len(s) < 30 and ("," in s or "，" in s))]
        st = re.sub(r"(하다|다)$", "", word)
        result = sents[0] if sents else example
        for i, s in enumerate(sents):
            if word in s or (len(st) >= 2 and st in s):
                parts = [s]
                if i > 0 and len(sents[i - 1]) > 15:
                    parts.insert(0, sents[i - 1])
                result = " ".join(parts)
                break
    if word and result.count(word) >= 2:
        result = re.sub(r"\s*" + re.escape(word) + r"\s*$", "", result).strip()
    elif word and result.endswith(word) and len(word) >= 2 and word[:2] in result[:-len(word)]:
        result = result[:-len(word)].strip()
    return result


def main():
    entries = json.load(open(IN))
    ov = load_overrides()
    # stable per-file numbering
    counters = {}
    out = []
    seen = set()
    for e in entries:
        f = e["file"]
        key = f"{f}:{e['start']:.2f}"
        o = ov.get(key, {})
        if o.get("drop"):
            continue
        word = clean_text(o.get("word", e["word"]))
        meaning = clean_text(o.get("meaning_zh", e["meaning_zh"]))
        example = clean_text(o.get("example_ko", e["example_ko"]))
        ex_zh = clean_text(o.get("example_zh", e["example_zh"]))
        word = normalize_word_final(word, example)
        example = trim_example(word, example)
        dedupe_key = (word, example)
        if dedupe_key in seen:
            continue
        seen.add(dedupe_key)
        counters[f] = counters.get(f, 0) + 1
        alts = o.get("alt_meanings", e.get("alt_meanings", []))
        hj = hanja_for(word)
        hanja = o.get("hanja", hj.get("hanja", ""))
        hanja_s = CC.convert(hanja) if hanja else ""
        trusted = (
            "hanja" in o
            or word in HANJA_TRUST
            or hj.get("trusted")
            or (hanja_s and any(ch in meaning for ch in hanja_s))
        )
        if hanja and not trusted:
            hanja = ""
            hanja_s = ""
        out.append({
            "id": f"{f}-{counters[f]:02d}",
            "source_file": f + ".mp3",
            "word": word,
            "romanization": romanize(word),
            "hanja": hanja,
            "hanja_simplified": hanja_s,
            "hanja_candidates": hj.get("candidates", []) if (hj.get("ambiguous") and hanja) else [],
            "meaning_zh": meaning,
            "alt_meanings": alts,
            "example_ko": example,
            "example_romanization": romanize(example),
            "example_zh": ex_zh,
            "meaning_source": e.get("meaning_source", ""),
            "word_source": e.get("word_source", ""),
            "confidence": o.get("confidence", e.get("confidence", "")),
            "audio": {
                "file": f + ".mp3",
                "start": round(e["start"], 2),
                "end": round(e["end"], 2),
                "word_start": round(e["word_start"], 2) if e.get("word_start") is not None else None,
                "word_end": round(e["word_end"], 2) if e.get("word_end") is not None else None,
                "example_start": round(e["ex_start"], 2),
            },
            "flags": e.get("flags", []),
        })
    json.dump(out, open(OUT_JSON, "w"), ensure_ascii=False, indent=1)
    cols = ["id", "word", "romanization", "hanja", "meaning_zh", "alt_meanings",
            "example_ko", "example_romanization", "example_zh", "source_file",
            "meaning_source", "confidence", "flags"]
    with open(OUT_CSV, "w", newline="", encoding="utf-8-sig") as fh:
        w = csv.writer(fh)
        w.writerow(cols)
        for e in out:
            w.writerow([
                e["id"], e["word"], e["romanization"], e["hanja"], e["meaning_zh"],
                "; ".join(e["alt_meanings"]), e["example_ko"], e["example_romanization"],
                e["example_zh"], e["source_file"], e["meaning_source"],
                e["confidence"], ",".join(e["flags"]),
            ])
    with open(OUT_TSV, "w", encoding="utf-8") as fh:
        fh.write("\t".join(cols) + "\n")
        for e in out:
            fh.write("\t".join([
                e["id"], e["word"], e["romanization"], e["hanja"], e["meaning_zh"],
                "; ".join(e["alt_meanings"]), e["example_ko"], e["example_romanization"],
                e["example_zh"], e["source_file"], e["meaning_source"],
                e["confidence"], ",".join(e["flags"]),
            ]) + "\n")
    with open(ANKI_TSV, "w", encoding="utf-8") as fh:
        fh.write("Word\tRomanization\tHanja\tMeaning\tAltMeanings\tExampleKO\tExampleRomanization\tExampleZH\tWordAudio\tExampleAudio\tSource\tTags\n")
        for e in out:
            fh.write("\t".join([
                e["word"], e["romanization"], e["hanja"], e["meaning_zh"],
                "; ".join(e["alt_meanings"]), e["example_ko"], e["example_romanization"],
                e["example_zh"], f"[sound:{e['id']}_word.mp3]",
                f"[sound:{e['id']}_example.mp3]", e["source_file"],
                f"file_{e['id'][:3]} {'needs_review' if e['confidence'] != 'high' else 'verified'}",
            ]) + "\n")
    print("wrote", OUT_JSON, OUT_CSV, OUT_TSV, ANKI_TSV, len(out), "entries")


if __name__ == "__main__":
    main()
