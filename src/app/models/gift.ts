import { Category } from './category';

export interface Gift {
    id: string;
    name: string;
    description: string;
    value: string;
    category: Category;
    image: string;
}
