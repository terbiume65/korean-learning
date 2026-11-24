(function () {
  "use strict";

  var app = {
    state: Store.load(),
    view: "dashboard",
    session: null,
    current: null,
    currentItem: null,
    mode: "front",
    mcq: null,
    mcqStart: 0,
    cardStart: 0,
    last: null,
    browse: { query: "", filter: "all", limit: 100 },
    dashboardDirection: "forward",
    statsDirection: "forward",
    grammarSearch: "",
    grammarExercise: null,
    readerLevel: "all",
    readerTranslation: false,
    readerRate: 0.9,
    readerPlaying: false,
    readerToken: 0,
    tipEl: null,
    tipHideTimer: null,
    audio: new Audio(),
    soundWarned: false,
    toastTimer: null,
    autoNextTimer: null,
    summary: null,
  };

  var GRAMMAR_ITEMS = window.GRAMMAR_ITEMS || [];
  var GRAMMAR_UNITS = window.GRAMMAR_UNITS || [];
  var GI = {};
  var GU = {};
  GRAMMAR_ITEMS.forEach(function (x) { GI[x.id] = x; });
  GRAMMAR_UNITS.forEach(function (x) { GU[x.id] = x; });

  var READER_TEXTS = window.READER_TEXTS || [];
  var READER_LEVELS = window.READER_LEVELS || [];
  var RI = {};
  var RL = {};
  READER_TEXTS.forEach(function (x) { RI[x.id] = x; });
  READER_LEVELS.forEach(function (x) { RL[x.id] = x; });

  var ICONS = {
    speaker:
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9H3v6h3l5 4V5Z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.5 5.5a9 9 0 0 1 0 13"/></svg>',
    back:
      '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>',
    arrow:
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>',
    sun:
      '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
    moon:
      '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5Z"/></svg>',
    flame:
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22c4 0 7-3 7-7 0-3-2-5-3.5-7.5C14 5 13 3 13 2c-1.5 2-3 4-3 6.5 0 1.5.5 2.5 1 3.5-2 0-3.5-2-4-4C5 10 5 12 5 15c0 4 3 7 7 7Z"/></svg>',
    book:
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/></svg>',
    chart:
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="m7 15 4-4 3 3 5-6"/></svg>',
    gear:
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.2a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.2a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.2a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.2a1.7 1.7 0 0 0-1.4 1Z"/></svg>',
    search:
      '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>',
    check:
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m20 6-11 11-5-5"/></svg>',
    x:
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>',
    clock:
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    layers:
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m12 2 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5"/><path d="m3 17 9 5 9-5"/></svg>',
    target:
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/></svg>',
    sparkle:
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z"/><path d="m19 16 .8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16Z"/></svg>',
    trophy:
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4Z"/><path d="M7 5H4v2a4 4 0 0 0 4 4M17 5h3v2a4 4 0 0 1-4 4"/></svg>',
    bean:
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><ellipse cx="12" cy="12" rx="6.5" ry="9" transform="rotate(35 12 12)"/><path d="M8.5 4.8c3 3.7 4.3 9.8 2.2 15.2" stroke="var(--surface)" stroke-width="1.6" fill="none" stroke-linecap="round" opacity=".8"/></svg>',
    star:
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="m12 2.8 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5-5.8-3-5.8 3 1.1-6.5L2.6 9.6l6.5-.9L12 2.8Z"/></svg>',
    coffee:
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V9Z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17"/><path d="M7 3v2M11 3v2M15 3v2"/></svg>',
  };

  function icon(name, size) {
    var svg = ICONS[name] || "";
    if (size) {
      return svg.replace('width="' + (name === "speaker" ? 20 : 18) + '"', 'width="' + size + '"').replace('height="' + (name === "speaker" ? 20 : 18) + '"', 'height="' + size + '"');
    }
    return svg;
  }

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function pct(n, d) {
    if (!d) return 0;
    return Math.max(0, Math.min(100, Math.round((n / d) * 100)));
  }

  function starWord(n) {
    return Number(n) === 1 ? "star" : "stars";
  }

  function approxTime(seconds) {
    if (seconds < 60) return Math.round(seconds) + "s";
    var m = Math.floor(seconds / 60);
    var s = Math.round(seconds % 60);
    return m + "m" + (s ? " " + s + "s" : "");
  }

  function greeting() {
    var h = new Date().getHours();
    if (h < 5) return "Still up?";
    if (h < 12) return "Good morning";
    if (h < 18) return "Good afternoon";
    return "Good evening";
  }

  function prettyDate() {
    try {
      return new Intl.DateTimeFormat(undefined, { weekday: "long", month: "long", day: "numeric" }).format(new Date());
    } catch (e) {
      return new Date().toDateString();
    }
  }

  function toast(msg, type) {
    var t = document.getElementById("toast");
    if (!t) return;
    t.textContent = msg;
    t.className = "toast show" + (type === "error" ? " error" : "");
    clearTimeout(app.toastTimer);
    app.toastTimer = setTimeout(function () {
      t.className = "toast";
    }, type === "error" ? 4200 : 2400);
  }

  function applyTheme() {
    var setting = app.state.settings.theme || "system";
    var dark =
      setting === "dark" ||
      (setting === "system" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.dataset.theme = dark ? "dark" : "light";
  }

  function init() {
    Deck.all.forEach(function (c) {
      Store.getCard(app.state, c.id, "forward");
      Store.getCard(app.state, c.id, "reverse");
    });
    Store.syncGrammarStars(app.state);
    Store.save(app.state);
    app.dashboardDirection = app.state.settings.lastDirection === "reverse" ? "reverse" : "forward";
    applyTheme();
    if (window.matchMedia) {
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function () {
        if (app.state.settings.theme === "system") applyTheme();
      });
    }
    document.addEventListener("click", onClick);
    document.addEventListener("change", onChange);
    document.addEventListener("input", onInput);
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerover", onGlossOver);
    document.addEventListener("pointerout", onGlossOut);
    document.addEventListener("focusin", onGlossOver);
    document.addEventListener("focusout", onGlossOut);
    window.addEventListener("scroll", hideGloss, true);
    var tip = document.getElementById("gloss-tip");
    if (tip) {
      tip.addEventListener("pointerenter", function () { clearTimeout(app.tipHideTimer); });
      tip.addEventListener("pointerleave", scheduleHideGloss);
    }
    window.addEventListener("hashchange", route);
    if (window.CloudSync) {
      CloudSync.init({
        getState: function () { return app.state; },
        setState: function (next) {
          var studying = location.hash.indexOf("#/learn") === 0 && app.session && !app.session.finished;
          app.state = next;
          Store.save(app.state);
          if (!studying) render();
        },
      });
      window.addEventListener("cloud:changed", function () {
        if (app.view === "settings") render();
      });
    }
    route();
  }

  function counts(direction) {
    direction = direction === "reverse" ? "reverse" : "forward";
    var now = Date.now();
    var map = direction === "reverse" ? app.state.reverseCards : app.state.cards;
    var due = 0;
    var learning = 0;
    var fresh = 0;
    Deck.all.forEach(function (c) {
      var cs = map[c.id];
      if (!cs || cs.state === "new") fresh++;
      else if (cs.due <= now) {
        due++;
        if (cs.state === "learning" || cs.state === "relearning") learning++;
      }
    });
    var d = Store.today(app.state);
    var settings = app.state.settings;
    var newToday = direction === "reverse" ? d.reverseNew : d.new;
    var reviewsToday = direction === "reverse" ? d.reverseReviews : d.reviews;
    return {
      due: due,
      learning: learning,
      newTotal: fresh,
      newToday: newToday,
      reviewsToday: reviewsToday,
      newAllowance: Math.max(0, Number(settings.newPerDay) - newToday),
      reviewAllowance: Math.max(0, Number(settings.reviewsPerDay) - reviewsToday),
    };
  }

  function buildQueue(direction, limitOverride) {
    direction = direction === "reverse" ? "reverse" : "forward";
    var now = Date.now();
    var c = counts(direction);
    var map = direction === "reverse" ? app.state.reverseCards : app.state.cards;
    var reviewLimit = limitOverride && limitOverride.reviews != null ? limitOverride.reviews : c.reviewAllowance;
    var newLimit = limitOverride && limitOverride.newCards != null ? limitOverride.newCards : c.newAllowance;
    var due = [];
    var fresh = [];
    Deck.all.forEach(function (card) {
      var cs = map[card.id];
      if (!cs) return;
      if (cs.state === "new") fresh.push(card);
      else if (cs.due <= now) due.push(card);
    });
    due.sort(function (a, b) {
      return map[a.id].due - map[b.id].due;
    });
    fresh.sort(function (a, b) {
      return a.id.localeCompare(b.id);
    });
    var q = due.slice(0, Math.max(0, reviewLimit)).map(function (c) {
      return { id: c.id, isNew: false };
    });
    return q.concat(
      fresh.slice(0, Math.max(0, newLimit)).map(function (c) {
        return { id: c.id, isNew: true };
      })
    );
  }

  function startSession(opts) {
    opts = opts || {};
    var direction = opts.direction === "reverse" ? "reverse" : opts.direction === "forward" ? "forward" : app.dashboardDirection || "forward";
    var map = direction === "reverse" ? app.state.reverseCards : app.state.cards;
    var queue;
    if (opts.cards) {
      queue = opts.cards.map(function (c) {
        return { id: c.id, isNew: map[c.id].state === "new" };
      });
    } else if (opts.practice) {
      var shuffled = Deck.all.slice();
      for (var i = shuffled.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var t = shuffled[i];
        shuffled[i] = shuffled[j];
        shuffled[j] = t;
      }
      queue = shuffled.slice(0, opts.practice).map(function (c) {
        return { id: c.id, isNew: false };
      });
    } else {
      queue = buildQueue(direction);
    }
    if (!queue.length) {
      toast("Nothing due right now — practice ahead instead.");
      return;
    }
    app.dashboardDirection = direction;
    app.state.settings.lastDirection = direction;
    Store.save(app.state);
    app.session = {
      queue: queue,
      direction: direction,
      total: queue.length,
      done: 0,
      correct: 0,
      wrong: 0,
      newDone: 0,
      beans: 0,
      beansBonus: 0,
      start: Date.now(),
      missed: [],
      practice: !!opts.practice,
      label: opts.label || "",
      finished: false,
    };
    app.summary = null;
    app.current = null;
    app.mode = "front";
    app.last = null;
    if (location.hash !== "#/learn") location.hash = "#/learn";
    else showNext();
  }

  function showNext() {
    clearAutoNext();
    if (!app.session) return;
    if (app.session.queue.length === 0) {
      finishSession();
      return;
    }
    var item = app.session.queue.shift();
    app.currentItem = item;
    app.current = Deck.byId[item.id];
    app.mode = "front";
    app.mcq = null;
    app.last = null;
    app.cardStart = Date.now();
    app.mcqStart = 0;
    render();
    if (app.session.direction === "forward" && app.state.settings.autoplayWord) {
      playAudio(Deck.wordAudio(app.current));
    }
  }

  function finishSession() {
    if (!app.session) return;
    app.session.finished = true;
    app.session.end = Date.now();
    app.summary = app.session;
    location.hash = "#/summary";
    if (location.hash === "#/summary") render();
  }

  function playAudio(src) {
    if (!src) return;
    try {
      app.audio.pause();
      app.audio.onended = null;
      app.audio.src = src;
      app.audio.currentTime = 0;
      app.audio.playbackRate = Number(app.state.settings.audioRate) || 1;
      var p = app.audio.play();
      if (p && p.catch) {
        p.catch(function () {
          if (!app.soundWarned) {
            app.soundWarned = true;
            toast("Sound is blocked — tap the speaker button to enable it.");
          }
        });
      }
    } catch (e) {
      /* ignore */
    }
  }

  function playSequence(paths) {
    var list = (paths || []).filter(Boolean);
    if (!list.length) return;
    app.audio.pause();
    app.audio.onended = null;
    var i = 0;
    function next() {
      if (i >= list.length) {
        app.audio.onended = null;
        return;
      }
      var src = list[i++];
      try {
        app.audio.src = src;
        app.audio.currentTime = 0;
        app.audio.playbackRate = Number(app.state.settings.audioRate) || 1;
        app.audio.onended = next;
        var p = app.audio.play();
        if (p && p.catch) {
          p.catch(function () {
            if (!app.soundWarned) {
              app.soundWarned = true;
              toast("Sound is blocked — tap the speaker button to enable it.");
            }
          });
        }
      } catch (e) {
        /* ignore */
      }
    }
    next();
  }

  function playAnswerAudio(card, direction) {
    var word = Deck.wordAudio(card);
    var example = Deck.exampleAudio(card);
    if (direction === "reverse") {
      var paths = [];
      if (app.state.settings.autoplayWord) paths.push(word);
      if (app.state.settings.autoplayExample) paths.push(example);
      playSequence(paths);
    } else if (app.state.settings.autoplayExample) {
      playAudio(example);
    }
  }

  function replayWord() {
    if (app.current) playAudio(Deck.wordAudio(app.current));
  }

  function replayExample() {
    if (app.current) playAudio(Deck.exampleAudio(app.current));
  }

  function flip() {
    if (!app.current) return;
    app.mode = "back";
    render();
    if (app.session && app.session.direction === "reverse") {
      playAnswerAudio(app.current, "reverse");
    } else if (app.state.settings.autoplayExample) {
      playAudio(Deck.exampleAudio(app.current));
    }
  }

  function startMCQ() {
    if (!app.current) return;
    app.mode = "mcq";
    app.mcq = app.session && app.session.direction === "reverse" ? Deck.getReverseOptions(app.current) : Deck.getOptions(app.current);
    app.mcqStart = Date.now();
    render();
  }

  function clearAutoNext() {
    if (app.autoNextTimer) {
      clearTimeout(app.autoNextTimer);
      app.autoNextTimer = null;
    }
  }

  function scheduleAutoNext() {
    clearAutoNext();
    app.autoNextTimer = setTimeout(function () {
      app.autoNextTimer = null;
      if (app.mode === "result" && app.session && !app.session.finished) nextCard();
    }, 1000);
  }

  function applyAnswer(grade, correct, elapsed) {
    if (!app.current || !app.session) return;
    var card = app.current;
    var direction = app.session.direction;
    var wasMode = app.mode;
    var map = direction === "reverse" ? app.state.reverseCards : app.state.cards;
    var before = map[card.id].state;
    var reward = Store.answer(app.state, card.id, grade, correct, elapsed, Date.now(), direction);
    var updated = reward.card;
    var dueIn = (updated.due - Date.now()) / FSRS.DAY;
    app.last = {
      grade: grade,
      correct: correct,
      dueLabel: FSRS.formatInterval(dueIn),
      dueIn: dueIn,
      state: updated.state,
      beans: reward.beans,
      bonus: reward.bonus,
      selectedIndex: app.last && app.last.selectedIndex != null ? app.last.selectedIndex : null,
      mode: app.mode,
    };
    var s = app.session;
    s.done++;
    s.beans = (s.beans || 0) + reward.beans;
    s.beansBonus = (s.beansBonus || 0) + reward.bonus;
    if (correct) s.correct++;
    else {
      s.wrong++;
      if (s.missed.indexOf(card.id) < 0) s.missed.push(card.id);
    }
    if (before === "new") s.newDone++;
    if (grade === 1 || updated.state === "learning" || updated.state === "relearning") {
      var pos = Math.min(3, s.queue.length);
      s.queue.splice(pos, 0, { id: card.id, isNew: false, relearn: true });
    }
    app.mode = "result";
    clearAutoNext();
    Store.save(app.state);
    render();
    if (wasMode === "back" || grade === 1 || !correct) scheduleAutoNext();
    if (wasMode === "mcq") playAnswerAudio(card, direction);
  }

  function rate(grade) {
    if (app.mode !== "back") return;
    applyAnswer(grade, grade > 1, Date.now() - app.cardStart);
  }

  function selectOption(index) {
    if (app.mode !== "mcq" || !app.mcq) return;
    var correct = index === app.mcq.correctIndex;
    var elapsed = Date.now() - app.mcqStart;
    var direction = app.session && app.session.direction === "reverse" ? "reverse" : "forward";
    var map = direction === "reverse" ? app.state.reverseCards : app.state.cards;
    var wasNew = map[app.current.id].state === "new";
    var grade = correct ? (!wasNew && elapsed < 3200 ? 4 : 3) : 1;
    app.last = { selectedIndex: index };
    applyAnswer(grade, correct, elapsed);
  }

  function nextCard() {
    if (app.mode !== "result") return;
    clearAutoNext();
    showNext();
  }

  function exitStudy() {
    if (app.session && !app.session.finished && app.session.done > 0) {
      if (!window.confirm("Leave this session? Your answers are already saved.")) return;
    }
    clearAutoNext();
    app.audio.pause();
    app.session = null;
    location.hash = "#/";
    render();
  }

  function navigate(hash) {
    if (app.session && !app.session.finished && !hash.startsWith("#/learn")) {
      if (!window.confirm("Leave this session? Your answers are already saved.")) return;
      app.session = null;
    }
    clearAutoNext();
    app.audio.pause();
    location.hash = hash;
  }

  function route() {
    hideGloss();
    window.scrollTo(0, 0);
    if (app.readerPlaying || (window.speechSynthesis && window.speechSynthesis.speaking)) readerStop();
    var raw = location.hash.replace(/^#\/?/, "");
    var view = (raw.split("/")[0] || "dashboard").trim();
    if (view !== "learn") clearAutoNext();
    if (view === "learn") {
      if (!app.session) {
        var dir = app.dashboardDirection || "forward";
        var q = buildQueue(dir);
        if (!q.length) {
          location.hash = "#/";
          return;
        }
        startSession({ direction: dir });
        return;
      }
      render();
      return;
    }
    if (view === "summary") {
      if (!app.summary) {
        location.hash = "#/";
        return;
      }
      app.view = "summary";
      render();
      return;
    }
    if (view === "grammar") {
      app.view = "grammar";
      app.grammarRoute = (location.hash.replace(/^#\/?/, "").split("/") || []).slice(1);
      render();
      return;
    }
    if (view === "reader") {
      app.view = "reader";
      app.readerRoute = (location.hash.replace(/^#\/?/, "").split("/") || []).slice(1);
      render();
      return;
    }
    if (["dashboard", "browse", "stats", "settings", "cafe"].indexOf(view) < 0) view = "dashboard";
    app.view = view;
    render();
  }

  function navActive(view) {
    if (view === "dashboard") return "dashboard";
    return view;
  }

  function shell(content, view) {
    var active = navActive(view);
    var cafe = app.state.cafe || {};
    var beans = cafe.beans || 0;
    var stars = cafe.stars || 0;
    return (
      '<header class="topbar"><div class="topbar-inner">' +
      '<a class="brand" href="#/" data-nav="dashboard"><span class="brand-mark">한</span><span>Hangul<small>Learn Korean</small></span></a>' +
      '<nav class="nav">' +
      '<a href="#/" data-nav="dashboard" class="' + (active === "dashboard" ? "active" : "") + '">Today</a>' +
      '<a href="#/reader" data-nav="reader" class="' + (active === "reader" ? "active" : "") + '">Reader</a>' +
      '<a href="#/grammar" data-nav="grammar" class="' + (active === "grammar" ? "active" : "") + '">Grammar</a>' +
      '<a href="#/stats" data-nav="stats" class="' + (active === "stats" ? "active" : "") + '">Progress</a>' +
      '<a href="#/browse" data-nav="browse" class="' + (active === "browse" ? "active" : "") + '">Word List</a>' +
      '<a href="#/settings" data-nav="settings" class="' + (active === "settings" ? "active" : "") + '">Settings</a>' +
      "</nav>" +
      '<div class="wallet">' +
      '<button class="bean-pill" data-action="cafe" title="Beans — open the café" aria-label="Open café, ' + beans + " " + (beans === 1 ? "bean" : "beans") + '">' + icon("bean") + "<span>" + beans + "</span></button>" +
      '<button class="bean-pill star-pill" data-action="atelier" title="Grammar stars — open the atelier" aria-label="Open grammar atelier, ' + stars + " " + starWord(stars) + '">' + icon("star") + "<span>" + stars + "</span></button>" +
      "</div>" +
      '<button class="icon-btn" data-action="toggle-theme" aria-label="Toggle theme" title="Toggle theme">' +
      (document.documentElement.dataset.theme === "dark" ? icon("sun") : icon("moon")) +
      "</button>" +
      "</div></header>" +
      '<main class="shell">' + content + "</main>"
    );
  }

  function render() {
    var html;
    if (app.view === "learn" || location.hash.indexOf("#/learn") === 0) {
      html = renderLearn();
    } else if (app.view === "summary") {
      html = shell(renderSummary(), "dashboard");
    } else if (app.view === "browse") {
      html = shell(renderBrowse(), "browse");
    } else if (app.view === "stats") {
      html = shell(renderStats(), "stats");
    } else if (app.view === "cafe") {
      html = shell(renderCafe(), "cafe");
    } else if (app.view === "grammar") {
      html = shell(renderGrammar(), "grammar");
    } else if (app.view === "reader") {
      html = shell(renderReader(), "reader");
    } else if (app.view === "settings") {
      html = shell(renderSettings(), "settings");
    } else {
      html = shell(renderDashboard(), "dashboard");
    }
    document.getElementById("app").innerHTML = html;
    if (app.view === "browse") {
      var input = document.querySelector(".search");
      if (input && document.activeElement !== input && app.browse.focus) {
        input.focus();
        var pos = input.value.length;
        input.setSelectionRange(pos, pos);
      }
    }
  }

  function renderDashboard() {
    var direction = app.dashboardDirection === "reverse" ? "reverse" : "forward";
    var isRev = direction === "reverse";
    var c = counts(direction);
    var settings = app.state.settings;
    var learned = Deck.count - c.newTotal;
    var learnedForward = Deck.count - counts("forward").newTotal;
    var learnedReverse = Deck.count - counts("reverse").newTotal;
    var totals = Store.totals(app.state, 30);
    var streak = app.state.streak.current || 0;
    var d = Store.today(app.state);
    var totalToday = (d.reviews || 0) + (d.reverseReviews || 0);
    var goal = Math.max(1, Number(settings.dailyGoal) || 20);
    var p = pct(totalToday, goal);
    var queue = buildQueue(direction);
    var forecast = Store.forecast(app.state, 7, Date.now(), direction);
    var maxF = Math.max.apply(
      null,
      forecast.map(function (x) {
        return x.count;
      }).concat([1])
    );
    var wod = Deck.todayCard();
    var dueNow = c.due + Math.min(c.newTotal, c.newAllowance);
    var ctaLabel = queue.length ? (isRev ? "Start recall session" : "Start recognition session") : "Practice 10 random words";
    var ctaAction = queue.length ? "start" : "practice";
    var bars = forecast
      .map(function (x) {
        var height = Math.max(4, Math.round((x.count / maxF) * 100));
        var label = new Date(x.date).toLocaleDateString(undefined, { weekday: "short" }).slice(0, 2);
        return '<div class="bar-col"><div class="bar" style="--h:' + height + '" title="' + x.count + ' due"></div><span>' + esc(label) + "</span></div>";
      })
      .join("");
    var cafe = app.state.cafe || { beans: 0, items: {}, totalEarned: 0 };
    var level = Store.cafeLevel(app.state);
    var itemCount = Cafe.items.filter(function (i) {
      return cafe.items && cafe.items[i.id];
    }).length;
    var wordsTouched = Deck.all.filter(function (card) {
      return app.state.cards[card.id].state !== "new" || app.state.reverseCards[card.id].state !== "new";
    }).length;
    var grammarProg = Store.grammarProgress(app.state);
    var grammarNext = grammarNextItem();
    var grammarStarStats = Store.grammarStars(app.state);
    var readingProg = Store.readingProgress(app.state);
    var readingNext = readerNextText();
    var modeSwitch =
      '<div class="mode-switch">' +
      '<button class="mode-btn ' + (!isRev ? "active" : "") + '" data-action="set-direction" data-direction="forward">Korean → Chinese<small>Recognition</small></button>' +
      '<button class="mode-btn ' + (isRev ? "active" : "") + '" data-action="set-direction" data-direction="reverse">Chinese → Korean<small>Recall</small></button>' +
      "</div>";

    return (
      '<section class="hero">' +
      '<div class="hero-copy">' +
      modeSwitch +
      '<p class="eyebrow">' + esc(prettyDate()) + " · " + (isRev ? "recall mode" : "recognition mode") + "</p>" +
      "<h1>" + (isRev ? "See the meaning. <em>Recall the word.</em>" : esc(greeting()) + (greeting().slice(-1) === "?" ? " " : ". ") + "Ready to learn some <em>Korean</em>?") + "</h1>" +
      '<p class="lead">' +
      (isRev
        ? "Reverse mode uses a separate review schedule. You see the Chinese meaning and produce the Korean word; audio plays after you reveal it. "
        : Deck.count.toLocaleString() + " Korean words and 112 grammar lessons. Vocabulary uses FSRS; grammar is a guided path. ") +
      (queue.length
        ? "You have <strong>" + c.due + "</strong> review" + (c.due === 1 ? "" : "s") + " and <strong>" + Math.min(c.newTotal, c.newAllowance) + "</strong> new card" + (Math.min(c.newTotal, c.newAllowance) === 1 ? "" : "s") + " ready."
        : "Nothing is due right now. Keep the streak alive with a short practice round.") +
      "</p>" +
      '<div class="hero-actions">' +
      '<button class="btn btn-primary btn-lg" data-action="' + ctaAction + '">' + esc(ctaLabel) + " " + icon("arrow") + "</button>" +
      '<button class="btn btn-soft btn-lg" data-action="reader">Reader</button>' +
      '<button class="btn btn-ghost btn-lg" data-action="grammar">Grammar path</button>' +
      "</div>" +
      "</div>" +
      '<aside class="today-card">' +
      '<div class="today-head"><div><h2>Today\'s goal</h2><p>' + esc(prettyDate()) + "</p></div>" +
      '<div class="ring" style="--p:' + p + '"><div class="ring-inner"><strong>' + (queue.length ? dueNow : "✓") + "</strong><span>" + (queue.length ? "cards left" : "all clear") + "</span></div></div>" +
      "</div>" +
      '<div class="today-list">' +
      '<div class="today-row"><span>Reviews due</span><strong>' + c.due + "</strong></div>" +
      '<div class="today-row"><span>New cards ready</span><strong>' + Math.min(c.newTotal, c.newAllowance) + "</strong></div>" +
      '<div class="today-row"><span>' + (isRev ? "Words recalled" : "Words recognized") + "</span><strong>" + learned.toLocaleString() + "</strong></div>" +
      '<div class="today-row"><span>Daily goal</span><strong>' + totalToday + " / " + goal + "</strong></div>" +
      "</div>" +
      '<button class="btn btn-primary today-cta" data-action="' + ctaAction + '">' + esc(ctaLabel) + "</button>" +
      "</aside>" +
      "</section>" +
      '<section class="stat-grid">' +
      '<div class="stat-card"><div class="stat-icon">' + icon("flame") + '</div><div><strong>' + streak + '</strong><span>day streak</span></div></div>' +
      '<div class="stat-card"><div class="stat-icon teal">' + icon("book") + '</div><div><strong>' + learnedForward.toLocaleString() + '</strong><span>recognized</span></div></div>' +
      '<div class="stat-card"><div class="stat-icon gold">' + icon("target") + '</div><div><strong>' + learnedReverse.toLocaleString() + '</strong><span>recalled</span></div></div>' +
      '<div class="stat-card"><div class="stat-icon green">' + icon("chart") + '</div><div><strong>' + (totals.reviews ? Math.round(totals.accuracy * 100) + "%" : "—") + '</strong><span>accuracy · 30d</span></div></div>' +
      "</section>" +
      '<section class="cafe-mini-strip">' +
      '<div class="cafe-mini-art">☕</div>' +
      '<div><h2>Hangul Café · Level ' + level + "</h2><p>" + (cafe.beans || 0) + " beans · " + itemCount + " / " + Cafe.items.length + " items · " + wordsTouched + " words touched</p></div>" +
      '<button class="btn btn-soft" data-action="cafe">Visit café ' + icon("arrow") + "</button>" +
      "</section>" +
      '<section class="cafe-mini-strip grammar-mini-strip">' +
      '<div class="cafe-mini-art">문</div>' +
      '<div><h2>Grammar path · ' + grammarProg.completed + " / " + grammarProg.total + " · ★ " + grammarStarStats.balance + "</h2><p>" + (grammarNext ? "Next: " + esc(grammarNext.title) + " · " + esc(grammarNext.pattern) : "All 112 lessons complete") + " · " + grammarStarStats.units + " / " + grammarStarStats.total + " unit stars</p></div>" +
      '<a class="btn btn-soft" href="#/grammar">Open grammar ' + icon("arrow") + "</a>" +
      "</section>" +
      '<section class="cafe-mini-strip reader-mini-strip">' +
      '<div class="cafe-mini-art">📖</div>' +
      '<div><h2>Reader · ' + readingProg.read + " / " + readingProg.total + " texts</h2><p>" + (readingNext ? "Next: " + esc(readingNext.title) + " · Level " + esc(String(readingNext.level)) + " · " + readerWordCount(readingNext) + " words" : "Every text read — revisit any level") + "</p></div>" +
      '<a class="btn btn-soft" href="#/reader">Open reader ' + icon("arrow") + "</a>" +
      "</section>" +
      '<section class="two-col">' +
      '<div class="panel"><div class="panel-head"><h2>Next 7 days · ' + (isRev ? "recall" : "recognition") + '</h2><span>' + forecast.reduce(function (a, b) { return a + b.count; }, 0) + ' scheduled</span></div><div class="bars">' + bars + "</div></div>" +
      '<div class="panel"><div class="panel-head"><h2>Word of the day</h2><span>' + esc(Deck.hanjaReliable(wod) ? wod.hanja : "오늘의 단어") + '</span></div><div class="word-of-day">' +
      '<div class="wod-word">' + esc(wod.word) + "</div>" +
      '<div class="wod-meta"><span>' + esc(wod.romanization) + "</span>" +
      '<button class="speaker small soft" data-action="play-card-word" data-id="' + esc(wod.id) + '" aria-label="Play word">' + icon("speaker", 17) + "</button></div>" +
      '<div class="wod-meaning">' + esc(wod.meaning_zh) + "</div>" +
      '<div class="wod-example">' + esc(wod.example_ko) + "<br>" + esc(wod.example_zh) + "</div>" +
      "</div></div>" +
      "</section>"
    );
  }

  function renderLearn() {
    if (!app.current) {
      if (app.session && app.session.queue.length) {
        showNext();
        if (app.current) return renderLearn();
      }
      return '<main class="study-wrap"><p class="muted">Loading…</p></main>';
    }
    var s = app.session || { done: 0, queue: [], correct: 0, wrong: 0, direction: "forward", beans: 0 };
    var direction = s.direction === "reverse" ? "reverse" : "forward";
    var map = direction === "reverse" ? app.state.reverseCards : app.state.cards;
    var currentOpen = app.mode === "front" || app.mode === "back" || app.mode === "mcq";
    var total = s.done + s.queue.length + (currentOpen ? 1 : 0);
    var progress = total ? Math.round((s.done / total) * 100) : 0;
    var statusClass = Deck.status(map[app.current.id]);
    var status = Deck.statusLabel(map[app.current.id]);
    var c = app.current;
    var content;

    if (app.mode === "front") content = renderFront(c, status, statusClass, direction);
    else if (app.mode === "back") content = renderBack(c, true, direction);
    else if (app.mode === "mcq") content = renderMCQ(c, direction);
    else content = renderResult(c, direction);
    var audioButton =
      direction === "forward" || app.mode === "back" || app.mode === "result"
        ? '<button class="icon-btn" data-action="replay-word" aria-label="Replay word">' + icon("speaker") + "</button>"
        : '<span style="width:38px"></span>';

    return (
      '<main class="study-wrap">' +
      '<div class="study-top">' +
      '<button class="icon-btn" data-action="exit" aria-label="Exit study">' + icon("back") + "</button>" +
      '<div class="study-progress"><div class="track"><div class="fill" style="width:' + progress + '%"></div></div>' +
      '<div class="meta"><span>' + s.done + " done · " + s.queue.length + " left</span><span>" + (direction === "reverse" ? "Recall" : "Recognize") + " · " + (s.beans || 0) + " beans earned</span></div></div>" +
      audioButton +
      "</div>" +
      '<div class="study-card' + (app.mode === "front" ? "" : " no-enter") + '">' + content + "</div>" +
      '<div class="study-footer"><span class="muted">Space to reveal / next · 1–4 to choose · A word audio · S example audio · Esc to exit</span>' +
      '<button class="btn btn-ghost btn-sm" data-action="exit">End session</button></div>' +
      "</main>"
    );
  }

  function renderFront(c, status, statusClass, direction) {
    var reverse = direction === "reverse";
    return (
      '<div class="card-stage">' +
      '<div class="card-kicker"><span class="pill ' + (statusClass || status) + '">' + esc(status) + "</span><span>" + (reverse ? "Chinese → Korean · recall" : "Korean → Chinese · recognize") + "</span></div>" +
      '<div class="word ' + (reverse ? "prompt-cn" : "") + '">' + esc(reverse ? c.meaning_zh : c.word) + "</div>" +
      (reverse
        ? '<p class="reverse-prompt-note">Recall the Korean word. Audio stays hidden until you reveal the answer.</p>'
        : app.state.settings.showRomanization
        ? '<div class="word-rom">' + esc(c.romanization) + "</div>"
        : "") +
      (reverse ? "" : '<button class="speaker" data-action="replay-word" aria-label="Play word">' + icon("speaker", 24) + "</button>") +
      '<p class="hint">' + (reverse ? "Say the Korean word out loud, then reveal — or test yourself." : "Say it out loud, then reveal the meaning — or test yourself with a quick multiple choice.") + "</p>" +
      '<div class="front-actions">' +
      '<button class="btn btn-primary btn-lg" data-action="flip">Show answer</button>' +
      '<button class="btn btn-ghost btn-lg" data-action="mcq">I know it · test me</button>' +
      "</div></div>"
    );
  }

  function hanjaChip(c) {
    if (!app.state.settings.showHanja || !Deck.hanjaReliable(c)) return "";
    var ht = c.hanja;
    var hs = c.hanja_simplified || ht;
    var showSimplified = hs !== ht && hs !== c.meaning_zh;
    return '<div class="hanja-chip">' + (showSimplified ? esc(hs) + " " : "") + "<b>" + esc(ht) + "</b></div>";
  }

  function renderBack(c, rating, direction) {
    var reverse = direction === "reverse";
    var answerMain = reverse
      ? '<div class="answer-main"><div><div class="answer-word">' + esc(c.word) + "</div>" +
        '<div class="answer-word-rom">' + esc(c.romanization) + "</div>" +
        '<div class="meaning" style="font-size:1.05rem;margin-top:10px">' + esc(c.meaning_zh) + "</div>" +
        (c.alt_meanings && c.alt_meanings.length ? '<div class="meaning-sub">also: ' + esc(c.alt_meanings.join(" · ")) + "</div>" : "") +
        "</div>" + hanjaChip(c) + "</div>"
      : '<div class="answer-main"><div><div class="meaning">' + esc(c.meaning_zh) + "</div>" +
        (c.alt_meanings && c.alt_meanings.length ? '<div class="meaning-sub">also: ' + esc(c.alt_meanings.join(" · ")) + "</div>" : "") +
        "</div>" + hanjaChip(c) + "</div>";
    return (
      '<div class="card-stage" style="align-items:stretch;text-align:left">' +
      '<div class="answer">' +
      answerMain +
      '<div class="example-box"><button class="speaker small" data-action="replay-example" aria-label="Play example">' + icon("speaker", 18) + "</button>" +
      '<div><div class="example-ko">' + esc(c.example_ko) + "</div>" +
      (app.state.settings.showRomanization ? '<div class="example-rom">' + esc(c.example_romanization) + "</div>" : "") +
      '<div class="example-zh">' + esc(c.example_zh) + "</div></div></div>" +
      (rating ? renderRating(c, direction) : "") +
      "</div></div>"
    );
  }

  function renderRating(c, direction) {
    var map = direction === "reverse" ? app.state.reverseCards : app.state.cards;
    var preview = FSRS.preview(map[c.id] || FSRS.newCard(c.id));
    var labels = ["Again", "Hard", "Good", "Easy"];
    var classes = ["again", "hard", "good", "easy"];
    return (
      '<div><div class="rating-label">How well did you know it?</div><div class="rating-row">' +
      preview
        .map(function (p, i) {
          return '<button class="rate-btn ' + classes[i] + '" data-action="rate" data-grade="' + (i + 1) + '">' + labels[i] + "<small>" + FSRS.formatInterval(p.intervalDays) + "</small></button>";
        })
        .join("") +
      "</div></div>"
    );
  }

  function renderMCQ(c, direction) {
    var reverse = direction === "reverse";
    var m = app.mcq || (reverse ? Deck.getReverseOptions(c) : Deck.getOptions(c));
    return (
      '<div class="card-stage">' +
      '<div class="card-kicker"><span>Multiple choice</span><span>' + (reverse ? "Which Korean word means this?" : "What does this word mean?") + "</span></div>" +
      '<div class="word ' + (reverse ? "prompt-cn" : "") + '">' + esc(reverse ? c.meaning_zh : c.word) + "</div>" +
      (!reverse && app.state.settings.showRomanization ? '<div class="word-rom">' + esc(c.romanization) + "</div>" : "") +
      '<div class="options">' +
      m.options
        .map(function (o, i) {
          return '<button class="option" data-action="option" data-index="' + i + '"><span class="key">' + (i + 1) + "</span>" + esc(o) + "</button>";
        })
        .join("") +
      "</div></div>"
    );
  }

  function renderResult(c, direction) {
    var last = app.last || { correct: false, dueLabel: "", grade: 3, mode: "back" };
    var isMCQ = last.mode === "mcq" || (app.mcq && last.selectedIndex != null);
    var beans = last.beans ? '<span class="pill" style="margin-left:8px;background:var(--surface-2);color:var(--gold)">+' + last.beans + " beans</span>" : "";
    var againRating = Number(last.grade) === 1 && last.mode !== "mcq";
    var banner = againRating
      ? '<div class="result-banner again">' + icon("clock") + "Again — this card will come back in a few cards." + beans + "</div>"
      : last.correct
      ? '<div class="result-banner good">' + icon("check") + "Correct — next review in " + esc(last.dueLabel) + beans + "</div>"
      : '<div class="result-banner bad">' + icon("x") + "Not quite — this card will come back in a few cards." + beans + "</div>";
    var options = "";
    if (isMCQ && app.mcq) {
      options =
        '<div class="options">' +
        app.mcq.options
          .map(function (o, i) {
            var cls = "";
            var mark = "";
            if (i === app.mcq.correctIndex) {
              cls = " correct";
              mark = '<span class="mark">' + icon("check") + "</span>";
            } else if (i === last.selectedIndex) {
              cls = " wrong";
              mark = '<span class="mark">' + icon("x") + "</span>";
            }
            return '<button class="option' + cls + '" disabled><span class="key">' + (i + 1) + "</span>" + esc(o) + mark + "</button>";
          })
          .join("") +
        "</div>";
    }
    return (
      '<div class="card-stage" style="align-items:stretch;text-align:left">' +
      banner +
      options +
      renderBack(c, false, direction) +
      '<div class="study-footer" style="margin-top:4px"><span class="muted">' + (last.mode === "back" ? (last.correct ? "Next word in 1s…" : "This card will return soon. Next word in 1s…") : (last.correct ? "Keep going." : "This card will return soon. Next word in 1s…")) + '</span><button class="btn btn-primary" data-action="next">' + (last.mode === "back" || !last.correct ? "Next now" : "Next") + " " + icon("arrow") + "</button></div>" +
      "</div>"
    );
  }

  function renderSummary() {
    var s = app.summary;
    if (!s) return "";
    var total = s.done;
    var accuracy = total ? Math.round((s.correct / total) * 100) : 0;
    var secs = Math.max(1, Math.round(((s.end || Date.now()) - s.start) / 1000));
    var direction = s.direction === "reverse" ? "reverse" : "forward";
    var missed = s.missed
      .map(function (id) {
        return Deck.byId[id];
      })
      .filter(Boolean)
      .slice(0, 8);
    var moreAction = buildQueue(direction).length ? "start" : "practice";
    var moreLabel = moreAction === "start" ? "Study more" : "Practice 10";
    return (
      '<div class="summary-card">' +
      '<p class="eyebrow">' + (direction === "reverse" ? "Recall session complete" : "Recognition session complete") + "</p>" +
      "<h1>" + (s.practice ? "Nice practice." : "Well done.") + "</h1>" +
      "<p>You studied " + total + " card" + (total === 1 ? "" : "s") + " in " + approxTime(secs) + " and earned <strong>" + (s.beans || 0) + " beans</strong> for the café.</p>" +
      '<div class="summary-stats">' +
      '<div class="summary-stat"><strong>' + total + "</strong><span>cards</span></div>" +
      '<div class="summary-stat"><strong>' + accuracy + "%</strong><span>accuracy</span></div>" +
      '<div class="summary-stat"><strong>' + s.newDone + "</strong><span>new words</span></div>" +
      '<div class="summary-stat"><strong>' + (s.beans || 0) + "</strong><span>beans</span></div>" +
      "</div>" +
      (missed.length
        ? '<div class="missed-list"><div class="rating-label" style="text-align:left">Worth another look</div>' +
          missed
            .map(function (m) {
              return '<div class="missed-row"><strong>' + esc(m.word) + "</strong><span>" + esc(m.meaning_zh) + "</span></div>";
            })
            .join("") +
          "</div>"
        : "") +
      '<div class="hero-actions" style="justify-content:center">' +
      '<button class="btn btn-primary btn-lg" data-action="home">Back to today</button>' +
      (missed.length ? '<button class="btn btn-soft btn-lg" data-action="review-missed">Review missed</button>' : "") +
      '<button class="btn btn-ghost btn-lg" data-action="' + moreAction + '">' + moreLabel + "</button>" +
      '<button class="btn btn-soft btn-lg" data-action="cafe">Visit café</button>' +
      "</div></div>"
    );
  }

  function renderCafe() {
    var cafe = app.state.cafe || { beans: 0, items: {}, totalEarned: 0, stars: 0, charms: {}, starUnits: {} };
    var level = Store.cafeLevel(app.state);
    var earned = cafe.totalEarned || 0;
    var intoLevel = earned % 200;
    var levelPct = Math.round((intoLevel / 200) * 100);
    var owned = cafe.items || {};
    var learnedWords = Deck.all.filter(function (c) {
      return app.state.cards[c.id].state !== "new" || app.state.reverseCards[c.id].state !== "new";
    }).length;
    var ownedCount = Cafe.items.filter(function (i) {
      return owned[i.id];
    }).length;
    var beans = cafe.beans || 0;
    var stars = cafe.stars || 0;
    var starStats = Store.grammarStars(app.state);
    var charms = cafe.charms || {};
    var charmCatalog = Cafe.charms || [];
    var charmCount = Object.keys(charms).length;
    var cafeQueue = buildQueue(app.dashboardDirection);
    var studyAction = cafeQueue.length ? "start" : "practice";
    var shop = Cafe.items
      .map(function (item) {
        var has = !!owned[item.id];
        var locked = level < item.level;
        var afford = beans >= item.cost;
        var action = has
          ? '<span class="pill mature">Owned</span>'
          : locked
          ? '<span class="pill">Level ' + item.level + "</span>"
          : '<button class="btn ' + (afford ? "btn-soft" : "btn-ghost") + '" data-action="buy-item" data-item="' + item.id + '"' + (afford ? "" : " disabled") + ">Buy</button>";
        return (
          '<div class="shop-card ' + (has ? "owned" : "") + " " + (locked ? "locked" : "") + '">' +
          '<div class="shop-icon">' + item.icon + "</div>" +
          "<h3>" + esc(item.name) + "</h3>" +
          "<p>" + esc(item.desc) + "</p>" +
          '<div class="shop-meta"><span class="cost">' + icon("bean") + item.cost + "</span>" + action + "</div>" +
          "</div>"
        );
      })
      .join("");
    var charmCards = charmCatalog
      .map(function (item) {
        var has = !!charms[item.id];
        var can = stars >= item.stars && beans >= item.beans;
        var action = has
          ? '<span class="pill mature">Synthesized</span>'
          : '<button class="btn ' + (can ? "btn-soft" : "btn-ghost") + '" data-action="synth-item" data-item="' + item.id + '" title="Costs ' + item.stars + ' stars and ' + item.beans + ' beans"' + (can ? "" : " disabled") + ">Synthesize</button>";
        return (
          '<div class="shop-card charm-card ' + (has ? "owned" : "") + '">' +
          '<div class="charm-glyph" style="background:' + esc(item.color) + '">' + esc(item.glyph) + "</div>" +
          "<h3>" + esc(item.name) + "</h3>" +
          "<p>" + esc(item.desc) + "</p>" +
          '<div class="shop-meta"><span class="cost">' + icon("star") + item.stars + " · " + icon("bean") + item.beans + "</span>" + action + "</div>" +
          "</div>"
        );
      })
      .join("");
    return (
      '<div class="cafe-page">' +
      '<div class="page-head"><div><p class="eyebrow">Your little corner</p><h1>Hangul Café</h1><p>Every review earns beans; every completed grammar unit earns a star.</p></div>' +
      '<div class="cafe-wallet">' +
      '<div class="bean-pill" style="font-size:14px;padding:10px 14px">' + icon("bean") + " " + beans.toLocaleString() + " beans</div>" +
      '<div class="bean-pill star-pill" style="font-size:14px;padding:10px 14px">' + icon("star") + " " + stars + " " + starWord(stars) + "</div>" +
      "</div></div>" +
      '<div class="cafe-layout">' +
      "<div>" +
      Cafe.scene(owned, learnedWords, level, charms) +
      '<div class="cafe-scene-footer"><div><strong>Level ' + level + "</strong><span> · " + learnedWords + " regulars · " + ownedCount + " / " + Cafe.items.length + " items · " + charmCount + " " + (charmCount === 1 ? "charm" : "charms") + "</span></div>" +
      '<button class="btn btn-ghost btn-sm" data-action="' + studyAction + '">Study for more beans ' + icon("arrow") + "</button></div>" +
      "</div>" +
      '<div class="cafe-side">' +
      '<div class="cafe-balance">' +
      '<div class="row"><div><h2>Your wallet</h2><p>Beans from reviews; stars from grammar units.</p></div><div class="beans-big">' + icon("bean") + beans.toLocaleString() + "</div></div>" +
      '<div class="level-line"><div class="level-track"><div class="level-fill" style="width:' + levelPct + '%"></div></div>' +
      '<div class="level-meta"><span>Level ' + level + "</span><span>" + intoLevel + " / 200 to level " + (level + 1) + "</span></div></div>" +
      '<div class="cafe-star-balance"><span>' + icon("star") + " " + stars + " grammar " + starWord(stars) + "</span><span>" + starStats.units + " / " + starStats.total + " units complete</span></div>" +
      '<p class="about-box" style="margin:14px 0 0">Review +1 bean · correct +1 · new word +2<br>First review of the day +5 · daily goal +15<br>Complete a grammar unit +1 star</p>' +
      "</div>" +
      '<div class="shop-panel"><h2>Furnish the café</h2><p>Buy something cozy. Items stay forever.</p><div class="shop-grid">' + shop + "</div></div>" +
      "</div>" +
      "</div>" +
      '<div class="shop-panel atelier-panel" id="atelier"><div class="panel-head"><h2>Grammar atelier</h2><span>' + stars + " " + starWord(stars) + " · " + starStats.units + " / " + starStats.total + " units</span></div>" +
      '<p class="atelier-intro">Complete a whole grammar unit to earn a star. Synthesize permanent study charms with stars and beans; each one appears on the café wall.</p>' +
      '<div class="charm-grid">' + charmCards + "</div>" +
      '<div class="atelier-foot"><button class="btn btn-ghost btn-sm" data-action="grammar">Open grammar path ' + icon("arrow") + '</button><span class="muted">' + charmCount + " / " + Cafe.charms.length + " charms synthesized</span></div></div>" +
      "</div>"
    );
  }

  function renderBrowse() {
    var q = app.browse.query;
    var filter = app.browse.filter;
    var results = Deck.search(q).filter(function (c) {
      return filter === "all" || Deck.status(app.state.cards[c.id]) === filter;
    });
    var shown = results.slice(0, app.browse.limit);
    var rows = shown
      .map(function (c) {
        var cs = app.state.cards[c.id];
        var st = Deck.status(cs);
        return (
          '<div class="word-row" data-action="open-card" data-id="' + esc(c.id) + '">' +
          '<div><div class="ko">' + esc(c.word) + '</div><div class="rom">' + esc(c.romanization) + "</div></div>" +
          '<div class="meaning">' + esc(c.meaning_zh) + "</div>" +
          '<div><span class="pill ' + st + '">' + st + "</span></div>" +
          '<div class="due">' + (cs.state === "new" ? "new" : "due " + FSRS.dueLabel(cs.due)) + "</div>" +
          '<div class="audio"><button class="speaker small soft" data-action="play-card-word" data-id="' + esc(c.id) + '" aria-label="Play word">' + icon("speaker", 16) + "</button></div>" +
          "</div>"
        );
      })
      .join("");
    var chips = [
      ["all", "All"],
      ["new", "New"],
      ["learning", "Learning"],
      ["young", "Young"],
      ["mature", "Mature"],
    ]
      .map(function (x) {
        return '<button class="chip ' + (filter === x[0] ? "active" : "") + '" data-action="filter" data-filter="' + x[0] + '">' + x[1] + "</button>";
      })
      .join("");
    return (
      '<div class="page-head"><div><p class="eyebrow">The deck</p><h1>Word List</h1><p>' + Deck.count.toLocaleString() + " entries — search by Korean, romanization, hanja, or Chinese.</p></div>" +
      '<button class="btn btn-primary" data-action="start">Study due cards ' + icon("arrow") + "</button></div>" +
      '<div class="search-wrap">' + icon("search") + '<input class="search" type="search" placeholder="Search 1,315 words…" value="' + esc(q) + '" data-role="search" /></div>' +
      '<div class="chips">' + chips + '<span class="muted" style="font-size:11px;align-self:center;margin-left:auto">' + results.length + " results</span></div>" +
      '<div class="word-list">' + (rows || '<div class="empty">No words match that search.</div>') + "</div>" +
      (results.length > shown.length ? '<div style="text-align:center;margin-top:16px"><button class="btn btn-ghost" data-action="load-more">Show more</button></div>' : "")
    );
  }

  function renderStats() {
    var direction = app.statsDirection === "reverse" ? "reverse" : "forward";
    var isRev = direction === "reverse";
    var map = isRev ? app.state.reverseCards : app.state.cards;
    var m = Store.mastery(app.state, direction);
    var total = Deck.count;
    var learned = total - m.new;
    var totals = Store.totals(app.state, 30, direction);
    var streak = app.state.streak;
    var grammarProg = Store.grammarProgress(app.state);
    var grammarNext = grammarNextItem();
    var grammarStarStats = Store.grammarStars(app.state);
    var readingProg = Store.readingProgress(app.state);
    var readingNext = readerNextText();
    var forecast = Store.forecast(app.state, 14, Date.now(), direction);
    var maxF = Math.max.apply(
      null,
      forecast.map(function (d) {
        return d.count;
      }).concat([1])
    );
    var bars = forecast
      .map(function (d, i) {
        var height = Math.max(3, Math.round((d.count / maxF) * 100));
        var label = i % 3 === 0 ? new Date(d.date).toLocaleDateString(undefined, { day: "numeric" }) : "";
        return '<div class="bar-col"><div class="bar" style="--h:' + height + '" title="' + d.count + ' due"></div><span>' + label + "</span></div>";
      })
      .join("");
    var act = Store.activity(app.state, 91);
    var maxAct = Math.max.apply(null, act.map(function (a) { return a.reviews; }).concat([1]));
    var heat = act
      .map(function (a) {
        var lvl = a.reviews === 0 ? 0 : Math.min(4, Math.ceil((a.reviews / maxAct) * 4));
        return '<div class="heat-cell ' + (lvl ? "l" + lvl : "") + '" title="' + a.date + ": " + a.reviews + ' reviews"></div>';
      })
      .join("");
    var hard = Object.keys(map)
      .map(function (id) {
        return { c: Deck.byId[id], s: map[id] };
      })
      .filter(function (x) {
        return x.c && x.s.lapses > 0;
      })
      .sort(function (a, b) {
        return b.s.lapses - a.s.lapses;
      })
      .slice(0, 8);
    var segs = [
      { key: "new", label: "New", color: "var(--accent)", n: m.new },
      { key: "learning", label: "Learning", color: "var(--gold)", n: m.learning },
      { key: "young", label: "Young", color: "var(--teal)", n: m.young },
      { key: "mature", label: "Mature", color: "var(--green)", n: m.mature },
    ];
    var circ = 2 * Math.PI * 15.9155;
    var offset = 0;
    var donut = segs
      .map(function (s) {
        var len = total ? (s.n / total) * circ : 0;
        var el = '<circle r="15.9155" cx="21" cy="21" fill="none" stroke="' + s.color + '" stroke-width="6" stroke-dasharray="' + len + " " + (circ - len) + '" stroke-dashoffset="' + (-offset) + '"></circle>';
        offset += len;
        return el;
      })
      .join("");
    return (
      '<div class="page-head"><div><p class="eyebrow">Your progress</p><h1>The long game</h1><p>Consistency beats cramming. ' + (isRev ? "Recall (Chinese → Korean)" : "Recognition (Korean → Chinese)") + " progress below.</p></div></div>" +
      '<div class="mode-switch">' +
      '<button class="mode-btn ' + (!isRev ? "active" : "") + '" data-action="set-stats-direction" data-direction="forward">Recognition<small>Korean → Chinese</small></button>' +
      '<button class="mode-btn ' + (isRev ? "active" : "") + '" data-action="set-stats-direction" data-direction="reverse">Recall<small>Chinese → Korean</small></button>' +
      "</div>" +
      '<div class="stat-large">' +
      '<div class="metric"><strong>' + learned.toLocaleString() + "</strong><span>" + (isRev ? "words recalled" : "words recognized") + "</span></div>" +
      '<div class="metric"><strong>' + m.mature.toLocaleString() + "</strong><span>mature words</span></div>" +
      '<div class="metric"><strong>' + (totals.reviews ? Math.round(totals.accuracy * 100) + "%" : "—") + "</strong><span>accuracy · 30d</span></div>" +
      '<div class="metric"><strong>' + streak.current + "</strong><span>day streak · best " + streak.longest + "</span></div>" +
      "</div>" +
      '<div class="two-col">' +
      '<div class="panel"><div class="panel-head"><h2>' + (isRev ? "Recall mastery" : "Recognition mastery") + '</h2><span>' + learned + " / " + total + "</span></div>" +
      '<div class="donut-wrap"><svg class="donut" viewBox="0 0 42 42"><circle r="15.9155" cx="21" cy="21" fill="none" stroke="var(--surface-2)" stroke-width="6"></circle>' + donut + '<text x="21" y="20.5" text-anchor="middle" font-size="5.4" font-weight="800" fill="var(--ink)">' + Math.round((learned / total) * 100) + '%</text><text x="21" y="25.3" text-anchor="middle" font-size="2.6" fill="var(--muted)">learned</text></svg>' +
      '<div class="donut-legend">' + segs.map(function (s) { return '<div><span class="dot" style="background:' + s.color + '"></span>' + s.label + " · " + s.n + "</div>"; }).join("") + "</div></div></div>" +
      '<div class="panel"><div class="panel-head"><h2>Next 14 days · ' + (isRev ? "recall" : "recognition") + '</h2><span>' + forecast.reduce(function (a, b) { return a + b.count; }, 0) + " reviews</span></div><div class=\"bars\">" + bars + "</div></div>" +
      "</div>" +
      '<div class="panel" style="margin-bottom:18px"><div class="panel-head"><h2>Activity</h2><span>last 13 weeks · both modes</span></div><div class="heatmap">' + heat + "</div></div>" +
      '<div class="panel" style="margin-bottom:18px"><div class="panel-head"><h2>Grammar path</h2><span>' + grammarProg.completed + " / " + grammarProg.total + " lessons · ★ " + grammarStarStats.balance + "</span></div>" +
      grammarProgressHtml(grammarProg.completed, grammarProg.total, false) +
      '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:14px">' +
      (grammarNext ? '<a class="btn btn-soft btn-sm" href="#/grammar/item/' + esc(grammarNext.id) + '">Continue · ' + esc(grammarNext.title) + "</a>" : '<span class="pill mature">All lessons complete</span>') +
      '<a class="btn btn-ghost btn-sm" href="#/grammar">Grammar index ' + icon("arrow") + '</a><button class="btn btn-soft btn-sm" data-action="atelier">Atelier ' + icon("arrow") + "</button></div></div>" +
      '<div class="panel" style="margin-bottom:18px"><div class="panel-head"><h2>Reader</h2><span>' + readingProg.read + " / " + readingProg.total + " texts read</span></div>" +
      '<div class="level-track" role="progressbar" aria-label="Reader progress" aria-valuemin="0" aria-valuemax="' + readingProg.total + '" aria-valuenow="' + readingProg.read + '"><div class="level-fill" style="width:' + (readingProg.total ? Math.round((readingProg.read / readingProg.total) * 100) : 0) + '%"></div></div>' +
      '<div class="level-meta"><span>Comprehensible input</span><span>' + (readingProg.total ? Math.round((readingProg.read / readingProg.total) * 100) : 0) + '%</span></div>' +
      '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:14px">' +
      (readingNext ? '<a class="btn btn-soft btn-sm" href="#/reader/' + esc(readingNext.id) + '">Continue · ' + esc(readingNext.title) + "</a>" : '<span class="pill mature">All texts read</span>') +
      '<a class="btn btn-ghost btn-sm" href="#/reader">Reader index ' + icon("arrow") + "</a></div></div>" +
      '<div class="two-col">' +
      '<div class="panel"><div class="panel-head"><h2>Leeches · ' + (isRev ? "recall" : "recognition") + '</h2><span>most lapses</span></div><div class="hard-list">' +
      (hard.length
        ? hard.map(function (x) { return '<div class="hard-row"><span class="ko">' + esc(x.c.word) + '</span><span class="meaning">' + esc(x.c.meaning_zh) + '</span><span class="lapses">' + x.s.lapses + " lapses</span></div>"; }).join("")
        : '<div class="empty">No leeches yet — nice.</div>') +
      "</div></div>" +
      '<div class="panel"><div class="panel-head"><h2>Recent activity</h2><span>last 7 days</span></div><div class="hard-list">' +
      Store.activity(app.state, 14)
        .slice(-7)
        .reverse()
        .map(function (a) {
          return '<div class="hard-row"><span class="ko" style="min-width:82px">' + a.date.slice(5) + '</span><span class="meaning">' + a.reviews + " reviews</span><span class=\"lapses\" style=\"background:var(--teal-soft);color:var(--teal)\">" + Math.round((a.correct / (a.reviews || 1)) * 100) + "%</span></div>";
        })
        .join("") +
      "</div></div>" +
      "</div>"
    );
  }

  function renderSettings() {
    var s = app.state.settings;
    function toggle(key, label, desc) {
      return (
        '<div class="field"><div><label>' + label + '</label><span class="desc">' + desc + "</span></div>" +
        '<button class="toggle ' + (s[key] ? "on" : "") + '" data-action="toggle-setting" data-setting="' + key + '" aria-pressed="' + (s[key] ? "true" : "false") + '" aria-label="' + label + '"></button></div>'
      );
    }
    return (
      '<div class="page-head"><div><p class="eyebrow">Preferences</p><h1>Settings</h1><p>Make the session fit your day and your memory.</p></div></div>' +
      '<div class="settings-grid">' +
      '<div class="settings-panel"><h2>Daily limits</h2><p>These limits apply separately to recognition and recall.</p>' +
      '<div class="field"><div><label>New cards per day</label><span class="desc">Per mode. 20 is a good default; lower it if reviews pile up.</span></div><input type="number" min="0" max="100" value="' + Number(s.newPerDay) + '" data-setting="newPerDay" /></div>' +
      '<div class="field"><div><label>Review limit per day</label><span class="desc">Per mode. Stops the queue from becoming overwhelming.</span></div><input type="number" min="0" max="500" value="' + Number(s.reviewsPerDay) + '" data-setting="reviewsPerDay" /></div>' +
      '<div class="field"><div><label>Daily goal</label><span class="desc">Total answers across both modes that earns the café bonus.</span></div><input type="number" min="1" max="300" value="' + Number(s.dailyGoal || 20) + '" data-setting="dailyGoal" /></div>' +
      "</div>" +
      '<div class="settings-panel"><h2>Audio</h2><p>The recordings are short and clear. Autoplay is on by default.</p>' +
      toggle("autoplayWord", "Autoplay the word", "Play the word when each card appears.") +
      toggle("autoplayExample", "Autoplay the example", "Play the sentence when the answer is revealed.") +
      '<div class="field"><div><label>Playback speed</label><span class="desc">Slow down if the audio feels fast.</span></div><select data-setting="audioRate"><option value="0.8"' + (Number(s.audioRate) === 0.8 ? " selected" : "") + '>0.8×</option><option value="1"' + (Number(s.audioRate) === 1 ? " selected" : "") + '>1×</option><option value="1.2"' + (Number(s.audioRate) === 1.2 ? " selected" : "") + '>1.2×</option></select></div>' +
      "</div>" +
      '<div class="settings-panel"><h2>Display</h2><p>Keep the front of the card as minimal as you like.</p>' +
      toggle("showRomanization", "Show romanization", "Revised Romanization under the Korean word.") +
      toggle("showHanja", "Show hanja", "Sino-Korean characters on the answer side.") +
      '<div class="field"><div><label>Theme</label><span class="desc">System follows your Mac/phone setting.</span></div><select data-setting="theme"><option value="system"' + (s.theme === "system" ? " selected" : "") + '>System</option><option value="light"' + (s.theme === "light" ? " selected" : "") + '>Light</option><option value="dark"' + (s.theme === "dark" ? " selected" : "") + '>Dark</option></select></div>' +
      "</div>" +
      '<div class="settings-panel"><h2>Progress data</h2><p>Everything is stored locally in this browser. Export a backup before clearing site data.</p>' +
      '<div class="settings-actions"><button class="btn btn-soft" data-action="export">Export progress</button><button class="btn btn-ghost" data-action="import">Import</button><button class="btn btn-danger" data-action="reset">Reset all progress</button></div>' +
      '<p class="about-box" style="margin-top:16px"><strong>' + Deck.count.toLocaleString() + ' cards</strong> · FSRS scheduling · local-first; cloud sync is optional.<br>Keyboard: Space to reveal, 1–4 to answer/rate, A/S for audio, Esc to exit.</p>' +
      "</div>" +
      '<div class="settings-panel sync-panel"><h2>Cloud sync</h2>' + (window.CloudSync ? CloudSync.settingsHtml() : '<p class="sync-status error">Cloud sync module not loaded.</p>') + "</div>" +
      "</div>"
    );
  }

  function openCard(id) {
    var c = Deck.byId[id];
    if (!c) return;
    var f = app.state.cards[id];
    var r = app.state.reverseCards[id];
    document.body.style.overflow = "hidden";
    document.getElementById("modal-root").innerHTML =
      '<div class="modal-backdrop" data-action="close-modal"><div class="modal" role="dialog" aria-modal="true">' +
      '<div class="modal-head"><div><div class="modal-word">' + esc(c.word) + '</div><div class="modal-rom">' + esc(c.romanization) + "</div></div>" +
      '<button class="icon-btn" data-action="close-modal" aria-label="Close">' + icon("x") + "</button></div>" +
      '<div class="modal-meaning">' + esc(c.meaning_zh) + (Deck.hanjaReliable(c) ? ' <span class="hanja-chip" style="margin-left:6px"><b>' + esc(c.hanja) + "</b></span>" : "") + "</div>" +
      (c.alt_meanings && c.alt_meanings.length ? '<div class="meaning-sub">also: ' + esc(c.alt_meanings.join(" · ")) + "</div>" : "") +
      '<div class="modal-example"><div class="ko">' + esc(c.example_ko) + "</div>" +
      (app.state.settings.showRomanization ? '<div class="example-rom">' + esc(c.example_romanization) + "</div>" : "") +
      '<div class="zh">' + esc(c.example_zh) + "</div></div>" +
      '<div class="settings-actions" style="margin:0 0 14px">' +
      '<button class="btn btn-soft btn-sm" data-action="play-card-word" data-id="' + esc(c.id) + '">' + icon("speaker", 15) + ' Word</button>' +
      '<button class="btn btn-ghost btn-sm" data-action="play-card-example" data-id="' + esc(c.id) + '">' + icon("speaker", 15) + ' Example</button></div>' +
      '<div class="rating-label" style="text-align:left">Recognition</div>' +
      '<div class="modal-stats"><div class="modal-stat"><strong>' + Deck.statusLabel(f) + "</strong><span>status</span></div><div class=\"modal-stat\"><strong>" + (f.state === "new" ? "—" : FSRS.dueLabel(f.due)) + "</strong><span>due</span></div><div class=\"modal-stat\"><strong>" + (f.reps || 0) + "</strong><span>reviews</span></div><div class=\"modal-stat\"><strong>" + (f.lapses || 0) + "</strong><span>lapses</span></div></div>" +
      '<div class="rating-label" style="text-align:left">Recall</div>' +
      '<div class="modal-stats"><div class="modal-stat"><strong>' + Deck.statusLabel(r) + "</strong><span>status</span></div><div class=\"modal-stat\"><strong>" + (r.state === "new" ? "—" : FSRS.dueLabel(r.due)) + "</strong><span>due</span></div><div class=\"modal-stat\"><strong>" + (r.reps || 0) + "</strong><span>reviews</span></div><div class=\"modal-stat\"><strong>" + (r.lapses || 0) + "</strong><span>lapses</span></div></div>" +
      '<div class="settings-actions"><button class="btn btn-primary" data-action="practice-card" data-id="' + esc(c.id) + '" data-direction="forward">Practice recognition</button>' +
      '<button class="btn btn-soft" data-action="practice-card" data-id="' + esc(c.id) + '" data-direction="reverse">Practice recall</button>' +
      '<button class="btn btn-ghost" data-action="close-modal">Close</button></div>' +
      "</div></div>";
  }

  function closeModal() {
    document.getElementById("modal-root").innerHTML = "";
    document.body.style.overflow = "";
  }

  function exportProgress() {
    var data = Store.exportProgress(app.state);
    var blob = new Blob([data], { type: "application/json" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = "hangul-deck-progress.json";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () {
      URL.revokeObjectURL(url);
    }, 1000);
    toast("Progress exported.");
  }

  function importProgress() {
    var input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json,.json";
    input.onchange = function () {
      var file = input.files && input.files[0];
      if (!file) return;
      var reader = new FileReader();
      reader.onload = function () {
        try {
          var next = Store.importProgress(String(reader.result));
          Deck.all.forEach(function (c) {
            Store.getCard(next, c.id, "forward");
            Store.getCard(next, c.id, "reverse");
          });
          app.state = next;
          Store.syncGrammarStars(app.state);
          Store.save(app.state);
          app.grammarExercise = null;
          app.grammarSearch = "";
          app.readerLevel = "all";
          app.readerTranslation = false;
          app.readerRate = 0.9;
          readerStop();
          applyTheme();
          render();
          toast("Progress imported.");
        } catch (e) {
          toast(e.message || "Could not import that file.", "error");
        }
      };
      reader.readAsText(file);
    };
    input.click();
  }

  /* ---------------------------------------------------------------------
     Graded reader: comprehensible input with hover glosses and TTS.
     --------------------------------------------------------------------- */

  function readerRead(id) {
    return !!(app.state.reading && app.state.reading[id] && app.state.reading[id].read);
  }

  function readerNextText() {
    return READER_TEXTS.filter(function (text) {
      return !readerRead(text.id);
    })[0];
  }

  function readerLevelInfo(level) {
    return RL[level] || { id: level, name: "", en: "", desc: "" };
  }

  function readerWordCount(text) {
    return text.lines.reduce(function (n, line) {
      return n + cleanMarkup(line.ko).split(/\s+/).filter(Boolean).length;
    }, 0);
  }

  function readerWordInfo(word) {
    var res = resolveGloss(word);
    if (!res) return { word: word, rom: "", meaning: "", hanja: "" };
    if (res.kind === "word") {
      return {
        word: res.card.word,
        rom: res.card.romanization || "",
        meaning: res.card.meaning_zh || "",
        hanja: Deck.hanjaReliable(res.card) ? res.card.hanja || "" : "",
      };
    }
    var entry = res.entry || {};
    return {
      word: entry.word || word,
      rom: entry.r || "",
      meaning: entry.zh || "",
      hanja: "",
    };
  }

  function renderReader() {
    var parts = app.readerRoute || [];
    if (parts[0] && RI[parts[0]]) return renderReaderText(parts[0]);
    return renderReaderIndex();
  }

  function renderReaderIndex() {
    var prog = Store.readingProgress(app.state);
    var next = readerNextText();
    var filter = app.readerLevel || "all";
    var pct = prog.total ? Math.round((prog.read / prog.total) * 100) : 0;
    var list = READER_TEXTS.filter(function (text) {
      return filter === "all" || String(text.level) === String(filter);
    });
    var totalWords = READER_TEXTS.reduce(function (n, text) { return n + readerWordCount(text); }, 0);
    var chips = [["all", "All levels"]]
      .concat(READER_LEVELS.map(function (level) {
        return [String(level.id), level.id + " · " + level.name + " · " + level.en];
      }))
      .map(function (x) {
        return '<button class="chip ' + (String(filter) === x[0] ? "active" : "") + '" data-action="reader-level" data-level="' + x[0] + '">' + esc(x[1]) + "</button>";
      })
      .join("");
    var cards = list.map(function (text) {
      var level = readerLevelInfo(text.level);
      var words = readerWordCount(text);
      var minutes = Math.max(1, Math.round(words / 90));
      var read = readerRead(text.id);
      return (
        '<a class="reader-card reader-level-' + esc(String(text.level)) + '" href="#/reader/' + esc(text.id) + '">' +
        '<div class="reader-card-top"><span class="reader-level-badge reader-level-' + esc(String(text.level)) + '">L' + esc(String(text.level)) + " · " + esc(level.name) + '</span>' + (read ? '<span class="pill mature">read</span>' : "") + "</div>" +
        '<div class="reader-card-icon" aria-hidden="true">' + esc(text.icon) + "</div>" +
        "<h3>" + esc(text.title) + "</h3>" +
        '<p class="reader-card-sub">' + esc(text.subtitle) + "</p>" +
        "<p>" + esc(text.summary) + "</p>" +
        '<div class="reader-card-meta"><span>' + words + " words</span><span>~" + minutes + " min</span><span>" + text.grammar.length + " grammar points</span></div>" +
        "</a>"
      );
    }).join("");
    return (
      '<div class="reader-page">' +
      '<div class="page-head"><div><p class="eyebrow">Comprehensible input</p><h1>Reader</h1><p>Read and listen to Korean from first words to longer stories. Hover any highlighted word for help.</p></div>' +
      '<div class="bean-pill" style="font-size:13px;padding:9px 13px">' + icon("book") + " " + prog.read + " / " + prog.total + " read</div></div>" +
      '<div class="reader-intro">' +
      '<div><p class="eyebrow">The natural way</p><h2>Read first. Translate later.</h2><p>Start with a short text and read it once without translating. Let the situation and repeated words carry you. Hover underlined words, listen line by line, and only open the Chinese translation when you need a check.</p></div>' +
      '<div class="reader-steps"><div><strong>1</strong><span>Read</span></div><div><strong>2</strong><span>Listen</span></div><div><strong>3</strong><span>Re-read</span></div></div>' +
      "</div>" +
      '<div class="reader-progress-panel"><div class="level-track" role="progressbar" aria-label="Reader progress" aria-valuemin="0" aria-valuemax="' + prog.total + '" aria-valuenow="' + prog.read + '"><div class="level-fill" style="width:' + pct + '%"></div></div><div class="level-meta"><span>' + prog.read + " / " + prog.total + " texts read · " + totalWords + " words in the reader</span><span>" + pct + "%</span></div></div>" +
      (next
        ? '<a class="grammar-continue reader-continue" href="#/reader/' + esc(next.id) + '"><div class="cafe-mini-art">' + esc(next.icon) + '</div><div><h2>Continue · ' + esc(next.title) + '</h2><p>Level ' + esc(String(next.level)) + " · " + esc(next.subtitle) + " · " + readerWordCount(next) + " words</p></div><span class=\"btn btn-primary\">Open text " + icon("arrow") + "</span></a>"
        : '<div class="grammar-continue done"><div class="cafe-mini-art">✓</div><div><h2>Every text read</h2><p>Revisit any level whenever you want.</p></div></div>') +
      '<div class="chips reader-level-chips">' + chips + "</div>" +
      '<div class="reader-grid">' + (cards || '<div class="empty">No texts in this level yet.</div>') + "</div>" +
      "</div>"
    );
  }

  function renderReaderText(textId) {
    var text = RI[textId];
    if (!text) return renderReaderIndex();
    var level = readerLevelInfo(text.level);
    var read = readerRead(textId);
    var words = readerWordCount(text);
    var minutes = Math.max(1, Math.round(words / 90));
    var index = READER_TEXTS.map(function (t) { return t.id; }).indexOf(textId);
    var prev = index > 0 ? READER_TEXTS[index - 1] : null;
    var next = index >= 0 && index < READER_TEXTS.length - 1 ? READER_TEXTS[index + 1] : null;
    var transOn = !!app.readerTranslation;
    var wordList = text.vocab.map(function (word) {
      var info = readerWordInfo(word);
      return (
        '<button class="reader-word" data-action="reader-word" data-text="' + esc(word) + '">' +
        "<strong>" + esc(info.word) + "</strong>" +
        "<span>" + esc(info.meaning) + "</span>" +
        (info.rom ? '<small>' + esc(info.rom) + "</small>" : "") +
        "</button>"
      );
    }).join("");
    var grammarTags = text.grammar.map(function (id) {
      var g = GI[id];
      if (!g) return "";
      return '<a class="reader-grammar-tag" href="#/grammar/item/' + esc(g.id) + '"><strong>' + esc(g.title) + '</strong><span>' + esc(g.pattern) + "</span></a>";
    }).join("");
    var lines = text.lines.map(function (line, i) {
      return (
        '<div class="reader-line" data-reader-line="' + i + '">' +
        '<button class="reader-line-audio" data-action="reader-line" data-index="' + i + '" aria-label="Listen to line ' + (i + 1) + '">' + icon("speaker", 15) + "</button>" +
        '<div><p class="reader-ko" lang="ko">' + glossMarkup(line.ko, [], null) + '</p><p class="reader-zh" lang="zh-CN">' + esc(line.zh) + "</p></div>" +
        "</div>"
      );
    }).join("");
    var rates = [0.75, 0.9, 1.05].map(function (rate) {
      return '<button class="reader-rate-btn ' + (Number(app.readerRate) === rate ? "active" : "") + '" data-action="reader-rate" data-rate="' + rate + '" aria-pressed="' + (Number(app.readerRate) === rate ? "true" : "false") + '">' + rate + "×</button>";
    }).join("");
    return (
      '<div class="reader-page">' +
      '<div class="grammar-breadcrumb"><a href="#/reader">Reader</a><span>/</span><span>Level ' + esc(String(text.level)) + " · " + esc(level.name) + "</span><span>/</span><span>" + esc(text.title) + "</span></div>" +
      '<div class="grammar-hero reader-hero"><div class="reader-hero-cover" aria-hidden="true">' + esc(text.icon) + '</div><div><p class="eyebrow">Level ' + esc(String(text.level)) + " · " + esc(level.name) + " · " + esc(level.en) + "</p><h1>" + esc(text.title) + '</h1><p class="reader-hero-sub">' + esc(text.subtitle) + "</p><p>" + esc(text.summary) + '</p><div class="reader-hero-meta"><span>' + words + ' words</span><span>~' + minutes + ' min</span><span>' + text.grammar.length + ' grammar points</span>' + (read ? '<span class="pill mature">read</span>' : "") + "</div></div></div>" +
      '<div class="reader-layout"><div class="reader-main">' +
      '<div class="reader-toolbar">' +
      '<button class="btn btn-primary" data-action="reader-play">' + icon("speaker", 16) + " Play all</button>" +
      '<button class="btn btn-ghost" data-action="reader-stop">Stop</button>' +
      '<button class="btn ' + (transOn ? "btn-soft" : "btn-ghost") + '" data-action="reader-translation" aria-pressed="' + (transOn ? "true" : "false") + '">' + (transOn ? "Hide translation" : "Show translation") + "</button>" +
      '<div class="reader-rate"><span>Speed</span>' + rates + "</div>" +
      "</div>" +
      '<div class="panel reader-text-panel ' + (transOn ? "translation-on" : "") + '"><div class="panel-head"><h2>Read &amp; listen</h2><span>hover words · tap the speaker for one line</span></div><div class="reader-lines">' + lines + "</div></div>" +
      '<div class="reader-prevnext">' + (prev ? '<a class="btn btn-ghost" href="#/reader/' + esc(prev.id) + '">' + icon("back") + " Previous</a>" : "<span></span>") + (next ? '<a class="btn btn-soft" href="#/reader/' + esc(next.id) + '">Next text ' + icon("arrow") + "</a>" : '<a class="btn btn-soft" href="#/reader">Reader index ' + icon("arrow") + "</a>") + "</div>" +
      "</div><aside class=\"reader-side\">" +
      '<div class="panel"><div class="panel-head"><h2>New words</h2><span>tap to hear</span></div><div class="reader-word-list">' + (wordList || '<p class="muted">No word list for this text.</p>') + "</div></div>" +
      '<div class="panel"><div class="panel-head"><h2>Grammar in this text</h2><span>' + text.grammar.length + " points</span></div><div class=\"reader-grammar-list\">" + (grammarTags || '<p class="muted">No grammar tags.</p>') + "</div></div>" +
      '<div class="panel"><div class="panel-head"><h2>Your reading</h2><span>' + (read ? "finished" : "in progress") + "</span></div>" +
      '<p class="about-box">' + (read ? "You have finished this text. Read it again anytime; the audio and glosses stay available." : "Mark this text as read after you finish. First read earns +5 beans.") + "</p>" +
      (read ? '<span class="pill mature">Read</span>' : '<button class="btn btn-primary btn-sm" data-action="reader-read">Mark as read · +5 beans</button>') +
      "</div>" +
      '<div class="panel"><div class="panel-head"><h2>How to read</h2><span>natural method</span></div><p class="reader-howto">Read the Korean first without translation. Use the situation and repeated words to guess. Hover underlined words only when needed. Listen to a line, then read it aloud. Show Chinese at the end as a check, not as the first step.</p></div>' +
      "</aside></div></div>"
    );
  }

  function readerClearHighlight() {
    var current = document.querySelector(".reader-line.playing");
    if (current) current.classList.remove("playing");
  }

  function readerStop() {
    app.readerPlaying = false;
    app.readerToken = (app.readerToken || 0) + 1;
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    readerClearHighlight();
  }

  function readerVoice(text, rate) {
    var u = new window.SpeechSynthesisUtterance(text);
    u.lang = "ko-KR";
    u.rate = rate;
    if (window.speechSynthesis && window.speechSynthesis.getVoices) {
      var korean = window.speechSynthesis.getVoices().filter(function (voice) {
        return (voice.lang || "").toLowerCase().indexOf("ko") === 0;
      })[0];
      if (korean) u.voice = korean;
    }
    return u;
  }

  function readerSpeakLine(index) {
    var text = RI[(app.readerRoute || [])[0]];
    if (!text || !text.lines[index]) return;
    if (!window.speechSynthesis || !window.SpeechSynthesisUtterance) {
      toast("Speech audio is not available in this browser.");
      return;
    }
    readerStop();
    var el = document.querySelector('[data-reader-line="' + index + '"]');
    if (el) {
      el.classList.add("playing");
      el.scrollIntoView({ block: "nearest" });
    }
    app.readerPlaying = true;
    var token = app.readerToken;
    var u = readerVoice(cleanMarkup(text.lines[index].ko), Number(app.readerRate) || 0.9);
    u.onend = function () {
      if (token !== app.readerToken) return;
      if (el) el.classList.remove("playing");
      app.readerPlaying = false;
    };
    u.onerror = function () {
      if (token !== app.readerToken) return;
      if (el) el.classList.remove("playing");
      app.readerPlaying = false;
    };
    setTimeout(function () { window.speechSynthesis.speak(u); }, 40);
  }

  function readerPlayAll() {
    var text = RI[(app.readerRoute || [])[0]];
    if (!text) return;
    if (!window.speechSynthesis || !window.SpeechSynthesisUtterance) {
      toast("Speech audio is not available in this browser.");
      return;
    }
    readerStop();
    var i = 0;
    var token = app.readerToken;
    app.readerPlaying = true;
    function next() {
      if (token !== app.readerToken || !app.readerPlaying || i >= text.lines.length) {
        if (token === app.readerToken) readerStop();
        return;
      }
      var el = document.querySelector('[data-reader-line="' + i + '"]');
      readerClearHighlight();
      if (el) {
        el.classList.add("playing");
        el.scrollIntoView({ block: "nearest" });
      }
      var u = readerVoice(cleanMarkup(text.lines[i].ko), Number(app.readerRate) || 0.9);
      u.onend = function () {
        if (token !== app.readerToken) return;
        if (el) el.classList.remove("playing");
        i += 1;
        setTimeout(next, 120);
      };
      u.onerror = function () {
        if (token === app.readerToken) readerStop();
      };
      window.speechSynthesis.speak(u);
    }
    setTimeout(next, 40);
  }

  /* ---------------------------------------------------------------------
     Grammar path: index, unit conversations, lessons and practice.
     --------------------------------------------------------------------- */

  function grammarCompleted(id) {
    return !!(app.state.grammar && app.state.grammar[id] && app.state.grammar[id].completed);
  }

  function grammarNextItem() {
    return GRAMMAR_ITEMS.filter(function (i) {
      return !grammarCompleted(i.id);
    })[0];
  }

  function grammarItemIndex(id) {
    for (var i = 0; i < GRAMMAR_ITEMS.length; i++) if (GRAMMAR_ITEMS[i].id === id) return i;
    return -1;
  }

  function grammarShortLabel(item) {
    var label = (item.pattern || item.title || "").replace(/\s+/g, " ").trim();
    if (label.length > 22) {
      var comma = label.split(",")[0].trim();
      if (comma.length >= 6 && comma.length <= 22) {
        label = comma;
      } else {
        var slash = label.split(" / ")[0].trim();
        if (slash.length >= 6 && slash.length <= 22) label = slash;
        else label = label.slice(0, 21) + "…";
      }
    }
    return label;
  }

  function seededShuffle(arr, seed) {
    var a = arr.slice();
    var x = seed >>> 0;
    function rnd() {
      x ^= x << 13;
      x ^= x >>> 17;
      x ^= x << 5;
      return ((x >>> 0) % 1000000) / 1000000;
    }
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(rnd() * (i + 1));
      var t = a[i];
      a[i] = a[j];
      a[j] = t;
    }
    return a;
  }

  function cleanMarkup(text) {
    return String(text || "").replace(/\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g, "$1");
  }

  function stripEndPunct(text) {
    return String(text || "").replace(/[.!?。？！]+$/g, "").trim();
  }

  function normalizeKo(text) {
    return String(text || "")
      .trim()
      .replace(/[.!?。？！,，"'“”‘’]/g, "")
      .replace(/\s+/g, " ");
  }

  function buildGrammarExerciseData(item) {
    var ex0 = item.examples[0][0];
    var ex1 = item.examples[1][0];
    var choiceBlank = item.blank;
    var choiceOptions = seededShuffle([choiceBlank].concat(item.distractors || []), Deck.hash(item.id + "choice"));
    var fillBlank = item.blank2 || item.blank;
    if (ex1.indexOf(fillBlank) < 0) fillBlank = item.blank;

    var orderSentence = item.order || "";
    var unit = GU[item.unit];
    var forms = item.forms || [];
    if (!orderSentence && unit && unit.context) {
      var bestScore = 0;
      var bestClause = "";
      for (var i = 0; i < unit.context.length; i++) {
        var raw = unit.context[i].text;
        var marked = raw.match(new RegExp("\\[\\[([^\\]|]+)\\|g:" + item.id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\]\\]"));
        var marker = marked ? marked[1] : "";
        var clean = cleanMarkup(raw);
        var clauses = clean.split(/[,.?!]/);
        for (var j = 0; j < clauses.length; j++) {
          var clause = clauses[j].trim();
          if (!clause || clause.length < 4 || /[“”"]/.test(clause)) continue;
          var strict = forms.some(function (f) {
            return f && clause.indexOf(f) >= 0;
          });
          if (!strict && item.blank) strict = clause.indexOf(item.blank) >= 0;
          var score = strict ? 2 : marker && clause.indexOf(marker) >= 0 ? 1 : 0;
          if (!score) continue;
          var candidate = clause.split(/\s+/).filter(Boolean);
          if (candidate.length < 3 || candidate.length > 12) continue;
          if (score > bestScore) {
            bestScore = score;
            bestClause = clause;
          }
        }
      }
      orderSentence = bestClause;
    }
    if (!orderSentence) orderSentence = stripEndPunct(ex1);
    orderSentence = stripEndPunct(orderSentence);

    var orderTokens = orderSentence.split(/\s+/).filter(Boolean);
    var orderShuffled = seededShuffle(
      orderTokens.map(function (t, i) {
        return { text: t, i: i };
      }),
      Deck.hash(item.id + "order")
    );
    return {
      choice: {
        sentence: ex0.replace(choiceBlank, "____"),
        options: choiceOptions,
        answer: choiceOptions.indexOf(choiceBlank),
        correctText: choiceBlank,
      },
      fill: {
        sentence: ex1.replace(fillBlank, "____"),
        answer: fillBlank,
        correctText: fillBlank,
      },
      order: {
        tokens: orderShuffled,
        answer: orderTokens,
        sentence: orderSentence,
      },
    };
  }

  function ensureGrammarExercise(item) {
    if (app.grammarExercise && app.grammarExercise.itemId === item.id) return app.grammarExercise;
    app.grammarExercise = {
      itemId: item.id,
      data: buildGrammarExerciseData(item),
      choice: { selected: null, checked: false, correct: false },
      fill: { value: "", checked: false, correct: false },
      order: { picked: [], checked: false, correct: false },
      completed: false,
    };
    return app.grammarExercise;
  }

  function grammarScore(ex) {
    return (ex.choice.correct ? 1 : 0) + (ex.fill.correct ? 1 : 0) + (ex.order.correct ? 1 : 0);
  }

  function grammarAllChecked(ex) {
    return ex.choice.checked && ex.fill.checked && ex.order.checked;
  }

  function maybeCompleteGrammar(item, ex) {
    if (!grammarAllChecked(ex) || ex.completed) return;
    ex.completed = true;
    var res = Store.completeGrammar(app.state, item.id, grammarScore(ex));
    var unit = res.unitId ? GU[res.unitId] : null;
    var unitLabel = unit ? "Unit " + unit.num : "Unit";
    if (res.starEarned && res.newlyCompleted) toast(unitLabel + " complete · +1 star ★ · +10 beans ☕");
    else if (res.starEarned) toast(unitLabel + " complete · +1 star ★");
    else if (res.newlyCompleted) toast("Lesson complete · +10 beans ☕");
  }

  function grammarProgressHtml(done, total, compact) {
    var p = total ? Math.round((done / total) * 100) : 0;
    return (
      '<div class="grammar-progress ' + (compact ? "compact" : "") + '">' +
      '<div class="level-track" role="progressbar" aria-label="Grammar progress" aria-valuemin="0" aria-valuemax="' + total + '" aria-valuenow="' + done + '"><div class="level-fill" style="width:' + p + '%"></div></div>' +
      '<div class="level-meta"><span>' + done + " / " + total + " lessons</span><span>" + p + "%</span></div></div>"
    );
  }

  function renderGrammar() {
    var parts = app.grammarRoute || [];
    if (parts[0] === "unit" && GU[parts[1]]) return renderGrammarUnit(parts[1]);
    if (parts[0] === "item" && GI[parts[1]]) return renderGrammarItem(parts[1]);
    return renderGrammarIndex();
  }

  function renderGrammarIndex() {
    var prog = Store.grammarProgress(app.state);
    var starStats = Store.grammarStars(app.state);
    var starUnits = (app.state.cafe && app.state.cafe.starUnits) || {};
    var q = (app.grammarSearch || "").trim().toLowerCase();
    var next = grammarNextItem();
    var body;
    if (q) {
      var found = GRAMMAR_ITEMS.filter(function (i) {
        var u = GU[i.unit] || {};
        return (
          i.title.toLowerCase().indexOf(q) >= 0 ||
          i.pattern.toLowerCase().indexOf(q) >= 0 ||
          i.summary.toLowerCase().indexOf(q) >= 0 ||
          (i.examples || []).some(function (e) { return e[0].toLowerCase().indexOf(q) >= 0; }) ||
          (i.formation || []).some(function (f) { return f.toLowerCase().indexOf(q) >= 0; }) ||
          (u.title || "").toLowerCase().indexOf(q) >= 0
        );
      });
      body =
        '<div class="grammar-search-count">' + found.length + " matching lessons</div>" +
        '<div class="grammar-result-list">' +
        (found
          .map(function (i) {
            var u = GU[i.unit] || {};
            return (
              '<a class="grammar-result-row" href="#/grammar/item/' + esc(i.id) + '">' +
              '<div><span class="grammar-unit-label">Unit ' + esc(String(u.num || "")) + " · " + esc(u.title || "") + "</span>" +
              "<strong>" + esc(i.title) + "</strong><span class=\"pattern-text\">" + esc(i.pattern) + "</span></div>" +
              '<span class="pill ' + (grammarCompleted(i.id) ? "mature" : "") + '">' + (grammarCompleted(i.id) ? "done" : "lesson") + "</span></a>"
            );
          })
          .join("") || '<div class="empty">No grammar lessons match that search.</div>') +
        "</div>";
    } else {
      body =
        '<div class="grammar-unit-grid">' +
        GRAMMAR_UNITS.map(function (u) {
          var items = GRAMMAR_ITEMS.filter(function (i) { return i.unit === u.id; });
          var done = items.filter(function (i) { return grammarCompleted(i.id); }).length;
          return (
            '<a class="grammar-unit-card" href="#/grammar/unit/' + esc(u.id) + '">' +
            '<div class="grammar-unit-top"><span>Unit ' + esc(String(u.num)) + '</span><span class="grammar-unit-top-right"><span class="unit-star ' + (starUnits[u.id] ? "earned" : "") + '" aria-hidden="true" title="' + (starUnits[u.id] ? "Unit star earned" : "Complete this unit to earn a star") + '">★</span>' + done + " / " + items.length + "</span></div>" +
            "<h3>" + esc(u.title) + "</h3><p>" + esc(u.subtitle || "") + "</p>" +
            '<div class="grammar-unit-bar"><div style="width:' + (items.length ? (done / items.length) * 100 : 0) + '%"></div></div>' +
            '<div class="grammar-unit-items">' +
            items.slice(0, 4).map(function (i) { return "<span>" + esc(grammarShortLabel(i)) + "</span>"; }).join("") +
            (items.length > 4 ? "<span>+" + (items.length - 4) + "</span>" : "") +
            "</div></a>"
          );
        }).join("") +
        "</div>";
    }
    return (
      '<div class="grammar-page">' +
      '<div class="page-head"><div><p class="eyebrow">The grammar path</p><h1>Grammar</h1><p>112 lessons from Korean Grammar in Use: Beginner, with examples, context and practice.</p></div>' +
      '<div class="grammar-head-meta"><div class="bean-pill" style="font-size:13px;padding:9px 13px">' + icon("book") + " " + prog.completed + " / " + prog.total + '</div><button class="bean-pill star-pill" style="font-size:13px;padding:9px 13px" data-action="atelier">' + icon("star") + " " + starStats.balance + " stars</button></div></div>" +
      grammarProgressHtml(prog.completed, prog.total, false) +
      '<div class="grammar-star-panel">' +
      '<div class="grammar-star-head"><div class="grammar-star-emblem" aria-hidden="true">★</div><div><h2>Grammar stars</h2><p>Complete a whole unit to earn one star. Spend stars in the café atelier on permanent study charms.</p></div><div class="grammar-star-total"><strong>' + starStats.balance + '</strong><span>' + starWord(starStats.balance) + " · " + starStats.units + " / " + starStats.total + " units</span></div></div>" +
      '<div class="grammar-star-pips">' + GRAMMAR_UNITS.map(function (u) { return '<span class="grammar-star-pip ' + (starUnits[u.id] ? "earned" : "") + '" aria-hidden="true" title="Unit ' + esc(String(u.num)) + " · " + esc(u.title) + (starUnits[u.id] ? " — star earned" : " — not yet earned") + '">★</span>'; }).join("") + '</div>' +
      '<div class="grammar-star-actions"><button class="btn btn-soft btn-sm" data-action="atelier">Open synthesis atelier ' + icon("arrow") + '</button><span class="muted">' + starStats.earned + " " + starWord(starStats.earned) + " earned in total</span></div></div>" +
      (next
        ? '<a class="grammar-continue" href="#/grammar/item/' + esc(next.id) + '"><div class="cafe-mini-art">문</div><div><h2>Continue · ' + esc(next.title) + '</h2><p>' + esc(next.pattern) + " · " + esc(next.summary) + '</p></div><span class="btn btn-primary">Open lesson ' + icon("arrow") + "</span></a>"
        : '<div class="grammar-continue done"><div class="cafe-mini-art">✓</div><div><h2>All 112 lessons complete</h2><p>Revisit any unit whenever you want.</p></div></div>') +
      '<div class="search-wrap" style="margin-top:20px">' + icon("search") + '<input class="search" type="search" placeholder="Search grammar, pattern or unit…" value="' + esc(app.grammarSearch) + '" data-role="grammar-search" /></div>' +
      body +
      "</div>"
    );
  }

  function renderGrammarUnit(unitId) {
    var unit = GU[unitId];
    var items = GRAMMAR_ITEMS.filter(function (i) { return i.unit === unitId; });
    var done = items.filter(function (i) { return grammarCompleted(i.id); }).length;
    var starEarned = !!(app.state.cafe && app.state.cafe.starUnits && app.state.cafe.starUnits[unitId]);
    return (
      '<div class="grammar-page">' +
      '<div class="grammar-breadcrumb"><a href="#/grammar">Grammar</a><span>/</span><span>Unit ' + esc(String(unit.num)) + "</span></div>" +
      '<div class="grammar-hero"><div><p class="eyebrow">Unit ' + esc(String(unit.num)) + "</p><h1>" + esc(unit.title) + "</h1><p>" + esc(unit.subtitle || "") + "</p></div>" +
      '<div class="grammar-hero-progress"><strong>' + done + "</strong><span>/ " + items.length + ' complete</span><div class="unit-hero-star ' + (starEarned ? "earned" : "") + '" aria-hidden="true" title="' + (starEarned ? "Unit star earned" : "Complete this unit to earn a grammar star") + '">★</div></div></div>' +
      '<div class="grammar-layout"><div class="grammar-main">' +
      '<section class="panel"><div class="panel-head"><h2>In context</h2><span>hover or tap highlighted words and patterns</span></div><div class="dialogue">' +
      (unit.context || []).map(function (line) {
        return '<div class="dialogue-line"><span class="speaker-tag">' + esc(line.speaker) + '</span><div><div class="grammar-ko" lang="ko">' + glossMarkup(line.text, [], null) + '</div><div class="grammar-zh" lang="zh-CN">' + esc(line.zh) + "</div></div></div>";
      }).join("") +
      "</div></section>" +
      '<section class="panel"><div class="panel-head"><h2>Lessons in this unit</h2><span>' + done + " / " + items.length + "</span></div><div class=\"unit-item-list\">" +
      items.map(function (i) {
        return '<a class="unit-item-row" href="#/grammar/item/' + esc(i.id) + '"><div><span class="grammar-unit-label">' + esc(String(i.num).padStart(2, "0")) + "</span><strong>" + esc(i.title) + '</strong><span class="pattern-text">' + esc(i.pattern) + "</span></div>" + (grammarCompleted(i.id) ? '<span class="pill mature">done</span>' : '<span class="pill">open</span>') + "</a>";
      }).join("") +
      "</div></section>" +
      "</div><aside class=\"grammar-side\">" +
      '<div class="panel"><div class="panel-head"><h2>Unit progress</h2><span>112 lessons total</span></div>' + grammarProgressHtml(done, items.length, false) +
      '<div class="grammar-unit-reward ' + (starEarned ? "earned" : "") + '"><span class="grammar-unit-reward-star" aria-hidden="true">★</span><div><strong>Unit reward</strong><p>' + (starEarned ? "Earned. Spend it in the café atelier." : "Complete all " + items.length + " lessons to earn 1 grammar star.") + '</p></div></div>' +
      '<p class="about-box" style="margin-top:14px">Open a lesson to read the explanation, hover the examples, then complete the three practice exercises.</p></div>' +
      '<div class="panel"><div class="panel-head"><h2>All units</h2><span><a class="link" href="#/grammar">View index</a></span></div><div class="unit-mini-list">' +
      GRAMMAR_UNITS.map(function (u) { return '<a href="#/grammar/unit/' + esc(u.id) + '" class="' + (u.id === unitId ? "active" : "") + '">' + esc(String(u.num)) + ". " + esc(u.title) + "</a>"; }).join("") +
      "</div></div></aside></div></div>"
    );
  }

  function renderGrammarItem(itemId) {
    var item = GI[itemId];
    if (!item) return renderGrammarIndex();
    var unit = GU[item.unit] || {};
    var ex = ensureGrammarExercise(item);
    var idx = grammarItemIndex(item.id);
    var prev = idx > 0 ? GRAMMAR_ITEMS[idx - 1] : null;
    var next = idx >= 0 && idx < GRAMMAR_ITEMS.length - 1 ? GRAMMAR_ITEMS[idx + 1] : null;
    var unitItems = GRAMMAR_ITEMS.filter(function (i) { return i.unit === item.unit; });
    if (grammarAllChecked(ex) && !ex.completed) maybeCompleteGrammar(item, ex);
    var g = app.state.grammar[item.id] || {};
    var score = grammarScore(ex);
    var started = !!(g.attempts || g.seen || ex.choice.checked || ex.fill.checked || ex.order.checked);
    return (
      '<div class="grammar-page">' +
      '<div class="grammar-breadcrumb"><a href="#/grammar">Grammar</a><span>/</span><a href="#/grammar/unit/' + esc(item.unit) + '">Unit ' + esc(String(unit.num)) + "</a><span>/</span><span>" + esc(item.title) + "</span></div>" +
      '<div class="grammar-hero"><div><p class="eyebrow">Unit ' + esc(String(unit.num)) + " · Lesson " + esc(String(item.num)) + "</p><h1>" + esc(item.title) + '</h1><div class="pattern-chip">' + esc(item.pattern) + "</div><p>" + esc(item.summary) + "</p></div>" +
      '<div class="grammar-hero-progress"><strong>' + (g.bestScore || 0) + "</strong><span>/ 3 best score</span><div style=\"margin-top:6px\">" + (grammarCompleted(item.id) ? '<span class="pill mature">completed</span>' : (started ? '<span class="pill">in progress</span>' : '<span class="pill">not started</span>')) + "</div></div></div>" +
      '<div class="grammar-layout"><div class="grammar-main">' +
      '<section class="panel"><div class="panel-head"><h2>How it works</h2><span>' + esc(item.pattern) + '</span></div><p class="grammar-explanation">' + esc(item.summary) + "</p>" +
      '<div class="formation-list">' + (item.formation || []).map(function (f) { return "<div>" + esc(f) + "</div>"; }).join("") + "</div>" +
      (item.tip ? '<div class="grammar-tip"><strong>Tip</strong> ' + esc(item.tip) + "</div>" : "") +
      "</section>" +
      '<section class="panel"><div class="panel-head"><h2>Examples</h2><span>hover the highlighted parts</span></div><div class="grammar-examples">' +
      item.examples.map(function (e) {
        return '<div class="grammar-example"><button class="speaker small soft" data-action="speak" data-text="' + esc(e[0]) + '" aria-label="Listen">' + icon("speaker", 16) + '</button><div><div class="grammar-ko" lang="ko">' + glossText(e[0], item.forms, item.id) + '</div><div class="grammar-zh" lang="zh-CN">' + esc(e[1]) + "</div></div></div>";
      }).join("") +
      "</div></section>" +
      '<section class="panel"><div class="panel-head"><h2>In context · Unit ' + esc(String(unit.num)) + '</h2><span>your target is highlighted</span></div><div class="dialogue">' +
      (unit.context || []).map(function (line) {
        return '<div class="dialogue-line"><span class="speaker-tag">' + esc(line.speaker) + '</span><div><div class="grammar-ko" lang="ko">' + glossMarkup(line.text, [], item.id) + '</div><div class="grammar-zh" lang="zh-CN">' + esc(line.zh) + "</div></div></div>";
      }).join("") +
      "</div></section>" +
      '<section class="panel grammar-practice"><div class="panel-head"><h2>Practice</h2><span>3 exercises · +1 bean for each first correct answer</span></div>' +
      renderGrammarExercises(item, ex, score) +
      "</section>" +
      "</div><aside class=\"grammar-side\">" +
      '<div class="panel"><div class="panel-head"><h2>Your progress</h2><span>' + (g.attempts || 0) + " attempts</span></div>" +
      '<div class="grammar-progress"><div class="level-track"><div class="level-fill" style="width:' + (score / 3) * 100 + '%"></div></div><div class="level-meta"><span>This attempt</span><span>' + score + " / 3</span></div></div>" +
      '<p class="about-box" style="margin-top:14px">' + (grammarCompleted(item.id) ? "Completed. Revisit anytime; your best score is " + (g.bestScore || 0) + " / 3." : "Complete at least 2 of 3 exercises to finish the lesson.") + "</p></div>" +
      '<div class="panel"><div class="panel-head"><h2>In this unit</h2><span><a class="link" href="#/grammar/unit/' + esc(item.unit) + '">Unit ' + esc(String(unit.num)) + "</a></span></div><div class=\"unit-mini-list\">" +
      unitItems.map(function (i) { return '<a href="#/grammar/item/' + esc(i.id) + '" class="' + (i.id === item.id ? "active" : "") + '">' + esc(String(i.num)) + ". " + esc(i.title) + "</a>"; }).join("") +
      "</div></div>" +
      '<div class="grammar-prevnext">' + (prev ? '<a class="btn btn-ghost" href="#/grammar/item/' + esc(prev.id) + '">' + icon("back") + " Previous</a>" : "<span></span>") + (next ? '<a class="btn btn-soft" href="#/grammar/item/' + esc(next.id) + '">Next ' + icon("arrow") + "</a>" : '<a class="btn btn-soft" href="#/grammar">Grammar index ' + icon("arrow") + "</a>") + "</div>" +
      "</aside></div></div>"
    );
  }

  function renderGrammarExercises(item, ex, score) {
    var d = ex.data;
    var choiceOptions = d.choice.options.map(function (o, i) {
      var cls = "";
      if (ex.choice.checked) {
        if (i === d.choice.answer) cls = " correct";
        else if (i === ex.choice.selected) cls = " wrong";
      }
      return '<button class="exercise-option' + cls + '" data-action="g-choice" data-index="' + i + '"' + (ex.choice.checked ? " disabled" : "") + '><span class="key">' + (i + 1) + "</span>" + esc(o) + "</button>";
    }).join("");
    var choiceFeedback = ex.choice.checked
      ? '<div class="exercise-feedback ' + (ex.choice.correct ? "good" : "bad") + '">' + (ex.choice.correct ? "Correct. " : "Not quite. The answer is " + esc(d.choice.correctText) + ". ") + esc(item.summary) + "</div>"
      : "";
    var fillFeedback = ex.fill.checked
      ? '<div class="exercise-feedback ' + (ex.fill.correct ? "good" : "bad") + '">' + (ex.fill.correct ? "Correct. " : "Not quite. The answer is " + esc(d.fill.correctText) + ". ") + esc(item.summary) + "</div>"
      : "";
    var pickedText = ex.order.picked.map(function (i) { return d.order.tokens[i] ? d.order.tokens[i].text : ""; }).join(" ");
    var orderFeedback = ex.order.checked
      ? '<div class="exercise-feedback ' + (ex.order.correct ? "good" : "bad") + '">' + (ex.order.correct ? "Correct. " : "Not quite. Correct order: " + esc(d.order.answer.join(" ")) + ". ") + esc(item.summary) + "</div>"
      : "";
    var allDone = grammarAllChecked(ex);
    var completeBanner = allDone
      ? '<div class="exercise-complete ' + (score >= 2 ? "good" : "bad") + '">' + (score >= 2 ? "Lesson complete — " + score + " / 3 correct." : "You got " + score + " / 3. Review the explanation and try again.") + "</div>"
      : "";
    var tokens = d.order.tokens.map(function (t, i) {
      var picked = ex.order.picked.indexOf(i) >= 0;
      return '<button class="order-token' + (picked ? " picked" : "") + '" data-action="g-order" data-index="' + i + '"' + (picked || ex.order.checked ? " disabled" : "") + ">" + esc(t.text) + "</button>";
    }).join("");
    var next = GRAMMAR_ITEMS[grammarItemIndex(item.id) + 1];
    var nextHref = next ? "#/grammar/item/" + esc(next.id) : "#/grammar";
    return (
      '<div class="exercise-grid">' +
      '<div class="exercise-card"><div class="exercise-head"><span class="exercise-num">1</span><div><h3>Choose the correct form</h3><p>' + esc(d.choice.sentence) + '</p><p class="exercise-zh">' + esc(item.examples[0][1]) + "</p></div></div>" +
      '<div class="exercise-options">' + choiceOptions + "</div>" + choiceFeedback + "</div>" +
      '<div class="exercise-card"><div class="exercise-head"><span class="exercise-num">2</span><div><h3>Fill in the blank</h3><p>' + esc(d.fill.sentence) + '</p><p class="exercise-zh">' + esc(item.examples[1][1]) + "</p></div></div>" +
      '<div class="exercise-fill"><input class="exercise-input" data-role="g-fill" value="' + esc(ex.fill.value) + '" placeholder="Type the missing form" ' + (ex.fill.checked ? "disabled" : "") + ' /><button class="btn btn-primary btn-sm" data-action="g-check-fill"' + (ex.fill.checked ? " disabled" : "") + ">Check</button></div>" +
      fillFeedback + "</div>" +
      '<div class="exercise-card"><div class="exercise-head"><span class="exercise-num">3</span><div><h3>Put the sentence in order</h3><p>Tap the words in the correct order. Use every word once.</p></div></div>' +
      '<div class="order-picked">' + (pickedText || '<span class="muted">Your sentence appears here</span>') + "</div>" +
      '<div class="order-tokens">' + tokens + "</div>" +
      '<div class="exercise-actions"><button class="btn btn-ghost btn-sm" data-action="g-order-undo"' + (ex.order.checked || !ex.order.picked.length ? " disabled" : "") + ">Undo</button><button class=\"btn btn-primary btn-sm\" data-action=\"g-check-order\"" + (ex.order.checked || !ex.order.picked.length ? " disabled" : "") + ">Check</button></div>" +
      orderFeedback + "</div>" +
      "</div>" + completeBanner +
      (allDone ? '<div class="exercise-actions" style="margin-top:14px"><button class="btn btn-soft" data-action="g-reset">Try again</button><a class="btn btn-primary" href="' + nextHref + '">' + (next ? "Next lesson" : "Back to grammar") + " " + icon("arrow") + "</a></div>" : "")
    );
  }

  function grammarExercise() {
    return app.grammarExercise;
  }

  function checkGrammarChoice(index) {
    var ex = grammarExercise();
    if (!ex || ex.choice.checked) return;
    ex.choice.selected = index;
    ex.choice.checked = true;
    ex.choice.correct = index === ex.data.choice.answer;
    if (ex.choice.correct && Store.rewardGrammarExercise(app.state, ex.itemId, 0)) toast("+1 bean ☕");
    maybeCompleteGrammar(GI[ex.itemId], ex);
    render();
  }

  function checkGrammarFill() {
    var ex = grammarExercise();
    if (!ex || ex.fill.checked) return;
    var input = document.querySelector("[data-role='g-fill']");
    if (input) ex.fill.value = input.value;
    var given = normalizeKo(ex.fill.value);
    var answer = normalizeKo(ex.data.fill.answer);
    ex.fill.checked = true;
    ex.fill.correct = given === answer || given.replace(/\s/g, "") === answer.replace(/\s/g, "");
    if (ex.fill.correct && Store.rewardGrammarExercise(app.state, ex.itemId, 1)) toast("+1 bean ☕");
    maybeCompleteGrammar(GI[ex.itemId], ex);
    render();
  }

  function pickGrammarOrder(index) {
    var ex = grammarExercise();
    if (!ex || ex.order.checked || ex.order.picked.indexOf(index) >= 0) return;
    ex.order.picked.push(index);
    render();
  }

  function undoGrammarOrder() {
    var ex = grammarExercise();
    if (!ex || ex.order.checked || !ex.order.picked.length) return;
    ex.order.picked.pop();
    render();
  }

  function checkGrammarOrder() {
    var ex = grammarExercise();
    if (!ex || ex.order.checked) return;
    if (ex.order.picked.length !== ex.data.order.tokens.length) {
      toast("Use all the words first.");
      return;
    }
    var given = ex.order.picked.map(function (i) { return ex.data.order.tokens[i].text; }).join(" ");
    ex.order.checked = true;
    ex.order.correct = normalizeKo(given) === normalizeKo(ex.data.order.answer.join(" "));
    if (ex.order.correct && Store.rewardGrammarExercise(app.state, ex.itemId, 2)) toast("+1 bean ☕");
    maybeCompleteGrammar(GI[ex.itemId], ex);
    render();
  }

  function resetGrammarExercise() {
    var ex = grammarExercise();
    if (!ex) return;
    ex.choice = { selected: null, checked: false, correct: false };
    ex.fill = { value: "", checked: false, correct: false };
    ex.order = { picked: [], checked: false, correct: false };
    ex.completed = false;
    render();
  }

  /* ---------------------------------------------------------------------
     Hover/tap glosses for vocabulary and grammar in context.
     --------------------------------------------------------------------- */

  var GLOSS_PARTICLES = [
    "에서는", "에게서", "한테서", "으로는", "에서", "에게", "한테", "으로",
    "부터", "까지", "처럼", "보다", "하고", "은", "는", "이", "가", "을",
    "를", "에", "도", "만", "와", "과", "의", "로", "께", "쯤", "마다",
    "밖에", "이나", "나",
  ];

  function stripGlossPunct(text) {
    return String(text || "").replace(/[.!?。？！,，"'“”‘’()\[\]]/g, "").trim();
  }

  function peelParticle(text) {
    for (var i = 0; i < GLOSS_PARTICLES.length; i++) {
      var p = GLOSS_PARTICLES[i];
      if (text.length > p.length && text.slice(-p.length) === p) {
        return { base: text.slice(0, -p.length), particle: p };
      }
    }
    return null;
  }

  function dropFinalL(ch) {
    if (!ch) return null;
    var code = ch.charCodeAt(0) - 0xac00;
    if (code < 0 || code > 11171) return null;
    if (code % 28 !== 8) return null;
    return String.fromCharCode(ch.charCodeAt(0) - 8);
  }

  function deconjugate(surface) {
    var rules = [
      { suf: "을 거예요", add: "다", note: "future" },
      { suf: " 거예요", dropL: true, add: "다", note: "future" },
      { suf: "을게요", add: "다", note: "I will" },
      { suf: "게요", dropL: true, add: "다", note: "I will" },
      { suf: "을래요", add: "다", note: "want to" },
      { suf: "래요", dropL: true, add: "다", note: "want to" },
      { suf: "을까요", add: "다", note: "shall / wonder" },
      { suf: "까요", dropL: true, add: "다", note: "shall / wonder" },
      { suf: "을 수 있어요", add: "다", note: "can" },
      { suf: " 수 있어요", dropL: true, add: "다", note: "can" },
      { suf: "을 수 없어요", add: "다", note: "cannot" },
      { suf: " 수 없어요", dropL: true, add: "다", note: "cannot" },
      { suf: "을 줄 알아요", add: "다", note: "know how to" },
      { suf: " 줄 알아요", dropL: true, add: "다", note: "know how to" },
      { suf: "을 줄 몰라요", add: "다", note: "not know how to" },
      { suf: " 줄 몰라요", dropL: true, add: "다", note: "not know how to" },
      { suf: "고 있어요", add: "다", note: "progressive" },
      { suf: "고 싶어요", add: "다", note: "want to" },
      { suf: "지 마세요", add: "다", note: "don't" },
      { suf: "지 않아요", add: "다", note: "negative" },
      { suf: "지 못해요", add: "다", note: "cannot" },
      { suf: "으면 안 돼요", add: "다", note: "must not" },
      { suf: "면 안 돼요", add: "다", note: "must not" },
      { suf: "아도 돼요", add: "다", note: "may" },
      { suf: "어도 돼요", add: "다", note: "may" },
      { suf: "아야 해요", add: "다", note: "must" },
      { suf: "어야 해요", add: "다", note: "must" },
      { suf: "으세요", add: "다", note: "polite request" },
      { suf: "세요", add: "다", note: "polite request" },
      { suf: "으니까", add: "다", note: "because / so" },
      { suf: "니까", add: "다", note: "because / so" },
      { suf: "지만", add: "다", note: "although" },
      { suf: "는데요", add: "다", note: "soft background" },
      { suf: "는데", add: "다", note: "background" },
      { suf: "으면서", add: "다", note: "while" },
      { suf: "면서", add: "다", note: "while" },
      { suf: "으려면", add: "다", note: "if you intend to" },
      { suf: "려면", add: "다", note: "if you intend to" },
      { suf: "으려고", add: "다", note: "intend to" },
      { suf: "려고", add: "다", note: "intend to" },
      { suf: "으러", add: "다", note: "in order to" },
      { suf: "러", add: "다", note: "in order to" },
      { suf: "은 후에", add: "다", note: "after" },
      { suf: "기 전에", add: "다", note: "before" },
      { suf: "고 나서", add: "다", note: "after" },
      { suf: "자마자", add: "다", note: "as soon as" },
      { suf: "는 동안", add: "다", note: "while / during" },
      { suf: "은 지", add: "다", note: "since" },
      { suf: "어 봤어요", add: "다", note: "have tried" },
      { suf: "아 봤어요", add: "다", note: "have tried" },
      { suf: "은 적이 있어요", add: "다", note: "have done" },
      { suf: "은 적이 없어요", add: "다", note: "have never done" },
      { suf: "시겠어요", add: "다", note: "would you like to" },
      { suf: "겠어요", add: "다", note: "will / guess" },
      { suf: "았어요", add: "다", note: "past" },
      { suf: "었어요", add: "다", note: "past" },
      { suf: "았습니다", add: "다", note: "past formal" },
      { suf: "었습니다", add: "다", note: "past formal" },
      { suf: "습니다", add: "다", note: "formal polite" },
      { suf: "나요", add: "다", note: "soft question" },
      { suf: "은가요", add: "다", note: "soft question" },
      { suf: "군요", add: "다", note: "realization" },
      { suf: "네요", add: "다", note: "surprise" },
      { suf: "지요", add: "다", note: "confirming" },
      { suf: "대요", add: "다", note: "reported speech" },
      { suf: "냬요", add: "다", note: "reported question" },
      { suf: "재요", add: "다", note: "reported suggestion" },
      { suf: "라고", add: "다", note: "quotation" },
      { suf: "냐고", add: "다", note: "quoted question" },
      { suf: "다고", add: "다", note: "quoted statement" },
      { suf: "자고", add: "다", note: "quoted suggestion" },
      { suf: "으면", add: "다", note: "if / when" },
      { suf: "면", add: "다", note: "if / when" },
      { suf: "려요", add: "리다", note: "polite present" },
      { suf: "셔요", add: "시다", note: "polite present" },
      { suf: "해요", add: "하다", note: "polite present" },
      { suf: "어요", add: "다", note: "polite present" },
      { suf: "아요", add: "다", note: "polite present" },
      { suf: "고", add: "다", note: "and / then" },
    ];
    for (var i = 0; i < rules.length; i++) {
      var r = rules[i];
      if (surface.length <= r.suf.length || surface.slice(-r.suf.length) !== r.suf) continue;
      var stem = surface.slice(0, -r.suf.length);
      if (r.dropL) {
        var dropped = dropFinalL(stem.slice(-1));
        if (!dropped) continue;
        stem = stem.slice(0, -1) + dropped;
      }
      var base = stem + r.add;
      var card = Deck.byWord[base];
      if (card) return { kind: "word", surface: surface, card: card, note: r.note };
    }
    return null;
  }

  function resolveGloss(surface, depth) {
    var s = stripGlossPunct(surface);
    if (!s) return null;
    if (app.view === "reader" && window.READER_OVERRIDES && window.READER_OVERRIDES[s]) {
      return { kind: "note", surface: s, entry: window.READER_OVERRIDES[s] };
    }
    if (Deck.byWord[s]) return { kind: "word", surface: s, card: Deck.byWord[s] };
    if (window.GRAMMAR_GLOSSARY && window.GRAMMAR_GLOSSARY[s]) {
      return { kind: "note", surface: s, entry: window.GRAMMAR_GLOSSARY[s] };
    }
    if ((depth || 0) < 2) {
      var p = peelParticle(s);
      if (p) {
        var inner = resolveGloss(p.base, (depth || 0) + 1);
        if (inner) {
          return {
            kind: inner.kind,
            surface: s,
            card: inner.card,
            entry: inner.entry,
            note: inner.note,
            base: p.base,
            particle: p.particle,
          };
        }
      }
    }
    return deconjugate(s);
  }

  function glossSpan(surface, key, targetId) {
    var cls = "gloss";
    var isGrammar = key.indexOf("g:") === 0;
    if (isGrammar) cls += " grammar";
    if (isGrammar && targetId && key === "g:" + targetId) cls += " target";
    return '<span class="' + cls + '" data-gloss="' + esc(key) + '" tabindex="0" aria-describedby="gloss-tip">' + esc(surface) + "</span>";
  }

  function glossMarkup(text, forms, targetId) {
    var re = /\[\[([^\]]+)\]\]/g;
    var out = "";
    var last = 0;
    var m;
    while ((m = re.exec(text))) {
      out += glossPlain(text.slice(last, m.index), forms, targetId);
      var inside = m[1];
      var parts = inside.split("|");
      var surface = parts[0];
      var key = parts.length > 1 ? parts[1] : "w:" + surface;
      if (key.indexOf("g:") === 0 && GI[key.slice(2)]) {
        out += glossSpan(surface, key, targetId);
      } else {
        var wkey = key.indexOf("w:") === 0 ? key.slice(2) : key;
        if (resolveGloss(wkey)) out += glossSpan(surface, "w:" + wkey, targetId);
        else out += esc(surface);
      }
      last = re.lastIndex;
    }
    out += glossPlain(text.slice(last), forms, targetId);
    return out;
  }

  function glossText(text, forms, targetId) {
    return glossMarkup(text, forms || [], targetId);
  }

  function glossPlain(text, forms, targetId) {
    var source = String(text || "");
    var placed = [];
    (forms || []).slice().sort(function (a, b) { return b.length - a.length; }).forEach(function (form) {
      if (!form) return;
      var idx = source.indexOf(form);
      while (idx >= 0) {
        var ph = "\u0001" + placed.length + "\u0001";
        placed.push(glossSpan(form, "g:" + targetId, targetId));
        source = source.slice(0, idx) + ph + source.slice(idx + form.length);
        idx = source.indexOf(form, idx + ph.length);
      }
    });
    var out = source.split(/(\s+)/).map(function (token) {
      if (!token) return "";
      if (token.indexOf("\u0001") >= 0) return token;
      var m = token.match(/^([^가-힣A-Za-z0-9]*)(.*?)([^가-힣A-Za-z0-9]*)$/);
      if (!m) return esc(token);
      var pre = m[1], core = m[2], post = m[3];
      if (!core) return esc(token);
      var base = core;
      var particle = "";
      var p = peelParticle(core);
      if (p) {
        base = p.base;
        particle = p.particle;
      }
      if (resolveGloss(base)) return esc(pre) + glossSpan(base, "w:" + base, targetId) + esc(particle) + esc(post);
      if (resolveGloss(core)) return esc(pre) + glossSpan(core, "w:" + core, targetId) + esc(post);
      return esc(token);
    }).join("");
    return out.replace(/\u0001(\d+)\u0001/g, function (_, n) { return placed[Number(n)] || ""; });
  }

  function showGloss(el) {
    var tip = document.getElementById("gloss-tip");
    if (!tip || !el) return;
    var key = el.getAttribute("data-gloss") || "";
    var html = "";
    if (key.indexOf("g:") === 0) {
      var g = GI[key.slice(2)];
      if (!g) { hideGloss(); return; }
      html =
        '<div class="tip-kicker">Grammar pattern</div><div class="tip-title">' + esc(g.title) + '</div><div class="tip-pattern">' + esc(g.pattern) + "</div><p>" + esc(g.summary) + '</p><button class="btn btn-soft btn-sm" data-action="tip-grammar" data-id="' + esc(g.id) + '">Open lesson ' + icon("arrow") + "</button>";
    } else {
      var surface = key.indexOf("w:") === 0 ? key.slice(2) : key;
      var res = resolveGloss(surface);
      if (!res) { hideGloss(); return; }
      if (res.kind === "word") {
        var c = res.card;
        var sub = c.word + (c.romanization ? " · " + c.romanization : "");
        html =
          '<div class="tip-kicker">Vocabulary</div><div class="tip-title">' + esc(res.surface || c.word) + '</div><div class="tip-rom">' + esc(sub) + "</div><p>" + esc(c.meaning_zh) + "</p>";
        if (res.note) html += '<div class="tip-note">' + esc(res.note) + "</div>";
        if (res.particle) html += '<div class="tip-note">particle +' + esc(res.particle) + "</div>";
        if (Deck.hanjaReliable(c) && c.hanja) html += '<div class="tip-hanja">' + esc(c.hanja) + "</div>";
        html += '<div class="tip-actions"><button class="btn btn-soft btn-sm" data-action="tip-speak" data-text="' + esc(res.surface || c.word) + '">' + icon("speaker", 14) + ' Listen</button><button class="btn btn-ghost btn-sm" data-action="tip-card" data-id="' + esc(c.id) + '">Open card</button></div>';
      } else {
        var e = res.entry || {};
        var line = e.word ? e.word + (e.r ? " · " + e.r : "") : e.r || "";
        html =
          '<div class="tip-kicker">Vocabulary</div><div class="tip-title">' + esc(res.surface || e.word || surface) + '</div><div class="tip-rom">' + esc(line) + "</div><p>" + esc(e.zh || "") + "</p>";
        if (e.note) html += '<div class="tip-note">' + esc(e.note) + "</div>";
        html += '<div class="tip-actions"><button class="btn btn-soft btn-sm" data-action="tip-speak" data-text="' + esc(res.surface || e.word || surface) + '">' + icon("speaker", 14) + " Listen</button></div>";
      }
    }
    tip.innerHTML = html;
    tip.classList.add("show");
    app.tipEl = el;
    requestAnimationFrame(function () {
      var r = el.getBoundingClientRect();
      var tw = tip.offsetWidth || 300;
      var th = tip.offsetHeight || 160;
      var left = Math.max(12, Math.min(window.innerWidth - tw - 12, r.left + r.width / 2 - tw / 2));
      var top = r.top - th - 10;
      if (top < 12) top = r.bottom + 10;
      tip.style.left = left + "px";
      tip.style.top = top + "px";
    });
  }

  function hideGloss() {
    var tip = document.getElementById("gloss-tip");
    if (tip) tip.classList.remove("show");
    app.tipEl = null;
  }

  function scheduleHideGloss() {
    clearTimeout(app.tipHideTimer);
    app.tipHideTimer = setTimeout(hideGloss, 140);
  }

  function onGlossOver(e) {
    var el = e.target.closest && e.target.closest(".gloss");
    if (!el) return;
    clearTimeout(app.tipHideTimer);
    showGloss(el);
  }

  function onGlossOut(e) {
    var el = e.target.closest && e.target.closest(".gloss");
    if (!el) return;
    if (e.relatedTarget && e.relatedTarget.closest && e.relatedTarget.closest("#gloss-tip")) return;
    scheduleHideGloss();
  }

  function speak(text) {
    if (!window.speechSynthesis || !window.SpeechSynthesisUtterance) {
      toast("Speech audio is not available in this browser.");
      return;
    }
    window.speechSynthesis.cancel();
    var u = new window.SpeechSynthesisUtterance(text);
    u.lang = "ko-KR";
    u.rate = 0.9;
    if (window.speechSynthesis.getVoices) {
      var korean = window.speechSynthesis.getVoices().filter(function (voice) {
        return (voice.lang || "").toLowerCase().indexOf("ko") === 0;
      })[0];
      if (korean) u.voice = korean;
    }
    window.speechSynthesis.speak(u);
  }


  function onClick(e) {
    var gloss = e.target.closest(".gloss");
    if (gloss) {
      e.preventDefault();
      showGloss(gloss);
      return;
    }
    if (!e.target.closest("#gloss-tip")) hideGloss();
    var link = e.target.closest("a[href^='#/']");
    if (link) {
      if (app.session && !app.session.finished && !link.getAttribute("href").startsWith("#/learn")) {
        if (!window.confirm("Leave this session? Your answers are already saved.")) {
          e.preventDefault();
          return;
        }
        app.session = null;
      }
      return;
    }
    var btn = e.target.closest("[data-action]");
    if (!btn) {
      if (e.target.classList && e.target.classList.contains("modal-backdrop")) closeModal();
      return;
    }
    var action = btn.getAttribute("data-action");
    switch (action) {
      case "start":
        startSession({ direction: app.dashboardDirection });
        break;
      case "practice":
        startSession({ practice: 10, direction: app.dashboardDirection });
        break;
      case "set-direction":
        app.dashboardDirection = btn.getAttribute("data-direction") === "reverse" ? "reverse" : "forward";
        app.state.settings.lastDirection = app.dashboardDirection;
        Store.save(app.state);
        render();
        break;
      case "set-stats-direction":
        app.statsDirection = btn.getAttribute("data-direction") === "reverse" ? "reverse" : "forward";
        render();
        break;
      case "cafe":
        navigate("#/cafe");
        break;
      case "grammar":
        navigate("#/grammar");
        break;
      case "reader":
        navigate("#/reader");
        break;
      case "reader-level":
        app.readerLevel = btn.getAttribute("data-level") || "all";
        render();
        break;
      case "reader-play":
        readerPlayAll();
        break;
      case "reader-stop":
        readerStop();
        break;
      case "reader-line":
        readerSpeakLine(Number(btn.getAttribute("data-index")));
        break;
      case "reader-word":
        readerStop();
        speak(btn.getAttribute("data-text") || "");
        break;
      case "reader-translation":
        app.readerTranslation = !app.readerTranslation;
        var readerPanel = document.querySelector(".reader-text-panel");
        if (readerPanel) readerPanel.classList.toggle("translation-on", app.readerTranslation);
        btn.className = "btn " + (app.readerTranslation ? "btn-soft" : "btn-ghost");
        btn.textContent = app.readerTranslation ? "Hide translation" : "Show translation";
        btn.setAttribute("aria-pressed", app.readerTranslation ? "true" : "false");
        break;
      case "reader-rate":
        app.readerRate = Number(btn.getAttribute("data-rate")) || 0.9;
        Array.prototype.forEach.call(document.querySelectorAll(".reader-rate-btn"), function (button) {
          var active = Number(button.getAttribute("data-rate")) === Number(app.readerRate);
          button.classList.toggle("active", active);
          button.setAttribute("aria-pressed", active ? "true" : "false");
        });
        break;
      case "reader-read":
        var readingId = (app.readerRoute || [])[0];
        if (readingId && RI[readingId]) {
          var marked = Store.markReading(app.state, readingId);
          readerStop();
          render();
          if (marked.newlyRead) toast("Text finished · +5 beans ☕");
        }
        break;
      case "atelier":
        navigate("#/cafe");
        setTimeout(function () {
          var atelier = document.getElementById("atelier");
          if (!atelier) return;
          var y = atelier.getBoundingClientRect().top + window.pageYOffset - 78;
          window.scrollTo(0, Math.max(0, y));
        }, 220);
        break;
      case "synth-item":
        var charmId = btn.getAttribute("data-item");
        var charm = (Cafe.charms || []).filter(function (c) { return c.id === charmId; })[0];
        if (!charm) break;
        var synth = Store.synthesize(app.state, charm);
        if (synth.ok) {
          toast(charm.name + " synthesized! ★");
          render();
        } else if (synth.reason === "stars") {
          toast("Not enough grammar stars — complete another unit first.");
        } else if (synth.reason === "beans") {
          toast("Not enough beans yet — review a few cards first.");
        } else if (synth.reason === "owned") {
          toast("You already synthesized that charm.");
        }
        break;
      case "buy-item":
        var itemId = btn.getAttribute("data-item");
        var item = Cafe.items.filter(function (i) { return i.id === itemId; })[0];
        if (!item) break;
        var bought = Store.buyItem(app.state, item);
        if (bought.ok) {
          toast(item.name + " added to the café! ☕");
          render();
        } else if (bought.reason === "beans") {
          toast("Not enough beans yet — study a few cards first.");
        } else if (bought.reason === "level") {
          toast("Reach level " + item.level + " to unlock that item.");
        }
        break;
      case "browse":
        navigate("#/browse");
        break;
      case "toggle-theme":
        var next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
        app.state.settings.theme = next;
        Store.save(app.state);
        applyTheme();
        render();
        break;
      case "flip":
        flip();
        break;
      case "mcq":
        startMCQ();
        break;
      case "rate":
        rate(Number(btn.getAttribute("data-grade")));
        break;
      case "option":
        selectOption(Number(btn.getAttribute("data-index")));
        break;
      case "next":
        nextCard();
        break;
      case "exit":
        exitStudy();
        break;
      case "replay-word":
        replayWord();
        break;
      case "replay-example":
        replayExample();
        break;
      case "play-card-word":
        playAudio(Deck.wordAudio(Deck.byId[btn.getAttribute("data-id")]));
        break;
      case "play-card-example":
        playAudio(Deck.exampleAudio(Deck.byId[btn.getAttribute("data-id")]));
        break;
      case "filter":
        app.browse.filter = btn.getAttribute("data-filter");
        app.browse.limit = 100;
        render();
        break;
      case "load-more":
        app.browse.limit += 150;
        render();
        break;
      case "open-card":
        openCard(btn.getAttribute("data-id"));
        break;
      case "close-modal":
        closeModal();
        break;
      case "practice-card":
        closeModal();
        startSession({
          cards: [Deck.byId[btn.getAttribute("data-id")]],
          direction: btn.getAttribute("data-direction") === "reverse" ? "reverse" : "forward",
        });
        break;
      case "g-choice":
        checkGrammarChoice(Number(btn.getAttribute("data-index")));
        break;
      case "g-check-fill":
        checkGrammarFill();
        break;
      case "g-order":
        pickGrammarOrder(Number(btn.getAttribute("data-index")));
        break;
      case "g-order-undo":
        undoGrammarOrder();
        break;
      case "g-check-order":
        checkGrammarOrder();
        break;
      case "g-reset":
        resetGrammarExercise();
        break;
      case "tip-grammar":
        hideGloss();
        navigate("#/grammar/item/" + btn.getAttribute("data-id"));
        break;
      case "tip-speak":
        speak(btn.getAttribute("data-text") || "");
        break;
      case "tip-card":
        hideGloss();
        openCard(btn.getAttribute("data-id"));
        break;
      case "speak":
        speak(btn.getAttribute("data-text") || "");
        break;
      case "home":
        location.hash = "#/";
        break;
      case "review-missed":
        var missed = (app.summary && app.summary.missed || []).map(function (id) { return Deck.byId[id]; }).filter(Boolean);
        if (missed.length) {
          startSession({
            cards: missed,
            direction: app.summary && app.summary.direction === "reverse" ? "reverse" : "forward",
            label: "Missed words",
          });
        }
        break;
      case "toggle-setting":
        var key = btn.getAttribute("data-setting");
        app.state.settings[key] = !app.state.settings[key];
        Store.save(app.state);
        btn.classList.toggle("on", app.state.settings[key]);
        btn.setAttribute("aria-pressed", app.state.settings[key] ? "true" : "false");
        break;
      case "export":
        exportProgress();
        break;
      case "import":
        importProgress();
        break;
      case "reset":
        if (window.confirm("Reset all progress? This cannot be undone. Export a backup first if you want to keep it.")) {
          Store.reset();
          app.state = Store.load();
          Deck.all.forEach(function (c) { Store.getCard(app.state, c.id, "forward"); Store.getCard(app.state, c.id, "reverse"); });
          Store.save(app.state);
          app.grammarExercise = null;
          app.grammarSearch = "";
          app.readerLevel = "all";
          app.readerTranslation = false;
          app.readerRate = 0.9;
          readerStop();
          applyTheme();
          toast("Progress reset.");
          render();
        }
        break;
      default:
        break;
    }
  }

  function onChange(e) {
    var el = e.target.closest("[data-setting]");
    if (!el) return;
    var key = el.getAttribute("data-setting");
    var val = el.type === "number" ? Number(el.value) : el.value;
    if (el.type === "number") {
      var min = Number(el.min || 0);
      var max = Number(el.max || 999);
      val = Math.max(min, Math.min(max, val || 0));
      el.value = val;
    }
    app.state.settings[key] = val;
    Store.save(app.state);
    if (key === "theme") {
      applyTheme();
      render();
    } else if (key === "audioRate") {
      app.audio.playbackRate = Number(val) || 1;
    }
  }

  function onInput(e) {
    var grammarSearch = e.target.closest("[data-role='grammar-search']");
    if (grammarSearch) {
      app.grammarSearch = grammarSearch.value;
      var gpos = grammarSearch.selectionStart;
      render();
      var gnext = document.querySelector("[data-role='grammar-search']");
      if (gnext) {
        gnext.focus();
        gnext.setSelectionRange(gpos, gpos);
      }
      return;
    }
    var grammarFill = e.target.closest("[data-role='g-fill']");
    if (grammarFill && app.grammarExercise) {
      app.grammarExercise.fill.value = grammarFill.value;
      return;
    }
    var el = e.target.closest("[data-role='search']");
    if (!el) return;
    app.browse.query = el.value;
    app.browse.limit = 100;
    app.browse.focus = true;
    var pos = el.selectionStart;
    render();
    var next = document.querySelector(".search");
    if (next) {
      next.focus();
      next.setSelectionRange(pos, pos);
    }
    setTimeout(function () { app.browse.focus = false; }, 0);
  }

  function onKey(e) {
    if (e.target && e.target.matches && e.target.matches("[data-role='g-fill']") && e.key === "Enter") {
      e.preventDefault();
      checkGrammarFill();
      return;
    }
    if (e.key === "Escape") hideGloss();
    if (e.target && /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) return;
    if (e.key === "Escape") {
      if (app.readerPlaying || (window.speechSynthesis && window.speechSynthesis.speaking)) {
        readerStop();
        return;
      }
      if (document.getElementById("modal-root").innerHTML) {
        closeModal();
        return;
      }
      if (location.hash.indexOf("#/learn") === 0) exitStudy();
      return;
    }
    if (location.hash.indexOf("#/learn") !== 0) return;
    if (e.code === "Space") {
      e.preventDefault();
      if (app.mode === "front") flip();
      else if (app.mode === "result") nextCard();
      return;
    }
    if (e.key === "Enter" && app.mode === "result") {
      e.preventDefault();
      nextCard();
      return;
    }
    if (/^[1-4]$/.test(e.key)) {
      if (app.mode === "mcq") {
        e.preventDefault();
        selectOption(Number(e.key) - 1);
      } else if (app.mode === "back") {
        e.preventDefault();
        rate(Number(e.key));
      }
      return;
    }
    if (e.key.toLowerCase() === "a") {
      if (!(app.session && app.session.direction === "reverse" && app.mode === "front")) replayWord();
    }
    if (e.key.toLowerCase() === "s") {
      if (!(app.session && app.session.direction === "reverse" && app.mode === "front")) replayExample();
    }
  }

  init();
})();
