import "server-only";

interface Entry<V> {
  value: V;
  expiresAt: number;
}

/**
 * Small in-memory LRU + TTL cache. Recency rides on Map's insertion-order
 * iteration: re-inserting a key on get/set moves it to the most-recently-used
 * end, so overflow can evict the first key `keys()` yields.
 *
 * It is per-process only. That still absorbs the bulk of duplicate traffic —
 * the same link submitted twice, a refresh, a link making the rounds among
 * friends while one serverless container stays warm. Cross-instance accuracy
 * would need Redis; we skip that infrastructure until traffic justifies it.
 */
export class LruTtlCache<V> {
  private store = new Map<string, Entry<V>>();

  constructor(
    private readonly max: number,
    private readonly ttlMs: number,
  ) {}

  get(key: string): V | undefined {
    const entry = this.store.get(key);
    if (!entry) return undefined;
    if (entry.expiresAt < Date.now()) {
      this.store.delete(key);
      return undefined;
    }
    // Re-insert so this key counts as most-recently-used.
    this.store.delete(key);
    this.store.set(key, entry);
    return entry.value;
  }

  set(key: string, value: V): void {
    if (this.store.has(key)) this.store.delete(key);
    this.store.set(key, { value, expiresAt: Date.now() + this.ttlMs });
    if (this.store.size > this.max) {
      const oldest = this.store.keys().next().value;
      if (oldest !== undefined) this.store.delete(oldest);
    }
  }
}

/**
 * Hang the singleton off globalThis so dev HMR — which re-imports modules on
 * every save — keeps handing back the same warm cache instead of rebuilding an
 * empty one. Production gets the same benefit across a container's lifetime.
 */
export function getOrCreateCache<V>(
  globalKey: string,
  factory: () => LruTtlCache<V>,
): LruTtlCache<V> {
  const g = globalThis as unknown as Record<string, LruTtlCache<V> | undefined>;
  const existing = g[globalKey];
  if (existing) return existing;
  const created = factory();
  g[globalKey] = created;
  return created;
}
