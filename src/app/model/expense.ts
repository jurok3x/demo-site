import { Category } from "./category";
import { User } from "./user";

export interface Expense{
    id?: number;
    name: string;
    price: number;
    userDTO: User;
    date: Date;
    categoryDTO: Category;
}