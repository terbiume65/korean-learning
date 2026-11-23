import json
import os
import re
import sys
import time

import mlx_whisper

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(ROOT, "data")
SOURCE = os.path.join(ROOT, "source", "recordings")
WORK = os.path.join(ROOT, "pipeline", "work")
AUDIO = os.path.join(ROOT, "korean-app", "audio")
BIN = os.path.join(ROOT, "pipeline", "bin")
SRC = SOURCE
OUT = os.path.join(WORK, "transcripts")
os.makedirs(OUT, exist_ok=True)

MODEL = "mlx-community/whisper-large-v3-turbo"

files = sorted(
    (f for f in os.listdir(SRC) if f.endswith(".mp3")),
    key=lambda f: int(re.match(r"(\d+)", f).group(1)),
)

for i, name in enumerate(files, 1):
    stem = name[:-4]
    dest = os.path.join(OUT, stem + ".json")
    if os.path.exists(dest):
        print(f"[{i}/{len(files)}] skip {name}", flush=True)
        continue
    t0 = time.time()
    rec = {"file": name}
    for lang in ("ko",):
        r = mlx_whisper.transcribe(
            os.path.join(SRC, name),
            path_or_hf_repo=MODEL,
            language=lang,
            word_timestamps=False,
            condition_on_previous_text=False,
            verbose=False,
        )
        rec[lang] = {
            "language": r.get("language"),
            "segments": [
                {
                    "start": round(s["start"], 2),
                    "end": round(s["end"], 2),
                    "text": s["text"].strip(),
                    "avg_logprob": round(s.get("avg_logprob", 0), 3),
                    "no_speech_prob": round(s.get("no_speech_prob", 0), 3),
                    "words": [
                        {
                            "word": w["word"],
                            "start": round(w["start"], 2),
                            "end": round(w["end"], 2),
                            "probability": round(w.get("probability", 0), 3),
                        }
                        for w in s.get("words", [])
                    ],
                }
                for s in r["segments"]
            ],
        }
        print(f"[{i}/{len(files)}] {name} {lang} {time.time() - t0:.1f}s", flush=True)
    with open(dest, "w", encoding="utf-8") as fh:
        json.dump(rec, fh, ensure_ascii=False, indent=1)

print("DONE", flush=True)
