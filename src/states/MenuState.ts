import { Container, Text } from 'pixi.js';
import { config } from '../config';
import type { GameContext } from '../core/context';
import type { State } from '../core/StateMachine';
import { Button } from '../ui/Button';
import { styles } from '../ui/styles';

export class MenuState implements State {
  private root = new Container();
  private title = new Text('glowfall', styles.title);
  private bestText = new Text('', styles.subtitle);
  private clock = 0;

  constructor(private ctx: GameContext) {
    const cx = config.width / 2;
    this.title.anchor.set(0.5);
    this.title.position.set(cx, 150);

    const tagline = new Text('catch the light, dodge the bombs', styles.subtitle);
    tagline.anchor.set(0.5);
    tagline.position.set(cx, 232);

    this.bestText.anchor.set(0.5);
    this.bestText.position.set(cx, 272);

    const play = new Button('start run', () => ctx.machine.change('play'));
    play.position.set(cx, 352);

    const hint = new Text('arrow keys or a / d to move, or drag. enter starts.', styles.hint);
  }
}
