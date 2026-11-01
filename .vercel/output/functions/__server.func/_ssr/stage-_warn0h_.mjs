import { i as __toESM } from "../_runtime.mjs";
import { q as require_react, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as SlidersHorizontal, d as Minimize2, h as LockOpen, m as Lock, n as VolumeX, p as Maximize2, r as Volume2, u as RefreshCw, y as Bomb } from "../_libs/lucide-react.mjs";
import { i as useLang } from "./router-D7OVyJsG.mjs";
import { C as weaponById, S as shipById, _ as dropMul, b as playedHp, c as ITEMS, d as STARTER_WEAPONS, f as TIER_NAME, h as ZONE_FORMS, i as FOES, m as WEAPONS, p as UPGRADES, s as GUNS, t as BOSSES, u as SHIPS, v as itemById, w as zoneIndex, y as luckWeights } from "./dossier-BV9Zi6qy.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/stage-_warn0h_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STOCK = {
	hull: 0,
	fire: 0,
	scrap: 0,
	pressure: 0,
	bombs: 0
};
var DIALS = [
	{
		key: "hull",
		en: "Hull",
		zh: "船体",
		tiers: [
			{
				en: "Stock",
				zh: "原装",
				hintEn: "Damage lands as written.",
				hintZh: "受伤与原版一致。"
			},
			{
				en: "Plate",
				zh: "加固",
				hintEn: "Incoming damage ×0.65.",
				hintZh: "受到的伤害 ×0.65。"
			},
			{
				en: "Iron",
				zh: "铁甲",
				hintEn: "Incoming damage ×0.35.",
				hintZh: "受到的伤害 ×0.35。"
			},
			{
				en: "Undying",
				zh: "不灭",
				hintEn: "You cannot be hurt.",
				hintZh: "完全不受伤。"
			}
		]
	},
	{
		key: "fire",
		en: "Fire",
		zh: "火力",
		tiers: [
			{
				en: "Stock",
				zh: "原装",
				hintEn: "Your guns are unchanged.",
				hintZh: "火力与原版一致。"
			},
			{
				en: "Hot",
				zh: "过热",
				hintEn: "Damage ×1.6.",
				hintZh: "伤害 ×1.6。"
			},
			{
				en: "Overload",
				zh: "超载",
				hintEn: "Damage ×2.4, fire rate ×1.25.",
				hintZh: "伤害 ×2.4，射速 ×1.25。"
			},
			{
				en: "Erase",
				zh: "歼灭",
				hintEn: "Damage ×4, fire rate ×1.6.",
				hintZh: "伤害 ×4，射速 ×1.6。"
			}
		]
	},
	{
		key: "scrap",
		en: "Scrap",
		zh: "残片",
		tiers: [
			{
				en: "Stock",
				zh: "原装",
				hintEn: "Drops and prices are unchanged.",
				hintZh: "掉落和标价与原版一致。"
			},
			{
				en: "Tip",
				zh: "小费",
				hintEn: "Scrap gained ×2.",
				hintZh: "残片收益 ×2。"
			},
			{
				en: "Vault",
				zh: "金库",
				hintEn: "Scrap ×4, +50 at launch, shop leans higher tier.",
				hintZh: "残片收益 ×4，开局 +50，商店更容易出高阶。"
			},
			{
				en: "Infinite",
				zh: "无限",
				hintEn: "Buys are free, wallet stays at least 999, shop leans top tier.",
				hintZh: "购买不扣残片，钱包至少 999，商店偏向高阶。"
			}
		]
	},
	{
		key: "pressure",
		en: "Pressure",
		zh: "敌压",
		tiers: [
			{
				en: "Stock",
				zh: "原装",
				hintEn: "Waves spawn as written.",
				hintZh: "敌群与原版一致。"
			},
			{
				en: "Sparse",
				zh: "稀疏",
				hintEn: "Slower spawns, enemy hull ×0.8.",
				hintZh: "刷新变慢，敌血 ×0.8。"
			},
			{
				en: "Drill",
				zh: "演习",
				hintEn: "Much slower spawns, enemy hull ×0.55, shots ×0.6.",
				hintZh: "刷新更慢，敌血 ×0.55，敌弹伤害 ×0.6。"
			},
			{
				en: "Range",
				zh: "靶场",
				hintEn: "Few fodder, hull ×0.35, shots ×0.35. Bosses still arrive.",
				hintZh: "小怪很少，敌血 ×0.35，敌弹 ×0.35。首领仍会来。"
			}
		]
	},
	{
		key: "bombs",
		en: "Bombs",
		zh: "炸弹",
		tiers: [
			{
				en: "Stock",
				zh: "原装",
				hintEn: "Two bombs, cap of 3.",
				hintZh: "两枚起步，上限 3。"
			},
			{
				en: "Spare",
				zh: "备弹",
				hintEn: "Cap +2, and the bay fills now.",
				hintZh: "上限 +2，并立刻补满。"
			},
			{
				en: "Full",
				zh: "满仓",
				hintEn: "Cap of at least 6, refilled every hangar.",
				hintZh: "上限至少 6，每次回机库补满。"
			},
			{
				en: "Infinite",
				zh: "无限",
				hintEn: "Bombs are never spent.",
				hintZh: "炸弹不会被消耗。"
			}
		]
	}
];
var PRESETS = [
	{
		id: "stock",
		en: "Stock",
		zh: "原装",
		mods: { ...STOCK }
	},
	{
		id: "cruise",
		en: "Cruise",
		zh: "休闲",
		mods: {
			hull: 1,
			fire: 1,
			scrap: 1,
			pressure: 1,
			bombs: 1
		}
	},
	{
		id: "stomp",
		en: "Stomp",
		zh: "碾压",
		mods: {
			hull: 2,
			fire: 2,
			scrap: 2,
			pressure: 2,
			bombs: 2
		}
	},
	{
		id: "sandbox",
		en: "Sandbox",
		zh: "沙盒",
		mods: {
			hull: 3,
			fire: 3,
			scrap: 3,
			pressure: 2,
			bombs: 3
		}
	}
];
var KEY = "nw-mods";
function clampTier(n) {
	const v = Number(n);
	if (v === 1 || v === 2 || v === 3) return v;
	return 0;
}
function sanitizeMods(raw) {
	const o = raw && typeof raw === "object" ? raw : {};
	return {
		hull: clampTier(o.hull),
		fire: clampTier(o.fire),
		scrap: clampTier(o.scrap),
		pressure: clampTier(o.pressure),
		bombs: clampTier(o.bombs)
	};
}
function loadMods() {
	if (typeof localStorage === "undefined") return { ...STOCK };
	try {
		return sanitizeMods(JSON.parse(localStorage.getItem(KEY) || "null"));
	} catch {
		return { ...STOCK };
	}
}
function saveMods(mods) {
	if (typeof localStorage === "undefined") return;
	localStorage.setItem(KEY, JSON.stringify(sanitizeMods(mods)));
}
function modsActive(mods) {
	return mods.hull + mods.fire + mods.scrap + mods.pressure + mods.bombs > 0;
}
function sameMods(a, b) {
	return a.hull === b.hull && a.fire === b.fire && a.scrap === b.scrap && a.pressure === b.pressure && a.bombs === b.bombs;
}
function fireDamageMul(mods) {
	return [
		1,
		1.6,
		2.4,
		4
	][mods.fire];
}
function fireRateMul(mods) {
	return [
		1,
		1,
		1.25,
		1.6
	][mods.fire];
}
function scrapMul(mods) {
	return [
		1,
		2,
		4,
		4
	][mods.scrap];
}
function enemyHpMul(mods) {
	return [
		1,
		.8,
		.55,
		.35
	][mods.pressure];
}
function spawnGapMul(mods) {
	return [
		1,
		1.4,
		1.9,
		4
	][mods.pressure];
}
function enemyShotMul(mods) {
	return [
		1,
		1,
		.6,
		.35
	][mods.pressure];
}
function hullMul(mods) {
	return [
		1,
		.65,
		.35,
		0
	][mods.hull];
}
function emptyRun(shipId, danger, starter, best, mods = { ...STOCK }) {
	const kit = { ...mods };
	const run = {
		shipId,
		danger,
		wave: 1,
		endless: false,
		gun: shipById(shipId).gun,
		gunLevel: 1,
		pods: [{
			id: starter,
			tier: 1
		}],
		items: [],
		picks: [],
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
		locked: [
			false,
			false,
			false,
			false
		],
		crates: [],
		reviveUsed: false,
		grazeBank: 0,
		best,
		mods: kit
	};
	const stats = derive(run);
	run.hp = stats.maxHp;
	run.maxHp = stats.maxHp;
	syncMods(run);
	if (kit.scrap === 2) run.scrap += 50;
	return run;
}
function derive(run) {
	const ship = shipById(run.shipId);
	const s = {
		maxHp: Math.max(24, Math.round(100 * ship.hpMul + ship.hpFlat)),
		regen: 0,
		lifesteal: 0,
		armor: ship.armor,
		dodge: ship.dodge,
		crit: .02 + ship.crit,
		atkSpeed: ship.atkSpeed,
		area: 0,
		luck: ship.luck,
		harvesting: ship.harvesting,
		speed: ship.speed,
		damage: ship.damage,
		engineering: ship.engineering,
		scrapBonus: ship.scrapBonus
	};
	for (const id of run.picks) applyUpgrade(s, id, ship.armorGain, ship.engGain);
	for (const id of run.items) applyItem(s, id);
	s.dodge = Math.min(.6, s.dodge);
	s.maxHp = Math.max(20, Math.round(s.maxHp));
	return s;
}
function applyUpgrade(s, id, armorGain, engGain) {
	if (id === "dmg") s.damage += .08;
	else if (id === "rof") s.atkSpeed += .1;
	else if (id === "hp") s.maxHp += 12;
	else if (id === "armor") s.armor += 1 * armorGain;
	else if (id === "dodge") s.dodge += .04;
	else if (id === "crit") s.crit += .05;
	else if (id === "speed") s.speed += .06;
	else if (id === "harvest") s.harvesting += 8;
	else if (id === "luck") s.luck += 8;
	else if (id === "area") s.area += .08;
	else if (id === "eng") s.engineering += 1 * engGain;
	else if (id === "scrap") s.scrapBonus += .05;
	else if (id === "regen") s.regen += .35;
	else if (id === "leech") s.lifesteal += .03;
}
function applyItem(s, id) {
	if (id === "canopy") {
		s.damage += .25;
		s.maxHp -= 5;
	} else if (id === "overclock") {
		s.atkSpeed += .2;
		s.maxHp -= 10;
	} else if (id === "plate") s.armor += 3;
	else if (id === "harvest") s.harvesting += 20;
	else if (id === "lens") s.crit += .12;
	else if (id === "dronebay") s.engineering += 4;
	else if (id === "field") s.maxHp += 18;
	else if (id === "coin") {
		s.luck += 10;
		s.damage -= .02;
	} else if (id === "medal") {
		s.luck += 6;
		s.scrapBonus += .05;
		s.damage -= .05;
	}
}
function refreshHull(run) {
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
function syncMods(run) {
	refreshHull(run);
	if (run.mods.bombs >= 1) run.bombs = run.bombMax;
	if (run.mods.scrap === 3) run.scrap = Math.max(999, run.scrap);
	if (run.mods.hull === 3 && run.hp > 0) run.hp = run.maxHp;
}
function spendScrap(run, cost) {
	if (run.mods.scrap === 3) return true;
	if (run.scrap < cost) return false;
	run.scrap -= cost;
	return true;
}
function xpNeed(level) {
	return 18 + (level - 1) * 12;
}
function waveDuration(wave) {
	if (wave % 5 === 0) return 36 + Math.min(10, Math.floor(wave / 5) * 2);
	return Math.min(32, 14 + (wave - 1) * 1);
}
function classCounts(pods) {
	const c = {
		ballistic: 0,
		energy: 0,
		explosive: 0,
		drone: 0,
		precision: 0
	};
	for (const p of pods) for (const k of weaponById(p.id).classes) c[k] += 1;
	return c;
}
function rollBand(rng, weights) {
	const sum = weights.reduce((a, b) => a + Math.max(0, b), 0) || 1;
	let x = rng() * sum;
	for (let i = 0; i < weights.length; i++) {
		x -= Math.max(0, weights[i] ?? 0);
		if (x <= 0) return i;
	}
	return weights.length - 1;
}
function rollOffer(run, rng) {
	const luck = derive(run).luck;
	const wave = Math.max(1, run.wave);
	let weights = [...luckWeights(wave, luck)];
	if (run.mods.scrap >= 2) {
		const bump = run.mods.scrap >= 3 ? .12 : .06;
		weights = weights.map((w, i) => w + (i === 0 ? -bump : bump / 3));
	}
	const tier0 = rollBand(rng, weights);
	const tier = tier0 + 1;
	if (rng() >= .64) {
		const owned = new Set(run.items);
		for (let t = tier0; t >= 0; t--) {
			const pool = ITEMS.filter((it) => it.tier === t && !owned.has(it.id));
			if (pool.length > 0) {
				const item = pool[Math.floor(rng() * pool.length)];
				return {
					kind: "item",
					id: item.id,
					cost: Math.round(item.cost * (1 + wave * .03))
				};
			}
		}
	}
	const pool = [
		"tracer",
		"rotary",
		"scatter",
		"bore",
		"lance",
		"arc",
		"ring",
		"seeker",
		"warhead",
		"canister",
		"wing",
		"aegis"
	];
	const id = pool[Math.floor(rng() * pool.length)];
	let tierW = tier;
	if (run.mods.scrap >= 3 && rng() < .25) tierW = Math.min(4, tierW + 1);
	else if (run.mods.scrap === 2 && rng() < .12) tierW = Math.min(4, tierW + 1);
	const cost = Math.round(16 + tierW * 14 + wave * 1.1);
	return {
		kind: "pod",
		id,
		tier: tierW,
		cost
	};
}
function fillOffers(run, rng) {
	const next = [];
	for (let i = 0; i < 4; i++) if (run.locked[i] && run.offers[i]) next.push(run.offers[i]);
	else next.push(rollOffer(run, rng));
	run.offers = next;
}
function rerollCost(run) {
	return 6 + run.wave * 2;
}
function sellValue(pod) {
	return Math.round((10 + pod.tier * 12) * .45);
}
function gainScrap(run, raw) {
	const s = derive(run);
	const mul = (1 + s.harvesting * .01 + s.scrapBonus) * scrapMul(run.mods);
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
function applyLevelPick(run, id) {
	if (run.pendingLevels <= 0) return;
	run.picks.push(id);
	run.pendingLevels -= 1;
	refreshHull(run);
}
function canPlacePod(run, id, tier) {
	if (run.pods.length < 6) return true;
	return run.pods.some((p) => p.id === id && p.tier === tier && tier < 4);
}
function placePod(run, id, tier) {
	const idx = run.pods.findIndex((p) => p.id === id && p.tier === tier && tier < 4);
	if (idx >= 0) {
		run.pods[idx] = {
			id,
			tier: tier + 1
		};
		return true;
	}
	if (run.pods.length >= 6) return false;
	run.pods.push({
		id,
		tier
	});
	return true;
}
function buyOffer(run, index) {
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
function openCrate(run, index, take) {
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
function cycleGun(run, gun) {
	if (run.gun === gun) run.gunLevel = Math.min(8, run.gunLevel + 1);
	else run.gun = gun;
}
function bossIndex(wave) {
	if (wave % 5 !== 0) return -1;
	return (Math.floor(wave / 5) - 1) % 4;
}
function loadBest() {
	if (typeof localStorage === "undefined") return 0;
	try {
		const n = Number(JSON.parse(localStorage.getItem("nw-save") || "{}").best ?? 0);
		return Number.isFinite(n) ? n : 0;
	} catch {
		return 0;
	}
}
function saveBest(score, modded = false) {
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
	localStorage.setItem("nw-save", JSON.stringify({
		best,
		at: Date.now()
	}));
	return best;
}
var sheets = {};
var started = false;
function add(name, src, cols, rows) {
	const img = new Image();
	const sheet = {
		img,
		cols,
		rows,
		ready: false
	};
	img.onload = () => {
		sheet.ready = img.naturalWidth > 0;
	};
	img.src = src;
	sheets[name] = sheet;
}
function loadSprites() {
	if (started || typeof Image === "undefined") return;
	started = true;
	add("ships", "/sprites/ships.png", 2, 3);
	add("weapons", "/sprites/weapons.png", 4, 4);
	add("buffs", "/sprites/buffs.png", 4, 4);
	add("drops", "/sprites/drops.png", 3, 3);
	add("enemies", "/sprites/enemies.png", 4, 3);
	add("items", "/sprites/items.png", 4, 3);
	add("pilot", "/sprites/pilot.png", 1, 1);
}
function drawSprite(ctx, name, index, x, y, size) {
	const sheet = sheets[name];
	if (!sheet?.ready) return false;
	const { img, cols, rows } = sheet;
	const cw = img.naturalWidth / cols;
	const ch = img.naturalHeight / rows;
	const col = index % cols;
	const row = Math.floor(index / cols);
	if (row < 0 || row >= rows) return false;
	ctx.drawImage(img, col * cw, row * ch, cw, ch, x - size / 2, y - size / 2, size, size);
	return true;
}
function mulberry(seed) {
	let s = seed >>> 0;
	return () => {
		s = s + 1831565813 | 0;
		let t = Math.imul(s ^ s >>> 15, 1 | s);
		t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
		return ((t ^ t >>> 14) >>> 0) / 4294967296;
	};
}
function createSim(best) {
	const run = emptyRun("lantern", 0, "tracer", best, loadMods());
	const sim = {
		mode: "select",
		held: "select",
		run,
		player: {
			x: 240,
			y: 561.6,
			iframe: 0,
			cd: 0,
			podCd: [
				0,
				0,
				0,
				0,
				0,
				0
			],
			orbit: 0
		},
		bullets: [],
		enemies: [],
		pickups: [],
		particles: [],
		bolts: [],
		decals: [],
		keys: /* @__PURE__ */ new Set(),
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
		seed: 20958,
		stars: Array.from({ length: 70 }, (_, i) => ({
			x: i * 97 % 480,
			y: i * 53 % 720,
			z: .3 + i % 5 * .18
		})),
		shotGap: 0,
		stats: derive(run),
		lang: "en",
		sfx: () => {}
	};
	attachProbe(sim);
	return sim;
}
function attachProbe(sim) {
	if (typeof window === "undefined") return;
	window.__controlsTest = {
		getYaw: () => 0,
		getSpeed: () => sim.speed,
		getX: () => sim.player.x,
		getMode: () => sim.mode,
		getTime: () => sim.timeLeft,
		setKeys: (codes) => {
			sim.keys = new Set(codes);
		}
	};
}
function rngOf(sim) {
	const rng = mulberry(sim.seed || 1);
	return () => {
		const n = rng();
		sim.seed = sim.seed * 1664525 + 1013904223 >>> 0;
		return n;
	};
}
function reconfigure(sim, shipId, danger, starter) {
	const best = sim.run.best;
	const mods = sim.run.mods;
	sim.run = emptyRun(shipId, danger, starter, best, mods);
	sim.stats = derive(sim.run);
	sim.mode = "select";
	sim.bullets = [];
	sim.enemies = [];
	sim.pickups = [];
	sim.player.x = 240;
	sim.player.y = 561.6;
	sim.player.iframe = 0;
	sim.exit = "none";
	sim.climb = 0;
	sim.exitT = 0;
}
function beginWave(sim) {
	sim.mode = "wave";
	sim.timeLeft = waveDuration(sim.run.wave);
	sim.bossSpawned = false;
	sim.bossKilled = false;
	sim.spawnIn = .45;
	sim.bullets = sim.bullets.filter((b) => b.friendly);
	sim.player.iframe = .6;
}
function launchNext(sim) {
	if (sim.run.pendingLevels > 0) return;
	if (sim.run.wave >= 20) sim.run.endless = true;
	sim.run.wave += 1;
	beginWave(sim);
}
function enterHangar(sim) {
	const rng = rngOf(sim);
	if (sim.run.items.includes("piggy")) sim.run.scrap += Math.round(sim.run.scrap * .08);
	if (sim.bossKilled) {
		const pool = [
			"plate",
			"field",
			"harvest",
			"bay",
			"graze",
			"lens",
			"magnet",
			"overclock",
			"coin",
			"medal"
		];
		const n = 1 + (sim.run.wave >= 15 ? 1 : 0);
		for (let i = 0; i < n; i++) sim.run.crates.push(pool[Math.floor(rng() * pool.length)]);
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
function finishDead(sim) {
	const best = saveBest(sim.run.score, modsActive(sim.run.mods)) ?? sim.run.score;
	sim.run.best = best;
	sim.mode = "dead";
	sim.sfx("die");
}
function bankRun(sim) {
	const best = saveBest(sim.run.score, modsActive(sim.run.mods)) ?? sim.run.score;
	sim.run.best = best;
	sim.mode = "clear";
}
function advance(sim, dt) {
	const rush = sim.exit === "climb" ? 1 + sim.climb / 280 : 1;
	sim.scroll += Math.min(dt, .05) * (sim.mode === "wave" ? 70 : 16) * rush;
	for (const star of sim.stars) {
		star.y += Math.min(dt, .05) * (30 + star.z * 90) * (sim.mode === "wave" ? 1 : .35) * rush;
		if (star.y > 720) star.y -= 720;
	}
	if (sim.mode === "pause" || sim.mode === "select" || sim.mode === "hangar" || sim.mode === "dead" || sim.mode === "clear") return;
	sim.acc += Math.min(dt, .05);
	let guard = 0;
	const h = 1 / 60;
	while (sim.acc >= h && guard < 4) {
		tick(sim, h);
		sim.acc -= h;
		guard += 1;
	}
}
function tick(sim, dt) {
	const run = sim.run;
	sim.stats = derive(run);
	const stats = sim.stats;
	const counts = classCounts(run.pods);
	sim.player.iframe = Math.max(0, sim.player.iframe - dt);
	sim.player.orbit += dt * (1.4 + stats.engineering * .03);
	sim.shake = Math.max(0, sim.shake - dt * 14);
	sim.shotGap = Math.max(0, sim.shotGap - dt);
	if (!sim.touching && sim.exit !== "climb") movePlayer(sim, dt, stats);
	if (run.hp > 0 && stats.regen > 0 && sim.mode === "wave") run.hp = Math.min(run.maxHp, run.hp + stats.regen * dt);
	if (sim.mode === "vacuum") {
		sim.exitT += dt;
		stepFx(sim, dt);
		if (sim.exit === "climb") {
			sim.climb = Math.min(1180, sim.climb + 760 * dt);
			sim.player.y -= sim.climb * dt;
			sim.player.x += (240 - sim.player.x) * Math.min(1, dt * 3);
			sim.bullets = [];
			if (sim.player.y < -46) {
				sim.player.x = 240;
				sim.player.y = 561.6;
				sim.exit = "none";
				sim.climb = 0;
				enterHangar(sim);
			}
			return;
		}
		stepPickups(sim, dt);
		if (sim.pickups.length === 0 || sim.exitT > 2.1) {
			let raw = 0;
			for (const p of sim.pickups) if (p.kind === "scrap") raw += p.value;
			else collect(sim, p);
			if (raw > 0) gainScrap(sim.run, raw);
			sim.pickups = [];
			sim.exit = "climb";
			sim.exitT = 0;
			sim.climb = 280;
		}
		return;
	}
	sim.timeLeft -= dt;
	if (bossIndex(run.wave) >= 0 && !sim.bossSpawned && sim.timeLeft < waveDuration(run.wave) - .35) {
		spawnBoss(sim);
		sim.bossSpawned = true;
	}
	if (sim.bossKilled && sim.timeLeft > .55) sim.timeLeft = .55;
	sim.spawnIn -= dt;
	const bossUp = sim.enemies.some((e) => e.boss);
	const cap = sim.run.mods.pressure === 3 ? 5 : 22;
	if (sim.spawnIn <= 0 && sim.enemies.length < cap) {
		spawnEnemy(sim);
		sim.spawnIn = Math.max(.38, 1.25 - run.wave * .03 - run.danger * .045) * 1.7 * (bossUp ? 2.3 : 1) * (run.danger === 0 ? 1.15 : 1) * spawnGapMul(sim.run.mods);
	}
	stepEnemies(sim, dt);
	firePlayer(sim, dt, counts);
	stepBullets(sim, dt, counts);
	collide(sim, counts);
	stepPickups(sim, dt);
	stepFx(sim, dt);
	if (sim.timeLeft <= 0 && sim.mode === "wave") beginExit(sim);
}
function movePlayer(sim, dt, stats) {
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
	const sp = 272 * (1 + stats.speed) * (focus ? .46 : 1);
	sim.player.x += mx / mag * sp * dt;
	sim.player.y += my / mag * sp * dt;
	sim.speed = sp;
	clampPlayer(sim);
}
function clampPlayer(sim) {
	sim.player.x = Math.max(22, Math.min(458, sim.player.x));
	sim.player.y = Math.max(28, Math.min(694, sim.player.y));
}
function dragPlayer(sim, x, y) {
	sim.player.x = x;
	sim.player.y = y;
	clampPlayer(sim);
	sim.speed = 200;
}
function beginExit(sim) {
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
function spawnEnemy(sim) {
	const rng = rngOf(sim);
	const w = sim.run.wave;
	spawnForm(sim, weighted(rng, ZONE_FORMS[zoneIndex(w)].filter((f) => w >= f.min).map((f) => [f.id, f.w])), rng);
}
function weighted(rng, rows) {
	const sum = rows.reduce((a, r) => a + Math.max(0, r[1]), 0) || 1;
	let x = rng() * sum;
	for (const [id, w] of rows) {
		x -= Math.max(0, w);
		if (x <= 0) return id;
	}
	return rows[rows.length - 1]?.[0] ?? "vee";
}
function spawnForm(sim, form, rng) {
	const w = sim.run.wave;
	const eliteOk = sim.run.danger >= 2 && rng() < .15 + w * .01;
	if (form === "vee") {
		const n = 120 + rng() * 240;
		for (let t = 0; t < 5; t++) {
			const r = t - 2;
			launch(sim, "fighter", n + r * 34, -30 - Math.abs(r) * 30, "straight", 190, 0, 0, false);
		}
	} else if (form === "swoopL" || form === "swoopR") {
		const dir = form === "swoopL" ? -1 : 1;
		const a = dir < 0 ? 60 + rng() * 120 : 300 + rng() * 120;
		for (let n = 0; n < 5; n++) launch(sim, "fighter", a, -30 - n * 46, "swoop", 220 + rng() * 140, -dir, 0, false);
	} else if (form === "arcL" || form === "arcR") {
		const left = form === "arcL";
		for (let n = 0; n < 6; n++) launch(sim, "fighter", left ? -30 - n * 40 : 510 + n * 40, 40 + n * 6, "side", left ? 260 : -260, 40, 0, false);
	} else if (form === "column") {
		const n = 80 + rng() * 320;
		for (let t = 0; t < 6; t++) launch(sim, "fighter", n, -30 - t * 40, "straight", 170, 60, 2.4, false);
	} else if (form === "heli") {
		const n = w >= 6 ? 2 : 1;
		for (let r = 0; r < n; r++) launch(sim, "heli", 60 + rng() * 360, -40 - r * 50, "hover", 110 + rng() * 190, 3 + rng() * 3, 0, false);
	} else if (form === "tanks") {
		const n = 2 + (rng() < .5 ? 1 : 0);
		const x = 80 + rng() * 320;
		const drift = rng() * 60 - 30;
		for (let k = 0; k < n; k++) launch(sim, "tank", x + (k - 1) * 50, -40 - k * 30, "ground", 10 + rng() * 30, drift, 2 + rng() * 3, false);
	} else if (form === "turrets") {
		const n = 2 + (rng() < .45 ? 1 : 0);
		for (let r = 0; r < n; r++) launch(sim, "turret", 50 + rng() * 380, -30 - r * 70, "ground", 0, 0, 0, false);
	} else if (form === "gunship") launch(sim, "gunship", 90 + rng() * 300, -60, "hover", 130 + rng() * 100, 5 + rng() * 3, 0, eliteOk);
	else if (form === "bomber") launch(sim, "bomber", 140 + rng() * 200, -100, "straight", 38, 40, .6, eliteOk);
	else if (form === "kami") {
		const n = 3 + Math.floor(rng() * 3);
		for (let r = 0; r < n; r++) launch(sim, "kami", 40 + rng() * 400, -20 - r * 30, "dive", 260 + rng() * 80, 0, 0, false);
	} else if (form === "destroyer") launch(sim, "destroyer", 100 + rng() * 280, -140, "ground", -15, 0, 0, eliteOk);
	else if (form === "crystalSpiral") {
		const n = 140 + rng() * 200;
		for (let t = 0; t < 4; t++) launch(sim, "crystal", n, -30 - t * 50, "straight", 120, 120, 1.6, false);
	} else if (form === "crystalLine") for (let n = 0; n < 4; n++) launch(sim, "crystal", 70 + n * (340 / 3), -40, "hover", 100 + rng() * 100, 3.5, 0, false);
	if (rng() < .22) {
		const left = rng() < .5;
		launch(sim, "carrier", left ? -30 : 510, 90 + rng() * 130, "cross", left ? 70 : -70, 8, 0, false);
	}
}
function launch(sim, kind, x, y, move, p0, p1, p2, elite) {
	const cap = sim.run.mods.pressure === 3 ? 6 : 26;
	if (sim.enemies.length >= cap) return;
	const foe = FOES[kind];
	const e = makeEnemy(kind, x, y, Math.round(playedHp(kind, sim.run.wave, sim.run.danger, elite) * enemyHpMul(sim.run.mods)), elite, false, -1);
	e.move = move;
	e.p0 = p0;
	e.p1 = p1;
	e.p2 = p2;
	e.scrap = Math.round((foe?.scrap ?? 1) * (elite ? 3 : 1));
	e.score = Math.round((foe?.score ?? 100) * (elite ? 3 : 1) / 8);
	e.r = bossRadius(kind, false);
	sim.enemies.push(e);
}
function bossRadius(kind, boss) {
	if (boss) return kind === "boss_battleship" ? 42 : 36;
	if (kind === "bomber" || kind === "destroyer") return 28;
	if (kind === "gunship") return 22;
	if (kind === "tank" || kind === "heli") return 16;
	if (kind === "kami") return 11;
	return 13;
}
function makeEnemy(kind, x, y, hp, elite, boss, bossId) {
	return {
		x,
		y,
		vx: 0,
		vy: 40,
		hp,
		max: hp,
		r: bossRadius(kind, boss),
		kind,
		t: 0,
		score: Math.round(hp),
		elite,
		boss,
		bossId,
		cd: .6,
		ringAt: -10,
		move: boss ? "hover" : "straight",
		phase: 0,
		p0: 80,
		p1: 0,
		p2: 1,
		scrap: 1
	};
}
function spawnBoss(sim) {
	const id = bossIndex(sim.run.wave);
	const kind = [
		"boss_spider",
		"boss_fortress",
		"boss_battleship",
		"boss_mothership"
	][id] ?? "boss_spider";
	const e = makeEnemy(kind, 240, -40, Math.round(playedHp(kind, sim.run.wave, sim.run.danger, false) * enemyHpMul(sim.run.mods)), false, true, id);
	e.vy = 60;
	e.score = 800 + sim.run.wave * 40;
	e.scrap = FOES[kind]?.scrap ?? 40;
	sim.enemies.push(e);
}
function stepEnemies(sim, dt) {
	const rng = rngOf(sim);
	for (let i = sim.enemies.length - 1; i >= 0; i--) {
		const e = sim.enemies[i];
		e.t += dt;
		e.cd -= dt;
		if (e.boss) stepBoss(sim, e, dt, rng);
		else {
			stepMove(sim, e, dt);
			if (e.cd <= 0 && e.y > 10 && e.y < 680) {
				enemyShoot(sim, e, rng);
				e.cd = shotGap(e, sim);
			}
		}
		if (e.t > .85 && (e.y > 770 || e.y < -150 || e.x < -120 || e.x > 600)) sim.enemies.splice(i, 1);
	}
}
function stepMove(sim, e, dt) {
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
			e.vx = Math.cos(e.t * .9 + uidish(e)) * 40;
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
		if (e.t < .55) {
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
		e.vx = e.p0 * (1 - e.t * .35);
		e.vy = e.p1 + e.t * 60;
	}
	e.x += e.vx * dt;
	e.y += e.vy * dt;
}
function uidish(e) {
	return (e.x * .01 + e.scrap) % 6.28;
}
function shotGap(e, sim) {
	const calm = sim.run.danger === 0 ? 1.25 : 1;
	const w = sim.run.wave;
	if (e.kind === "fighter") return (1.6 + e.t % 1.4) * calm;
	if (e.kind === "heli") return (e.phase === 1 ? .28 : 1.5) * calm;
	if (e.kind === "tank" || e.kind === "turret" || e.kind === "destroyer") return (w >= 13 ? 1.3 : 2.1) * calm;
	if (e.kind === "gunship") return .7 * calm;
	if (e.kind === "bomber") return .85 * calm;
	if (e.kind === "crystal") return .22 * calm;
	if (e.kind === "carrier" || e.kind === "kami") return 99;
	return 1.7 * calm;
}
function stepBoss(sim, e, dt, rng) {
	const targetY = e.bossId === 0 ? 210 : 128;
	e.vy += ((targetY - e.y) * 1.4 - e.vy) * dt;
	e.vx = Math.sin(e.t * (.7 + e.bossId * .15)) * (50 + e.bossId * 10);
	e.x += e.vx * dt;
	e.y += e.vy * dt;
	e.x = Math.max(50, Math.min(430, e.x));
	const phase = e.hp / e.max > .66 ? 0 : e.hp / e.max > .33 ? 1 : 2;
	if (e.cd > 0 || e.y < 40) return;
	const speed = (150 + sim.run.wave * 2 + sim.run.danger * 8) * (sim.run.danger === 0 ? .84 : 1);
	const extra = sim.run.danger >= 4;
	const aim = Math.atan2(sim.player.y - e.y, sim.player.x - e.x);
	const dmg = (9 + sim.run.danger) * enemyShotMul(sim.run.mods);
	if (e.bossId === 0) {
		fan(sim, e.x, e.y, aim, phase === 0 ? 3 : 5, .18, speed, dmg);
		if (phase >= 1) ringShot(sim, e.x, e.y, 8 + phase * 2, speed * .75, dmg, e.t);
		e.cd = phase === 2 ? .7 : 1.05;
	} else if (e.bossId === 1) {
		ringShot(sim, e.x, e.y, 10 + phase * 2, speed * .7, dmg, e.t * .8);
		fan(sim, e.x, e.y, aim, 3, .12, speed, dmg);
		e.cd = 1.15 - phase * .15;
	} else if (e.bossId === 2) {
		ringShot(sim, e.x, e.y, 12 + phase * 3, speed * .62, dmg, e.t * 1.3);
		if (phase >= 1) fan(sim, e.x, e.y, aim, 4, .1, speed * 1.05, dmg);
		e.cd = .95;
	} else {
		ringShot(sim, e.x, e.y, 14 + phase * 2, speed * .66, dmg, e.t * (phase === 2 ? 2.1 : 1.1));
		fan(sim, e.x, e.y, aim, phase + 2, .16, speed, dmg);
		e.cd = .82 - phase * .08;
	}
	if (extra && phase === 2 && rng() < .45) fan(sim, e.x, e.y, aim, 3, .22, speed * .9, dmg);
}
function fan(sim, x, y, aim, n, spread, speed, dmg) {
	for (let i = 0; i < n; i++) {
		const a = aim + (i - (n - 1) / 2) * spread;
		pushBullet(sim, x, y, Math.cos(a) * speed, Math.sin(a) * speed, 4.2, dmg, false, 4, 0, "shot", "#ffb347");
	}
}
function ringShot(sim, x, y, n, speed, dmg, spin) {
	for (let i = 0; i < n; i++) {
		const a = spin + i / n * Math.PI * 2;
		pushBullet(sim, x, y, Math.cos(a) * speed, Math.sin(a) * speed, 4, dmg, false, 5, 0, "shot", "#ff6b5f");
	}
}
function enemyShoot(sim, e, rng) {
	if (e.kind === "kami" || e.kind === "carrier") return;
	const speed = (128 + sim.run.wave * 3 + sim.run.danger * 8) * (sim.run.danger === 0 ? .82 : 1);
	const dmg = (8 + sim.run.danger * .6) * (e.elite ? 1.25 : 1) * enemyShotMul(sim.run.mods);
	const aim = Math.atan2(sim.player.y - e.y, sim.player.x - e.x);
	const w = sim.run.wave;
	if (e.kind === "heli" || e.kind === "gunship") {
		if (e.kind === "gunship" && Math.floor(e.t * 2) % 2 === 0) fan(sim, e.x, e.y, aim, Math.min(7, 3 + Math.floor(w / 5)), .22, speed, dmg);
		else fan(sim, e.x, e.y, aim, e.elite ? 3 : 1, .16, speed * 1.05, dmg);
	} else if (e.kind === "tank" || e.kind === "turret" || e.kind === "destroyer") {
		const n = w >= 13 ? 3 : 1;
		fan(sim, e.x, e.y, e.kind === "tank" ? Math.PI / 2 : aim, n, .2, speed * .85, dmg);
	} else if (e.kind === "bomber") {
		if (Math.floor(e.t) % 3 === 2) ringShot(sim, e.x, e.y, 10 + Math.min(8, w), speed * .55, dmg, e.t);
		else fan(sim, e.x, e.y, aim, 3, .25, speed * .8, dmg);
	} else if (e.kind === "crystal") {
		const a = e.t * 4;
		fan(sim, e.x, e.y, a, 2, Math.PI, speed * .7, dmg);
	} else if (w >= 2 && rng() < .7) fan(sim, e.x, e.y, aim, e.elite ? 2 : 1, .12, speed, dmg);
}
function firePlayer(sim, dt, counts) {
	const stats = sim.stats;
	const rof = Math.max(.4, 1 + stats.atkSpeed) * fireRateMul(sim.run.mods);
	sim.player.cd -= dt * rof * (counts.ballistic >= 2 ? 1.12 : 1);
	if (sim.player.cd <= 0) {
		fireMain(sim, counts);
		sim.player.cd = Math.max(.07, .16 - sim.run.gunLevel * .008);
		if (sim.shotGap <= 0) {
			sim.sfx("shoot");
			sim.shotGap = .12;
		}
	}
	const pods = sim.run.pods;
	for (let i = 0; i < pods.length; i++) {
		sim.player.podCd[i] = (sim.player.podCd[i] ?? 0) - dt;
		if ((sim.player.podCd[i] ?? 0) <= 0) {
			const cd = firePod(sim, pods[i].id, pods[i].tier, i, counts);
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
				const dmg = scaleDmg(sim, 5 + stats.engineering * .4, counts, false, true);
				pushBullet(sim, p.x, p.y, Math.cos(ang) * 460, Math.sin(ang) * 460, 3.2, dmg, true, 1.2, 0, "shot", "#9dff7a");
			}
			sim.player.podCd[6] = .45;
		}
	}
}
function scaleDmg(sim, base, counts, ballistic, drone) {
	const stats = sim.stats;
	let d = base * (1 + stats.damage) * (1 + sim.run.gunLevel * .04);
	if (ballistic && counts.ballistic >= 4) d *= 1.2;
	if (!ballistic && !drone && counts.energy >= 4) d *= 1.18;
	if (drone) d *= counts.drone >= 2 ? 1.3 : 1;
	d *= 1 + stats.engineering * .01 * (drone ? 1 : .15);
	d *= fireDamageMul(sim.run.mods);
	const critChance = Math.min(.75, stats.crit + (counts.precision >= 2 ? .08 : 0));
	const critMul = counts.precision >= 4 ? 2.35 : 2;
	if (rngOf(sim)() < critChance) d *= critMul;
	return d;
}
function fireMain(sim, counts) {
	const lvl = sim.run.gunLevel;
	const color = GUNS[sim.run.gun].color;
	const px = sim.player.x;
	const py = sim.player.y - 16;
	if (sim.run.gun === "spread") {
		const n = Math.min(9, 1 + lvl);
		const spread = .07 + n * .018;
		for (let i = 0; i < n; i++) {
			const a = -Math.PI / 2 + (i - (n - 1) / 2) * spread;
			const dmg = scaleDmg(sim, 6.5, counts, true, false);
			pushBullet(sim, px, py, Math.cos(a) * 640, Math.sin(a) * 640, 3.1 * (1 + sim.stats.area * .4), dmg, true, 1.1, counts.energy >= 2 ? 1 : 0, "shot", color);
		}
	} else if (sim.run.gun === "lance") {
		const dmg = scaleDmg(sim, 8 + lvl, counts, false, false);
		pushBullet(sim, px, py, 0, -980, 3.4, dmg, true, .85, 2 + Math.floor(lvl / 2) + (counts.energy >= 2 ? 1 : 0), "lance", color);
		if (lvl >= 4) pushBullet(sim, px, py, 0, -980, 3.4, dmg * .7, true, .85, 2, "lance", color);
	} else {
		const hits = 1 + Math.floor(lvl / 3);
		let fromX = px;
		let fromY = py;
		const used = /* @__PURE__ */ new Set();
		for (let n = 0; n < hits; n++) {
			const tgt = nearest(sim, fromX, fromY, used);
			if (!tgt) break;
			used.add(tgt);
			hurtEnemy(sim, tgt, scaleDmg(sim, 9 + lvl * .8, counts, false, false), counts, false);
			sim.bolts.push({
				x1: fromX,
				y1: fromY,
				x2: tgt.x,
				y2: tgt.y,
				life: .08,
				color
			});
			fromX = tgt.x;
			fromY = tgt.y;
		}
	}
}
function firePod(sim, id, tier, index, counts) {
	const stats = sim.stats;
	const px = sim.player.x;
	const py = sim.player.y - 8;
	const tMul = 1 + (tier - 1) * .45;
	const area = 1 + stats.area * .5;
	const rof = Math.max(.45, 1 + stats.atkSpeed) * fireRateMul(sim.run.mods);
	if (id === "tracer") {
		for (let i = -1; i <= 1; i++) {
			const a = -Math.PI / 2 + i * .12;
			pushBullet(sim, px + i * 8, py, Math.cos(a) * 560, Math.sin(a) * 560, 2.8, scaleDmg(sim, 4.2 * tMul, counts, true, false), true, 1.2, 0, "shot", "#ffb347");
		}
		return .28 / rof;
	}
	if (id === "rotary") {
		const a = -Math.PI / 2 + Math.sin(sim.scroll * .02 + index) * .08;
		pushBullet(sim, px, py, Math.cos(a) * 700, Math.sin(a) * 700, 2.2, scaleDmg(sim, 2.4 * tMul, counts, true, false), true, .8, 0, "shot", "#ffd56a");
		return .07 / rof;
	}
	if (id === "scatter") {
		for (let i = 0; i < 4 + tier; i++) {
			const a = -Math.PI / 2 + (i - (3 + tier) / 2) * .16;
			pushBullet(sim, px, py, Math.cos(a) * 480, Math.sin(a) * 480, 3, scaleDmg(sim, 3.1 * tMul, counts, true, false), true, .22, 0, "shot", "#ff8a3a");
		}
		return .48 / rof;
	}
	if (id === "bore") {
		pushBullet(sim, px, py, 0, -860, 3.5, scaleDmg(sim, 11 * tMul, counts, true, false), true, 1.3, 4 + tier, "lance", "#fff4d2");
		return .55 / rof;
	}
	if (id === "lance") {
		pushBullet(sim, px + (index % 2 ? 10 : -10), py, 0, -760, 3, scaleDmg(sim, 6.5 * tMul, counts, false, false), true, 1, tier + (counts.energy >= 2 ? 1 : 0), "lance", "#5fd3ff");
		return .26 / rof;
	}
	if (id === "arc") {
		const tgt = nearest(sim, px, py);
		if (tgt) {
			hurtEnemy(sim, tgt, scaleDmg(sim, 8 * tMul, counts, false, false), counts, false);
			sim.bolts.push({
				x1: px,
				y1: py,
				x2: tgt.x,
				y2: tgt.y,
				life: .07,
				color: "#c45bff"
			});
			if (tier >= 3) {
				const t2 = nearest(sim, tgt.x, tgt.y, /* @__PURE__ */ new Set([tgt]));
				if (t2) {
					hurtEnemy(sim, t2, scaleDmg(sim, 5 * tMul, counts, false, false), counts, false);
					sim.bolts.push({
						x1: tgt.x,
						y1: tgt.y,
						x2: t2.x,
						y2: t2.y,
						life: .07,
						color: "#e7a6ff"
					});
				}
			}
		}
		return .42 / rof;
	}
	if (id === "ring") {
		pushBullet(sim, px, py, 0, -40, 10, scaleDmg(sim, 5 * tMul, counts, false, false), true, .55, 99, "ring", "#8ee7ff");
		return .85 / rof;
	}
	if (id === "seeker") {
		pushBullet(sim, px, py, 0, -220, 4, scaleDmg(sim, 7 * tMul, counts, false, false), true, 2.2, 0, "seeker", "#ffb347");
		return .55 / rof;
	}
	if (id === "warhead") {
		const b = pushBullet(sim, px, py, 0, -260, 5, scaleDmg(sim, 6 * tMul, counts, false, false), true, 1.35, 0, "warhead", "#ff4b3a");
		b.boom = (58 + tier * 8) * area * (counts.explosive >= 2 ? 1.25 : 1);
		return .95 / rof;
	}
	if (id === "canister") {
		const b = pushBullet(sim, px, py, 0, -300, 4, 1, true, .7, 0, "canister", "#ff8f6b");
		b.boom = tier;
		return .8 / rof;
	}
	if (id === "wing") {
		const p = orbitPoint(sim, index, 36 + tier * 6);
		const tgt = nearest(sim, p.x, p.y);
		if (tgt) {
			const ang = Math.atan2(tgt.y - p.y, tgt.x - p.x);
			pushBullet(sim, p.x, p.y, Math.cos(ang) * 480, Math.sin(ang) * 480, 3, scaleDmg(sim, (4 + tier) * 1.1, counts, false, true), true, 1.1, 0, "shot", "#9dff7a");
		}
		return .38 / rof;
	}
	if (id === "aegis") return .5;
	return .5;
}
function orbitPoint(sim, index, radius) {
	const a = sim.player.orbit + index * 1.2;
	return {
		x: sim.player.x + Math.cos(a) * radius,
		y: sim.player.y + Math.sin(a) * radius * .72
	};
}
function dronePoints(sim) {
	const pts = [];
	sim.run.pods.forEach((p, i) => {
		if (p.id === "wing" || p.id === "aegis") pts.push({
			...orbitPoint(sim, i, 36 + p.tier * 6),
			kind: p.id
		});
	});
	return pts;
}
function nearest(sim, x, y, skip) {
	let best = null;
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
function pushBullet(sim, x, y, vx, vy, r, dmg, friendly, life, pierce, kind, color) {
	if (sim.bullets.length > 460) sim.bullets.splice(0, 40);
	const b = {
		x,
		y,
		vx,
		vy,
		r,
		dmg,
		friendly,
		life,
		pierce,
		kind,
		color,
		grazed: false,
		split: false,
		boom: 0
	};
	sim.bullets.push(b);
	return b;
}
function stepBullets(sim, dt, counts) {
	for (let i = sim.bullets.length - 1; i >= 0; i--) {
		const b = sim.bullets[i];
		if (b.kind === "seeker") {
			const t = nearest(sim, b.x, b.y);
			if (t) {
				const ang = Math.atan2(t.y - b.y, t.x - b.x);
				b.vx += Math.cos(ang) * 520 * dt;
				b.vy += Math.sin(ang) * 520 * dt;
				const sp = Math.hypot(b.vx, b.vy) || 1;
				const max = 360;
				b.vx = b.vx / sp * max;
				b.vy = b.vy / sp * max;
			}
		}
		if (b.kind === "ring") b.r += dt * 150 * (1 + sim.stats.area);
		b.x += b.vx * dt;
		b.y += b.vy * dt;
		b.life -= dt;
		if (b.kind === "canister" && !b.split && b.life < .32) {
			b.split = true;
			const n = 6 + Math.round(b.boom);
			for (let k = 0; k < n; k++) {
				const a = k / n * Math.PI * 2;
				pushBullet(sim, b.x, b.y, Math.cos(a) * 220, Math.sin(a) * 220, 3, scaleDmg(sim, 4, counts, false, false), true, .45, 0, "shot", "#ffb089");
			}
			b.life = 0;
		}
		if (b.life <= 0 || b.x < -40 || b.x > 520 || b.y < -80 || b.y > 760) {
			if (b.kind === "warhead" && b.boom > 0) explode(sim, b.x, b.y, b.boom, b.dmg, counts);
			sim.bullets.splice(i, 1);
		}
	}
}
function explode(sim, x, y, radius, dmg, counts) {
	sim.sfx("exp");
	sim.shake = Math.min(8, sim.shake + 3);
	for (const e of sim.enemies) if ((e.x - x) ** 2 + (e.y - y) ** 2 <= radius * radius) hurtEnemy(sim, e, dmg, counts, true);
	for (let i = sim.bullets.length - 1; i >= 0; i--) {
		const b = sim.bullets[i];
		if (!b.friendly && (b.x - x) ** 2 + (b.y - y) ** 2 < (radius * .7) ** 2) sim.bullets.splice(i, 1);
	}
	burst(sim, x, y, "#ffb347", 14);
}
function collide(sim, counts) {
	const px = sim.player.x;
	const py = sim.player.y;
	for (let i = sim.bullets.length - 1; i >= 0; i--) {
		const b = sim.bullets[i];
		if (b.friendly) for (let j = sim.enemies.length - 1; j >= 0; j--) {
			const e = sim.enemies[j];
			const rr = b.kind === "ring" ? b.r : b.r + e.r;
			if ((b.x - e.x) ** 2 + (b.y - e.y) ** 2 <= rr * rr) {
				if (b.kind === "ring") {
					if (e.t - e.ringAt > .18) {
						e.ringAt = e.t;
						hurtEnemy(sim, e, b.dmg * .45, counts, false);
					}
				} else {
					hurtEnemy(sim, e, b.dmg, counts, b.kind === "warhead" || b.kind === "seeker");
					if (b.kind === "warhead") {
						explode(sim, b.x, b.y, b.boom || 48, b.dmg, counts);
						sim.bullets.splice(i, 1);
						break;
					}
					if (b.kind === "seeker") {
						explode(sim, b.x, b.y, 28 * (counts.explosive >= 2 ? 1.25 : 1), b.dmg * .6, counts);
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
		else {
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
			const b = sim.bullets[i];
			if (b.friendly) continue;
			if ((b.x - orb.x) ** 2 + (b.y - orb.y) ** 2 < 324) {
				sim.bullets.splice(i, 1);
				burst(sim, orb.x, orb.y, "#9dff7a", 3);
			}
		}
		for (const e of sim.enemies) if ((e.x - orb.x) ** 2 + (e.y - orb.y) ** 2 < (e.r + 12) ** 2 && e.t - e.ringAt > .25) {
			e.ringAt = e.t;
			hurtEnemy(sim, e, scaleDmg(sim, 4, counts, false, true), counts, false);
		}
	}
	if (sim.player.iframe <= 0) {
		for (const e of sim.enemies) if ((e.x - px) ** 2 + (e.y - py) ** 2 < (e.r + 8) ** 2) {
			hurtPlayer(sim, e.boss ? 18 : 12);
			if (!e.boss) hurtEnemy(sim, e, 8, counts, false);
			break;
		}
	}
}
function hurtEnemy(sim, e, dmg, counts, explosive) {
	e.hp -= dmg;
	if (sim.stats.lifesteal > 0) sim.run.hp = Math.min(sim.run.maxHp, sim.run.hp + dmg * sim.stats.lifesteal);
	if (e.hp <= 0) killEnemy(sim, e, explosive, counts);
}
function killEnemy(sim, e, explosive, counts) {
	const i = sim.enemies.indexOf(e);
	if (i >= 0) sim.enemies.splice(i, 1);
	sim.run.score += e.score;
	burst(sim, e.x, e.y, e.boss ? "#ff4b3a" : "#ffb347", e.boss ? 22 : 8);
	if (e.kind === "turret" || e.kind === "tank") sim.decals.push({
		x: e.x,
		y: e.y,
		life: 8,
		r: e.r
	});
	if (e.boss) {
		sim.bossKilled = true;
		sim.shake = 10;
		gainScrap(sim.run, 30 + sim.run.wave);
		return;
	}
	const rng = rngOf(sim);
	const luck = dropMul(sim.stats.luck);
	if (e.kind === "carrier") {
		const kinds = [
			"spread",
			"lance",
			"arc",
			"power",
			"bomb",
			"repair"
		];
		drop(sim, e.x, e.y, kinds[Math.floor(rng() * kinds.length)], 0);
		if (rng() < .1 * Math.min(2.2, luck)) drop(sim, e.x + 12, e.y, "power", 0);
		return;
	}
	const pieces = Math.max(1, e.scrap);
	const chunks = Math.min(6, pieces);
	let left = pieces;
	for (let n = 0; n < chunks; n++) {
		const share = Math.ceil(left / (chunks - n));
		drop(sim, e.x + (rng() - .5) * e.r, e.y + (rng() - .5) * 10, "scrap", share);
		left -= share;
	}
	if (rng() < Math.min(.8, .35 * (sim.stats.luck / 100))) drop(sim, e.x, e.y - 8, "scrap", 1);
	if (explosive && counts.explosive >= 4) drop(sim, e.x + 6, e.y, "scrap", 2);
	if (e.elite || e.kind === "bomber" || e.kind === "destroyer") {
		if (rng() < .35 * Math.min(2, luck)) drop(sim, e.x, e.y + 8, rng() < .5 ? "power" : "bomb", 0);
	} else if (rng() < .012 * luck) drop(sim, e.x, e.y, "repair", 0);
	else if (rng() < .05 * luck) drop(sim, e.x, e.y, "power", 0);
}
function drop(sim, x, y, kind, value) {
	sim.pickups.push({
		x,
		y,
		vx: (Math.random() - .5) * 30,
		vy: 20,
		kind,
		value,
		life: 9
	});
}
function hurtPlayer(sim, raw) {
	if (sim.player.iframe > 0 || sim.mode !== "wave") return;
	if (sim.run.mods.hull === 3) return;
	if (rngOf(sim)() < Math.min(.6, sim.stats.dodge)) {
		burst(sim, sim.player.x, sim.player.y, "#5fd3ff", 4);
		return;
	}
	const armor = sim.stats.armor;
	const red = Math.max(-.4, Math.min(.72, armor / (Math.abs(armor) + 10)));
	const hull = hullMul(sim.run.mods);
	const dmg = Math.max(hull <= .4 ? .35 : 1, raw * (1 - red) * hull);
	sim.run.hp -= dmg;
	sim.player.iframe = 1.05;
	sim.shake = Math.min(10, sim.shake + 5);
	sim.sfx("hit");
	if (sim.run.hp <= 0) {
		if (sim.run.items.includes("phoenix") && !sim.run.reviveUsed) {
			sim.run.reviveUsed = true;
			sim.run.hp = sim.run.maxHp * .4;
			sim.player.iframe = 1.7;
			burst(sim, sim.player.x, sim.player.y, "#ffb347", 18);
			return;
		}
		sim.run.hp = 0;
		finishDead(sim);
	}
}
function useBomb(sim) {
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
function homePickup(sim, p, dt, speed) {
	const ang = Math.atan2(sim.player.y - p.y, sim.player.x - p.x);
	p.vx = Math.cos(ang) * speed;
	p.vy = Math.sin(ang) * speed;
	p.x += p.vx * dt;
	p.y += p.vy * dt;
}
function stepPickups(sim, dt) {
	const magnet = sim.run.items.includes("magnet") ? 96 : 42;
	for (let i = sim.pickups.length - 1; i >= 0; i--) {
		const p = sim.pickups[i];
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
		if (d2 < 324) {
			collect(sim, p);
			sim.pickups.splice(i, 1);
			continue;
		}
		if (p.y > 744 || p.life <= 0) {
			if (p.kind === "scrap") sim.run.salvage += Math.max(1, Math.round(p.value * .45));
			sim.pickups.splice(i, 1);
		}
	}
}
function collect(sim, p) {
	sim.sfx("pick");
	if (p.kind === "scrap") {
		gainScrap(sim.run, p.value);
		if (sim.run.salvage > 0) {
			const back = Math.max(1, Math.round(sim.run.salvage * .4));
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
	if (p.kind === "repair") sim.run.hp = Math.min(sim.run.maxHp, sim.run.hp + sim.run.maxHp * .22);
}
function burst(sim, x, y, color, n) {
	for (let i = 0; i < n; i++) {
		const a = i / n * Math.PI * 2;
		const sp = 30 + i % 5 * 16;
		sim.particles.push({
			x,
			y,
			vx: Math.cos(a) * sp,
			vy: Math.sin(a) * sp,
			life: .35 + i % 3 * .08,
			max: .45,
			color,
			s: 2
		});
	}
	if (sim.particles.length > 180) sim.particles.splice(0, sim.particles.length - 180);
}
function stepFx(sim, dt) {
	for (let i = sim.particles.length - 1; i >= 0; i--) {
		const p = sim.particles[i];
		p.life -= dt;
		p.x += p.vx * dt;
		p.y += p.vy * dt;
		if (p.life <= 0) sim.particles.splice(i, 1);
	}
	for (let i = sim.bolts.length - 1; i >= 0; i--) {
		sim.bolts[i].life -= dt;
		if (sim.bolts[i].life <= 0) sim.bolts.splice(i, 1);
	}
	for (let i = sim.decals.length - 1; i >= 0; i--) {
		const d = sim.decals[i];
		d.y += 48 * dt;
		d.life -= dt;
		if (d.life <= 0 || d.y > 730) sim.decals.splice(i, 1);
	}
}
function togglePause(sim) {
	if (sim.mode === "wave" || sim.mode === "vacuum") {
		sim.held = sim.mode;
		sim.mode = "pause";
		return;
	}
	if (sim.mode === "pause") sim.mode = sim.held === "vacuum" ? "vacuum" : "wave";
}
var SHIP_COLOR = {
	lantern: "#ffb347",
	kestrel: "#5fd3ff",
	redoubt: "#9dff7a",
	swarm: "#ff8f6b",
	wraith: "#c45bff",
	coffer: "#ffe08a"
};
function paint(ctx, sim, cssW, cssH) {
	loadSprites();
	const dpr = Math.min(2, ctx.canvas.width / Math.max(1, cssW));
	ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
	ctx.clearRect(0, 0, cssW, cssH);
	ctx.fillStyle = "#07060c";
	ctx.fillRect(0, 0, cssW, cssH);
	const scale = Math.min(cssW / 480, cssH / 720);
	const ox = (cssW - 480 * scale) / 2;
	const oy = (cssH - 720 * scale) / 2;
	ctx.save();
	ctx.translate(ox, oy);
	ctx.scale(scale, scale);
	const shake = sim.shake;
	ctx.translate(Math.sin(sim.scroll * .2) * shake, Math.cos(sim.scroll * .17) * shake);
	drawWorld(ctx, sim);
	ctx.restore();
	return {
		scale,
		ox,
		oy
	};
}
function biome(wave) {
	if (wave < 5) return {
		sky: "#07141c",
		ground: "#12324a",
		line: "#1d4e68"
	};
	if (wave < 9) return {
		sky: "#10160f",
		ground: "#24361c",
		line: "#3e5a30"
	};
	if (wave < 15) return {
		sky: "#140f18",
		ground: "#2a2438",
		line: "#4a3d5e"
	};
	return {
		sky: "#07060f",
		ground: "#12121c",
		line: "#2a2a44"
	};
}
function drawWorld(ctx, sim) {
	const b = biome(sim.run.wave);
	const g = ctx.createLinearGradient(0, 0, 0, 720);
	g.addColorStop(0, b.sky);
	g.addColorStop(1, "#05040a");
	ctx.fillStyle = g;
	ctx.fillRect(0, 0, 480, 720);
	ctx.strokeStyle = b.line;
	ctx.globalAlpha = .35;
	ctx.lineWidth = 2;
	const scroll = sim.scroll;
	for (let i = -1; i < 12; i++) {
		const y = (i * 70 + scroll * .6) % 790 - 20;
		ctx.beginPath();
		ctx.moveTo(0, y);
		ctx.lineTo(480, y + 18);
		ctx.stroke();
	}
	ctx.globalAlpha = 1;
	for (const s of sim.stars) {
		ctx.fillStyle = `rgba(246,241,232,${.25 + s.z * .5})`;
		ctx.fillRect(s.x, s.y, s.z * 2.2, s.z * 2.2);
	}
	for (const d of sim.decals) {
		ctx.fillStyle = "rgba(40,24,18,0.8)";
		ctx.beginPath();
		ctx.ellipse(d.x, d.y, d.r * 1.4, d.r * .7, 0, 0, Math.PI * 2);
		ctx.fill();
	}
	if (sim.exit === "climb") {
		ctx.strokeStyle = "rgba(246,241,232,0.28)";
		ctx.lineWidth = 2;
		for (let i = 0; i < 16; i++) {
			const x = (i * 34 + sim.scroll * 3) % 480;
			const len = 28 + i % 4 * 18;
			ctx.beginPath();
			ctx.moveTo(x, (sim.scroll * 4 + i * 48) % 720);
			ctx.lineTo(x, (sim.scroll * 4 + i * 48) % 720 + len);
			ctx.stroke();
		}
	}
	for (const e of sim.enemies) drawEnemy(ctx, e.kind, e.x, e.y, e.elite, e.boss, e.bossId, e.hp / e.max);
	for (const b of sim.bullets) drawBullet(ctx, b);
	for (const p of sim.pickups) drawPickup(ctx, p, sim.scroll);
	for (const bolt of sim.bolts) {
		ctx.strokeStyle = bolt.color;
		ctx.globalAlpha = Math.max(.2, bolt.life * 10);
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
		drawShip(ctx, 240, 92, sim.run.shipId, 1.7, true);
		ctx.fillStyle = "#f6f1e8";
		ctx.font = "600 16px \"Chakra Petch\", \"PingFang SC\", \"Noto Sans SC\", sans-serif";
		ctx.textAlign = "center";
		ctx.fillText(sim.run.shipId.toUpperCase(), 240, 132);
		ctx.textAlign = "left";
	} else if (sim.mode !== "dead") {
		if (!(sim.player.iframe > 0 && Math.sin(sim.scroll) > 0)) drawShip(ctx, sim.player.x, sim.player.y, sim.run.shipId, 1, true);
	}
	drawHud(ctx, sim);
}
var DROP_INDEX = {
	scrap: 0,
	repair: 1,
	bomb: 2,
	power: 3,
	spread: 4,
	lance: 5,
	arc: 6
};
var ENEMY_INDEX = {
	fighter: 0,
	kami: 1,
	heli: 2,
	bomber: 3,
	turret: 4,
	tank: 5,
	carrier: 6,
	gunship: 2,
	destroyer: 5,
	crystal: 11
};
function drawBullet(ctx, b) {
	ctx.save();
	ctx.translate(b.x, b.y);
	if (b.kind === "ring") {
		ctx.strokeStyle = b.color;
		ctx.globalAlpha = .9;
		ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.arc(0, 0, b.r, 0, Math.PI * 2);
		ctx.stroke();
		ctx.restore();
		return;
	}
	ctx.rotate(Math.atan2(b.vy, b.vx));
	const len = b.friendly ? Math.max(11, b.r * 4.4) : Math.max(8, b.r * 2.6);
	const thick = Math.max(2, b.r * (b.friendly ? .62 : .9));
	ctx.fillStyle = b.color;
	ctx.globalAlpha = .95;
	ctx.beginPath();
	ctx.roundRect(-len / 2, -thick / 2, len, thick, thick);
	ctx.fill();
	ctx.fillStyle = "#fff6e8";
	ctx.fillRect(len / 2 - 3, -thick / 3, 2.5, thick / 1.5);
	ctx.restore();
}
function drawPickup(ctx, p, scroll) {
	const bob = Math.sin(scroll * .08 + p.x * .2) * 2;
	const size = p.kind === "scrap" ? 26 : 22;
	if (drawSprite(ctx, "drops", DROP_INDEX[p.kind] ?? 0, p.x, p.y + bob, size)) return;
	ctx.save();
	ctx.translate(p.x, p.y + bob);
	ctx.rotate(p.kind === "scrap" ? scroll * .02 : 0);
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
function drawShip(ctx, x, y, id, scale, flame) {
	const c = SHIP_COLOR[id] ?? "#ffb347";
	ctx.save();
	ctx.translate(x, y);
	ctx.scale(scale, scale);
	if (flame) {
		ctx.fillStyle = "#ffb347";
		ctx.globalAlpha = .85;
		ctx.beginPath();
		ctx.moveTo(-4, 12);
		ctx.lineTo(0, 26 + Math.sin(y + x) % 1 * 4);
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
	if (!drawSprite(ctx, "ships", Math.max(0, SHIPS.findIndex((s) => s.id === id)), 0, 0, 40)) {
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
function drawEnemy(ctx, kind, x, y, elite, boss, bossId, hp) {
	ctx.save();
	ctx.translate(x, y);
	if (!drawSprite(ctx, "enemies", boss ? 7 + Math.max(0, Math.min(3, bossId)) : ENEMY_INDEX[kind] ?? 0, 0, 0, boss ? 68 : kind === "bomber" || kind === "destroyer" ? 52 : kind === "gunship" ? 44 : kind === "tank" ? 40 : 32)) {
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
function drawHud(ctx, sim) {
	if (sim.mode === "select") return;
	const zh = sim.lang === "zh";
	ctx.fillStyle = "rgba(7,6,12,0.55)";
	ctx.fillRect(10, 58, 150, 46);
	ctx.fillRect(348, 58, 122, 46);
	ctx.fillStyle = "#f6f1e8";
	ctx.font = "600 14px \"Chakra Petch\", \"PingFang SC\", \"Noto Sans SC\", sans-serif";
	ctx.fillText(`${zh ? "波次" : "WAVE"} ${sim.run.wave}`, 18, 76);
	ctx.fillStyle = "#ffb347";
	ctx.fillText(`${zh ? "残片" : "SCRAP"} ${sim.run.scrap}`, 18, 96);
	ctx.fillStyle = "#f6f1e8";
	ctx.textAlign = "right";
	const t = Math.max(0, Math.ceil(sim.timeLeft));
	const clock = sim.exit === "climb" ? zh ? "脱离" : "EGRESS" : sim.exit === "suck" ? zh ? "清场" : "CLEAR" : sim.mode === "hangar" ? zh ? "机库" : "HANGAR" : `${t}s`;
	ctx.fillText(clock, 462, 76);
	ctx.fillStyle = "#5fd3ff";
	ctx.fillText(`${sim.run.score}`, 462, 96);
	ctx.textAlign = "left";
	if (modsActive(sim.run.mods)) {
		ctx.textAlign = "center";
		ctx.fillStyle = "#c45bff";
		ctx.fillText(zh ? "改装" : "MOD", 240, 76);
		ctx.textAlign = "left";
	}
	const ratio = sim.run.maxHp > 0 ? sim.run.hp / sim.run.maxHp : 0;
	ctx.fillStyle = "#241c28";
	ctx.fillRect(16, 692, 448, 10);
	ctx.fillStyle = ratio < .35 ? "#ff4b3a" : "#9dff7a";
	ctx.fillRect(16, 692, 448 * Math.max(0, ratio), 10);
	ctx.fillStyle = "#ffb347";
	for (let i = 0; i < sim.run.bombs; i++) ctx.fillRect(16 + i * 14, 674, 10, 10);
	const gun = GUNS[sim.run.gun];
	ctx.fillStyle = gun.color;
	ctx.fillText(`${zh ? gun.name.zh : gun.name.en}  ${sim.run.gunLevel}`, 16 + sim.run.bombMax * 14, 684);
	const carried = [];
	for (const id of sim.run.picks) {
		const i = UPGRADES.findIndex((u) => u.id === id);
		const u = UPGRADES[i];
		if (!u) continue;
		carried.push({
			sheet: "buffs",
			index: i,
			label: zh ? u.name.zh : u.name.en
		});
	}
	for (const id of sim.run.items) {
		const i = ITEMS.findIndex((u) => u.id === id);
		const u = ITEMS[i];
		if (!u) continue;
		carried.push({
			sheet: "items",
			index: i,
			label: zh ? u.name.zh : u.name.en
		});
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
			ctx.font = "600 12px \"Chakra Petch\", \"PingFang SC\", \"Noto Sans SC\", sans-serif";
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
		ctx.fillRect(0, 0, 480, 720);
		ctx.fillStyle = "#f6f1e8";
		ctx.font = "700 28px \"Chakra Petch\", \"PingFang SC\", sans-serif";
		ctx.textAlign = "center";
		ctx.fillText(zh ? "暂停" : "PAUSED", 240, 360);
		ctx.textAlign = "left";
	}
}
function paintPoster(canvas, kind) {
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
	for (let i = 0; i < enemies; i++) drawEnemy(ctx, i % 3 === 0 ? "heli" : i % 3 === 1 ? "tank" : "fighter", 40 + i * 67 % (w - 50), 36 + i % 4 * 32, i === 2, false, 0, 1);
	if (kind === "late") for (let i = 0; i < 18; i++) {
		ctx.fillStyle = i % 2 ? "#ff4b3a" : "#5fd3ff";
		ctx.beginPath();
		ctx.arc(30 + i * 23 % (w - 20), 20 + i * 17 % (h - 30), 2.4, 0, Math.PI * 2);
		ctx.fill();
	}
	drawShip(ctx, w / 2, h - 36, kind === "late" ? "wraith" : "lantern", 1.15, true);
}
function ModifierSheet({ mods, tx, onDial, onPreset, onClose }) {
	const presetId = PRESETS.find((p) => sameMods(p.mods, mods))?.id;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		id: "patch-bay",
		className: "absolute inset-x-0 bottom-0 z-40 max-h-[86%] overflow-y-auto border-t border-violet bg-bg/95 p-3 sm:p-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-lg pb-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-pixel text-[10px] leading-5 text-violet",
						children: tx("PATCH BAY", "改装台")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-1 text-xl font-semibold text-fg",
						children: tx("Built-in modifier", "内置修改器")
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onClose,
						className: "min-h-11 shrink-0 rounded-full border border-line px-4 text-sm text-fg",
						children: tx("Close", "关闭")
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-xs leading-relaxed text-muted",
					children: tx("Pick a preset or mix the dials. Anything off Stock is not written to your best score.", "选一套预设，或自己混档。只要不是原装，这局就不写入最高分。")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 grid grid-cols-4 gap-1",
					children: PRESETS.map((preset) => {
						const on = preset.id === presetId;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-pressed": on,
							onClick: () => onPreset(preset.mods),
							className: `min-h-11 rounded-full border px-1 text-xs font-semibold ${on ? "border-amber bg-amber text-bg" : "border-line bg-surface text-fg"}`,
							children: tx(preset.en, preset.zh)
						}, preset.id);
					})
				}),
				DIALS.map((dial) => {
					const tier = mods[dial.key];
					const copy = dial.tiers[tier];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-semibold text-fg",
								children: tx(dial.en, dial.zh)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 grid grid-cols-4 gap-1",
								children: dial.tiers.map((step, i) => {
									const on = tier === i;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										"aria-pressed": on,
										onClick: () => onDial(dial.key, i),
										className: `min-h-11 rounded-full border px-1 text-xs font-semibold ${on ? "border-violet bg-violet text-bg" : "border-line bg-surface text-fg"}`,
										children: tx(step.en, step.zh)
									}, step.en);
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-muted",
								children: tx(copy.hintEn, copy.hintZh)
							})
						]
					}, dial.key);
				})
			]
		})
	});
}
function makeAudio() {
	let ctx = null;
	let muted = false;
	const unlock = () => {
		const AC = window.AudioContext || window.webkitAudioContext;
		if (!AC) return;
		if (!ctx) ctx = new AC();
		if (ctx.state === "suspended") ctx.resume();
	};
	const play = (name) => {
		if (muted || !ctx) return;
		const s = {
			shoot: [
				540,
				.03,
				"square",
				.018
			],
			hit: [
				120,
				.09,
				"sawtooth",
				.05
			],
			exp: [
				80,
				.14,
				"triangle",
				.06
			],
			pick: [
				820,
				.05,
				"square",
				.03
			],
			bomb: [
				64,
				.22,
				"sawtooth",
				.07
			],
			hangar: [
				300,
				.09,
				"triangle",
				.04
			],
			die: [
				58,
				.28,
				"sawtooth",
				.06
			]
		}[name];
		if (!s) return;
		const o = ctx.createOscillator();
		const g = ctx.createGain();
		o.type = s[2];
		o.frequency.value = s[0];
		g.gain.value = s[3];
		o.connect(g);
		g.connect(ctx.destination);
		o.start();
		o.stop(ctx.currentTime + s[1]);
	};
	return {
		unlock,
		play,
		setMuted: (m) => {
			muted = m;
		}
	};
}
function rollPicks() {
	const pool = UPGRADES.map((u) => u.id);
	const out = [];
	for (let i = 0; i < 4 && pool.length; i++) {
		const idx = Math.floor(Math.random() * pool.length);
		out.push(pool.splice(idx, 1)[0]);
	}
	return out;
}
function GameStage({ full = false }) {
	const { tx, lang } = useLang();
	const langRef = (0, import_react.useRef)(lang);
	langRef.current = lang;
	const wrapRef = (0, import_react.useRef)(null);
	const canvasRef = (0, import_react.useRef)(null);
	const simRef = (0, import_react.useRef)(null);
	const picksRef = (0, import_react.useRef)([]);
	const audioRef = (0, import_react.useRef)(null);
	const dragRef = (0, import_react.useRef)(null);
	const bombEdge = (0, import_react.useRef)(false);
	const [rev, setRev] = (0, import_react.useState)(0);
	const [muted, setMuted] = (0, import_react.useState)(false);
	const [coarse, setCoarse] = (0, import_react.useState)(false);
	const [modOpen, setModOpen] = (0, import_react.useState)(false);
	const [fs, setFs] = (0, import_react.useState)(false);
	const modOpenRef = (0, import_react.useRef)(false);
	const pausedForMod = (0, import_react.useRef)(false);
	const toggleModRef = (0, import_react.useRef)(() => {});
	const bump = () => setRev((n) => n + 1);
	(0, import_react.useEffect)(() => {
		const sim = createSim(loadBest());
		simRef.current = sim;
		const audio = makeAudio();
		audioRef.current = audio;
		sim.sfx = (n) => audio.play(n);
		setCoarse(window.matchMedia("(pointer: coarse)").matches);
		const canvas = canvasRef.current;
		const wrap = wrapRef.current;
		if (!canvas || !wrap) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		let frame = 0;
		let last = performance.now();
		let lastMode = sim.mode;
		const loop = (now) => {
			const dt = Math.min(.05, (now - last) / 1e3);
			last = now;
			const rect = wrap.getBoundingClientRect();
			const dpr = Math.min(2, window.devicePixelRatio || 1);
			const w = Math.max(1, rect.width);
			const h = Math.max(1, rect.height);
			if (canvas.width !== Math.floor(w * dpr) || canvas.height !== Math.floor(h * dpr)) {
				canvas.width = Math.floor(w * dpr);
				canvas.height = Math.floor(h * dpr);
			}
			const pad = (navigator.getGamepads?.())?.[0];
			if (pad && (sim.mode === "wave" || sim.mode === "vacuum") && sim.exit !== "climb" && !sim.touching) {
				const ax = pad.axes[0] ?? 0;
				const ay = pad.axes[1] ?? 0;
				if (Math.hypot(ax, ay) > .22) {
					const sp = 272 * (1 + sim.stats.speed);
					sim.player.x = Math.max(22, Math.min(458, sim.player.x + ax * sp * dt));
					sim.player.y = Math.max(28, Math.min(694, sim.player.y + ay * sp * dt));
					sim.speed = sp;
				}
				const pressed = Boolean(pad.buttons[0]?.pressed || pad.buttons[1]?.pressed);
				if (pressed && !bombEdge.current) useBomb(sim);
				bombEdge.current = pressed;
			}
			sim.lang = langRef.current;
			advance(sim, dt);
			paint(ctx, sim, w, h);
			if (sim.mode !== lastMode) {
				if (sim.mode === "hangar") picksRef.current = sim.run.pendingLevels > 0 ? rollPicks() : [];
				lastMode = sim.mode;
				bump();
			}
			frame = requestAnimationFrame(loop);
		};
		frame = requestAnimationFrame(loop);
		const onKey = (e) => {
			if (e.repeat) return;
			const tag = e.target?.tagName;
			if (tag === "INPUT" || tag === "TEXTAREA") return;
			if (e.code === "KeyM" || (e.code === "Escape" || e.code === "KeyP") && modOpenRef.current) {
				e.preventDefault();
				toggleModRef.current();
				return;
			}
			if ((sim.mode === "wave" || sim.mode === "vacuum" || sim.mode === "pause") && [
				"ArrowUp",
				"ArrowDown",
				"ArrowLeft",
				"ArrowRight",
				"Space"
			].includes(e.code)) e.preventDefault();
			sim.keys.add(e.code);
			if (e.code === "KeyX" || e.code === "KeyK") useBomb(sim);
			if (e.code === "Escape" || e.code === "KeyP") {
				togglePause(sim);
				bump();
			}
		};
		const onUp = (e) => sim.keys.delete(e.code);
		const onBlur = () => sim.keys.clear();
		const onFs = () => setFs(document.fullscreenElement === wrapRef.current);
		window.addEventListener("keydown", onKey);
		window.addEventListener("keyup", onUp);
		window.addEventListener("blur", onBlur);
		document.addEventListener("fullscreenchange", onFs);
		bump();
		return () => {
			cancelAnimationFrame(frame);
			window.removeEventListener("keydown", onKey);
			window.removeEventListener("keyup", onUp);
			window.removeEventListener("blur", onBlur);
			document.removeEventListener("fullscreenchange", onFs);
		};
	}, []);
	const sim = simRef.current;
	const run = sim?.run;
	const onPointerDown = (e) => {
		audioRef.current?.unlock();
		const s = simRef.current;
		if (!s || s.exit === "climb" || s.mode !== "wave" && s.mode !== "vacuum") return;
		if (e.pointerType === "touch" && e.isPrimary === false) {
			useBomb(s);
			return;
		}
		dragRef.current = {
			id: e.pointerId,
			ox: e.clientX,
			oy: e.clientY,
			sx: s.player.x,
			sy: s.player.y
		};
		s.touching = true;
		e.currentTarget.setPointerCapture(e.pointerId);
	};
	const onPointerMove = (e) => {
		const d = dragRef.current;
		const s = simRef.current;
		if (!d || !s || d.id !== e.pointerId || s.exit === "climb") return;
		const rect = canvasRef.current?.getBoundingClientRect();
		if (!rect) return;
		const scale = Math.min(rect.width / 480, rect.height / 720) || 1;
		dragPlayer(s, d.sx + (e.clientX - d.ox) / scale, d.sy + (e.clientY - d.oy) / scale);
	};
	const onPointerUp = (e) => {
		if (dragRef.current?.id === e.pointerId) {
			dragRef.current = null;
			if (simRef.current) simRef.current.touching = false;
		}
	};
	const launch = () => {
		const s = simRef.current;
		if (!s) return;
		audioRef.current?.unlock();
		beginWave(s);
		bump();
	};
	const chooseShip = (id) => {
		const s = simRef.current;
		if (!s) return;
		reconfigure(s, id, s.run.danger, s.run.pods[0]?.id ?? "tracer");
		bump();
	};
	const chooseGun = (id) => {
		const s = simRef.current;
		if (!s) return;
		reconfigure(s, s.run.shipId, s.run.danger, id);
		bump();
	};
	const chooseDanger = (n) => {
		const s = simRef.current;
		if (!s) return;
		reconfigure(s, s.run.shipId, n, s.run.pods[0]?.id ?? "tracer");
		bump();
	};
	const pickUpgrade = (id) => {
		const s = simRef.current;
		if (!s) return;
		applyLevelPick(s.run, id);
		if (id === "luck") fillOffers(s.run, Math.random);
		picksRef.current = s.run.pendingLevels > 0 ? rollPicks() : [];
		bump();
	};
	const replaceBought = (i) => {
		const s = simRef.current;
		if (!s) return;
		const offer = s.run.offers[i];
		const luckItem = offer?.kind === "item" && (offer.id === "coin" || offer.id === "medal");
		if (!buyOffer(s.run, i)) {
			bump();
			return;
		}
		if (luckItem) fillOffers(s.run, Math.random);
		else {
			s.run.locked[i] = false;
			s.run.offers[i] = rollOffer(s.run, Math.random);
		}
		bump();
	};
	const toggleMod = () => {
		const s = simRef.current;
		if (!s) return;
		if (modOpenRef.current) {
			if (pausedForMod.current && s.mode === "pause") s.mode = s.held === "vacuum" ? "vacuum" : "wave";
			pausedForMod.current = false;
			modOpenRef.current = false;
			setModOpen(false);
			bump();
			return;
		}
		if (s.mode === "wave" || s.mode === "vacuum") {
			s.held = s.mode;
			s.mode = "pause";
			pausedForMod.current = true;
		} else pausedForMod.current = false;
		modOpenRef.current = true;
		setModOpen(true);
		bump();
	};
	toggleModRef.current = toggleMod;
	const toggleFs = () => {
		const el = wrapRef.current;
		if (!el) return;
		if (document.fullscreenElement) {
			document.exitFullscreen?.();
			return;
		}
		if (el.requestFullscreen) el.requestFullscreen();
		else el.webkitRequestFullscreen?.();
	};
	const setDial = (key, tier) => {
		const s = simRef.current;
		if (!s) return;
		s.run.mods = {
			...s.run.mods,
			[key]: tier
		};
		saveMods(s.run.mods);
		if (s.mode === "select") reconfigure(s, s.run.shipId, s.run.danger, s.run.pods[0]?.id ?? "tracer");
		else syncMods(s.run);
		bump();
	};
	const applyPreset = (mods) => {
		const s = simRef.current;
		if (!s) return;
		s.run.mods = { ...mods };
		saveMods(s.run.mods);
		if (s.mode === "select") reconfigure(s, s.run.shipId, s.run.danger, s.run.pods[0]?.id ?? "tracer");
		else syncMods(s.run);
		bump();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: wrapRef,
		className: `relative overflow-hidden bg-bg ${full ? "h-[100dvh]" : "h-[min(74vh,680px)] min-h-[420px] w-full"}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
				ref: canvasRef,
				className: "h-full w-full touch-none",
				onPointerDown,
				onPointerMove,
				onPointerUp,
				onPointerCancel: onPointerUp
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "absolute left-3 top-3 z-30 grid size-11 place-items-center rounded-full bg-surface/80 text-fg",
				"aria-label": tx("Fullscreen", "全屏"),
				"aria-pressed": fs,
				onClick: toggleFs,
				children: fs ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minimize2, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Maximize2, { className: "size-5" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				id: "patch-toggle",
				type: "button",
				className: `absolute right-16 top-3 z-30 grid size-11 place-items-center rounded-full ${run && modsActive(run.mods) ? "bg-violet text-bg" : "bg-surface/80 text-fg"}`,
				"aria-label": tx("Patch bay", "改装台"),
				"aria-pressed": modOpen,
				onClick: toggleMod,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { className: "size-5" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "absolute right-3 top-3 z-30 grid size-11 place-items-center rounded-full bg-surface/80 text-fg",
				"aria-label": tx("Mute", "静音"),
				onClick: () => {
					const next = !muted;
					setMuted(next);
					audioRef.current?.setMuted(next);
				},
				children: muted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "size-5" })
			}),
			sim && run && sim.mode === "select" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-x-0 bottom-0 top-40 z-20 overflow-y-auto border-t border-line bg-bg/92 p-3 sm:p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-pixel text-[10px] leading-5 text-amber",
						children: tx("NIGHTWAKE", "夜航")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-1 text-2xl font-semibold text-fg",
						children: tx("Choose a ship", "选择机体")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: tx(`Best ${run.best}`, `最高分 ${run.best}`)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 grid grid-cols-2 gap-2 lg:grid-cols-3",
						children: SHIPS.map((ship, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => chooseShip(ship.id),
							className: `rounded-xl border p-3 text-left ${run.shipId === ship.id ? "border-amber bg-surface-2" : "border-line bg-surface"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpriteThumb, {
									sheet: "ships",
									index: i,
									cols: 2,
									rows: 3,
									className: "size-12"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-sm font-semibold text-fg",
									children: ship.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs text-cyan",
									children: lang === "zh" ? ship.role.zh : ship.role.en
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs leading-snug text-muted",
								children: lang === "zh" ? ship.blurb.zh : ship.blurb.en
							})]
						}, ship.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm font-semibold text-fg",
						children: tx("Starting pod", "初始荚舱")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 flex flex-wrap gap-2",
						children: STARTER_WEAPONS.map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => chooseGun(id),
							className: `flex min-h-11 items-center gap-2 rounded-full border px-3 py-2 text-sm ${run.pods[0]?.id === id ? "border-cyan text-cyan" : "border-line text-fg"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpriteThumb, {
								sheet: "weapons",
								index: Math.max(0, WEAPONS.findIndex((w) => w.id === id)),
								cols: 4,
								rows: 4,
								className: "size-7"
							}), lang === "zh" ? weaponById(id).name.zh : weaponById(id).name.en]
						}, id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-4 text-sm font-semibold text-fg",
						children: [
							tx("Danger", "危险等级"),
							" ",
							run.danger
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "mt-2 w-full accent-[var(--color-amber)]",
						type: "range",
						min: 0,
						max: 5,
						value: run.danger,
						onChange: (e) => chooseDanger(Number(e.target.value)),
						"aria-label": tx("Danger", "危险等级")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						id: "launch-sortie",
						type: "button",
						onClick: launch,
						className: "sticky bottom-0 mt-4 min-h-11 w-full rounded-full bg-amber px-5 py-3 text-sm font-semibold text-bg",
						children: tx("Launch sortie", "起飞")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-md text-xs leading-relaxed text-muted",
						children: tx("WASD move. Shift focuses. X or K drops a bomb. M opens the patch bay. Auto-fire is on. Drag to fly on a touch screen.", "WASD 移动，Shift 精瞄，X 或 K 炸弹，M 打开改装台。自动射击。触屏按住拖动，手指不会挡住机体。")
					})
				]
			}) : null,
			sim && run && sim.mode === "hangar" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-0 z-20 overflow-y-auto bg-bg/88 p-3 sm:p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-end justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-pixel text-[10px] text-amber",
							children: tx("HANGAR", "机库")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-xl font-semibold",
							children: tx(`After wave ${run.wave}`, `第 ${run.wave} 波结束`)
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-right text-sm text-amber",
							children: [
								tx("Scrap", "残片"),
								" ",
								run.scrap,
								modsActive(run.mods) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ml-2 text-violet",
									children: tx("MOD", "改装")
								}) : null
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PassiveRow, {
						run,
						lang,
						tx
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LuckReadout, {
						run,
						lang,
						tx
					}),
					run.pendingLevels > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-fg",
							children: tx(`Level ${run.level} — pick an upgrade`, `等级 ${run.level} — 选一项强化`)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 grid grid-cols-2 gap-2",
							children: picksRef.current.map((id) => {
								const u = UPGRADES.find((x) => x.id === id);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => pickUpgrade(id),
									className: "min-h-16 rounded-xl border border-line bg-surface p-3 text-left",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-sm font-semibold",
										children: lang === "zh" ? u.name.zh : u.name.en
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs text-muted",
										children: lang === "zh" ? u.blurb.zh : u.blurb.en
									})]
								}, id);
							})
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						run.crates.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 space-y-2",
							children: run.crates.map((id, i) => {
								const item = itemById(id);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center justify-between gap-2 rounded-xl border border-line bg-surface px-3 py-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm",
										children: item ? lang === "zh" ? item.name.zh : item.name.en : id
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: "min-h-11 rounded-full bg-cyan px-3 text-sm font-semibold text-bg",
											onClick: () => {
												openCrate(run, i, true);
												bump();
											},
											children: tx("Take", "拿下")
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: "min-h-11 rounded-full border border-line px-3 text-sm",
											onClick: () => {
												openCrate(run, i, false);
												bump();
											},
											children: tx("Recycle", "回收")
										})]
									})]
								}, `${id}-${i}`);
							})
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 grid grid-cols-2 gap-2",
							children: run.offers.map((offer, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OfferCard, {
								offer,
								locked: run.locked[i] ?? false,
								lang,
								disabled: run.mods.scrap < 3 && run.scrap < offer.cost || offer.kind === "item" && run.items.includes(offer.id),
								free: run.mods.scrap === 3,
								onBuy: () => replaceBought(i),
								onLock: () => {
									run.locked[i] = !run.locked[i];
									bump();
								},
								tx
							}, `${offer.kind}-${offer.id}-${i}`))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 flex flex-wrap gap-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "min-h-11 rounded-full border border-line px-4 text-sm",
								onClick: () => {
									if (!spendScrap(run, rerollCost(run))) return;
									fillOffers(run, Math.random);
									bump();
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "mr-1 inline size-4" }), run.mods.scrap === 3 ? tx("Reroll", "重掷") : `${tx("Reroll", "重掷")} ${rerollCost(run)}`]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PodBay, {
							run,
							lang,
							tx,
							onChange: bump
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "min-h-11 rounded-full bg-amber px-5 text-sm font-semibold text-bg",
								onClick: () => {
									launchNext(sim);
									bump();
								},
								children: run.wave >= 20 ? tx(`Endless wave ${run.wave + 1}`, `无尽 第 ${run.wave + 1} 波`) : tx(`Launch wave ${run.wave + 1}`, `进入第 ${run.wave + 1} 波`)
							}), run.wave >= 20 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "min-h-11 rounded-full border border-line px-4 text-sm",
								onClick: () => {
									bankRun(sim);
									bump();
								},
								children: tx("Bank the win", "收工")
							}) : null]
						})
					] })
				]
			}) : null,
			sim && run && (sim.mode === "dead" || sim.mode === "clear") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 z-20 grid place-items-center bg-bg/80 p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-sm rounded-2xl border border-line bg-surface p-5 text-center",
					children: [
						sim.mode === "clear" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/sprites/pilot.png",
							alt: "",
							className: "mx-auto mb-3 h-40 w-auto object-contain"
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-pixel text-[10px] text-amber",
							children: sim.mode === "clear" ? tx("CLEARED", "通关") : tx("DOWN", "坠机")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 text-3xl font-semibold",
							children: run.score
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted",
							children: [
								tx(`Best ${run.best}`, `最高 ${run.best}`),
								" · ",
								tx(`Wave ${run.wave}`, `第 ${run.wave} 波`)
							]
						}),
						modsActive(run.mods) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-violet",
							children: tx("Modified run. Best score unchanged.", "改装局，最高分未改写。")
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PassiveRow, {
							run,
							lang,
							tx
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "mt-4 min-h-11 rounded-full bg-amber px-5 text-sm font-semibold text-bg",
							onClick: () => {
								reconfigure(sim, run.shipId, run.danger, run.pods[0]?.id ?? "tracer");
								sim.run.best = run.best;
								bump();
							},
							children: tx("Fly again", "再来一局")
						})
					]
				})
			}) : null,
			coarse && sim && sim.mode === "wave" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "absolute bottom-16 right-3 z-10 grid size-14 place-items-center rounded-full bg-ember text-fg",
				onPointerDown: (e) => {
					e.stopPropagation();
					if (simRef.current) useBomb(simRef.current);
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bomb, { className: "size-6" })
			}) : null,
			modOpen && run ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModifierSheet, {
				mods: run.mods,
				tx,
				onDial: setDial,
				onPreset: applyPreset,
				onClose: toggleMod
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: rev
			})
		]
	});
}
function SpriteThumb({ sheet, index, cols, rows, className = "size-9" }) {
	const cells = cols * rows;
	const n = (index % cells + cells) % cells;
	const col = n % cols;
	const row = Math.floor(n / cols);
	const x = cols <= 1 ? 0 : col / (cols - 1) * 100;
	const y = rows <= 1 ? 0 : row / (rows - 1) * 100;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		"aria-hidden": true,
		className: `inline-block shrink-0 bg-no-repeat ${className}`,
		style: {
			backgroundImage: `url(/sprites/${sheet}.png)`,
			backgroundSize: `${cols * 100}% ${rows * 100}%`,
			backgroundPosition: `${x}% ${y}%`
		}
	});
}
function LuckReadout({ run, lang, tx }) {
	const luck = derive(run).luck;
	const weights = luckWeights(Math.max(1, run.wave), luck);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-3 rounded-xl border border-line bg-surface px-3 py-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-fg",
				children: [
					tx("Luck", "幸运"),
					" ",
					luck,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-amber",
						children: [
							" · ",
							tx("drops", "掉落"),
							" ×",
							dropMul(luck).toFixed(2)
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs leading-relaxed text-muted",
				children: weights.map((w, i) => `${lang === "zh" ? TIER_NAME[i].zh : TIER_NAME[i].en} ${Math.round(w * 100)}%`).join(" · ")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs leading-relaxed text-muted",
				children: tx("Luck does not invent a rare tier. It multiplies whatever weight this wave already has. Wave 1 is all common. Drops scale from the first kill.", "幸运不会凭空造出稀有档，只放大这一波已经有的权重。第 1 波全是普通。掉落从第一架敌机就开始乘。")
			})
		]
	});
}
function PassiveRow({ run, lang, tx }) {
	if (run.picks.length === 0 && run.items.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-3 text-left",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm font-semibold text-fg",
			children: tx("Passives carried", "已选增益")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
			className: "mt-2 flex flex-wrap gap-2",
			children: [run.picks.map((id, i) => {
				const u = UPGRADES.find((x) => x.id === id);
				const index = UPGRADES.findIndex((x) => x.id === id);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex min-h-11 items-center gap-2 rounded-full border border-line bg-bg px-2 text-xs text-fg",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpriteThumb, {
						sheet: "buffs",
						index: Math.max(0, index),
						cols: 4,
						rows: 4
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: lang === "zh" ? u?.name.zh : u?.name.en })]
				}, `${id}-${i}`);
			}), run.items.map((id) => {
				const item = itemById(id);
				const index = ITEMS.findIndex((x) => x.id === id);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex min-h-11 items-center gap-2 rounded-full border border-cyan bg-bg px-2 text-xs text-fg",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpriteThumb, {
						sheet: "items",
						index: Math.max(0, index),
						cols: 4,
						rows: 3
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: lang === "zh" ? item?.name.zh : item?.name.en })]
				}, id);
			})]
		})]
	});
}
function OfferCard({ offer, locked, lang, disabled, onBuy, onLock, tx, free }) {
	const name = offer.kind === "pod" ? `${lang === "zh" ? weaponById(offer.id).name.zh : weaponById(offer.id).name.en} ${"I".repeat(offer.tier)}` : (lang === "zh" ? itemById(offer.id)?.name.zh : itemById(offer.id)?.name.en) ?? offer.id;
	const blurb = offer.kind === "pod" ? lang === "zh" ? weaponById(offer.id).blurb.zh : weaponById(offer.id).blurb.en : (lang === "zh" ? itemById(offer.id)?.blurb.zh : itemById(offer.id)?.blurb.en) ?? "";
	const icon = offer.kind === "pod" ? {
		sheet: "weapons",
		index: Math.max(0, WEAPONS.findIndex((w) => w.id === offer.id)),
		cols: 4,
		rows: 4
	} : {
		sheet: "items",
		index: Math.max(0, ITEMS.findIndex((w) => w.id === offer.id)),
		cols: 4,
		rows: 3
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `rounded-xl border p-3 ${locked ? "border-amber bg-surface-2" : "border-line bg-surface"}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpriteThumb, {
					sheet: icon.sheet,
					index: icon.index,
					cols: icon.cols,
					rows: icon.rows
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-sm font-semibold text-fg",
					children: name
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-muted",
				children: blurb
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					disabled,
					onClick: onBuy,
					className: "min-h-11 flex-1 rounded-full bg-amber text-sm font-semibold text-bg disabled:opacity-40",
					children: free ? tx("Free", "免费") : offer.cost
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onLock,
					className: "grid size-11 place-items-center rounded-full border border-line",
					"aria-label": tx("Lock", "锁定"),
					children: locked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockOpen, { className: "size-4" })
				})]
			})
		]
	});
}
function PodBay({ run, lang, tx, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm font-semibold",
				children: [
					tx("Mounted pods", "已挂荚舱"),
					" ",
					run.pods.length,
					"/6"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-2 space-y-2",
				children: run.pods.map((pod, i) => {
					const dup = run.pods.some((p, j) => j !== i && p.id === pod.id && p.tier === pod.tier && pod.tier < 4);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex flex-wrap items-center justify-between gap-2 rounded-xl border border-line px-3 py-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-2 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpriteThumb, {
									sheet: "weapons",
									index: Math.max(0, WEAPONS.findIndex((w) => w.id === pod.id)),
									cols: 4,
									rows: 4,
									className: "size-8"
								}),
								lang === "zh" ? weaponById(pod.id).name.zh : weaponById(pod.id).name.en,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-amber",
									children: "I".repeat(pod.tier)
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex gap-2",
							children: [dup ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "min-h-11 rounded-full border border-cyan px-3 text-sm text-cyan",
								onClick: () => {
									run.pods.splice(i, 1);
									placePod(run, pod.id, pod.tier);
									onChange();
								},
								children: tx("Fuse", "融合")
							}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "min-h-11 rounded-full border border-line px-3 text-sm",
								onClick: () => {
									run.scrap += sellValue(pod);
									run.pods.splice(i, 1);
									onChange();
								},
								children: [
									tx("Sell", "卖出"),
									" ",
									sellValue(pod)
								]
							})]
						})]
					}, `${pod.id}-${i}`);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-xs text-muted",
				children: [
					shipById(run.shipId).name,
					" · ",
					lang === "zh" ? GUNS[run.gun].name.zh : GUNS[run.gun].name.en,
					" ",
					run.gunLevel,
					run.wave % 5 === 0 ? ` · ${BOSSES[((run.wave / 5 - 1) % 4 + 4) % 4]?.name ?? ""}` : ""
				]
			})
		]
	});
}
//#endregion
export { paintPoster as n, GameStage as t };
