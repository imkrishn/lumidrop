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
  }
}
