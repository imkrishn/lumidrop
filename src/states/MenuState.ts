import { Container, Text } from 'pixi.js';
import type { State } from '../core/StateMachine';
import { styles } from '../ui/styles';

export class MenuState implements State {
  private root = new Container();
  private title = new Text('glowfall', styles.title);
  private bestText = new Text('', styles.subtitle);
}
