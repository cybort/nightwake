import { x as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as useLang, r as Route$3 } from "./router-D7OVyJsG.mjs";
import { t as GameStage } from "./stage-_warn0h_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/play-5v6cUcq9.js
var import_jsx_runtime = require_jsx_runtime();
function PlayPage() {
	const { embed } = Route$3.useSearch();
	const { tx } = useLang();
	if (embed === "1") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameStage, { full: true });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-bg text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between px-3 py-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: "text-sm tracking-[0.16em] text-amber",
				children: "NIGHTWAKE"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/dossier",
					className: "text-sm text-muted",
					children: tx("Field book", "对照册")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "text-sm text-muted",
					children: tx("Back to field notes", "返回介绍")
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameStage, { full: true })]
	});
}
//#endregion
export { PlayPage as component };
