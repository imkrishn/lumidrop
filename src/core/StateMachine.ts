export interface State {
  enter(): void;
  exit(): void;
  update(dt: number): void;
}
