import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/shell";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/privacy")({ component: Page });

function Page() {
  const { tx } = useLang();
  return (
    <Shell>
      <article className="mx-auto max-w-2xl px-4 py-12 text-sm leading-relaxed text-muted">
        <h1 className="text-3xl font-semibold text-fg">{tx("Privacy", "隐私")}</h1>
        <p className="mt-4">
          {tx(
            "Nightwake stores a high score, the language choice, mute is not persisted, and any contact note you submit, all in local storage on your device. There is no account and no message is uploaded by this page.",
            "夜航把最高分、语言选择，以及你提交的联系留言，存在你设备的本地存储里。静音不会被记住。没有账号，这个页面也不会上传留言。",
          )}
        </p>
      </article>
    </Shell>
  );
}
