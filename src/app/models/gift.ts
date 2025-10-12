import { Category } from './category'; // Certifique-se que o caminho está correto

export class Gift {
    id: string;
    name: string;
    description: string;
    value: string;
    category: Category;
    image: string;

    constructor(
        id: string = '',
        name: string = '',
        description: string = '',
        value: string = '',
        category: Category = new Category(),
        image: string = ''
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.value = value;
        this.category = category;
        this.image = image;
    }
}