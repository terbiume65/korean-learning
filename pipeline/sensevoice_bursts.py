"""Per-burst transcription with SenseVoice (fast, multilingual, language ID).

Output: pipeline/work/bursts_sv/<stem>.json
"""
import json
import os
import re
import subprocess
import sys

import numpy as np

from mlx_audio.stt.utils import load_model

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(ROOT, "data")
SOURCE = os.path.join(ROOT, "source", "recordings")
WORK = os.path.join(ROOT, "pipeline", "work")
AUDIO = os.path.join(ROOT, "korean-app", "audio")
BIN = os.path.join(ROOT, "pipeline", "bin")
SRC = SOURCE
OUT = os.path.join(WORK, "bursts_sv")
os.makedirs(OUT, exist_ok=True)


def decode(path):
    raw = subprocess.run(
        [os.path.join(BIN, "ffmpeg"), "-y", "-hide_banner", "-loglevel", "error",
         "-i", path, "-ar", "16000", "-ac", "1", "-f", "f32le", "-"],
        capture_output=True, check=True,
    ).stdout
    return np.frombuffer(raw, dtype=np.float32)


def speech_bursts(path):
    out = subprocess.run(
        [os.path.join(BIN, "ffmpeg"), "-hide_banner", "-i", path,
         "-af", "silencedetect=noise=-35dB:d=0.25", "-f", "null", "-"],
        capture_output=True, text=True,
    ).stderr
    starts = [float(x) for x in re.findall(r"silence_start: ([\d.]+)", out)]
    ends = [float(x) for x in re.findall(r"silence_end: ([\d.]+)", out)]
    m = re.search(r"Duration: (\d+):(\d+):([\d.]+)", out)
    dur = int(m.group(1)) * 3600 + int(m.group(2)) * 60 + float(m.group(3))
    segs, prev = [], 0.0
    for s, e in zip(starts, ends):
        if s - prev > 0.15:
            segs.append((prev, s))
        prev = e
    if dur - prev > 0.15:
        segs.append((prev, dur))
    return segs


def counts(text):
    return (
        len(re.findall(r"[\uac00-\ud7a3]", text)),
        len(re.findall(r"[\u4e00-\u9fff]", text)),
    )


files = sorted(
    (f for f in os.listdir(SRC) if f.endswith(".mp3")),
    key=lambda f: int(re.match(r"(\d+)", f).group(1)),
)
if len(sys.argv) > 1:
    wanted = set(sys.argv[1:])
    files = [f for f in files if f[:-4] in wanted]

model = load_model("mlx-community/SenseVoiceSmall")

for i, name in enumerate(files, 1):
    stem = name[:-4]
    dest = os.path.join(OUT, stem + ".json")
    if os.path.exists(dest):
        continue
    path = os.path.join(SRC, name)
    audio = decode(path)
    bursts = []
    for a, b in speech_bursts(path):
        seg = audio[int(a * 16000): int(b * 16000)]
        o = model.generate(seg, language="auto")
        ok = model.generate(seg, language="ko")
        text = (o.text or "").strip()
        text_ko = (ok.text or "").strip()
        h, c = counts(text)
        hk, ck = counts(text_ko)
        bursts.append({
            "start": round(a, 2),
            "end": round(b, 2),
            "dur": round(b - a, 2),
            "lang": o.language,
            "text": text,
            "text_ko": text_ko,
            "hangul": h,
            "cjk": c,
            "hangul_ko": hk,
            "cjk_ko": ck,
        })
    json.dump({"file": name, "bursts": bursts}, open(dest, "w"),
              ensure_ascii=False, indent=1)
    print(f"[{i}/{len(files)}] {name} bursts={len(bursts)}", flush=True)

print("DONE", flush=True)
