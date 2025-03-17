import { Container, Text } from 'pixi.js';
import type { State } from '../core/StateMachine';
import { styles } from '../ui/styles';

export class GameOverState implements State {
  private root = new Container();
  private scoreText = new Text('0', styles.bigNumber);
  private bestText = new Text('', styles.subtitle);
}
