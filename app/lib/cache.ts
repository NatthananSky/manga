// lib/cache.ts
const mangaCache = new Map<string, any>();

export function getMangaFromCache<T = any>(id: string): T | undefined {
  return mangaCache.get(id);
}

export function setMangaInCache<T = any>(id: string, data: T) {
  mangaCache.set(id, data);
}
