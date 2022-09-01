import { User } from "./user";

export interface Income {
    id?: number,
    name: string,
    amount: number,
    date: Date,
    userDTO: User
}