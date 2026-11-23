"""Build a word -> hanja map from Korean Wiktionary wikitext."""
import json
import os
import re

from opencc import OpenCC
from wordfreq import zipf_frequency

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(ROOT, "data")
SOURCE = os.path.join(ROOT, "source", "recordings")
WORK = os.path.join(ROOT, "pipeline", "work")
AUDIO = os.path.join(ROOT, "korean-app", "audio")
BIN = os.path.join(ROOT, "pipeline", "bin")
WT = os.path.join(WORK, "wiktionary.json")
OUT = os.path.join(WORK, "hanja_map.json")
CC = OpenCC("t2s")

CJK = r"[\u4e00-\u9fff]"


def candidates(text):
    out = []
    # {{어원|感氣|...}}
    for m in re.finditer(r"\{\{어원\|(" + CJK + r"+)\|", text):
        out.append(m.group(1))
    # {{ko-etym-Sino|警||察}} -> 警察
    for m in re.finditer(r"\{\{ko-etym-Sino\|([^}]*)\}\}", text):
        parts = [p.strip() for p in m.group(1).split("|")]
        joined = "".join(p for p in parts if re.fullmatch(CJK + "+", p))
        if joined:
            out.append(joined)
    # *어원: 한자 [[家族]]
    for m in re.finditer(r"어원:\s*한자\s*\[\[([^\]|]+)", text):
        s = m.group(1).strip()
        if re.fullmatch(CJK + "+", s):
            out.append(s)
    # {{ko-noun|hanja=警察}}
    for m in re.finditer(r"hanja=(" + CJK + r"+)", text):
        out.append(m.group(1))
    # compound etymology: 어원: [[한]] + [[국]] (한자 [[韓國]])
    for line in text.splitlines():
        if "<" in line:
            continue
        m = re.search(r"\(한자\s*\[\[([^\]|]+)\]\]\)", line)
        if m and re.fullmatch(CJK + "+", m.group(1).strip()):
            out.append(m.group(1).strip())
    return list(dict.fromkeys(out))


def main():
    vocab = json.load(open(os.path.join(DATA, "vocab.json")))
    wt = json.load(open(WT))
    words = sorted({e["word"] for e in vocab})
    hanja_map = {}
    for w in words:
        text = wt.get(w, "")
        cands = candidates(text) if text else []
        # drop candidates that are not really the headword's hanja
        cands = [c for c in cands if 1 <= len(c) <= 6]
        if not cands:
            hanja_map[w] = {"hanja": "", "hanja_simplified": "", "candidates": [], "ambiguous": False}
            continue
        meanings = [e["meaning_zh"] for e in vocab if e["word"] == w]
        best, best_score = None, -1
        for c in cands:
            cs = CC.convert(c)
            score = zipf_frequency(cs, "zh")
            for m in meanings:
                if cs == m:
                    score += 10
                elif cs in m or m in cs:
                    score += 8
                score += 3 * len(set(cs) & set(m))
            if score > best_score:
                best, best_score = c, score
        hanja_map[w] = {
            "hanja": best if best_score > 0 else "",
            "hanja_simplified": CC.convert(best) if best and best_score > 0 else "",
            "candidates": cands,
            "ambiguous": len(cands) > 1,
        }
    json.dump(hanja_map, open(OUT, "w"), ensure_ascii=False, indent=1)
    n = sum(1 for v in hanja_map.values() if v["hanja"])
    print("words", len(words), "with hanja", n)
    for w in ["가구", "가족", "가격", "학교", "사람", "가게", "회사", "한국", "경찰", "감기", "경제"]:
        print(w, hanja_map.get(w))


if __name__ == "__main__":
    main()
