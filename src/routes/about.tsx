import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/shell";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/about")({ component: Page });

function Page() {
  const { tx } = useLang();
  return (
    <Shell>
      <article className="mx-auto max-w-2xl px-4 py-12">
        <p className="font-pixel text-[10px] text-amber">NIGHTWAKE</p>
        <h1 className="mt-2 text-4xl font-semibold">{tx("A local cabinet.", "一台本地街机。")}</h1>
        <p className="mt-4 text-base leading-relaxed text-muted">
          {tx(
            "Nightwake is an independent browser shmup: timed waves, a hangar, weapon tiers and six ships. It keeps score on this device and does not ask for an account. It is not affiliated with any other shoot 'em up site or studio.",
            "夜航是独立的浏览器射击：限时波次、机库、武器阶级和六架机体。分数留在这台设备上，不要求账号。它与任何其他射击网站或工作室没有从属关系。",
          )}
        </p>
      </article>
    </Shell>
  );
}
