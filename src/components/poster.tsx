import { useEffect, useRef } from "react";
import { paintPoster } from "@/game/draw";

export function Poster({ kind }: { kind: "late" | "early" }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    canvas.width = Math.max(2, Math.floor(rect.width * 2));
    canvas.height = Math.max(2, Math.floor(rect.height * 2));
    paintPoster(canvas, kind);
  }, [kind]);
  return <canvas ref={ref} className="h-44 w-full rounded-xl border border-line bg-bg" />;
}
