"""Build an Anki .apkg from vocab.json and the generated audio clips."""
import hashlib
import json
import os

import genanki

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(ROOT, "data")
SOURCE = os.path.join(ROOT, "source", "recordings")
WORK = os.path.join(ROOT, "pipeline", "work")
AUDIO = os.path.join(ROOT, "korean-app", "audio")
BIN = os.path.join(ROOT, "pipeline", "bin")
VOCAB = os.path.join(DATA, "vocab.json")
OUT = os.path.join(DATA, "Korean_Vocab.apkg")

model = genanki.Model(
    1736450010,
    "Korean Vocab (audio)",
    fields=[
        {"name": "Word"},
        {"name": "Romanization"},
        {"name": "Hanja"},
        {"name": "Meaning"},
        {"name": "ExampleKO"},
        {"name": "ExampleRomanization"},
        {"name": "ExampleZH"},
        {"name": "WordAudio"},
        {"name": "ExampleAudio"},
    ],
    templates=[
        {
            "name": "Card 1",
            "qfmt": "{{Word}}<br><span class=rom>{{Romanization}}</span><br>{{WordAudio}}",
            "afmt": "{{FrontSide}}<hr id=answer>{{Hanja}}<br><b>{{Meaning}}</b><br><br>{{ExampleKO}}<br><span class=rom>{{ExampleRomanization}}</span><br>{{ExampleZH}}<br>{{ExampleAudio}}",
        }
    ],
    css="""
.card { font-family: -apple-system, "Noto Sans KR", sans-serif; font-size: 20px; text-align: center; }
.rom { color: #666; font-size: 16px; }
""",
)

deck = genanki.Deck(1736450011, "Korean Vocabulary (from audio)")


def guid(s):
    return hashlib.sha1(s.encode("utf-8")).hexdigest()[:16]


def main():
    data = json.load(open(VOCAB))
    media = []
    for e in data:
        wav = os.path.join(AUDIO, e["id"] + "_word.mp3")
        exa = os.path.join(AUDIO, e["id"] + "_example.mp3")
        if not (os.path.exists(wav) and os.path.exists(exa)):
            continue
        media += [wav, exa]
        note = genanki.Note(
            model=model,
            fields=[
                e["word"],
                e["romanization"],
                e.get("hanja", ""),
                e["meaning_zh"],
                e["example_ko"],
                e["example_romanization"],
                e["example_zh"],
                f"[sound:{e['id']}_word.mp3]",
                f"[sound:{e['id']}_example.mp3]",
            ],
            guid=guid(e["id"]),
        )
        deck.add_note(note)
    package = genanki.Package(deck)
    package.media_files = media
    package.write_to_file(OUT)
    print("wrote", OUT, "notes", len(deck.notes), "media", len(media))


if __name__ == "__main__":
    main()
