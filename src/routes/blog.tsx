import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/shell";
import { useLang } from "@/lib/i18n";
import { POSTS } from "@/content/posts";

export const Route = createFileRoute("/blog")({ component: Page });

function Page() {
  const { lang, tx } = useLang();
  return (
    <Shell>
      <div className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-4xl font-semibold">{tx("Field notes", "飞行笔记")}</h1>
        <div className="mt-8 space-y-4">
          {POSTS.map((p) => (
            <Link key={p.slug} to="/blog/$slug" params={{ slug: p.slug }} className="block rounded-2xl border border-line bg-surface p-4">
              <p className="text-xs text-muted">{p.date}</p>
              <h2 className="mt-1 text-xl font-semibold">{lang === "zh" ? p.title.zh : p.title.en}</h2>
              <p className="mt-2 text-sm text-muted">{lang === "zh" ? p.excerpt.zh : p.excerpt.en}</p>
            </Link>
          ))}
        </div>
      </div>
    </Shell>
  );
}
