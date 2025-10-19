import { Translation } from "./translation";

export class Category {
    id: string = '';
    translations: Translation[] = [];

    constructor(id: string = '', translations: Translation[] = []) {
        this.id = id;
        this.translations = translations;
    }
}