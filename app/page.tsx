import { getManga } from "./lib/mangaService";
import { BellRing } from "lucide-react";
import MangaList from "./components/manga/MangaList";

export default async function Home() {
  const mangas = await getManga();

  return (
    <div className="p-4 bg-black text-white min-w-[300px]">
      <h1 className="text-2xl font-bold mb-4 head">
        <BellRing /> มังงะยอดนิยม
      </h1>
      <MangaList mangas={mangas} />
    </div>
  );
}
