import { useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useLang } from "@/lib/i18n";

const LINKS = [
  { hash: "features", en: "Features", zh: "特性" },
  { hash: "how", en: "How to play", zh: "怎么玩" },
  { hash: "ships", en: "Ships", zh: "机体" },
  { hash: "weapons", en: "Weapons", zh: "武器" },
  { hash: "faq", en: "FAQ", zh: "问答" },
];

export function Shell({ children }: { children: ReactNode }) {
  const { tx, lang, setLang } = useLang();
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-bg text-fg">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-50 focus:bg-amber focus:px-3 focus:py-2 focus:text-bg">
        {tx("Skip to content", "跳到正文")}
      </a>
      <header className="sticky top-0 z-40 border-b border-line/80 bg-bg/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4">
          <Link to="/" className="flex items-center gap-2 text-fg">
            <Mark />
            <span className="text-sm font-semibold tracking-[0.18em]">NIGHTWAKE</span>
          </Link>
          <nav className="ml-4 hidden items-center gap-4 text-sm text-muted lg:flex">
            {LINKS.map((l) => (
              <Link key={l.hash} to="/" hash={l.hash} className="hover:text-fg">
                {lang === "zh" ? l.zh : l.en}
              </Link>
            ))}
            <Link to="/blog" className="hover:text-fg">{tx("Blog", "日志")}</Link>
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              className="min-h-11 rounded-full border border-line px-3 text-xs"
              onClick={() => setLang(lang === "zh" ? "en" : "zh")}
            >
              {lang === "zh" ? "EN" : "中文"}
            </button>
            <Link to="/play" className="hidden min-h-11 items-center rounded-full bg-amber px-4 text-sm font-semibold text-bg sm:inline-flex">
              {tx("Play free", "免费开打")}
            </Link>
            <button type="button" className="grid size-11 place-items-center lg:hidden" aria-label={tx("Menu", "菜单")} onClick={() => setOpen((v) => !v)}>
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
        {open ? (
          <div className="border-t border-line px-4 py-3 lg:hidden">
            <div className="flex flex-col">
              {LINKS.map((l) => (
                <Link key={l.hash} to="/" hash={l.hash} className="min-h-11 py-2 text-fg" onClick={() => setOpen(false)}>
                  {lang === "zh" ? l.zh : l.en}
                </Link>
              ))}
              <Link to="/blog" className="min-h-11 py-2" onClick={() => setOpen(false)}>{tx("Blog", "日志")}</Link>
              <Link to="/planes" className="min-h-11 py-2" onClick={() => setOpen(false)}>{tx("Plane games", "飞机游戏")}</Link>
              <Link to="/play" className="mt-1 inline-flex min-h-11 items-center justify-center rounded-full bg-amber font-semibold text-bg" onClick={() => setOpen(false)}>
                {tx("Play free", "免费开打")}
              </Link>
            </div>
          </div>
        ) : null}
      </header>
      <main id="main">{children}</main>
      <footer className="border-t border-line">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 font-semibold tracking-[0.16em]">
              <Mark /> NIGHTWAKE
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {tx(
                "A free vertical shmup for the browser. Timed waves, a hangar, and a new build every run. This is a local arcade, not affiliated with any other shmup site.",
                "浏览器里的免费纵版射击。限时波次、机库、每局一套新构筑。这是本地街机，与其他射击站没有从属关系。",
              )}
            </p>
          </div>
          <div className="text-sm">
            <p className="font-semibold text-fg">{tx("Game", "游戏")}</p>
            <div className="mt-2 flex flex-col gap-2 text-muted">
              <Link to="/play">{tx("Play", "开打")}</Link>
              <Link to="/planes">{tx("Plane games", "飞机游戏")}</Link>
              <Link to="/blog">{tx("Field notes", "飞行笔记")}</Link>
            </div>
          </div>
          <div className="text-sm">
            <p className="font-semibold text-fg">{tx("Paperwork", "说明")}</p>
            <div className="mt-2 flex flex-col gap-2 text-muted">
              <Link to="/about">{tx("About", "关于")}</Link>
              <Link to="/contact">{tx("Contact", "联系")}</Link>
              <Link to="/privacy">{tx("Privacy", "隐私")}</Link>
              <Link to="/terms">{tx("Terms", "条款")}</Link>
              <Link to="/cookie">{tx("Storage", "本地存储")}</Link>
            </div>
          </div>
        </div>
        <p className="px-4 pb-8 text-center text-xs text-muted">© {new Date().getFullYear()} Nightwake</p>
      </footer>
    </div>
  );
}

function Mark() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
      <path d="M11 1 L16 18 H12 L11 14 L10 18 H6 Z" fill="#ffb347" />
      <path d="M11 6 L13 14 H9 Z" fill="#0d0b12" />
    </svg>
  );
}
