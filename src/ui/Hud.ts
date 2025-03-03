import { Container, Text } from 'pixi.js';
import { styles } from './styles';

export class Hud extends Container {
  private scoreText = new Text('000000', styles.score);
  private bestText = new Text('', styles.small);
  private comboText = new Text('', styles.combo);
}
