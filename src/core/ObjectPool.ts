export class ObjectPool<T> {
  private free: T[] = [];

  constructor(
    private create: () => T,
    private reset: (item: T) => void,
    prewarm = 0
  ) {
    for (let i = 0; i < prewarm; i++) this.free.push(create());
  }

  acquire(): T {
    return this.free.pop() ?? this.create();
  }

  release(item: T): void {
    this.reset(item);
  }
}
