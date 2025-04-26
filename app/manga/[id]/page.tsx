import { fetchNextData } from "@/app/lib/fetchManga";
import { Chapter } from "@/app/types/Chapter";
import { MangaDetail } from "@/app/types/MangaDetail";
import AccordionSection from "@/app/components/manga/AccordionSection";
import MangaInfoCard from "@/app/components/manga/MangaInfoCard";
import { SwatchBook } from "lucide-react";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

type GroupedChapters = Chapter[][];

export default async function MangaPage({ params }: PageProps) {
  const { id } = await params;
  const data = await fetchNextData(`https://mynovel.co/BookPreview?Pid=${id}`);

  const mangaDetail: MangaDetail =
    JSON.parse(data.props?.pageProps?.product_detail_json) || [];
    
  const chapters: Chapter[] = mangaDetail?.EpTopic;

  
  // จัดกลุ่มตอนเป็นช่วงละ 50
  const groupedChapters = chapters.reduce((acc, chapter, index) => {
    const groupIndex = Math.floor(index / 50);
    if (!acc[groupIndex]) acc[groupIndex] = [];
    acc[groupIndex].push(chapter);
    return acc;
  }, [] as GroupedChapters);

  return (
    <div className="p-4 text-white bg-black min-h-screen">
      {/* ส่วนภาพและข้อมูลมังงะ */}
      <MangaInfoCard
        mangaDetail = {mangaDetail}
      />

      {/* ส่วนตอนต่าง ๆ */}
      <div className="sm:ml-20 sm:mr-20 md:ml-50 md:mr-50">
        <h2 className="flex flex-row items-center gap-2 text-2xl font-semibold mb-4"><SwatchBook /> ตอนทั้งหมด</h2>
        {groupedChapters.map((group: Chapter[], i: number) => (
          <AccordionSection
            key={i}
            group={group}
            mangaId={id}
            rangeStart={i * 50 + 1}
            rangeEnd={i * 50 + group.length}
          />
        ))}
      </div>
    </div>
  );
}
