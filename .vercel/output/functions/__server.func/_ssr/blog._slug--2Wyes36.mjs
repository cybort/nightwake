import { x as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as useLang, n as Route } from "./router-D7OVyJsG.mjs";
import { t as Shell } from "./shell-DGbbWsv5.mjs";
import { n as postBySlug } from "./posts-BqEzy4Ac.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/blog._slug--2Wyes36.js
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	const { slug } = Route.useParams();
	const { lang, tx } = useLang();
	const post = postBySlug(slug);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "mx-auto max-w-2xl px-4 py-12",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/blog",
			className: "text-sm text-cyan",
			children: tx("All notes", "全部笔记")
		}), post ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-xs text-muted",
				children: post.date
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 text-4xl font-semibold",
				children: lang === "zh" ? post.title.zh : post.title.en
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 space-y-4 text-base leading-relaxed text-muted",
				children: (lang === "zh" ? post.body.zh : post.body.en).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: p }, p))
			})
		] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-4 text-3xl font-semibold",
			children: tx("Missing note", "没有这篇")
		})]
	}) });
}
//#endregion
export { Page as component };
