export interface State {
  enter(): void;
  exit(): void;
  update(dt: number): void;
  confirm?(): void;
}

export class StateMachine<K extends string> {
}
