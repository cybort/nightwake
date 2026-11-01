import { x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as useLang } from "./router-D7OVyJsG.mjs";
import { t as Shell } from "./shell-DGbbWsv5.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/privacy-C9tSG1Jn.js
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	const { tx } = useLang();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "mx-auto max-w-2xl px-4 py-12 text-sm leading-relaxed text-muted",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-3xl font-semibold text-fg",
			children: tx("Privacy", "隐私")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4",
			children: tx("Nightwake stores a high score, the language choice, mute is not persisted, and any contact note you submit, all in local storage on your device. There is no account and no message is uploaded by this page.", "夜航把最高分、语言选择，以及你提交的联系留言，存在你设备的本地存储里。静音不会被记住。没有账号，这个页面也不会上传留言。")
		})]
	}) });
}
//#endregion
export { Page as component };
