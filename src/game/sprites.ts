type Sheet = { img: HTMLImageElement; cols: number; rows: number; ready: boolean };

const sheets: Record<string, Sheet> = {};
let started = false;

function add(name: string, src: string, cols: number, rows: number) {
  const img = new Image();
  const sheet: Sheet = { img, cols, rows, ready: false };
  img.onload = () => {
    sheet.ready = img.naturalWidth > 0;
  };
  img.src = src;
  sheets[name] = sheet;
}

export function loadSprites() {
  if (started || typeof Image === "undefined") return;
  started = true;
  add("ships", "/sprites/ships.png", 2, 3);
  add("weapons", "/sprites/weapons.png", 4, 4);
  add("buffs", "/sprites/buffs.png", 4, 4);
  add("drops", "/sprites/drops.png", 3, 3);
  add("enemies", "/sprites/enemies.png", 4, 3);
  add("items", "/sprites/items.png", 4, 3);
  add("pilot", "/sprites/pilot.png", 1, 1);
}

export function drawSprite(
  ctx: CanvasRenderingContext2D,
  name: string,
  index: number,
  x: number,
  y: number,
  size: number,
) {
  const sheet = sheets[name];
  if (!sheet?.ready) return false;
  const { img, cols, rows } = sheet;
  const cw = img.naturalWidth / cols;
  const ch = img.naturalHeight / rows;
  const col = index % cols;
  const row = Math.floor(index / cols);
  if (row < 0 || row >= rows) return false;
  ctx.drawImage(img, col * cw, row * ch, cw, ch, x - size / 2, y - size / 2, size, size);
  return true;
}
