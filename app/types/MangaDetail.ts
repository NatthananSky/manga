import { Chapter } from "./Chapter";

interface CreateBy {
    id: string;
    name:string;
  }

export interface MangaDetail {
    migrationDocumentId: string;
    CreateBy: CreateBy;
    EpTopic: Chapter[];
    HasEP: boolean;
    ImageUrl: string;
    ProductAuthor: string;
    ProductDetail: string;
    ProductGroup: string;
    ProductIntro?: string;
    ProductName: string;
    ProductPage?: string;
    ProductPrice: number;
    ProductPublisher: string;
    ProductRate: string;
    ProductType: string;
    ProductTypeSet: string;
    ProductView: number;
    discount: number;
    fanClubTranslate: string;
    isAccept: boolean;
    isCopyRight: boolean;
    isFanClubTranslate: boolean;
    isFinished: boolean;
    isPublish: boolean;
    onDevice: string;
    EpCount: number;
    Discount: number;
    FileUrl: string;
    id: string;
    isCopyright: string;
};