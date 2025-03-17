import { Container, Text } from 'pixi.js';
import { config } from '../config';
import type { GameContext } from '../core/context';
import type { State } from '../core/StateMachine';
import { styles } from '../ui/styles';

export class GameOverState implements State {
  private root = new Container();
  private scoreText = new Text('0', styles.bigNumber);
  private bestText = new Text('', styles.subtitle);
  private flag = new Text('new best run', styles.flag);

  constructor(private ctx: GameContext) {
    const cx = config.width / 2;
  }
}
