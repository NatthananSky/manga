// lib/fetchManga.ts
import * as cheerio from "cheerio"
import { getMangaFromCache, setMangaInCache } from './cache';

export async function fetchNextData(url: string) {
  const cached = getMangaFromCache(url);
  if (cached) return cached;

  const res = await fetch(url)
  const html = await res.text()
  const $ = cheerio.load(html)

  const scriptTag = $('#__NEXT_DATA__')
  if (!scriptTag) throw new Error("ไม่พบ __NEXT_DATA__")

  const rawJson = scriptTag.html()
  if (!rawJson) throw new Error("Script tag ว่างเปล่า")

  const data = JSON.parse(rawJson)
  setMangaInCache(url, data);
  return data
}

export async function fetchImageChapter(chapterId: string) {
  const response = await fetch(
    "https://asia-southeast2-mynovel01.cloudfunctions.net/productEP/getProductEpById",
    {
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        id: chapterId,
        fontCustom: "Sarabun",
        appKey: "xdde8cNN5k7AuVTMgz7b",
      }),
      method: "POST",
    }
  );
  const data = await response.json();
  return data;
}