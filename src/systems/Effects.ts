import { Container, Graphics } from 'pixi.js';
import type { EventBus } from '../core/EventBus';
import type { GameEvents } from '../core/events';
import { ObjectPool } from '../core/ObjectPool';
import { orbKinds } from '../entities/Orb';
import { rand } from '../utils/math';

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
        this.active.splice(i, 1);
        this.layer.removeChild(s);
        this.pool.release(s);
        continue;
      }
      s.vy += 380 * dt;
      s.x += s.vx * dt;
      s.y += s.vy * dt;
      const left = 1 - s.life / s.ttl;
      s.alpha = left;
      s.scale.set(0.4 + left * 0.8);
    }
  }

  private burst(x: number, y: number, color: number, count: number): void {
    for (let i = 0; i < count; i++) {
      const s = this.pool.acquire();
      const angle = rand(0, Math.PI * 2);
      const power = rand(60, 240);
      s.position.set(x, y);
      s.vx = Math.cos(angle) * power;
      s.vy = Math.sin(angle) * power - 80;
      s.life = 0;
      s.ttl = rand(0.35, 0.8);
      s.tint = color;
      s.alpha = 1;
      s.visible = true;
      this.layer.addChild(s);
      this.active.push(s);
    }
  }
}
