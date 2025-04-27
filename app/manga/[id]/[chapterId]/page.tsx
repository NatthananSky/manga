// app/manga/[id]/[chapterId]/page.tsx
import { fetchNextData, fetchImageChapter } from "@/app/lib/fetchManga";
import DisplayChapter from "@/app/components/manga/DisplayChapter";
import ChapterControls from "@/app/components/manga/ChapterControls";
import { MangaDetail } from "@/app/types/MangaDetail";

export default async function ChapterPage({ params, }: { params: Promise<{ id: string; chapterId: string }>}) {
  const { id: mangaId, chapterId } = await params;

  const manga = await fetchNextData(
    `https://mynovel.co/BookPreview?Pid=${mangaId}`
  );
  const mangaDetail: MangaDetail =
    JSON.parse(manga.props?.pageProps?.product_detail_json) || [];

  const chapterData = await fetchImageChapter(chapterId);

  return (
    <div className="min-h-screen bg-[#111] text-white px-4 py-6 ">
      <div className="max-w-3xl mx-auto space-y-6">
        <ChapterControls
          mangaId={mangaId}
          chapterId={chapterId}
          chapters={mangaDetail.EpTopic}
        />
        <DisplayChapter data={chapterData.exc} />
        <ChapterControls
          mangaId={mangaId}
          chapterId={chapterId}
          chapters={mangaDetail.EpTopic}
        />
      </div>
    </div>
  );
}
