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

  setBest(best: number): void {
    this.bestText.text = `best ${best}`;
  }

  private drawHearts(lives: number): void {
    const g = this.hearts;
    g.clear();
    for (let i = 0; i < config.lives; i++) {
      const x = config.width - 40 - i * 38;
      const on = i < lives;
      g.beginFill(on ? 0xff4d6d : 0x2a2f55);
      g.drawCircle(x - 6, 26, 8).drawCircle(x + 6, 26, 8);
      g.drawPolygon([x - 13.5, 29, x + 13.5, 29, x, 45]);
      g.endFill();
    }
  }
}
