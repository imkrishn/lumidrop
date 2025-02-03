import { Container, Graphics } from 'pixi.js';

interface Star {
  x: number;
  y: number;
  r: number;
  speed: number;
  alpha: number;
  phase: number;
}

export class Backdrop extends Container {
  private dots = new Graphics();
}
