import { MovimentType } from "../enums/MovementType";

export class StockMovement{
    private __id: string;
    private __productId: string;
    private __type: MovimentType;
    private __quantity: number;
    private __date: string;
    private __reason: string;
    
    constructor(id: string, productId: string, type: MovimentType, quantity: number, date: string, reason: string){
        this.__id = id;
        this.__productId = productId;
        this.__type = type;
        this.__quantity = quantity;
        this.__date = date;
        this.__reason = reason;
    };

    toString(): string{
    return `ID => ${this.__id} | product ID => ${this.__productId} | Type: ${this.__type} | Quantity: ${this.__quantity} | Date => ${this.__date} | Reason => ${this.__reason}`;
    };

    getID(){
        return this.__id;
    };

    getProductId(){
        return this.__productId;
    };

    getType(){
        return this.__type;
    };

    getQuantity(){
        return this.__quantity;
    };

    getDate(){
        return this.__date;
    };

    getReson(){
        return this.__reason;
    };
}