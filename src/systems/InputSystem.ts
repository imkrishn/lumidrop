import { config } from '../config';

const LEFT = ['ArrowLeft', 'KeyA'];
const RIGHT = ['ArrowRight', 'KeyD'];
const CONFIRM = ['Enter', 'Space'];

export class InputSystem {
  onConfirm: (() => void) | null = null;
  private held = new Set<string>();
  private pointerX: number | null = null;

  constructor(private view: HTMLCanvasElement) {
    window.addEventListener('keydown', this.handleDown);
    window.addEventListener('keyup', (e) => this.held.delete(e.code));
    window.addEventListener('blur', () => this.held.clear());

    view.addEventListener('pointerdown', (e) => this.track(e));
    view.addEventListener('pointermove', (e) => {
      if (this.pointerX !== null) this.track(e);
    });
    const release = () => {
      this.pointerX = null;
    };
    view.addEventListener('pointerup', release);
    view.addEventListener('pointerleave', release);
    view.addEventListener('pointercancel', release);
  }

  direction(heroX: number): number {
    const keys = this.pressed(RIGHT) - this.pressed(LEFT);
    if (keys !== 0) return keys;
    if (this.pointerX === null) return 0;
    const diff = this.pointerX - heroX;
    return Math.abs(diff) < 10 ? 0 : Math.sign(diff);
  }

  private pressed(codes: string[]): number {
    return codes.some((c) => this.held.has(c)) ? 1 : 0;
  }

  private track(e: PointerEvent): void {
    const rect = this.view.getBoundingClientRect();
    this.pointerX = ((e.clientX - rect.left) / rect.width) * config.width;
  }

  private handleDown = (e: KeyboardEvent): void => {
    if ([...LEFT, ...RIGHT, ...CONFIRM].includes(e.code)) e.preventDefault();
    if (e.repeat) return;
    this.held.add(e.code);
    if (CONFIRM.includes(e.code)) this.onConfirm?.();
  };
}
