import type { Container } from 'pixi.js';
import { config } from '../config';
import { ObjectPool } from '../core/ObjectPool';
import { Orb } from '../entities/Orb';

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
  }
}
