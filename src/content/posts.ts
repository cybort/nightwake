export type Post = {
  slug: string;
  date: string;
  title: { en: string; zh: string };
  excerpt: { en: string; zh: string };
  body: { en: string[]; zh: string[] };
};

export const POSTS: Post[] = [
  {
    slug: "first-sortie",
    date: "2026-10-10",
    title: { en: "First sortie: clear the opening waves", zh: "第一趟出击：先活过开场" },
    excerpt: {
      en: "Ship pick, main gun, scrap and the hangar — enough to survive the walker.",
      zh: "机体、主炮、残片和机库，够你活过第一台步行机。",
    },
    body: {
      en: [
        "Start on LANTERN at danger 0. The hull is honest, the speed is enough, and harvesting quietly pays for the second shop.",
        "Your main gun cycles when you grab a crystal of another colour. The same colour levels it, up to 8. Item carriers are brighter and worth leaving the lane for.",
        "Scrap you miss is not gone. It sits in a salvage bag and pays a slice back the next time you catch a drop. Still, walking over the sparkle is faster.",
        "Between waves, take the level-up before you shop. Lock a pod you cannot afford. Two copies of the same tier fuse into the next one, which is usually better than a sixth unrelated gun.",
        "The first boss, Cinder Walker, telegraphs a fan and then a ring. Hold Shift to thread it. Save the bomb for the moment the pattern changes, not for the first scratch.",
      ],
      zh: [
        "危险 0，先用 LANTERN。船体老实，速度够用，回收会悄悄付得起第二次购物。",
        "主炮靠晶体换色。拿到当前颜色就升级，最高 8 级。换色则切换枪种。载具比普通敌机亮，值得偏一下航线。",
        "漏掉的残片进回收袋，下次拾取时返还一小部分。能踩到还是直接踩。",
        "进库先选升级再买。买不起的货先锁住。两件同阶同名荚舱融合成更高一阶，通常好过第六把不相关的枪。",
        "第一台头目灰烬步行机会先扇射再画环。按住 Shift 穿缝。炸弹留给阶段切换，不要用来治擦伤。",
      ],
    },
  },
  {
    slug: "weapon-classes",
    date: "2026-10-10",
    title: { en: "Twelve pods, five classes", zh: "十二个荚舱，五个系" },
    excerpt: {
      en: "How set bonuses actually change a Nightwake build.",
      zh: "套装在夜航里到底改了什么。",
    },
    body: {
      en: [
        "Pods fire beside the main gun. Each belongs to one or two classes: ballistic, energy, explosive, drone, precision.",
        "Two ballistic pods speed the whole trigger up. Four of them also fatten ballistic damage. Energy's second piece adds pierce; the fourth multiplies energy damage.",
        "Explosives grow their blast at two pieces, and at four a kill drops extra scrap. Drones hit harder at two, and four adds another orbiting shot even if you did not mount a fifth drone.",
        "Precision is the quiet one: crit chance, then harder crits. Slug Bore and Arc Chain are the bridges, because they count for two classes at once.",
        "Do not buy six different icons. Pick a lane by wave 4 and let the shop locks defend it.",
      ],
      zh: [
        "荚舱跟在主炮旁边自动开火。每件属于一个或两个系：实弹、能量、爆炸、无人机、精准。",
        "两件实弹提高整体射速，四件再加实弹伤害。能量两件加穿透，四件提高能量伤害。",
        "爆炸两件扩大范围，四件击杀额外掉残片。无人机两件加伤害，四件即使没有第五台也会多一发环绕射击。",
        "精准最安静：先加暴击率，再加暴击伤害。穿甲钉和连锁电弧同时算两个系。",
        "不要六把各买一把。第 4 波前选定路线，用锁定保住它。",
      ],
    },
  },
  {
    slug: "mixing-guns",
    date: "2026-10-11",
    title: { en: "Ballistic and energy in one rack", zh: "实弹和能量能装在一起吗" },
    excerpt: {
      en: "They do not cancel. Here is what still scales.",
      zh: "它们不会互相取消。真正吃加成的是这些。",
    },
    body: {
      en: [
        "A tracer pod does not turn your lance off. Classes only count their own pods. A mixed rack simply takes longer to reach a 4-piece bonus.",
        "The main gun is separate. Ember Spread enjoys ballistic bonuses. Azure Lance and Violet Arc enjoy energy pierce and the energy damage multiplier.",
        "A practical mix is three ballistic plus Slug Bore. Bore feeds both ballistic and precision, so the rack is not as split as it looks.",
        "If the shop offers a fourth explosive and you are on drones, sell it unless it completes a pair you already started. Interest from the Ash Bank will not save a build with no set.",
      ],
      zh: [
        "曳光荚舱不会关掉你的长枪。系只数自己的荚舱。混装只是更慢摸到四件套。",
        "主炮另算。余烬散射吃实弹加成。青蓝长枪和紫电吃能量穿透和能量伤害。",
        "一套能用的混装是三件实弹加穿甲钉。穿甲钉同时算实弹和精准，看起来分裂，其实没有那么散。",
        "如果你在走无人机，商店丢来第四件爆炸，除非它刚好凑成已有的一对，否则卖掉。灰烬银行的利息救不了一个没有套装的构筑。",
      ],
    },
  },
  {
    slug: "plane-notes",
    date: "2026-10-13",
    title: { en: "What a browser plane shmup is for", zh: "浏览器飞机射击用来干什么" },
    excerpt: {
      en: "Short runs, no install, and why the hangar is the real stage.",
      zh: "短局、免安装，以及为什么真正的舞台在机库。",
    },
    body: {
      en: [
        "A vertical plane game asks one question at a time: can you be in the gap when the bullet arrives. Nightwake keeps that question and then lands the fighter.",
        "The clock is the level. You do not have to kill everything. You have to be alive when it hits zero. Killing a boss early just pays you in crates.",
        "That is the split from a pure arcade score attack. Scrap is both money and experience, so a greedy line through the wave is also a build decision.",
        "Play it in a tab the way you would play a round of cards. Danger 0 is the tutorial. Danger 5 is for when the focus button feels slow.",
      ],
      zh: [
        "纵版飞机游戏一次只问一件事：弹来的时候你在不在缝里。夜航保留这个问题，然后让飞机降落。",
        "时钟就是关卡。不必杀光。归零时还活着即可。提前打掉头目只是多给箱子。",
        "这和纯街机刷分不一样。残片既是钱也是经验，贪一条航线本身就是构筑决定。",
        "把它当成一局牌来打。危险 0 是教学。危险 5 留给你觉得精瞄键太慢的时候。",
      ],
    },
  },
];

export function postBySlug(slug: string) {
  return POSTS.find((p) => p.slug === slug);
}
