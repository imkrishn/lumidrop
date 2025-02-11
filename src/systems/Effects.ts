import { Container, Graphics } from 'pixi.js';
import type { EventBus } from '../core/EventBus';
import type { GameEvents } from '../core/events';
import { ObjectPool } from '../core/ObjectPool';
import { orbKinds } from '../entities/Orb';

class Spark extends Graphics {
  vx = 0;
  vy = 0;
  life = 0;
  ttl = 1;

  constructor() {
    super();
    this.beginFill(0xffffff).drawCircle(0, 0, 3).endFill();
  }
}

export class Effects {
  private pool: ObjectPool<Spark>;
  private active: Spark[] = [];

  constructor(private layer: Container, bus: EventBus<GameEvents>) {
    this.pool = new ObjectPool(
      () => new Spark(),
      (s) => {
        s.visible = false;
      },
      80
    );
    bus.on('orbCaught', ({ x, y, kind }) =>
      this.burst(x, y, orbKinds[kind].color, kind === 'bomb' ? 28 : 14)
    );
  }

  update(dt: number): void {
    for (let i = this.active.length - 1; i >= 0; i--) {
      const s = this.active[i];
      s.life += dt;
      if (s.life >= s.ttl) {
      }
    }
  }
}
