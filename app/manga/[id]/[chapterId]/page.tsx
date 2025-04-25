// app/manga/[id]/[chapterId]/page.tsx
import { fetchNextData, fetchImageChapter } from "@/app/lib/fetchManga";
import DisplayChapter from "@/app/components/manga/DisplayChapter";
import ChapterControls from "@/app/components/manga/ChapterControls";
import { MangaDetail } from "@/app/types/MangaDetail";

interface PageProps {
  params: {
    id: string;
    chapterId: string;
  };
}

export default async function ChapterPage({ params }: PageProps) {
  const { id: mangaId, chapterId } = params;

  // fetch รายละเอียดมังงะ + ตอน
  const manga = await fetchNextData(`https://mynovel.co/BookPreview?Pid=${mangaId}`);
  const mangaDetail: MangaDetail =
    JSON.parse(manga.props?.pageProps?.product_detail_json) || [];

  const chapterData = await fetchImageChapter(chapterId);

  return (
    <div className="min-h-screen bg-[#111] text-white px-4 py-6">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* ปุ่มควบคุมตอน */}
        <ChapterControls
          mangaId={mangaId}
          chapterId={chapterId}
          chapters={mangaDetail.EpTopic}
        />

        {/* ภาพเนื้อหาตอน */}
        <DisplayChapter data={chapterData.exc} />
        
        {/* ปุ่มควบคุมตอน */}
        <ChapterControls
          mangaId={mangaId}
          chapterId={chapterId}
          chapters={mangaDetail.EpTopic}
        />
      </div>
    </div>
  );
}
