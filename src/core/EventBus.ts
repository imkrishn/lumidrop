type Handler<T> = (payload: T) => void;

export class EventBus<E extends object> {
  private listeners: { [K in keyof E]?: Set<Handler<E[K]>> } = {};

  // returns an unsubscribe function
  on<K extends keyof E>(name: K, fn: Handler<E[K]>): () => void {
    const set = this.listeners[name] ?? new Set<Handler<E[K]>>();
    set.add(fn);
    this.listeners[name] = set;
    return () => {
      set.delete(fn);
    };
  }

  emit<K extends keyof E>(name: K, payload: E[K]): void {
    this.listeners[name]?.forEach((fn) => fn(payload));
  }
}
