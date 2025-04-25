"use client";

import { useRouter } from "next/navigation";
import { useMemo } from "react";

interface Chapter {
  EpId: string;
  EpName: string;
}

interface Props {
  mangaId: string;
  chapterId: string;
  chapters: Chapter[];
}

export default function ChapterControls({
  mangaId,
  chapterId,
  chapters,
}: Props) {
  const router = useRouter();

  const currentIndex = useMemo(() => {
    return chapters.findIndex((ch) => ch.EpId === chapterId);
  }, [chapterId, chapters]);

  const previousChapterId =
    currentIndex > 0 ? chapters[currentIndex - 1].EpId : null;
  const nextChapterId =
    currentIndex < chapters.length - 1 ? chapters[currentIndex + 1].EpId : null;

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2">
      <select
        className="border-2 border-sky-700 w-full sm:max-w-[280px] md:max-w-[400px] bg-gray-800 text-white px-4 py-2 rounded-4xl"
        value={chapterId}
        onChange={(e) => {
          const newChapter = e.target.value;
          router.push(`/manga/${mangaId}/${newChapter}`);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        {chapters.map((chapter) => (
          <option key={chapter.EpId} value={chapter.EpId}>
            ตอนที่ {chapter.EpName.replace("ตอนที่", "").trim()}
          </option>
        ))}
      </select>

      <div className="flex gap-2">
        <button
          disabled={!previousChapterId}
          onClick={() => {
            router.push(`/manga/${mangaId}/${previousChapterId}`);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-4xl disabled:opacity-50"
        >
          ย้อนกลับ
        </button>

        <button
          onClick={() => {
            router.push(`/manga/${mangaId}`);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-4xl disabled:opacity-50"
        >
          หน้าหลัก
        </button>

        <button
          disabled={!nextChapterId}
          onClick={() => {
            router.push(`/manga/${mangaId}/${nextChapterId}`);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-4xl disabled:opacity-50"
        >
          ตอนถัดไป
        </button>
      </div>
    </div>
  );
}
