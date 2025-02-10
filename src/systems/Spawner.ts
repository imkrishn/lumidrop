import type { Container } from 'pixi.js';
import { config } from '../config';
import { ObjectPool } from '../core/ObjectPool';
import { Orb } from '../entities/Orb';
import { rand } from '../utils/math';

export class Spawner {
  readonly active: Orb[] = [];
  private pool: ObjectPool<Orb>;
  private timer = 0;

  constructor(private layer: Container) {
    this.pool = new ObjectPool(
      () => new Orb(),
      (orb) => {
        orb.visible = false;
      },
      24
    );
  }

  reset(): void {
    this.clear();
    this.timer = 0.6;
  }

  update(dt: number, elapsed: number): void {
    this.timer -= dt;
    if (this.timer > 0) return;
    this.timer = Math.max(config.spawn.min, config.spawn.start - elapsed * config.spawn.ramp);
    this.spawn(elapsed);
  }

  release(orb: Orb): void {
    const i = this.active.indexOf(orb);
    if (i >= 0) this.active.splice(i, 1);
    this.layer.removeChild(orb);
    this.pool.release(orb);
  }

  clear(): void {
    while (this.active.length) this.release(this.active[this.active.length - 1]);
  }

  private spawn(elapsed: number): void {
    const orb = this.pool.acquire();
    const boost = Math.min(elapsed * 3, 140);
    const speed = rand(config.orb.minSpeed, config.orb.maxSpeed) + boost;
    orb.configure(this.pickKind(elapsed), rand(40, config.width - 40), speed);
    this.layer.addChild(orb);
    this.active.push(orb);
  }
}
