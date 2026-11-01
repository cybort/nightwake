import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/shell";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/terms")({ component: Page });

function Page() {
  const { tx } = useLang();
  return (
    <Shell>
      <article className="mx-auto max-w-2xl px-4 py-12 text-sm leading-relaxed text-muted">
        <h1 className="text-3xl font-semibold text-fg">{tx("Terms", "条款")}</h1>
        <p className="mt-4">
          {tx(
            "Nightwake is a free local game. Play it as-is. Do not present it as someone else's commercial title. Scores can be cleared by wiping this site's storage.",
            "夜航是免费的本地游戏，按现状游玩。不要把它说成别人的商业作品。清除本站存储就会丢掉分数。",
          )}
        </p>
      </article>
    </Shell>
  );
}
