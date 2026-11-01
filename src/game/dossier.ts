import type { L10n } from "./data";

export type MoveId = "straight" | "swoop" | "hover" | "ground" | "dive" | "cross" | "side";

export type Foe = {
  hp: number;
  r: number;
  scrap: number;
  score: number;
  bullet: number;
  contact: number;
  boss: boolean;
  name: L10n;
  path: L10n;
};

/** Base numbers measured from the public client. Names here are ours. */
export const FOES: Record<string, Foe> = {
  fighter: { hp: 6, r: 16, scrap: 1, score: 100, bullet: 1, contact: 2, boss: false, name: { en: "Fighter", zh: "战斗机" }, path: { en: "Vee, column, side arc, or swoop.", zh: "人字、纵队、侧弧或俯冲拉起。" } },
  kami: { hp: 5, r: 12, scrap: 1, score: 150, bullet: 0, contact: 3, boss: false, name: { en: "Kamikaze", zh: "神风无人机" }, path: { en: "Pauses, then dives on your position.", zh: "先下沉，再朝你当时的位置加速撞。" } },
  heli: { hp: 22, r: 20, scrap: 2, score: 300, bullet: 1, contact: 2, boss: false, name: { en: "Gunship heli", zh: "武装直升机" }, path: { en: "Flies to a hover band, drifts, then leaves.", zh: "降到悬停高度，左右漂，时间到了再离开。" } },
  tank: { hp: 28, r: 20, scrap: 2, score: 400, bullet: 1.5, contact: 0, boss: false, name: { en: "Tank", zh: "坦克" }, path: { en: "Ground crawl, then plants and shoots.", zh: "贴地斜向爬，到点停住开炮。" } },
  turret: { hp: 34, r: 18, scrap: 2, score: 400, bullet: 1.5, contact: 0, boss: false, name: { en: "Turret", zh: "炮塔" }, path: { en: "Slow ground drop, turret tracks you.", zh: "缓慢落地，炮口一直跟着你转。" } },
  gunship: { hp: 80, r: 34, scrap: 5, score: 1200, bullet: 1.5, contact: 3, boss: false, name: { en: "Gunship", zh: "重型武装机" }, path: { en: "Hovers longer than a heli and fans shots.", zh: "比直升机悬得更久，扇形齐射。" } },
  bomber: { hp: 260, r: 60, scrap: 14, score: 5000, bullet: 2, contact: 4, boss: false, name: { en: "Heavy bomber", zh: "重轰炸机" }, path: { en: "Slow straight run with a wide sine.", zh: "慢速直线，带很宽的正弦横移。" } },
  carrier: { hp: 20, r: 20, scrap: 3, score: 1000, bullet: 0, contact: 0, boss: false, name: { en: "Item carrier", zh: "运输机" }, path: { en: "Crosses the screen once, wrapping a single time.", zh: "横穿屏幕，只折返一次。" } },
  destroyer: { hp: 320, r: 50, scrap: 12, score: 4000, bullet: 1.5, contact: 0, boss: false, name: { en: "Destroyer", zh: "驱逐舰" }, path: { en: "Ground ship. Slow, stops to broadside.", zh: "地面舰，慢，停下来侧舷齐射。" } },
  crystal: { hp: 16, r: 18, scrap: 2, score: 350, bullet: 1.2, contact: 2, boss: false, name: { en: "Crystal fighter", zh: "水晶战机" }, path: { en: "Late zones only. Line or spinning column.", zh: "只在后段空域。横队或旋转纵队。" } },
  boss_spider: { hp: 1062, r: 95, scrap: 60, score: 50000, bullet: 1, contact: 5, boss: true, name: { en: "Siege walker", zh: "攻城步行机" }, path: { en: "Wave 5. Walks in, then paces.", zh: "第 5 波。走进画面后左右踱步。" } },
  boss_fortress: { hp: 5600, r: 110, scrap: 80, score: 80000, bullet: 1, contact: 5, boss: true, name: { en: "Sky fortress", zh: "天空要塞" }, path: { en: "Wave 10. Holds a high line.", zh: "第 10 波。停在高处。" } },
  boss_battleship: { hp: 15250, r: 80, scrap: 100, score: 120000, bullet: 1, contact: 5, boss: true, name: { en: "Dreadnought", zh: "无畏舰" }, path: { en: "Wave 15. Low, wide broadside.", zh: "第 15 波。压低，宽侧舷。" } },
  boss_mothership: { hp: 45500, r: 110, scrap: 150, score: 250000, bullet: 1, contact: 6, boss: true, name: { en: "Mothership", zh: "母舰" }, path: { en: "Wave 20. Slow drift, three phases.", zh: "第 20 波。慢漂，血量三阶段。" } },
};

export const DANGER_HP = [1, 1, 1.05, 1.12, 1.26, 1.4];

export const FOE_ORDER = ["fighter", "kami", "heli", "tank", "turret", "gunship", "bomber", "carrier", "destroyer", "crystal"] as const;
export const BOSS_ORDER = ["boss_spider", "boss_fortress", "boss_battleship", "boss_mothership"] as const;

/** Original non-boss multiplier, before the extra ×1.3 applied at spawn. */
export function rawScale(wave: number, boss: boolean, danger = 0) {
  const dhp = DANGER_HP[Math.max(0, Math.min(5, danger))] ?? 1;
  const r = Math.max(0, wave - 1);
  if (boss) return (1 + r * 0.3) * dhp;
  const late = Math.max(0, r - 12);
  const xn = 1 + 0.05 * Math.min(4, Math.max(0, wave - 6));
  return (1 + r * r * 0.062 + late * late * late * 0.05) * xn * dhp;
}

/** Original client HP at this wave (elite ×2.5, non-boss also ×1.3). */
export function referenceHp(kind: string, wave: number, danger = 0, elite = false) {
  const foe = FOES[kind];
  if (!foe) return 0;
  const mul = rawScale(wave, foe.boss, danger) * (foe.boss ? 1 : 1.3) * (elite ? 2.5 : 1);
  return Math.round(foe.hp * mul);
}

/**
 * Same ratios as the reference table, with the late-wave square/cube
 * compressed so a sortie can still end. Bosses keep order, not the raw 40× gap.
 */
export function playedHp(kind: string, wave: number, danger = 0, elite = false) {
  const foe = FOES[kind];
  if (!foe) return 12;
  const dhp = DANGER_HP[Math.max(0, Math.min(5, danger))] ?? 1;
  if (foe.boss) {
    const grown = 1 + Math.max(0, wave - 1) * 0.045;
    const ratio = Math.pow(foe.hp / 1062, 0.45);
    return Math.max(80, Math.round(520 * ratio * grown * dhp));
  }
  const raw = rawScale(wave, false, danger);
  const compressed = 1 + (raw - 1) * 0.22;
  return Math.max(6, Math.round(foe.hp * 1.3 * compressed * 1.28 * (elite ? 2.5 : 1)));
}

export type FormDef = { id: string; w: number; min: number };

export const ZONE_FORMS: FormDef[][] = [
  [
    { id: "vee", w: 4, min: 1 },
    { id: "swoopL", w: 3, min: 1 },
    { id: "swoopR", w: 3, min: 1 },
    { id: "arcL", w: 2, min: 2 },
    { id: "arcR", w: 2, min: 2 },
    { id: "column", w: 2, min: 1 },
    { id: "heli", w: 3, min: 1 },
    { id: "tanks", w: 3, min: 1 },
    { id: "turrets", w: 2, min: 2 },
    { id: "gunship", w: 1.5, min: 3 },
    { id: "kami", w: 1, min: 3 },
  ],
  [
    { id: "vee", w: 3, min: 1 },
    { id: "swoopL", w: 2, min: 1 },
    { id: "swoopR", w: 2, min: 1 },
    { id: "arcL", w: 2, min: 1 },
    { id: "arcR", w: 2, min: 1 },
    { id: "heli", w: 3, min: 1 },
    { id: "tanks", w: 5, min: 1 },
    { id: "turrets", w: 3, min: 1 },
    { id: "gunship", w: 2, min: 1 },
    { id: "bomber", w: 0.6, min: 6 },
    { id: "kami", w: 1.5, min: 1 },
  ],
  [
    { id: "vee", w: 3, min: 1 },
    { id: "column", w: 2, min: 1 },
    { id: "arcL", w: 2, min: 1 },
    { id: "arcR", w: 2, min: 1 },
    { id: "heli", w: 4, min: 1 },
    { id: "turrets", w: 4, min: 1 },
    { id: "tanks", w: 2, min: 1 },
    { id: "gunship", w: 3, min: 1 },
    { id: "bomber", w: 1, min: 1 },
    { id: "kami", w: 2.5, min: 1 },
  ],
  [
    { id: "vee", w: 3, min: 1 },
    { id: "swoopL", w: 2, min: 1 },
    { id: "swoopR", w: 2, min: 1 },
    { id: "column", w: 2, min: 1 },
    { id: "heli", w: 3, min: 1 },
    { id: "gunship", w: 3, min: 1 },
    { id: "destroyer", w: 1.5, min: 1 },
    { id: "bomber", w: 1, min: 1 },
    { id: "kami", w: 2, min: 1 },
  ],
  [
    { id: "crystalSpiral", w: 4, min: 1 },
    { id: "crystalLine", w: 4, min: 1 },
    { id: "vee", w: 2, min: 1 },
    { id: "kami", w: 3, min: 1 },
    { id: "gunship", w: 3, min: 1 },
    { id: "bomber", w: 1.2, min: 1 },
    { id: "arcL", w: 1.5, min: 1 },
    { id: "arcR", w: 1.5, min: 1 },
  ],
];

export const ZONE_LABEL: L10n[] = [
  { en: "Waves 1–4 · coast", zh: "第 1–4 波 · 海岸" },
  { en: "Waves 5–8 · desert", zh: "第 5–8 波 · 荒漠" },
  { en: "Waves 9–12 · city", zh: "第 9–12 波 · 城市" },
  { en: "Waves 13–16 · ocean", zh: "第 13–16 波 · 海面" },
  { en: "Waves 17+ · black sky", zh: "第 17 波以后 · 黑空" },
];

export const FORM_NOTES: Record<string, L10n> = {
  vee: { en: "5 fighters, shallow vee, straight down.", zh: "5 架战斗机，浅人字，直线向下。" },
  swoopL: { en: "5 fighters from the left. Dive, then pull across and up.", zh: "左侧 5 架。下冲后向右拉起。" },
  swoopR: { en: "5 fighters from the right. Dive, then pull across and up.", zh: "右侧 5 架。下冲后向左拉起。" },
  arcL: { en: "6 fighters enter from the left edge on a side arc.", zh: "6 架从左缘切入，走侧弧。" },
  arcR: { en: "6 fighters enter from the right edge on a side arc.", zh: "6 架从右缘切入，走侧弧。" },
  column: { en: "6 fighters in a column, weaving.", zh: "6 架纵队，边下边摆。" },
  heli: { en: "1 heli, 2 from wave 6. Hover, then leave.", zh: "1 架直升机，第 6 波起 2 架。悬停后离开。" },
  tanks: { en: "2–3 tanks, ground crawl, then stop.", zh: "2–3 辆坦克，贴地爬行后停炮。" },
  turrets: { en: "2–3 turrets, slow ground drop.", zh: "2–3 座炮塔，缓慢落地。" },
  gunship: { en: "1 gunship. From danger 2 it can spawn elite.", zh: "1 架重型武装机。危险 2 起有几率精英。" },
  bomber: { en: "1 heavy bomber, from wave 6. Elite possible.", zh: "1 架重轰炸机，第 6 波起。可精英。" },
  kami: { en: "3–5 kamikaze drones. They commit to a dive.", zh: "3–5 架神风。锁定你的位置后加速。" },
  destroyer: { en: "1 destroyer, waves 13–16. Elite possible.", zh: "1 艘驱逐舰，第 13–16 波。可精英。" },
  crystalSpiral: { en: "4 crystal fighters in a spinning column.", zh: "4 架水晶战机，旋转纵队。" },
  crystalLine: { en: "4 crystal fighters hover in a line.", zh: "4 架水晶战机，横队悬停。" },
  carrier: { en: "Crosses during the wave. Drops a part, not a bullet.", zh: "波次中横穿。掉配件，不射击。" },
};

export function zoneIndex(wave: number) {
  return Math.min(4, Math.max(0, Math.floor((wave - 1) / 4)));
}

/**
 * Shop tier weights for tiers 0–3.
 * Luck does not invent a high tier. It multiplies the weight the wave already grew.
 * Wave 1 is entirely tier 0, at any luck.
 */
export function luckWeights(wave: number, luck: number): [number, number, number, number] {
  const n = luck / 100;
  const band = (offset: number, rate: number, cap: number) => {
    const raw = Math.max(0, wave - 1 - offset) * rate;
    const scaled = n >= 0 ? raw * (1 + n) : raw / (1 + Math.abs(n));
    return Math.min(scaled, cap);
  };
  const t3 = band(6, 0.0023, 0.08);
  const t2 = Math.max(t3, band(2, 0.02, 0.25));
  const t1 = Math.max(t2, band(0, 0.06, 0.6));
  return [1 - t1, t1 - t2, t2 - t3, t3];
}

export function dropMul(luck: number) {
  return Math.max(0, 1 + luck / 100);
}

export const LUCK_SAMPLES = [1, 5, 10, 15, 20];
export const TIER_NAME: L10n[] = [
  { en: "Common", zh: "普通" },
  { en: "Fine", zh: "精良" },
  { en: "Rare", zh: "稀有" },
  { en: "Ace", zh: "王牌" },
];
