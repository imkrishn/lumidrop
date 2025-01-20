export interface State {
  enter(): void;
  exit(): void;
  update(dt: number): void;
  confirm?(): void;
}

export class StateMachine<K extends string> {
  private states = new Map<K, State>();
  private active: State | null = null;
  key: K | null = null;

  register(key: K, state: State): this {
    this.states.set(key, state);
    return this;
  }

  change(key: K): void {
    const next = this.states.get(key);
    if (!next) throw new Error(`unknown state: ${key}`);
    this.active?.exit();
    this.active = next;
    this.key = key;
    next.enter();
  }

  update(dt: number): void {
    this.active?.update(dt);
  }

  confirm(): void {
    this.active?.confirm?.();
  }
}
