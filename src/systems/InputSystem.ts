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
    }
    )
  }
}
