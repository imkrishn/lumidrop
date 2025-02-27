import { Graphics } from 'pixi.js';

export function createPanel(w: number, h: number): Graphics {
  const g = new Graphics();
  g.beginFill(0x7df9ff, 0.06).drawRoundedRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16, 30).endFill();
  g.beginFill(0x10142b, 0.94).lineStyle(2, 0x7df9ff, 0.7);
  g.drawRoundedRect(-w / 2, -h / 2, w, h, 24).endFill();
  return g;
}
