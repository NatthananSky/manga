import Image from 'next/image';
import Link from 'next/link';
import "./MangaCard.css";
import { BookOpenText, Eye } from 'lucide-react';

type MangaCardProps = {
  id: string;
  title: string;
  group: string;
  type: string;
  views: number;
  epCount: number;
  imageUrl: string;
};

export default function MangaCard({ id, title, views, type, group, epCount, imageUrl }: MangaCardProps) {
  return (
    <Link href={`./manga/${id}`} className="card">
      <Image
        src={imageUrl}
        alt={title}
        width={150}
        height={250}
        className="rounded mb-2 object-cover image" 
      />
      <div className='details'>
        <h1 className="title">{title}</h1>
        <div className="type">{type},{group}</div>
        <div className='bottom'>
            <div className="ep"><BookOpenText size={14}/>{epCount}</div>
            <div className="views">{views.toLocaleString()} <Eye size={14}/></div>
        </div>
      </div>
    </Link>
  );
}
