import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/shell";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/cookie")({ component: Page });

function Page() {
  const { tx } = useLang();
  return (
    <Shell>
      <article className="mx-auto max-w-2xl px-4 py-12 text-sm leading-relaxed text-muted">
        <h1 className="text-3xl font-semibold text-fg">{tx("Local storage", "本地存储")}</h1>
        <p className="mt-4">
          {tx(
            "This cabinet does not set tracking cookies. It uses local storage keys nw-save, nw-lang and nw-notes for score, language and contact drafts.",
            "这台街机不放追踪用的 cookie。它只用本地存储键 nw-save、nw-lang 和 nw-notes，分别记分数、语言和联系草稿。",
          )}
        </p>
      </article>
    </Shell>
  );
}
