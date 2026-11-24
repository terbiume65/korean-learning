# Korean Learning Project

A local-first Korean learning project: a 1,315-entry vocabulary deck, a complete beginner grammar path, a graded reader, a small café game, and the pipeline that produced the deck.

## Project layout

| Folder | Contents |
|---|---|
| `korean-app/` | Self-contained web app: UI, audio, embedded deck, grammar and reader data |
| `data/` | Deck exports, Anki deck, review corrections and pipeline overrides |
| `source/recordings/` | 174 original Korean MP3 recordings |
| `source/grammar-src/` | Scanned *Korean Grammar in Use: Beginner* reference PDF |
| `pipeline/` | Transcription/translation/export scripts, `ffmpeg`, and intermediate work |
| `.venv/` | Optional hidden Python environment for re-running the pipeline |
| `supabase/` | Database table and RLS policy for optional cross-device sync |

The app is self-contained. The remaining folders are source material and the offline pipeline used to build the deck.

## Run the app

Double-click **`korean-app/start.command`**, or:

From the parent `Daily Life` folder:

```bash
cd korean-learning/korean-app
python3 serve.py
```

Then open http://127.0.0.1:8765/

The app includes:

- **Today** — recognition/recall study, FSRS scheduling, daily goals and forecasts
- **Reader** — 12 graded comprehensible-input texts with hover/tap glosses, Chinese translation on demand, line-by-line/whole-text Korean text-to-speech and reading progress
- **Grammar** — all 112 items from *Korean Grammar in Use: Beginner* (Getting Ready + Units 1–24), with unit conversations, hover glosses and three exercise types per lesson
- **Progress** — mastery, activity, grammar stars and reading progress
- **Word List** — search/filter all 1,315 words
- **Settings** — limits, audio, theme, export/import and reset
- **Hangul Café** — beans and grammar stars buy/synthesize café items and study charms

See `korean-app/README.md` for the full app guide.

## Deck data

| File | Description |
|---|---|
| `data/vocab.json` | Main data: 1,315 entries with word, romanization, hanja, Chinese meaning, example, example romanization/translation, and audio timestamps |
| `data/vocab.csv` / `data/vocab.tsv` | Full flat export |
| `data/anki_notes.tsv` | Clean 12-field tab-separated file for Anki import |
| `data/Korean_Vocab.apkg` | Ready-to-import Anki deck (1,315 notes, word + example audio) |
| `data/review_changes.csv` | The 195 manual corrections made during the review pass |
| `data/overrides.json`, `data/hanja_overrides.json`, `data/hanja_trust.json` | Manual pipeline overrides |
| `korean-app/audio/` | 3,945 clips: `<id>.mp3` (word + example), `<id>_word.mp3`, `<id>_example.mp3` |
| `pipeline/work/` | Intermediate transcripts, burst data and caches |

## JSON fields

```json
{
  "id": "010-02",
  "source_file": "010.mp3",
  "word": "가격",
  "romanization": "gagyeok",
  "hanja": "價格",
  "hanja_simplified": "价格",
  "hanja_candidates": ["價格", "加擊", "家格"],
  "meaning_zh": "价格",
  "alt_meanings": [],
  "example_ko": "사과 가격이 싸요.",
  "example_romanization": "sagwa gagyeogi ssayo.",
  "example_zh": "苹果很便宜。",
  "meaning_source": "audio",
  "word_source": "whisper",
  "confidence": "high",
  "audio": {
    "file": "010.mp3",
    "start": 8.59,
    "end": 13.88,
    "word_start": 8.59,
    "word_end": 10.61,
    "example_start": 12.3
  },
  "flags": ["meaning_unverified"]
}
```

- `romanization`: Revised Romanization of the word.
- `example_romanization`: Revised Romanization of the example sentence.
- `hanja`: traditional hanja when the word is Sino-Korean; blank for native Korean words.
- `hanja_simplified`: the same hanja converted to simplified Chinese.
- `hanja_candidates`: other possible hanja when the source dictionary listed homonyms. The chosen `hanja` is the best match for the Chinese meaning.
- `meaning_source`: `audio` = the Chinese gloss was spoken in the recording (356 entries); `translation` = generated because no clear spoken gloss was found (959 entries).
- `confidence`: all 1,315 entries were manually reviewed and marked `high`; `flags` still records which alignment checks originally fired.
- `audio.start/end`: full entry (word repetitions + meaning + example).
- `audio.word_start/word_end`: just the word repetition part.
- `audio.example_start`: start of the example sentence.

## Clean Anki fields

`data/anki_notes.tsv` has one row per card:

```
Word  Romanization  Hanja  Meaning  AltMeanings  ExampleKO
ExampleRomanization  ExampleZH  WordAudio  ExampleAudio  Source  Tags
```

The audio columns contain `[sound:010-02_word.mp3]` and `[sound:010-02_example.mp3]`.

To use them, copy `korean-app/audio/*.mp3` into your Anki collection's `collection.media` folder first.

## How the deck was produced

1. **Korean transcription**: `whisper-large-v3-turbo` (MLX) on each source MP3.
2. **Burst detection**: ffmpeg silence detection splits each file into utterances (word, word, Chinese meaning, example).
3. **Chinese glosses**: `SenseVoiceSmall` (MLX) on each short burst with automatic language ID, plus a Korean-forced pass to recover words Whisper dropped.
4. **Entry assembly**: examples are anchored by long Korean bursts; word repetitions are taken from the first 1–2 bursts.
5. **Chinese fallback / example translation**: Google Translate for entries with no usable spoken gloss and for all example sentences.
6. **Hanja**: parsed from Korean Wiktionary etymology data, with a Chinese word-frequency check to choose between homonyms.
7. **Romanization**: `korean-romanizer` (Revised Romanization).
8. **Manual review**: all 229 flagged entries were checked, plus random spot-checks; 195 corrections were applied and documented in `data/review_changes.csv`.

Segments are chunks of a continuous recording, so the last word of one file and its example can continue in the next file; the parser works per file and deduplicates exact repeated entries.

## Reproducing the pipeline

The pipeline scripts expect the project layout above and write outputs into `data/` and `korean-app/audio/`.

```bash
.venv/bin/python pipeline/transcribe_all.py
.venv/bin/python pipeline/sensevoice_bursts.py
.venv/bin/python pipeline/parse_v2.py
.venv/bin/python pipeline/translate_select.py
.venv/bin/python pipeline/build_hanja.py
.venv/bin/python pipeline/export_deck.py
.venv/bin/python pipeline/make_audio.py
.venv/bin/python pipeline/make_apkg.py
```

`pipeline/bin/ffmpeg` is bundled for the audio steps. `pipeline/work/` holds intermediates and can be deleted after generating the deck.

## Known limitations

- Chinese meanings captured from the audio can still contain ASR noise; translated meanings are best-effort glosses rather than the book's exact wording.
- Hanja is provided for 383 confidently matched Sino-Korean words; native words and ambiguous homonyms correctly have none.
- Homonyms can get the wrong sense when the spoken Chinese gloss was missed. The review pass fixed the obvious cases, but a few nuanced entries may still need a native check.
- Some examples are two sentences; the field keeps both when they belong together.
- The two intro tracks (`001.mp3`, `009.mp3`) are not vocabulary and were skipped.

## Ready-made Anki deck

`data/Korean_Vocab.apkg` imports directly into Anki:

- **Front**: Korean word + romanization + word audio
- **Back**: hanja, Chinese meaning, Korean example, example romanization, Chinese translation, example audio
