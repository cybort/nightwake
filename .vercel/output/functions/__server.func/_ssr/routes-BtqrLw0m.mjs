import { i as __toESM } from "../_runtime.mjs";
import { q as require_react, x as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as Gauge, a as Timer, g as Layers, l as Shield, o as Swords, s as Store, v as Crosshair, y as Bomb } from "../_libs/lucide-react.mjs";
import { i as useLang } from "./router-D7OVyJsG.mjs";
import { t as Shell } from "./shell-DGbbWsv5.mjs";
import { t as POSTS } from "./posts-BqEzy4Ac.mjs";
import { C as weaponById, m as WEAPONS, r as CLASS_NOTES, t as BOSSES, u as SHIPS } from "./dossier-BV9Zi6qy.mjs";
import { n as paintPoster, t as GameStage } from "./stage-_warn0h_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BtqrLw0m.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Poster({ kind }) {
	const ref = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const canvas = ref.current;
		if (!canvas) return;
		const rect = canvas.getBoundingClientRect();
		canvas.width = Math.max(2, Math.floor(rect.width * 2));
		canvas.height = Math.max(2, Math.floor(rect.height * 2));
		paintPoster(canvas, kind);
	}, [kind]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
		ref,
		className: "h-44 w-full rounded-xl border border-line bg-bg"
	});
}
var FEATURES = [
	{
		icon: Swords,
		en: "Vertical lanes",
		zh: "纵版航线",
		bodyEn: "Fighters, gunships, kamikaze drones, bombers, tanks and turrets. Ground kills leave wrecks in the scroll.",
		bodyZh: "战机、武装直升机、自杀无人机、轰炸机、坦克和炮塔。地面单位被打掉后会留下残骸。"
	},
	{
		icon: Crosshair,
		en: "Three main guns",
		zh: "三把主炮",
		bodyEn: "Crystals swap Ember Spread, Azure Lance and Violet Arc. Matching crystals level the gun to 8.",
		bodyZh: "晶体在余烬散射、青蓝长枪和紫电之间切换。同色晶体把主炮升到 8 级。"
	},
	{
		icon: Timer,
		en: "Timed waves",
		zh: "限时波次",
		bodyEn: "Survive the clock. Leftover scrap is vacuumed home. Boss waves are longer.",
		bodyZh: "活过时钟即可。剩下的残片会被吸回。头目波更长。"
	},
	{
		icon: Store,
		en: "Hangar shop",
		zh: "机库商店",
		bodyEn: "Four offers. Lock, reroll, buy, sell, fuse. Level-ups are picks, not a single stat.",
		bodyZh: "四件货。锁定、重掷、购买、出售、融合。升级是选择，不是一条属性。"
	},
	{
		icon: Layers,
		en: "Sets and tiers",
		zh: "套装与阶级",
		bodyEn: "Six pod slots. Two identical pods fuse from I to IV. Classes pay set bonuses.",
		bodyZh: "六个荚舱位。两件相同的从 I 融到 IV。同系给套装。"
	},
	{
		icon: Bomb,
		en: "Bombs and crates",
		zh: "炸弹与补给箱",
		bodyEn: "A bomb clears shots, hurts everything and grants a short grace. Boss kills drop crates.",
		bodyZh: "炸弹清弹、全屏伤害，并给一小段无敌。击破头目掉补给箱。"
	}
];
var STEPS = [
	{
		en: "Pick a ship and a danger",
		zh: "选机体和危险",
		bodyEn: "Six fighters, a starting pod, danger 0 through 5.",
		bodyZh: "六架战机、一个初始荚舱、危险 0 到 5。"
	},
	{
		en: "Live inside the wave",
		zh: "在波次里活着",
		bodyEn: "Move and dodge. Fire is automatic. Grazes pay score.",
		bodyZh: "移动和闪避。自动射击。擦弹给分。"
	},
	{
		en: "Catch the drops",
		zh: "接住掉落",
		bodyEn: "Scrap, crystals, repairs, bombs. Missed scrap waits in the salvage bag.",
		bodyZh: "残片、晶体、修理、炸弹。漏掉的残片进回收袋。"
	},
	{
		en: "Land and spend",
		zh: "降落再花",
		bodyEn: "Take a stat, open crates, then the four-slot shop.",
		bodyZh: "先拿属性，再开箱子，然后是四格商店。"
	},
	{
		en: "Break the bosses",
		zh: "拆掉头目",
		bodyEn: "Every fifth wave. Kill it early or simply outlast the timer.",
		bodyZh: "每五波一次。提前击破，或者撑过计时。"
	},
	{
		en: "Wave 20, then optional endless",
		zh: "第 20 波，然后可选无尽",
		bodyEn: "Bank the win or keep the rack and fly again.",
		bodyZh: "收工，或者带着这套武器继续飞。"
	}
];
var FAQ = [
	{
		qEn: "Is Nightwake free?",
		qZh: "夜航免费吗？",
		aEn: "Yes. It runs in the browser. Nothing to buy, no account.",
		aZh: "免费。在浏览器里跑。没有内购，也不需要账号。"
	},
	{
		qEn: "Do I install anything?",
		qZh: "要安装吗？",
		aEn: "No. Scores and the language toggle stay in local storage on this device.",
		aZh: "不用。分数和语言保存在这台设备的本地存储里。"
	},
	{
		qEn: "Phone?",
		qZh: "手机能玩吗？",
		aEn: "Drag anywhere. The ship follows your finger's movement, not the finger itself, so the hull stays visible. The bomb is the round button.",
		aZh: "随便拖。机体跟着手指的位移走，而不是贴在手指下面。炸弹是那个圆按钮。"
	},
	{
		qEn: "Controls?",
		qZh: "按键？",
		aEn: "WASD or arrows move. Shift slows. X or K bombs. Esc or P pauses. M opens the patch bay. A gamepad stick moves and the face buttons bomb.",
		aZh: "WASD 或方向键移动。Shift 减速。X 或 K 炸弹。Esc 或 P 暂停。M 打开改装台。手柄摇杆移动，面键丢炸弹。"
	},
	{
		qEn: "How long is a run?",
		qZh: "一局多久？",
		aEn: "Shorter than a half-hour arcade run. Waves start near a quarter minute and stretch on boss clocks, so a full 20 is a sitting, not an evening.",
		aZh: "比半小时的街机长局短。开场大约十几秒一级，头目波更长。打完 20 波是一坐的时间，不是一晚上。"
	},
	{
		qEn: "What does danger do?",
		qZh: "危险等级改什么？",
		aEn: "More hull on enemies, tighter spawns, faster shots. Elites show up from 2. Bosses gain extra spokes from 4. 0 is the training sortie.",
		aZh: "敌人更厚、刷新更密、弹更快。2 级起出现精英。4 级起头目多一套弹。0 是训练。"
	}
];
function HomePage() {
	const { tx, lang } = useLang();
	const [origin, setOrigin] = (0, import_react.useState)("");
	const [copied, setCopied] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setOrigin(window.location.origin), []);
	const snippet = `<iframe src="${origin || ""}/play?embed=1" width="960" height="540" style="border:0;max-width:100%" title="Nightwake"></iframe>`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto grid max-w-6xl items-center gap-8 px-4 py-10 lg:grid-cols-[1fr_1.05fr] lg:py-14",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-pixel text-[10px] leading-6 text-amber",
					children: tx("FREE BROWSER SHMUP", "免费浏览器射击")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 text-4xl font-semibold leading-tight text-fg sm:text-5xl",
					children: tx("A shoot 'em up that lands between waves.", "一架会在波次之间降落的战机。")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 max-w-xl text-base leading-relaxed text-muted",
					children: tx("Nightwake is a vertical shmup with roguelike racks. Twenty timed waves, six ships, twelve pods, a hangar shop. No download.", "夜航是带肉鸽挂架的纵版射击。二十个限时波次、六架机体、十二个荚舱、一座机库。不用下载。")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#stage",
						className: "inline-flex min-h-11 items-center rounded-full bg-amber px-5 text-sm font-semibold text-bg",
						children: tx("Play now", "现在开打")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#how",
						className: "inline-flex min-h-11 items-center rounded-full border border-line px-5 text-sm text-fg",
						children: tx("How it plays", "怎么打")
					})]
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				id: "stage",
				className: "overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_20px_80px_rgba(0,0,0,0.35)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between border-b border-line px-3 py-2 text-xs text-muted",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: tx("Nightwake · shoot 'em up", "夜航 · 纵版射击") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/play",
						className: "text-cyan",
						children: tx("Fullscreen", "全屏")
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameStage, {})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-y border-line bg-bg-2",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
				className: "mx-auto grid max-w-6xl grid-cols-2 gap-px bg-line sm:grid-cols-3 lg:grid-cols-6",
				children: [
					["20", tx("timed waves", "限时波次")],
					["6", tx("ships", "机体")],
					["12", tx("pods", "荚舱")],
					["12", tx("items", "道具")],
					["4", tx("bosses", "头目")],
					["0–5", tx("danger", "危险")]
				].map(([n, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-bg-2 px-4 py-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-2xl font-semibold text-amber",
						children: n
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "text-xs uppercase tracking-wide text-muted",
						children: label
					})]
				}, label))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			id: "features",
			className: "mx-auto max-w-6xl px-4 py-14",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-pixel text-[10px] text-cyan",
					children: tx("LOADOUT", "装载")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 text-3xl font-semibold",
					children: tx("Arcade dodging, then a decision.", "先躲弹，再做决定。")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
					children: FEATURES.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "rounded-2xl border border-line bg-surface p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(f.icon, { className: "size-5 text-amber" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-3 text-lg font-semibold",
								children: lang === "zh" ? f.zh : f.en
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm leading-relaxed text-muted",
								children: lang === "zh" ? f.bodyZh : f.bodyEn
							})
						]
					}, f.en))
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			id: "how",
			className: "bg-bg-2 py-14",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-6xl px-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-pixel text-[10px] text-cyan",
						children: tx("SORTIE", "出击")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 text-3xl font-semibold",
						children: tx("One run, in order.", "一局的顺序。")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "mt-8 grid gap-4 md:grid-cols-2",
						children: STEPS.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-4 rounded-2xl border border-line bg-bg p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-pixel text-[10px] text-amber",
								children: ["0", i + 1]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-semibold",
								children: lang === "zh" ? s.zh : s.en
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted",
								children: lang === "zh" ? s.bodyZh : s.bodyEn
							})] })]
						}, s.en))
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-4 py-14",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-3xl font-semibold",
				children: tx("The lane, up close.", "航线近景。")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid gap-4 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Poster, { kind: "early" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
						className: "mt-2 text-sm text-muted",
						children: tx("Early wave: helicopters, tanks, a thin fan.", "开场：直升机、坦克、薄扇弹。")
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Poster, { kind: "late" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
						className: "mt-2 text-sm text-muted",
						children: tx("Late rack: arc main gun, drones, a crowded lane.", "后期：紫电主炮、僚机、挤满的航线。")
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
						className: "rounded-2xl border border-line bg-surface p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-pixel text-[10px] text-amber",
								children: tx("HANGAR", "机库")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted",
								children: tx("Four offers, a lock, a reroll, and a fuse when two pods match.", "四件货、一把锁、一次重掷，两件相同就融合。")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4 grid grid-cols-2 gap-2 text-xs",
								children: [
									"Tracer I",
									"Aegis II",
									"Ash Bank",
									"Crit Lens"
								].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "rounded-lg border border-line bg-bg px-2 py-3 text-fg",
									children: n
								}, n))
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
						className: "rounded-2xl border border-line bg-surface p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-pixel text-[10px] text-cyan",
								children: tx("BRIEFING", "简报")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted",
								children: tx("Ship, starter pod, danger. LANTERN is the honest first pick.", "机体、初始荚舱、危险。LANTERN 是最老实的第一选择。")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4 flex gap-2",
								children: [
									"0",
									"1",
									"2",
									"3",
									"4",
									"5"
								].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `grid size-9 place-items-center rounded-full border text-sm ${n === "0" ? "border-amber text-amber" : "border-line text-muted"}`,
									children: n
								}, n))
							})
						]
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			id: "ships",
			className: "bg-bg-2 py-14",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-6xl px-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-3xl font-semibold",
					children: tx("Six hulls.", "六具船体。")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
					children: SHIPS.map((ship) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "rounded-2xl border border-line bg-bg p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-lg font-semibold",
								children: ship.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-cyan",
								children: [
									lang === "zh" ? ship.role.zh : ship.role.en,
									" · ",
									lang === "zh" ? "主炮" : "gun",
									" ",
									ship.gun
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm leading-relaxed text-muted",
								children: lang === "zh" ? ship.blurb.zh : ship.blurb.en
							})
						]
					}, ship.id))
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			id: "weapons",
			className: "mx-auto max-w-6xl px-4 py-14",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-3xl font-semibold",
					children: tx("Pods and the five classes.", "荚舱和五个系。")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 flex flex-wrap gap-2",
					children: CLASS_NOTES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "rounded-full border border-line px-3 py-1 text-xs text-muted",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-fg",
								children: [lang === "zh" ? c.name.zh : c.name.en, "."]
							}),
							" ",
							lang === "zh" ? c.bonus.zh : c.bonus.en
						]
					}, c.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
					children: WEAPONS.map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "rounded-2xl border border-line bg-surface p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-semibold",
								children: lang === "zh" ? w.name.zh : w.name.en
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-amber",
								children: w.classes.map((c) => lang === "zh" ? CLASS_NOTES.find((n) => n.id === c)?.name.zh : c).join(" · ")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted",
								children: lang === "zh" ? w.blurb.zh : w.blurb.en
							})
						]
					}, w.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 text-sm text-muted",
					children: [tx("Starter rack on the pad: ", "开局可选："), [
						"tracer",
						"lance",
						"seeker",
						"wing"
					].map((id) => lang === "zh" ? weaponById(id).name.zh : weaponById(id).name.en).join(" · ")]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-bg-2 py-14",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-6xl px-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-3xl font-semibold",
					children: tx("Four bosses.", "四台头目。")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
					children: BOSSES.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "rounded-2xl border border-line bg-bg p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-ember",
								children: [
									tx("Wave", "波次"),
									" ",
									b.wave
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-1 font-semibold",
								children: b.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted",
								children: lang === "zh" ? b.blurb.zh : b.blurb.en
							})
						]
					}, b.name))
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto grid max-w-6xl gap-6 px-4 py-14 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-3xl font-semibold",
				children: tx("Hands.", "手。")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "mt-4 space-y-2 text-sm text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "mr-2 inline size-4 text-cyan" }), tx("Move — WASD / arrows / drag / stick", "移动 — WASD / 方向键 / 拖动 / 摇杆")] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gauge, { className: "mr-2 inline size-4 text-cyan" }), tx("Focus — Shift, slower and tighter", "精瞄 — Shift，更慢更准")] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bomb, { className: "mr-2 inline size-4 text-ember" }), tx("Bomb — X, K, two fingers, or the on-screen button", "炸弹 — X、K、双指，或屏幕按钮")] })
				]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-3xl font-semibold",
				children: tx("Notes from the pad.", "笔记。")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
				className: "mt-4 list-decimal space-y-2 pl-5 text-sm text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: tx("LANTERN, danger 0, until the walker feels rude.", "LANTERN，危险 0，直到步行机开始无礼。") }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: tx("Commit to one or two classes.", "只承诺一个或两个系。") }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: tx("Lock what you cannot buy yet.", "买不起的先锁上。") }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: tx("Duplicates are the point. Fuse them.", "重复是目的。融掉。") }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: tx("Carriers first. Crystals keep the main gun honest.", "先打载具。晶体让主炮保持诚实。") }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: tx("Bomb the phase change, not the first volley.", "炸弹留给换阶段，不是第一轮齐射。") })
				]
			})] })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-bg-2 py-14",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-6xl px-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-3xl font-semibold",
					children: tx("Field notes.", "飞行笔记。")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 grid gap-3 md:grid-cols-2",
					children: POSTS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/blog/$slug",
						params: { slug: p.slug },
						className: "rounded-2xl border border-line bg-bg p-4 hover:border-amber",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted",
								children: p.date
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-1 text-lg font-semibold",
								children: lang === "zh" ? p.title.zh : p.title.en
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted",
								children: lang === "zh" ? p.excerpt.zh : p.excerpt.en
							})
						]
					}, p.slug))
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-4 py-14",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-3xl font-semibold",
					children: tx("Embed the cabinet.", "嵌这块街机。")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-2xl text-sm text-muted",
					children: tx("Paste this into a page. It points at this copy's fullscreen route.", "贴进页面即可。它指向这份副本的全屏路线。")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
					className: "mt-4 overflow-x-auto rounded-xl border border-line bg-surface p-4 text-xs text-cyan",
					children: snippet
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "mt-3 min-h-11 rounded-full border border-line px-4 text-sm",
					onClick: () => {
						navigator.clipboard?.writeText(snippet);
						setCopied(true);
					},
					children: copied ? tx("Copied", "已复制") : tx("Copy code", "复制代码")
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			id: "faq",
			className: "bg-bg-2 py-14",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-3xl px-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-3xl font-semibold",
					children: tx("Questions.", "问题。")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 space-y-2",
					children: FAQ.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
						className: "rounded-xl border border-line bg-bg px-4 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", {
							className: "cursor-pointer text-sm font-semibold",
							children: lang === "zh" ? f.qZh : f.qEn
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-relaxed text-muted",
							children: lang === "zh" ? f.aZh : f.aEn
						})]
					}, f.qEn))
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-4 py-16 text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-3xl font-semibold",
				children: tx("The pad is warm.", "甲板是热的。")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/play",
				className: "mt-6 inline-flex min-h-11 items-center rounded-full bg-amber px-6 text-sm font-semibold text-bg",
				children: tx("Play free", "免费开打")
			})]
		})
	] });
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomePage, {}) });
}
//#endregion
export { Home as component };
