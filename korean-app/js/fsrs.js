/*
 * FSRS-5 inspired scheduler.
 * Uses the Free Spaced Repetition Scheduler formulas (default parameters)
 * with Anki-style short learning steps for new/lapsed cards.
 */
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.FSRS = factory();
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  var DAY = 86400000;
  var MIN = 60000;
  var DECAY = -0.5;
  var FACTOR = 19 / 81;
  var W = [
    0.40255, 1.18385, 3.173, 15.69105, 7.1949, 0.5345, 1.4604, 0.0046,
    1.54575, 0.1192, 1.01925, 1.9395, 0.11, 0.29605, 2.2698, 0.2315,
    2.9898, 0.51655, 0.6621,
  ];

  function clamp(x, lo, hi) {
    return Math.min(hi, Math.max(lo, x));
  }

  function retrievability(elapsedDays, stability) {
    if (!stability || stability <= 0) return 0;
    return Math.pow(1 + (FACTOR * elapsedDays) / stability, DECAY);
  }

  function initStability(g) {
    return Math.max(0.1, W[g - 1]);
  }

  function initDifficulty(g) {
    return clamp(W[4] - Math.exp(W[5] * (g - 1)) + 1, 1, 10);
  }

  function nextDifficulty(d, g) {
    var d0 = initDifficulty(4);
    var nd = d - W[6] * (g - 3);
    nd = W[7] * d0 + (1 - W[7]) * nd;
    return clamp(nd, 1, 10);
  }

  function nextRecallStability(d, s, r, g) {
    var hard = g === 2 ? W[15] : 1;
    var easy = g === 4 ? W[16] : 1;
    var next =
      s *
      (1 +
        Math.exp(W[8]) *
          (11 - d) *
          Math.pow(s, -W[9]) *
          (Math.exp((1 - r) * W[10]) - 1) *
          hard *
          easy);
    return Math.max(0.1, next);
  }

  function nextForgetStability(d, s, r) {
    var next =
      W[11] *
      Math.pow(d, -W[12]) *
      (Math.pow(s + 1, W[13]) - 1) *
      Math.exp(W[14] * (1 - r));
    return Math.max(0.1, next);
  }

  function nextShortTermStability(s, g) {
    return Math.max(0.1, s * Math.exp(W[17] * (g - 3 + W[18])));
  }

  function intervalFromStability(s, retention) {
    var target = retention || 0.9;
    return (s / FACTOR) * (Math.pow(target, 1 / DECAY) - 1);
  }

  function newCard(id) {
    return {
      id: id,
      state: "new",
      step: 0,
      stability: 0,
      difficulty: 0,
      due: Date.now(),
      reps: 0,
      lapses: 0,
      lastReview: null,
      history: [],
    };
  }

  function review(card, grade, now) {
    now = now || Date.now();
    card = Object.assign({}, card || newCard(""));
    var g = clamp(Math.round(grade), 1, 4);
    var last = card.lastReview;
    var elapsed = last ? Math.max(0, (now - last) / DAY) : 0;
    var s = Math.max(0.1, card.stability || 0.1);
    var d = card.difficulty || 0;
    var state = card.state || "new";
    var step = card.step || 0;
    var intervalDays;

    if (state === "new" || !card.reps) {
      s = initStability(g);
      d = initDifficulty(g);
      card.reps = 1;
      if (g === 1) {
        state = "learning";
        step = 0;
        intervalDays = 1 / 1440;
      } else if (g === 2) {
        state = "learning";
        step = 0;
        intervalDays = 6 / 1440;
      } else {
        state = "review";
        intervalDays = Math.max(1, intervalFromStability(s));
      }
    } else if (state === "learning" || state === "relearning") {
      var rShort = retrievability(elapsed, s);
      if (g === 1) {
        s = nextShortTermStability(s, g);
        state = "learning";
        step = 0;
        intervalDays = 1 / 1440;
      } else if (g === 2) {
        s = nextShortTermStability(s, g);
        intervalDays = 6 / 1440;
      } else {
        s = nextRecallStability(d, s, Math.max(0.5, rShort), g);
        state = "review";
        intervalDays = Math.max(1, intervalFromStability(s));
      }
      card.reps++;
    } else {
      var r = retrievability(elapsed, s);
      if (g === 1) {
        s = nextForgetStability(d, s, r);
        d = nextDifficulty(d, g);
        state = "relearning";
        step = 0;
        intervalDays = 10 / 1440;
        card.lapses = (card.lapses || 0) + 1;
      } else {
        s = nextRecallStability(d, s, r, g);
        d = nextDifficulty(d, g);
        state = "review";
        intervalDays = Math.max(1, intervalFromStability(s));
        if (g === 2) intervalDays = Math.max(1, intervalDays * 0.8);
        if (g === 4) intervalDays = Math.max(1, intervalDays * 1.25);
      }
      card.reps++;
    }

    s = clamp(s, 0.01, 36500);
    d = clamp(d, 1, 10);
    intervalDays = clamp(intervalDays, 1 / 1440, 36500);
    card.stability = s;
    card.difficulty = d;
    card.state = state;
    card.step = step;
    card.due = now + intervalDays * DAY;
    card.lastReview = now;
    card.history = (card.history || []).concat([
      { at: now, grade: g, interval: intervalDays, state: state },
    ]);
    if (card.history.length > 30) card.history = card.history.slice(-30);
    return card;
  }

  function preview(card, now) {
    now = now || Date.now();
    return [1, 2, 3, 4].map(function (g) {
      var next = review(card, g, now);
      return { grade: g, due: next.due, intervalDays: (next.due - now) / DAY, state: next.state };
    });
  }

  function formatInterval(days) {
    if (!isFinite(days) || days <= 0) return "now";
    var minutes = days * 1440;
    if (minutes < 60) return Math.max(1, Math.round(minutes)) + "m";
    var hours = days * 24;
    if (hours < 24) return Math.max(1, Math.round(hours)) + "h";
    if (days < 30) return Math.round(days) + "d";
    if (days < 365) return (days / 30).toFixed(days < 60 ? 1 : 0) + "mo";
    return (days / 365).toFixed(days < 730 ? 1 : 0) + "y";
  }

  function dueLabel(ts, now) {
    now = now || Date.now();
    var diff = ts - now;
    if (diff <= 60000) return "now";
    if (diff < 3600000) return Math.round(diff / 60000) + "m";
    if (diff < DAY) return Math.round(diff / 3600000) + "h";
    var days = diff / DAY;
    if (days < 30) return Math.round(days) + "d";
    if (days < 365) return Math.round(days / 30) + "mo";
    return (days / 365).toFixed(1) + "y";
  }

  return {
    newCard: newCard,
    review: review,
    preview: preview,
    retrievability: retrievability,
    intervalFromStability: intervalFromStability,
    formatInterval: formatInterval,
    dueLabel: dueLabel,
    DAY: DAY,
    MIN: MIN,
    PARAMS: W,
  };
});
