import { assert } from "../assert";

export class MapWithDefault<K, V> extends Map<K, V> {
  readonly #defaultValueFactory: () => V;

  constructor(defaultValueFactory: () => V) {
    super();
    this.#defaultValueFactory = defaultValueFactory;
  }

  override get(key: K): V {
    if (!this.has(key)) {
      this.set(key, this.#defaultValueFactory());
    }
    const value = super.get(key);
    assert(value, "value should be defined");
    return value;
  }
}


