import { Container, Text } from 'pixi.js';
import { config } from '../config';
import type { GameContext } from '../core/context';
import type { State } from '../core/StateMachine';
import { styles } from '../ui/styles';

export class MenuState implements State {
  private root = new Container();
  private title = new Text('glowfall', styles.title);
  private bestText = new Text('', styles.subtitle);
  private clock = 0;

  constructor(private ctx: GameContext) {
    const cx = config.width / 2;
  }
}
