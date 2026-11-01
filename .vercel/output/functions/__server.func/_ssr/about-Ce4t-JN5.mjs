import { x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as useLang } from "./router-D7OVyJsG.mjs";
import { t as Shell } from "./shell-DGbbWsv5.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/about-Ce4t-JN5.js
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	const { tx } = useLang();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "mx-auto max-w-2xl px-4 py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-pixel text-[10px] text-amber",
				children: "NIGHTWAKE"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 text-4xl font-semibold",
				children: tx("A local cabinet.", "一台本地街机。")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-base leading-relaxed text-muted",
				children: tx("Nightwake is an independent browser shmup: timed waves, a hangar, weapon tiers and six ships. It keeps score on this device and does not ask for an account. It is not affiliated with any other shoot 'em up site or studio.", "夜航是独立的浏览器射击：限时波次、机库、武器阶级和六架机体。分数留在这台设备上，不要求账号。它与任何其他射击网站或工作室没有从属关系。")
			})
		]
	}) });
}
//#endregion
export { Page as component };
