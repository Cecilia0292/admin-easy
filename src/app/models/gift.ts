import { Category } from './category';
import { Translations } from './translation';

export interface GiftImage {
  type: number;
  data: string; // Base64
}

export interface Gift {
  id: string;
  categories: Category[];
  value: string;
  image?: GiftImage;
  translation: Translations; // { pt, en, es }
}
