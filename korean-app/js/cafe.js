/* Café catalog + SVG scene. */
(function (root) {
  "use strict";

  var ITEMS = [
    { id: "plant", name: "Monstera", cost: 40, level: 1, icon: "🪴", desc: "A little green life by the window." },
    { id: "lamp", name: "Pendant lamp", cost: 60, level: 2, icon: "💡", desc: "Warm light over the counter." },
    { id: "rug", name: "Woven rug", cost: 80, level: 2, icon: "🧶", desc: "Softens the wooden floor." },
    { id: "bookshelf", name: "Bookshelf", cost: 120, level: 2, icon: "📚", desc: "For slow afternoons and new words." },
    { id: "espresso", name: "Espresso machine", cost: 160, level: 3, icon: "☕", desc: "The noisy, delicious heart of the café." },
    { id: "cat", name: "Café cat", cost: 200, level: 3, icon: "🐈", desc: "Chief morale officer. Does not help." },
    { id: "windowseat", name: "Window seat", cost: 220, level: 3, icon: "🪟", desc: "The best light in the house." },
    { id: "cake", name: "Cake display", cost: 260, level: 4, icon: "🍰", desc: "Something sweet for regulars." },
    { id: "neon", name: "Neon sign", cost: 320, level: 4, icon: "🌙", desc: "A glow for evening study." },
    { id: "record", name: "Record player", cost: 360, level: 5, icon: "🎵", desc: "Quiet jazz, all day." },
    { id: "garden", name: "Window garden", cost: 300, level: 4, icon: "🌿", desc: "Herbs for the kitchen and the soul." },
    { id: "awning", name: "Striped awning", cost: 420, level: 5, icon: "⛱️", desc: "The café looks official now." },
  ];

  var CHARMS = [
    { id: "tense", name: "Tense Tile", glyph: "때", color: "#c26d4a", stars: 2, beans: 90, desc: "A tile for past, present and future." },
    { id: "particle", name: "Particle Mobile", glyph: "이", color: "#4c7a72", stars: 3, beans: 140, desc: "Little markers, perfectly balanced." },
    { id: "sentence", name: "Sentence Loom", glyph: "문", color: "#7a5b8c", stars: 4, beans: 200, desc: "Weaves words into sentences." },
    { id: "sound", name: "Sound Tile", glyph: "말", color: "#b57a45", stars: 5, beans: 260, desc: "For reading it out loud." },
    { id: "dream", name: "Dream Star", glyph: "꿈", color: "#c9a96b", stars: 7, beans: 340, desc: "The last light on the grammar path." }
  ];

  function ownedClass(owned, id) {
    return owned && owned[id] ? "cafe-item owned" : "cafe-item";
  }

  function customerClass(words, threshold) {
    return words >= threshold ? "cafe-customer show" : "cafe-customer";
  }

  function scene(owned, words, level, charms) {
    owned = owned || {};
    words = words || 0;
    charms = charms || {};
    var ownedCharms = CHARMS.filter(function (charm) { return charms[charm.id]; });
    var charmWall = ownedCharms.length
      ? '<g class="cafe-grammar-wall">' +
        '<rect x="320" y="168" width="190" height="112" rx="10" fill="#8a5b34" opacity=".92"/>' +
        '<rect x="328" y="176" width="174" height="96" rx="6" fill="#f4dfb8"/>' +
        '<text x="415" y="193" text-anchor="middle" font-family="Pretendard, Noto Sans KR, sans-serif" font-size="9" font-weight="700" letter-spacing="2" fill="#8a5b34">문법</text>' +
        ownedCharms.map(function (charm, i) {
          var x = 341 + (i % 3) * 56;
          var y = 202 + Math.floor(i / 3) * 34;
          return '<g><rect x="' + x + '" y="' + y + '" width="34" height="28" rx="6" fill="' + charm.color + '"/><text x="' + (x + 17) + '" y="' + (y + 19) + '" text-anchor="middle" font-family="Pretendard, Noto Sans KR, sans-serif" font-size="14" font-weight="800" fill="#fff8f2">' + charm.glyph + '</text></g>';
        }).join("") +
        '</g>'
      : "";
    return (
      '<div class="cafe-scene" role="img" aria-label="Illustration of the Hangul Café">' +
      '<svg viewBox="0 0 900 520" aria-hidden="true" focusable="false">' +
      '<defs>' +
      '<linearGradient id="wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f6ead8"/><stop offset="1" stop-color="#eedcc4"/></linearGradient>' +
      '<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a9d8e8"/><stop offset="1" stop-color="#e6f4ee"/></linearGradient>' +
      '<linearGradient id="wood" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c99763"/><stop offset="1" stop-color="#a97445"/></linearGradient>' +
      '<radialGradient id="glow"><stop offset="0" stop-color="#ffe6a8" stop-opacity=".85"/><stop offset="1" stop-color="#ffe6a8" stop-opacity="0"/></radialGradient>' +
      '<filter id="soft"><feGaussianBlur stdDeviation="8"/></filter>' +
      '</defs>' +
      // wall / floor
      '<rect width="900" height="370" fill="url(#wall)"/>' +
      '<rect y="360" width="900" height="160" fill="url(#wood)"/>' +
      '<path d="M0 392h900M0 430h900M0 470h900" stroke="#8f5f37" stroke-width="2" opacity=".28"/>' +
      '<rect y="356" width="900" height="8" fill="#7e5434" opacity=".55"/>' +
      // window
      '<g class="cafe-base">' +
      '<rect x="52" y="82" width="258" height="164" rx="12" fill="#8a5b34"/>' +
      '<rect x="62" y="92" width="238" height="144" rx="7" fill="url(#sky)"/>' +
      '<circle cx="250" cy="126" r="18" fill="#ffe8a3"/>' +
      '<path d="M86 160c22-18 42-18 64 0s42 18 64 0" stroke="#ffffff" stroke-width="10" stroke-linecap="round" fill="none" opacity=".7"/>' +
      '<path d="M88 190c26-16 50-16 76 0s50 16 76 0" stroke="#ffffff" stroke-width="8" stroke-linecap="round" fill="none" opacity=".45"/>' +
      '<path d="M181 92v144M62 164h238" stroke="#8a5b34" stroke-width="8"/>' +
      '<rect x="48" y="242" width="266" height="12" rx="5" fill="#7a4e2d"/>' +
      '</g>' +
      // door
      '<g class="cafe-base">' +
      '<rect x="786" y="154" width="88" height="206" rx="10" fill="#7a4e2d"/>' +
      '<rect x="796" y="164" width="68" height="186" rx="6" fill="#cfe6e4" opacity=".9"/>' +
      '<path d="M830 164v186" stroke="#7a4e2d" stroke-width="4" opacity=".55"/>' +
      '<circle cx="810" cy="260" r="4" fill="#7a4e2d"/>' +
      '<path d="M786 150h88" stroke="#7a4e2d" stroke-width="6"/>' +
      '</g>' +
      // sign
      '<g class="cafe-base">' +
      '<rect x="330" y="28" width="240" height="66" rx="14" fill="#2f2a24"/>' +
      '<text x="450" y="58" text-anchor="middle" font-family="Pretendard, Noto Sans KR, sans-serif" font-size="28" font-weight="800" fill="#f8e7c8">한글 카페</text>' +
      '<text x="450" y="78" text-anchor="middle" font-family="Pretendard, sans-serif" font-size="9" letter-spacing="3" fill="#c9a96b">HANGUL CAFE</text>' +
      '</g>' +
      // counter
      '<g class="cafe-base">' +
      '<rect x="548" y="300" width="312" height="76" rx="8" fill="#e9d3b2"/>' +
      '<rect x="548" y="292" width="312" height="14" rx="6" fill="#8a5b34"/>' +
      '<rect x="570" y="330" width="268" height="6" rx="3" fill="#c9a16f" opacity=".7"/>' +
      '<rect x="612" y="342" width="46" height="22" rx="3" fill="#f3e6d1"/>' +
      '<text x="635" y="357" text-anchor="middle" font-size="8" fill="#8a5b34" font-family="sans-serif">MENU</text>' +
      '</g>' +
      // menu board (base)
      '<g class="cafe-base">' +
      '<path d="M486 356l30-50h54l30 50z" fill="#2f2a24"/>' +
      '<path d="M500 350l22-38h42l22 38z" fill="#3d362c"/>' +
      '<text x="543" y="330" text-anchor="middle" font-size="9" fill="#f4dfb8" font-family="sans-serif">오늘의 커피</text>' +
      '<text x="543" y="342" text-anchor="middle" font-size="7" fill="#c9a96b" font-family="sans-serif">3,500원</text>' +
      '</g>' +
      // base table + chairs
      '<g class="cafe-base">' +
      '<ellipse cx="270" cy="438" rx="118" ry="18" fill="#6f4628" opacity=".25"/>' +
      '<rect x="176" y="366" width="188" height="14" rx="6" fill="#8a5b34"/>' +
      '<rect x="196" y="380" width="10" height="62" rx="4" fill="#6f4628"/>' +
      '<rect x="334" y="380" width="10" height="62" rx="4" fill="#6f4628"/>' +
      '<rect x="146" y="382" width="34" height="50" rx="7" fill="#b57a45"/>' +
      '<rect x="360" y="382" width="34" height="50" rx="7" fill="#b57a45"/>' +
      '<rect x="140" y="370" width="46" height="10" rx="4" fill="#8a5b34"/>' +
      '<rect x="354" y="370" width="46" height="10" rx="4" fill="#8a5b34"/>' +
      '<rect x="250" y="348" width="34" height="20" rx="4" fill="#f4dfb8"/>' +
      '<path d="M258 348c0-7 5-10 9-10s9 3 9 10" fill="#d9b47a"/>' +
      '</g>' +
      // customers
      '<g class="' + customerClass(words, 25) + ' cafe-customer-1">' +
      '<circle cx="180" cy="316" r="18" fill="#5b4636"/><rect x="156" y="332" width="48" height="36" rx="12" fill="#c26d4a"/><rect x="164" y="362" width="12" height="34" rx="5" fill="#3d332b"/><rect x="188" y="362" width="12" height="34" rx="5" fill="#3d332b"/>' +
      '</g>' +
      '<g class="' + customerClass(words, 120) + ' cafe-customer-2">' +
      '<circle cx="360" cy="322" r="17" fill="#6b4c3a"/><rect x="338" y="338" width="44" height="32" rx="11" fill="#4c7a72"/><rect x="346" y="364" width="11" height="30" rx="5" fill="#3d332b"/><rect x="368" y="364" width="11" height="30" rx="5" fill="#3d332b"/>' +
      '</g>' +
      '<g class="' + customerClass(words, 300) + ' cafe-customer-3">' +
      '<circle cx="106" cy="228" r="16" fill="#8a5b34"/><rect x="86" y="242" width="40" height="30" rx="10" fill="#b8774d"/><rect x="94" y="266" width="10" height="28" rx="4" fill="#3d332b"/><rect x="116" y="266" width="10" height="28" rx="4" fill="#3d332b"/>' +
      '</g>' +
      '<g class="' + customerClass(words, 600) + ' cafe-customer-4">' +
      '<circle cx="676" cy="244" r="16" fill="#5b4636"/><rect x="656" y="258" width="40" height="28" rx="10" fill="#7a5b8c"/><rect x="664" y="280" width="10" height="24" rx="4" fill="#3d332b"/><rect x="686" y="280" width="10" height="24" rx="4" fill="#3d332b"/>' +
      '</g>' +
      // window seat
      '<g class="' + ownedClass(owned, "windowseat") + '" data-item="windowseat">' +
      '<rect x="74" y="250" width="214" height="16" rx="5" fill="#9b6a3e"/><rect x="84" y="266" width="10" height="38" fill="#7e5434"/><rect x="268" y="266" width="10" height="38" fill="#7e5434"/>' +
      '<rect x="90" y="230" width="52" height="28" rx="8" fill="#d9a05b"/><rect x="152" y="230" width="52" height="28" rx="8" fill="#e7c08a"/>' +
      '</g>' +
      // rug
      '<g class="' + ownedClass(owned, "rug") + '" data-item="rug">' +
      '<ellipse cx="440" cy="448" rx="178" ry="42" fill="#c26d4a" opacity=".55"/><ellipse cx="440" cy="448" rx="146" ry="31" fill="#e0a080" opacity=".7"/><path d="M330 448h220" stroke="#f4dfb8" stroke-width="3" opacity=".6"/>' +
      '</g>' +
      // bookshelf
      '<g class="' + ownedClass(owned, "bookshelf") + '" data-item="bookshelf">' +
      '<rect x="36" y="198" width="120" height="158" rx="6" fill="#8a5b34"/><rect x="44" y="206" width="104" height="142" rx="4" fill="#6f4628"/>' +
      '<path d="M44 250h104M44 294h104M44 338h104" stroke="#4e321f" stroke-width="4"/>' +
      '<rect x="52" y="214" width="12" height="30" fill="#d9a05b"/><rect x="68" y="210" width="10" height="34" fill="#7a9a8a"/><rect x="82" y="218" width="14" height="26" fill="#c26d4a"/><rect x="100" y="212" width="10" height="32" fill="#e7c08a"/><rect x="114" y="216" width="13" height="28" fill="#7a5b8c"/>' +
      '<rect x="52" y="258" width="14" height="30" fill="#7a9a8a"/><rect x="70" y="256" width="10" height="32" fill="#d9a05b"/><rect x="84" y="262" width="16" height="26" fill="#7a5b8c"/><rect x="104" y="258" width="10" height="30" fill="#c26d4a"/>' +
      '<rect x="52" y="302" width="12" height="30" fill="#e7c08a"/><rect x="68" y="300" width="14" height="32" fill="#c26d4a"/><rect x="86" y="306" width="10" height="26" fill="#7a9a8a"/>' +
      '</g>' +
      // plant
      '<g class="' + ownedClass(owned, "plant") + '" data-item="plant">' +
      '<path d="M96 344c-20-26-18-54 0-72 18 18 20 46 0 72Z" fill="#4f7d5a"/><path d="M96 344c22-30 20-62 0-82-22 20-24 54 0 82Z" fill="#6f9e75"/><path d="M96 344c-30-14-40-36-38-58 22 4 36 26 38 58Z" fill="#7a9a8a"/><path d="M96 344c30-16 39-40 36-62-22 5-35 28-36 62Z" fill="#5b8a64"/>' +
      '<path d="M96 340v-80" stroke="#3d5c42" stroke-width="3"/><path d="M72 340h48l-7 54H79z" fill="#c26d4a"/><path d="M78 394h36" stroke="#8f4630" stroke-width="4"/>' +
      '</g>' +
      // lamp
      '<g class="' + ownedClass(owned, "lamp") + '" data-item="lamp">' +
      '<path d="M660 0v86" stroke="#3d332b" stroke-width="4"/><path d="M626 86h68l-14 34h-40z" fill="#c26d4a"/><ellipse cx="660" cy="122" rx="54" ry="46" fill="url(#glow)"/>' +
      '<path d="M660 120v10" stroke="#f4dfb8" stroke-width="3" opacity=".7"/>' +
      '</g>' +
      // espresso
      '<g class="' + ownedClass(owned, "espresso") + '" data-item="espresso">' +
      '<rect x="596" y="244" width="76" height="50" rx="7" fill="#3d332b"/><rect x="604" y="252" width="24" height="16" rx="3" fill="#c9a96b"/><rect x="638" y="252" width="24" height="10" rx="3" fill="#7a9a8a"/><rect x="620" y="294" width="28" height="10" rx="3" fill="#8a5b34"/>' +
      '<path class="steam" d="M618 238c-6-10 6-14 0-24M632 238c-6-10 6-14 0-24" stroke="#ffffff" stroke-width="3" fill="none" stroke-linecap="round" opacity=".55"/>' +
      '</g>' +
      // cake display
      '<g class="' + ownedClass(owned, "cake") + '" data-item="cake">' +
      '<rect x="700" y="250" width="86" height="48" rx="6" fill="#cfe6e4" opacity=".55"/><rect x="704" y="268" width="78" height="26" fill="#f4dfb8"/><path d="M712 292h62" stroke="#c26d4a" stroke-width="5"/><path d="M716 268c0-14 14-20 24-20s24 6 24 20" fill="#e7c08a"/><circle cx="740" cy="252" r="4" fill="#c26d4a"/>' +
      '</g>' +
      // cat
      '<g class="' + ownedClass(owned, "cat") + '" data-item="cat">' +
      '<ellipse cx="500" cy="444" rx="34" ry="12" fill="#3d332b" opacity=".25"/><path d="M476 430c0-20 12-30 26-30s24 12 24 30c0 10-10 14-24 14s-26-4-26-14Z" fill="#d9a05b"/><circle cx="502" cy="398" r="16" fill="#e7c08a"/><path d="M490 386l-4-14 12 8M514 386l4-14-12 8" fill="#d9a05b"/><circle cx="496" cy="398" r="2.2" fill="#2f2a24"/><circle cx="508" cy="398" r="2.2" fill="#2f2a24"/><path class="cat-tail" d="M526 428c18 0 20-12 12-20" stroke="#d9a05b" stroke-width="7" fill="none" stroke-linecap="round"/>' +
      '</g>' +
      charmWall +
      // neon
      '<g class="' + ownedClass(owned, "neon") + '" data-item="neon">' +
      '<rect x="520" y="118" width="132" height="48" rx="8" fill="#2f2a24" opacity=".92"/><text class="neon-text" x="586" y="149" text-anchor="middle" font-family="Pretendard, sans-serif" font-size="15" font-weight="700" fill="#ff9d7a">OPEN</text><path d="M520 166h132" stroke="#ff9d7a" stroke-width="2" opacity=".3"/>' +
      '</g>' +
      // record player
      '<g class="' + ownedClass(owned, "record") + '" data-item="record">' +
      '<rect x="528" y="254" width="52" height="36" rx="4" fill="#6f4628"/><circle cx="554" cy="272" r="13" fill="#2f2a24"/><circle cx="554" cy="272" r="4" fill="#c9a96b"/><path d="M566 262l10-6" stroke="#c9a96b" stroke-width="3"/>' +
      '</g>' +
      // garden
      '<g class="' + ownedClass(owned, "garden") + '" data-item="garden">' +
      '<path d="M86 242h20l-3 16H89zM112 242h20l-3 16h-14zM138 242h20l-3 16h-14z" fill="#c26d4a"/><path d="M96 242c-6-12 2-20 0-28M122 242c6-14-2-20 0-30M148 242c-6-10 2-18 0-26" stroke="#4f7d5a" stroke-width="4" fill="none" stroke-linecap="round"/>' +
      '</g>' +
      // awning
      '<g class="' + ownedClass(owned, "awning") + '" data-item="awning">' +
      '<path d="M38 48h286l18 34H20z" fill="#c26d4a"/><path d="M38 48h286l18 34H20z" fill="none" stroke="#8f4630" stroke-width="2"/><path d="M58 48l-10 34M98 48l-8 34M138 48l-6 34M178 48l-4 34M218 48l-2 34M258 48l0 34M298 48l2 34" stroke="#f4dfb8" stroke-width="8" opacity=".85"/>' +
      '</g>' +
      // level badge
      '<g class="cafe-base">' +
      '<rect x="700" y="40" width="70" height="34" rx="8" fill="#2f2a24"/><text x="735" y="62" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="700" fill="#f4dfb8">Lv ' + level + '</text>' +
      '</g>' +
      '</svg>' +
      '<div class="cafe-vignette"></div>' +
      '</div>'
    );
  }

  root.Cafe = { items: ITEMS, charms: CHARMS, scene: scene };
})(typeof self !== "undefined" ? self : this);
