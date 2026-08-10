import { TransactionType } from "../enums/TransactionType";

export class Transaction{
    private __id: string;
    private __type: TransactionType;
    private __amount: number;
    private __date: string;
    private __description: string;
    
    constructor(id: string,  type: TransactionType, amount: number, date: string, description: string){
        this.__id = id;
        this.__type = type;
        this.__amount = amount;
        this.__date = date;
        this.__description = description;
    };

    toString(){
        return `ID => ${this.__id} | Type => ${this.__type} | Amount => ${this.__amount} | Date => ${this.__date} | Description => ${this.__description}`;
    };

    getId(){
        return this.__id;
    };

    getType(){
        return this.__type;
    };

    getAmount(){
        return this.__amount;
    };

    getDate(){
        return this.__date;
    };

    getDescription(){
        return this.__description;
    };
};