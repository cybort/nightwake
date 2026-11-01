import {
  bossIndex,
  classCounts,
  cycleGun,
  derive,
  emptyRun,
  fillOffers,
  gainScrap,
  refreshHull,
  saveBest,
  waveDuration,
  type Run,
} from "./balance";
import type { Stats, WeaponClass } from "./data";
import { GUNS } from "./data";
import { dropMul, FOES, playedHp, ZONE_FORMS, zoneIndex, type MoveId } from "./dossier";
import {
  enemyHpMul,
  enemyShotMul,
  fireDamageMul,
  fireRateMul,
  hullMul,
  loadMods,
  modsActive,
  spawnGapMul,
} from "./mods";

export const FIELD_W = 480;
export const FIELD_H = 720;

export type Mode = "select" | "wave" | "vacuum" | "hangar" | "pause" | "dead" | "clear";

type Bullet = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  dmg: number;
  friendly: boolean;
  life: number;
  pierce: number;
  kind: string;
  color: string;
  grazed: boolean;
  split: boolean;
  boom: number;
};

type Enemy = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  hp: number;
  max: number;
  r: number;
  kind: string;
  t: number;
  score: number;
  elite: boolean;
  boss: boolean;
  bossId: number;
  cd: number;
  ringAt: number;
  move: MoveId;
  phase: number;
  p0: number;
  p1: number;
  p2: number;
  scrap: number;
};

type Pickup = { x: number; y: number; vx: number; vy: number; kind: string; value: number; life: number };
type Particle = { x: number; y: number; vx: number; vy: number; life: number; max: number; color: string; s: number };
type Bolt = { x1: number; y1: number; x2: number; y2: number; life: number; color: string };
type Decal = { x: number; y: number; life: number; r: number };

export type Sim = {
  mode: Mode;
  held: Mode;
  run: Run;
  player: { x: number; y: number; iframe: number; cd: number; podCd: number[]; orbit: number };
  bullets: Bullet[];
  enemies: Enemy[];
  pickups: Pickup[];
  particles: Particle[];
  bolts: Bolt[];
  decals: Decal[];
  keys: Set<string>;
  touching: boolean;
  scroll: number;
  spawnIn: number;
  shake: number;
  vacuum: number;
  exit: "none" | "suck" | "climb";
  climb: number;
  exitT: number;
  timeLeft: number;
  bossSpawned: boolean;
  bossKilled: boolean;
  acc: number;
  speed: number;
  seed: number;
  stars: { x: number; y: number; z: number }[];
  shotGap: number;
  stats: Stats;
  lang: "en" | "zh";
  sfx: (name: string) => void;
};

declare global {
  interface Window {
    __controlsTest?: {
      getYaw: () => number;
      getSpeed: () => number;
      getX: () => number;
      getMode: () => string;
      getTime: () => number;
      setKeys: (codes: string[]) => void;
    };
  }
}

function mulberry(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function createSim(best: number): Sim {
  const run = emptyRun("lantern", 0, "tracer", best, loadMods());
  const sim: Sim = {
    mode: "select",
    held: "select",
    run,
    player: { x: FIELD_W / 2, y: FIELD_H * 0.78, iframe: 0, cd: 0, podCd: [0, 0, 0, 0, 0, 0], orbit: 0 },
    bullets: [],
    enemies: [],
    pickups: [],
    particles: [],
    bolts: [],
    decals: [],
    keys: new Set(),
    touching: false,
    scroll: 0,
    spawnIn: 1,
    shake: 0,
    vacuum: 0,
    exit: "none",
    climb: 0,
    exitT: 0,
    timeLeft: 0,
    bossSpawned: false,
    bossKilled: false,
    acc: 0,
    speed: 0,
    seed: 0x51de,
    stars: Array.from({ length: 70 }, (_, i) => ({
      x: (i * 97) % FIELD_W,
      y: (i * 53) % FIELD_H,
      z: 0.3 + (i % 5) * 0.18,
    })),
    shotGap: 0,
    stats: derive(run),
    lang: "en",
    sfx: () => {},
  };
  attachProbe(sim);
  return sim;
}

const RUN_KEY = "nw-run";
const MODES: Mode[] = ["select", "wave", "vacuum", "hangar", "pause", "dead", "clear"];
let kept: Sim | null = null;

export function keptSim() {
  return kept;
}

export function keepSim(sim: Sim) {
  kept = sim;
}

export function rememberSim(sim: Sim) {
  if (typeof localStorage === "undefined") return;
  try {
    localStorage.setItem(
      RUN_KEY,
      JSON.stringify({
        mode: sim.mode,
        held: sim.held,
        run: sim.run,
        player: sim.player,
        bullets: sim.bullets,
        enemies: sim.enemies,
        pickups: sim.pickups,
        exit: sim.exit,
        climb: sim.climb,
        exitT: sim.exitT,
        timeLeft: sim.timeLeft,
        bossSpawned: sim.bossSpawned,
        bossKilled: sim.bossKilled,
        spawnIn: sim.spawnIn,
        seed: sim.seed,
        vacuum: sim.vacuum,
      }),
    );
  } catch {
    /* ignore quota */
  }
}

export function recallSim(): Sim | null {
  if (typeof localStorage === "undefined") return null;
  try {
    const raw = JSON.parse(localStorage.getItem(RUN_KEY) || "null") as Partial<Sim> | null;
    const run = raw?.run;
    if (!raw || !run || typeof run.shipId !== "string" || !Array.isArray(run.pods)) return null;
    run.levelOffers ??= [];
    run.picks ??= [];
    run.items ??= [];
    run.offers ??= [];
    run.crates ??= [];
    run.locked ??= [false, false, false, false];
    const sim = createSim(typeof run.best === "number" ? run.best : 0);
    sim.run = run;
    sim.stats = derive(run);
    sim.mode = MODES.includes(raw.mode as Mode) ? (raw.mode as Mode) : "hangar";
    sim.held = MODES.includes(raw.held as Mode) ? (raw.held as Mode) : sim.mode;
    if (raw.player && typeof raw.player.x === "number") sim.player = { ...sim.player, ...raw.player, podCd: raw.player.podCd ?? sim.player.podCd };
    if (Array.isArray(raw.bullets)) sim.bullets = raw.bullets;
    if (Array.isArray(raw.enemies)) sim.enemies = raw.enemies;
    if (Array.isArray(raw.pickups)) sim.pickups = raw.pickups;
    if (raw.exit === "none" || raw.exit === "suck" || raw.exit === "climb") sim.exit = raw.exit;
    sim.climb = typeof raw.climb === "number" ? raw.climb : 0;
    sim.exitT = typeof raw.exitT === "number" ? raw.exitT : 0;
    sim.timeLeft = typeof raw.timeLeft === "number" ? raw.timeLeft : sim.timeLeft;
    sim.bossSpawned = Boolean(raw.bossSpawned);
    sim.bossKilled = Boolean(raw.bossKilled);
    sim.spawnIn = typeof raw.spawnIn === "number" ? raw.spawnIn : sim.spawnIn;
    sim.seed = typeof raw.seed === "number" ? raw.seed : sim.seed;
    sim.vacuum = typeof raw.vacuum === "number" ? raw.vacuum : 0;
    return sim;
  } catch {
    return null;
  }
}

export function attachProbe(sim: Sim) {
  if (typeof window === "undefined") return;
  window.__controlsTest = {
    getYaw: () => 0,
    getSpeed: () => sim.speed,
    getX: () => sim.player.x,
    getMode: () => sim.mode,
    getTime: () => sim.timeLeft,
    setKeys: (codes) => {
      sim.keys = new Set(codes);
    },
  };
}

function rngOf(sim: Sim) {
  const rng = mulberry(sim.seed || 1);
  return () => {
    const n = rng();
    sim.seed = (sim.seed * 1664525 + 1013904223) >>> 0;
    return n;
  };
}

export function reconfigure(sim: Sim, shipId: string, danger: number, starter: string) {
  const best = sim.run.best;
  const mods = sim.run.mods;
  sim.run = emptyRun(shipId, danger, starter, best, mods);
  sim.stats = derive(sim.run);
  sim.mode = "select";
  sim.bullets = [];
  sim.enemies = [];
  sim.pickups = [];
  sim.player.x = FIELD_W / 2;
  sim.player.y = FIELD_H * 0.78;
  sim.player.iframe = 0;
  sim.exit = "none";
  sim.climb = 0;
  sim.exitT = 0;
}

export function beginWave(sim: Sim) {
  sim.mode = "wave";
  sim.timeLeft = waveDuration(sim.run.wave);
  sim.bossSpawned = false;
  sim.bossKilled = false;
  sim.spawnIn = 0.45;
  sim.bullets = sim.bullets.filter((b) => b.friendly);
  sim.player.iframe = 0.6;
}

export function launchNext(sim: Sim) {
  if (sim.run.pendingLevels > 0) return;
  if (sim.run.wave >= 20) sim.run.endless = true;
  sim.run.wave += 1;
  beginWave(sim);
}

function enterHangar(sim: Sim) {
  const rng = rngOf(sim);
  if (sim.run.items.includes("piggy")) sim.run.scrap += Math.round(sim.run.scrap * 0.08);
  if (sim.bossKilled) {
    const pool = ["plate", "field", "harvest", "bay", "graze", "lens", "magnet", "overclock", "coin", "medal"];
    const n = 1 + (sim.run.wave >= 15 ? 1 : 0);
    for (let i = 0; i < n; i++) sim.run.crates.push(pool[Math.floor(rng() * pool.length)]!);
  }
  fillOffers(sim.run, rng);
  refreshHull(sim.run);
  if (sim.run.mods.bombs >= 2) sim.run.bombs = sim.run.bombMax;
  sim.stats = derive(sim.run);
  sim.mode = "hangar";
  sim.enemies = [];
  sim.bullets = [];
  sim.sfx("hangar");
}

function finishDead(sim: Sim) {
  const best = saveBest(sim.run.score, modsActive(sim.run.mods)) ?? sim.run.score;
  sim.run.best = best;
  sim.mode = "dead";
  sim.sfx("die");
}

export function bankRun(sim: Sim) {
  const best = saveBest(sim.run.score, modsActive(sim.run.mods)) ?? sim.run.score;
  sim.run.best = best;
  sim.mode = "clear";
}

export function advance(sim: Sim, dt: number) {
  const rush = sim.exit === "climb" ? 1 + sim.climb / 280 : 1;
  sim.scroll += Math.min(dt, 0.05) * (sim.mode === "wave" ? 70 : 16) * rush;
  for (const star of sim.stars) {
    star.y += Math.min(dt, 0.05) * (30 + star.z * 90) * (sim.mode === "wave" ? 1 : 0.35) * rush;
    if (star.y > FIELD_H) star.y -= FIELD_H;
  }
  if (sim.mode === "pause" || sim.mode === "select" || sim.mode === "hangar" || sim.mode === "dead" || sim.mode === "clear") {
    return;
  }
  sim.acc += Math.min(dt, 0.05);
  let guard = 0;
  const h = 1 / 60;
  while (sim.acc >= h && guard < 4) {
    tick(sim, h);
    sim.acc -= h;
    guard += 1;
    const mode = sim.mode as Mode;
    if (mode !== "wave" && mode !== "vacuum") break;
  }
}

function tick(sim: Sim, dt: number) {
  const run = sim.run;
  sim.stats = derive(run);
  const stats = sim.stats;
  const counts = classCounts(run.pods);
  sim.player.iframe = Math.max(0, sim.player.iframe - dt);
  sim.player.orbit += dt * (1.4 + stats.engineering * 0.03);
  sim.shake = Math.max(0, sim.shake - dt * 14);
  sim.shotGap = Math.max(0, sim.shotGap - dt);

  if (!sim.touching && sim.exit !== "climb") movePlayer(sim, dt, stats);

  if (run.hp > 0 && stats.regen > 0 && sim.mode === "wave") {
    run.hp = Math.min(run.maxHp, run.hp + stats.regen * dt);
  }

  if (sim.mode === "vacuum") {
    sim.exitT += dt;
    stepFx(sim, dt);
    if (sim.exit === "climb") {
      sim.climb = Math.min(1180, sim.climb + 760 * dt);
      sim.player.y -= sim.climb * dt;
      sim.player.x += (FIELD_W / 2 - sim.player.x) * Math.min(1, dt * 3);
      sim.bullets = [];
      if (sim.player.y < -46) {
        sim.player.x = FIELD_W / 2;
        sim.player.y = FIELD_H * 0.78;
        sim.exit = "none";
        sim.climb = 0;
        enterHangar(sim);
      }
      return;
    }
    stepPickups(sim, dt);
    if (sim.pickups.length === 0 || sim.exitT > 2.1) {
      let raw = 0;
      for (const p of sim.pickups) {
        if (p.kind === "scrap") raw += p.value;
        else collect(sim, p);
      }
      if (raw > 0) gainScrap(sim.run, raw);
      sim.pickups = [];
      sim.exit = "climb";
      sim.exitT = 0;
      sim.climb = 280;
    }
    return;
  }

  sim.timeLeft -= dt;
  if (bossIndex(run.wave) >= 0 && !sim.bossSpawned && sim.timeLeft < waveDuration(run.wave) - 0.35) {
    spawnBoss(sim);
    sim.bossSpawned = true;
  }
  if (sim.bossKilled && sim.timeLeft > 0.55) sim.timeLeft = 0.55;

  sim.spawnIn -= dt;
  const bossUp = sim.enemies.some((e) => e.boss);
  const cap = sim.run.mods.pressure === 3 ? 5 : 22;
  if (sim.spawnIn <= 0 && sim.enemies.length < cap) {
    spawnEnemy(sim);
    const base = Math.max(0.38, 1.25 - run.wave * 0.03 - run.danger * 0.045);
    sim.spawnIn = base * 1.7 * (bossUp ? 2.3 : 1) * (run.danger === 0 ? 1.15 : 1) * spawnGapMul(sim.run.mods);
  }

  stepEnemies(sim, dt);
  firePlayer(sim, dt, counts);
  stepBullets(sim, dt, counts);
  collide(sim, counts);
  stepPickups(sim, dt);
  stepFx(sim, dt);

  if (sim.timeLeft <= 0 && sim.mode === "wave") beginExit(sim);
}

function movePlayer(sim: Sim, dt: number, stats: Stats) {
  let mx = 0;
  let my = 0;
  const k = sim.keys;
  if (k.has("KeyA") || k.has("ArrowLeft")) mx -= 1;
  if (k.has("KeyD") || k.has("ArrowRight")) mx += 1;
  if (k.has("KeyW") || k.has("ArrowUp")) my -= 1;
  if (k.has("KeyS") || k.has("ArrowDown")) my += 1;
  const mag = Math.hypot(mx, my);
  if (mag === 0) {
    sim.speed = 0;
    return;
  }
  const focus = k.has("ShiftLeft") || k.has("ShiftRight");
  const sp = 272 * (1 + stats.speed) * (focus ? 0.46 : 1);
  sim.player.x += (mx / mag) * sp * dt;
  sim.player.y += (my / mag) * sp * dt;
  sim.speed = sp;
  clampPlayer(sim);
}

function clampPlayer(sim: Sim) {
  sim.player.x = Math.max(22, Math.min(FIELD_W - 22, sim.player.x));
  sim.player.y = Math.max(28, Math.min(FIELD_H - 26, sim.player.y));
}

export function dragPlayer(sim: Sim, x: number, y: number) {
  sim.player.x = x;
  sim.player.y = y;
  clampPlayer(sim);
  sim.speed = 200;
}

function beginExit(sim: Sim) {
  sim.mode = "vacuum";
  sim.exit = "suck";
  sim.exitT = 0;
  sim.climb = 0;
  sim.player.iframe = Math.max(sim.player.iframe, 1.5);
  const counts = classCounts(sim.run.pods);
  for (const e of [...sim.enemies]) killEnemy(sim, e, true, counts);
  sim.bullets = sim.bullets.filter((b) => b.friendly);
  sim.shake = 9;
  sim.sfx("exp");
}

function spawnEnemy(sim: Sim) {
  const rng = rngOf(sim);
  const w = sim.run.wave;
  const forms = ZONE_FORMS[zoneIndex(w)]!.filter((f) => w >= f.min);
  const form = weighted(rng, forms.map((f) => [f.id, f.w] as [string, number]));
  spawnForm(sim, form, rng);
}

function weighted(rng: () => number, rows: [string, number][]) {
  const sum = rows.reduce((a, r) => a + Math.max(0, r[1]), 0) || 1;
  let x = rng() * sum;
  for (const [id, w] of rows) {
    x -= Math.max(0, w);
    if (x <= 0) return id;
  }
  return rows[rows.length - 1]?.[0] ?? "vee";
}

function spawnForm(sim: Sim, form: string, rng: () => number) {
  const w = sim.run.wave;
  const i = FIELD_W;
  const eliteOk = sim.run.danger >= 2 && rng() < 0.15 + w * 0.01;
  if (form === "vee") {
    const n = 120 + rng() * (i - 240);
    for (let t = 0; t < 5; t++) {
      const r = t - 2;
      launch(sim, "fighter", n + r * 34, -30 - Math.abs(r) * 30, "straight", 190, 0, 0, false);
    }
  } else if (form === "swoopL" || form === "swoopR") {
    const dir = form === "swoopL" ? -1 : 1;
    const a = dir < 0 ? 60 + rng() * 120 : i - 180 + rng() * 120;
    for (let n = 0; n < 5; n++) launch(sim, "fighter", a, -30 - n * 46, "swoop", 220 + rng() * 140, -dir, 0, false);
  } else if (form === "arcL" || form === "arcR") {
    const left = form === "arcL";
    for (let n = 0; n < 6; n++) {
      launch(sim, "fighter", left ? -30 - n * 40 : i + 30 + n * 40, 40 + n * 6, "side", left ? 260 : -260, 40, 0, false);
    }
  } else if (form === "column") {
    const n = 80 + rng() * (i - 160);
    for (let t = 0; t < 6; t++) launch(sim, "fighter", n, -30 - t * 40, "straight", 170, 60, 2.4, false);
  } else if (form === "heli") {
    const n = w >= 6 ? 2 : 1;
    for (let r = 0; r < n; r++) launch(sim, "heli", 60 + rng() * (i - 120), -40 - r * 50, "hover", 110 + rng() * 190, 3 + rng() * 3, 0, false);
  } else if (form === "tanks") {
    const n = 2 + (rng() < 0.5 ? 1 : 0);
    const x = 80 + rng() * (i - 160);
    const drift = rng() * 60 - 30;
    for (let k = 0; k < n; k++) launch(sim, "tank", x + (k - 1) * 50, -40 - k * 30, "ground", 10 + rng() * 30, drift, 2 + rng() * 3, false);
  } else if (form === "turrets") {
    const n = 2 + (rng() < 0.45 ? 1 : 0);
    for (let r = 0; r < n; r++) launch(sim, "turret", 50 + rng() * (i - 100), -30 - r * 70, "ground", 0, 0, 0, false);
  } else if (form === "gunship") {
    launch(sim, "gunship", 90 + rng() * (i - 180), -60, "hover", 130 + rng() * 100, 5 + rng() * 3, 0, eliteOk);
  } else if (form === "bomber") {
    launch(sim, "bomber", 140 + rng() * (i - 280), -100, "straight", 38, 40, 0.6, eliteOk);
  } else if (form === "kami") {
    const n = 3 + Math.floor(rng() * 3);
    for (let r = 0; r < n; r++) launch(sim, "kami", 40 + rng() * (i - 80), -20 - r * 30, "dive", 260 + rng() * 80, 0, 0, false);
  } else if (form === "destroyer") {
    launch(sim, "destroyer", 100 + rng() * (i - 200), -140, "ground", -15, 0, 0, eliteOk);
  } else if (form === "crystalSpiral") {
    const n = 140 + rng() * (i - 280);
    for (let t = 0; t < 4; t++) launch(sim, "crystal", n, -30 - t * 50, "straight", 120, 120, 1.6, false);
  } else if (form === "crystalLine") {
    for (let n = 0; n < 4; n++) launch(sim, "crystal", 70 + n * ((i - 140) / 3), -40, "hover", 100 + rng() * 100, 3.5, 0, false);
  }
  if (rng() < 0.22) {
    const left = rng() < 0.5;
    launch(sim, "carrier", left ? -30 : i + 30, 90 + rng() * 130, "cross", left ? 70 : -70, 8, 0, false);
  }
}

function launch(
  sim: Sim,
  kind: string,
  x: number,
  y: number,
  move: MoveId,
  p0: number,
  p1: number,
  p2: number,
  elite: boolean,
) {
  const cap = sim.run.mods.pressure === 3 ? 6 : 26;
  if (sim.enemies.length >= cap) return;
  const foe = FOES[kind];
  const hp = Math.round(playedHp(kind, sim.run.wave, sim.run.danger, elite) * enemyHpMul(sim.run.mods));
  const e = makeEnemy(kind, x, y, hp, elite, false, -1);
  e.move = move;
  e.p0 = p0;
  e.p1 = p1;
  e.p2 = p2;
  e.scrap = Math.round((foe?.scrap ?? 1) * (elite ? 3 : 1));
  e.score = Math.round((foe?.score ?? 100) * (elite ? 3 : 1) / 8);
  e.r = bossRadius(kind, false);
  sim.enemies.push(e);
}

function bossRadius(kind: string, boss: boolean) {
  if (boss) return kind === "boss_battleship" ? 42 : 36;
  if (kind === "bomber" || kind === "destroyer") return 28;
  if (kind === "gunship") return 22;
  if (kind === "tank" || kind === "heli") return 16;
  if (kind === "kami") return 11;
  return 13;
}

function makeEnemy(kind: string, x: number, y: number, hp: number, elite: boolean, boss: boolean, bossId: number): Enemy {
  return {
    x, y, vx: 0, vy: 40, hp, max: hp, r: bossRadius(kind, boss), kind, t: 0,
    score: Math.round(hp), elite, boss, bossId, cd: 0.6, ringAt: -10,
    move: boss ? "hover" : "straight", phase: 0, p0: 80, p1: 0, p2: 1, scrap: 1,
  };
}

function spawnBoss(sim: Sim) {
  const id = bossIndex(sim.run.wave);
  const kind = ["boss_spider", "boss_fortress", "boss_battleship", "boss_mothership"][id] ?? "boss_spider";
  const hp = Math.round(playedHp(kind, sim.run.wave, sim.run.danger, false) * enemyHpMul(sim.run.mods));
  const e = makeEnemy(kind, FIELD_W / 2, -40, hp, false, true, id);
  e.vy = 60;
  e.score = 800 + sim.run.wave * 40;
  e.scrap = FOES[kind]?.scrap ?? 40;
  sim.enemies.push(e);
}

function stepEnemies(sim: Sim, dt: number) {
  const rng = rngOf(sim);
  for (let i = sim.enemies.length - 1; i >= 0; i--) {
    const e = sim.enemies[i]!;
    e.t += dt;
    e.cd -= dt;
    if (e.boss) stepBoss(sim, e, dt, rng);
    else {
      stepMove(sim, e, dt);
      if (e.cd <= 0 && e.y > 10 && e.y < FIELD_H - 40) {
        enemyShoot(sim, e, rng);
        e.cd = shotGap(e, sim);
      }
    }
    if (e.t > 0.85 && (e.y > FIELD_H + 50 || e.y < -150 || e.x < -120 || e.x > FIELD_W + 120)) sim.enemies.splice(i, 1);
  }
}

function stepMove(sim: Sim, e: Enemy, dt: number) {
  if (e.move === "straight") {
    e.vy = e.p0;
    e.vx = e.p1 * Math.sin(e.t * e.p2) * (e.p2 === 0 ? 1 : e.p2);
  } else if (e.move === "swoop") {
    if (e.y < e.p0 && e.phase === 0) {
      e.vy = 230;
      e.vx = 0;
    } else {
      e.phase = 1;
      e.vx += e.p1 * 420 * dt;
      e.vy = Math.max(-60, e.vy - 260 * dt);
    }
  } else if (e.move === "hover") {
    if (e.phase === 0) {
      e.vy = Math.max(30, (e.p0 - e.y) * 2.2);
      e.vx = 0;
      if (e.y >= e.p0 - 4) {
        e.phase = 1;
        e.p2 = e.t;
      }
    } else if (e.phase === 1) {
      e.vy = Math.sin(e.t * 1.7) * 12;
      e.vx = Math.cos(e.t * 0.9 + uidish(e)) * 40;
      if (e.t - e.p2 > e.p1) e.phase = 2;
    } else e.vy = Math.min(e.vy + 120 * dt, 160);
  } else if (e.move === "ground") {
    e.vy = 55 + e.p0;
    e.vx = e.p1;
    if ((e.kind === "tank" || e.kind === "destroyer") && e.p2 > 0 && e.t > e.p2) {
      e.vx = 0;
      e.vy = e.kind === "destroyer" ? 28 : 55;
    }
  } else if (e.move === "dive") {
    if (e.t < 0.55) {
      e.vy = 120;
      e.vx = 0;
    } else if (e.phase === 0) {
      e.phase = 1;
      const n = Math.atan2(sim.player.y - e.y, sim.player.x - e.x);
      e.vx = Math.cos(n) * e.p0;
      e.vy = Math.sin(n) * e.p0;
    } else {
      e.vx *= 1.01;
      e.vy *= 1.01;
    }
  } else if (e.move === "cross") {
    e.vx = e.p0;
    e.vy = Math.sin(e.t * 2) * 25 + e.p1;
  } else {
    e.vx = e.p0 * (1 - e.t * 0.35);
    e.vy = e.p1 + e.t * 60;
  }
  e.x += e.vx * dt;
  e.y += e.vy * dt;
}

function uidish(e: Enemy) {
  return (e.x * 0.01 + e.scrap) % 6.28;
}

function shotGap(e: Enemy, sim: Sim) {
  const calm = sim.run.danger === 0 ? 1.25 : 1;
  const w = sim.run.wave;
  if (e.kind === "fighter") return (1.6 + (e.t % 1.4)) * calm;
  if (e.kind === "heli") return (e.phase === 1 ? 0.28 : 1.5) * calm;
  if (e.kind === "tank" || e.kind === "turret" || e.kind === "destroyer") return (w >= 13 ? 1.3 : 2.1) * calm;
  if (e.kind === "gunship") return 0.7 * calm;
  if (e.kind === "bomber") return 0.85 * calm;
  if (e.kind === "crystal") return 0.22 * calm;
  if (e.kind === "carrier" || e.kind === "kami") return 99;
  return 1.7 * calm;
}

function stepBoss(sim: Sim, e: Enemy, dt: number, rng: () => number) {
  const targetY = e.bossId === 0 ? 210 : 128;
  e.vy += ((targetY - e.y) * 1.4 - e.vy) * dt;
  e.vx = Math.sin(e.t * (0.7 + e.bossId * 0.15)) * (50 + e.bossId * 10);
  e.x += e.vx * dt;
  e.y += e.vy * dt;
  e.x = Math.max(50, Math.min(FIELD_W - 50, e.x));
  const phase = e.hp / e.max > 0.66 ? 0 : e.hp / e.max > 0.33 ? 1 : 2;
  if (e.cd > 0 || e.y < 40) return;
  const speed = (150 + sim.run.wave * 2 + sim.run.danger * 8) * (sim.run.danger === 0 ? 0.84 : 1);
  const extra = sim.run.danger >= 4;
  const aim = Math.atan2(sim.player.y - e.y, sim.player.x - e.x);
  const dmg = (9 + sim.run.danger) * enemyShotMul(sim.run.mods);
  if (e.bossId === 0) {
    fan(sim, e.x, e.y, aim, phase === 0 ? 3 : 5, 0.18, speed, dmg);
    if (phase >= 1) ringShot(sim, e.x, e.y, 8 + phase * 2, speed * 0.75, dmg, e.t);
    e.cd = phase === 2 ? 0.7 : 1.05;
  } else if (e.bossId === 1) {
    ringShot(sim, e.x, e.y, 10 + phase * 2, speed * 0.7, dmg, e.t * 0.8);
    fan(sim, e.x, e.y, aim, 3, 0.12, speed, dmg);
    e.cd = 1.15 - phase * 0.15;
  } else if (e.bossId === 2) {
    ringShot(sim, e.x, e.y, 12 + phase * 3, speed * 0.62, dmg, e.t * 1.3);
    if (phase >= 1) fan(sim, e.x, e.y, aim, 4, 0.1, speed * 1.05, dmg);
    e.cd = 0.95;
  } else {
    ringShot(sim, e.x, e.y, 14 + phase * 2, speed * 0.66, dmg, e.t * (phase === 2 ? 2.1 : 1.1));
    fan(sim, e.x, e.y, aim, phase + 2, 0.16, speed, dmg);
    e.cd = 0.82 - phase * 0.08;
  }
  if (extra && phase === 2 && rng() < 0.45) {
    fan(sim, e.x, e.y, aim, 3, 0.22, speed * 0.9, dmg);
  }
}

function fan(sim: Sim, x: number, y: number, aim: number, n: number, spread: number, speed: number, dmg: number) {
  for (let i = 0; i < n; i++) {
    const a = aim + (i - (n - 1) / 2) * spread;
    pushBullet(sim, x, y, Math.cos(a) * speed, Math.sin(a) * speed, 4.2, dmg, false, 4, 0, "shot", "#ffb347");
  }
}

function ringShot(sim: Sim, x: number, y: number, n: number, speed: number, dmg: number, spin: number) {
  for (let i = 0; i < n; i++) {
    const a = spin + (i / n) * Math.PI * 2;
    pushBullet(sim, x, y, Math.cos(a) * speed, Math.sin(a) * speed, 4, dmg, false, 5, 0, "shot", "#ff6b5f");
  }
}

function enemyShoot(sim: Sim, e: Enemy, rng: () => number) {
  if (e.kind === "kami" || e.kind === "carrier") return;
  const speed = (128 + sim.run.wave * 3 + sim.run.danger * 8) * (sim.run.danger === 0 ? 0.82 : 1);
  const dmg = (8 + sim.run.danger * 0.6) * (e.elite ? 1.25 : 1) * enemyShotMul(sim.run.mods);
  const aim = Math.atan2(sim.player.y - e.y, sim.player.x - e.x);
  const w = sim.run.wave;
  if (e.kind === "heli" || e.kind === "gunship") {
    if (e.kind === "gunship" && Math.floor(e.t * 2) % 2 === 0) fan(sim, e.x, e.y, aim, Math.min(7, 3 + Math.floor(w / 5)), 0.22, speed, dmg);
    else fan(sim, e.x, e.y, aim, e.elite ? 3 : 1, 0.16, speed * 1.05, dmg);
  } else if (e.kind === "tank" || e.kind === "turret" || e.kind === "destroyer") {
    const n = w >= 13 ? 3 : 1;
    fan(sim, e.x, e.y, e.kind === "tank" ? Math.PI / 2 : aim, n, 0.2, speed * 0.85, dmg);
  } else if (e.kind === "bomber") {
    if (Math.floor(e.t) % 3 === 2) ringShot(sim, e.x, e.y, 10 + Math.min(8, w), speed * 0.55, dmg, e.t);
    else fan(sim, e.x, e.y, aim, 3, 0.25, speed * 0.8, dmg);
  } else if (e.kind === "crystal") {
    const a = e.t * 4;
    fan(sim, e.x, e.y, a, 2, Math.PI, speed * 0.7, dmg);
  } else if (w >= 2 && rng() < 0.7) {
    fan(sim, e.x, e.y, aim, e.elite ? 2 : 1, 0.12, speed, dmg);
  }
}

function firePlayer(sim: Sim, dt: number, counts: Record<WeaponClass, number>) {
  const stats = sim.stats;
  const rof = Math.max(0.4, 1 + stats.atkSpeed) * fireRateMul(sim.run.mods);
  sim.player.cd -= dt * rof * (counts.ballistic >= 2 ? 1.12 : 1);
  if (sim.player.cd <= 0) {
    fireMain(sim, counts);
    sim.player.cd = Math.max(0.07, 0.16 - sim.run.gunLevel * 0.008);
    if (sim.shotGap <= 0) {
      sim.sfx("shoot");
      sim.shotGap = 0.12;
    }
  }
  const pods = sim.run.pods;
  for (let i = 0; i < pods.length; i++) {
    sim.player.podCd[i] = (sim.player.podCd[i] ?? 0) - dt;
    if ((sim.player.podCd[i] ?? 0) <= 0) {
      const cd = firePod(sim, pods[i]!.id, pods[i]!.tier, i, counts);
      sim.player.podCd[i] = cd;
    }
  }
  if (counts.drone >= 4) {
    sim.player.podCd[6] = (sim.player.podCd[6] ?? 0) - dt;
    if ((sim.player.podCd[6] ?? 0) <= 0) {
      const p = orbitPoint(sim, pods.length + 1, 46);
      const tgt = nearest(sim, p.x, p.y);
      if (tgt) {
        const ang = Math.atan2(tgt.y - p.y, tgt.x - p.x);
        const dmg = scaleDmg(sim, 5 + stats.engineering * 0.4, counts, false, true);
        pushBullet(sim, p.x, p.y, Math.cos(ang) * 460, Math.sin(ang) * 460, 3.2, dmg, true, 1.2, 0, "shot", "#9dff7a");
      }
      sim.player.podCd[6] = 0.45;
    }
  }
}

function scaleDmg(sim: Sim, base: number, counts: Record<WeaponClass, number>, ballistic: boolean, drone: boolean) {
  const stats = sim.stats;
  let d = base * (1 + stats.damage) * (1 + sim.run.gunLevel * 0.04);
  if (ballistic && counts.ballistic >= 4) d *= 1.2;
  if (!ballistic && !drone && counts.energy >= 4) d *= 1.18;
  if (drone) d *= counts.drone >= 2 ? 1.3 : 1;
  d *= 1 + stats.engineering * 0.01 * (drone ? 1 : 0.15);
  d *= fireDamageMul(sim.run.mods);
  const critChance = Math.min(0.75, stats.crit + (counts.precision >= 2 ? 0.08 : 0));
  const critMul = counts.precision >= 4 ? 2.35 : 2;
  if (rngOf(sim)() < critChance) d *= critMul;
  return d;
}

function fireMain(sim: Sim, counts: Record<WeaponClass, number>) {
  const lvl = sim.run.gunLevel;
  const color = GUNS[sim.run.gun].color;
  const px = sim.player.x;
  const py = sim.player.y - 16;
  if (sim.run.gun === "spread") {
    const n = Math.min(9, 1 + lvl);
    const spread = 0.07 + n * 0.018;
    for (let i = 0; i < n; i++) {
      const a = -Math.PI / 2 + (i - (n - 1) / 2) * spread;
      const dmg = scaleDmg(sim, 6.5, counts, true, false);
      pushBullet(sim, px, py, Math.cos(a) * 640, Math.sin(a) * 640, 3.1 * (1 + sim.stats.area * 0.4), dmg, true, 1.1, counts.energy >= 2 ? 1 : 0, "shot", color);
    }
  } else if (sim.run.gun === "lance") {
    const dmg = scaleDmg(sim, 8 + lvl, counts, false, false);
    pushBullet(sim, px, py, 0, -980, 3.4, dmg, true, 0.85, 2 + Math.floor(lvl / 2) + (counts.energy >= 2 ? 1 : 0), "lance", color);
    if (lvl >= 4) pushBullet(sim, px, py, 0, -980, 3.4, dmg * 0.7, true, 0.85, 2, "lance", color);
  } else {
    const hits = 1 + Math.floor(lvl / 3);
    let fromX = px;
    let fromY = py;
    const used = new Set<Enemy>();
    for (let n = 0; n < hits; n++) {
      const tgt = nearest(sim, fromX, fromY, used);
      if (!tgt) break;
      used.add(tgt);
      const dmg = scaleDmg(sim, 9 + lvl * 0.8, counts, false, false);
      hurtEnemy(sim, tgt, dmg, counts, false);
      sim.bolts.push({ x1: fromX, y1: fromY, x2: tgt.x, y2: tgt.y, life: 0.08, color });
      fromX = tgt.x;
      fromY = tgt.y;
    }
  }
}

function firePod(sim: Sim, id: string, tier: number, index: number, counts: Record<WeaponClass, number>) {
  const stats = sim.stats;
  const px = sim.player.x;
  const py = sim.player.y - 8;
  const tMul = 1 + (tier - 1) * 0.45;
  const area = 1 + stats.area * 0.5;
  const rof = Math.max(0.45, 1 + stats.atkSpeed) * fireRateMul(sim.run.mods);
  if (id === "tracer") {
    for (let i = -1; i <= 1; i++) {
      const a = -Math.PI / 2 + i * 0.12;
      pushBullet(sim, px + i * 8, py, Math.cos(a) * 560, Math.sin(a) * 560, 2.8, scaleDmg(sim, 4.2 * tMul, counts, true, false), true, 1.2, 0, "shot", "#ffb347");
    }
    return 0.28 / rof;
  }
  if (id === "rotary") {
    const a = -Math.PI / 2 + Math.sin(sim.scroll * 0.02 + index) * 0.08;
    pushBullet(sim, px, py, Math.cos(a) * 700, Math.sin(a) * 700, 2.2, scaleDmg(sim, 2.4 * tMul, counts, true, false), true, 0.8, 0, "shot", "#ffd56a");
    return 0.07 / rof;
  }
  if (id === "scatter") {
    for (let i = 0; i < 4 + tier; i++) {
      const a = -Math.PI / 2 + (i - (3 + tier) / 2) * 0.16;
      pushBullet(sim, px, py, Math.cos(a) * 480, Math.sin(a) * 480, 3, scaleDmg(sim, 3.1 * tMul, counts, true, false), true, 0.22, 0, "shot", "#ff8a3a");
    }
    return 0.48 / rof;
  }
  if (id === "bore") {
    pushBullet(sim, px, py, 0, -860, 3.5, scaleDmg(sim, 11 * tMul, counts, true, false), true, 1.3, 4 + tier, "lance", "#fff4d2");
    return 0.55 / rof;
  }
  if (id === "lance") {
    pushBullet(sim, px + (index % 2 ? 10 : -10), py, 0, -760, 3, scaleDmg(sim, 6.5 * tMul, counts, false, false), true, 1, tier + (counts.energy >= 2 ? 1 : 0), "lance", "#5fd3ff");
    return 0.26 / rof;
  }
  if (id === "arc") {
    const tgt = nearest(sim, px, py);
    if (tgt) {
      hurtEnemy(sim, tgt, scaleDmg(sim, 8 * tMul, counts, false, false), counts, false);
      sim.bolts.push({ x1: px, y1: py, x2: tgt.x, y2: tgt.y, life: 0.07, color: "#c45bff" });
      if (tier >= 3) {
        const t2 = nearest(sim, tgt.x, tgt.y, new Set([tgt]));
        if (t2) {
          hurtEnemy(sim, t2, scaleDmg(sim, 5 * tMul, counts, false, false), counts, false);
          sim.bolts.push({ x1: tgt.x, y1: tgt.y, x2: t2.x, y2: t2.y, life: 0.07, color: "#e7a6ff" });
        }
      }
    }
    return 0.42 / rof;
  }
  if (id === "ring") {
    pushBullet(sim, px, py, 0, -40, 10, scaleDmg(sim, 5 * tMul, counts, false, false), true, 0.55, 99, "ring", "#8ee7ff");
    return 0.85 / rof;
  }
  if (id === "seeker") {
    pushBullet(sim, px, py, 0, -220, 4, scaleDmg(sim, 7 * tMul, counts, false, false), true, 2.2, 0, "seeker", "#ffb347");
    return 0.55 / rof;
  }
  if (id === "warhead") {
    const b = pushBullet(sim, px, py, 0, -260, 5, scaleDmg(sim, 6 * tMul, counts, false, false), true, 1.35, 0, "warhead", "#ff4b3a");
    b.boom = (58 + tier * 8) * area * (counts.explosive >= 2 ? 1.25 : 1);
    return 0.95 / rof;
  }
  if (id === "canister") {
    const b = pushBullet(sim, px, py, 0, -300, 4, 1, true, 0.7, 0, "canister", "#ff8f6b");
    b.boom = tier;
    return 0.8 / rof;
  }
  if (id === "wing") {
    const p = orbitPoint(sim, index, 36 + tier * 6);
    const tgt = nearest(sim, p.x, p.y);
    if (tgt) {
      const ang = Math.atan2(tgt.y - p.y, tgt.x - p.x);
      pushBullet(
        sim,
        p.x,
        p.y,
        Math.cos(ang) * 480,
        Math.sin(ang) * 480,
        3,
        scaleDmg(sim, (4 + tier) * 1.1, counts, false, true),
        true,
        1.1,
        0,
        "shot",
        "#9dff7a",
      );
    }
    return 0.38 / rof;
  }
  if (id === "aegis") return 0.5;
  return 0.5;
}

function orbitPoint(sim: Sim, index: number, radius: number) {
  const a = sim.player.orbit + index * 1.2;
  return { x: sim.player.x + Math.cos(a) * radius, y: sim.player.y + Math.sin(a) * radius * 0.72 };
}

export function dronePoints(sim: Sim) {
  const pts: { x: number; y: number; kind: "wing" | "aegis" }[] = [];
  sim.run.pods.forEach((p, i) => {
    if (p.id === "wing" || p.id === "aegis") pts.push({ ...orbitPoint(sim, i, 36 + p.tier * 6), kind: p.id });
  });
  return pts;
}

function nearest(sim: Sim, x: number, y: number, skip?: Set<Enemy>) {
  let best: Enemy | null = null;
  let bestD = 1e9;
  for (const e of sim.enemies) {
    if (skip?.has(e)) continue;
    const d = (e.x - x) ** 2 + (e.y - y) ** 2;
    if (d < bestD) {
      bestD = d;
      best = e;
    }
  }
  return best;
}

function pushBullet(
  sim: Sim,
  x: number,
  y: number,
  vx: number,
  vy: number,
  r: number,
  dmg: number,
  friendly: boolean,
  life: number,
  pierce: number,
  kind: string,
  color: string,
) {
  if (sim.bullets.length > 460) sim.bullets.splice(0, 40);
  const b: Bullet = { x, y, vx, vy, r, dmg, friendly, life, pierce, kind, color, grazed: false, split: false, boom: 0 };
  sim.bullets.push(b);
  return b;
}

function stepBullets(sim: Sim, dt: number, counts: Record<WeaponClass, number>) {
  for (let i = sim.bullets.length - 1; i >= 0; i--) {
    const b = sim.bullets[i]!;
    if (b.kind === "seeker") {
      const t = nearest(sim, b.x, b.y);
      if (t) {
        const ang = Math.atan2(t.y - b.y, t.x - b.x);
        b.vx += Math.cos(ang) * 520 * dt;
        b.vy += Math.sin(ang) * 520 * dt;
        const sp = Math.hypot(b.vx, b.vy) || 1;
        const max = 360;
        b.vx = (b.vx / sp) * max;
        b.vy = (b.vy / sp) * max;
      }
    }
    if (b.kind === "ring") b.r += dt * 150 * (1 + sim.stats.area);
    b.x += b.vx * dt;
    b.y += b.vy * dt;
    b.life -= dt;
    if (b.kind === "canister" && !b.split && b.life < 0.32) {
      b.split = true;
      const n = 6 + Math.round(b.boom);
      for (let k = 0; k < n; k++) {
        const a = (k / n) * Math.PI * 2;
        pushBullet(sim, b.x, b.y, Math.cos(a) * 220, Math.sin(a) * 220, 3, scaleDmg(sim, 4, counts, false, false), true, 0.45, 0, "shot", "#ffb089");
      }
      b.life = 0;
    }
    if (b.life <= 0 || b.x < -40 || b.x > FIELD_W + 40 || b.y < -80 || b.y > FIELD_H + 40) {
      if (b.kind === "warhead" && b.boom > 0) explode(sim, b.x, b.y, b.boom, b.dmg, counts);
      sim.bullets.splice(i, 1);
    }
  }
}

function explode(sim: Sim, x: number, y: number, radius: number, dmg: number, counts: Record<WeaponClass, number>) {
  sim.sfx("exp");
  sim.shake = Math.min(8, sim.shake + 3);
  for (const e of sim.enemies) {
    if ((e.x - x) ** 2 + (e.y - y) ** 2 <= radius * radius) hurtEnemy(sim, e, dmg, counts, true);
  }
  for (let i = sim.bullets.length - 1; i >= 0; i--) {
    const b = sim.bullets[i]!;
    if (!b.friendly && (b.x - x) ** 2 + (b.y - y) ** 2 < (radius * 0.7) ** 2) sim.bullets.splice(i, 1);
  }
  burst(sim, x, y, "#ffb347", 14);
}

function collide(sim: Sim, counts: Record<WeaponClass, number>) {
  const px = sim.player.x;
  const py = sim.player.y;
  for (let i = sim.bullets.length - 1; i >= 0; i--) {
    const b = sim.bullets[i]!;
    if (b.friendly) {
      for (let j = sim.enemies.length - 1; j >= 0; j--) {
        const e = sim.enemies[j]!;
        const rr = b.kind === "ring" ? b.r : b.r + e.r;
        if ((b.x - e.x) ** 2 + (b.y - e.y) ** 2 <= rr * rr) {
          if (b.kind === "ring") {
            if (e.t - e.ringAt > 0.18) {
              e.ringAt = e.t;
              hurtEnemy(sim, e, b.dmg * 0.45, counts, false);
            }
          } else {
            hurtEnemy(sim, e, b.dmg, counts, b.kind === "warhead" || b.kind === "seeker");
            if (b.kind === "warhead") {
              explode(sim, b.x, b.y, b.boom || 48, b.dmg, counts);
              sim.bullets.splice(i, 1);
              break;
            }
            if (b.kind === "seeker") {
              explode(sim, b.x, b.y, 28 * (counts.explosive >= 2 ? 1.25 : 1), b.dmg * 0.6, counts);
              sim.bullets.splice(i, 1);
              break;
            }
            b.pierce -= 1;
            if (b.pierce < 0) {
              sim.bullets.splice(i, 1);
              break;
            }
          }
        }
      }
    } else {
      const dx = b.x - px;
      const dy = b.y - py;
      const d2 = dx * dx + dy * dy;
      if (d2 < (b.r + 8) ** 2) {
        hurtPlayer(sim, b.dmg);
        sim.bullets.splice(i, 1);
      } else if (!b.grazed && d2 < (26 + sim.stats.area * 10) ** 2) {
        b.grazed = true;
        sim.run.score += 6;
        sim.run.grazeBank += 1;
        if (sim.run.items.includes("graze") && sim.run.grazeBank % 4 === 0) gainScrap(sim.run, 1);
        burst(sim, b.x, b.y, "#5fd3ff", 2);
      }
    }
  }
  for (const orb of dronePoints(sim)) {
    if (orb.kind !== "aegis") continue;
    for (let i = sim.bullets.length - 1; i >= 0; i--) {
      const b = sim.bullets[i]!;
      if (b.friendly) continue;
      if ((b.x - orb.x) ** 2 + (b.y - orb.y) ** 2 < 18 ** 2) {
        sim.bullets.splice(i, 1);
        burst(sim, orb.x, orb.y, "#9dff7a", 3);
      }
    }
    for (const e of sim.enemies) {
      if ((e.x - orb.x) ** 2 + (e.y - orb.y) ** 2 < (e.r + 12) ** 2 && e.t - e.ringAt > 0.25) {
        e.ringAt = e.t;
        hurtEnemy(sim, e, scaleDmg(sim, 4, counts, false, true), counts, false);
      }
    }
  }
  if (sim.player.iframe <= 0) {
    for (const e of sim.enemies) {
      if ((e.x - px) ** 2 + (e.y - py) ** 2 < (e.r + 8) ** 2) {
        hurtPlayer(sim, e.boss ? 18 : 12);
        if (!e.boss) hurtEnemy(sim, e, 8, counts, false);
        break;
      }
    }
  }
}

function hurtEnemy(sim: Sim, e: Enemy, dmg: number, counts: Record<WeaponClass, number>, explosive: boolean) {
  e.hp -= dmg;
  if (sim.stats.lifesteal > 0) sim.run.hp = Math.min(sim.run.maxHp, sim.run.hp + dmg * sim.stats.lifesteal);
  if (e.hp <= 0) killEnemy(sim, e, explosive, counts);
}

function killEnemy(sim: Sim, e: Enemy, explosive: boolean, counts: Record<WeaponClass, number>) {
  const i = sim.enemies.indexOf(e);
  if (i >= 0) sim.enemies.splice(i, 1);
  sim.run.score += e.score;
  burst(sim, e.x, e.y, e.boss ? "#ff4b3a" : "#ffb347", e.boss ? 22 : 8);
  if (e.kind === "turret" || e.kind === "tank") sim.decals.push({ x: e.x, y: e.y, life: 8, r: e.r });
  if (e.boss) {
    sim.bossKilled = true;
    sim.shake = 10;
    gainScrap(sim.run, 30 + sim.run.wave);
    return;
  }
  const rng = rngOf(sim);
  const luck = dropMul(sim.stats.luck);
  if (e.kind === "carrier") {
    const kinds = ["spread", "lance", "arc", "power", "bomb", "repair"];
    drop(sim, e.x, e.y, kinds[Math.floor(rng() * kinds.length)]!, 0);
    if (rng() < 0.1 * Math.min(2.2, luck)) drop(sim, e.x + 12, e.y, "power", 0);
    return;
  }
  const pieces = Math.max(1, e.scrap);
  const chunks = Math.min(6, pieces);
  let left = pieces;
  for (let n = 0; n < chunks; n++) {
    const share = Math.ceil(left / (chunks - n));
    drop(sim, e.x + (rng() - 0.5) * e.r, e.y + (rng() - 0.5) * 10, "scrap", share);
    left -= share;
  }
  if (rng() < Math.min(0.8, 0.35 * (sim.stats.luck / 100))) drop(sim, e.x, e.y - 8, "scrap", 1);
  if (explosive && counts.explosive >= 4) drop(sim, e.x + 6, e.y, "scrap", 2);
  if (e.elite || e.kind === "bomber" || e.kind === "destroyer") {
    if (rng() < 0.35 * Math.min(2, luck)) drop(sim, e.x, e.y + 8, rng() < 0.5 ? "power" : "bomb", 0);
  } else if (rng() < 0.012 * luck) drop(sim, e.x, e.y, "repair", 0);
  else if (rng() < 0.05 * luck) drop(sim, e.x, e.y, "power", 0);
}

function drop(sim: Sim, x: number, y: number, kind: string, value: number) {
  sim.pickups.push({ x, y, vx: (Math.random() - 0.5) * 30, vy: 20, kind, value, life: 9 });
}

function hurtPlayer(sim: Sim, raw: number) {
  if (sim.player.iframe > 0 || sim.mode !== "wave") return;
  if (sim.run.mods.hull === 3) return;
  if (rngOf(sim)() < Math.min(0.6, sim.stats.dodge)) {
    burst(sim, sim.player.x, sim.player.y, "#5fd3ff", 4);
    return;
  }
  const armor = sim.stats.armor;
  const red = Math.max(-0.4, Math.min(0.72, armor / (Math.abs(armor) + 10)));
  const hull = hullMul(sim.run.mods);
  const dmg = Math.max(hull <= 0.4 ? 0.35 : 1, raw * (1 - red) * hull);
  sim.run.hp -= dmg;
  sim.player.iframe = 1.05;
  sim.shake = Math.min(10, sim.shake + 5);
  sim.sfx("hit");
  if (sim.run.hp <= 0) {
    if (sim.run.items.includes("phoenix") && !sim.run.reviveUsed) {
      sim.run.reviveUsed = true;
      sim.run.hp = sim.run.maxHp * 0.4;
      sim.player.iframe = 1.7;
      burst(sim, sim.player.x, sim.player.y, "#ffb347", 18);
      return;
    }
    sim.run.hp = 0;
    finishDead(sim);
  }
}

export function useBomb(sim: Sim) {
  if (sim.mode !== "wave") return;
  if (sim.run.mods.bombs < 3 && sim.run.bombs <= 0) return;
  if (sim.run.mods.bombs < 3) sim.run.bombs -= 1;
  sim.bullets = sim.bullets.filter((b) => b.friendly);
  const counts = classCounts(sim.run.pods);
  for (const e of [...sim.enemies]) hurtEnemy(sim, e, 34 * (1 + sim.stats.damage) * fireDamageMul(sim.run.mods), counts, true);
  sim.player.iframe = Math.max(sim.player.iframe, 1.25);
  sim.shake = 9;
  sim.sfx("bomb");
}

function homePickup(sim: Sim, p: Pickup, dt: number, speed: number) {
  const ang = Math.atan2(sim.player.y - p.y, sim.player.x - p.x);
  p.vx = Math.cos(ang) * speed;
  p.vy = Math.sin(ang) * speed;
  p.x += p.vx * dt;
  p.y += p.vy * dt;
}

function stepPickups(sim: Sim, dt: number) {
  const magnet = sim.run.items.includes("magnet") ? 96 : 42;
  for (let i = sim.pickups.length - 1; i >= 0; i--) {
    const p = sim.pickups[i]!;
    p.life -= dt;
    const dx = sim.player.x - p.x;
    const dy = sim.player.y - p.y;
    const d2 = dx * dx + dy * dy;
    const pull = sim.mode === "vacuum" ? 980 : magnet;
    if (d2 < pull * pull || sim.mode === "vacuum") homePickup(sim, p, dt, sim.mode === "vacuum" ? 980 : 280);
    else {
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.vy += 18 * dt;
    }
    if (d2 < 18 * 18) {
      collect(sim, p);
      sim.pickups.splice(i, 1);
      continue;
    }
    if (p.y > FIELD_H + 24 || p.life <= 0) {
      if (p.kind === "scrap") sim.run.salvage += Math.max(1, Math.round(p.value * 0.45));
      sim.pickups.splice(i, 1);
    }
  }
}

function collect(sim: Sim, p: Pickup) {
  sim.sfx("pick");
  if (p.kind === "scrap") {
    gainScrap(sim.run, p.value);
    if (sim.run.salvage > 0) {
      const back = Math.max(1, Math.round(sim.run.salvage * 0.4));
      sim.run.salvage = 0;
      gainScrap(sim.run, back);
    }
    return;
  }
  if (p.kind === "spread" || p.kind === "lance" || p.kind === "arc") {
    cycleGun(sim.run, p.kind);
    return;
  }
  if (p.kind === "power") {
    sim.run.gunLevel = Math.min(8, sim.run.gunLevel + 1);
    return;
  }
  if (p.kind === "bomb") {
    sim.run.bombs = Math.min(sim.run.bombMax, sim.run.bombs + 1);
    return;
  }
  if (p.kind === "repair") sim.run.hp = Math.min(sim.run.maxHp, sim.run.hp + sim.run.maxHp * 0.22);
}

function burst(sim: Sim, x: number, y: number, color: string, n: number) {
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    const sp = 30 + (i % 5) * 16;
    sim.particles.push({
      x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, life: 0.35 + (i % 3) * 0.08, max: 0.45, color, s: 2,
    });
  }
  if (sim.particles.length > 180) sim.particles.splice(0, sim.particles.length - 180);
}

function stepFx(sim: Sim, dt: number) {
  for (let i = sim.particles.length - 1; i >= 0; i--) {
    const p = sim.particles[i]!;
    p.life -= dt;
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    if (p.life <= 0) sim.particles.splice(i, 1);
  }
  for (let i = sim.bolts.length - 1; i >= 0; i--) {
    sim.bolts[i]!.life -= dt;
    if (sim.bolts[i]!.life <= 0) sim.bolts.splice(i, 1);
  }
  for (let i = sim.decals.length - 1; i >= 0; i--) {
    const d = sim.decals[i]!;
    d.y += 48 * dt;
    d.life -= dt;
    if (d.life <= 0 || d.y > FIELD_H + 10) sim.decals.splice(i, 1);
  }
}

export function togglePause(sim: Sim) {
  if (sim.mode === "wave" || sim.mode === "vacuum") {
    sim.held = sim.mode;
    sim.mode = "pause";
    return;
  }
  if (sim.mode === "pause") sim.mode = sim.held === "vacuum" ? "vacuum" : "wave";
}
