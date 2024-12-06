import { assert } from "@std/assert";

export default class DefaultDict<K, V> extends Map<K, V> {
  constructor(private readonly defaultValue: () => V) {
    super();
  }

  override get(key: K): V {
    if (!this.has(key)) {
      this.set(key, this.defaultValue());
    }
    const value = super.get(key);
    assert(value, "value should be defined");
    return value;
  }
}
