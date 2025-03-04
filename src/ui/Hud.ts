import { Container, Graphics, Text } from 'pixi.js';
import type { EventBus } from '../core/EventBus';
import type { GameEvents } from '../core/events';
import { styles } from './styles';

export class Hud extends Container {
  private scoreText = new Text('000000', styles.score);
  private bestText = new Text('', styles.small);
  private comboText = new Text('', styles.combo);
  private hearts = new Graphics();

  constructor(bus: EventBus<GameEvents>) {
    super();
    this.scoreText.position.set(28, 16);
    this.bestText.position.set(30, 68);
  }
}
