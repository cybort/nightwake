import { x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as useLang } from "./router-D7OVyJsG.mjs";
import { t as Shell } from "./shell-DGbbWsv5.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cookie-C82ESHrB.js
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	const { tx } = useLang();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "mx-auto max-w-2xl px-4 py-12 text-sm leading-relaxed text-muted",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-3xl font-semibold text-fg",
			children: tx("Local storage", "本地存储")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4",
			children: tx("This cabinet does not set tracking cookies. It uses local storage keys nw-save, nw-lang and nw-notes for score, language and contact drafts.", "这台街机不放追踪用的 cookie。它只用本地存储键 nw-save、nw-lang 和 nw-notes，分别记分数、语言和联系草稿。")
		})]
	}) });
}
//#endregion
export { Page as component };
