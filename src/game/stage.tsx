import { useEffect, useRef, useState } from "react";
import { Bomb, Lock, LockOpen, Maximize2, Minimize2, RefreshCw, SlidersHorizontal, Volume2, VolumeX } from "lucide-react";
import { useLang } from "@/lib/i18n";
import {
  BOSSES,
  GUNS,
  SHIPS,
  STARTER_WEAPONS,
  UPGRADES,
  WEAPONS,
  ITEMS,
  itemById,
  shipById,
  weaponById,
  type Gun,
  type UpgradeId,
} from "./data";
import {
  applyLevelPick,
  buyOffer,
  derive,
  ensureLevelOffers,
  fillOffers,
  loadBest,
  openCrate,
  placePod,
  rerollCost,
  rollOffer,
  sellValue,
  spendScrap,
  syncMods,
  type Offer,
  type Run,
} from "./balance";
import { dropMul, luckWeights, TIER_NAME } from "./dossier";
import { paint } from "./draw";
import { ModifierSheet } from "./modifier";
import { modsActive, saveMods, type ModKey, type Mods, type ModTier } from "./mods";
import {
  advance,
  bankRun,
  beginWave,
  createSim,
  dragPlayer,
  keepSim,
  keptSim,
  launchNext,
  recallSim,
  reconfigure,
  rememberSim,
  togglePause,
  useBomb,
  type Sim,
} from "./sim";

function makeAudio() {
  let ctx: AudioContext | null = null;
  let muted = false;
  const unlock = () => {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return;
    if (!ctx) ctx = new AC();
    if (ctx.state === "suspended") void ctx.resume();
  };
  const play = (name: string) => {
    if (muted || !ctx) return;
    const spec: Record<string, [number, number, OscillatorType, number]> = {
      shoot: [540, 0.03, "square", 0.018],
      hit: [120, 0.09, "sawtooth", 0.05],
      exp: [80, 0.14, "triangle", 0.06],
      pick: [820, 0.05, "square", 0.03],
      bomb: [64, 0.22, "sawtooth", 0.07],
      hangar: [300, 0.09, "triangle", 0.04],
      die: [58, 0.28, "sawtooth", 0.06],
    };
    const s = spec[name];
    if (!s) return;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = s[2];
    o.frequency.value = s[0];
    g.gain.value = s[3];
    o.connect(g);
    g.connect(ctx.destination);
    o.start();
    o.stop(ctx.currentTime + s[1]);
  };
  return { unlock, play, setMuted: (m: boolean) => { muted = m; } };
}

export function GameStage({ full = false }: { full?: boolean }) {
  const { tx, lang } = useLang();
  const langRef = useRef(lang);
  langRef.current = lang;
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const simRef = useRef<Sim | null>(null);
  const audioRef = useRef<ReturnType<typeof makeAudio> | null>(null);
  const dragRef = useRef<{ id: number; ox: number; oy: number; sx: number; sy: number } | null>(null);
  const bombEdge = useRef(false);
  const [rev, setRev] = useState(0);
  const [muted, setMuted] = useState(false);
  const [coarse, setCoarse] = useState(false);
  const [modOpen, setModOpen] = useState(false);
  const [fs, setFs] = useState(false);
  const modOpenRef = useRef(false);
  const pausedForMod = useRef(false);
  const toggleModRef = useRef<() => void>(() => {});
  const bump = () => setRev((n) => n + 1);

  useEffect(() => {
    const sim = full ? (keptSim() ?? recallSim() ?? createSim(loadBest())) : createSim(loadBest());
    if (full) keepSim(sim);
    simRef.current = sim;
    const audio = makeAudio();
    audioRef.current = audio;
    sim.sfx = (n) => audio.play(n);
    setCoarse(window.matchMedia("(pointer: coarse)").matches);
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    let last = performance.now();
    let lastMode = sim.mode;
    let sinceSave = 0;
    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const rect = wrap.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const w = Math.max(1, rect.width);
      const h = Math.max(1, rect.height);
      if (canvas.width !== Math.floor(w * dpr) || canvas.height !== Math.floor(h * dpr)) {
        canvas.width = Math.floor(w * dpr);
        canvas.height = Math.floor(h * dpr);
      }
      const pads = navigator.getGamepads?.();
      const pad = pads?.[0];
      if (pad && (sim.mode === "wave" || sim.mode === "vacuum") && sim.exit !== "climb" && !sim.touching) {
        const ax = pad.axes[0] ?? 0;
        const ay = pad.axes[1] ?? 0;
        if (Math.hypot(ax, ay) > 0.22) {
          const sp = 272 * (1 + sim.stats.speed);
          sim.player.x = Math.max(22, Math.min(458, sim.player.x + ax * sp * dt));
          sim.player.y = Math.max(28, Math.min(694, sim.player.y + ay * sp * dt));
          sim.speed = sp;
        }
        const pressed = Boolean(pad.buttons[0]?.pressed || pad.buttons[1]?.pressed);
        if (pressed && !bombEdge.current) useBomb(sim);
        bombEdge.current = pressed;
      }
      sim.lang = langRef.current;
      advance(sim, dt);
      paint(ctx, sim, w, h);
      if (sim.mode === "hangar" && sim.run.pendingLevels > 0 && sim.run.levelOffers.length === 0) ensureLevelOffers(sim.run);
      if (sim.mode !== lastMode) {
        lastMode = sim.mode;
        if (full) rememberSim(sim);
        bump();
      }
      if (full) {
        sinceSave += dt;
        if (sinceSave > 1) {
          sinceSave = 0;
          rememberSim(sim);
        }
      }
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);

    const onKey = (e: KeyboardEvent) => {
      if (e.repeat) return;
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.code === "KeyM" || ((e.code === "Escape" || e.code === "KeyP") && modOpenRef.current)) {
        e.preventDefault();
        toggleModRef.current();
        return;
      }
      if ((sim.mode === "wave" || sim.mode === "vacuum" || sim.mode === "pause") && ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space"].includes(e.code)) {
        e.preventDefault();
      }
      sim.keys.add(e.code);
      if (e.code === "KeyX" || e.code === "KeyK") useBomb(sim);
      if (e.code === "Escape" || e.code === "KeyP") {
        togglePause(sim);
        bump();
      }
    };
    const onUp = (e: KeyboardEvent) => sim.keys.delete(e.code);
    const onBlur = () => sim.keys.clear();
    const onFs = () => {
      if (full) rememberSim(sim);
      setFs(document.fullscreenElement === wrapRef.current);
    };
    const onHide = () => {
      if (full) rememberSim(sim);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("keyup", onUp);
    window.addEventListener("blur", onBlur);
    window.addEventListener("pagehide", onHide);
    document.addEventListener("fullscreenchange", onFs);
    document.addEventListener("webkitfullscreenchange", onFs);
    bump();
    return () => {
      if (full) rememberSim(sim);
      cancelAnimationFrame(frame);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("keyup", onUp);
      window.removeEventListener("blur", onBlur);
      window.removeEventListener("pagehide", onHide);
      document.removeEventListener("fullscreenchange", onFs);
      document.removeEventListener("webkitfullscreenchange", onFs);
    };
  }, [full]);

  const sim = simRef.current;
  const run = sim?.run;

  const onPointerDown = (e: React.PointerEvent) => {
    audioRef.current?.unlock();
    const s = simRef.current;
    if (!s || s.exit === "climb" || (s.mode !== "wave" && s.mode !== "vacuum")) return;
    if (e.pointerType === "touch" && e.isPrimary === false) {
      useBomb(s);
      return;
    }
    dragRef.current = { id: e.pointerId, ox: e.clientX, oy: e.clientY, sx: s.player.x, sy: s.player.y };
    s.touching = true;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = dragRef.current;
    const s = simRef.current;
    if (!d || !s || d.id !== e.pointerId || s.exit === "climb") return;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const scale = Math.min(rect.width / 480, rect.height / 720) || 1;
    dragPlayer(s, d.sx + (e.clientX - d.ox) / scale, d.sy + (e.clientY - d.oy) / scale);
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (dragRef.current?.id === e.pointerId) {
      dragRef.current = null;
      if (simRef.current) simRef.current.touching = false;
    }
  };

  const launch = () => {
    const s = simRef.current;
    if (!s) return;
    audioRef.current?.unlock();
    beginWave(s);
    bump();
  };

  const chooseShip = (id: string) => {
    const s = simRef.current;
    if (!s) return;
    reconfigure(s, id, s.run.danger, s.run.pods[0]?.id ?? "tracer");
    bump();
  };
  const chooseGun = (id: string) => {
    const s = simRef.current;
    if (!s) return;
    reconfigure(s, s.run.shipId, s.run.danger, id);
    bump();
  };
  const chooseDanger = (n: number) => {
    const s = simRef.current;
    if (!s) return;
    reconfigure(s, s.run.shipId, n, s.run.pods[0]?.id ?? "tracer");
    bump();
  };

  const pickUpgrade = (id: UpgradeId) => {
    const s = simRef.current;
    if (!s) return;
    applyLevelPick(s.run, id);
    if (id === "luck") fillOffers(s.run, Math.random);
    if (full) rememberSim(s);
    bump();
  };

  const replaceBought = (i: number) => {
    const s = simRef.current;
    if (!s) return;
    const offer = s.run.offers[i];
    const luckItem = offer?.kind === "item" && (offer.id === "coin" || offer.id === "medal");
    if (!buyOffer(s.run, i)) {
      bump();
      return;
    }
    if (luckItem) fillOffers(s.run, Math.random);
    else {
      s.run.locked[i] = false;
      s.run.offers[i] = rollOffer(s.run, Math.random);
    }
    bump();
  };

  const toggleMod = () => {
    const s = simRef.current;
    if (!s) return;
    if (modOpenRef.current) {
      if (pausedForMod.current && s.mode === "pause") {
        s.mode = s.held === "vacuum" ? "vacuum" : "wave";
      }
      pausedForMod.current = false;
      modOpenRef.current = false;
      setModOpen(false);
      bump();
      return;
    }
    if (s.mode === "wave" || s.mode === "vacuum") {
      s.held = s.mode;
      s.mode = "pause";
      pausedForMod.current = true;
    } else {
      pausedForMod.current = false;
    }
    modOpenRef.current = true;
    setModOpen(true);
    bump();
  };
  toggleModRef.current = toggleMod;

  const toggleFs = () => {
    const s = simRef.current;
    if (s && full) rememberSim(s);
    const el = wrapRef.current as (HTMLDivElement & { webkitRequestFullscreen?: () => void }) | null;
    if (!el) return;
    if (document.fullscreenElement) {
      void document.exitFullscreen?.();
      return;
    }
    if (el.requestFullscreen) void el.requestFullscreen();
    else el.webkitRequestFullscreen?.();
  };

  const setDial = (key: ModKey, tier: ModTier) => {
    const s = simRef.current;
    if (!s) return;
    s.run.mods = { ...s.run.mods, [key]: tier };
    saveMods(s.run.mods);
    if (s.mode === "select") reconfigure(s, s.run.shipId, s.run.danger, s.run.pods[0]?.id ?? "tracer");
    else syncMods(s.run);
    bump();
  };

  const applyPreset = (mods: Mods) => {
    const s = simRef.current;
    if (!s) return;
    s.run.mods = { ...mods };
    saveMods(s.run.mods);
    if (s.mode === "select") reconfigure(s, s.run.shipId, s.run.danger, s.run.pods[0]?.id ?? "tracer");
    else syncMods(s.run);
    bump();
  };

  return (
    <div ref={wrapRef} className={`relative overflow-hidden bg-bg ${full ? "h-[100dvh]" : "h-[min(74vh,680px)] min-h-[420px] w-full"}`}>
      <canvas
        ref={canvasRef}
        className="h-full w-full touch-none"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      />
      <button
        type="button"
        className="absolute left-3 top-3 z-30 grid size-11 place-items-center rounded-full bg-surface/80 text-fg"
        aria-label={tx("Fullscreen", "全屏")}
        aria-pressed={fs}
        onClick={toggleFs}
      >
        {fs ? <Minimize2 className="size-5" /> : <Maximize2 className="size-5" />}
      </button>
      <button
        id="patch-toggle"
        type="button"
        className={`absolute right-16 top-3 z-30 grid size-11 place-items-center rounded-full ${run && modsActive(run.mods) ? "bg-violet text-bg" : "bg-surface/80 text-fg"}`}
        aria-label={tx("Patch bay", "改装台")}
        aria-pressed={modOpen}
        onClick={toggleMod}
      >
        <SlidersHorizontal className="size-5" />
      </button>
      <button
        type="button"
        className="absolute right-3 top-3 z-30 grid size-11 place-items-center rounded-full bg-surface/80 text-fg"
        aria-label={tx("Mute", "静音")}
        onClick={() => {
          const next = !muted;
          setMuted(next);
          audioRef.current?.setMuted(next);
        }}
      >
        {muted ? <VolumeX className="size-5" /> : <Volume2 className="size-5" />}
      </button>
      {sim && run && sim.mode === "select" ? (
        <div className="absolute inset-x-0 bottom-0 top-40 z-20 overflow-y-auto border-t border-line bg-bg/92 p-3 sm:p-4">
          <p className="font-pixel text-[10px] leading-5 text-amber">{tx("NIGHTWAKE", "夜航")}</p>
          <h2 className="mt-1 text-2xl font-semibold text-fg">{tx("Choose a ship", "选择机体")}</h2>
          <p className="text-sm text-muted">
            {tx(`Best ${run.best}`, `最高分 ${run.best}`)}
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2 lg:grid-cols-3">
            {SHIPS.map((ship, i) => (
              <button
                key={ship.id}
                type="button"
                onClick={() => chooseShip(ship.id)}
                className={`rounded-xl border p-3 text-left ${run.shipId === ship.id ? "border-amber bg-surface-2" : "border-line bg-surface"}`}
              >
                <div className="flex items-center gap-2">
                  <SpriteThumb sheet="ships" index={i} cols={2} rows={3} className="size-12" />
                  <div>
                    <div className="text-sm font-semibold text-fg">{ship.name}</div>
                    <div className="text-xs text-cyan">{lang === "zh" ? ship.role.zh : ship.role.en}</div>
                  </div>
                </div>
                <p className="mt-1 text-xs leading-snug text-muted">{lang === "zh" ? ship.blurb.zh : ship.blurb.en}</p>
              </button>
            ))}
          </div>
          <p className="mt-4 text-sm font-semibold text-fg">{tx("Starting pod", "初始荚舱")}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {STARTER_WEAPONS.map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => chooseGun(id)}
                className={`flex min-h-11 items-center gap-2 rounded-full border px-3 py-2 text-sm ${run.pods[0]?.id === id ? "border-cyan text-cyan" : "border-line text-fg"}`}
              >
                <SpriteThumb sheet="weapons" index={Math.max(0, WEAPONS.findIndex((w) => w.id === id))} cols={4} rows={4} className="size-7" />
                {lang === "zh" ? weaponById(id).name.zh : weaponById(id).name.en}
              </button>
            ))}
          </div>
          <p className="mt-4 text-sm font-semibold text-fg">{tx("Danger", "危险等级")} {run.danger}</p>
          <input
            className="mt-2 w-full accent-[var(--color-amber)]"
            type="range"
            min={0}
            max={5}
            value={run.danger}
            onChange={(e) => chooseDanger(Number(e.target.value))}
            aria-label={tx("Danger", "危险等级")}
          />
          <button id="launch-sortie" type="button" onClick={launch} className="sticky bottom-0 mt-4 min-h-11 w-full rounded-full bg-amber px-5 py-3 text-sm font-semibold text-bg">
            {tx("Launch sortie", "起飞")}
          </button>
          <p className="mt-3 max-w-md text-xs leading-relaxed text-muted">
            {tx(
              "WASD move. Shift focuses. X or K drops a bomb. M opens the patch bay. Auto-fire is on. Drag to fly on a touch screen.",
              "WASD 移动，Shift 精瞄，X 或 K 炸弹，M 打开改装台。自动射击。触屏按住拖动，手指不会挡住机体。",
            )}
          </p>
        </div>
      ) : null}

      {sim && run && sim.mode === "hangar" ? (
        <div className="absolute inset-0 z-20 overflow-y-auto bg-bg/88 p-3 sm:p-4">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="font-pixel text-[10px] text-amber">{tx("HANGAR", "机库")}</p>
              <h2 className="text-xl font-semibold">{tx(`After wave ${run.wave}`, `第 ${run.wave} 波结束`)}</h2>
            </div>
            <div className="text-right text-sm text-amber">
              {tx("Scrap", "残片")} {run.scrap}
              {modsActive(run.mods) ? <span className="ml-2 text-violet">{tx("MOD", "改装")}</span> : null}
            </div>
          </div>
          {run.pendingLevels > 0 ? (
            <div className="mt-3">
              <p className="text-sm text-fg">{tx(`Level ${run.level} — pick an upgrade`, `等级 ${run.level} — 选一项强化`)}</p>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {ensureLevelOffers(run).map((id) => {
                  const u = UPGRADES.find((x) => x.id === id);
                  if (!u) return null;
                  return (
                    <button key={id} type="button" onClick={() => pickUpgrade(id)} className="min-h-16 rounded-xl border border-line bg-surface p-3 text-left">
                      <div className="text-sm font-semibold">{lang === "zh" ? u.name.zh : u.name.en}</div>
                      <div className="text-xs text-muted">{lang === "zh" ? u.blurb.zh : u.blurb.en}</div>
                    </button>
                  );
                })}
              </div>
              {run.levelOffers.length === 0 ? (
                <button type="button" className="mt-2 min-h-11 rounded-full bg-amber px-5 text-sm font-semibold text-bg" onClick={() => { run.pendingLevels = 0; bump(); }}>
                  {tx("Continue", "继续")}
                </button>
              ) : null}
            </div>
          ) : null}
          <PassiveRow run={run} lang={lang} tx={tx} />
          <LuckReadout run={run} lang={lang} tx={tx} />
          {run.pendingLevels > 0 ? null : (
            <>
              {run.crates.length > 0 ? (
                <div className="mt-3 space-y-2">
                  {run.crates.map((id, i) => {
                    const item = itemById(id);
                    return (
                      <div key={`${id}-${i}`} className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-line bg-surface px-3 py-2">
                        <span className="text-sm">{item ? (lang === "zh" ? item.name.zh : item.name.en) : id}</span>
                        <span className="flex gap-2">
                          <button type="button" className="min-h-11 rounded-full bg-cyan px-3 text-sm font-semibold text-bg" onClick={() => { openCrate(run, i, true); bump(); }}>
                            {tx("Take", "拿下")}
                          </button>
                          <button type="button" className="min-h-11 rounded-full border border-line px-3 text-sm" onClick={() => { openCrate(run, i, false); bump(); }}>
                            {tx("Recycle", "回收")}
                          </button>
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : null}
              <div className="mt-3 grid grid-cols-2 gap-2">
                {run.offers.map((offer, i) => (
                  <OfferCard
                    key={`${offer.kind}-${offer.id}-${i}`}
                    offer={offer}
                    locked={run.locked[i] ?? false}
                    lang={lang}
                    disabled={(run.mods.scrap < 3 && run.scrap < offer.cost) || (offer.kind === "item" && run.items.includes(offer.id))}
                    free={run.mods.scrap === 3}
                    onBuy={() => replaceBought(i)}
                    onLock={() => {
                      run.locked[i] = !run.locked[i];
                      bump();
                    }}
                    tx={tx}
                  />
                ))}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  className="min-h-11 rounded-full border border-line px-4 text-sm"
                  onClick={() => {
                    if (!spendScrap(run, rerollCost(run))) return;
                    fillOffers(run, Math.random);
                    bump();
                  }}
                >
                  <RefreshCw className="mr-1 inline size-4" />
                  {run.mods.scrap === 3 ? tx("Reroll", "重掷") : `${tx("Reroll", "重掷")} ${rerollCost(run)}`}
                </button>
              </div>
              <PodBay run={run} lang={lang} tx={tx} onChange={bump} />
              <div className="mt-4 flex flex-wrap gap-2">
                <button type="button" className="min-h-11 rounded-full bg-amber px-5 text-sm font-semibold text-bg" onClick={() => { launchNext(sim); bump(); }}>
                  {run.wave >= 20 ? tx(`Endless wave ${run.wave + 1}`, `无尽 第 ${run.wave + 1} 波`) : tx(`Launch wave ${run.wave + 1}`, `进入第 ${run.wave + 1} 波`)}
                </button>
                {run.wave >= 20 ? (
                  <button
                    type="button"
                    className="min-h-11 rounded-full border border-line px-4 text-sm"
                    onClick={() => {
                      bankRun(sim);
                      bump();
                    }}
                  >
                    {tx("Bank the win", "收工")}
                  </button>
                ) : null}
              </div>
            </>
          )}
        </div>
      ) : null}

      {sim && run && (sim.mode === "dead" || sim.mode === "clear") ? (
        <div className="absolute inset-0 z-20 grid place-items-center bg-bg/80 p-4">
          <div className="w-full max-w-sm rounded-2xl border border-line bg-surface p-5 text-center">
            {sim.mode === "clear" ? (
              <img src="/sprites/pilot.png" alt="" className="mx-auto mb-3 h-40 w-auto object-contain" />
            ) : null}
            <p className="font-pixel text-[10px] text-amber">{sim.mode === "clear" ? tx("CLEARED", "通关") : tx("DOWN", "坠机")}</p>
            <h2 className="mt-2 text-3xl font-semibold">{run.score}</h2>
            <p className="text-sm text-muted">{tx(`Best ${run.best}`, `最高 ${run.best}`)} · {tx(`Wave ${run.wave}`, `第 ${run.wave} 波`)}</p>
            {modsActive(run.mods) ? (
              <p className="mt-1 text-xs text-violet">{tx("Modified run. Best score unchanged.", "改装局，最高分未改写。")}</p>
            ) : null}
            <PassiveRow run={run} lang={lang} tx={tx} />
            <button
              type="button"
              className="mt-4 min-h-11 rounded-full bg-amber px-5 text-sm font-semibold text-bg"
              onClick={() => {
                reconfigure(sim, run.shipId, run.danger, run.pods[0]?.id ?? "tracer");
                sim.run.best = run.best;
                bump();
              }}
            >
              {tx("Fly again", "再来一局")}
            </button>
          </div>
        </div>
      ) : null}

      {coarse && sim && sim.mode === "wave" ? (
        <button
          type="button"
          className="absolute bottom-16 right-3 z-10 grid size-14 place-items-center rounded-full bg-ember text-fg"
          onPointerDown={(e) => {
            e.stopPropagation();
            if (simRef.current) useBomb(simRef.current);
          }}
        >
          <Bomb className="size-6" />
        </button>
      ) : null}
      {modOpen && run ? (
        <ModifierSheet mods={run.mods} tx={tx} onDial={setDial} onPreset={applyPreset} onClose={toggleMod} />
      ) : null}
      <span className="sr-only">{rev}</span>
    </div>
  );
}

function SpriteThumb({
  sheet,
  index,
  cols,
  rows,
  className = "size-9",
}: {
  sheet: string;
  index: number;
  cols: number;
  rows: number;
  className?: string;
}) {
  const cells = cols * rows;
  const n = ((index % cells) + cells) % cells;
  const col = n % cols;
  const row = Math.floor(n / cols);
  const x = cols <= 1 ? 0 : (col / (cols - 1)) * 100;
  const y = rows <= 1 ? 0 : (row / (rows - 1)) * 100;
  return (
    <span
      aria-hidden
      className={`inline-block shrink-0 bg-no-repeat ${className}`}
      style={{
        backgroundImage: `url(/sprites/${sheet}.png)`,
        backgroundSize: `${cols * 100}% ${rows * 100}%`,
        backgroundPosition: `${x}% ${y}%`,
      }}
    />
  );
}

function LuckReadout({
  run,
  lang,
  tx,
}: {
  run: Run;
  lang: "en" | "zh";
  tx: (en: string, zh: string) => string;
}) {
  const luck = derive(run).luck;
  const weights = luckWeights(Math.max(1, run.wave), luck);
  return (
    <div className="mt-3 rounded-xl border border-line bg-surface px-3 py-2">
      <p className="text-sm text-fg">
        {tx("Luck", "幸运")} {luck}
        <span className="text-amber"> · {tx("drops", "掉落")} ×{dropMul(luck).toFixed(2)}</span>
      </p>
      <p className="mt-1 text-xs leading-relaxed text-muted">
        {weights.map((w, i) => `${lang === "zh" ? TIER_NAME[i]!.zh : TIER_NAME[i]!.en} ${Math.round(w * 100)}%`).join(" · ")}
      </p>
      <p className="mt-1 text-xs leading-relaxed text-muted">
        {tx(
          "Luck does not invent a rare tier. It multiplies whatever weight this wave already has. Wave 1 is all common. Drops scale from the first kill.",
          "幸运不会凭空造出稀有档，只放大这一波已经有的权重。第 1 波全是普通。掉落从第一架敌机就开始乘。",
        )}
      </p>
    </div>
  );
}

function PassiveRow({
  run,
  lang,
  tx,
}: {
  run: Run;
  lang: "en" | "zh";
  tx: (en: string, zh: string) => string;
}) {
  if (run.picks.length === 0 && run.items.length === 0) return null;
  return (
    <div className="mt-3 text-left">
      <p className="text-sm font-semibold text-fg">{tx("Passives carried", "已选增益")}</p>
      <ul className="mt-2 flex flex-wrap gap-2">
        {run.picks.map((id, i) => {
          const u = UPGRADES.find((x) => x.id === id);
          const index = UPGRADES.findIndex((x) => x.id === id);
          return (
            <li key={`${id}-${i}`} className="flex min-h-11 items-center gap-2 rounded-full border border-line bg-bg px-2 text-xs text-fg">
              <SpriteThumb sheet="buffs" index={Math.max(0, index)} cols={4} rows={4} />
              <span>{lang === "zh" ? u?.name.zh : u?.name.en}</span>
            </li>
          );
        })}
        {run.items.map((id) => {
          const item = itemById(id);
          const index = ITEMS.findIndex((x) => x.id === id);
          return (
            <li key={id} className="flex min-h-11 items-center gap-2 rounded-full border border-cyan bg-bg px-2 text-xs text-fg">
              <SpriteThumb sheet="items" index={Math.max(0, index)} cols={4} rows={3} />
              <span>{lang === "zh" ? item?.name.zh : item?.name.en}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function OfferCard({
  offer,
  locked,
  lang,
  disabled,
  onBuy,
  onLock,
  tx,
  free,
}: {
  offer: Offer;
  locked: boolean;
  lang: "en" | "zh";
  disabled: boolean;
  onBuy: () => void;
  onLock: () => void;
  tx: (en: string, zh: string) => string;
  free: boolean;
}) {
  const name = offer.kind === "pod"
    ? `${lang === "zh" ? weaponById(offer.id).name.zh : weaponById(offer.id).name.en} ${"I".repeat(offer.tier)}`
    : (lang === "zh" ? itemById(offer.id)?.name.zh : itemById(offer.id)?.name.en) ?? offer.id;
  const blurb = offer.kind === "pod"
    ? (lang === "zh" ? weaponById(offer.id).blurb.zh : weaponById(offer.id).blurb.en)
    : (lang === "zh" ? itemById(offer.id)?.blurb.zh : itemById(offer.id)?.blurb.en) ?? "";
  const icon = offer.kind === "pod"
    ? { sheet: "weapons", index: Math.max(0, WEAPONS.findIndex((w) => w.id === offer.id)), cols: 4, rows: 4 }
    : { sheet: "items", index: Math.max(0, ITEMS.findIndex((w) => w.id === offer.id)), cols: 4, rows: 3 };
  return (
    <div className={`rounded-xl border p-3 ${locked ? "border-amber bg-surface-2" : "border-line bg-surface"}`}>
      <div className="flex items-center gap-2">
        <SpriteThumb sheet={icon.sheet} index={icon.index} cols={icon.cols} rows={icon.rows} />
        <div className="text-sm font-semibold text-fg">{name}</div>
      </div>
      <p className="mt-1 text-xs text-muted">{blurb}</p>
      <div className="mt-2 flex gap-2">
        <button type="button" disabled={disabled} onClick={onBuy} className="min-h-11 flex-1 rounded-full bg-amber text-sm font-semibold text-bg disabled:opacity-40">
          {free ? tx("Free", "免费") : offer.cost}
        </button>
        <button type="button" onClick={onLock} className="grid size-11 place-items-center rounded-full border border-line" aria-label={tx("Lock", "锁定")}>
          {locked ? <Lock className="size-4" /> : <LockOpen className="size-4" />}
        </button>
      </div>
    </div>
  );
}

function PodBay({
  run,
  lang,
  tx,
  onChange,
}: {
  run: Run;
  lang: "en" | "zh";
  tx: (en: string, zh: string) => string;
  onChange: () => void;
}) {
  return (
    <div className="mt-4">
      <p className="text-sm font-semibold">{tx("Mounted pods", "已挂荚舱")} {run.pods.length}/6</p>
      <ul className="mt-2 space-y-2">
        {run.pods.map((pod, i) => {
          const dup = run.pods.some((p, j) => j !== i && p.id === pod.id && p.tier === pod.tier && pod.tier < 4);
          return (
            <li key={`${pod.id}-${i}`} className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-line px-3 py-2">
              <span className="flex items-center gap-2 text-sm">
                <SpriteThumb sheet="weapons" index={Math.max(0, WEAPONS.findIndex((w) => w.id === pod.id))} cols={4} rows={4} className="size-8" />
                {lang === "zh" ? weaponById(pod.id).name.zh : weaponById(pod.id).name.en}
                <span className="text-amber">{"I".repeat(pod.tier)}</span>
              </span>
              <span className="flex gap-2">
                {dup ? (
                  <button
                    type="button"
                    className="min-h-11 rounded-full border border-cyan px-3 text-sm text-cyan"
                    onClick={() => {
                      run.pods.splice(i, 1);
                      placePod(run, pod.id, pod.tier);
                      onChange();
                    }}
                  >
                    {tx("Fuse", "融合")}
                  </button>
                ) : null}
                <button
                  type="button"
                  className="min-h-11 rounded-full border border-line px-3 text-sm"
                  onClick={() => {
                    run.scrap += sellValue(pod);
                    run.pods.splice(i, 1);
                    onChange();
                  }}
                >
                  {tx("Sell", "卖出")} {sellValue(pod)}
                </button>
              </span>
            </li>
          );
        })}
      </ul>
      <p className="mt-2 text-xs text-muted">
        {shipById(run.shipId).name} · {lang === "zh" ? GUNS[run.gun as Gun].name.zh : GUNS[run.gun as Gun].name.en} {run.gunLevel}
        {run.wave % 5 === 0 ? ` · ${BOSSES[((run.wave / 5 - 1) % 4 + 4) % 4]?.name ?? ""}` : ""}
      </p>
    </div>
  );
}
