/* Deck helpers: search, audio paths, multiple-choice generation. */
(function (root) {
  "use strict";
  var DECK = (root.VOCAB || []).slice();
  var byId = {};
  var byWord = {};
  DECK.forEach(function (c) {
    byId[c.id] = c;
    if (!byWord[c.word]) byWord[c.word] = c;
  });

  function hash(str) {
    var h = 2166136261;
    for (var i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  function mulberry32(a) {
    return function () {
      a |= 0;
      a = (a + 0x6d2b79f5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function shuffle(arr, rnd) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(rnd() * (i + 1));
      var t = a[i];
      a[i] = a[j];
      a[j] = t;
    }
    return a;
  }

  function theMeaning(c) {
    return (c.meaning_zh || "").trim();
  }

  function tooSimilar(a, b) {
    if (!a || !b) return true;
    if (a === b) return true;
    if (a.length >= 2 && b.length >= 2 && (a.indexOf(b) >= 0 || b.indexOf(a) >= 0)) return true;
    return false;
  }

  function getOptions(card, count) {
    count = count || 4;
    var correct = theMeaning(card);
    var alt = (card.alt_meanings || []).concat([correct]);
    var seed = hash(card.id + "|" + correct);
    var rnd = mulberry32(seed);
    var pool = [];
    DECK.forEach(function (c) {
      if (c.id === card.id) return;
      var m = theMeaning(c);
      if (!m || m.length > 6) return;
      if (tooSimilar(m, correct)) return;
      if (alt.indexOf(m) >= 0) return;
      var lenDiff = Math.abs(m.length - correct.length);
      var first = m.charAt(0) === correct.charAt(0) ? 0.6 : 0;
      pool.push({ m: m, score: lenDiff + first + rnd() * 2.5 });
    });
    pool.sort(function (a, b) {
      return a.score - b.score;
    });
    var candidates = pool.slice(0, 40).map(function (x) {
      return x.m;
    });
    var picks = [];
    var used = {};
    shuffle(candidates, rnd).forEach(function (m) {
      if (picks.length < count - 1 && !used[m]) {
        used[m] = true;
        picks.push(m);
      }
    });
    var options = shuffle([correct].concat(picks), mulberry32(seed ^ 0x9e3779b9));
    return {
      options: options,
      correctIndex: options.indexOf(correct),
      correct: correct,
    };
  }

  function getReverseOptions(card, count) {
    count = count || 4;
    var correct = card.word;
    var seed = hash(card.id + "|reverse|" + correct);
    var rnd = mulberry32(seed);
    var pool = [];
    var used = {};
    used[correct] = true;
    DECK.forEach(function (c) {
      if (c.id === card.id) return;
      var w = c.word;
      if (!w || used[w] || tooSimilar(w, correct)) return;
      if (c.meaning_zh === card.meaning_zh) return;
      if ((card.alt_meanings || []).indexOf(c.meaning_zh) >= 0) return;
      var lenDiff = Math.abs(w.length - correct.length);
      var first = w.charAt(0) === correct.charAt(0) ? 0.5 : 0;
      pool.push({ m: w, score: lenDiff + first + rnd() * 2.6 });
      used[w] = true;
    });
    pool.sort(function (a, b) {
      return a.score - b.score;
    });
    var candidates = pool.slice(0, 50).map(function (x) {
      return x.m;
    });
    var picks = [];
    var chosen = {};
    shuffle(candidates, rnd).forEach(function (w) {
      if (picks.length < count - 1 && !chosen[w]) {
        chosen[w] = true;
        picks.push(w);
      }
    });
    var options = shuffle([correct].concat(picks), mulberry32(seed ^ 0x51ed270b));
    return {
      options: options,
      correctIndex: options.indexOf(correct),
      correct: correct,
    };
  }

  function wordAudio(c) {
    return "audio/" + c.id + "_word.mp3";
  }
  function exampleAudio(c) {
    return "audio/" + c.id + "_example.mp3";
  }
  function fullAudio(c) {
    return "audio/" + c.id + ".mp3";
  }

  function search(query) {
    var q = (query || "").trim().toLowerCase();
    if (!q) return DECK;
    return DECK.filter(function (c) {
      return (
        c.word.toLowerCase().indexOf(q) >= 0 ||
        (c.romanization || "").toLowerCase().indexOf(q) >= 0 ||
        (c.hanja || "").indexOf(q) >= 0 ||
        (c.hanja_simplified || "").indexOf(q) >= 0 ||
        (c.meaning_zh || "").indexOf(q) >= 0
      );
    });
  }

  function status(cardState) {
    if (!cardState || cardState.state === "new") return "new";
    if (cardState.state === "learning" || cardState.state === "relearning") return "learning";
    return (cardState.stability || 0) >= 21 ? "mature" : "young";
  }

  function statusLabel(cardState) {
    var s = status(cardState);
    return s === "young" ? "review" : s;
  }

  function todayCard() {
    var d = Store.dateKey();
    var seed = hash(d + "|word");
    return DECK[seed % DECK.length];
  }

  var HANJA_TRUST = {
    거실: 1, 계단: 1, 계산: 1, 고모: 1, 고민: 1, 고향: 1, 공부: 1,
    공부하다: 1, 공책: 1, 과자: 1, 관광지: 1, 관심: 1, 교실: 1,
    교통사고: 1, 금방: 1, 금요일: 1, 기분: 1, 남편: 1, 내일: 1,
    냉장고: 1, 대리: 1, 대학원: 1, 댁: 1, 독일: 1, 동생: 1, 동전: 1,
    만두: 1, 목요일: 1, 번: 1, 변호사: 1, 부탁: 1, 사진: 1, 삼촌: 1,
    생선: 1, 선생님: 1, 수업: 1, 수요일: 1, 수첩: 1, 숙제: 1, 시계: 1,
    식사: 1, 신문: 1, 씨: 1, 안내: 1, 안내문: 1, 안녕: 1, 안녕하다: 1,
    안녕히: 1, 양복: 1, 열심히: 1, 연결: 1, 예약: 1, 오전: 1, 요금: 1,
    요일: 1, 운동: 1, 운전자: 1, 월급: 1, 월요일: 1, 이사하다: 1,
    장갑: 1, 장미꽃: 1, 장소: 1, 정류장: 1, 정리: 1, 취미: 1, 치약: 1,
    친구: 1, 침대: 1, 토요일: 1, 퇴근: 1, 편안: 1, 편지: 1, 편하다: 1,
    항상: 1, 화장실: 1, 회사: 1, 회사원: 1, 화요일: 1, 일요일: 1,
  };

  function hanjaReliable(c) {
    if (!c || !c.hanja) return false;
    if (HANJA_TRUST[c.word]) return true;
    var h = c.hanja_simplified || c.hanja;
    var m = c.meaning_zh || "";
    for (var i = 0; i < h.length; i++) {
      if (m.indexOf(h.charAt(i)) >= 0) return true;
    }
    return false;
  }

  root.Deck = {
    all: DECK,
    byId: byId,
    byWord: byWord,
    count: DECK.length,
    getOptions: getOptions,
    getReverseOptions: getReverseOptions,
    wordAudio: wordAudio,
    exampleAudio: exampleAudio,
    fullAudio: fullAudio,
    search: search,
    status: status,
    statusLabel: statusLabel,
    todayCard: todayCard,
    hanjaReliable: hanjaReliable,
    hash: hash,
  };
})(typeof self !== "undefined" ? self : this);
