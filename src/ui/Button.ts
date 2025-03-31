import { Container, Graphics, Text } from 'pixi.js';
import { styles } from './styles';

export class Button extends Container {
  private bg = new Graphics();
  private label: Text;

  constructor(text: string, onClick: () => void, private w = 260, private h = 66) {
    super();
    this.label = new Text(text, styles.button.clone());
    this.label.anchor.set(0.5);
    this.addChild(this.bg, this.label);
    this.paint(false);

    this.eventMode = 'static';
    this.cursor = 'pointer';
    this.on('pointerover', () => this.paint(true));
    this.on('pointerout', () => this.paint(false));
    this.on('pointertap', onClick);
  }

  private paint(hover: boolean): void {
    this.bg.clear();
    this.bg.lineStyle(2, 0x7df9ff);
    this.bg.beginFill(hover ? 0x7df9ff : 0x1b2140);
    this.bg.drawRoundedRect(-this.w / 2, -this.h / 2, this.w, this.h, 18);
    this.bg.endFill();
    // flip colours on hover
    this.label.style.fill = hover ? '#0b0d1a' : '#7df9ff';
    this.scale.set(hover ? 1.05 : 1);
  }
}
