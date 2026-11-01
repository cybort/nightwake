import { x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as useLang } from "./router-D7OVyJsG.mjs";
import { t as Shell } from "./shell-DGbbWsv5.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/terms-CMSk3HuK.js
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	const { tx } = useLang();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "mx-auto max-w-2xl px-4 py-12 text-sm leading-relaxed text-muted",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-3xl font-semibold text-fg",
			children: tx("Terms", "条款")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4",
			children: tx("Nightwake is a free local game. Play it as-is. Do not present it as someone else's commercial title. Scores can be cleared by wiping this site's storage.", "夜航是免费的本地游戏，按现状游玩。不要把它说成别人的商业作品。清除本站存储就会丢掉分数。")
		})]
	}) });
}
//#endregion
export { Page as component };
