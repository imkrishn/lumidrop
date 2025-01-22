import { Container, Graphics } from 'pixi.js';
import { config } from '../config';
import { rand } from '../utils/math';

export type OrbKind = 'gold' | 'cyan' | 'bomb';

export const orbKinds: Record<OrbKind, { color: number; points: number }> = {
  gold: { color: 0xffd166, points: 10 },
  cyan: { color: 0x7df9ff, points: 5 },
  bomb: { color: 0xff4d6d, points: 0 }
};

export class Orb extends Container {
  kind: OrbKind = 'cyan';
  speed = 0;
  readonly radius = config.orb.radius;
  private body = new Graphics();
  private drawn: OrbKind | null = null;
  private phase = 0;
  private age = 0;

  constructor() {
    super();
    this.addChild(this.body);
  }

  configure(kind: OrbKind, x: number, speed: number): void {
    this.kind = kind;
    this.speed = speed;
    this.x = x;
    this.y = -30;
    this.age = 0;
    this.phase = rand(0, Math.PI * 2);
  }
}
