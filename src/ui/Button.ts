import { Container, Graphics, Text } from 'pixi.js';

export class Button extends Container {
  private bg = new Graphics();
  private label: Text;

  constructor(text: string, onClick: () => void, private w = 260, private h = 66) {
  }
}
