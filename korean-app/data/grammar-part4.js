/* Grammar data: Units 9–14 */
window.GRAMMAR_ITEMS.push(
  {
    id: "u9-1", unit: "u9", num: 1, title: "A/V-아/어서 ②", pattern: "A/V-아/어서 (reason)",
    summary: "Give a reason or cause in a natural, connected sentence.",
    formation: ["ㅏ/ㅗ + 아서: 가서, 아파서", "Other + 어서: 먹어서, 늦어서", "하다 → 해서"],
    examples: [["비가 와서 집에 있었어요.", "因为下雨，待在家里了。"], ["배가 아파서 약을 먹었어요.", "因为肚子疼，吃了药。"]],
    blank: "와서", blank2: "아파서", distractors: ["오지만", "아프니까"],
    forms: ["와서", "아파서"], tip: "Do not use -아/어서 with a following command or suggestion: 오세요/갑시다."
  },
  {
    id: "u9-2", unit: "u9", num: 2, title: "A/V-(으)니까 ①", pattern: "A/V-(으)니까 (reason)",
    summary: "Give a reason, especially before a request, command or suggestion.",
    formation: ["받침 X + 니까: 오니까", "받침 O + 으니까: 먹으니까", "Past: 왔으니까"],
    examples: [["비가 오니까 우산을 가져가세요.", "因为下雨，请带伞。"], ["추우니까 창문을 닫으세요.", "因为冷，请关窗。"]],
    blank: "오니까", blank2: "추우니까", distractors: ["와서", "추워서"],
    forms: ["오니까", "추우니까"], tip: "Unlike -아/어서, -(으)니까 can be followed by a command or suggestion."
  },
  {
    id: "u9-3", unit: "u9", num: 3, title: "N 때문에, A/V-기 때문에", pattern: "N 때문에 / A/V-기 때문에",
    summary: "Say “because of” a noun or “because” a clause.",
    formation: ["N 때문에: 비 때문에", "V-기 때문에: 늦기 때문에", "A-기 때문에: 바쁘기 때문에"],
    examples: [["비 때문에 길이 막혔어요.", "因为下雨，路堵了。"], ["시험이 있기 때문에 공부해요.", "因为有考试，所以学习。"]],
    blank: "비 때문에", blank2: "있기 때문에", distractors: ["비가 오지만", "있어서"],
    forms: ["비 때문에", "있기 때문에"], tip: "때문에 is stronger and more formal than -아/어서; it can be followed by commands."
  },

  {
    id: "u10-1", unit: "u10", num: 1, title: "V-아/어 주세요, V-아/어 주시겠어요?", pattern: "V-아/어 주세요",
    summary: "Ask someone to do something for you, politely.",
    formation: ["ㅏ/ㅗ + 아 주세요: 도와주세요", "Other + 어 주세요: 열어 주세요", "More polite: 열어 주시겠어요?"],
    examples: [["문을 열어 주세요.", "请开门。"], ["도와주시겠어요?", "能帮我一下吗？"]],
    blank: "열어 주세요", blank2: "도와주시겠어요", distractors: ["열으세요", "도와주세요"],
    forms: ["열어 주세요", "도와주시겠어요"], tip: "주시겠어요? is more polite and tentative than 주세요."
  },
  {
    id: "u10-2", unit: "u10", num: 2, title: "V-아/어 줄게요, V-아/어 줄까요?", pattern: "V-아/어 줄게요 / 줄까요?",
    summary: "Offer to do something for someone, or ask if you should.",
    formation: ["V-아/어 줄게요: 도와줄게요", "V-아/어 줄까요?: 열어 줄까요?", "Subject is usually 저/제가"],
    examples: [["제가 도와줄게요.", "我来帮你。"], ["창문을 열어 줄까요?", "要我开窗吗？"]],
    blank: "도와줄게요", blank2: "열어 줄까요", distractors: ["도와주세요", "열어 주세요"],
    forms: ["도와줄게요", "열어 줄까요"], tip: "줄게요 is a promise to help; 줄까요? asks whether the listener wants help."
  },

  {
    id: "u11-1", unit: "u11", num: 1, title: "V-아/어보다", pattern: "V-아/어보다",
    summary: "Say “try doing” something.",
    formation: ["V-아/어 보세요: 가 보세요", "V-아/어 봤어요: 먹어 봤어요", "Often with 한번"],
    examples: [["김치를 먹어 봤어요.", "尝过泡菜。"], ["한번 가 보세요.", "去一次试试吧。"]],
    blank: "먹어 봤어요", blank2: "가 보세요", distractors: ["먹었어요", "가세요"],
    forms: ["먹어 봤어요", "가 보세요"], tip: "The past form -아/어 봤어요 often means “have tried.”"
  },
  {
    id: "u11-2", unit: "u11", num: 2, title: "V-(으)ㄴ 적이 있다/없다", pattern: "V-(으)ㄴ 적이 있다/없다",
    summary: "Talk about whether you have ever done something.",
    formation: ["V-은/ㄴ 적이 있어요", "V-은/ㄴ 적이 없어요", "Past experience, not a specific time"],
    examples: [["한국에 간 적이 있어요.", "去过韩国。"], ["그 영화를 본 적이 없어요.", "没看过那部电影。"]],
    blank: "간 적이 있어요", blank2: "본 적이 없어요", distractors: ["가요", "봐요"],
    forms: ["간 적이 있어요", "본 적이 없어요"], tip: "Use it for life experience; for a specific past time, use the simple past instead."
  },

  {
    id: "u12-1", unit: "u12", num: 1, title: "V-(으)ㄹ까요? ①", pattern: "V-(으)ㄹ까요?",
    summary: "Suggest doing something together: “Shall we …?”",
    formation: ["받침 X + ㄹ까요?: 갈까요?", "받침 O + 을까요?: 먹을까요?", "Answer: 네, 갑시다 / 좋아요"],
    examples: [["같이 갈까요?", "一起去吗？"], ["뭐 먹을까요?", "吃什么呢？"]],
    blank: "갈까요", blank2: "먹을까요", distractors: ["갔어요", "먹을래요"],
    forms: ["갈까요", "먹을까요"], tip: "This form can suggest or ask for the listener’s opinion; context decides."
  },
  {
    id: "u12-2", unit: "u12", num: 2, title: "V-(으)ㄹ까요? ②", pattern: "V-(으)ㄹ까요?",
    summary: "Wonder about something: “I wonder if ….”",
    formation: ["V-을/ㄹ까요?", "Often with 혹시, 아마", "Can be a self-directed question"],
    examples: [["내일 비가 올까요?", "明天会下雨吗？"], ["그 사람이 누구일까요?", "那个人是谁呢？"]],
    blank: "올까요", blank2: "누구일까요", distractors: ["와요", "누구예요"],
    forms: ["올까요", "누구일까요"], tip: "The same -(으)ㄹ까요? form can suggest or wonder; tone and context make the difference."
  },
  {
    id: "u12-3", unit: "u12", num: 3, title: "V-(으)ㅂ시다", pattern: "V-(으)ㅂ시다",
    summary: "Make a formal suggestion: “Let’s ….”",
    formation: ["받침 X + ㅂ시다: 갑시다", "받침 O + 읍시다: 먹읍시다", "Negative: 하지 맙시다"],
    examples: [["같이 점심을 먹읍시다.", "一起吃午饭吧。"], ["여기에서 기다립시다.", "在这里等吧。"]],
    blank: "먹읍시다", blank2: "기다립시다", distractors: ["먹을까요", "기다릴까요"],
    forms: ["먹읍시다", "기다립시다"], tip: "This is formal; in casual speech use -(으)ㄹ래요? or 같이 가요."
  },
  {
    id: "u12-4", unit: "u12", num: 4, title: "V-(으)시겠어요?", pattern: "V-(으)시겠어요?",
    summary: "Politely ask what someone would like to do.",
    formation: ["V-으시겠어요?: 드시겠어요?", "V-시겠어요?: 가시겠어요?", "Very polite, often in service situations"],
    examples: [["커피를 드시겠어요?", "您要喝咖啡吗？"], ["내일 다시 오시겠어요?", "您明天会再来吗？"]],
    blank: "드시겠어요", blank2: "오시겠어요", distractors: ["드세요", "오세요"],
    forms: ["드시겠어요", "오시겠어요"], tip: "This is more polite than -(으)세요 and is common in shops, restaurants and offices."
  },
  {
    id: "u12-5", unit: "u12", num: 5, title: "V-(으)ㄹ래요? ①", pattern: "V-(으)ㄹ래요?",
    summary: "Ask about the listener’s preference: “Do you want to …?”",
    formation: ["받침 X + ㄹ래요?: 볼래요?", "받침 O + 을래요?: 먹을래요?", "Casual polite"],
    examples: [["같이 영화 볼래요?", "想一起看电影吗？"], ["뭐 마실래요?", "想喝什么？"]],
    blank: "볼래요", blank2: "마실래요", distractors: ["볼까요", "마실까요"],
    forms: ["볼래요", "마실래요"], tip: "This asks the listener’s intention/preference, not a general suggestion."
  },

  {
    id: "u13-1", unit: "u13", num: 1, title: "A/V-겠어요 ①", pattern: "A/V-겠어요",
    summary: "Express a polite intention or decision: “I will ….”",
    formation: ["V-겠어요: 하겠어요", "V-겠습니다: 오겠습니다", "Subject is usually 저/제가"],
    examples: [["제가 하겠어요.", "我来做。"], ["내일 다시 오겠습니다.", "我明天再来。"]],
    blank: "하겠어요", blank2: "오겠습니다", distractors: ["할 수 있어요", "올게요"],
    forms: ["하겠어요", "오겠습니다"], tip: "겠어요 sounds firm and polite; -(으)ㄹ게요 sounds more like a promise to the listener."
  },
  {
    id: "u13-2", unit: "u13", num: 2, title: "V-(으)ㄹ게요", pattern: "V-(으)ㄹ게요",
    summary: "Promise or offer to do something: “I’ll ….”",
    formation: ["받침 X + ㄹ게요: 갈게요", "받침 O + 을게요: 먹을게요", "Subject is usually 저/제가"],
    examples: [["제가 도와줄게요.", "我来帮你。"], ["내일 전화할게요.", "我明天给你打电话。"]],
    blank: "도와줄게요", blank2: "전화할게요", distractors: ["도와주세요", "전화하겠어요"],
    forms: ["도와줄게요", "전화할게요"], tip: "Use -(으)ㄹ게요 when the listener is affected by your promise."
  },
  {
    id: "u13-3", unit: "u13", num: 3, title: "V-(으)ㄹ래요 ②", pattern: "V-(으)ㄹ래요",
    summary: "State your own intention or preference: “I’ll / I want to ….”",
    formation: ["V-을/ㄹ래요: 갈래요", "Polite but casual", "Negative: 안 갈래요"],
    examples: [["저는 집에 갈래요.", "我想回家。"], ["저는 물을 마실래요.", "我想喝水。"]],
    blank: "갈래요", blank2: "마실래요", distractors: ["갈게요", "마실게요"],
    forms: ["갈래요", "마실래요"], tip: "-(으)ㄹ래요 sounds more personal/willful than -(으)ㄹ게요."
  },

  {
    id: "u14-1", unit: "u14", num: 1, title: "A/V-(으)ㄴ/는데 ②", pattern: "A/V-(으)ㄴ/는데",
    summary: "Give background information, then a request, question or contrast.",
    formation: ["A-은데/ㄴ데: 바쁜데", "V-는데: 오는데", "N-인데: 학생인데"],
    examples: [["지금 바쁜데 나중에 전화해 주세요.", "我现在很忙，请晚点打电话。"], ["비가 오는데 우산이 있어요?", "正在下雨，你有伞吗？"]],
    blank: "바쁜데", blank2: "오는데", distractors: ["바빠서", "와서"],
    forms: ["바쁜데", "오는데"], tip: "The second clause can be a request, a question or a contrast; the speaker expects a response."
  },
  {
    id: "u14-2", unit: "u14", num: 2, title: "V-(으)니까 ②", pattern: "V-(으)니까",
    summary: "Give a reason or a discovered background for what follows.",
    formation: ["V-으니까/니까: 막히니까", "A-으니까/니까: 피곤하니까", "Can introduce a discovery"],
    examples: [["길이 막히니까 지하철을 타세요.", "因为堵车，请坐地铁。"], ["피곤하니까 일찍 자요.", "因为累，所以早睡。"]],
    blank: "막히니까", blank2: "피곤하니까", distractors: ["막혀서", "피곤해서"],
    forms: ["막히니까", "피곤하니까"], tip: "Unlike -아/어서, -(으)니까 can be followed by a command or suggestion."
  }
);

window.GRAMMAR_UNITS.push(
  {
    id: "u9", num: 9, title: "Reasons and Causes", subtitle: "Explain why something happens.",
    context: [
      { speaker: "A", text: "[[오늘]] [[왜]] [[집]]에 [[있었어요]]?", zh: "今天为什么在家？" },
      { speaker: "B", text: "[[비]]가 [[와서|g:u9-1]] [[집]]에 [[있었어요]]. [[감기]] [[때문에|g:u9-3]] [[약]]도 [[먹었어요]].", zh: "因为下雨，所以在家。也因为感冒吃了药。" },
      { speaker: "A", text: "[[배]]가 [[아파서|g:u9-1]] [[약]]을 [[먹었어요]]?", zh: "因为肚子疼才吃药的吗？" },
      { speaker: "B", text: "네, [[추우니까|g:u9-2]] [[따뜻하게]] [[입으세요]].", zh: "是的，因为冷，请穿暖和一点。" }
    ]
  },
  {
    id: "u10", num: 10, title: "Requests and Assisting", subtitle: "Ask for help and offer to help.",
    context: [
      { speaker: "A", text: "[[문]]을 [[열어 주세요|g:u10-1]].", zh: "请开门。" },
      { speaker: "B", text: "네, [[제가]] [[도와줄게요|g:u10-2]]. [[창문]]도 [[열어 줄까요|g:u10-2]]?", zh: "好的，我来帮你。要我把窗户也打开吗？" },
      { speaker: "A", text: "네, [[열어 주세요|g:u10-1]]. [[정말]] [[고마워요]].", zh: "是的，请打开。非常感谢。" }
    ]
  },
  {
    id: "u11", num: 11, title: "Trying and Experience", subtitle: "Try something and talk about what you have done.",
    context: [
      { speaker: "A", text: "[[김치]]를 [[먹어 봤어요|g:u11-1]]?", zh: "你尝过泡菜吗？" },
      { speaker: "B", text: "네, [[먹어 봤어요|g:u11-1]]. [[한국]]에 [[간 적이 있어요|g:u11-2]]?", zh: "是的，尝过。你去过韩国吗？" },
      { speaker: "A", text: "아니요, [[가 본 적이 없어요|g:u11-2]]. [[한번]] [[가 보고 싶어요]].", zh: "没有，没去过。我想去一次看看。" }
    ]
  },
  {
    id: "u12", num: 12, title: "Asking Opinions and Suggestions", subtitle: "Shall we, what shall we do, let’s, would you like to.",
    context: [
      { speaker: "A", text: "[[같이]] [[점심]]을 [[먹을까요|g:u12-1]]?", zh: "一起吃午饭好吗？" },
      { speaker: "B", text: "좋아요. [[뭐]] [[먹을래요|g:u12-5]]?", zh: "好啊。你想吃什么？" },
      { speaker: "A", text: "[[비빔밥]]을 [[먹읍시다|g:u12-3]]. [[커피]]를 [[드시겠어요|g:u12-4]]?", zh: "吃拌饭吧。您要喝咖啡吗？" },
      { speaker: "B", text: "네, [[커피]]를 [[마실래요|g:u12-5]].", zh: "是的，我想喝咖啡。" }
    ]
  },
  {
    id: "u13", num: 13, title: "Intentions and Plans", subtitle: "I will, I’ll do it for you, I want to.",
    context: [
      { speaker: "A", text: "[[내일]] [[누가]] [[올 거예요]]?", zh: "明天谁会来？" },
      { speaker: "B", text: "[[제가]] [[가겠어요|g:u13-1]]. [[제가]] [[도와줄게요|g:u13-2]].", zh: "我去。我来帮忙。" },
      { speaker: "A", text: "고마워요. [[저는]] [[집]]에 [[갈래요|g:u13-3]].", zh: "谢谢。我想回家。" }
    ]
  },
  {
    id: "u14", num: 14, title: "Background and Explanations", subtitle: "Set the scene before asking, suggesting or contrasting.",
    context: [
      { speaker: "A", text: "[[지금]] [[바쁜데|g:u14-1]] [[나중에]] [[전화해 주세요]].", zh: "我现在很忙，请晚点打电话。" },
      { speaker: "B", text: "네, [[길]]이 [[막히니까|g:u14-2]] [[지하철]]을 [[탈게요]].", zh: "好的，因为堵车，我坐地铁。" },
      { speaker: "A", text: "[[비]]가 [[오는데|g:u14-1]] [[우산]]이 [[있어요]]?", zh: "正在下雨，你有伞吗？" }
    ]
  }
);
