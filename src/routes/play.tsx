import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { GameStage } from "@/game/stage";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/play")({
  validateSearch: (search: Record<string, unknown>): { embed?: "1" } => {
    if (search.embed === "1" || search.embed === 1) return { embed: "1" };
    return {};
  },
  component: PlayPage,
});

function PlayPage() {
  const { embed } = Route.useSearch();
  const { tx } = useLang();
  if (embed === "1") return <GameStage full />;
  return (
    <div className="min-h-screen bg-bg text-fg">
      <div className="flex items-center justify-between px-3 py-2">
        <Link to="/" className="text-sm tracking-[0.16em] text-amber">NIGHTWAKE</Link>
        <div className="flex items-center gap-3">
        <Link to="/" className="text-sm text-muted">{tx("Back to field notes", "返回介绍")}</Link>
        </div>
      </div>
      <GameStage full />
    </div>
  );
}
