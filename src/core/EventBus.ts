type Handler<T> = (payload: T) => void;

export class EventBus<E extends object> {
  private listeners: { [K in keyof E]?: Set<Handler<E[K]>> } = {};

  on<K extends keyof E>(name: K, fn: Handler<E[K]>): () => void {
  }
}
