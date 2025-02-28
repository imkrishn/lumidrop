import { Container, Graphics, Text } from 'pixi.js';
import { styles } from './styles';

export class Button extends Container {
  private bg = new Graphics();
  private label: Text;

  constructor(text: string, onClick: () => void, private w = 260, private h = 66) {
    super();
    this.label = new Text(text, styles.button.clone());
    this.label.anchor.set(0.5);
  }
}
