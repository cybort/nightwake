import { DIALS, PRESETS, sameMods, type ModKey, type Mods, type ModTier } from "./mods";

export function ModifierSheet({
  mods,
  tx,
  onDial,
  onPreset,
  onClose,
}: {
  mods: Mods;
  tx: (en: string, zh: string) => string;
  onDial: (key: ModKey, tier: ModTier) => void;
  onPreset: (mods: Mods) => void;
  onClose: () => void;
}) {
  const presetId = PRESETS.find((p) => sameMods(p.mods, mods))?.id;
  return (
    <div id="patch-bay" className="absolute inset-x-0 bottom-0 z-40 max-h-[86%] overflow-y-auto border-t border-violet bg-bg/95 p-3 sm:p-4">
      <div className="mx-auto max-w-lg pb-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-pixel text-[10px] leading-5 text-violet">{tx("PATCH BAY", "改装台")}</p>
            <h2 className="mt-1 text-xl font-semibold text-fg">{tx("Built-in modifier", "内置修改器")}</h2>
          </div>
          <button type="button" onClick={onClose} className="min-h-11 shrink-0 rounded-full border border-line px-4 text-sm text-fg">
            {tx("Close", "关闭")}
          </button>
        </div>
        <p className="mt-2 text-xs leading-relaxed text-muted">
          {tx(
            "Pick a preset or mix the dials. Anything off Stock is not written to your best score.",
            "选一套预设，或自己混档。只要不是原装，这局就不写入最高分。",
          )}
        </p>
        <div className="mt-3 grid grid-cols-4 gap-1">
          {PRESETS.map((preset) => {
            const on = preset.id === presetId;
            return (
              <button
                key={preset.id}
                type="button"
                aria-pressed={on}
                onClick={() => onPreset(preset.mods)}
                className={`min-h-11 rounded-full border px-1 text-xs font-semibold ${on ? "border-amber bg-amber text-bg" : "border-line bg-surface text-fg"}`}
              >
                {tx(preset.en, preset.zh)}
              </button>
            );
          })}
        </div>
        {DIALS.map((dial) => {
          const tier = mods[dial.key];
          const copy = dial.tiers[tier];
          return (
            <div key={dial.key} className="mt-4">
              <p className="text-sm font-semibold text-fg">{tx(dial.en, dial.zh)}</p>
              <div className="mt-1 grid grid-cols-4 gap-1">
                {dial.tiers.map((step, i) => {
                  const on = tier === i;
                  return (
                    <button
                      key={step.en}
                      type="button"
                      aria-pressed={on}
                      onClick={() => onDial(dial.key, i as ModTier)}
                      className={`min-h-11 rounded-full border px-1 text-xs font-semibold ${on ? "border-violet bg-violet text-bg" : "border-line bg-surface text-fg"}`}
                    >
                      {tx(step.en, step.zh)}
                    </button>
                  );
                })}
              </div>
              <p className="mt-1 text-xs text-muted">{tx(copy.hintEn, copy.hintZh)}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
