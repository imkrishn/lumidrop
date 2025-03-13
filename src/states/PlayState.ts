import { config } from '../config';
import type { GameContext } from '../core/context';
import type { State } from '../core/StateMachine';
import { Hud } from '../ui/Hud';

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

    const list = spawner.active;
    for (let i = list.length - 1; i >= 0; i--) {
      const orb = list[i];
      orb.update(dt);
      if (this.touchesPad(orb)) {
        this.catchOrb(orb);
      } else if (orb.y > config.floorY) {
        if (orb.kind !== 'bomb') score.loseLife();
        spawner.release(orb);
      }
    }

    this.applyShake(dt);

    if (score.dead) {
      score.finish();
    }
  }
}
