import { Container, Graphics, Text } from 'pixi.js';
import { config } from '../config';
import type { GameContext } from '../core/context';
import type { State } from '../core/StateMachine';
import { Button } from '../ui/Button';
import { createPanel } from '../ui/panel';
import { styles } from '../ui/styles';

export class GameOverState implements State {
  private root = new Container();
  private scoreText = new Text('0', styles.bigNumber);
  private bestText = new Text('', styles.subtitle);
  private flag = new Text('new best run', styles.flag);

  constructor(private ctx: GameContext) {
    const cx = config.width / 2;
    const cy = config.height / 2;

    const dim = new Graphics();
    dim.beginFill(0x05060f, 0.6).drawRect(0, 0, config.width, config.height).endFill();

    const panel = createPanel(480, 360);
    panel.position.set(cx, cy);

    const heading = new Text('run over', styles.heading);
    heading.anchor.set(0.5);
    heading.position.set(cx, cy - 126);

    this.scoreText.anchor.set(0.5);
    this.scoreText.position.set(cx, cy - 46);
    this.bestText.anchor.set(0.5);
    this.bestText.position.set(cx, cy + 14);
    this.flag.anchor.set(0.5);
    this.flag.position.set(cx, cy + 50);

    const again = new Button('play again', () => ctx.machine.change('play'));
    again.position.set(cx, cy + 118);

    this.root.addChild(dim, panel, heading, this.scoreText, this.bestText, this.flag, again);
  }

  enter(): void {
    const { score, ui } = this.ctx;
  }
}
