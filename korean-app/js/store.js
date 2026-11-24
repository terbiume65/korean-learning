/* Local progress store + daily stats + café economy. */
(function (root) {
  "use strict";
  var KEY = "hangul-deck-v1";
  var FSRS = root.FSRS;
  var DAY = 86400000;

  var DEFAULTS = {
    version: 2,
    settings: {
      newPerDay: 20,
      reviewsPerDay: 200,
      dailyGoal: 20,
      autoplayWord: true,
      autoplayExample: true,
      showRomanization: false,
      showHanja: true,
      theme: "system",
      audioRate: 1,
    },
    cards: {},
    reverseCards: {},
    grammar: {},
    reading: {},
    daily: {},
    cafe: {
      beans: 0,
      items: {},
      totalEarned: 0,
      stars: 0,
      starsEarned: 0,
      starUnits: {},
      charms: {},
      lastDailyBonus: null,
      lastGoalBonus: null,
    },
    streak: { current: 0, longest: 0, lastStudy: null },
    createdAt: null,
  };

  function clone(x) {
    return JSON.parse(JSON.stringify(x));
  }

  function dateKey(d) {
    d = d || new Date();
    var y = d.getFullYear();
    var m = String(d.getMonth() + 1).padStart(2, "0");
    var day = String(d.getDate()).padStart(2, "0");
    return y + "-" + m + "-" + day;
  }

  function dayOffset(key, offset) {
    var d = new Date(key + "T12:00:00");
    d.setDate(d.getDate() + offset);
    return dateKey(d);
  }

  function merge(base, extra) {
    var out = clone(base);
    if (!extra || typeof extra !== "object") return out;
    Object.keys(extra).forEach(function (k) {
      if (extra[k] && typeof extra[k] === "object" && !Array.isArray(extra[k])) {
        out[k] = merge(out[k] || {}, extra[k]);
      } else {
        out[k] = extra[k];
      }
    });
    return out;
  }

  function emptyDay() {
    return {
      new: 0,
      reviews: 0,
      correct: 0,
      wrong: 0,
      time: 0,
      reverseNew: 0,
      reverseReviews: 0,
      reverseCorrect: 0,
      reverseWrong: 0,
      reverseTime: 0,
    };
  }

  function normalizeDaily(state) {
    Object.keys(state.daily || {}).forEach(function (k) {
      state.daily[k] = Object.assign(emptyDay(), state.daily[k] || {});
    });
  }

  function load() {
    var state;
    try {
      state = JSON.parse(localStorage.getItem(KEY) || "null");
    } catch (e) {
      state = null;
    }
    state = merge(DEFAULTS, state || {});
    state.version = 2;
    if (!state.createdAt) state.createdAt = Date.now();
    if (!state.cards) state.cards = {};
    if (!state.reverseCards) state.reverseCards = {};
    if (!state.grammar) state.grammar = {};
    if (!state.reading) state.reading = {};
    if (!state.cafe) state.cafe = clone(DEFAULTS.cafe);
    if (!state.cafe.items) state.cafe.items = clone(DEFAULTS.cafe.items);
    if (state.cafe.stars == null) state.cafe.stars = 0;
    if (state.cafe.starsEarned == null) state.cafe.starsEarned = 0;
    if (!state.cafe.starUnits) state.cafe.starUnits = {};
    if (!state.cafe.charms) state.cafe.charms = {};
    normalizeDaily(state);
    return state;
  }

  function save(state) {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
      if (root.dispatchEvent && typeof root.CustomEvent === "function") {
        root.dispatchEvent(new root.CustomEvent("deck:saved"));
      }
      return true;
    } catch (e) {
      console.warn("Could not save progress", e);
      return false;
    }
  }

  function mapFor(state, direction) {
    return direction === "reverse" ? (state.reverseCards = state.reverseCards || {}) : (state.cards = state.cards || {});
  }

  function getCard(state, id, direction) {
    var map = mapFor(state, direction);
    if (!map[id]) map[id] = FSRS.newCard(id);
    return map[id];
  }

  function today(state, d) {
    var k = dateKey(d);
    if (!state.daily[k]) state.daily[k] = emptyDay();
    else state.daily[k] = Object.assign(emptyDay(), state.daily[k]);
    return state.daily[k];
  }

  function updateStreak(state, now) {
    var k = dateKey(new Date(now));
    var s = state.streak;
    if (s.lastStudy === k) return;
    if (s.lastStudy === dayOffset(k, -1)) s.current += 1;
    else s.current = 1;
    s.lastStudy = k;
    if (s.current > s.longest) s.longest = s.current;
  }

  function answer(state, id, grade, correct, elapsedMs, now, direction) {
    now = now || Date.now();
    direction = direction === "reverse" ? "reverse" : "forward";
    var card = getCard(state, id, direction);
    var wasNew = card.state === "new";
    var updated = FSRS.review(card, grade, now);
    mapFor(state, direction)[id] = updated;
    var d = today(state, new Date(now));
    if (direction === "reverse") {
      d.reverseReviews += 1;
      if (wasNew) d.reverseNew += 1;
      if (correct) d.reverseCorrect += 1;
      else d.reverseWrong += 1;
      d.reverseTime += Math.max(0, Math.round((elapsedMs || 0) / 1000));
    } else {
      d.reviews += 1;
      if (wasNew) d.new += 1;
      if (correct) d.correct += 1;
      else d.wrong += 1;
      d.time += Math.max(0, Math.round((elapsedMs || 0) / 1000));
    }
    updateStreak(state, now);

    // Café rewards
    if (!state.cafe) state.cafe = clone(DEFAULTS.cafe);
    if (!state.cafe.items) state.cafe.items = clone(DEFAULTS.cafe.items);
    var beans = 1 + (correct ? 1 : 0) + (wasNew ? 2 : 0);
    var bonus = 0;
    var k = dateKey(new Date(now));
    if (state.cafe.lastDailyBonus !== k) {
      bonus += 5;
      state.cafe.lastDailyBonus = k;
    }
    var totalReviews = d.reviews + d.reverseReviews;
    var goal = Math.max(1, Number(state.settings.dailyGoal) || 20);
    if (totalReviews >= goal && state.cafe.lastGoalBonus !== k) {
      bonus += 15;
      state.cafe.lastGoalBonus = k;
    }
    state.cafe.beans += beans + bonus;
    state.cafe.totalEarned += beans + bonus;
    save(state);
    return { card: updated, beans: beans + bonus, base: beans, bonus: bonus, wasNew: wasNew };
  }

  function cafeLevel(state) {
    return 1 + Math.floor((state.cafe ? state.cafe.totalEarned || 0 : 0) / 200);
  }

  function ensureCafe(state) {
    if (!state.cafe) state.cafe = clone(DEFAULTS.cafe);
    if (!state.cafe.items) state.cafe.items = {};
    if (state.cafe.beans == null) state.cafe.beans = 0;
    if (state.cafe.totalEarned == null) state.cafe.totalEarned = 0;
    if (state.cafe.stars == null) state.cafe.stars = 0;
    if (state.cafe.starsEarned == null) state.cafe.starsEarned = 0;
    if (!state.cafe.starUnits) state.cafe.starUnits = {};
    if (!state.cafe.charms) state.cafe.charms = {};
    return state.cafe;
  }

  function addBeans(state, amount) {
    var cafe = ensureCafe(state);
    cafe.beans += amount;
    cafe.totalEarned += amount;
    save(state);
    return cafe.beans;
  }

  function unitCompleted(state, unitId) {
    var items = (root.GRAMMAR_ITEMS || []).filter(function (item) {
      return item.unit === unitId;
    });
    if (!items.length) return false;
    return items.every(function (item) {
      var g = state.grammar && state.grammar[item.id];
      return !!(g && g.completed);
    });
  }

  function syncGrammarStars(state) {
    var cafe = ensureCafe(state);
    var changed = false;
    (root.GRAMMAR_UNITS || []).forEach(function (unit) {
      if (cafe.starUnits[unit.id]) return;
      if (!unitCompleted(state, unit.id)) return;
      cafe.starUnits[unit.id] = true;
      cafe.stars += 1;
      cafe.starsEarned += 1;
      changed = true;
    });
    if (changed) save(state);
    return changed;
  }

  function markReading(state, id) {
    if (!state.reading) state.reading = {};
    var existed = !!(state.reading[id] && state.reading[id].read);
    state.reading[id] = { read: true, lastAt: Date.now() };
    if (!existed) addBeans(state, 5);
    else save(state);
    return { newlyRead: !existed };
  }

  function readingProgress(state) {
    var texts = root.READER_TEXTS || [];
    var read = texts.filter(function (text) {
      return state.reading && state.reading[text.id] && state.reading[text.id].read;
    }).length;
    return { read: read, total: texts.length };
  }

  function grammarStars(state) {
    var cafe = ensureCafe(state);
    var units = root.GRAMMAR_UNITS || [];
    var earnedUnits = units.filter(function (unit) {
      return cafe.starUnits && cafe.starUnits[unit.id];
    }).length;
    return {
      balance: cafe.stars || 0,
      earned: cafe.starsEarned || 0,
      units: earnedUnits,
      total: units.length,
      charms: Object.keys(cafe.charms || {}).length,
    };
  }

  function grammarProgress(state) {
    var items = root.GRAMMAR_ITEMS || [];
    var done = 0;
    items.forEach(function (item) {
      var g = state.grammar && state.grammar[item.id];
      if (g && g.completed) done++;
    });
    return { completed: done, total: items.length };
  }

  function completeGrammar(state, id, score) {
    if (!state.grammar) state.grammar = {};
    var g = state.grammar[id] || { seen: false, completed: false, bestScore: 0, attempts: 0, lastAt: null, rewarded: [false, false, false] };
    if (!g.rewarded) g.rewarded = [false, false, false];
    g.seen = true;
    g.attempts = (Number(g.attempts) || 0) + 1;
    g.bestScore = Number(g.bestScore) || 0;
    g.lastAt = Date.now();
    if (score > g.bestScore) g.bestScore = score;
    var newlyCompleted = !g.completed && score >= 2;
    if (newlyCompleted) g.completed = true;
    state.grammar[id] = g;
    if (newlyCompleted) addBeans(state, 10);

    var cafe = ensureCafe(state);
    var item = (root.GRAMMAR_ITEMS || []).filter(function (x) { return x.id === id; })[0];
    var unitId = item && item.unit;
    var starEarned = false;
    if (unitId && !cafe.starUnits[unitId] && unitCompleted(state, unitId)) {
      cafe.starUnits[unitId] = true;
      cafe.stars += 1;
      cafe.starsEarned += 1;
      starEarned = true;
    }
    save(state);
    return { progress: g, newlyCompleted: newlyCompleted, starEarned: starEarned, unitId: unitId };
  }

  function rewardGrammarExercise(state, id, index) {
    if (!state.grammar) state.grammar = {};
    var g = state.grammar[id] || { seen: false, completed: false, bestScore: 0, attempts: 0, lastAt: null, rewarded: [false, false, false] };
    if (!g.rewarded) g.rewarded = [false, false, false];
    var i = Math.max(0, Math.min(2, Number(index) || 0));
    if (g.rewarded[i]) return false;
    g.rewarded[i] = true;
    g.seen = true;
    state.grammar[id] = g;
    addBeans(state, 1);
    return true;
  }

  function buyItem(state, item) {
    var cafe = ensureCafe(state);
    if (cafe.items[item.id]) return { ok: false, reason: "owned" };
    if (cafeLevel(state) < item.level) return { ok: false, reason: "level" };
    if (cafe.beans < item.cost) return { ok: false, reason: "beans" };
    cafe.beans -= item.cost;
    cafe.items[item.id] = true;
    save(state);
    return { ok: true };
  }

  function synthesize(state, charm) {
    var cafe = ensureCafe(state);
    if (cafe.charms[charm.id]) return { ok: false, reason: "owned" };
    if ((cafe.stars || 0) < charm.stars) return { ok: false, reason: "stars" };
    if ((cafe.beans || 0) < charm.beans) return { ok: false, reason: "beans" };
    cafe.stars -= charm.stars;
    cafe.beans -= charm.beans;
    cafe.charms[charm.id] = true;
    save(state);
    return { ok: true };
  }

  function dueCounts(state, now, direction) {
    now = now || Date.now();
    var map = mapFor(state, direction);
    var due = 0;
    var learning = 0;
    var fresh = 0;
    Object.keys(map).forEach(function (id) {
      var c = map[id];
      if (c.state === "new") fresh++;
      else if (c.due <= now) {
        due++;
        if (c.state === "learning" || c.state === "relearning") learning++;
      }
    });
    return { due: due, learning: learning, new: fresh };
  }

  function mastery(state, direction) {
    var map = mapFor(state, direction);
    var m = { new: 0, learning: 0, young: 0, mature: 0 };
    Object.keys(map).forEach(function (id) {
      var c = map[id];
      if (c.state === "new") m.new++;
      else if (c.state === "learning" || c.state === "relearning") m.learning++;
      else m[(c.stability || 0) >= 21 ? "mature" : "young"]++;
    });
    return m;
  }

  function forecast(state, days, now, direction) {
    now = now || Date.now();
    var map = mapFor(state, direction);
    var start = new Date(now);
    start.setHours(0, 0, 0, 0);
    var out = [];
    for (var i = 0; i < days; i++) {
      var a = start.getTime() + i * DAY;
      var b = a + DAY;
      var count = 0;
      Object.keys(map).forEach(function (id) {
        var c = map[id];
        if (c.state !== "new" && c.due >= a && c.due < b) count++;
      });
      out.push({ date: a, count: count });
    }
    return out;
  }

  function activity(state, days) {
    var out = [];
    var now = new Date();
    for (var i = days - 1; i >= 0; i--) {
      var d = new Date(now);
      d.setDate(d.getDate() - i);
      var k = dateKey(d);
      var row = state.daily[k] || emptyDay();
      out.push({
        date: k,
        reviews: (row.reviews || 0) + (row.reverseReviews || 0),
        correct: (row.correct || 0) + (row.reverseCorrect || 0),
        wrong: (row.wrong || 0) + (row.reverseWrong || 0),
        new: (row.new || 0) + (row.reverseNew || 0),
      });
    }
    return out;
  }

  function totals(state, days, direction) {
    days = days || 30;
    var act = activity(state, days);
    // Activity aggregates both modes; re-read daily for direction-specific totals.
    var reviews = 0, correct = 0, wrong = 0, newCards = 0;
    for (var i = 0; i < days; i++) {
      var d = new Date();
      d.setDate(d.getDate() - i);
      var row = state.daily[dateKey(d)] || emptyDay();
      if (direction === "forward") {
        reviews += row.reviews || 0;
        correct += row.correct || 0;
        wrong += row.wrong || 0;
        newCards += row.new || 0;
      } else if (direction === "reverse") {
        reviews += row.reverseReviews || 0;
        correct += row.reverseCorrect || 0;
        wrong += row.reverseWrong || 0;
        newCards += row.reverseNew || 0;
      } else {
        reviews += (row.reviews || 0) + (row.reverseReviews || 0);
        correct += (row.correct || 0) + (row.reverseCorrect || 0);
        wrong += (row.wrong || 0) + (row.reverseWrong || 0);
        newCards += (row.new || 0) + (row.reverseNew || 0);
      }
    }
    return {
      reviews: reviews,
      correct: correct,
      wrong: wrong,
      newCards: newCards,
      accuracy: reviews ? correct / reviews : 0,
    };
  }

  function exportProgress(state) {
    return JSON.stringify(
      {
        app: "hangul-deck",
        version: 2,
        exportedAt: new Date().toISOString(),
        settings: state.settings,
        cards: state.cards,
        reverseCards: state.reverseCards,
        grammar: state.grammar,
        reading: state.reading,
        daily: state.daily,
        cafe: state.cafe,
        streak: state.streak,
      },
      null,
      2
    );
  }

  function importProgress(text) {
    var data = JSON.parse(text);
    if (!data || data.app !== "hangul-deck" || (!data.cards && !data.reverseCards)) {
      throw new Error("Not a Hangul Deck progress file.");
    }
    var state = merge(DEFAULTS, {
      settings: data.settings,
      cards: data.cards,
      reverseCards: data.reverseCards,
      grammar: data.grammar,
      reading: data.reading,
      daily: data.daily,
      cafe: data.cafe,
      streak: data.streak,
      createdAt: Date.now(),
    });
    state.version = 2;
    if (!state.grammar) state.grammar = {};
    if (!state.reading) state.reading = {};
    normalizeDaily(state);
    return state;
  }

  function reset() {
    localStorage.removeItem(KEY);
  }

  root.Store = {
    KEY: KEY,
    load: load,
    save: save,
    getCard: getCard,
    today: today,
    answer: answer,
    dueCounts: dueCounts,
    mastery: mastery,
    forecast: forecast,
    activity: activity,
    totals: totals,
    cafeLevel: cafeLevel,
    buyItem: buyItem,
    synthesize: synthesize,
    addBeans: addBeans,
    grammarProgress: grammarProgress,
    grammarStars: grammarStars,
    markReading: markReading,
    readingProgress: readingProgress,
    syncGrammarStars: syncGrammarStars,
    completeGrammar: completeGrammar,
    rewardGrammarExercise: rewardGrammarExercise,
    exportProgress: exportProgress,
    importProgress: importProgress,
    reset: reset,
    dateKey: dateKey,
    dayOffset: dayOffset,
    emptyDay: emptyDay,
  };
})(typeof self !== "undefined" ? self : this);
