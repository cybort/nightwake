import { GUNS, ITEMS, SHIPS, UPGRADES, shipById } from "./data";
import { modsActive } from "./mods";
import { drawSprite, loadSprites } from "./sprites";
import { dronePoints, FIELD_H, FIELD_W, type Sim } from "./sim";

const SHIP_COLOR: Record<string, string> = {
  lantern: "#ffb347",
  kestrel: "#5fd3ff",
  redoubt: "#9dff7a",
  swarm: "#ff8f6b",
  wraith: "#c45bff",
  coffer: "#ffe08a",
};

export function paint(ctx: CanvasRenderingContext2D, sim: Sim, cssW: number, cssH: number) {
  loadSprites();
  const dpr = Math.min(2, ctx.canvas.width / Math.max(1, cssW));
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, cssW, cssH);
  ctx.fillStyle = "#07060c";
  ctx.fillRect(0, 0, cssW, cssH);
  const scale = Math.min(cssW / FIELD_W, cssH / FIELD_H);
  const ox = (cssW - FIELD_W * scale) / 2;
  const oy = (cssH - FIELD_H * scale) / 2;
  ctx.save();
  ctx.translate(ox, oy);
  ctx.scale(scale, scale);
  const shake = sim.shake;
  ctx.translate(Math.sin(sim.scroll * 0.2) * shake, Math.cos(sim.scroll * 0.17) * shake);
  drawWorld(ctx, sim);
  ctx.restore();
  return { scale, ox, oy };
}

function biome(wave: number) {
  if (wave < 5) return { sky: "#07141c", ground: "#12324a", line: "#1d4e68" };
  if (wave < 9) return { sky: "#10160f", ground: "#24361c", line: "#3e5a30" };
  if (wave < 15) return { sky: "#140f18", ground: "#2a2438", line: "#4a3d5e" };
  return { sky: "#07060f", ground: "#12121c", line: "#2a2a44" };
}

function drawWorld(ctx: CanvasRenderingContext2D, sim: Sim) {
  const b = biome(sim.run.wave);
  const g = ctx.createLinearGradient(0, 0, 0, FIELD_H);
  g.addColorStop(0, b.sky);
  g.addColorStop(1, "#05040a");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, FIELD_W, FIELD_H);

  ctx.strokeStyle = b.line;
  ctx.globalAlpha = 0.35;
  ctx.lineWidth = 2;
  const scroll = sim.scroll;
  for (let i = -1; i < 12; i++) {
    const y = ((i * 70 + scroll * 0.6) % (FIELD_H + 70)) - 20;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(FIELD_W, y + 18);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;

  for (const s of sim.stars) {
    ctx.fillStyle = `rgba(246,241,232,${0.25 + s.z * 0.5})`;
    ctx.fillRect(s.x, s.y, s.z * 2.2, s.z * 2.2);
  }

  for (const d of sim.decals) {
    ctx.fillStyle = "rgba(40,24,18,0.8)";
    ctx.beginPath();
    ctx.ellipse(d.x, d.y, d.r * 1.4, d.r * 0.7, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  if (sim.exit === "climb") {
    ctx.strokeStyle = "rgba(246,241,232,0.28)";
    ctx.lineWidth = 2;
    for (let i = 0; i < 16; i++) {
      const x = (i * 34 + sim.scroll * 3) % FIELD_W;
      const len = 28 + (i % 4) * 18;
      ctx.beginPath();
      ctx.moveTo(x, (sim.scroll * 4 + i * 48) % FIELD_H);
      ctx.lineTo(x, ((sim.scroll * 4 + i * 48) % FIELD_H) + len);
      ctx.stroke();
    }
  }

  for (const e of sim.enemies) drawEnemy(ctx, e.kind, e.x, e.y, e.elite, e.boss, e.bossId, e.hp / e.max);

  for (const b of sim.bullets) drawBullet(ctx, b);

  for (const p of sim.pickups) drawPickup(ctx, p, sim.scroll);

  for (const bolt of sim.bolts) {
    ctx.strokeStyle = bolt.color;
    ctx.globalAlpha = Math.max(0.2, bolt.life * 10);
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(bolt.x1, bolt.y1);
    ctx.lineTo(bolt.x2, bolt.y2);
    ctx.stroke();
    ctx.globalAlpha = 1;
  }

  for (const orb of dronePoints(sim)) {
    ctx.fillStyle = orb.kind === "aegis" ? "#9dff7a" : "#d8ffe0";
    ctx.beginPath();
    ctx.arc(orb.x, orb.y, orb.kind === "aegis" ? 7 : 4.5, 0, Math.PI * 2);
    ctx.fill();
  }

  for (const p of sim.particles) {
    ctx.globalAlpha = Math.max(0, p.life / p.max);
    ctx.fillStyle = p.color;
    ctx.fillRect(p.x, p.y, p.s, p.s);
    ctx.globalAlpha = 1;
  }

  if (sim.mode === "select") {
    drawShip(ctx, FIELD_W / 2, 92, sim.run.shipId, 1.7, true);
    ctx.fillStyle = "#f6f1e8";
    ctx.font = '600 16px "Chakra Petch", "PingFang SC", "Noto Sans SC", sans-serif';
    ctx.textAlign = "center";
    ctx.fillText(sim.run.shipId.toUpperCase(), FIELD_W / 2, 132);
    ctx.textAlign = "left";
  } else if (sim.mode !== "dead") {
    const blink = sim.player.iframe > 0 && Math.sin(sim.scroll) > 0;
    if (!blink) drawShip(ctx, sim.player.x, sim.player.y, sim.run.shipId, 1, true);
  }

  drawHud(ctx, sim);
}

const DROP_INDEX: Record<string, number> = {
  scrap: 0,
  repair: 1,
  bomb: 2,
  power: 3,
  spread: 4,
  lance: 5,
  arc: 6,
};

const ENEMY_INDEX: Record<string, number> = {
  fighter: 0,
  kami: 1,
  heli: 2,
  bomber: 3,
  turret: 4,
  tank: 5,
  carrier: 6,
  gunship: 2,
  destroyer: 5,
  crystal: 11,
};

function drawBullet(
  ctx: CanvasRenderingContext2D,
  b: { x: number; y: number; vx: number; vy: number; r: number; color: string; friendly: boolean; kind: string },
) {
  ctx.save();
  ctx.translate(b.x, b.y);
  if (b.kind === "ring") {
    ctx.strokeStyle = b.color;
    ctx.globalAlpha = 0.9;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, b.r, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
    return;
  }
  ctx.rotate(Math.atan2(b.vy, b.vx));
  const len = b.friendly ? Math.max(11, b.r * 4.4) : Math.max(8, b.r * 2.6);
  const thick = Math.max(2, b.r * (b.friendly ? 0.62 : 0.9));
  ctx.fillStyle = b.color;
  ctx.globalAlpha = 0.95;
  ctx.beginPath();
  ctx.roundRect(-len / 2, -thick / 2, len, thick, thick);
  ctx.fill();
  ctx.fillStyle = "#fff6e8";
  ctx.fillRect(len / 2 - 3, -thick / 3, 2.5, thick / 1.5);
  ctx.restore();
}

function drawPickup(ctx: CanvasRenderingContext2D, p: { x: number; y: number; kind: string }, scroll: number) {
  const bob = Math.sin(scroll * 0.08 + p.x * 0.2) * 2;
  const size = p.kind === "scrap" ? 26 : 22;
  if (drawSprite(ctx, "drops", DROP_INDEX[p.kind] ?? 0, p.x, p.y + bob, size)) return;
  ctx.save();
  ctx.translate(p.x, p.y + bob);
  ctx.rotate(p.kind === "scrap" ? scroll * 0.02 : 0);
  ctx.fillStyle = p.kind === "scrap" ? "#e39a3a" : "#9dff7a";
  ctx.beginPath();
  ctx.moveTo(-9, -1);
  ctx.lineTo(-2, -8);
  ctx.lineTo(9, -2);
  ctx.lineTo(4, 7);
  ctx.lineTo(-7, 6);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#fff6e8";
  ctx.fillRect(-2, -3, 4, 2);
  ctx.restore();
}

export function drawShip(ctx: CanvasRenderingContext2D, x: number, y: number, id: string, scale: number, flame: boolean) {
  const c = SHIP_COLOR[id] ?? "#ffb347";
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  if (flame) {
    const rush = 1;
    ctx.fillStyle = "#ffb347";
    ctx.globalAlpha = 0.85;
    ctx.beginPath();
    ctx.moveTo(-4, 12);
    ctx.lineTo(0, 20 + rush * 6 + (Math.sin(y + x) % 1) * 4);
    ctx.lineTo(4, 12);
    ctx.fill();
    ctx.fillStyle = "#fff1c9";
    ctx.beginPath();
    ctx.moveTo(-2, 12);
    ctx.lineTo(0, 18);
    ctx.lineTo(2, 12);
    ctx.fill();
    ctx.globalAlpha = 1;
  }
  const idx = Math.max(0, SHIPS.findIndex((s) => s.id === id));
  if (!drawSprite(ctx, "ships", idx, 0, 0, 40)) {
    ctx.fillStyle = c;
    ctx.beginPath();
    ctx.moveTo(0, -16);
    ctx.lineTo(10, 12);
    ctx.lineTo(0, 6);
    ctx.lineTo(-10, 12);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#0d0b12";
    ctx.fillRect(-2, -4, 4, 8);
  }
  ctx.restore();
}

function drawEnemy(
  ctx: CanvasRenderingContext2D,
  kind: string,
  x: number,
  y: number,
  elite: boolean,
  boss: boolean,
  bossId: number,
  hp: number,
) {
  ctx.save();
  ctx.translate(x, y);
  const sprite = boss ? 7 + Math.max(0, Math.min(3, bossId)) : (ENEMY_INDEX[kind] ?? 0);
  const size = boss ? 68 : kind === "bomber" || kind === "destroyer" ? 52 : kind === "gunship" ? 44 : kind === "tank" ? 40 : 32;
  if (!drawSprite(ctx, "enemies", sprite, 0, 0, size)) {
    ctx.fillStyle = boss ? "#ff4b3a" : elite ? "#ffd56a" : kind === "heli" ? "#8ec8ff" : kind === "tank" || kind === "turret" ? "#8d97a8" : "#d7deea";
    if (boss) {
      const w = bossId === 2 ? 54 : 40;
      ctx.fillRect(-w / 2, -16, w, 32);
      ctx.fillStyle = "#ffb347";
      ctx.fillRect(-8, -6, 16, 10);
    } else if (kind === "heli") {
      ctx.fillRect(-16, -4, 32, 8);
      ctx.fillRect(-3, -10, 6, 16);
    } else if (kind === "tank" || kind === "turret") {
      ctx.fillRect(-12, -8, 24, 16);
      ctx.fillRect(-2, -14, 4, 10);
    } else if (kind === "bomber") {
      ctx.beginPath();
      ctx.moveTo(0, 14);
      ctx.lineTo(16, -8);
      ctx.lineTo(-16, -8);
      ctx.fill();
    } else {
      ctx.beginPath();
      ctx.moveTo(0, 12);
      ctx.lineTo(9, -10);
      ctx.lineTo(-9, -10);
      ctx.fill();
    }
  }
  ctx.restore();
  if (boss || elite) {
    ctx.fillStyle = "rgba(0,0,0,0.45)";
    ctx.fillRect(x - 18, y - 28, 36, 4);
    ctx.fillStyle = boss ? "#ff4b3a" : "#ffb347";
    ctx.fillRect(x - 18, y - 28, 36 * Math.max(0, hp), 4);
  }
}

function drawHud(ctx: CanvasRenderingContext2D, sim: Sim) {
  if (sim.mode === "select") return;
  const zh = sim.lang === "zh";
  ctx.fillStyle = "rgba(7,6,12,0.55)";
  ctx.fillRect(10, 58, 150, 46);
  ctx.fillRect(FIELD_W - 132, 58, 122, 46);
  ctx.fillStyle = "#f6f1e8";
  ctx.font = '600 14px "Chakra Petch", "PingFang SC", "Noto Sans SC", sans-serif';
  ctx.fillText(`${zh ? "波次" : "WAVE"} ${sim.run.wave}`, 18, 76);
  ctx.fillStyle = "#ffb347";
  ctx.fillText(`${zh ? "残片" : "SCRAP"} ${sim.run.scrap}`, 18, 96);
  ctx.fillStyle = "#f6f1e8";
  ctx.textAlign = "right";
  const t = Math.max(0, Math.ceil(sim.timeLeft));
  const clock = sim.exit === "climb" ? (zh ? "脱离" : "EGRESS") : sim.exit === "suck" ? (zh ? "清场" : "CLEAR") : sim.mode === "hangar" ? (zh ? "机库" : "HANGAR") : `${t}s`;
  ctx.fillText(clock, FIELD_W - 18, 76);
  ctx.fillStyle = "#5fd3ff";
  ctx.fillText(`${sim.run.score}`, FIELD_W - 18, 96);
  ctx.textAlign = "left";
  if (modsActive(sim.run.mods)) {
    ctx.textAlign = "center";
    ctx.fillStyle = "#c45bff";
    ctx.fillText(zh ? "改装" : "MOD", FIELD_W / 2, 76);
    ctx.textAlign = "left";
  }

  const ratio = sim.run.maxHp > 0 ? sim.run.hp / sim.run.maxHp : 0;
  ctx.fillStyle = "#241c28";
  ctx.fillRect(16, FIELD_H - 28, FIELD_W - 32, 10);
  ctx.fillStyle = ratio < 0.35 ? "#ff4b3a" : "#9dff7a";
  ctx.fillRect(16, FIELD_H - 28, (FIELD_W - 32) * Math.max(0, ratio), 10);

  ctx.fillStyle = "#ffb347";
  for (let i = 0; i < sim.run.bombs; i++) ctx.fillRect(16 + i * 14, FIELD_H - 46, 10, 10);
  const gun = GUNS[sim.run.gun];
  ctx.fillStyle = gun.color;
  ctx.fillText(`${zh ? gun.name.zh : gun.name.en}  ${sim.run.gunLevel}`, 16 + sim.run.bombMax * 14, FIELD_H - 36);

  const carried: { sheet: "buffs" | "items"; index: number; label: string }[] = [];
  for (const id of sim.run.picks) {
    const i = UPGRADES.findIndex((u) => u.id === id);
    const u = UPGRADES[i];
    if (!u) continue;
    carried.push({ sheet: "buffs", index: i, label: zh ? u.name.zh : u.name.en });
  }
  for (const id of sim.run.items) {
    const i = ITEMS.findIndex((u) => u.id === id);
    const u = ITEMS[i];
    if (!u) continue;
    carried.push({ sheet: "items", index: i, label: zh ? u.name.zh : u.name.en });
  }
  const shown = carried.slice(0, 6);
  if (shown.length > 0) {
    const rowH = 20;
    const boxH = 8 + shown.length * rowH + (carried.length > shown.length ? 16 : 0);
    ctx.fillStyle = "rgba(7,6,12,0.55)";
    ctx.fillRect(8, 114, 158, boxH);
    shown.forEach((row, i) => {
      drawSprite(ctx, row.sheet, row.sheet === "items" ? row.index % 12 : row.index, 22, 126 + i * rowH, 16);
      ctx.fillStyle = "#f6f1e8";
      ctx.font = '600 12px "Chakra Petch", "PingFang SC", "Noto Sans SC", sans-serif';
      ctx.textAlign = "left";
      ctx.fillText(row.label, 34, 130 + i * rowH);
    });
    if (carried.length > shown.length) {
      ctx.fillStyle = "#b3a8c2";
      ctx.fillText(`+${carried.length - shown.length}`, 34, 130 + shown.length * rowH);
    }
  }

  if (sim.mode === "pause") {
    ctx.fillStyle = "rgba(7,6,12,0.55)";
    ctx.fillRect(0, 0, FIELD_W, FIELD_H);
    ctx.fillStyle = "#f6f1e8";
    ctx.font = '700 28px "Chakra Petch", "PingFang SC", sans-serif';
    ctx.textAlign = "center";
    ctx.fillText(zh ? "暂停" : "PAUSED", FIELD_W / 2, FIELD_H / 2);
    ctx.textAlign = "left";
  }
}

export function paintPoster(canvas: HTMLCanvasElement, kind: "late" | "early") {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const w = canvas.width;
  const h = canvas.height;
  ctx.clearRect(0, 0, w, h);
  const g = ctx.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, kind === "late" ? "#140f18" : "#07141c");
  g.addColorStop(1, "#07060c");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = "rgba(95,211,255,0.25)";
  for (let i = 0; i < 8; i++) {
    ctx.beginPath();
    ctx.moveTo(0, 30 + i * 28);
    ctx.lineTo(w, 48 + i * 28);
    ctx.stroke();
  }
  const enemies = kind === "late" ? 7 : 4;
  for (let i = 0; i < enemies; i++) {
    drawEnemy(ctx, i % 3 === 0 ? "heli" : i % 3 === 1 ? "tank" : "fighter", 40 + ((i * 67) % (w - 50)), 36 + (i % 4) * 32, i === 2, false, 0, 1);
  }
  if (kind === "late") {
    for (let i = 0; i < 18; i++) {
      ctx.fillStyle = i % 2 ? "#ff4b3a" : "#5fd3ff";
      ctx.beginPath();
      ctx.arc(30 + (i * 23) % (w - 20), 20 + (i * 17) % (h - 30), 2.4, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  drawShip(ctx, w / 2, h - 36, kind === "late" ? "wraith" : "lantern", 1.15, true);
}
