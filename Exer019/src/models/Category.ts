import { CategoryType } from "../enums/CategoryType";

export class Category{

    private __id: string;
    private __name: string;
    private __type: CategoryType;

    constructor(id: string, name: string, type: CategoryType){

        this.__id = id;
        this.__name = name;
        this.__type = type;
    }

    toString(): string{
        return `Id => ${this.__id} | Name => ${this.__name} | Type => ${this.__type}`;
    }

    getId(): string{
        return this.__id;
    }

    getName(): string{
        return this.__name;
    }

    getType(): CategoryType{
        return this.__type;
    }
}