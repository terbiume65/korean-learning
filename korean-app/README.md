# Hangul — Learn Korean

A small, local-first Korean learning app built on a 1,315-word deck, with a complete 112-lesson beginner grammar path and a 12-text graded reader.

## Run it

Double-click **`start.command`** (macOS). It starts a local server and opens the app in your browser.

Or from a terminal:

```bash
cd korean-app
python3 serve.py
```

Then open http://127.0.0.1:8765/

> Opening `index.html` directly also works in many browsers, but a local server is recommended so progress storage and audio behave consistently.

## What is in the app

The header is organised around learning: **Today · Reader · Grammar · Progress · Word List · Settings**. The café opens from the bean/star wallet in the header, the dashboard café card, or a session summary.

- **Today** — recognition/recall switch, due reviews, new cards, streak, accuracy, 7-day forecast, word of the day, grammar shortcut and your café progress.
- **Learn** — one card at a time:
  - **Show answer** flips the card to reveal meaning, hanja, example, translation and audio.
  - **I know it · test me** opens a 4-option quiz.
  - Correct answers are scheduled further out; wrong answers come back after a few cards.
  - After a flip, rate yourself **Again / Hard / Good / Easy**.
- **Reverse mode (Recall)** — a separate Chinese → Korean mode with its own FSRS schedule. You see the Chinese meaning and produce the Korean word; word/example audio stays hidden until you reveal the answer. Reverse sessions are started from the toggle on the Today page and have their own progress and stats.
- **Hangul Café** — a small café that grows as you study. Reviews earn beans; beans buy plants, lamps, bookshelves, an espresso machine, a café cat, a neon sign and more. Grammar units earn stars, and the **Grammar Atelier** turns stars + beans into permanent study charms that appear on the café wall. The café opens from the bean/star wallet in the header, the dashboard café card, or session summaries.
- **Reader** — a graded comprehensible-input library: 12 original Korean texts from first words to longer stories, with hover/tap glosses, Chinese translation on demand, line-by-line and whole-text text-to-speech, new-word lists and grammar links. Reading the first time earns beans.
- **Grammar** — a complete beginner grammar path covering all 112 items from *Korean Grammar in Use: Beginner* (Getting Ready + Units 1–24). Each lesson has an original explanation, formation patterns, examples, a unit conversation with hover/tap glosses, and three exercises: choose the form, fill the blank and order the sentence. Completing at least two exercises finishes the lesson; completing a whole unit earns a **grammar star**. Progress, stars and beans are saved.
- **Word List** — search all 1,315 words by Korean, romanization, hanja or Chinese; filter by learning state; open a card to see recognition and recall stats and practice either direction.
- **Progress** — recognition/recall toggle, mastery breakdown, 14-day forecast, 13-week activity heatmap and leech list.
- **Settings** — per-mode daily limits, daily goal, autoplay, playback speed, romanization/hanja visibility, theme, export/import/reset progress.

## Scheduling

The app uses **FSRS-5** (Free Spaced Repetition Scheduler), the modern algorithm used by Anki, with Anki-style short learning steps:

- New cards graduate to multi-day intervals on Good/Easy.
- Again sends a card to learning/relearning; it returns after a few cards and is due again in a minute.
- Review intervals grow from stability and difficulty, targeting ~90% retention.
- Ratings: Again = lapse, Hard = difficult recall, Good = normal, Easy = easy.
- A fast correct multiple-choice answer is treated as Easy once a card is already in review; new cards always graduate on Good.
- **Recognition and recall keep separate card states and separate review schedules**, so practising one direction does not inflate the other.

All progress is stored in `localStorage` under `hangul-deck-v1`.

## Hangul Café

Beans are earned by studying:

| Action | Beans |
|---|---|
| Any review | +1 |
| Correct answer | +1 |
| New word | +2 |
| First review of the day | +5 |
| Reaching the daily goal | +15 |
| First correct grammar exercise | +1 bean |
| Completing a grammar lesson | +10 beans |
| Completing a grammar unit | +1 grammar star |
| Finishing a reader text for the first time | +5 beans |

Beans buy café items; items unlock at café levels (based on total beans earned). The scene is vector art, so it scales cleanly and needs no external images. New regulars appear in the café as more words are touched in either direction.

## Grammar

The grammar path is built from `data/grammar-part1.js` … `grammar-part6.js`, with final unit conversations and glosses in `data/grammar-context.js`.

- Every lesson has a **summary**, **formation** notes, two **examples** with Chinese translations, and a **tip** where useful.
- Each unit — Getting Ready plus Units 1–24 — has a short conversation. Vocabulary and grammar are marked up as `[[surface|g:item-id]]` or `[[word]]`; hovering or tapping reveals a gloss, and the lesson target is highlighted when you open that lesson.
- Exercises are generated from the lesson data. A correct first answer gives +1 bean; finishing a lesson with at least 2/3 correct gives +10 beans.
- Completing every lesson in a unit awards **1 grammar star** (25 possible). Stars are spent in the café’s **Grammar Atelier** together with beans to synthesize five permanent study charms:

  | Charm | Stars | Beans |
  |---|---|---|
  | Tense Tile | 2 | 90 |
  | Particle Mobile | 3 | 140 |
  | Sentence Loom | 4 | 200 |
  | Sound Tile | 5 | 260 |
  | Dream Star | 7 | 340 |

- Synthesized charms appear on the café wall. Progress, stars and charms are stored in the same `hangul-deck-v1` record and included in export/import.

## Reader

The Reader is a graded library in `data/reader-texts.js` — 12 original texts, 206 lines and roughly 1,000 words across four levels:

- **Level 1 · 시작 / First words** — short present-tense texts.
- **Level 2 · 일상 / Everyday** — routines, plans and simple past.
- **Level 3 · 이야기 / Stories** — longer narratives with reasons and requests.
- **Level 4 · 긴 글 / Longer reading** — letters, folk tales and reflections.

Each text has original Korean lines, a Chinese translation hidden by default, hover/tap vocabulary and grammar glosses, a new-word sidebar and grammar links. The **Play all** button reads the text with the browser’s Korean voice; individual speaker buttons read one line and highlight it. Translation and speed controls can be changed without interrupting playback. Read the Korean first, use glosses sparingly, then reveal the translation as a check.

## Keyboard shortcuts

| Key | Action |
|---|---|
| `Space` | Show answer / next card |
| `1`–`4` | Choose a quiz option / rate Again-Hard-Good-Easy |
| `A` | Replay word audio |
| `S` | Replay example audio |
| `Esc` | Close modal / leave session |

## Audio

Audio is served from `audio/`:

- `{id}_word.mp3` — the word
- `{id}_example.mp3` — the example sentence
- `{id}.mp3` — full entry

Word audio autoplays when a card appears in recognition mode. In reverse mode it stays hidden until you reveal the answer, then plays the word followed by the example. Browsers may require one click before audio is allowed.

## Files

| File | Purpose |
|---|---|
| `index.html` | App shell |
| `css/styles.css` | Design system and responsive layout |
| `js/fsrs.js` | FSRS scheduler |
| `js/store.js` | Local progress, daily stats, streaks, café wallet, grammar stars/progress |
| `js/data.js` | Deck helpers, quiz distractors, search |
| `js/cafe.js` | Café catalog, synthesis charms and SVG scene |
| `js/app.js` | Views, session flow, routing, reader, grammar UI and gloss tooltips |
| `data/vocab.js` | Embedded deck (works without a server fetch) |
| `data/grammar-part1.js` … `grammar-part6.js` | 112 grammar lessons and unit metadata |
| `data/grammar-context.js` | Final unit conversations, ordering sentences and extra glosses |
| `data/reader-texts.js` | 12 graded reader texts, vocabulary and glosses |
| `audio/` | Per-entry recordings |
| `serve.py` / `start.command` | Local server launcher |

## Notes

- Hanja is only displayed when the app is confident it matches the word's meaning; native Korean words show none.
- Café items and synthesized grammar charms are cosmetic and never change scheduling or review load.
- Recognition and recall share the same daily per-mode limits but keep separate cards, due dates and accuracy.
- The deck is the same 1,315-entry deck from `../data/vocab.json`; if you edit that file, regenerate `data/vocab.js` or copy the JSON over and adjust the loader.
- Progress is per-browser. Use **Settings → Export progress** for a backup.
