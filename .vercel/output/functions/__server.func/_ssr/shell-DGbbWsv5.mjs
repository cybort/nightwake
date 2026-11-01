import { i as __toESM } from "../_runtime.mjs";
import { q as require_react, x as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as Menu, t as X } from "../_libs/lucide-react.mjs";
import { i as useLang } from "./router-D7OVyJsG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shell-DGbbWsv5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var LINKS = [
	{
		hash: "features",
		en: "Features",
		zh: "特性"
	},
	{
		hash: "how",
		en: "How to play",
		zh: "怎么玩"
	},
	{
		hash: "ships",
		en: "Ships",
		zh: "机体"
	},
	{
		hash: "weapons",
		en: "Weapons",
		zh: "武器"
	},
	{
		hash: "faq",
		en: "FAQ",
		zh: "问答"
	}
];
function Shell({ children }) {
	const { tx, lang, setLang } = useLang();
	const [open, setOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#main",
				className: "sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-50 focus:bg-amber focus:px-3 focus:py-2 focus:text-bg",
				children: tx("Skip to content", "跳到正文")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-0 z-40 border-b border-line/80 bg-bg/90 backdrop-blur",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex h-16 max-w-6xl items-center gap-3 px-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/",
							className: "flex items-center gap-2 text-fg",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-semibold tracking-[0.18em]",
								children: "NIGHTWAKE"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
							className: "ml-4 hidden items-center gap-4 text-sm text-muted lg:flex",
							children: [
								LINKS.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/",
									hash: l.hash,
									className: "hover:text-fg",
									children: lang === "zh" ? l.zh : l.en
								}, l.hash)),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/blog",
									className: "hover:text-fg",
									children: tx("Blog", "日志")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/dossier",
									className: "hover:text-fg",
									children: tx("Field book", "对照册")
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ml-auto flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "min-h-11 rounded-full border border-line px-3 text-xs",
									onClick: () => setLang(lang === "zh" ? "en" : "zh"),
									children: lang === "zh" ? "EN" : "中文"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/play",
									className: "hidden min-h-11 items-center rounded-full bg-amber px-4 text-sm font-semibold text-bg sm:inline-flex",
									children: tx("Play free", "免费开打")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "grid size-11 place-items-center lg:hidden",
									"aria-label": tx("Menu", "菜单"),
									onClick: () => setOpen((v) => !v),
									children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
								})
							]
						})
					]
				}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-t border-line px-4 py-3 lg:hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col",
						children: [
							LINKS.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								hash: l.hash,
								className: "min-h-11 py-2 text-fg",
								onClick: () => setOpen(false),
								children: lang === "zh" ? l.zh : l.en
							}, l.hash)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/blog",
								className: "min-h-11 py-2",
								onClick: () => setOpen(false),
								children: tx("Blog", "日志")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/dossier",
								className: "min-h-11 py-2",
								onClick: () => setOpen(false),
								children: tx("Field book", "对照册")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/planes",
								className: "min-h-11 py-2",
								onClick: () => setOpen(false),
								children: tx("Plane games", "飞机游戏")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/play",
								className: "mt-1 inline-flex min-h-11 items-center justify-center rounded-full bg-amber font-semibold text-bg",
								onClick: () => setOpen(false),
								children: tx("Play free", "免费开打")
							})
						]
					})
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				id: "main",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "border-t border-line",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 font-semibold tracking-[0.16em]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {}), " NIGHTWAKE"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm leading-relaxed text-muted",
							children: tx("A free vertical shmup for the browser. Timed waves, a hangar, and a new build every run. This is a local arcade, not affiliated with any other shmup site.", "浏览器里的免费纵版射击。限时波次、机库、每局一套新构筑。这是本地街机，与其他射击站没有从属关系。")
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-semibold text-fg",
								children: tx("Game", "游戏")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 flex flex-col gap-2 text-muted",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/play",
										children: tx("Play", "开打")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/dossier",
										children: tx("Field book", "对照册")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/planes",
										children: tx("Plane games", "飞机游戏")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/blog",
										children: tx("Field notes", "飞行笔记")
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-semibold text-fg",
								children: tx("Paperwork", "说明")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 flex flex-col gap-2 text-muted",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/about",
										children: tx("About", "关于")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/contact",
										children: tx("Contact", "联系")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/privacy",
										children: tx("Privacy", "隐私")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/terms",
										children: tx("Terms", "条款")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/cookie",
										children: tx("Storage", "本地存储")
									})
								]
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "px-4 pb-8 text-center text-xs text-muted",
					children: [
						"© ",
						(/* @__PURE__ */ new Date()).getFullYear(),
						" Nightwake"
					]
				})]
			})
		]
	});
}
function Mark() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: "22",
		height: "22",
		viewBox: "0 0 22 22",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M11 1 L16 18 H12 L11 14 L10 18 H6 Z",
			fill: "#ffb347"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M11 6 L13 14 H9 Z",
			fill: "#0d0b12"
		})]
	});
}
//#endregion
export { Shell as t };
