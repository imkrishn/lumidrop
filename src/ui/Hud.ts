import { Container, Graphics, Text } from 'pixi.js';
import { config } from '../config';
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
    this.comboText.anchor.set(0.5, 0);
    this.comboText.position.set(config.width / 2, 20);
    this.addChild(this.scoreText, this.bestText, this.comboText, this.hearts);

    bus.on('scoreChanged', (n) => {
      this.scoreText.text = String(n).padStart(6, '0');
    });
    bus.on('livesChanged', (n) => this.drawHearts(n));
    bus.on('comboChanged', (n) => {
      this.comboText.text = n > 1 ? `x${n}` : '';
    });
  }
}
