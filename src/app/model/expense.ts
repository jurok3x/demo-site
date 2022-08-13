import { Category } from "./category";
import { User } from "./user";

export class Expense{
    id: number = 0;
    name: string = "";
    price: number = 0;
    user: User | undefined;
    date: Date = new Date();
    categoryDTO: Category | undefined;

    constructor(values: object = {}) {
        Object.assign(this, values);
    }
}