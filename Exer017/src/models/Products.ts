export class Product{
    private __id: string;
    private __name: string;
    private __price: number;
    private __stock: number;

    constructor(id: string, name: string, price: number, stock: number){
        this.__id = id;
        this.__name = name;
        this.__price = price;
        this.__stock = stock;
    };

    decreaseStock(quantity: number): number{
        return this.__stock -= quantity;
    };

    isAvailable(quantity: number): boolean{
        if(this.__stock > quantity || this.__stock === 0){
            throw new Error(`Quantity unavailable`);
        };

        return true;
    };

    toString(): string{
        return `ID => ${this.__id} | Name => ${this.__name} | Price => ${this.__price} | Stock => ${this.__stock}`;
    };

    getID(): string{
        return this.__id;
    };

    getName(): string{
        return this.__name;
    };

    getPrice(): number{
        return this.__price;
    };

    getStock(): number{
        return this.__stock;
    };

}