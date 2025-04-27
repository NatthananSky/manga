"use client";

import { useState } from "react";
import Link from "next/link";
import { Chapter } from "@/app/types/Chapter";

export default function AccordionSection({
  group,
  mangaId,
  rangeStart,
  rangeEnd,
}: {
  group: Chapter[];
  mangaId: string;
  rangeStart: number;
  rangeEnd: number;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4 border-2 border-sky-700 rounded-3xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-gray-900 hover:bg-gray-800 text-left px-4 py-2 font-medium"
      >
        ตอนที่ {rangeStart} - {rangeEnd}
      </button>
      {isOpen && (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-4 bg-gray-800">
          {group.map((chapter, index) => (
            <Link
              key={index}
              href={`/manga/${mangaId}/${chapter.EpId}`}
              className="bg-gray-700 hover:bg-gray-600 p-3 rounded-xl shadow flex flex-row justify-between"
            >
              <p className="truncate">
                ตอนที่ {chapter.EpName.replace("ตอนที่", "").replace("Chapter", "").replace("chapter", "").trim().split(" ")[0]}
              </p>
              <p className="truncate">
                {chapter.createDate &&
                  chapter.createDate
                    .split("T")[0]
                    .split("-")
                    .reverse()
                    .join("-")}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
