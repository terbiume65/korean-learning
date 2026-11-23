/* Final unit conversations.
   Each conversation is short, uses everyday vocabulary, and contains at
   least one occurrence of every lesson target in the unit.  Markup form:
   [[surface|g:lesson-id]] for grammar, [[surface]] for vocabulary. */
(function () {
  "use strict";
  var units = {};
  (window.GRAMMAR_UNITS || []).forEach(function (u) {
    units[u.id] = u;
  });
  function set(id, context) {
    if (units[id]) units[id].context = context;
  }

  set("u0", [
    { speaker: "A", text: "안녕하세요. 저는 [[학생]][[입니다|g:u0-1]].", zh: "你好。我是学生。" },
    { speaker: "B", text: "반가워요. 저는 [[의사]][[예요|g:u0-1]].", zh: "很高兴见到你。我是医生。" },
    { speaker: "A", text: "[[지금]] [[몇 시]][[예요|g:u0-5]]?", zh: "现在几点？" },
    { speaker: "B", text: "[[세 시|g:u0-5]] [[삼십 분|g:u0-5]][[이에요|g:u0-5]].", zh: "三点三十分。" },
    { speaker: "A", text: "[[오늘]]은 [[무슨 요일]][[이에요|g:u0-4]]?", zh: "今天星期几？" },
    { speaker: "B", text: "[[11월 22일|g:u0-4]] [[일요일|g:u0-4]][[이에요|g:u0-4]].", zh: "11月22日星期日。" },
    { speaker: "A", text: "[[책상]] 위에 [[책]][[이|g:u0-2]] [[있어요|g:u0-2]]?", zh: "桌子上有书吗？" },
    { speaker: "B", text: "네, [[책]][[이|g:u0-2]] [[있어요|g:u0-2]]. [[사과]] [[두 개|g:u0-3]]도 [[있어요|g:u0-2]].", zh: "有，有书。还有两个苹果。" }
  ]);

  set("u1", [
    { speaker: "A", text: "저는 매일 [[학교]]에 [[갑니다|g:u1-1]].", zh: "我每天去学校。" },
    { speaker: "B", text: "저도 학교에 [[가요|g:u1-2]].", zh: "我也去学校。" },
    { speaker: "A", text: "[[어제]] 학교에 [[갔어요|g:u1-3]]?", zh: "昨天去学校了吗？" },
    { speaker: "B", text: "아니요, [[집]]에 [[있었어요|g:u1-3]]. 작년에는 [[한국]]에 [[갔었어요|g:u1-6]].", zh: "没有，我在家。去年去过韩国。" },
    { speaker: "A", text: "[[지금]] [[뭐]] [[하고 있어요|g:u1-5]]?", zh: "现在在做什么？" },
    { speaker: "B", text: "[[책]]을 [[읽고 있어요|g:u1-5]]. [[내일]]은 [[도서관]]에 [[갈 거예요|g:u1-4]].", zh: "在读书。明天要去图书馆。" },
    { speaker: "A", text: "[[내일]] [[뭐]] [[먹을 거예요|g:u1-4]]?", zh: "明天要吃什么？" },
    { speaker: "B", text: "[[비빔밥]]을 [[먹을 거예요|g:u1-4]].", zh: "要吃拌饭。" }
  ]);

  set("u2", [
    { speaker: "A", text: "[[오늘]] [[학교]]에 [[안 갔어요|g:u2-2]]?", zh: "今天没去学校吗？" },
    { speaker: "B", text: "네, [[몸]]이 [[안 좋아서|g:u2-2]] [[못 갔어요|g:u2-3]].", zh: "是的，身体不舒服，所以没能去。" },
    { speaker: "A", text: "[[약]]을 [[먹었어요]]?", zh: "吃药了吗？" },
    { speaker: "B", text: "아니요, [[시간]]이 [[없어서|g:u2-1]] [[아직]] [[못 먹었어요|g:u2-3]].", zh: "没有，因为没时间，还没吃。" },
    { speaker: "A", text: "저는 [[학생]][[이 아니에요|g:u2-1]].", zh: "我不是学生。" },
    { speaker: "B", text: "저도 [[학생]][[이 아니에요|g:u2-1]]. [[오늘]]은 [[학교]]에 [[안 가요|g:u2-2]].", zh: "我也不是学生。今天不去学校。" }
  ]);

  set("u3", [
    { speaker: "A", text: "[[주말마다|g:u3-20]] [[뭐]] [[해요]]?", zh: "每个周末做什么？" },
    { speaker: "B", text: "보통 [[친구와|g:u3-4]] [[영화]]를 [[봐요]]. [[친구의|g:u3-5]] [[집]][[에서|g:u3-8]] [[봐요]].", zh: "通常和朋友看电影。在朋友家看。" },
    { speaker: "A", text: "[[이번 주말]][[에|g:u3-6]][[는|g:u3-2]] [[어디]][[에|g:u3-7]] [[가요]]?", zh: "这个周末要去哪里？" },
    { speaker: "B", text: "[[서울]][[에|g:u3-7]] [[가요]]. [[아홉 시]][[부터|g:u3-9]] [[한 시]][[까지|g:u3-9]] [[도서관]][[에|g:u3-6]] [[있어요]].", zh: "去首尔。从九点到一点在图书馆。" },
    { speaker: "A", text: "[[도서관]][[에서|g:u3-8]] [[뭐]] [[해요]]?", zh: "在图书馆做什么？" },
    { speaker: "B", text: "[[책]][[을|g:u3-3]] [[읽고]] [[커피]][[나|g:u3-15]] [[차]][[를|g:u3-3]] [[마셔요]].", zh: "读书，喝咖啡或茶。" },
    { speaker: "A", text: "[[커피]][[만|g:u3-12]] [[마셔요]]?", zh: "只喝咖啡吗？" },
    { speaker: "B", text: "아니요, [[차]][[도|g:u3-11]] [[마셔요]].", zh: "不，也喝茶。" },
    { speaker: "A", text: "[[몇 시]][[쯤|g:u3-17]] [[집]][[에|g:u3-7]] [[와요]]?", zh: "几点左右回家？" },
    { speaker: "B", text: "[[세 시]][[쯤|g:u3-17]] [[버스]][[로|g:u3-14]] [[와요]]. [[도서관]][[에서|g:u3-9]] [[집]][[까지|g:u3-9]] [[한 시간]][[이나|g:u3-16]] [[걸려요]].", zh: "三点左右坐公交车回来。从图书馆到家要一个多小时。" },
    { speaker: "A", text: "[[친구]][[에게|g:u3-10]][[도|g:u3-11]] [[전화해요]]?", zh: "也给朋友打电话吗？" },
    { speaker: "B", text: "네, [[친구]][[가|g:u3-1]] [[집]][[에|g:u3-6]] [[있어요]]. 그런데 [[오늘]]은 [[한 명]][[밖에|g:u3-13]] [[없어요]].", zh: "是的，朋友在家。但是今天只有一个人。" },
    { speaker: "A", text: "[[다음 주말]]에도 [[친구]][[처럼|g:u3-18]] [[여행]]하고 [[싶어요]].", zh: "下个周末也想和朋友一样去旅行。" },
    { speaker: "B", text: "저[[도|g:u3-11]] [[가고]] [[싶어요]]. 그런데 [[오늘]]은 [[어제]][[보다|g:u3-19]] [[추워요]].", zh: "我也想去。不过今天比昨天冷。" }
  ]);

  set("u4", [
    { speaker: "A", text: "[[날씨]]가 [[춥지만|g:u4-3]] [[산]]에 [[갈 거예요]].", zh: "虽然天气冷，但我要去山上。" },
    { speaker: "B", text: "[[비]]가 [[오는데|g:u4-4]] [[우산]]을 [[가져가세요]]. [[따뜻하게]] [[입고|g:u4-1]] [[가세요]].", zh: "正在下雨，请带上伞。穿暖和一点再去。" },
    { speaker: "A", text: "[[커피]]를 [[마시거나|g:u4-2]] [[차]]를 [[마실래요]]?", zh: "你想喝咖啡还是茶？" },
    { speaker: "B", text: "[[차]]를 [[마실게요]]. [[피곤하지만|g:u4-3]] [[괜찮아요]].", zh: "我喝茶吧。虽然累，但没关系。" }
  ]);

  set("u5", [
    { speaker: "A", text: "[[수업]] [[전에|g:u5-1]] [[뭐]] [[해요]]?", zh: "上课前做什么？" },
    { speaker: "B", text: "[[밥]]을 [[먹고 나서|g:u5-3]] [[도서관]]에 [[가요]].", zh: "吃完饭去图书馆。" },
    { speaker: "A", text: "[[수업]] [[후에|g:u5-2]] [[뭐]] [[해요]]?", zh: "下课后做什么？" },
    { speaker: "B", text: "[[친구]]를 [[만나서|g:u5-4]] [[영화]]를 [[봐요]].", zh: "见朋友，然后看电影。" },
    { speaker: "A", text: "[[영화]]를 [[볼 때|g:u5-5]] [[뭐]] [[먹어요]]?", zh: "看电影的时候吃什么？" },
    { speaker: "B", text: "[[팝콘]]을 [[먹으면서|g:u5-6]] [[봐요]].", zh: "一边吃爆米花一边看。" },
    { speaker: "A", text: "[[지금]] [[공부하는 중|g:u5-7]][[이에요]]?", zh: "现在正在学习吗？" },
    { speaker: "B", text: "아니요, [[방학]] [[동안|g:u5-9]] [[여행]]했어요.", zh: "不，放假期间旅行了。" },
    { speaker: "A", text: "[[한국]]에 [[온 지|g:u5-10]] [[얼마나]] [[됐어요]]?", zh: "来韩国多久了？" },
    { speaker: "B", text: "[[작년]]에 [[왔으니까]] [[일 년]] [[됐어요]]. [[집]]에 [[도착하자마자|g:u5-8]] [[잤어요]].", zh: "去年来的，所以已经一年了。一到家就睡了。" }
  ]);

  set("u7", [
    { speaker: "A", text: "[[여기]] [[앉아도 돼요|g:u7-4]]?", zh: "可以坐这里吗？" },
    { speaker: "B", text: "네, [[앉으세요|g:u7-1]]. 하지만 [[사진]]을 [[찍지 마세요|g:u7-2]].", zh: "可以，请坐。但是请不要拍照。" },
    { speaker: "A", text: "[[알겠습니다]]. [[표]]를 [[사야 돼요|g:u7-3]]?", zh: "知道了。必须买票吗？" },
    { speaker: "B", text: "아니요, [[안 사도 돼요|g:u7-6]]. [[조용히]] [[하면]] [[돼요]].", zh: "不用，不买也可以。安静一点就行。" },
    { speaker: "A", text: "[[여기]]에서 [[담배]]를 [[피우면 안 돼요|g:u7-5]]?", zh: "不能在这里抽烟吗？" },
    { speaker: "B", text: "네, [[피우면 안 돼요|g:u7-5]].", zh: "是的，不能抽烟。" }
  ]);

  set("u12", [
    { speaker: "A", text: "[[같이]] [[점심]]을 [[먹을까요|g:u12-1]]?", zh: "一起吃午饭好吗？" },
    { speaker: "B", text: "좋아요. [[뭐]] [[먹을래요|g:u12-5]]?", zh: "好啊。你想吃什么？" },
    { speaker: "A", text: "[[비빔밥]]을 [[먹읍시다|g:u12-3]]. [[커피]]를 [[드시겠어요|g:u12-4]]?", zh: "吃拌饭吧。您要喝咖啡吗？" },
    { speaker: "B", text: "네, [[커피]]를 [[마실래요|g:u12-5]].", zh: "是的，我想喝咖啡。" },
    { speaker: "A", text: "[[내일]] [[비]]가 [[올까요|g:u12-2]]?", zh: "明天会下雨吗？" },
    { speaker: "B", text: "아마 [[안 올 거예요]].", zh: "大概不会下。" }
  ]);

  set("u15", [
    { speaker: "A", text: "[[왜]] [[한국]]에 [[왔어요]]?", zh: "为什么来韩国？" },
    { speaker: "B", text: "[[한국어]]를 [[배우러 왔어요|g:u15-1]]. [[내일]] [[친구]]를 [[만나려고 해요|g:u15-2]].", zh: "来学韩语。明天打算见朋友。" },
    { speaker: "A", text: "[[뭐]] [[먹으러|g:u15-1]] [[갈 거예요]]?", zh: "要去吃什么？" },
    { speaker: "B", text: "[[비빔밥]]을 [[먹으러]] [[갈 거예요]]. [[주말]]에 [[만나기로 했어요|g:u15-5]].", zh: "要去吃拌饭。决定周末见面。" },
    { speaker: "A", text: "[[내일]] [[운동하려고 해요|g:u15-3]]?", zh: "明天打算运动吗？" },
    { speaker: "B", text: "네, [[가족]]을 [[위해서|g:u15-4]] [[운동해요]].", zh: "是的，为了家人运动。" }
  ]);

  set("u18", [
    { speaker: "A", text: "[[예쁜|g:u18-1]] [[꽃]]이 [[많아요]].", zh: "有很多漂亮的花。" },
    { speaker: "B", text: "[[저]]는 [[사진]] [[찍기|g:u18-2]]를 [[좋아해요]].", zh: "我喜欢拍照。" },
    { speaker: "A", text: "[[천천히]] [[걸으면서]] [[구경해요]]. [[맛있게|g:u18-3]] [[먹고]] [[갑시다]].", zh: "慢慢走，边看边逛。好好吃一顿再走吧。" },
    { speaker: "B", text: "[[동생]]은 [[무서워해요|g:u18-4]].", zh: "弟弟害怕。" }
  ]);

  set("u19", [
    { speaker: "A", text: "[[지금]] [[뭐]] [[하고 있어요]]?", zh: "现在在做什么？" },
    { speaker: "B", text: "[[안경]]을 [[쓰고 있어요|g:u19-1]]. [[의자]]에 [[앉아 있어요|g:u19-2]].", zh: "戴着眼镜。坐在椅子上。" },
    { speaker: "A", text: "[[날씨]]가 [[따뜻해졌어요|g:u19-3]].", zh: "天气变暖和了。" },
    { speaker: "B", text: "네, [[한국어]]가 [[재미있어졌어요|g:u19-3]]. [[여기]]에서 [[일하게 되었어요|g:u19-4]].", zh: "是的，韩语变得有趣了。开始在这里工作了。" }
  ]);

  set("u23", [
    { speaker: "A", text: "[[선생님]]이 [[뭐]] [[라고 했어요|g:u23-1]]?", zh: "老师说了什么？" },
    { speaker: "B", text: "“[[공부하세요]]”[[라고 했어요|g:u23-1]].", zh: "老师说“请学习”。" },
    { speaker: "A", text: "[[비]]가 [[온대요|g:u23-3]]?", zh: "听说要下雨？" },
    { speaker: "B", text: "네, [[비]]가 [[온다고 했어요|g:u23-2]].", zh: "是的，他说要下雨。" },
    { speaker: "A", text: "[[어디에]] [[가냬요|g:u23-3]]?", zh: "他问你去哪里？" },
    { speaker: "B", text: "[[친구]]가 [[어디에]] [[가냐고 물었어요|g:u23-2]].", zh: "朋友问我去哪里。" }
  ]);

  /* A few lessons need a longer sentence for the ordering exercise. */
  var ORDER_SENTENCES = {
    "u3-10": "친구에게 편지를 썼어요.",
    "u7-1": "교실에서 책을 읽으세요.",
    "u12-3": "같이 점심을 먹읍시다.",
    "u12-5": "같이 영화 볼래요?",
    "u13-2": "제가 내일 전화할게요.",
    "u18-4": "동생은 강아지를 무서워해요.",
    "u19-3": "요즘 날씨가 따뜻해졌어요.",
    "u21-2": "이 음식은 정말 맛있네요.",
    "u22-1": "오늘 날씨가 추운가요?",
    "u22-2": "저는 지금 학생인데요.",
    "u23-3": "내일 비가 온대요.",
    "u24-1": "저는 편지를 써요.",
    "u24-2": "저는 서울에 살아요.",
    "u24-4": "저는 음악을 들어요.",
    "u24-5": "저는 그 사람을 몰라요.",
    "u24-6": "저는 한국어를 공부해요.",
    "u24-7": "우리는 집을 지어요."
  };
  (window.GRAMMAR_ITEMS || []).forEach(function (item) {
    if (ORDER_SENTENCES[item.id]) item.order = ORDER_SENTENCES[item.id];
  });

  /* Small hand-written glosses for words and inflected forms that are not in
     the 1,315-word deck.  resolveGloss() also handles regular conjugation. */
  window.GRAMMAR_GLOSSARY = {
    "어제": { r: "eoje", zh: "昨天", note: "time noun" },
    "아직": { r: "ajik", zh: "还，尚未", note: "adverb" },
    "지하철": { r: "jihacheol", zh: "地铁", note: "noun" },
    "한번": { r: "hanbeon", zh: "一次，试试", note: "adverb" },
    "누가": { r: "nuga", zh: "谁（主格）", note: "누구 + 가" },
    "사과": { r: "sagwa", zh: "苹果", note: "noun" },
    "시작하다": { r: "sijakhada", zh: "开始", note: "verb" },
    "피곤하다": { r: "pigonhada", zh: "累", note: "adjective" },
    "필요하다": { r: "piryohada", zh: "需要", note: "adjective" },
    "전화하다": { r: "jeonhwahada", zh: "打电话", note: "verb" },
    "구경하다": { r: "gugyeonghada", zh: "参观，逛", note: "verb" },
    "무슨 요일": { r: "museun yoir", zh: "星期几", note: "question word + noun" },
    "몇 시": { r: "myeot si", zh: "几点", note: "number question" },
    "세 시": { r: "se si", zh: "三点", note: "native number + 시" },
    "네 시": { r: "ne si", zh: "四点", note: "native number + 시" },
    "아홉 시": { r: "ahop si", zh: "九点", note: "native number + 시" },
    "한 시": { r: "han si", zh: "一点", note: "native number + 시" },
    "삼십 분": { r: "samsip bun", zh: "三十分", note: "Sino-Korean number + 분" },
    "3월 5일": { r: "samwol o-il", zh: "3月5日", note: "date" },
    "11월 22일": { r: "siroilwol isibil", zh: "11月22日", note: "date" },
    "일요일": { r: "iryoil", zh: "星期日", note: "day of the week" },
    "두 개": { r: "du gae", zh: "两个", note: "native number + counter" },
    "한 시간": { r: "han sigan", zh: "一个小时", note: "native number + 시간" },
    "한 명": { r: "han myeong", zh: "一个人", note: "native number + counter" },
    "일 년": { r: "il nyeon", zh: "一年", note: "Sino-Korean number + 년" },
    "이번 주말": { r: "ibeon jumal", zh: "这个周末", note: "time noun" },
    "다음 주말": { r: "daeum jumal", zh: "下个周末", note: "time noun" },
    "그 영화": { r: "geu yeonghwa", zh: "那部电影", note: "demonstrative + noun" },
    "그 사람": { r: "geu saram", zh: "那个人", note: "demonstrative + noun" },
    "몇 시쯤": { r: "myeot sijjeum", zh: "几点左右", note: "about what time" },
    "한 시간이나": { r: "han sigannina", zh: "一个多小时", note: "as long as an hour" },
    "감기가": { r: "gamgiga", zh: "感冒（主格）", note: "감기 + 가" },
    "제가": { word: "저", r: "jeo", zh: "我", note: "저 + 가 (polite)" },
    "저는": { word: "저", r: "jeo", zh: "我", note: "저 + 는 (topic)" },
    "팝콘": { r: "papkon", zh: "爆米花", note: "noun" },
    "싶어요": { word: "싶다", r: "sipda", zh: "想", note: "고 싶다: want to" },
    "마셔요": { word: "마시다", r: "masida", zh: "喝", note: "polite present" },
    "읽고": { word: "읽다", r: "ikda", zh: "读", note: "and / while reading" },
    "걸려요": { word: "걸리다", r: "geollida", zh: "花费（时间）", note: "it takes" },
    "가고": { word: "가다", r: "gada", zh: "去", note: "and / going" },
    "먹어요": { word: "먹다", r: "meokda", zh: "吃", note: "polite present" },
    "이에요": { word: "이다", r: "i-eoyo", zh: "是", note: "informal polite copula" },
    "안 올 거예요": { word: "오다", r: "an ol geoyeyo", zh: "不会来", note: "negative future" },
    "운동해요": { word: "운동하다", r: "undonghaeyo", zh: "运动", note: "polite present" },
    "있을 거예요": { word: "있다", r: "isseul geoyeyo", zh: "会在", note: "future" },
    "갑시다": { word: "가다", r: "gapsida", zh: "走吧", note: "formal suggestion" },

    "있었어요": { word: "있다", r: "itda", zh: "有；在", note: "past tense of 있다" },
    "없어서": { word: "없다", r: "eopda", zh: "没有", note: "because there is none" },
    "갔어요": { word: "가다", r: "gada", zh: "去", note: "past tense of 가다" },
    "갔었어요": { word: "가다", r: "gada", zh: "去过", note: "past perfect: went (and came back)" },
    "왔어요": { word: "오다", r: "oda", zh: "来", note: "past tense of 오다" },
    "왔으니까": { word: "오다", r: "oda", zh: "因为来了", note: "past + reason" },
    "볼 거예요": { word: "보다", r: "boda", zh: "看", note: "future: will see" },
    "갈 거예요": { word: "가다", r: "gada", zh: "去", note: "future: will go" },
    "올 거예요": { word: "오다", r: "oda", zh: "来", note: "future: will come" },
    "먹을 거예요": { word: "먹다", r: "meokda", zh: "吃", note: "future: will eat" },
    "할 거예요": { word: "하다", r: "hada", zh: "做", note: "future: will do" },
    "읽고 있어요": { word: "읽다", r: "ikda", zh: "读", note: "present progressive" },
    "하고 있어요": { word: "하다", r: "hada", zh: "做", note: "present progressive" },
    "먹었어요": { word: "먹다", r: "meokda", zh: "吃", note: "past tense of 먹다" },
    "마셨어요": { word: "마시다", r: "masida", zh: "喝", note: "past tense of 마시다" },
    "읽었어요": { word: "읽다", r: "ikda", zh: "读", note: "past tense of 읽다" },
    "했어요": { word: "하다", r: "hada", zh: "做", note: "past tense of 하다" },
    "잤어요": { word: "자다", r: "jada", zh: "睡", note: "past tense of 자다" },
    "됐어요": { word: "되다", r: "doeda", zh: "成为；可以", note: "past tense of 되다" },
    "시작해요": { word: "시작하다", r: "sijakhada", zh: "开始", note: "polite present" },
    "전화해요": { word: "전화하다", r: "jeonhwahada", zh: "打电话", note: "polite present" },
    "공부해요": { word: "공부하다", r: "gongbuhada", zh: "学习", note: "polite present" },
    "구경해요": { word: "구경하다", r: "gugyeonghada", zh: "参观，逛", note: "polite present" },
    "좋아해요": { word: "좋아하다", r: "joahada", zh: "喜欢", note: "polite present" },
    "필요해요": { word: "필요하다", r: "piryohada", zh: "需要", note: "polite present" },
    "피곤하지만": { word: "피곤하다", r: "pigonhada", zh: "累", note: "although tired" },
    "따뜻하게": { word: "따뜻하다", r: "ttatteuthada", zh: "暖和地", note: "adjective → adverb" },
    "괜찮아요": { word: "괜찮다", r: "gwaenchanta", zh: "没关系", note: "polite present" },
    "추워요": { word: "춥다", r: "chupda", zh: "冷", note: "ㅂ irregular" },
    "어두워요": { word: "어둡다", r: "eodupda", zh: "暗", note: "ㅂ irregular" },
    "무서워해요": { word: "무서워하다", r: "museowohada", zh: "害怕", note: "third-person feeling" },
    "기뻐해요": { word: "기뻐하다", r: "gippeohada", zh: "高兴", note: "third-person feeling" },
    "춥지만": { word: "춥다", r: "chupda", zh: "冷", note: "although cold" },
    "오는데": { word: "오다", r: "oda", zh: "来", note: "background: while coming" },
    "가세요": { word: "가다", r: "gada", zh: "去", note: "polite request/command" },
    "입으세요": { word: "입다", r: "ipda", zh: "穿", note: "polite request/command" },
    "가져가세요": { word: "가져가다", r: "gajyeogada", zh: "带走，带上", note: "polite request/command" },
    "마시거나": { word: "마시다", r: "masida", zh: "喝", note: "or (between verbs)" },
    "마실래요": { word: "마시다", r: "masida", zh: "喝", note: "do you want to drink?" },
    "마실게요": { word: "마시다", r: "masida", zh: "喝", note: "I will drink" },
    "먹고": { word: "먹다", r: "meokda", zh: "吃", note: "and then / and" },
    "입고": { word: "입다", r: "ipda", zh: "穿", note: "and / wearing" },
    "걸어서 갔어요": { word: "걷다", r: "geotda", zh: "走着去了", note: "걷다 + -어서 + 가다" },
    "해요": { word: "하다", r: "hada", zh: "做", note: "polite present" },
    "봐요": { word: "보다", r: "boda", zh: "看", note: "polite present" },
    "와요": { word: "오다", r: "oda", zh: "来", note: "polite present" },
    "가요": { word: "가다", r: "gada", zh: "去", note: "polite present" },
    "있어요": { word: "있다", r: "itda", zh: "有；在", note: "polite present" },
    "없어요": { word: "없다", r: "eopda", zh: "没有", note: "polite present" },
    "좋아요": { word: "좋다", r: "jota", zh: "好", note: "polite present" },
    "많아요": { word: "많다", r: "manta", zh: "多", note: "polite present" },
    "걸으면서": { word: "걷다", r: "geotda", zh: "走", note: "while walking" },
    "먹으면서": { word: "먹다", r: "meokda", zh: "吃", note: "while eating" },
    "먹으러": { word: "먹다", r: "meokda", zh: "吃", note: "in order to eat" },
    "가 보고 싶어요": { word: "가 보다", r: "ga boda", zh: "想去看看", note: "try going + want" },
    "할 수 있어요": { word: "하다", r: "hada", zh: "能做", note: "can do" },
    "알겠습니다": { word: "알다", r: "alda", zh: "知道了", note: "formal polite" },
    "하면": { word: "하다", r: "hada", zh: "做的话", note: "if you do" },
    "돼요": { word: "되다", r: "doeda", zh: "可以；成为", note: "polite present" },
    "고마워요": { word: "고맙다", r: "gomapda", zh: "谢谢", note: "polite present" },
    "나중에": { r: "najunge", zh: "以后，晚点", note: "time adverb" },
    "전화해 주세요": { word: "전화하다", r: "jeonhwahada", zh: "请打电话", note: "request" },
    "탈게요": { word: "타다", r: "tada", zh: "乘坐", note: "I will take/ride" },
    "비자": { r: "bija", zh: "签证", note: "noun" },
    "조심히": { r: "josimhi", zh: "小心地", note: "adverb" },
    "어디에": { r: "eodie", zh: "哪里", note: "where + 에" },
    "언제인지": { word: "언제이다", r: "eonjeinji", zh: "是什么时候", note: "embedded question" },
    "누구인지": { word: "누구이다", r: "nuguinji", zh: "是谁", note: "embedded question" },
    "한 시간 걸려요": { word: "걸리다", r: "geollida", zh: "要一个小时", note: "it takes an hour" },
    "읽는 데 이틀 걸렸어요": { word: "걸리다", r: "geollida", zh: "读这本书花了两天", note: "it took two days to read" },
    "좋지요": { word: "좋다", r: "jota", zh: "好吧", note: "confirming" },
    "사람이지요": { word: "사람이다", r: "saramijiyo", zh: "是人吧", note: "confirming" },
    "좋군요": { word: "좋다", r: "jota", zh: "真好啊", note: "realization" },
    "도착했군요": { word: "도착하다", r: "dochakhada", zh: "到了啊", note: "realization" },
    "맛있네요": { word: "맛있다", r: "masitda", zh: "真好吃", note: "surprise/admiration" },
    "잘하네요": { word: "잘하다", r: "jalhada", zh: "做得真好啊", note: "surprise/admiration" },
    "추운가요": { word: "춥다", r: "chupda", zh: "冷吗", note: "soft question" },
    "가나요": { word: "가다", r: "gada", zh: "去吗", note: "soft question" },
    "학생인데요": { word: "학생이다", r: "haksaengindeyo", zh: "我是学生……", note: "soft background" },
    "바쁜데요": { word: "바쁘다", r: "bappeundayo", zh: "我很忙……", note: "soft background" },
    "공부하세요": { word: "공부하다", r: "gongbuhaseyo", zh: "请学习", note: "quoted command" },
    "온대요": { word: "오다", r: "oda", zh: "听说要来", note: "contracted quotation" },
    "가냬요": { word: "가다", r: "gada", zh: "问去不去", note: "contracted quotation" },
    "가냐고 물었어요": { word: "가다", r: "gada", zh: "问我去不去", note: "indirect question" },
    "공부하라고 했어요": { word: "공부하다", r: "gongbuharago haesseoyo", zh: "让我学习", note: "indirect request" },
    "라고 했어요": { word: "라고 하다", r: "rago haesseoyo", zh: "说了……", note: "quotation" },
    "온다고 했어요": { word: "오다", r: "oda", zh: "说会来", note: "indirect statement" },
    "그렇군요": { word: "그렇다", r: "geureota", zh: "原来如此", note: "realization" },
    "왔네요": { word: "오다", r: "oda", zh: "来了啊", note: "realization" },
    "아름답네요": { word: "아름답다", r: "areumdapda", zh: "真美", note: "admiration" },
    "그래요": { word: "그렇다", r: "geuraeyo", zh: "是的；那样", note: "ㅎ irregular" },
    "빨개요": { word: "빨갛다", r: "ppalgaeyo", zh: "红", note: "ㅎ irregular" },
    "써요": { word: "쓰다", r: "sseoyo", zh: "写；用", note: "ㅡ irregular" },
    "커요": { word: "크다", r: "keoyo", zh: "大", note: "ㅡ irregular" },
    "바빠요": { word: "바쁘다", r: "bappayo", zh: "忙", note: "ㅡ irregular" },
    "살아요": { word: "살다", r: "sarayo", zh: "住", note: "ㄹ irregular" },
    "알아요": { word: "알다", r: "arayo", zh: "知道", note: "ㄹ irregular" },
    "어려워요": { word: "어렵다", r: "eoryeowoyo", zh: "难", note: "ㅂ irregular" },
    "도와요": { word: "돕다", r: "dowayo", zh: "帮助", note: "ㅂ irregular" },
    "들어요": { word: "듣다", r: "deureoyo", zh: "听", note: "ㄷ irregular" },
    "걸어요": { word: "걷다", r: "georeoyo", zh: "走", note: "ㄷ irregular" },
    "몰라요": { word: "모르다", r: "mollayo", zh: "不知道", note: "르 irregular" },
    "빨라요": { word: "빠르다", r: "ppallayo", zh: "快", note: "르 irregular" },
    "지어요": { word: "짓다", r: "jieoyo", zh: "盖（房子）", note: "ㅅ irregular" },
    "나아요": { word: "낫다", r: "naayo", zh: "好转", note: "ㅅ irregular" }
  };
})();
