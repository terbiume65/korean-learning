/* Grammar data: Units 15–19 */
window.GRAMMAR_ITEMS.push(
  {
    id: "u15-1", unit: "u15", num: 1, title: "V-(으)러 가다/오다", pattern: "V-(으)러 가다/오다",
    summary: "Say you go or come somewhere in order to do something.",
    formation: ["받침 O + 으러: 먹으러", "받침 X + 러: 만나러", "Followed by 가다/오다"],
    examples: [["밥을 먹으러 식당에 갔어요.", "去餐厅吃饭了。"], ["친구를 만나러 왔어요.", "来见朋友了。"]],
    blank: "먹으러", blank2: "만나러", distractors: ["먹지만", "만나려고"],
    forms: ["먹으러", "만나러"], tip: "The purpose verb must be followed by a movement verb: 가다, 오다, 다니다."
  },
  {
    id: "u15-2", unit: "u15", num: 2, title: "V-(으)려고", pattern: "V-(으)려고",
    summary: "Express an intention: “in order to / I’m planning to.”",
    formation: ["받침 X + 려고: 가려고", "받침 O + 으려고: 먹으려고", "Often followed by 해요"],
    examples: [["한국에 가려고 해요.", "打算去韩国。"], ["책을 읽으려고 해요.", "打算读书。"]],
    blank: "가려고", blank2: "읽으려고", distractors: ["가러", "읽으러"],
    forms: ["가려고", "읽으려고"], tip: "려고 only expresses intention; it does not mean “because.”"
  },
  {
    id: "u15-3", unit: "u15", num: 3, title: "V-(으)려고 하다", pattern: "V-(으)려고 하다",
    summary: "Say that you plan or intend to do something.",
    formation: ["V-으려고 해요: 먹으려고 해요", "V-려고 해요: 가려고 해요", "Past: 하려고 했어요"],
    examples: [["내일 운동하려고 해요.", "明天打算运动。"], ["커피를 마시려고 해요.", "打算喝咖啡。"]],
    blank: "운동하려고 해요", blank2: "마시려고 해요", distractors: ["운동했어요", "마시러 가요"],
    forms: ["운동하려고 해요", "마시려고 해요"], tip: "The shortened form 려고 해요 is very common in speech."
  },
  {
    id: "u15-4", unit: "u15", num: 4, title: "N을/를 위해(서), V-기 위해(서)", pattern: "N을/를 위해(서) / V-기 위해(서)",
    summary: "Say “for” a person/purpose or “in order to” do something.",
    formation: ["N을/를 위해서: 가족을 위해서", "V-기 위해서: 건강을 위해 운동해요", "More formal than 려고"],
    examples: [["가족을 위해서 일해요.", "为了家人工作。"], ["건강을 위해 운동해요.", "为了健康运动。"]],
    blank: "가족을 위해서", blank2: "건강을 위해", distractors: ["가족 때문에", "건강 때문에"],
    forms: ["가족을 위해서", "건강을 위해"], tip: "위해 is intentional (“for the sake of”); 때문에 is causal (“because of”)."
  },
  {
    id: "u15-5", unit: "u15", num: 5, title: "V-기로 하다", pattern: "V-기로 하다",
    summary: "Say that you decided to do something.",
    formation: ["V-기로 했어요: 가기로 했어요", "V-기로 해요: 가기로 해요", "Often with time expressions"],
    examples: [["내일부터 운동하기로 했어요.", "决定从明天开始运动。"], ["주말에 만나기로 했어요.", "决定周末见面。"]],
    blank: "운동하기로 했어요", blank2: "만나기로 했어요", distractors: ["운동하려고 해요", "만나려고 해요"],
    forms: ["운동하기로 했어요", "만나기로 했어요"], tip: "This is a decision, not just an intention; the decision is already made."
  },

  {
    id: "u16-1", unit: "u16", num: 1, title: "A/V-(으)면", pattern: "A/V-(으)면",
    summary: "Say “if” or “when” something happens.",
    formation: ["받침 X + 면: 오면", "받침 O + 으면: 있으면", "Can be a condition or a repeated situation"],
    examples: [["비가 오면 집에 있을게요.", "如果下雨，我就待在家里。"], ["시간이 있으면 같이 가요.", "如果有时间，一起去吧。"]],
    blank: "오면", blank2: "있으면", distractors: ["와도", "있어도"],
    forms: ["오면", "있으면"], tip: "-(으)면 can be a real condition or a general “whenever.”"
  },
  {
    id: "u16-2", unit: "u16", num: 2, title: "V-(으)려면", pattern: "V-(으)려면",
    summary: "Say “if you intend to …” before giving advice or a condition.",
    formation: ["V-으려면: 먹으려면", "V-려면: 가려면", "Often followed by -아/어야 해요"],
    examples: [["한국에 가려면 비자가 필요해요.", "想去韩国的话，需要签证。"], ["한국어를 배우려면 매일 공부해야 해요.", "想学韩语的话，必须每天学习。"]],
    blank: "가려면", blank2: "배우려면", distractors: ["가면", "배우면"],
    forms: ["가려면", "배우려면"], tip: "려면 combines intention (려고) with condition (면)."
  },
  {
    id: "u16-3", unit: "u16", num: 3, title: "A/V-아/어도", pattern: "A/V-아/어도",
    summary: "Say “even if” or “although.”",
    formation: ["ㅏ/ㅗ + 아도: 가도", "Other + 어도: 먹어도", "하다 → 해도"],
    examples: [["비가 와도 갈 거예요.", "即使下雨也要去。"], ["피곤해도 운동해요.", "即使累也运动。"]],
    blank: "와도", blank2: "피곤해도", distractors: ["오면", "피곤하면"],
    forms: ["와도", "피곤해도"], tip: "The main clause still happens despite the condition; it is not a simple “but.”"
  },

  {
    id: "u17-1", unit: "u17", num: 1, title: "A/V-겠어요 ②", pattern: "A/V-겠어요",
    summary: "Guess something from evidence, or make an exclamation.",
    formation: ["V-겠어요: 오겠어요", "A-겠어요: 맛있겠어요", "Often with looks/weather"],
    examples: [["비가 오겠어요.", "看来要下雨了。"], ["맛있겠어요!", "看起来很好吃！"]],
    blank: "오겠어요", blank2: "맛있겠어요", distractors: ["올 거예요", "맛있을 거예요"],
    forms: ["오겠어요", "맛있겠어요"], tip: "The same form can express intention or conjecture; context and subject decide."
  },
  {
    id: "u17-2", unit: "u17", num: 2, title: "A/V-(으)ㄹ 거예요 ②", pattern: "A/V-(으)ㄹ 거예요",
    summary: "Make a conjecture about the future or a situation.",
    formation: ["V-을/ㄹ 거예요: 갈 거예요", "A-을/ㄹ 거예요: 따뜻할 거예요", "N-일 거예요: 의사일 거예요"],
    examples: [["내일은 따뜻할 거예요.", "明天会很暖和。"], ["그 사람은 의사일 거예요.", "那个人应该是医生。"]],
    blank: "따뜻할 거예요", blank2: "의사일 거예요", distractors: ["따뜻해요", "의사겠어요"],
    forms: ["따뜻할 거예요", "의사일 거예요"], tip: "This is a guess, not a promise; the same form also expresses future plans."
  },
  {
    id: "u17-3", unit: "u17", num: 3, title: "A/V-(으)ㄹ까요? ③", pattern: "A/V-(으)ㄹ까요?",
    summary: "Wonder or ask for a guess about something.",
    formation: ["V-을/ㄹ까요?: 올까요?", "A-을/ㄹ까요?: 맞을까요?", "Often with 혹시, 아마"],
    examples: [["이 옷이 맞을까요?", "这件衣服合适吗？"], ["그 영화가 재미있을까요?", "那部电影会好看吗？"]],
    blank: "맞을까요", blank2: "재미있을까요", distractors: ["맞았어요", "재미있어요"],
    forms: ["맞을까요", "재미있을까요"], tip: "The speaker does not know the answer and invites the listener’s guess."
  },
  {
    id: "u17-4", unit: "u17", num: 4, title: "A/V-(으)ㄴ/는/(으)ㄹ 것 같다", pattern: "A/V-(으)ㄴ/는/(으)ㄹ 것 같다",
    summary: "Say “it seems / I think” based on observation.",
    formation: ["Past -(으)ㄴ 것 같다", "Present -는 것 같다", "Future -(으)ㄹ 것 같다"],
    examples: [["비가 오는 것 같아요.", "好像在下雨。"], ["그 사람은 바쁜 것 같아요.", "那个人好像很忙。"]],
    blank: "오는 것 같아요", blank2: "바쁜 것 같아요", distractors: ["올 것 같아요", "바쁠 것 같아요"],
    forms: ["오는 것 같아요", "바쁜 것 같아요"], tip: "Choose the modifier by time: past -(으)ㄴ, present -는, future/guess -(으)ㄹ."
  },

  {
    id: "u18-1", unit: "u18", num: 1, title: "Noun Modifiers -(으)ㄴ/-는/-(으)ㄹ N", pattern: "-(으)ㄴ / -는 / -(으)ㄹ + N",
    summary: "Turn a verb or adjective into a noun modifier.",
    formation: ["A-은/ㄴ: 예쁜 꽃", "V-는: 먹는 사람", "V-을/ㄹ: 갈 사람"],
    examples: [["예쁜 꽃이에요.", "是漂亮的花。"], ["먹는 사람이 많아요.", "吃饭的人很多。"]],
    blank: "예쁜", blank2: "먹는", distractors: ["예뻐는", "먹은"],
    forms: ["예쁜", "먹는"], tip: "Adjectives use -(으)ㄴ for present; verbs use -는 for present and -(으)ㄹ for future."
  },
  {
    id: "u18-2", unit: "u18", num: 2, title: "A/V-기", pattern: "A/V-기",
    summary: "Turn a verb or adjective into a noun phrase.",
    formation: ["V-기: 운동하기", "A-기: 어렵기", "Often with 좋아하다/싫어하다/어렵다"],
    examples: [["운동하기를 좋아해요.", "喜欢运动。"], ["한국어 배우기는 어려워요.", "学习韩语很难。"]],
    blank: "운동하기를", blank2: "배우기는", distractors: ["운동하는", "배우는"],
    forms: ["운동하기", "배우기"], tip: "기 is a nominalizer, like -는 것 but often more concise."
  },
  {
    id: "u18-3", unit: "u18", num: 3, title: "A-게", pattern: "A-게",
    summary: "Turn an adjective into an adverb.",
    formation: ["A-게: 빠르게, 맛있게", "Irregular: 쉽게, 다르게", "Often before a verb"],
    examples: [["빠르게 걸어요.", "走得快。"], ["맛있게 먹었어요.", "吃得很香。"]],
    blank: "빠르게", blank2: "맛있게", distractors: ["빠른", "맛있는"],
    forms: ["빠르게", "맛있게"], tip: "Adverbs modify verbs: 빠르게 걷다, 맛있게 먹다."
  },
  {
    id: "u18-4", unit: "u18", num: 4, title: "A-아/어하다", pattern: "A-아/어하다",
    summary: "Turn an adjective into a verb describing someone’s feeling or behavior.",
    formation: ["무섭다 → 무서워하다", "기쁘다 → 기뻐하다", "Often third person"],
    examples: [["동생은 무서워해요.", "弟弟害怕。"], ["친구가 기뻐해요.", "朋友很高兴。"]],
    blank: "무서워해요", blank2: "기뻐해요", distractors: ["무서워하지 마세요", "기뻐요"],
    forms: ["무서워해요", "기뻐해요"], tip: "Use -아/어하다 for someone else’s feelings; 저는 무서워요 is fine for yourself."
  },

  {
    id: "u19-1", unit: "u19", num: 1, title: "V-고 있다 ②", pattern: "V-고 있다",
    summary: "Describe a state from wearing, carrying or holding something.",
    formation: ["입고 있다: 옷을 입고 있어요", "쓰고 있다: 안경을 쓰고 있어요", "들고 있다: 가방을 들고 있어요"],
    examples: [["저는 안경을 쓰고 있어요.", "我戴着眼镜。"], ["가방을 들고 있어요.", "拿着包。"]],
    blank: "쓰고 있어요", blank2: "들고 있어요", distractors: ["썼어요", "들었어요"],
    forms: ["쓰고 있어요", "들고 있어요"], tip: "The focus is the resulting state, not the action of putting on glasses."
  },
  {
    id: "u19-2", unit: "u19", num: 2, title: "V-아/어 있다", pattern: "V-아/어 있다",
    summary: "Describe a state that remains after an action.",
    formation: ["앉다 → 앉아 있다", "열다 → 열려 있다", "Often with doors, windows, people"],
    examples: [["앉아 있어요.", "坐着。"], ["문이 열려 있어요.", "门开着。"]],
    blank: "앉아 있어요", blank2: "열려 있어요", distractors: ["앉고 있어요", "열고 있어요"],
    forms: ["앉아 있어요", "열려 있어요"], tip: "고 있다 is an action in progress; 아/어 있다 is the state left behind."
  },
  {
    id: "u19-3", unit: "u19", num: 3, title: "A-아/어지다", pattern: "A-아/어지다",
    summary: "Say that something becomes more (adjective).",
    formation: ["따뜻하다 → 따뜻해지다", "재미있다 → 재미있어지다", "Past: 따뜻해졌어요"],
    examples: [["날씨가 따뜻해졌어요.", "天气变暖和了。"], ["한국어가 재미있어졌어요.", "韩语变得有趣了。"]],
    blank: "따뜻해졌어요", blank2: "재미있어졌어요", distractors: ["따뜻해요", "재미있어요"],
    forms: ["따뜻해졌어요", "재미있어졌어요"], tip: "This is a change over time; the past form is common."
  },
  {
    id: "u19-4", unit: "u19", num: 4, title: "V-게 되다", pattern: "V-게 되다",
    summary: "Say that you came to do something or a situation came about.",
    formation: ["V-게 되었어요", "V-게 돼요", "Often for unexpected changes"],
    examples: [["한국어를 배우게 되었어요.", "开始学韩语了。"], ["여기에서 일하게 되었어요.", "开始在这里工作了。"]],
    blank: "배우게 되었어요", blank2: "일하게 되었어요", distractors: ["배우고 싶어요", "일하고 싶어요"],
    forms: ["배우게 되었어요", "일하게 되었어요"], tip: "게 되다 often implies a change caused by circumstances, not a strong decision."
  }
);

window.GRAMMAR_UNITS.push(
  {
    id: "u15", num: 15, title: "Purpose and Intention", subtitle: "Why you go, what you plan, what you decided.",
    context: [
      { speaker: "A", text: "[[왜]] [[한국]]에 [[왔어요]]?", zh: "为什么来韩国？" },
      { speaker: "B", text: "[[한국어]]를 [[배우러 왔어요|g:u15-1]]. [[내일]] [[친구]]를 [[만나려고 해요|g:u15-2]].", zh: "来学韩语。明天打算见朋友。" },
      { speaker: "A", text: "[[뭐]] [[먹으러|g:u15-1]] [[갈 거예요]]?", zh: "要去吃什么？" },
      { speaker: "B", text: "[[비빔밥]]을 [[먹으러]] [[갈 거예요]]. [[주말]]에 [[만나기로 했어요|g:u15-5]].", zh: "要去吃拌饭。决定周末见面。" }
    ]
  },
  {
    id: "u16", num: 16, title: "Conditions and Suppositions", subtitle: "If, even if, and if you intend to.",
    context: [
      { speaker: "A", text: "[[비]]가 [[오면|g:u16-1]] [[집]]에 [[있을 거예요]].", zh: "如果下雨，我就待在家。" },
      { speaker: "B", text: "[[시간]]이 [[있으면|g:u16-1]] [[같이]] [[영화]]를 [[봐요]].", zh: "如果有时间，一起看电影吧。" },
      { speaker: "A", text: "[[피곤해도|g:u16-3]] [[갈 거예요]]?", zh: "即使累也要去吗？" },
      { speaker: "B", text: "네, [[괜찮아요]]. [[한국]]에 [[가려면|g:u16-2]] [[비자]]가 [[필요해요]].", zh: "是的，没关系。想去韩国的话需要签证。" }
    ]
  },
  {
    id: "u17", num: 17, title: "Conjecture", subtitle: "Guess, wonder and say what seems to be true.",
    context: [
      { speaker: "A", text: "[[내일]] [[비]]가 [[오겠어요|g:u17-1]]?", zh: "明天会下雨吗？" },
      { speaker: "B", text: "네, [[아마]] [[올 거예요|g:u17-2]]. [[하늘]]이 [[어두워요]].", zh: "是的，可能会下。天很暗。" },
      { speaker: "A", text: "[[그 영화]]가 [[재미있을까요|g:u17-3]]?", zh: "那部电影会好看吗？" },
      { speaker: "B", text: "[[재미있을 것 같아요|g:u17-4]]. [[같이]] [[볼까요|g:u17-3]]?", zh: "好像会好看。一起看吗？" }
    ]
  },
  {
    id: "u18", num: 18, title: "Changes in Parts of Speech", subtitle: "Turn verbs and adjectives into noun modifiers, nouns and adverbs.",
    context: [
      { speaker: "A", text: "[[예쁜|g:u18-1]] [[꽃]]이 [[많아요]].", zh: "有很多漂亮的花。" },
      { speaker: "B", text: "[[저]]는 [[사진]] [[찍기|g:u18-2]]를 [[좋아해요]].", zh: "我喜欢拍照。" },
      { speaker: "A", text: "[[천천히]] [[걸으면서]] [[구경해요]]. [[맛있게|g:u18-3]] [[먹고]] [[갑시다]].", zh: "慢慢走，边看边逛。好好吃一顿再走吧。" }
    ]
  },
  {
    id: "u19", num: 19, title: "Expressions of State", subtitle: "Actions in progress, resulting states and changes.",
    context: [
      { speaker: "A", text: "[[지금]] [[뭐]] [[하고 있어요]]?", zh: "现在在做什么？" },
      { speaker: "B", text: "[[안경]]을 [[쓰고 있어요|g:u19-1]]. [[의자]]에 [[앉아 있어요|g:u19-2]].", zh: "戴着眼镜。坐在椅子上。" },
      { speaker: "A", text: "[[날씨]]가 [[따뜻해졌어요|g:u19-3]].", zh: "天气变暖和了。" },
      { speaker: "B", text: "네, [[한국어]]가 [[재미있어졌어요|g:u19-3]]. [[여기]]에서 [[일하게 되었어요|g:u19-4]].", zh: "是的，韩语变得有趣了。开始在这里工作了。" }
    ]
  }
);
