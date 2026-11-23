/* Grammar data: Getting Ready + Units 1–2 */
window.GRAMMAR_ITEMS.push(
  {
    id: "u0-1", unit: "u0", num: 1, title: "이다 (to be)", pattern: "N + 이다 / 입니다",
    summary: "Say that something is a noun: “X is Y.”",
    formation: ["받침 O: 학생 + 입니다 → 학생입니다", "받침 X: 의사 + 입니다 → 의사입니다", "Informal polite: 학생이에요 / 의사예요"],
    examples: [["저는 학생입니다.", "我是学生。"], ["저는 중국 사람이에요.", "我是中国人。"]],
    blank: "학생입니다", blank2: "중국 사람이에요", distractors: ["학생이 아니에요", "학생이 없어요"],
    forms: ["학생입니다", "중국 사람이에요"], tip: "입니다 is formal polite; 이에요/예요 is informal polite. Attach 이다 only to nouns, not adjectives."
  },
  {
    id: "u0-2", unit: "u0", num: 2, title: "있다 (to exist / to have)", pattern: "N에 N이/가 있다",
    summary: "Express existence (“there is”) or possession (“have”).",
    formation: ["위치: N에 N이/가 있어요", "소유: N이/가 있어요", "부정: N이/가 없어요"],
    examples: [["책상 위에 책이 있어요.", "桌子上有书。"], ["저는 형이 있어요.", "我有一个哥哥。"]],
    blank: "책이 있어요", blank2: "형이 있어요", distractors: ["책이 없어요", "책이 아니에요"],
    forms: ["있어요", "있습니다", "없어요"], tip: "있다 and 없다 are adjectives; the thing that exists takes 이/가, not 을/를."
  },
  {
    id: "u0-3", unit: "u0", num: 3, title: "Numbers", pattern: "Sino-Korean / native numbers",
    summary: "Use two number systems for different situations.",
    formation: ["Sino-Korean: 일, 이, 삼, 사, 오 …", "Native: 하나, 둘, 셋, 넷, 다섯 …", "Before counters: 한, 두, 세, 네, 스무"],
    examples: [["사과 두 개 주세요.", "请给我两个苹果。"], ["오늘은 3월 5일이에요.", "今天是3月5日。"]],
    blank: "두 개", blank2: "3월 5일", distractors: ["둘 개", "이 개"],
    forms: ["두 개", "3월 5일"], tip: "Sino-Korean numbers are used for dates, money, phone numbers and minutes; native numbers for counting things and hours."
  },
  {
    id: "u0-4", unit: "u0", num: 4, title: "Dates and Days of the Week", pattern: "N월 N일 / N요일",
    summary: "Read dates with Sino-Korean numbers and days with 요일.",
    formation: ["월: 1월, 2월, 3월 …", "일: 1일, 2일, 3일 …", "요일: 월요일, 화요일, 수요일 …"],
    examples: [["오늘은 11월 22일 일요일이에요.", "今天是11月22日星期日。"], ["생일이 5월 3일이에요.", "生日是5月3日。"]],
    blank: "11월 22일 일요일", blank2: "5월 3일", distractors: ["11월 22일 월요일", "11월 22일 토요일"],
    forms: ["11월 22일", "일요일", "5월 3일"], tip: "Ask 무슨 요일이에요? for the day and 며칠이에요? for the date."
  },
  {
    id: "u0-5", unit: "u0", num: 5, title: "Time", pattern: "N시 N분",
    summary: "Tell time with native numbers for hours and Sino-Korean for minutes.",
    formation: ["시: 한 시, 두 시, 세 시 …", "분: 10분, 30분, 45분 …", "오전 / 오후"],
    examples: [["지금 오후 세 시 삼십 분이에요.", "现在是下午3点30分。"], ["저는 아침 일곱 시에 일어나요.", "我早上七点起床。"]],
    blank: "세 시 삼십 분", blank2: "일곱 시", distractors: ["삼 시 삼십 분", "세 시 사십 분"],
    forms: ["세 시", "삼십 분", "일곱 시"], tip: "Hours use native numbers (한 시, 두 시); minutes use Sino-Korean (십 분, 삼십 분)."
  },

  {
    id: "u1-1", unit: "u1", num: 1, title: "Present Tense A/V-(스)ㅂ니다", pattern: "A/V-(스)ㅂ니다",
    summary: "Formal polite present tense for statements and presentations.",
    formation: ["받침 X + ㅂ니다: 가다 → 갑니다", "받침 O + 습니다: 먹다 → 먹습니다", "Noun + 이다: 학생 → 학생입니다"],
    examples: [["저는 매일 학교에 갑니다.", "我每天去学校。"], ["오늘 날씨가 좋습니다.", "今天天气很好。"]],
    blank: "갑니다", blank2: "좋습니다", distractors: ["갔습니다", "갈 겁니다"],
    forms: ["갑니다", "좋습니다", "먹습니다"], tip: "Use this in formal situations such as news, presentations, customer service and the army."
  },
  {
    id: "u1-2", unit: "u1", num: 2, title: "Present Tense A/V-아/어요", pattern: "A/V-아/어요",
    summary: "Informal polite present tense for everyday conversation.",
    formation: ["ㅏ/ㅗ + 아요: 가다 → 가요", "Other vowels + 어요: 먹다 → 먹어요", "하다 → 해요"],
    examples: [["저는 학교에 가요.", "我去学校。"], ["오늘 날씨가 좋아요.", "今天天气很好。"]],
    blank: "가요", blank2: "좋아요", distractors: ["갔어요", "갈 거예요"],
    forms: ["가요", "좋아요", "먹어요"], tip: "This is the most common polite ending in daily conversation. It is less formal than -습니다."
  },
  {
    id: "u1-3", unit: "u1", num: 3, title: "Past Tense A/V-았/었어요", pattern: "A/V-았/었어요",
    summary: "Talk about completed actions or past states.",
    formation: ["ㅏ/ㅗ + 았어요: 가다 → 갔어요", "Other vowels + 었어요: 먹다 → 먹었어요", "하다 → 했어요"],
    examples: [["어제 학교에 갔어요.", "昨天去了学校。"], ["점심을 먹었어요.", "吃了午饭。"]],
    blank: "갔어요", blank2: "먹었어요", distractors: ["가요", "먹어요"],
    forms: ["갔어요", "먹었어요", "했어요"], tip: "The past tense is not used for a state that still continues; use the present tense for that."
  },
  {
    id: "u1-4", unit: "u1", num: 4, title: "Future Tense V-(으)ㄹ 거예요 ①", pattern: "V-(으)ㄹ 거예요",
    summary: "Express a future plan or intention.",
    formation: ["받침 X + ㄹ 거예요: 가다 → 갈 거예요", "받침 O + 을 거예요: 먹다 → 먹을 거예요", "ㄹ-final stems take 거예요 directly: 살다 → 살 거예요"],
    examples: [["내일 학교에 갈 거예요.", "明天要去学校。"], ["저녁을 먹을 거예요.", "要吃晚饭。"]],
    blank: "갈 거예요", blank2: "먹을 거예요", distractors: ["갔어요", "먹었어요"],
    forms: ["갈 거예요", "먹을 거예요", "할 거예요"], tip: "This form can also express a guess; the meaning depends on context."
  },
  {
    id: "u1-5", unit: "u1", num: 5, title: "Progressive Tense V-고 있다 ①", pattern: "V-고 있다",
    summary: "Describe an action happening right now.",
    formation: ["V-고 있어요", "V-고 있습니다 (formal)", "Negation: V-고 있지 않아요"],
    examples: [["지금 책을 읽고 있어요.", "现在正在读书。"], ["친구를 기다리고 있어요.", "正在等朋友。"]],
    blank: "읽고 있어요", blank2: "기다리고 있어요", distractors: ["읽었어요", "기다렸어요"],
    forms: ["읽고 있어요", "기다리고 있어요"], tip: "The progressive often appears with 지금, 아직 and the -고 있다 pattern."
  },
  {
    id: "u1-6", unit: "u1", num: 6, title: "Past Perfect Tense A/V-았/었었어요", pattern: "A/V-았/었었어요",
    summary: "Talk about a past state or experience that is no longer true.",
    formation: ["V-았/었었어요", "Adjective-았/었었어요", "Often contrasts with the present: 지금은 …"],
    examples: [["작년에 한국에 갔었어요.", "去年去过韩国。"], ["그 영화를 봤었어요.", "看过那部电影。"]],
    blank: "갔었어요", blank2: "봤었어요", distractors: ["갔어요", "봤어요"],
    forms: ["갔었어요", "봤었어요"], tip: "Use it when the past situation is finished or no longer true, not for a simple past event."
  },

  {
    id: "u2-1", unit: "u2", num: 1, title: "Word Negation", pattern: "아니다 / 없다 / 모르다",
    summary: "Some negatives are separate words rather than 안 or 못.",
    formation: ["이다 → 아니다", "있다 → 없다", "알다 → 모르다"],
    examples: [["저는 학생이 아니에요.", "我不是学生。"], ["시간이 없어요.", "没有时间。"]],
    blank: "학생이 아니에요", blank2: "없어요", distractors: ["학생이에요", "있어요"],
    forms: ["아니에요", "없어요", "몰라요"], tip: "These are lexical negatives; do not add 안 to them."
  },
  {
    id: "u2-2", unit: "u2", num: 2, title: "안 A/V-아/어요 (A/V-지 않아요)", pattern: "안 + A/V",
    summary: "Negate a verb or adjective with 안 or -지 않다.",
    formation: ["안 + V/A: 안 가요, 안 먹어요", "Long form: 가지 않아요, 먹지 않아요", "Adverb + 하다: 안 공부해요 / 공부하지 않아요"],
    examples: [["저는 오늘 안 가요.", "我今天不去。"], ["고기를 안 먹어요.", "不吃肉。"]],
    blank: "안 가요", blank2: "안 먹어요", distractors: ["못 가요", "못 먹어요"],
    forms: ["안 가요", "안 먹어요", "가지 않아요"], tip: "안 negates the action itself; it is not the same as 못 (cannot)."
  },
  {
    id: "u2-3", unit: "u2", num: 3, title: "못 V-아/어요 (V-지 못해요)", pattern: "못 + V",
    summary: "Say that you cannot do something because of ability or circumstances.",
    formation: ["못 + V: 못 가요, 못 먹어요", "Long form: 가지 못해요, 먹지 못해요", "Noun + 못하다: 수영을 못해요"],
    examples: [["저는 오늘 못 가요.", "我今天不能去。"], ["매운 음식을 못 먹어요.", "不能吃辣的食物。"]],
    blank: "못 가요", blank2: "못 먹어요", distractors: ["안 가요", "안 먹어요"],
    forms: ["못 가요", "못 먹어요", "가지 못해요"], tip: "못 = unable; 안 = simply not doing. In a past inability, use 못했어요."
  }
);

window.GRAMMAR_UNITS.push(
  {
    id: "u0", num: 0, title: "Getting Ready", subtitle: "The building blocks: nouns, existence, numbers and time.",
    context: [
      { speaker: "A", text: "안녕하세요. 저는 [[학생]]입니다.", zh: "你好。我是学生。" },
      { speaker: "B", text: "반가워요. 저는 [[의사]]예요.", zh: "很高兴见到你。我是医生。" },
      { speaker: "A", text: "[[지금]] [[몇 시]]예요?", zh: "现在几点？" },
      { speaker: "B", text: "[[세 시]] [[삼십 분]]이에요. [[수업]]은 [[3월 5일]]에 [[시작해요]].", zh: "三点三十分。课程在3月5日开始。" }
    ]
  },
  {
    id: "u1", num: 1, title: "Tenses", subtitle: "Speak about now, the past, the future and actions in progress.",
    context: [
      { speaker: "A", text: "[[어제]] [[학교]]에 [[갔어요]]?", zh: "昨天去学校了吗？" },
      { speaker: "B", text: "아니요, [[집]]에 [[있었어요]]. 오늘은 [[친구]]를 [[만나고]] [[영화]]를 [[볼 거예요]].", zh: "没有，我在家了。今天要见朋友，然后看电影。" },
      { speaker: "A", text: "[[지금]] [[뭐]] [[하고 있어요]]?", zh: "现在在做什么？" },
      { speaker: "B", text: "[[책]]을 [[읽고 있어요]]. [[내일]]은 [[도서관]]에 [[갈 거예요]].", zh: "正在读书。明天要去图书馆。" }
    ]
  },
  {
    id: "u2", num: 2, title: "Negative Expressions", subtitle: "Say no, cannot, and not have.",
    context: [
      { speaker: "A", text: "[[오늘]] [[학교]]에 [[안 갔어요]]?", zh: "今天没去学校吗？" },
      { speaker: "B", text: "네, [[몸]]이 [[안 좋아서]] [[못 갔어요]].", zh: "是的，身体不舒服，所以没能去。" },
      { speaker: "A", text: "[[약]]을 [[먹었어요]]?", zh: "吃药了吗？" },
      { speaker: "B", text: "아니요, [[시간]]이 [[없어서]] [[아직]] [[못 먹었어요]].", zh: "没有，因为没时间，还没吃。" }
    ]
  }
);
