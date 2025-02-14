import { Container, Graphics } from 'pixi.js';
import { Spine } from 'pixi-spine';

type Pose = 'idle' | 'move';

export class Hero extends Container {
  readonly halfWidth = 46;
  private spine: Spine | null = null;
  private doll: Graphics | null = null;
  private pose: Pose | null = null;
  private facing = 1;
}
