import { config } from '../config';
import type { GameContext } from '../core/context';
import type { State } from '../core/StateMachine';
import { Orb, orbKinds } from '../entities/Orb';
import { Hud } from '../ui/Hud';
import { rand } from '../utils/math';

export class PlayState implements State {
  private hud: Hud;
  private elapsed = 0;
  private shake = 0;

  constructor(private ctx: GameContext) {
    this.hud = new Hud(ctx.bus);
  }

  enter(): void {
    const { score, hero, spawner, ui } = this.ctx;
    this.elapsed = 0;
    this.shake = 0;
    score.reset();
    hero.reset();
    spawner.reset();
    this.hud.setBest(score.best);
    ui.addChild(this.hud);
  }

  exit(): void {
    this.ctx.spawner.clear();
    this.ctx.ui.removeChild(this.hud);
    this.ctx.world.position.set(0, 0);
  }

  update(dt: number): void {
    const { hero, input, spawner, score, machine } = this.ctx;
    this.elapsed += dt;

    hero.update(dt, input.direction(hero.x));
    spawner.update(dt, this.elapsed);

    // walk backwards so releasing an orb is safe
    const list = spawner.active;
    for (let i = list.length - 1; i >= 0; i--) {
      const orb = list[i];
      orb.update(dt);
      if (this.touchesPad(orb)) {
        this.catchOrb(orb);
      } else if (orb.y > config.floorY) {
        // a missed light costs a life, a missed bomb is free
        if (orb.kind !== 'bomb') score.loseLife();
        spawner.release(orb);
      }
    }

    this.applyShake(dt);

    if (score.dead) {
      score.finish();
      machine.change('over');
    }
  }

  private touchesPad(orb: Orb): boolean {
    const { hero } = this.ctx;
    // horizontal check first, then the catch window
    const near = Math.abs(orb.x - hero.x) < hero.halfWidth + orb.radius * 0.7;
    return near && orb.y >= hero.padY - 14 && orb.y <= hero.padY + 36;
  }

  private catchOrb(orb: Orb): void {
    const { bus, score, spawner } = this.ctx;
    bus.emit('orbCaught', { x: orb.x, y: orb.y, kind: orb.kind });
    if (orb.kind === 'bomb') {
      score.loseLife();
      this.shake = 0.4;
    } else {
      score.collect(orbKinds[orb.kind].points);
    }
    spawner.release(orb);
  }

  private applyShake(dt: number): void {
    this.shake = Math.max(0, this.shake - dt);
    // shake fades out as the timer runs down
    const power = this.shake * 18;
    this.ctx.world.position.set(rand(-power, power), rand(-power, power));
  }
}
