export class User{
    id?: number = 0;
    name: string = "";
    email: string = "";

    constructor(values: object = {}) {
        Object.assign(this, values);
    }
}