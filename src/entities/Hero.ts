import { Container } from 'pixi.js';
import { Spine } from 'pixi-spine';

type Pose = 'idle' | 'move';

export class Hero extends Container {
  readonly halfWidth = 46;
  private spine: Spine | null = null;
}
