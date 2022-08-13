export class Category{
    id: number = 0;
    name: string = "";

    constructor(values: object = {}) {
        Object.assign(this, values);
    }
}