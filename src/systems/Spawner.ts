import type { Container } from 'pixi.js';
import { ObjectPool } from '../core/ObjectPool';
import { Orb } from '../entities/Orb';

export class Spawner {
  readonly active: Orb[] = [];
  private pool: ObjectPool<Orb>;
  private timer = 0;

  constructor(private layer: Container) {
  }
}
