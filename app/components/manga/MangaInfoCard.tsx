import Image from "next/image";
import "./MangaInfoCard.css";
import { MangaDetail } from "@/app/types/MangaDetail";
import { BookOpenText, Eye } from "lucide-react";

interface MangaInfoCardProps {
  mangaDetail: MangaDetail; // ต้องมี interface MangaDetail ด้วย
}

export default function MangaInfoCard({ mangaDetail }: MangaInfoCardProps) {
  return (
    <div className="border-2 border-sky-700 maincard flex-col items-center h-full lg:flex-row lg:h-[400px] md:ml-50 md:mr-50 mb-8 sm:ml-20 sm:mr-20 gap-6">
      <Image
        src={mangaDetail?.ImageUrl}
        alt={mangaDetail?.ProductName}
        width={260}
        height={500}
        className="image rounded-lg object-cover shadow"
      />
      <div
        className="flex flex-col"
        style={{ width: "-webkit-fill-available",height: "-webkit-fill-available" }}
      >
        <div>
          <h1 className="text-3xl font-bold mb-2 text-center lg:text-start">
            {mangaDetail?.ProductName}
          </h1>
          <div>
            {mangaDetail?.ProductType}, {mangaDetail?.ProductGroup}
          </div>
          <br />

        </div>
        <div className="flex flex-row justify-between mt-auto">
          <div className="flex flex-row items-center gap-2">
            <BookOpenText size={20} /> {mangaDetail?.EpCount}
          </div>
          <div className="flex flex-row items-center gap-2 justify-center">
            {mangaDetail?.ProductView.toLocaleString()} <Eye size={20} />
          </div>
        </div>
      </div>
    </div>
  );
}
