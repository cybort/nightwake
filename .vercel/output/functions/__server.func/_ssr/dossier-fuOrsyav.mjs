import { x as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as useLang } from "./router-D7OVyJsG.mjs";
import { t as Shell } from "./shell-DGbbWsv5.mjs";
import { a as FOE_ORDER, b as playedHp, c as ITEMS, f as TIER_NAME, g as ZONE_LABEL, h as ZONE_FORMS, i as FOES, l as LUCK_SAMPLES, n as BOSS_ORDER, o as FORM_NOTES, x as referenceHp, y as luckWeights } from "./dossier-BV9Zi6qy.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dossier-fuOrsyav.js
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	const { tx, lang } = useLang();
	const L = (v) => lang === "zh" ? v.zh : v.en;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "mx-auto max-w-3xl px-4 py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-pixel text-[10px] text-amber",
				children: tx("FIELD BOOK", "对照册")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 text-3xl font-semibold",
				children: tx("What the other cabinet actually does", "另一台街机实际在算什么")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm leading-relaxed text-muted",
				children: tx("These numbers were read from the public game client: base hull, the wave curve, the seven flight paths, and the luck weights. Their pictures stay on their site. This cabinet uses the same ratios, then compresses the late-wave curve so a run can still finish. Both columns are on the page.", "这些数字来自公开客户端：底血、波次曲线、七种航线、幸运权重。他们的图留在原站，这里不收。本机用同一套比例，再把后期曲线压短，好让一局打得完。两列都写在这页上。")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-10 text-xl font-semibold",
				children: tx("Hull by type", "不同敌机的血量")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm leading-relaxed text-muted",
				children: tx("Non-boss reference hull is base × (1 + 0.062·r² + 0.05·late³) × xn × danger × 1.3. r is wave−1, late is max(0, r−12), xn is 1 + 0.05·min(4, max(0, wave−6)). Elites ×2.5. Bosses use (1 + 0.3·r) × danger, no ×1.3.", "非首领的对照血量 = 底数 ×（1 + 0.062·r² + 0.05·late³）× xn × 危险 × 1.3。r = 波次−1，late = max(0, r−12)，xn = 1 + 0.05·min(4, max(0, 波次−6))。精英再 ×2.5。首领用（1 + 0.3·r）× 危险，不乘 1.3。")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 space-y-2",
				children: FOE_ORDER.map((id) => {
					const foe = FOES[id];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-xl border border-line bg-surface px-3 py-2 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-baseline justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-fg",
									children: L(foe.name)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-amber",
									children: [
										tx("base", "底数"),
										" ",
										foe.hp
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted",
								children: L(foe.path)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted",
								children: [
									tx("Wave 1 reference / here", "第 1 波 对照 / 本机"),
									" ",
									referenceHp(id, 1),
									" / ",
									playedHp(id, 1),
									" · ",
									tx("Wave 10", "第 10 波"),
									" ",
									referenceHp(id, 10),
									" / ",
									playedHp(id, 10),
									" · ",
									tx("scrap", "残片"),
									" ",
									foe.scrap
								]
							})
						]
					}, id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-10 text-xl font-semibold",
				children: tx("Boss hull", "首领血量")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 space-y-2",
				children: BOSS_ORDER.map((id, i) => {
					const foe = FOES[id];
					const wave = (i + 1) * 5;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-xl border border-line bg-surface px-3 py-2 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "font-semibold",
								children: [
									L(foe.name),
									" · ",
									tx(`wave ${wave}`, `第 ${wave} 波`)
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted",
								children: L(foe.path)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted",
								children: [
									tx("Reference", "对照"),
									" ",
									referenceHp(id, wave).toLocaleString(),
									" · ",
									tx("This cabinet", "本机"),
									" ",
									playedHp(id, wave)
								]
							})
						]
					}, id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-xs leading-relaxed text-muted",
				children: tx("Boss phases still split at 66% and 33% hull. Danger 4 adds an extra aimed fan on the last phase. Danger 0–5 hull multipliers are 1, 1, 1.05, 1.12, 1.26, 1.4.", "首领仍按 66% 和 33% 血量分三段。危险 4 在最后一段多一簇瞄准弹。危险 0 到 5 的血量系数是 1、1、1.05、1.12、1.26、1.4。")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-10 text-xl font-semibold",
				children: tx("Paths by stretch of sky", "不同空域的航线")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 space-y-4",
				children: ZONE_LABEL.map((label, z) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm font-semibold text-cyan",
					children: L(label)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-1 space-y-1 text-sm text-muted",
					children: ZONE_FORMS[z].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-fg",
						children: L(FORM_NOTES[f.id] ?? {
							en: f.id,
							zh: f.id
						})
					}), f.min > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [" · ", tx(`from wave ${f.min}`, `第 ${f.min} 波起`)] }) : null] }, f.id))
				})] }, label.en))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-10 text-xl font-semibold",
				children: tx("Parts, and what luck actually does", "配件，以及幸运到底做什么")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm leading-relaxed text-muted",
				children: tx("Luck is not harvesting. Harvesting multiplies scrap you pick up. Luck does two things: drop chance × (1 + luck/100) from the first kill, and shop tier weights. The weight for a higher tier starts at 0 on wave 1. Luck only multiplies weight the wave has already earned, capped at 60% / 25% / 8% for fine / rare / ace.", "幸运不是回收。回收乘的是捡到的残片。幸运做两件事：从第一架击落起，掉落几率 ×（1 + 幸运/100）；以及货架阶级权重。高阶权重在第 1 波是 0。幸运只放大这一波已经挣到的权重，精良 / 稀有 / 王牌封顶 60% / 25% / 8%。")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[280px] text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "text-xs text-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-1 pr-3 font-medium",
								children: tx("Wave", "波次")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-1 pr-3 font-medium",
								children: tx("Luck 0", "幸运 0")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-1 font-medium",
								children: tx("Luck 40", "幸运 40")
							})
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: LUCK_SAMPLES.map((wave) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-t border-line",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2 pr-3",
								children: wave
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2 pr-3 text-muted",
								children: fmt(luckWeights(wave, 0), lang)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2 text-amber",
								children: fmt(luckWeights(wave, 40), lang)
							})
						]
					}, wave)) })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 space-y-2",
				children: ITEMS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-xl border border-line bg-surface px-3 py-2 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-baseline justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold",
							children: lang === "zh" ? item.name.zh : item.name.en
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs text-cyan",
							children: [
								L(TIER_NAME[item.tier]),
								" · ",
								item.cost
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted",
						children: lang === "zh" ? item.blurb.zh : item.blurb.en
					})]
				}, item.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-xs leading-relaxed text-muted",
				children: tx("The hangar prints the live odds for your current luck. Picking Hot Dice, or buying Lucky Slug / Ash Medal, rerolls the unlocked shelf so you can see the weights move. Coffer starts at luck 40: drops ×1.40 immediately, shop odds still 100% common on wave 1.", "机库会印出你当前幸运的实时几率。点热骰，或买下幸运弹壳 / 灰勋章，未锁定的货架会重抽，方便你看见权重动了。金柜开局幸运 40：掉落立刻 ×1.40，第 1 波货架仍是 100% 普通。")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/play",
				className: "mt-8 inline-flex min-h-11 items-center rounded-full bg-amber px-5 text-sm font-semibold text-bg",
				children: tx("Launch", "起飞")
			})
		]
	}) });
}
function fmt(weights, lang) {
	return weights.map((w, i) => `${lang === "zh" ? TIER_NAME[i].zh : TIER_NAME[i].en.slice(0, 1)} ${Math.round(w * 100)}`).join(" ");
}
//#endregion
export { Page as component };
