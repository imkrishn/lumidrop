import { Container, Graphics } from 'pixi.js';
import { config } from '../config';

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
}
