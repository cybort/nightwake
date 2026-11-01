import { x as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as useLang } from "./router-D7OVyJsG.mjs";
import { t as Shell } from "./shell-DGbbWsv5.mjs";
import { t as POSTS } from "./posts-BqEzy4Ac.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/blog-DXcWQGEO.js
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	const { lang, tx } = useLang();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl px-4 py-12",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-4xl font-semibold",
			children: tx("Field notes", "飞行笔记")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-8 space-y-4",
			children: POSTS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/blog/$slug",
				params: { slug: p.slug },
				className: "block rounded-2xl border border-line bg-surface p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: p.date
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-1 text-xl font-semibold",
						children: lang === "zh" ? p.title.zh : p.title.en
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: lang === "zh" ? p.excerpt.zh : p.excerpt.en
					})
				]
			}, p.slug))
		})]
	}) });
}
//#endregion
export { Page as component };
