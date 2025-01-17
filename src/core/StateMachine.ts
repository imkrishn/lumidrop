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
}
