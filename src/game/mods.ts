export type ModTier = 0 | 1 | 2 | 3;

export type ModKey = "hull" | "fire" | "scrap" | "pressure" | "bombs";

export type Mods = Record<ModKey, ModTier>;

export const STOCK: Mods = { hull: 0, fire: 0, scrap: 0, pressure: 0, bombs: 0 };

type TierCopy = { en: string; zh: string; hintEn: string; hintZh: string };

export const DIALS: { key: ModKey; en: string; zh: string; tiers: [TierCopy, TierCopy, TierCopy, TierCopy] }[] = [
  {
    key: "hull",
    en: "Hull",
    zh: "船体",
    tiers: [
      { en: "Stock", zh: "原装", hintEn: "Damage lands as written.", hintZh: "受伤与原版一致。" },
      { en: "Plate", zh: "加固", hintEn: "Incoming damage ×0.65.", hintZh: "受到的伤害 ×0.65。" },
      { en: "Iron", zh: "铁甲", hintEn: "Incoming damage ×0.35.", hintZh: "受到的伤害 ×0.35。" },
      { en: "Undying", zh: "不灭", hintEn: "You cannot be hurt.", hintZh: "完全不受伤。" },
    ],
  },
  {
    key: "fire",
    en: "Fire",
    zh: "火力",
    tiers: [
      { en: "Stock", zh: "原装", hintEn: "Your guns are unchanged.", hintZh: "火力与原版一致。" },
      { en: "Hot", zh: "过热", hintEn: "Damage ×1.6.", hintZh: "伤害 ×1.6。" },
      { en: "Overload", zh: "超载", hintEn: "Damage ×2.4, fire rate ×1.25.", hintZh: "伤害 ×2.4，射速 ×1.25。" },
      { en: "Erase", zh: "歼灭", hintEn: "Damage ×4, fire rate ×1.6.", hintZh: "伤害 ×4，射速 ×1.6。" },
    ],
  },
  {
    key: "scrap",
    en: "Scrap",
    zh: "残片",
    tiers: [
      { en: "Stock", zh: "原装", hintEn: "Drops and prices are unchanged.", hintZh: "掉落和标价与原版一致。" },
      { en: "Tip", zh: "小费", hintEn: "Scrap gained ×2.", hintZh: "残片收益 ×2。" },
      { en: "Vault", zh: "金库", hintEn: "Scrap ×4, +50 at launch, shop leans higher tier.", hintZh: "残片收益 ×4，开局 +50，商店更容易出高阶。" },
      { en: "Infinite", zh: "无限", hintEn: "Buys are free, wallet stays at least 999, shop leans top tier.", hintZh: "购买不扣残片，钱包至少 999，商店偏向高阶。" },
    ],
  },
  {
    key: "pressure",
    en: "Pressure",
    zh: "敌压",
    tiers: [
      { en: "Stock", zh: "原装", hintEn: "Waves spawn as written.", hintZh: "敌群与原版一致。" },
      { en: "Sparse", zh: "稀疏", hintEn: "Slower spawns, enemy hull ×0.8.", hintZh: "刷新变慢，敌血 ×0.8。" },
      { en: "Drill", zh: "演习", hintEn: "Much slower spawns, enemy hull ×0.55, shots ×0.6.", hintZh: "刷新更慢，敌血 ×0.55，敌弹伤害 ×0.6。" },
      { en: "Range", zh: "靶场", hintEn: "Few fodder, hull ×0.35, shots ×0.35. Bosses still arrive.", hintZh: "小怪很少，敌血 ×0.35，敌弹 ×0.35。首领仍会来。" },
    ],
  },
  {
    key: "bombs",
    en: "Bombs",
    zh: "炸弹",
    tiers: [
      { en: "Stock", zh: "原装", hintEn: "Two bombs, cap of 3.", hintZh: "两枚起步，上限 3。" },
      { en: "Spare", zh: "备弹", hintEn: "Cap +2, and the bay fills now.", hintZh: "上限 +2，并立刻补满。" },
      { en: "Full", zh: "满仓", hintEn: "Cap of at least 6, refilled every hangar.", hintZh: "上限至少 6，每次回机库补满。" },
      { en: "Infinite", zh: "无限", hintEn: "Bombs are never spent.", hintZh: "炸弹不会被消耗。" },
    ],
  },
];

export const PRESETS: { id: string; en: string; zh: string; mods: Mods }[] = [
  { id: "stock", en: "Stock", zh: "原装", mods: { ...STOCK } },
  { id: "cruise", en: "Cruise", zh: "休闲", mods: { hull: 1, fire: 1, scrap: 1, pressure: 1, bombs: 1 } },
  { id: "stomp", en: "Stomp", zh: "碾压", mods: { hull: 2, fire: 2, scrap: 2, pressure: 2, bombs: 2 } },
  { id: "sandbox", en: "Sandbox", zh: "沙盒", mods: { hull: 3, fire: 3, scrap: 3, pressure: 2, bombs: 3 } },
];

const KEY = "nw-mods";

function clampTier(n: unknown): ModTier {
  const v = Number(n);
  if (v === 1 || v === 2 || v === 3) return v;
  return 0;
}

export function sanitizeMods(raw: unknown): Mods {
  const o = raw && typeof raw === "object" ? (raw as Record<string, unknown>) : {};
  return {
    hull: clampTier(o.hull),
    fire: clampTier(o.fire),
    scrap: clampTier(o.scrap),
    pressure: clampTier(o.pressure),
    bombs: clampTier(o.bombs),
  };
}

export function loadMods(): Mods {
  if (typeof localStorage === "undefined") return { ...STOCK };
  try {
    return sanitizeMods(JSON.parse(localStorage.getItem(KEY) || "null"));
  } catch {
    return { ...STOCK };
  }
}

export function saveMods(mods: Mods) {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(sanitizeMods(mods)));
}

export function modsActive(mods: Mods) {
  return mods.hull + mods.fire + mods.scrap + mods.pressure + mods.bombs > 0;
}

export function sameMods(a: Mods, b: Mods) {
  return a.hull === b.hull && a.fire === b.fire && a.scrap === b.scrap && a.pressure === b.pressure && a.bombs === b.bombs;
}

export function fireDamageMul(mods: Mods) {
  return ([1, 1.6, 2.4, 4] as const)[mods.fire];
}

export function fireRateMul(mods: Mods) {
  return ([1, 1, 1.25, 1.6] as const)[mods.fire];
}

export function scrapMul(mods: Mods) {
  return ([1, 2, 4, 4] as const)[mods.scrap];
}

export function enemyHpMul(mods: Mods) {
  return ([1, 0.8, 0.55, 0.35] as const)[mods.pressure];
}

export function spawnGapMul(mods: Mods) {
  return ([1, 1.4, 1.9, 4] as const)[mods.pressure];
}

export function enemyShotMul(mods: Mods) {
  return ([1, 1, 0.6, 0.35] as const)[mods.pressure];
}

export function hullMul(mods: Mods) {
  return ([1, 0.65, 0.35, 0] as const)[mods.hull];
}
