import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Shell } from "@/components/shell";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/contact")({ component: Page });

function Page() {
  const { tx } = useLang();
  const [sent, setSent] = useState(false);
  return (
    <Shell>
      <article className="mx-auto max-w-lg px-4 py-12">
        <h1 className="text-4xl font-semibold">{tx("Contact", "联系")}</h1>
        <p className="mt-3 text-sm text-muted">
          {tx("Messages stay in this browser. Nothing is sent to a server.", "留言只留在这个浏览器里，不会发到服务器。")}
        </p>
        {sent ? (
          <p className="mt-6 rounded-xl border border-line bg-surface p-4 text-sm">{tx("Saved on this device.", "已保存在这台设备上。")}</p>
        ) : (
          <form
            className="mt-6 space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              const data = new FormData(e.currentTarget);
              const prev = JSON.parse(localStorage.getItem("nw-notes") || "[]") as unknown[];
              prev.push({ name: data.get("name"), note: data.get("note"), at: Date.now() });
              localStorage.setItem("nw-notes", JSON.stringify(prev));
              setSent(true);
            }}
          >
            <label className="block text-sm">
              {tx("Name", "名字")}
              <input name="name" required className="mt-1 min-h-11 w-full rounded-xl border border-line bg-surface px-3 text-fg" />
            </label>
            <label className="block text-sm">
              {tx("Note", "留言")}
              <textarea name="note" required rows={5} className="mt-1 w-full rounded-xl border border-line bg-surface px-3 py-2 text-fg" />
            </label>
            <button type="submit" className="min-h-11 rounded-full bg-amber px-5 text-sm font-semibold text-bg">
              {tx("Keep it here", "留在本地")}
            </button>
          </form>
        )}
      </article>
    </Shell>
  );
}
