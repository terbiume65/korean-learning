/* Grammar data: Units 4–8 */
window.GRAMMAR_ITEMS.push(
  {
    id: "u4-1", unit: "u4", num: 1, title: "A/V-고", pattern: "A/V-고",
    summary: "List two actions or states, or say “and then.”",
    formation: ["V-고 V: 먹고 가요", "A-고 A: 좋고 따뜻해요", "Past: 먹었고, 갔고"],
    examples: [["밥을 먹고 학교에 가요.", "吃饭后去学校。"], ["날씨가 좋고 따뜻해요.", "天气又好又暖和。"]],
    blank: "먹고", blank2: "좋고", distractors: ["먹지만", "좋아서"],
    forms: ["먹고", "좋고"], tip: "고 simply connects; it does not emphasize cause. For a reason, use -아/어서 or -(으)니까."
  },
  {
    id: "u4-2", unit: "u4", num: 2, title: "V-거나", pattern: "V-거나",
    summary: "Say “or” between two actions.",
    formation: ["V-거나 V: 읽거나 봐요", "Can repeat: 읽거나 쓰거나", "Nouns use (이)나"],
    examples: [["주말에 책을 읽거나 영화를 봐요.", "周末读书或者看电影。"], ["커피를 마시거나 차를 마셔요.", "喝咖啡或者茶。"]],
    blank: "읽거나", blank2: "마시거나", distractors: ["읽고", "마시고"],
    forms: ["읽거나", "마시거나"], tip: "거나 connects verbs/adjectives; (이)나 connects nouns."
  },
  {
    id: "u4-3", unit: "u4", num: 3, title: "A/V-지만", pattern: "A/V-지만",
    summary: "Say “but” or “although.”",
    formation: ["A/V-지만: 비싸지만, 가지만", "Past: 갔지만", "Can contrast two clauses"],
    examples: [["비싸지만 맛있어요.", "虽然贵但很好吃。"], ["가고 싶지만 시간이 없어요.", "虽然想去，但没有时间。"]],
    blank: "비싸지만", blank2: "싶지만", distractors: ["비싸고", "싶고"],
    forms: ["비싸지만", "싶지만"], tip: "지만 is a direct contrast; -는데 is softer and often adds background."
  },
  {
    id: "u4-4", unit: "u4", num: 4, title: "A/V-(으)ㄴ/는데 ①", pattern: "A/V-(으)ㄴ/는데",
    summary: "Give background information or a soft contrast.",
    formation: ["A-은데/ㄴ데: 추운데, 예쁜데", "V-는데: 오는데, 가는데", "N-인데: 학생인데"],
    examples: [["날씨가 추운데 집에 있어요.", "天气冷，我待在家里。"], ["비가 오는데 우산이 없어요.", "正在下雨，但没带伞。"]],
    blank: "추운데", blank2: "오는데", distractors: ["추워요", "와서"],
    forms: ["추운데", "오는데"], tip: "는데 sets the scene; the second clause can be a contrast, a result or a request."
  },

  {
    id: "u5-1", unit: "u5", num: 1, title: "N 전에, V-기 전에", pattern: "N 전에 / V-기 전에",
    summary: "Say “before” a noun or an action.",
    formation: ["N 전에: 수업 전에", "V-기 전에: 먹기 전에", "The main verb can be past: 먹기 전에 씻었어요"],
    examples: [["밥을 먹기 전에 손을 씻어요.", "吃饭前洗手。"], ["수업 전에 도서관에 가요.", "上课前去图书馆。"]],
    blank: "먹기 전에", blank2: "수업 전에", distractors: ["먹은 후에", "수업 후에"],
    forms: ["먹기 전에", "수업 전에"], tip: "The verb before 전에 is always in the -기 form, not past tense."
  },
  {
    id: "u5-2", unit: "u5", num: 2, title: "N 후에, V-(으)ㄴ 후에", pattern: "N 후에 / V-(으)ㄴ 후에",
    summary: "Say “after” a noun or an action.",
    formation: ["N 후에: 수업 후에", "V-은/ㄴ 후에: 먹은 후에", "Can use 뒤에 instead of 후에"],
    examples: [["밥을 먹은 후에 약을 먹어요.", "饭后吃药。"], ["수업 후에 친구를 만나요.", "下课后见朋友。"]],
    blank: "먹은 후에", blank2: "수업 후에", distractors: ["먹기 전에", "수업 전에"],
    forms: ["먹은 후에", "수업 후에"], tip: "Use the past modifier -은/ㄴ before 후에, even for a future sequence."
  },
  {
    id: "u5-3", unit: "u5", num: 3, title: "V-고 나서", pattern: "V-고 나서",
    summary: "Say “after doing” with a clear sequence.",
    formation: ["V-고 나서: 먹고 나서", "Can add 시간이: 먹고 나서 시간이 있어요", "More sequential than -고"],
    examples: [["숙제를 하고 나서 게임을 해요.", "做完作业后玩游戏。"], ["샤워하고 나서 잤어요.", "洗完澡后睡了。"]],
    blank: "하고 나서", blank2: "샤워하고 나서", distractors: ["하기 전에", "샤워하기 전에"],
    forms: ["하고 나서", "샤워하고 나서"], tip: "고 나서 emphasizes that the first action is completely finished."
  },
  {
    id: "u5-4", unit: "u5", num: 4, title: "V-아/어서", pattern: "V-아/어서",
    summary: "Connect actions in sequence: do A, then B.",
    formation: ["ㅏ/ㅗ + 아서: 만나서", "Other + 어서: 먹어서", "하다 → 해서"],
    examples: [["친구를 만나서 영화를 봤어요.", "见了朋友，然后看了电影。"], ["집에 가서 쉬었어요.", "回家休息了。"]],
    blank: "만나서", blank2: "가서", distractors: ["만나지만", "가지만"],
    forms: ["만나서", "가서"], tip: "This use is sequential, not causal; the causal -아/어서 is taught in Unit 9."
  },
  {
    id: "u5-5", unit: "u5", num: 5, title: "N 때, A/V-(으)ㄹ 때", pattern: "N 때 / A/V-(으)ㄹ 때",
    summary: "Say “when” or “during.”",
    formation: ["N 때: 어릴 때, 방학 때", "V-을/ㄹ 때: 먹을 때", "A-을/ㄹ 때: 추울 때"],
    examples: [["어릴 때 찍은 사진이에요.", "是小时候拍的照片。"], ["밥을 먹을 때 TV를 봐요.", "吃饭时看电视。"]],
    blank: "어릴 때", blank2: "먹을 때", distractors: ["어린 후에", "먹은 후에"],
    forms: ["어릴 때", "먹을 때"], tip: "때 can be a noun (“time”) or a dependent noun after a modifier."
  },
  {
    id: "u5-6", unit: "u5", num: 6, title: "V-(으)면서", pattern: "V-(으)면서",
    summary: "Say that two actions happen at the same time.",
    formation: ["받침 X + 면서: 걸으면서", "받침 O + 으면서: 먹으면서", "Same subject for both actions"],
    examples: [["음악을 들으면서 공부해요.", "一边听音乐一边学习。"], ["걸으면서 이야기해요.", "一边走一边聊天。"]],
    blank: "들으면서", blank2: "걸으면서", distractors: ["듣고", "걷고"],
    forms: ["들으면서", "걸으면서"], tip: "The subjects of both actions must be the same person."
  },
  {
    id: "u5-7", unit: "u5", num: 7, title: "N 중, V-는 중", pattern: "N 중 / V-는 중",
    summary: "Say “in the middle of” or “currently doing.”",
    formation: ["N 중: 회의 중, 수업 중", "V-는 중: 공부하는 중", "Often with 지금"],
    examples: [["지금 회의 중이에요.", "现在正在开会。"], ["지금 공부하는 중이에요.", "现在正在学习。"]],
    blank: "회의 중이에요", blank2: "공부하는 중이에요", distractors: ["회의 후예요", "공부한 후예요"],
    forms: ["회의 중", "공부하는 중"], tip: "중 can attach to nouns or to the -는 modifier of a verb."
  },
  {
    id: "u5-8", unit: "u5", num: 8, title: "V-자마자", pattern: "V-자마자",
    summary: "Say “as soon as” one action happens.",
    formation: ["V-자마자: 도착하자마자", "No tense marking before 자마자", "Often for quick sequences"],
    examples: [["집에 도착하자마자 잤어요.", "一到家就睡了。"], ["수업이 끝나자마자 나갔어요.", "一下课就出去了。"]],
    blank: "도착하자마자", blank2: "끝나자마자", distractors: ["도착하고 나서", "끝나고 나서"],
    forms: ["도착하자마자", "끝나자마자"], tip: "Do not add past tense before 자마자: 도착했자마자 is wrong."
  },
  {
    id: "u5-9", unit: "u5", num: 9, title: "N 동안, V-는 동안", pattern: "N 동안 / V-는 동안",
    summary: "Say “during” a period or “while” doing something.",
    formation: ["N 동안: 방학 동안", "V-는 동안: 공부하는 동안", "Can use 동안에"],
    examples: [["방학 동안 여행했어요.", "放假期间旅行了。"], ["내가 공부하는 동안 친구가 요리했어요.", "我学习的时候朋友做了饭。"]],
    blank: "방학 동안", blank2: "공부하는 동안", distractors: ["방학 후에", "공부한 후에"],
    forms: ["방학 동안", "공부하는 동안"], tip: "The subjects can be different with 동안, unlike -(으)면서."
  },
  {
    id: "u5-10", unit: "u5", num: 10, title: "V-(으)ㄴ 지", pattern: "V-(으)ㄴ 지",
    summary: "Say how long it has been since an action.",
    formation: ["V-은/ㄴ 지: 온 지", "Often with 되다/지나다: 온 지 일 년 되었어요", "The clause before 지 is past"],
    examples: [["한국에 온 지 일 년 되었어요.", "来韩国已经一年了。"], ["운동을 시작한 지 두 달 됐어요.", "开始运动已经两个月了。"]],
    blank: "온 지", blank2: "시작한 지", distractors: ["온 후에", "시작한 후에"],
    forms: ["온 지", "시작한 지"], tip: "The main predicate is about the elapsed time, not the original action."
  },

  {
    id: "u6-1", unit: "u6", num: 1, title: "V-(으)ㄹ 수 있다/없다", pattern: "V-(으)ㄹ 수 있다/없다",
    summary: "Say “can” or “cannot” do something.",
    formation: ["받침 X + ㄹ 수 있어요: 갈 수 있어요", "받침 O + 을 수 있어요: 먹을 수 있어요", "Negative: 갈 수 없어요"],
    examples: [["한국어를 할 수 있어요.", "会说韩语。"], ["오늘은 갈 수 없어요.", "今天不能去。"]],
    blank: "할 수 있어요", blank2: "갈 수 없어요", distractors: ["할 수 없어요", "갈 수 있어요"],
    forms: ["할 수 있어요", "갈 수 없어요"], tip: "This is about ability or possibility; 못 often focuses on inability due to circumstance."
  },
  {
    id: "u6-2", unit: "u6", num: 2, title: "V-(으)ㄹ 줄 알다/모르다", pattern: "V-(으)ㄹ 줄 알다/모르다",
    summary: "Say that you know or don’t know how to do something.",
    formation: ["V-을/ㄹ 줄 알아요", "V-을/ㄹ 줄 몰라요", "Often with skills: 수영, 피아노"],
    examples: [["수영할 줄 알아요.", "会游泳。"], ["피아노를 칠 줄 몰라요.", "不会弹钢琴。"]],
    blank: "수영할 줄 알아요", blank2: "칠 줄 몰라요", distractors: ["수영할 줄 몰라요", "칠 줄 몰라요"],
    forms: ["수영할 줄 알아요", "칠 줄 몰라요"], tip: "줄 알다/모르다 is about learned skill; 수 있다/없다 is broader ability/possibility."
  },

  {
    id: "u7-1", unit: "u7", num: 1, title: "V-(으)세요", pattern: "V-(으)세요",
    summary: "Give a polite instruction or request.",
    formation: ["받침 X + 세요: 가세요", "받침 O + 으세요: 앉으세요", "Irregular: 드세요, 하세요"],
    examples: [["여기 앉으세요.", "请坐这里。"], ["천천히 드세요.", "请慢慢吃。"]],
    blank: "앉으세요", blank2: "드세요", distractors: ["앉지 마세요", "드시지 마세요"],
    forms: ["앉으세요", "드세요"], tip: "-(으)세요 is polite but direct; add 주세요 for “please do it for me.”"
  },
  {
    id: "u7-2", unit: "u7", num: 2, title: "V-지 마세요", pattern: "V-지 마세요",
    summary: "Tell someone not to do something.",
    formation: ["V-지 마세요: 가지 마세요", "Casual: 하지 마", "Positive request: -(으)세요"],
    examples: [["여기에서 사진을 찍지 마세요.", "请不要在这里拍照。"], ["걱정하지 마세요.", "请不要担心。"]],
    blank: "찍지 마세요", blank2: "걱정하지 마세요", distractors: ["찍으세요", "걱정하세요"],
    forms: ["찍지 마세요", "걱정하지 마세요"], tip: "The opposite positive request is -(으)세요."
  },
  {
    id: "u7-3", unit: "u7", num: 3, title: "A/V-아/어야 되다/하다", pattern: "A/V-아/어야 되다/하다",
    summary: "Say “must” or “have to.”",
    formation: ["ㅏ/ㅗ + 아야 해요: 가야 해요", "Other + 어야 해요: 먹어야 해요", "Can use 되다: 가야 돼요"],
    examples: [["약을 먹어야 해요.", "必须吃药。"], ["내일 일찍 일어나야 돼요.", "明天必须早起。"]],
    blank: "먹어야 해요", blank2: "일어나야 돼요", distractors: ["먹어도 돼요", "일어나도 돼요"],
    forms: ["먹어야 해요", "일어나야 돼요"], tip: "해야 되다 and 해야 하다 are interchangeable in most conversation."
  },
  {
    id: "u7-4", unit: "u7", num: 4, title: "A/V-아/어도 되다", pattern: "A/V-아/어도 되다",
    summary: "Ask or give permission: “may / it’s okay to.”",
    formation: ["ㅏ/ㅗ + 아도 돼요: 앉아도 돼요", "Other + 어도 돼요: 가도 돼요", "Negative: 안 해도 돼요"],
    examples: [["여기 앉아도 돼요.", "可以坐这里。"], ["먼저 가도 돼요.", "可以先走。"]],
    blank: "앉아도 돼요", blank2: "가도 돼요", distractors: ["앉아야 해요", "가야 해요"],
    forms: ["앉아도 돼요", "가도 돼요"], tip: "The question form is often used to ask permission: 앉아도 돼요?"
  },
  {
    id: "u7-5", unit: "u7", num: 5, title: "A/V-(으)면 안 되다", pattern: "A/V-(으)면 안 되다",
    summary: "Say “must not” or “it’s not allowed.”",
    formation: ["받침 X + 면 안 돼요: 가면 안 돼요", "받침 O + 으면 안 돼요: 먹으면 안 돼요", "Strong prohibition"],
    examples: [["여기에서 담배를 피우면 안 돼요.", "不能在这里抽烟。"], ["늦으면 안 돼요.", "不能迟到。"]],
    blank: "피우면 안 돼요", blank2: "늦으면 안 돼요", distractors: ["피워도 돼요", "늦어도 돼요"],
    forms: ["피우면 안 돼요", "늦으면 안 돼요"], tip: "This is stronger than -지 마세요, which is a direct request not to do something."
  },
  {
    id: "u7-6", unit: "u7", num: 6, title: "A/V-지 않아도 되다", pattern: "A/V-지 않아도 되다 / 안 A/V-아/어도 되다",
    summary: "Say “don’t have to” or “it’s okay not to.”",
    formation: ["V-지 않아도 돼요", "안 V-아/어도 돼요", "Do not confuse with 하면 안 되다"],
    examples: [["오늘은 안 와도 돼요.", "今天不来也可以。"], ["내일은 일찍 안 일어나도 돼요.", "明天不用早起。"]],
    blank: "안 와도 돼요", blank2: "안 일어나도 돼요", distractors: ["와야 해요", "일어나야 해요"],
    forms: ["안 와도 돼요", "안 일어나도 돼요"], tip: "This gives permission not to do something; it is not a prohibition."
  },

  {
    id: "u8-1", unit: "u8", num: 1, title: "V-고 싶다", pattern: "V-고 싶다",
    summary: "Say what you want to do.",
    formation: ["V-고 싶어요", "V-고 싶습니다 (formal)", "Subject wants: 저는 가고 싶어요"],
    examples: [["한국에 가고 싶어요.", "想去韩国。"], ["커피를 마시고 싶어요.", "想喝咖啡。"]],
    blank: "가고 싶어요", blank2: "마시고 싶어요", distractors: ["가야 해요", "마셔야 해요"],
    forms: ["가고 싶어요", "마시고 싶어요"], tip: "For “I want [a noun],” use N을/를 갖고 싶어요 or N이/가 갖고 싶어요."
  },
  {
    id: "u8-2", unit: "u8", num: 2, title: "A/V-았/었으면 좋겠다", pattern: "A/V-았/었으면 좋겠다",
    summary: "Express a wish: “I wish / I hope.”",
    formation: ["V-았/었으면 좋겠어요", "A-았/었으면 좋겠어요", "Past form + 면 좋겠다"],
    examples: [["날씨가 좋았으면 좋겠어요.", "希望天气好。"], ["한국에 갔으면 좋겠어요.", "希望能去韩国。"]],
    blank: "좋았으면 좋겠어요", blank2: "갔으면 좋겠어요", distractors: ["좋고 싶어요", "가고 싶어요"],
    forms: ["좋았으면 좋겠어요", "갔으면 좋겠어요"], tip: "The past form here does not mean past time; it makes the wish softer."
  }
);

window.GRAMMAR_UNITS.push(
  {
    id: "u4", num: 4, title: "Listing and Contrast", subtitle: "Join ideas, list actions and contrast them.",
    context: [
      { speaker: "A", text: "[[날씨]]가 [[춥지만]] [[산]]에 [[갈 거예요]].", zh: "虽然天气冷，但我要去山上。" },
      { speaker: "B", text: "[[비]]가 [[오는데]] [[우산]]을 [[가져가세요]]. [[따뜻하게]] [[입고]] [[가세요]].", zh: "正在下雨，请带上伞。穿暖和一点再去。" },
      { speaker: "A", text: "[[커피]]를 [[마시거나]] [[차]]를 [[마실래요]]?", zh: "你想喝咖啡还是茶？" },
      { speaker: "B", text: "[[차]]를 [[마실게요]]. [[피곤하지만]] [[괜찮아요]].", zh: "我喝茶吧。虽然累，但没关系。" }
    ]
  },
  {
    id: "u5", num: 5, title: "Time Expressions", subtitle: "Before, after, while, during and how long.",
    context: [
      { speaker: "A", text: "[[수업]] [[전에|g:u5-1]] [[뭐]] [[해요]]?", zh: "上课前做什么？" },
      { speaker: "B", text: "[[밥]]을 [[먹고 나서|g:u5-3]] [[도서관]]에 [[가요]]. [[공부]]하는 [[동안|g:u5-9]] [[음악]]을 [[들어요]].", zh: "吃完饭去图书馆。学习的时候听音乐。" },
      { speaker: "A", text: "[[한국]]에 [[온 지|g:u5-10]] [[얼마나]] [[됐어요]]?", zh: "来韩国多久了？" },
      { speaker: "B", text: "[[작년]]에 [[왔으니까]] [[일 년]] [[됐어요]]. [[집]]에 [[도착하자마자|g:u5-8]] [[잤어요]].", zh: "去年来的，所以已经一年了。一到家就睡了。" }
    ]
  },
  {
    id: "u6", num: 6, title: "Ability and Possibility", subtitle: "Can, cannot, know how and don’t know how.",
    context: [
      { speaker: "A", text: "[[한국어]]를 [[할 수 있어요|g:u6-1]]?", zh: "会说韩语吗？" },
      { speaker: "B", text: "조금 [[할 수 있어요]]. 하지만 [[피아노]]는 [[칠 줄 몰라요|g:u6-2]].", zh: "会说一点。但是不会弹钢琴。" },
      { speaker: "A", text: "[[수영]]은 [[할 줄 알아요|g:u6-2]]?", zh: "会游泳吗？" },
      { speaker: "B", text: "네, [[수영할 수 있어요|g:u6-1]]. [[내일]] [[같이]] [[가요]].", zh: "是的，会游泳。明天一起去吧。" }
    ]
  },
  {
    id: "u7", num: 7, title: "Demands, Obligations, Permission", subtitle: "Please do, don’t do, must and may.",
    context: [
      { speaker: "A", text: "[[여기]] [[앉아도 돼요|g:u7-4]]?", zh: "可以坐这里吗？" },
      { speaker: "B", text: "네, [[앉으세요|g:u7-1]]. 하지만 [[사진]]을 [[찍지 마세요|g:u7-2]].", zh: "可以，请坐。但是请不要拍照。" },
      { speaker: "A", text: "[[알겠습니다]]. [[표]]를 [[사야 돼요|g:u7-3]]?", zh: "知道了。必须买票吗？" },
      { speaker: "B", text: "아니요, [[안 사도 돼요|g:u7-6]]. [[조용히]] [[하면]] [[돼요]].", zh: "不用，不买也可以。安静一点就行。" }
    ]
  },
  {
    id: "u8", num: 8, title: "Expressions of Hope", subtitle: "Want to do and wish that something happens.",
    context: [
      { speaker: "A", text: "[[주말]]에 [[뭐]] [[하고 싶어요|g:u8-1]]?", zh: "周末想做什么？" },
      { speaker: "B", text: "[[한국]]에 [[가고 싶어요|g:u8-1]]. [[날씨]]가 [[좋았으면 좋겠어요|g:u8-2]].", zh: "想去韩国。希望天气好。" },
      { speaker: "A", text: "[[저]]도 [[같이]] [[가고 싶어요|g:u8-1]]. [[비]]가 [[안 왔으면 좋겠어요|g:u8-2]].", zh: "我也想一起去。希望不要下雨。" }
    ]
  }
);
