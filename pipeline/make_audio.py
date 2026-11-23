"""Slice per-entry, word, and example audio clips from the source MP3s."""
import json
import os
import subprocess

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(ROOT, "data")
SOURCE = os.path.join(ROOT, "source", "recordings")
WORK = os.path.join(ROOT, "pipeline", "work")
AUDIO = os.path.join(ROOT, "korean-app", "audio")
BIN = os.path.join(ROOT, "pipeline", "bin")
VOCAB = os.path.join(DATA, "vocab.json")
os.makedirs(AUDIO, exist_ok=True)


def cut(src, start, end, dest):
    if os.path.exists(dest) and os.path.getsize(dest) > 500:
        return
    start = max(0.0, start - 0.12)
    dur = max(0.4, (end - start) + 0.18)
    subprocess.run([
        os.path.join(BIN, "ffmpeg"), "-y", "-hide_banner", "-loglevel", "error",
        "-ss", f"{start:.3f}", "-t", f"{dur:.3f}", "-i", src,
        "-ac", "1", "-ar", "44100", "-b:a", "48k", dest,
    ], check=True)


def main():
    entries = json.load(open(VOCAB))
    for i, e in enumerate(entries, 1):
        f = e["source_file"]
        src = os.path.join(SOURCE, f)
        base = e["id"]
        a = e["audio"]
        cut(src, a["start"], a["end"], os.path.join(AUDIO, base + ".mp3"))
        if a.get("word_start") is not None and a.get("word_end") is not None:
            cut(src, a["word_start"], a["word_end"], os.path.join(AUDIO, base + "_word.mp3"))
        cut(src, a["example_start"], a["end"], os.path.join(AUDIO, base + "_example.mp3"))
        if i % 50 == 0:
            print(i, "/", len(entries), flush=True)
    print("audio done", len(entries))


if __name__ == "__main__":
    main()
