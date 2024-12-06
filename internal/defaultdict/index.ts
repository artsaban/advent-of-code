export default class DefaultDict<K, V> extends Map<K, V> {
  constructor(private readonly defaultValue: () => V) {
    super();
  }

  override get(key: K): V {
    if (!this.has(key)) {
      this.set(key, this.defaultValue());
    }
    return super.get(key)!;
  }
}
