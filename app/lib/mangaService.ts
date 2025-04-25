// lib/getManga.ts
import { Manga } from "@/app/types/Manga";
import { getMangaFromCache, setMangaInCache } from "./cache";

const MANGA_CACHE_KEY = "all_manga_data";

export async function getManga(): Promise<Manga[]> {
  const cached = getMangaFromCache(MANGA_CACHE_KEY);
  if (cached) return cached;

  const response = await fetch(
    "https://asia-southeast2-mynovel01.cloudfunctions.net/product/FETCH-PRODUCTS-SEARCH",
    {
      method: "POST",
    }
  );

  if (!response.ok) {
    throw new Error("ไม่สามารถโหลดข้อมูลมังงะได้");
  }

  const data: Manga[] = await response.json();

  const sorted = data.sort((a, b) => b.ProductView - a.ProductView);

  setMangaInCache(MANGA_CACHE_KEY, sorted);
  return sorted;
}
