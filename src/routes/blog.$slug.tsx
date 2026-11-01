import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/shell";
import { useLang } from "@/lib/i18n";
import { postBySlug } from "@/content/posts";

export const Route = createFileRoute("/blog/$slug")({ component: Page });

function Page() {
  const { slug } = Route.useParams();
  const { lang, tx } = useLang();
  const post = postBySlug(slug);
  return (
    <Shell>
      <article className="mx-auto max-w-2xl px-4 py-12">
        <Link to="/blog" className="text-sm text-cyan">{tx("All notes", "全部笔记")}</Link>
        {post ? (
          <>
            <p className="mt-4 text-xs text-muted">{post.date}</p>
            <h1 className="mt-2 text-4xl font-semibold">{lang === "zh" ? post.title.zh : post.title.en}</h1>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted">
              {(lang === "zh" ? post.body.zh : post.body.en).map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </>
        ) : (
          <h1 className="mt-4 text-3xl font-semibold">{tx("Missing note", "没有这篇")}</h1>
        )}
      </article>
    </Shell>
  );
}
