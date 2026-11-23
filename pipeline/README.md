# Deck pipeline

Scripts that produced `data/` and `korean-app/audio/` from `source/recordings/`.

They use paths relative to the project root, so they can be run from anywhere:

```bash
cd "/Users/terbiume65/Documents/Daily Life/korean-learning"
.venv/bin/python pipeline/transcribe_all.py
.venv/bin/python pipeline/sensevoice_bursts.py
.venv/bin/python pipeline/parse_v2.py
.venv/bin/python pipeline/translate_select.py
.venv/bin/python pipeline/build_hanja.py
.venv/bin/python pipeline/export_deck.py
.venv/bin/python pipeline/make_audio.py
.venv/bin/python pipeline/make_apkg.py
```

| Path | Purpose |
|---|---|
| `bin/ffmpeg` | Bundled ffmpeg used for audio slicing |
| `work/` | Intermediates: transcripts, burst data, caches and syllable maps |

Inputs: `source/recordings/`, `data/`, `korean-app/audio/`. Outputs are written back to `data/` and `korean-app/audio/`.
