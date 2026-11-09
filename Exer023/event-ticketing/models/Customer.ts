import { GenerateCustomId } from "../common/generateId";

export class Customer{
    
    private __id: string;
    private __name: string;
    private __isStudent: boolean;
    private __createdAt: string;

    constructor(name: string, isStudent: boolean){

        this.__id = GenerateCustomId(Customer);
        this.__name = name;
        this.__isStudent = isStudent;
        this.__createdAt = new Date().toISOString();
    }

    toString(): string{
        return `ID: ${this.__id} | Name: ${this.__name} | isStudent: ${this.__isStudent} | CreatedAt: ${this.__createdAt}`;
    }

    getId(): string{
        return this.__id;
    }

    getName(): string{
        return this.__name;
    }

    getIsStudent(): boolean{
        return this.__isStudent;
    }

    getCreatedAt(): string{
        return this.__createdAt;
    }
}