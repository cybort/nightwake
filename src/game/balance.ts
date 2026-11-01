import { scrapMul, STOCK, type Mods } from "./mods";
import {
  type Gun,
  type Stats,
  type UpgradeId,
  type WeaponClass,
  ITEMS,
  UPGRADES,
  shipById,
  weaponById,
} from "./data";
import { luckWeights } from "./dossier";

export type Pod = { id: string; tier: number };

export type Offer =
  | { kind: "pod"; id: string; tier: number; cost: number }
  | { kind: "item"; id: string; cost: number };

export type Run = {
  shipId: string;
  danger: number;
  wave: number;
  endless: boolean;
  gun: Gun;
  gunLevel: number;
  pods: Pod[];
  items: string[];
  picks: UpgradeId[];
  levelOffers: UpgradeId[];
  scrap: number;
  xp: number;
  level: number;
  pendingLevels: number;
  score: number;
  hp: number;
  maxHp: number;
  bombs: number;
  bombMax: number;
  salvage: number;
  offers: Offer[];
  locked: boolean[];
  crates: string[];
  reviveUsed: boolean;
  grazeBank: number;
  best: number;
  mods: Mods;
};

export function emptyRun(shipId: string, danger: number, starter: string, best: number, mods: Mods = { ...STOCK }): Run {
  const kit: Mods = { ...mods };
  const run: Run = {
    shipId,
    danger,
    wave: 1,
    endless: false,
    gun: shipById(shipId).gun,
    gunLevel: 1,
    pods: [{ id: starter, tier: 1 }],
    items: [],
    picks: [],
    levelOffers: [],
    scrap: 0,
    xp: 0,
    level: 1,
    pendingLevels: 0,
    score: 0,
    hp: 1,
    maxHp: 1,
    bombs: 2,
    bombMax: 3,
    salvage: 0,
    offers: [],
    locked: [false, false, false, false],
    crates: [],
    reviveUsed: false,
    grazeBank: 0,
    best,
    mods: kit,
  };
  const stats = derive(run);
  run.hp = stats.maxHp;
  run.maxHp = stats.maxHp;
  syncMods(run);
  if (kit.scrap === 2) run.scrap += 50;
  return run;
}

export function derive(run: Run): Stats {
  const ship = shipById(run.shipId);
  const s: Stats = {
    maxHp: Math.max(24, Math.round(100 * ship.hpMul + ship.hpFlat)),
    regen: 0,
    lifesteal: 0,
    armor: ship.armor,
    dodge: ship.dodge,
    crit: 0.02 + ship.crit,
    atkSpeed: ship.atkSpeed,
    area: 0,
    luck: ship.luck,
    harvesting: ship.harvesting,
    speed: ship.speed,
    damage: ship.damage,
    engineering: ship.engineering,
    scrapBonus: ship.scrapBonus,
  };
  for (const id of run.picks) applyUpgrade(s, id, ship.armorGain, ship.engGain);
  for (const id of run.items) applyItem(s, id);
  s.dodge = Math.min(0.6, s.dodge);
  s.maxHp = Math.max(20, Math.round(s.maxHp));
  return s;
}

function applyUpgrade(s: Stats, id: UpgradeId, armorGain: number, engGain: number) {
  if (id === "dmg") s.damage += 0.08;
  else if (id === "rof") s.atkSpeed += 0.1;
  else if (id === "hp") s.maxHp += 12;
  else if (id === "armor") s.armor += 1 * armorGain;
  else if (id === "dodge") s.dodge += 0.04;
  else if (id === "crit") s.crit += 0.05;
  else if (id === "speed") s.speed += 0.06;
  else if (id === "harvest") s.harvesting += 8;
  else if (id === "luck") s.luck += 8;
  else if (id === "area") s.area += 0.08;
  else if (id === "eng") s.engineering += 1 * engGain;
  else if (id === "scrap") s.scrapBonus += 0.05;
  else if (id === "regen") s.regen += 0.35;
  else if (id === "leech") s.lifesteal += 0.03;
}

function applyItem(s: Stats, id: string) {
  if (id === "canopy") {
    s.damage += 0.25;
    s.maxHp -= 5;
  } else if (id === "overclock") {
    s.atkSpeed += 0.2;
    s.maxHp -= 10;
  } else if (id === "plate") s.armor += 3;
  else if (id === "harvest") s.harvesting += 20;
  else if (id === "lens") s.crit += 0.12;
  else if (id === "dronebay") s.engineering += 4;
  else if (id === "field") s.maxHp += 18;
  else if (id === "coin") {
    s.luck += 10;
    s.damage -= 0.02;
  } else if (id === "medal") {
    s.luck += 6;
    s.scrapBonus += 0.05;
    s.damage -= 0.05;
  }
}

export function refreshHull(run: Run) {
  const built = derive(run).maxHp + Math.max(0, run.level - 1);
  const prev = run.maxHp;
  run.maxHp = built;
  if (prev > 0 && built > prev) run.hp += built - prev;
  run.hp = Math.min(run.hp, run.maxHp);
  run.bombMax = 3 + (run.items.includes("bay") ? 1 : 0);
  if (run.mods.bombs === 1) run.bombMax += 2;
  if (run.mods.bombs >= 2) run.bombMax = Math.max(run.bombMax, 6);
  if (run.bombs > run.bombMax) run.bombs = run.bombMax;
  return derive(run);
}

export function syncMods(run: Run) {
  refreshHull(run);
  if (run.mods.bombs >= 1) run.bombs = run.bombMax;
  if (run.mods.scrap === 3) run.scrap = Math.max(999, run.scrap);
  if (run.mods.hull === 3 && run.hp > 0) run.hp = run.maxHp;
}

export function spendScrap(run: Run, cost: number) {
  if (run.mods.scrap === 3) return true;
  if (run.scrap < cost) return false;
  run.scrap -= cost;
  return true;
}

export function xpNeed(level: number) {
  return 18 + (level - 1) * 12;
}

export function waveDuration(wave: number) {
  const boss = wave % 5 === 0;
  if (boss) return 36 + Math.min(10, Math.floor(wave / 5) * 2);
  return Math.min(32, 14 + (wave - 1) * 1);
}

export function classCounts(pods: Pod[]) {
  const c: Record<WeaponClass, number> = { ballistic: 0, energy: 0, explosive: 0, drone: 0, precision: 0 };
  for (const p of pods) {
    for (const k of weaponById(p.id).classes) c[k] += 1;
  }
  return c;
}

function rollBand(rng: () => number, weights: number[]) {
  const sum = weights.reduce((a, b) => a + Math.max(0, b), 0) || 1;
  let x = rng() * sum;
  for (let i = 0; i < weights.length; i++) {
    x -= Math.max(0, weights[i] ?? 0);
    if (x <= 0) return i;
  }
  return weights.length - 1;
}

export function rollOffer(run: Run, rng: () => number): Offer {
  const luck = derive(run).luck;
  const wave = Math.max(1, run.wave);
  let weights = [...luckWeights(wave, luck)];
  if (run.mods.scrap >= 2) {
    const bump = run.mods.scrap >= 3 ? 0.12 : 0.06;
    weights = weights.map((w, i) => w + (i === 0 ? -bump : bump / 3));
  }
  const tier0 = rollBand(rng, weights);
  const tier = tier0 + 1;
  if (rng() >= 0.64) {
    const owned = new Set(run.items);
    for (let t = tier0; t >= 0; t--) {
      const pool = ITEMS.filter((it) => it.tier === t && !owned.has(it.id));
      if (pool.length > 0) {
        const item = pool[Math.floor(rng() * pool.length)]!;
        return { kind: "item", id: item.id, cost: Math.round(item.cost * (1 + wave * 0.03)) };
      }
    }
  }
  const pool = ["tracer", "rotary", "scatter", "bore", "lance", "arc", "ring", "seeker", "warhead", "canister", "wing", "aegis"];
  const id = pool[Math.floor(rng() * pool.length)]!;
  let tierW = tier;
  if (run.mods.scrap >= 3 && rng() < 0.25) tierW = Math.min(4, tierW + 1);
  else if (run.mods.scrap === 2 && rng() < 0.12) tierW = Math.min(4, tierW + 1);
  const cost = Math.round(16 + tierW * 14 + wave * 1.1);
  return { kind: "pod", id, tier: tierW, cost };
}

export function fillOffers(run: Run, rng: () => number) {
  const next: Offer[] = [];
  for (let i = 0; i < 4; i++) {
    if (run.locked[i] && run.offers[i]) next.push(run.offers[i]!);
    else next.push(rollOffer(run, rng));
  }
  run.offers = next;
}

export function rerollCost(run: Run) {
  return 6 + run.wave * 2;
}

export function sellValue(pod: Pod) {
  return Math.round((10 + pod.tier * 12) * 0.45);
}

export function gainScrap(run: Run, raw: number) {
  const s = derive(run);
  const mul = (1 + s.harvesting * 0.01 + s.scrapBonus) * scrapMul(run.mods);
  const got = Math.max(1, Math.round(raw * mul));
  run.scrap += got;
  run.score += got;
  run.xp += got;
  while (run.xp >= xpNeed(run.level)) {
    run.xp -= xpNeed(run.level);
    run.level += 1;
    run.pendingLevels += 1;
    refreshHull(run);
  }
  return got;
}

export function ensureLevelOffers(run: Run) {
  if (!run.levelOffers) run.levelOffers = [];
  if (run.pendingLevels <= 0) {
    run.levelOffers = [];
    return run.levelOffers;
  }
  if (run.levelOffers.length > 0) return run.levelOffers;
  const pool = UPGRADES.map((u) => u.id);
  const out: UpgradeId[] = [];
  for (let i = 0; i < 4 && pool.length; i++) {
    const idx = Math.floor(Math.random() * pool.length);
    out.push(pool.splice(idx, 1)[0]!);
  }
  run.levelOffers = out;
  return out;
}

export function applyLevelPick(run: Run, id: UpgradeId) {
  if (run.pendingLevels <= 0) return;
  run.picks.push(id);
  run.pendingLevels -= 1;
  run.levelOffers = [];
  refreshHull(run);
}

export function canPlacePod(run: Run, id: string, tier: number) {
  if (run.pods.length < 6) return true;
  return run.pods.some((p) => p.id === id && p.tier === tier && tier < 4);
}

export function placePod(run: Run, id: string, tier: number) {
  const idx = run.pods.findIndex((p) => p.id === id && p.tier === tier && tier < 4);
  if (idx >= 0) {
    run.pods[idx] = { id, tier: tier + 1 };
    return true;
  }
  if (run.pods.length >= 6) return false;
  run.pods.push({ id, tier });
  return true;
}

export function buyOffer(run: Run, index: number) {
  const offer = run.offers[index];
  if (!offer) return false;
  if (offer.kind === "item") {
    if (run.items.includes(offer.id)) return false;
    if (!spendScrap(run, offer.cost)) return false;
    run.items.push(offer.id);
    if (offer.id === "bay") run.bombs += 1;
    refreshHull(run);
  } else {
    if (!canPlacePod(run, offer.id, offer.tier)) return false;
    if (!spendScrap(run, offer.cost)) return false;
    placePod(run, offer.id, offer.tier);
  }
  run.locked[index] = false;
  return true;
}

export function openCrate(run: Run, index: number, take: boolean) {
  const id = run.crates[index];
  if (!id) return;
  run.crates.splice(index, 1);
  if (take) {
    if (!run.items.includes(id)) {
      run.items.push(id);
      if (id === "bay") run.bombs += 1;
      refreshHull(run);
    } else gainScrap(run, 20);
  } else gainScrap(run, 18);
}

export function cycleGun(run: Run, gun: Gun) {
  if (run.gun === gun) run.gunLevel = Math.min(8, run.gunLevel + 1);
  else run.gun = gun;
}

export function bossIndex(wave: number) {
  if (wave % 5 !== 0) return -1;
  const n = Math.floor(wave / 5);
  return (n - 1) % 4;
}

export function loadBest() {
  if (typeof localStorage === "undefined") return 0;
  try {
    const n = Number(JSON.parse(localStorage.getItem("nw-save") || "{}").best ?? 0);
    return Number.isFinite(n) ? n : 0;
  } catch {
    return 0;
  }
}

export function saveBest(score: number, modded = false) {
  if (typeof localStorage === "undefined") return score;
  let prev = 0;
  try {
    prev = Number(JSON.parse(localStorage.getItem("nw-save") || "{}").best ?? 0);
  } catch {
    prev = 0;
  }
  if (!Number.isFinite(prev)) prev = 0;
  if (modded) return prev;
  const best = Math.max(prev, score);
  localStorage.setItem("nw-save", JSON.stringify({ best, at: Date.now() }));
  return best;
}
