import { Container, Graphics } from 'pixi.js';
import { config } from '../config';
import { rand } from '../utils/math';

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
  private stars: Star[] = [];
  private clock = 0;

  constructor() {
    super();
    this.addChild(this.drawGlow(), this.drawFloor(), this.dots);
    for (let i = 0; i < 130; i++) this.stars.push(this.makeStar(rand(0, config.height)));
  }

  update(dt: number): void {
    this.clock += dt;
    this.dots.clear();
    for (const s of this.stars) {
      s.y += s.speed * dt;
      if (s.y > config.height) Object.assign(s, this.makeStar(-2));
      const twinkle = 0.6 + Math.sin(this.clock * 2 + s.phase) * 0.4;
      this.dots.beginFill(0xffffff, s.alpha * twinkle).drawCircle(s.x, s.y, s.r).endFill();
    }
  }

  private makeStar(y: number): Star {
    const depth = Math.random();
    return {
      x: rand(0, config.width),
      y,
      r: 0.6 + depth * 1.4,
      speed: 8 + depth * 40,
      alpha: 0.3 + depth * 0.6,
    }
  }
}
