import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/shell";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/planes")({ component: Page });

function Page() {
  const { tx } = useLang();
  return (
    <Shell>
      <article className="mx-auto max-w-2xl px-4 py-12">
        <h1 className="text-4xl font-semibold">{tx("Plane games, in a tab.", "标签页里的飞机游戏。")}</h1>
        <p className="mt-4 leading-relaxed text-muted">
          {tx(
            "A plane shmup is the arcade shape where a fighter climbs the screen and the bullets come down to meet it. Nightwake keeps that shape, then adds a landing: scrap, a shop, and a rack that is different next time.",
            "飞机射击是那种战机往屏幕上方爬、子弹迎面下来的街机形状。夜航留着这个形状，再加一次降落：残片、商店，以及下一趟不一样的挂架。",
          )}
        </p>
        <p className="mt-4 leading-relaxed text-muted">
          {tx(
            "If you want the shortest path, launch on danger 0. The training waves are still a real shooter — they are just less interested in deleting you for one mistake.",
            "想走最短的路，就从危险 0 起飞。训练波仍然是真正的射击，只是没那么急着因为一次失误把你删掉。",
          )}
        </p>
        <Link to="/play" className="mt-6 inline-flex min-h-11 items-center rounded-full bg-amber px-5 text-sm font-semibold text-bg">
          {tx("Launch", "起飞")}
        </Link>
      </article>
    </Shell>
  );
}
