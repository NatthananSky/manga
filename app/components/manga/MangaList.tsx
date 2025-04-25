'use client';

import { useState } from 'react';
import MangaCard from './MangaCard';
import { Manga } from '@/app/types/Manga';
import Button from '../common/Button';

export default function MangaList({ mangas }: { mangas: Manga[] }) {
  const [visibleCount, setVisibleCount] = useState(20);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 5); // เพิ่มครั้งละ 5
  };

  return (
    <div>
      <div className="manga">
        {mangas.slice(0, visibleCount).map((manga:Manga, index) => (
          <MangaCard
            key={index}
            id={manga.id}
            title={manga.ProductName}
            imageUrl={manga.ImageUrl}
            type={manga.ProductType}
            group={manga.ProductGroup}
            views={manga.ProductView}
            epCount={manga.EpCountPublised}
          />
        ))}
      </div>

      {visibleCount < mangas.length && (
        <div className="flex justify-center mt-4">
            <Button label="Load More" onClick={handleLoadMore}/>
        </div>
      )}
    </div>
  );
}
