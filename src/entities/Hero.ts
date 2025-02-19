import { Container, Graphics } from 'pixi.js';
import { Spine } from 'pixi-spine';
import type { ISkeletonData } from 'pixi-spine';
import { config } from '../config';
import { clamp } from '../utils/math';

type Pose = 'idle' | 'move';

export class Hero extends Container {
  readonly halfWidth = 46;
  private spine: Spine | null = null;
  private doll: Graphics | null = null;
  private pose: Pose | null = null;
  private facing = 1;
  private clock = 0;

  constructor(skeleton: ISkeletonData | null) {
    super();
    if (skeleton) {
      this.spine = new Spine(skeleton);
      this.spine.scale.set(config.hero.spineScale);
      this.addChild(this.spine);
    } else {
      this.doll = this.drawDoll();
      this.addChild(this.doll);
    }
    this.reset();
  }

  // the y where falling orbs get caught
  get padY(): number {
    return this.y - config.hero.padHeight;
  }

  reset(): void {
    this.x = config.width / 2;
    this.y = config.hero.y;
    this.facing = 1;
    this.setPose('idle');
  }

  update(dt: number, dir: number): void {
    this.clock += dt;
    if (dir !== 0) this.facing = dir;

    const limit = this.halfWidth + 10;
    this.x = clamp(this.x + dir * config.hero.speed * dt, limit, config.width - limit);
    this.setPose(dir === 0 ? 'idle' : 'move');
    this.bobDoll();

    const view = this.spine ?? this.doll;
    if (view) view.scale.x = Math.abs(view.scale.x) * this.facing;
  }

  private setPose(pose: Pose): void {
    if (pose === this.pose) return;
    this.pose = pose;
    if (!this.spine) return;
    const name = config.anim[pose];
    if (this.spine.skeleton.data.findAnimation(name)) {
      this.spine.state.setAnimation(0, name, true);
    }
  }

  private bobDoll(): void {
    if (!this.doll) return;
    const rate = this.pose === 'move' ? 14 : 5;
    const wave = Math.sin(this.clock * rate);
    this.doll.y = wave * (this.pose === 'move' ? 3 : 2);
    this.doll.scale.y = 1 + wave * 0.02;
  }

  private drawDoll(): Graphics {
    const g = new Graphics();
    g.beginFill(0x7df9ff, 0.12).drawEllipse(0, -84, 76, 24).endFill();

    g.lineStyle(2, 0x7df9ff, 0.9).beginFill(0x1b2140);
    g.drawRoundedRect(-22, -24, 14, 24, 5);
    g.drawRoundedRect(8, -24, 14, 24, 5);
    g.drawRoundedRect(-28, -70, 56, 50, 14);
    g.endFill();

    g.lineStyle(0).beginFill(0x7df9ff).drawRoundedRect(-18, -58, 36, 14, 7).endFill();
  }
}
