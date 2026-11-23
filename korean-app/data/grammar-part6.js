/* Grammar data: Units 20–24 */
window.GRAMMAR_ITEMS.push(
  {
    id: "u20-1", unit: "u20", num: 1, title: "A/V-(으)ㄴ/는지", pattern: "A/V-(으)ㄴ/는지",
    summary: "Embed a question: “whether / who / when / what.”",
    formation: ["A-은지/ㄴ지: 예쁜지", "V-는지: 가는지", "N-인지: 학생인지"],
    examples: [["그 사람이 누구인지 몰라요.", "不知道那个人是谁。"], ["시험이 언제인지 알아요?", "你知道考试什么时候吗？"]],
    blank: "누구인지", blank2: "언제인지", distractors: ["누구예요", "언제예요"],
    forms: ["누구인지", "언제인지"], tip: "The embedded question takes a normal sentence order and is followed by 알다/모르다/궁금하다."
  },
  {
    id: "u20-2", unit: "u20", num: 2, title: "V-는 데 걸리다/들다", pattern: "V-는 데 걸리다/들다",
    summary: "Say how long something takes or how much it costs.",
    formation: ["V-는 데 걸리다: 한 시간 걸려요", "V-는 데 들다: 이틀 들었어요", "N-이/가 들다: 돈이 들어요"],
    examples: [["집에서 회사까지 한 시간 걸려요.", "从家到公司要一个小时。"], ["이 책을 읽는 데 이틀 걸렸어요.", "读这本书花了两天。"]],
    blank: "한 시간 걸려요", blank2: "읽는 데 이틀 걸렸어요", distractors: ["한 시간 들어요", "읽는 데 이틀 들었어요"],
    forms: ["한 시간 걸려요", "읽는 데 이틀 걸렸어요"], tip: "걸리다 is for time; 들다 is for money, effort or cost."
  },
  {
    id: "u20-3", unit: "u20", num: 3, title: "A/V-지요?", pattern: "A/V-지요?",
    summary: "Ask for confirmation: “right? / isn’t it?”",
    formation: ["A/V-지요?: 좋지요?, 가지요?", "Informal: -지?", "Answer with -지요/네"],
    examples: [["오늘 날씨가 좋지요?", "今天天气很好吧？"], ["한국 사람이지요?", "是韩国人吧？"]],
    blank: "좋지요", blank2: "사람이지요", distractors: ["좋아요", "사람이에요"],
    forms: ["좋지요", "사람이지요"], tip: "The speaker expects agreement; it is softer than a direct question."
  },

  {
    id: "u21-1", unit: "u21", num: 1, title: "A/V-군요/는군요", pattern: "A/V-군요 / -는군요",
    summary: "React with mild surprise or a new realization.",
    formation: ["A-군요: 좋군요", "V-는군요: 가는군요", "Past V-았/었군요: 왔군요"],
    examples: [["여기 경치가 좋군요!", "这里的风景真好啊！"], ["벌써 도착했군요!", "已经到了啊！"]],
    blank: "좋군요", blank2: "도착했군요", distractors: ["좋았군요", "도착했네요"],
    forms: ["좋군요", "도착했군요"], tip: "군요 reacts to information just learned; it is not used for simple facts you already knew."
  },
  {
    id: "u21-2", unit: "u21", num: 2, title: "A/V-네요", pattern: "A/V-네요",
    summary: "React with surprise, admiration or a soft realization.",
    formation: ["A/V-네요: 맛있네요, 잘하네요", "Past: 갔네요", "Can be a gentle exclamation"],
    examples: [["정말 맛있네요!", "真的很好吃！"], ["한국어를 잘하네요!", "韩语说得真好啊！"]],
    blank: "맛있네요", blank2: "잘하네요", distractors: ["맛없네요", "잘하군요"],
    forms: ["맛있네요", "잘하네요"], tip: "네요 is often softer and more personal than 군요."
  },

  {
    id: "u22-1", unit: "u22", num: 1, title: "A-(으)ㄴ가요?, V-나요?", pattern: "A-(으)ㄴ가요? / V-나요?",
    summary: "Ask a polite, slightly softer question.",
    formation: ["A-은가요/ㄴ가요: 추운가요?", "V-나요?: 가나요?", "N-인가요?: 학생인가요?"],
    examples: [["날씨가 추운가요?", "天气冷吗？"], ["지금 가나요?", "现在走吗？"]],
    blank: "추운가요", blank2: "가나요", distractors: ["추웠어요", "가요"],
    forms: ["추운가요", "가나요"], tip: "These endings soften the question and are common in polite conversation."
  },
  {
    id: "u22-2", unit: "u22", num: 2, title: "A/V-(으)ㄴ/는데요", pattern: "A/V-(으)ㄴ/는데요",
    summary: "Soften a statement or leave something implied.",
    formation: ["A-은데요/ㄴ데요: 바쁜데요", "V-는데요: 오는데요", "N-인데요: 학생인데요"],
    examples: [["저는 학생인데요.", "我是学生……"], ["지금 바쁜데요.", "我现在很忙……"]],
    blank: "학생인데요", blank2: "바쁜데요", distractors: ["학생이에요", "바빠요"],
    forms: ["학생인데요", "바쁜데요"], tip: "The trailing -데요 often invites a response or softens a disagreement."
  },

  {
    id: "u23-1", unit: "u23", num: 1, title: "Direct Quotations", pattern: "“…”라고 하다",
    summary: "Quote someone’s exact words.",
    formation: ["“…”라고 했어요", "“…”라고 해요", "For nouns: “…”이라고"],
    examples: [["선생님이 “공부하세요”라고 했어요.", "老师说“请学习”。"], ["친구가 “같이 가자”라고 했어요.", "朋友说“一起去吧”。"]],
    blank: "라고 했어요", blank2: "같이 가자", distractors: ["같이 가요", "같이 갑시다"],
    forms: ["라고 했어요", "라고 해요"], tip: "Use quotation marks or a clear pause before 라고."
  },
  {
    id: "u23-2", unit: "u23", num: 2, title: "Indirect Quotations", pattern: "-다고/-냐고/-자고/-라고 하다",
    summary: "Report what someone said without quoting exact words.",
    formation: ["Statement -다고 하다", "Question -냐고 하다", "Suggestion -자고 하다", "Request -라고 하다"],
    examples: [["비가 온다고 했어요.", "他说会下雨。"], ["어디에 가냐고 물었어요.", "他问我去哪里。"]],
    blank: "온다고 했어요", blank2: "가냐고 물었어요", distractors: ["왔다고 했어요", "가다고 물었어요"],
    forms: ["온다고 했어요", "가냐고 물었어요"], tip: "Choose the quotation form by sentence type: statement, question, suggestion or request."
  },
  {
    id: "u23-3", unit: "u23", num: 3, title: "Indirect Quotation Contracted Forms", pattern: "-대요 / -냬요 / -재요 / -래요",
    summary: "Use the shortened quotation forms common in speech.",
    formation: ["-다고 해요 → -대요", "-냐고 해요 → -냬요", "-자고 해요 → -재요", "-라고 해요 → -래요"],
    examples: [["비가 온대요.", "他说要下雨。"], ["어디에 가냬요?", "他问你去哪里？"]],
    blank: "온대요", blank2: "가냬요", distractors: ["왔대요", "가냬요"],
    forms: ["온대요", "가냬요"], tip: "The contracted forms are extremely common in everyday conversation."
  },

  {
    id: "u24-1", unit: "u24", num: 1, title: "ㅡ Irregular Conjugation", pattern: "ㅡ → ㅏ/ㅓ",
    summary: "ㅡ drops before vowel endings and the preceding vowel decides ㅓ/ㅏ.",
    formation: ["쓰다 → 써요", "크다 → 커요", "바쁘다 → 바빠요"],
    examples: [["편지를 써요.", "写信。"], ["나무가 커요.", "树很大。"]],
    blank: "써요", blank2: "커요", distractors: ["쓰어요", "크어요"],
    forms: ["써요", "커요"], tip: "The vowel before ㅡ decides the result: 쓰다 → 써요, 바쁘다 → 바빠요."
  },
  {
    id: "u24-2", unit: "u24", num: 2, title: "ㄹ Irregular Conjugation", pattern: "ㄹ drops before ㄴ/ㅂ/ㅅ",
    summary: "ㄹ is stable before vowels but drops before some endings.",
    formation: ["살다 → 살아요", "알다 → 알아요", "살 + ㅂ니다 → 삽니다"],
    examples: [["서울에 살아요.", "住在首尔。"], ["한국어를 알아요.", "懂韩语。"]],
    blank: "살아요", blank2: "알아요", distractors: ["살어요", "알어요"],
    forms: ["살아요", "알아요"], tip: "Before -아/어요, ㄹ stays; before -ㅂ니다, ㄴ, ㅅ it drops."
  },
  {
    id: "u24-3", unit: "u24", num: 3, title: "ㅂ Irregular Conjugation", pattern: "ㅂ → 우/오",
    summary: "ㅂ changes to 우 (or 오) before vowel endings.",
    formation: ["춥다 → 추워요", "어렵다 → 어려워요", "돕다 → 도와요"],
    examples: [["오늘은 추워요.", "今天很冷。"], ["한국어가 어려워요.", "韩语很难。"]],
    blank: "추워요", blank2: "어려워요", distractors: ["추버요", "어렵어요"],
    forms: ["추워요", "어려워요"], tip: "돕다 and similar verbs use 오: 도와요."
  },
  {
    id: "u24-4", unit: "u24", num: 4, title: "ㄷ Irregular Conjugation", pattern: "ㄷ → ㄹ",
    summary: "ㄷ changes to ㄹ before vowel endings.",
    formation: ["듣다 → 들어요", "걷다 → 걸어요", "받다 → 받아요 (regular)"],
    examples: [["음악을 들어요.", "听音乐。"], ["학교까지 걸어요.", "走到学校。"]],
    blank: "들어요", blank2: "걸어요", distractors: ["듣어요", "걷어요"],
    forms: ["들어요", "걸어요"], tip: "받다 is regular (받아요), so memorize the common irregular verbs."
  },
  {
    id: "u24-5", unit: "u24", num: 5, title: "르 Irregular Conjugation", pattern: "르 → ㄹㄹ",
    summary: "르 becomes ㄹㄹ before vowel endings.",
    formation: ["모르다 → 몰라요", "빠르다 → 빨라요", "부르다 → 불러요"],
    examples: [["저는 몰라요.", "我不知道。"], ["기차가 빨라요.", "火车很快。"]],
    blank: "몰라요", blank2: "빨라요", distractors: ["모르어요", "빠르어요"],
    forms: ["몰라요", "빨라요"], tip: "The ㄹ is doubled: 모르 + 아요 → 몰라요."
  },
  {
    id: "u24-6", unit: "u24", num: 6, title: "ㅎ Irregular Conjugation", pattern: "ㅎ weakens → ㅐ",
    summary: "ㅎ weakens or disappears in many adjective endings.",
    formation: ["하다 → 해요", "그렇다 → 그래요", "빨갛다 → 빨개요"],
    examples: [["공부해요.", "学习。"], ["그래요.", "是的。"], ["사과가 빨개요.", "苹果很红。"]],
    blank: "공부해요", blank2: "그래요", distractors: ["공부하어요", "그렇어요"],
    forms: ["공부해요", "그래요", "빨개요"], tip: "하다 verbs are the most common ㅎ irregular pattern."
  },
  {
    id: "u24-7", unit: "u24", num: 7, title: "ㅅ Irregular Conjugation", pattern: "ㅅ drops before vowels",
    summary: "ㅅ disappears before vowel endings in some verbs.",
    formation: ["짓다 → 지어요", "낫다 → 나아요", "붓다 → 부어요"],
    examples: [["집을 지어요.", "盖房子。"], ["감기가 나아요.", "感冒好转了。"]],
    blank: "지어요", blank2: "나아요", distractors: ["짓어요", "낫어요"],
    forms: ["지어요", "나아요"], tip: "The ㅅ is dropped, and the vowels contract: 지 + 어요 → 지어요."
  }
);

window.GRAMMAR_UNITS.push(
  {
    id: "u20", num: 20, title: "Confirming Information", subtitle: "Embed questions, talk about time taken and confirm.",
    context: [
      { speaker: "A", text: "[[그 사람]]이 [[누구인지|g:u20-1]] [[알아요]]?", zh: "你知道那个人是谁吗？" },
      { speaker: "B", text: "[[몰라요]]. [[집]]에서 [[회사]]까지 [[한 시간]] [[걸려요|g:u20-2]].", zh: "不知道。从家到公司要一个小时。" },
      { speaker: "A", text: "[[오늘]] [[날씨]]가 [[좋지요|g:u20-3]]?", zh: "今天天气很好吧？" },
      { speaker: "B", text: "네, [[좋아요]]. [[시험]]이 [[언제인지|g:u20-1]] [[알아요]]?", zh: "是的，很好。你知道考试是什么时候吗？" }
    ]
  },
  {
    id: "u21", num: 21, title: "Discovery and Surprise", subtitle: "React to what you just learned.",
    context: [
      { speaker: "A", text: "[[여기]] [[경치]]가 [[좋군요|g:u21-1]]!", zh: "这里的风景真好啊！" },
      { speaker: "B", text: "네, [[정말]] [[아름답네요|g:u21-2]].", zh: "是的，真美。" },
      { speaker: "A", text: "[[벌써]] [[도착했군요|g:u21-1]]!", zh: "已经到了啊！" },
      { speaker: "B", text: "네, [[빨리]] [[왔네요|g:u21-2]].", zh: "是的，来得真快。" }
    ]
  },
  {
    id: "u22", num: 22, title: "Additional Endings", subtitle: "Soften questions and statements.",
    context: [
      { speaker: "A", text: "[[날씨]]가 [[추운가요|g:u22-1]]?", zh: "天气冷吗？" },
      { speaker: "B", text: "네, [[조금]] [[추워요]]. [[지금]] [[가나요|g:u22-1]]?", zh: "是的，有点冷。现在走吗？" },
      { speaker: "A", text: "네, [[저]]는 [[학생인데요|g:u22-2]].", zh: "是的，我是学生……" },
      { speaker: "B", text: "아, [[그렇군요]]. [[조심히]] [[가세요]].", zh: "啊，原来如此。路上小心。" }
    ]
  },
  {
    id: "u23", num: 23, title: "Quotations", subtitle: "Quote and report what people say.",
    context: [
      { speaker: "A", text: "[[선생님]]이 [[뭐]] [[라고 했어요|g:u23-1]]?", zh: "老师说了什么？" },
      { speaker: "B", text: "[[공부하라고 했어요|g:u23-1]]. [[비]]가 [[온대요|g:u23-3]]?", zh: "老师说“请学习”。听说要下雨？" },
      { speaker: "A", text: "네, [[비]]가 [[온다고 했어요|g:u23-2]]. [[어디에]] [[가냬요|g:u23-3]]?", zh: "是的，他说要下雨。他问你去哪里？" }
    ]
  },
  {
    id: "u24", num: 24, title: "Irregular Conjugations", subtitle: "The seven irregular patterns that explain common surprises.",
    context: [
      { speaker: "A", text: "[[오늘]] [[날씨]]가 [[추워요|g:u24-3]]. [[편지]]를 [[써요|g:u24-1]]?", zh: "今天很冷。你在写信吗？" },
      { speaker: "B", text: "아니요, [[음악]]을 [[들어요|g:u24-4]]. [[기차]]가 [[빨라요|g:u24-5]].", zh: "不，我在听音乐。火车很快。" },
      { speaker: "A", text: "[[서울]]에 [[살아요|g:u24-2]]? [[집]]을 [[지어요|g:u24-7]]?", zh: "住在首尔吗？在盖房子吗？" },
      { speaker: "B", text: "네, [[공부해요|g:u24-6]]. [[감기가]] [[나아요|g:u24-7]].", zh: "是的，学习。感冒好转了。" }
    ]
  }
);
