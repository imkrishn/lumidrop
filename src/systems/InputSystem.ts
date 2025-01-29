const LEFT = ['ArrowLeft', 'KeyA'];
const RIGHT = ['ArrowRight', 'KeyD'];
const CONFIRM = ['Enter', 'Space'];

export class InputSystem {
  onConfirm: (() => void) | null = null;
  private held = new Set<string>();
  private pointerX: number | null = null;

  constructor(private view: HTMLCanvasElement) {
    window.addEventListener('keydown', this.handleDown);
  }
}
