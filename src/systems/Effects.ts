import { Graphics } from 'pixi.js';

class Spark extends Graphics {
  vx = 0;
  vy = 0;
  life = 0;
  ttl = 1;

  constructor() {
    super();
  }
}
