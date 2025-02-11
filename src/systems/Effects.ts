import { Container, Graphics } from 'pixi.js';
import type { EventBus } from '../core/EventBus';
import type { GameEvents } from '../core/events';
import { ObjectPool } from '../core/ObjectPool';

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
  }
}
