import { Translations } from "./translation";

export interface Category {
    id: string;
    translations: Translations;

    displayName?: string;
}