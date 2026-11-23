/* Grammar data: Unit 3 — Particles */
window.GRAMMAR_ITEMS.push(
  {
    id: "u3-1", unit: "u3", num: 1, title: "N이/가", pattern: "N이/가",
    summary: "Mark the subject of a sentence or new information.",
    formation: ["받침 O: 책 + 이 → 책이", "받침 X: 날씨 + 가 → 날씨가", "Question: 누가, 무엇이"],
    examples: [["책이 있어요.", "有书。"], ["날씨가 좋아요.", "天气很好。"]],
    blank: "책이", blank2: "날씨가", distractors: ["책을", "날씨가"],
    forms: ["책이", "날씨가"], tip: "이/가 often introduces new information; 은/는 marks something already known or contrasted."
  },
  {
    id: "u3-2", unit: "u3", num: 2, title: "N은/는", pattern: "N은/는",
    summary: "Mark the topic or make a contrast.",
    formation: ["받침 O: 학생 + 은 → 학생은", "받침 X: 저 + 는 → 저는", "Contrast: 커피는 좋아요, 차는 싫어요"],
    examples: [["저는 학생이에요.", "我是学生。"], ["오늘은 추워요.", "今天很冷。"]],
    blank: "저는", blank2: "오늘은", distractors: ["저가", "오늘이"],
    forms: ["저는", "오늘은"], tip: "은/는 is not simply a subject marker; it sets the topic or contrasts with something else."
  },
  {
    id: "u3-3", unit: "u3", num: 3, title: "N을/를", pattern: "N을/를",
    summary: "Mark the object of a transitive verb.",
    formation: ["받침 O: 밥 + 을 → 밥을", "받침 X: 책 + 를 → 책을", "With 하다 verbs: 공부를 하다"],
    examples: [["밥을 먹어요.", "吃饭。"], ["책을 읽어요.", "读书。"]],
    blank: "밥을", blank2: "책을", distractors: ["밥이", "책이"],
    forms: ["밥을", "책을"], tip: "Many 하다 verbs take 을/를 on the noun: 공부를 하다, 운동을 하다."
  },
  {
    id: "u3-4", unit: "u3", num: 4, title: "N와/과, N(이)랑, N하고", pattern: "N와/과 / N(이)랑 / N하고",
    summary: "Say “and” or “with” between nouns.",
    formation: ["받침 O: 책 + 과 → 책과", "받침 X: 친구 + 와 → 친구와", "Casual: 친구랑, 친구하고"],
    examples: [["친구와 영화를 봐요.", "和朋友看电影。"], ["빵하고 우유를 샀어요.", "买了面包和牛奶。"]],
    blank: "친구와", blank2: "빵하고", distractors: ["친구에", "빵에"],
    forms: ["친구와", "빵하고"], tip: "와/과 is written style; 하고 and (이)랑 are common in speech. Use 과 after a consonant, 와 after a vowel."
  },
  {
    id: "u3-5", unit: "u3", num: 5, title: "N의", pattern: "N의 N",
    summary: "Show possession: “N’s N.”",
    formation: ["친구의 책", "회사의 이름", "Often omitted in speech: 제 친구 책"],
    examples: [["제 친구의 책이에요.", "是我朋友的书。"], ["회사의 이름이 뭐예요?", "公司名字是什么？"]],
    blank: "친구의", blank2: "회사의", distractors: ["친구에", "회사에"],
    forms: ["친구의", "회사의"], tip: "In everyday speech, 의 is often pronounced 에 or dropped: 친구 책."
  },
  {
    id: "u3-6", unit: "u3", num: 6, title: "N에 ①", pattern: "N에 (time / existence)",
    summary: "Mark a time or the place where something exists.",
    formation: ["Time: 3시에 만나요", "Existence: 집에 있어요", "Action location uses 에서: 도서관에서 공부해요"],
    examples: [["3시에 만나요.", "三点见。"], ["집에 있어요.", "在家。"]],
    blank: "3시에", blank2: "집에", distractors: ["3시에서", "집에서"],
    forms: ["3시에", "집에"], tip: "에 marks a point in time or a location of existence; 에서 marks where an action happens."
  },
  {
    id: "u3-7", unit: "u3", num: 7, title: "N에 ②", pattern: "N에 (destination)",
    summary: "Mark a destination with movement verbs.",
    formation: ["학교에 가요", "한국에 와요", "집에 돌아가요"],
    examples: [["학교에 가요.", "去学校。"], ["한국에 왔어요.", "来到了韩国。"]],
    blank: "학교에", blank2: "한국에", distractors: ["학교에서", "한국에서"],
    forms: ["학교에", "한국에"], tip: "With 가다/오다, 에 is the destination; 에서 is the starting point or place of action."
  },
  {
    id: "u3-8", unit: "u3", num: 8, title: "N에서", pattern: "N에서",
    summary: "Mark where an action happens, or “from” a place.",
    formation: ["Action location: 도서관에서 공부해요", "Origin: 중국에서 왔어요", "With action verbs, use 에서 not 에"],
    examples: [["도서관에서 공부해요.", "在图书馆学习。"], ["중국에서 왔어요.", "从中国来。"]],
    blank: "도서관에서", blank2: "중국에서", distractors: ["도서관에", "중국에"],
    forms: ["도서관에서", "중국에서"], tip: "에서 marks the place where an action takes place; 에 is for existence or destination."
  },
  {
    id: "u3-9", unit: "u3", num: 9, title: "N에서 N까지, N부터 N까지", pattern: "N에서 N까지 / N부터 N까지",
    summary: "Say “from … to …” for places or times.",
    formation: ["Place: 집에서 학교까지", "Time: 9시부터 5시까지", "까지 marks the endpoint"],
    examples: [["집에서 학교까지 걸어요.", "从家走到学校。"], ["9시부터 5시까지 일해요.", "从九点工作到五点。"]],
    blank: "집에서 학교까지", blank2: "9시부터 5시까지", distractors: ["집에 학교에", "9시에 5시에"],
    forms: ["집에서", "학교까지", "9시부터", "5시까지"], tip: "For time, 부터…까지 is common; for places, 에서…까지."
  },
  {
    id: "u3-10", unit: "u3", num: 10, title: "N에게/한테", pattern: "N에게 / N한테",
    summary: "Mark the person who receives an action.",
    formation: ["에게 (written/polite): 친구에게 전화했어요", "한테 (casual): 친구한테 전화했어요", "Honorific: 선생님께"],
    examples: [["친구에게 전화했어요.", "给朋友打了电话。"], ["선생님한테 물었어요.", "问了老师。"]],
    blank: "친구에게", blank2: "선생님한테", distractors: ["친구에서", "선생님에서"],
    forms: ["친구에게", "선생님한테"], tip: "에게/한테 is for people and animals; for places use 에."
  },
  {
    id: "u3-11", unit: "u3", num: 11, title: "N도", pattern: "N도",
    summary: "Say “also” or “too.”",
    formation: ["저도 학생이에요", "커피도 마셔요", "Replace 은/는/이/가/을/를"],
    examples: [["저도 학생이에요.", "我也是学生。"], ["커피도 마셔요.", "也喝咖啡。"]],
    blank: "저도", blank2: "커피도", distractors: ["저만", "커피만"],
    forms: ["저도", "커피도"], tip: "도 replaces the subject/object particle: 저도 (not 저는도)."
  },
  {
    id: "u3-12", unit: "u3", num: 12, title: "N만", pattern: "N만",
    summary: "Say “only” or “just.”",
    formation: ["물만 마셔요", "한 명만 왔어요", "Can replace subject/object particles"],
    examples: [["물만 마셔요.", "只喝水。"], ["한 명만 왔어요.", "只来了一个人。"]],
    blank: "물만", blank2: "한 명만", distractors: ["물도", "한 명도"],
    forms: ["물만", "한 명만"], tip: "만 can attach after other particles too: 집에만 있어요 (only at home)."
  },
  {
    id: "u3-13", unit: "u3", num: 13, title: "N밖에", pattern: "N밖에 + negative",
    summary: "Say “only” with a negative predicate.",
    formation: ["물밖에 없어요", "한 명밖에 안 왔어요", "Always pairs with a negative"],
    examples: [["물밖에 없어요.", "只有水。"], ["한 명밖에 안 왔어요.", "只来了一个人。"]],
    blank: "물밖에", blank2: "한 명밖에", distractors: ["물만", "한 명만"],
    forms: ["물밖에", "한 명밖에"], tip: "밖에 requires a negative ending: 없어요, 안 왔어요, 못 해요."
  },
  {
    id: "u3-14", unit: "u3", num: 14, title: "N(으)로", pattern: "N(으)로",
    summary: "Mark direction, means, or material.",
    formation: ["받침 O (ㄹ 제외): 집 + 으로 → 집으로", "받침 X 또는 ㄹ: 학교 + 로 → 학교로, 서울 + 로 → 서울로", "Means: 버스로 왔어요"],
    examples: [["학교로 가요.", "往学校去。"], ["버스로 왔어요.", "坐公交车来的。"]],
    blank: "학교로", blank2: "버스로", distractors: ["학교에서", "버스에"],
    forms: ["학교로", "버스로"], tip: "으로 after a consonant (except ㄹ), 로 after a vowel or ㄹ: 집으로, 서울로."
  },
  {
    id: "u3-15", unit: "u3", num: 15, title: "N(이)나 ①", pattern: "N(이)나",
    summary: "Say “or” between two nouns.",
    formation: ["받침 O: 책 + 이나 → 책이나", "받침 X: 커피 + 나 → 커피나", "Choose one of two options"],
    examples: [["커피나 차를 마셔요.", "喝咖啡或茶。"], ["버스나 지하철을 타요.", "坐公交车或地铁。"]],
    blank: "커피나", blank2: "버스나", distractors: ["커피와", "버스와"],
    forms: ["커피나", "버스나"], tip: "나/이나 connects nouns; 거나 connects verbs/adjectives."
  },
  {
    id: "u3-16", unit: "u3", num: 16, title: "N(이)나 ②", pattern: "N(이)나",
    summary: "Express surprise that a number is larger than expected.",
    formation: ["다섯 개나 먹었어요", "세 시간이나 기다렸어요", "Often with numbers/counters"],
    examples: [["사과를 다섯 개나 먹었어요.", "吃了五个苹果之多。"], ["세 시간이나 기다렸어요.", "等了三个小时之久。"]],
    blank: "다섯 개나", blank2: "세 시간이나", distractors: ["다섯 개만", "세 시간만"],
    forms: ["다섯 개나", "세 시간이나"], tip: "The nuance is “as many as / as long as,” often with surprise or complaint."
  },
  {
    id: "u3-17", unit: "u3", num: 17, title: "N쯤", pattern: "N쯤",
    summary: "Say “about” or “approximately.”",
    formation: ["3시쯤 만나요", "10명쯤 왔어요", "Can attach to time, number, amount"],
    examples: [["3시쯤 만나요.", "三点左右见。"], ["10명쯤 왔어요.", "来了十个人左右。"]],
    blank: "3시쯤", blank2: "10명쯤", distractors: ["3시만", "10명만"],
    forms: ["3시쯤", "10명쯤"], tip: "쯤 is more common in speech; 정도 is a similar written alternative."
  },
  {
    id: "u3-18", unit: "u3", num: 18, title: "N처럼/N같이", pattern: "N처럼 / N같이",
    summary: "Say “like” or “as … as.”",
    formation: ["친구처럼 노래해요", "물같이 맑아요", "처럼 and 같이 are interchangeable here"],
    examples: [["친구처럼 노래해요.", "像朋友一样唱歌。"], ["물같이 맑아요.", "像水一样清澈。"]],
    blank: "친구처럼", blank2: "물같이", distractors: ["친구보다", "물보다"],
    forms: ["친구처럼", "물같이"], tip: "For “different from,” use 와/과 다르다, not 처럼."
  },
  {
    id: "u3-19", unit: "u3", num: 19, title: "N보다", pattern: "N보다",
    summary: "Compare two things: “more … than.”",
    formation: ["고기가 생선보다 비싸요", "오늘은 어제보다 더워요", "Often with 더"],
    examples: [["고기가 생선보다 비싸요.", "肉比鱼贵。"], ["오늘은 어제보다 더워요.", "今天比昨天热。"]],
    blank: "생선보다", blank2: "어제보다", distractors: ["생선처럼", "어제처럼"],
    forms: ["생선보다", "어제보다"], tip: "The standard is marked by 보다; the topic is marked by 은/는 or 이/가."
  },
  {
    id: "u3-20", unit: "u3", num: 20, title: "N마다", pattern: "N마다",
    summary: "Say “every” or “each.”",
    formation: ["날마다 운동해요", "주말마다 영화를 봐요", "Can attach to people: 사람마다"],
    examples: [["날마다 운동해요.", "每天运动。"], ["주말마다 영화를 봐요.", "每个周末看电影。"]],
    blank: "날마다", blank2: "주말마다", distractors: ["날만", "주말만"],
    forms: ["날마다", "주말마다"], tip: "마다 means “every/each” without exception; it is stronger than 자주."
  }
);

window.GRAMMAR_UNITS.push({
  id: "u3", num: 3, title: "Particles", subtitle: "The little markers that tell you who does what, where and when.",
  context: [
    { speaker: "A", text: "[[주말]][[에|g:u3-6]] [[친구]][[와|g:u3-4]] [[뭐]] [[했어요]]?", zh: "周末和朋友做了什么？" },
    { speaker: "B", text: "[[도서관]][[에서|g:u3-8]] [[책]][[을|g:u3-3]] [[읽었어요]]. [[커피]][[도|g:u3-11]] [[마셨어요]].", zh: "在图书馆读了书，也喝了咖啡。" },
    { speaker: "A", text: "[[몇 시]][[부터|g:u3-9]] [[몇 시]][[까지|g:u3-9]] [[있었어요]]?", zh: "从几点待到几点？" },
    { speaker: "B", text: "[[아홉 시]][[부터|g:u3-9]] [[한 시]][[까지|g:u3-9]] [[있었어요]]. [[집]][[까지|g:u3-9]] [[걸어서 갔어요]].", zh: "从九点待到一点。走回家了。" }
  ]
});
