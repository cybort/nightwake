export type L10n = { en: string; zh: string };

export type Gun = "spread" | "lance" | "arc";

export type WeaponClass = "ballistic" | "energy" | "explosive" | "drone" | "precision";

export type Stats = {
  maxHp: number;
  regen: number;
  lifesteal: number;
  armor: number;
  dodge: number;
  crit: number;
  atkSpeed: number;
  area: number;
  luck: number;
  harvesting: number;
  speed: number;
  damage: number;
  engineering: number;
  scrapBonus: number;
};

export type ShipDef = {
  id: string;
  name: string;
  role: L10n;
  blurb: L10n;
  gun: Gun;
  hpFlat: number;
  hpMul: number;
  armor: number;
  speed: number;
  damage: number;
  crit: number;
  dodge: number;
  harvesting: number;
  luck: number;
  scrapBonus: number;
  engineering: number;
  atkSpeed: number;
  armorGain: number;
  engGain: number;
};

export type WeaponDef = {
  id: string;
  name: L10n;
  classes: WeaponClass[];
  blurb: L10n;
};

export type ItemDef = {
  id: string;
  name: L10n;
  blurb: L10n;
  cost: number;
  tier: 0 | 1 | 2 | 3;
};

export type UpgradeId =
  | "dmg"
  | "rof"
  | "hp"
  | "armor"
  | "dodge"
  | "crit"
  | "speed"
  | "harvest"
  | "luck"
  | "area"
  | "eng"
  | "scrap"
  | "regen"
  | "leech";

export const GUNS: Record<Gun, { name: L10n; blurb: L10n; color: string }> = {
  spread: {
    name: { en: "Ember Spread", zh: "余烬散射" },
    blurb: { en: "A wide fan of tracer rounds.", zh: "宽幅曳光弹扇面。" },
    color: "#ff4b3a",
  },
  lance: {
    name: { en: "Azure Lance", zh: "青蓝长枪" },
    blurb: { en: "A piercing beam that cuts a line.", zh: "贯穿一线的光束。" },
    color: "#5fd3ff",
  },
  arc: {
    name: { en: "Violet Arc", zh: "紫电锁链" },
    blurb: { en: "Lightning that locks the nearest foe.", zh: "锁定最近目标的闪电。" },
    color: "#c45bff",
  },
};

export const SHIPS: ShipDef[] = [
  {
    id: "lantern",
    name: "LANTERN",
    role: { en: "Veteran fighter", zh: "老练战机" },
    blurb: {
      en: "+5 hull, +5% speed, +8 harvesting. No penalties. Best first sortie.",
      zh: "船体 +5、速度 +5%、回收 +8，没有惩罚。第一趟最稳。",
    },
    gun: "spread",
    hpFlat: 5,
    hpMul: 1,
    armor: 0,
    speed: 0.05,
    damage: 0,
    crit: 0,
    dodge: 0,
    harvesting: 8,
    luck: 0,
    scrapBonus: 0,
    engineering: 0,
    atkSpeed: 0,
    armorGain: 1,
    engGain: 1,
  },
  {
    id: "kestrel",
    name: "KESTREL",
    role: { en: "Glass interceptor", zh: "玻璃拦截机" },
    blurb: {
      en: "+40% damage and +15% speed, but half hull and −1 armor.",
      zh: "伤害 +40%、速度 +15%，船体减半、护甲 −1。",
    },
    gun: "lance",
    hpFlat: 0,
    hpMul: 0.5,
    armor: -1,
    speed: 0.15,
    damage: 0.4,
    crit: 0,
    dodge: 0,
    harvesting: 0,
    luck: 0,
    scrapBonus: 0,
    engineering: 0,
    atkSpeed: 0,
    armorGain: 1,
    engGain: 1,
  },
  {
    id: "redoubt",
    name: "REDOUBT",
    role: { en: "Flying fortress", zh: "飞行堡垒" },
    blurb: {
      en: "+15 hull and +6 armor. Armor gains are 50% stronger. −15% speed, −10% fire rate.",
      zh: "船体 +15、护甲 +6，护甲收益额外 +50%。速度 −15%，射速 −10%。",
    },
    gun: "spread",
    hpFlat: 15,
    hpMul: 1,
    armor: 6,
    speed: -0.15,
    damage: 0,
    crit: 0,
    dodge: 0,
    harvesting: 0,
    luck: 0,
    scrapBonus: 0,
    engineering: 0,
    atkSpeed: -0.1,
    armorGain: 1.5,
    engGain: 1,
  },
  {
    id: "swarm",
    name: "SWARM",
    role: { en: "Drone carrier", zh: "无人机母舰" },
    blurb: {
      en: "+5 engineering, and engineering upgrades are 50% stronger. −10% damage.",
      zh: "工程 +5，工程升级效果 +50%。伤害 −10%。",
    },
    gun: "spread",
    hpFlat: 0,
    hpMul: 1,
    armor: 0,
    speed: 0,
    damage: -0.1,
    crit: 0,
    dodge: 0,
    harvesting: 0,
    luck: 0,
    scrapBonus: 0,
    engineering: 5,
    atkSpeed: 0,
    armorGain: 1,
    engGain: 1.5,
  },
  {
    id: "wraith",
    name: "WRAITH",
    role: { en: "Arc assassin", zh: "电弧刺客" },
    blurb: {
      en: "Starts on Violet Arc. +15% crit, +10% dodge, −3 armor, −2 hull.",
      zh: "开局就是紫电。暴击 +15%、闪避 +10%，护甲 −3、船体 −2。",
    },
    gun: "arc",
    hpFlat: -2,
    hpMul: 1,
    armor: -3,
    speed: 0.04,
    damage: 0,
    crit: 0.15,
    dodge: 0.1,
    harvesting: 0,
    luck: 0,
    scrapBonus: 0,
    engineering: 0,
    atkSpeed: 0,
    armorGain: 1,
    engGain: 1,
  },
  {
    id: "coffer",
    name: "COFFER",
    role: { en: "Scrap hunter", zh: "残片猎手" },
    blurb: {
      en: "+40 luck, +15 harvesting, +10% scrap. −10% damage. Luck multiplies drop rates from wave 1, and shop tier weights once the wave has grown them.",
      zh: "幸运 +40、回收 +15、残片 +10%，伤害 −10%。幸运从第 1 波就放大掉落；货架高阶要等波次先长出权重，再被幸运放大。",
    },
    gun: "spread",
    hpFlat: 0,
    hpMul: 1,
    armor: 0,
    speed: 0,
    damage: -0.1,
    crit: 0,
    dodge: 0,
    harvesting: 15,
    luck: 40,
    scrapBonus: 0.1,
    engineering: 0,
    atkSpeed: 0,
    armorGain: 1,
    engGain: 1,
  },
];

export const WEAPONS: WeaponDef[] = [
  { id: "tracer", name: { en: "Tracer Pod", zh: "曳光荚舱" }, classes: ["ballistic"], blurb: { en: "A tight spread of tracer rounds.", zh: "一小簇曳光弹。" } },
  { id: "rotary", name: { en: "Rotary", zh: "转管炮" }, classes: ["ballistic"], blurb: { en: "Very high fire rate, light rounds.", zh: "射速极高的轻弹。" } },
  { id: "scatter", name: { en: "Scatter", zh: "散弹" }, classes: ["ballistic"], blurb: { en: "Short-range burst that shreds anything close.", zh: "近距爆发，撕碎贴脸目标。" } },
  { id: "bore", name: { en: "Slug Bore", zh: "穿甲钉" }, classes: ["ballistic", "precision"], blurb: { en: "A hypersonic slug that pierces a line.", zh: "超高速弹钉，直线穿透。" } },
  { id: "lance", name: { en: "Lance Bolt", zh: "枪矛弹" }, classes: ["energy"], blurb: { en: "Piercing bolts. Pierce grows with tier.", zh: "穿透光弹，阶级越高穿透越多。" } },
  { id: "arc", name: { en: "Arc Chain", zh: "连锁电弧" }, classes: ["energy", "precision"], blurb: { en: "Locks the nearest foe and chains.", zh: "锁定最近敌人并连锁。" } },
  { id: "ring", name: { en: "Pulse Ring", zh: "脉冲环" }, classes: ["energy"], blurb: { en: "An expanding ring that erases bullets.", zh: "扩散的环，擦掉敌弹。" } },
  { id: "seeker", name: { en: "Seeker", zh: "追踪弹" }, classes: ["explosive"], blurb: { en: "Homing missiles with a small blast.", zh: "小范围爆炸的追踪导弹。" } },
  { id: "warhead", name: { en: "Warhead", zh: "重弹头" }, classes: ["explosive"], blurb: { en: "Slow missile, huge blast.", zh: "慢速导弹，爆炸范围很大。" } },
  { id: "canister", name: { en: "Canister", zh: "子母弹" }, classes: ["explosive"], blurb: { en: "Bursts into a ring of bomblets.", zh: "炸开成一圈子弹。" } },
  { id: "wing", name: { en: "Wing Drone", zh: "僚机" }, classes: ["drone"], blurb: { en: "Orbits you and shoots what it sees.", zh: "环绕机体，自动射击。" } },
  { id: "aegis", name: { en: "Aegis Orb", zh: "护盾球" }, classes: ["drone", "energy"], blurb: { en: "Orbits, blocks shots, burns on contact.", zh: "环绕、挡弹、接触灼烧。" } },
];

export const ITEMS: ItemDef[] = [
  { id: "coin", name: { en: "Lucky Slug", zh: "幸运弹壳" }, blurb: { en: "+10 luck, −2% damage. Hangar prints the four tier odds.", zh: "幸运 +10，伤害 −2%。机库会印出四档货架几率。" }, cost: 28, tier: 0 },
  { id: "magnet", name: { en: "Magnet Rig", zh: "磁吸架" }, blurb: { en: "Pickups pull from much farther away.", zh: "拾取范围大幅增加。" }, cost: 25, tier: 0 },
  { id: "plate", name: { en: "Keel Plate", zh: "龙骨装甲" }, blurb: { en: "+3 armor.", zh: "护甲 +3。" }, cost: 32, tier: 0 },
  { id: "harvest", name: { en: "Harvest Rig", zh: "回收架" }, blurb: { en: "+20 harvesting. This is scrap, not luck.", zh: "回收 +20。这是残片，不是幸运。" }, cost: 36, tier: 0 },
  { id: "field", name: { en: "Field Kit", zh: "战地组件" }, blurb: { en: "+18 hull.", zh: "船体 +18。" }, cost: 30, tier: 0 },
  { id: "graze", name: { en: "Graze Coil", zh: "擦弹线圈" }, blurb: { en: "Near misses drip scrap.", zh: "擦弹会掉一点残片。" }, cost: 34, tier: 0 },
  { id: "medal", name: { en: "Ash Medal", zh: "灰勋章" }, blurb: { en: "+6 luck, +5% scrap, −5% damage.", zh: "幸运 +6，残片 +5%，伤害 −5%。" }, cost: 40, tier: 1 },
  { id: "overclock", name: { en: "Overclock", zh: "超频" }, blurb: { en: "+20% fire rate, −10 hull.", zh: "射速 +20%，船体 −10。" }, cost: 40, tier: 1 },
  { id: "bay", name: { en: "Bomb Rack", zh: "炸弹挂架" }, blurb: { en: "Carry one more bomb, and gain one now.", zh: "炸弹上限 +1，并立刻获得一枚。" }, cost: 38, tier: 1 },
  { id: "lens", name: { en: "Crit Lens", zh: "暴击透镜" }, blurb: { en: "+12% crit.", zh: "暴击 +12%。" }, cost: 40, tier: 1 },
  { id: "dronebay", name: { en: "Drone Bay", zh: "无人机舱" }, blurb: { en: "+4 engineering.", zh: "工程 +4。" }, cost: 36, tier: 1 },
  { id: "canopy", name: { en: "Glass Canopy", zh: "玻璃座舱" }, blurb: { en: "+25% damage, −5 hull.", zh: "伤害 +25%，船体 −5。" }, cost: 75, tier: 2 },
  { id: "piggy", name: { en: "Ash Bank", zh: "灰烬银行" }, blurb: { en: "Each hangar pays 8% interest on scrap.", zh: "每次进库，残片结息 8%。" }, cost: 42, tier: 2 },
  { id: "phoenix", name: { en: "Cinder Plume", zh: "余烬羽" }, blurb: { en: "Once per run, revive at 40% hull.", zh: "每局一次，以 40% 船体复活。" }, cost: 110, tier: 3 },
];

export const UPGRADES: { id: UpgradeId; name: L10n; blurb: L10n }[] = [
  { id: "dmg", name: { en: "War Load", zh: "战装填" }, blurb: { en: "+8% damage", zh: "伤害 +8%" } },
  { id: "rof", name: { en: "Feed Belt", zh: "供弹带" }, blurb: { en: "+10% fire rate", zh: "射速 +10%" } },
  { id: "hp", name: { en: "Spare Plates", zh: "备用装甲" }, blurb: { en: "+12 hull", zh: "船体 +12" } },
  { id: "armor", name: { en: "Layered Hull", zh: "层叠船体" }, blurb: { en: "+1 armor", zh: "护甲 +1" } },
  { id: "dodge", name: { en: "Slip Stream", zh: "滑流" }, blurb: { en: "+4% dodge", zh: "闪避 +4%" } },
  { id: "crit", name: { en: "Needle Sight", zh: "针式瞄具" }, blurb: { en: "+5% crit", zh: "暴击 +5%" } },
  { id: "speed", name: { en: "Afterburn", zh: "加力" }, blurb: { en: "+6% speed", zh: "速度 +6%" } },
  { id: "harvest", name: { en: "Salvage Crew", zh: "打捞组" }, blurb: { en: "+8 harvesting", zh: "回收 +8" } },
  { id: "luck", name: { en: "Hot Dice", zh: "热骰" }, blurb: { en: "+8 luck. Multiplies drops now, and shop tier weights once the wave has any.", zh: "幸运 +8。立刻放大掉落；有高阶权重之后，也放大货架几率。" } },
  { id: "area", name: { en: "Wide Bore", zh: "宽口径" }, blurb: { en: "+8% area", zh: "范围 +8%" } },
  { id: "eng", name: { en: "Workshop", zh: "工坊" }, blurb: { en: "+1 engineering", zh: "工程 +1" } },
  { id: "scrap", name: { en: "Greedy Hold", zh: "贪舱" }, blurb: { en: "+5% scrap", zh: "残片 +5%" } },
  { id: "regen", name: { en: "Patch Nanites", zh: "修补纳米" }, blurb: { en: "+0.35 regen", zh: "再生 +0.35" } },
  { id: "leech", name: { en: "Leech Coil", zh: "吸血线圈" }, blurb: { en: "+3% life steal", zh: "生命偷取 +3%" } },
];

export const CLASS_NOTES: { id: WeaponClass; name: L10n; bonus: L10n }[] = [
  { id: "ballistic", name: { en: "Ballistic", zh: "实弹" }, bonus: { en: "2: +12% fire rate. 4: +20% damage.", zh: "2 件：射速 +12%。4 件：伤害 +20%。" } },
  { id: "energy", name: { en: "Energy", zh: "能量" }, bonus: { en: "2: +1 pierce. 4: +18% damage.", zh: "2 件：穿透 +1。4 件：伤害 +18%。" } },
  { id: "explosive", name: { en: "Explosive", zh: "爆炸" }, bonus: { en: "2: +25% blast. 4: kills drop extra scrap.", zh: "2 件：爆炸 +25%。4 件：击杀额外掉残片。" } },
  { id: "drone", name: { en: "Drone", zh: "无人机" }, bonus: { en: "2: +30% drone damage. 4: an extra orbiting shot.", zh: "2 件：无人机伤害 +30%。4 件：额外一发环绕射击。" } },
  { id: "precision", name: { en: "Precision", zh: "精准" }, bonus: { en: "2: +8% crit. 4: crits hit harder.", zh: "2 件：暴击 +8%。4 件：暴击更痛。" } },
];

export const BOSSES: { wave: number; name: string; blurb: L10n }[] = [
  { wave: 5, name: "CINDER WALKER", blurb: { en: "A ground walker that opens the bullet curtain.", zh: "地面步行机，第一次拉开弹幕。" } },
  { wave: 10, name: "AEGIS KEEP", blurb: { en: "An airborne fort with layered guns.", zh: "空中要塞，火力分层。" } },
  { wave: 15, name: "IRON KEEL", blurb: { en: "A dreadnought that asks if your build can burst.", zh: "无畏舰，考验你的爆发。" } },
  { wave: 20, name: "PRISM NEXUS", blurb: { en: "The last mothership of the run.", zh: "这一局的最后母舰。" } },
];

export const STARTER_WEAPONS = ["tracer", "lance", "seeker", "wing"];

export function shipById(id: string) {
  return SHIPS.find((s) => s.id === id) ?? SHIPS[0];
}

export function weaponById(id: string) {
  return WEAPONS.find((w) => w.id === id) ?? WEAPONS[0];
}

export function itemById(id: string) {
  return ITEMS.find((i) => i.id === id);
}

export function baseStats(): Stats {
  return {
    maxHp: 100,
    regen: 0,
    lifesteal: 0,
    armor: 0,
    dodge: 0,
    crit: 0.02,
    atkSpeed: 0,
    area: 0,
    luck: 0,
    harvesting: 0,
    speed: 0,
    damage: 0,
    engineering: 0,
    scrapBonus: 0,
  };
}

export function shipStats(id: string): Stats {
  const ship = shipById(id);
  const s = baseStats();
  s.maxHp = Math.max(24, Math.round(s.maxHp * ship.hpMul + ship.hpFlat));
  s.armor += ship.armor;
  s.speed += ship.speed;
  s.damage += ship.damage;
  s.crit += ship.crit;
  s.dodge += ship.dodge;
  s.harvesting += ship.harvesting;
  s.luck += ship.luck;
  s.scrapBonus += ship.scrapBonus;
  s.engineering += ship.engineering;
  s.atkSpeed += ship.atkSpeed;
  return s;
}
