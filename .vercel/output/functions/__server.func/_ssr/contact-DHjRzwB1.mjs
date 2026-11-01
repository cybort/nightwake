import { i as __toESM } from "../_runtime.mjs";
import { q as require_react, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as useLang } from "./router-D7OVyJsG.mjs";
import { t as Shell } from "./shell-DGbbWsv5.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-DHjRzwB1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	const { tx } = useLang();
	const [sent, setSent] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "mx-auto max-w-lg px-4 py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-4xl font-semibold",
				children: tx("Contact", "联系")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-muted",
				children: tx("Messages stay in this browser. Nothing is sent to a server.", "留言只留在这个浏览器里，不会发到服务器。")
			}),
			sent ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 rounded-xl border border-line bg-surface p-4 text-sm",
				children: tx("Saved on this device.", "已保存在这台设备上。")
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-6 space-y-3",
				onSubmit: (e) => {
					e.preventDefault();
					const data = new FormData(e.currentTarget);
					const prev = JSON.parse(localStorage.getItem("nw-notes") || "[]");
					prev.push({
						name: data.get("name"),
						note: data.get("note"),
						at: Date.now()
					});
					localStorage.setItem("nw-notes", JSON.stringify(prev));
					setSent(true);
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-sm",
						children: [tx("Name", "名字"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							name: "name",
							required: true,
							className: "mt-1 min-h-11 w-full rounded-xl border border-line bg-surface px-3 text-fg"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-sm",
						children: [tx("Note", "留言"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							name: "note",
							required: true,
							rows: 5,
							className: "mt-1 w-full rounded-xl border border-line bg-surface px-3 py-2 text-fg"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						className: "min-h-11 rounded-full bg-amber px-5 text-sm font-semibold text-bg",
						children: tx("Keep it here", "留在本地")
					})
				]
			})
		]
	}) });
}
//#endregion
export { Page as component };
