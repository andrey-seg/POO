import { ProductStatus } from "../enums/ProductStatus";
import { generateCustomId } from "../common/idGenerator"

export class Product{
    
    private __id: string;
    private __name: string;
    private __price: number;
    private __stock: number;
    private __status: ProductStatus;

    constructor(name: string, price: number, stock: number, status: ProductStatus){

        this.__id = generateCustomId();
        this.__name = name;
        this.__price = price;
        this.__stock = stock;
        this.__status = status;
    }

    deacreseStock(quantity: number): number{

        if(this.__stock < quantity){
            throw new Error(`Stock on product is 0`);
        }

        return this.__stock -= quantity;
    }

    increaseStock(quantity: number): number{
        return this.__stock += quantity;
    }

    isAvailable(quantity: number): boolean{
        return this.__stock >= quantity;
    }

    activate(): boolean{

        if(this.__status === ProductStatus.OUT_OF_STOCK){
            throw new Error(`Product out of stock`);
        }
        
        if(this.__status === ProductStatus.ACTIVE){
            throw new Error(`Status is alredy active`);
        }

        this.__status = ProductStatus.ACTIVE;
        return true;
    }

    deactivate(): boolean{

        if(this.__status === ProductStatus.OUT_OF_STOCK){
            throw new Error(`Product out of stock`);
        }

        if(this.__status === ProductStatus.INACTIVE){
            throw new Error(`Product alredy inactive`);
        }

        this.__status = ProductStatus.INACTIVE;
        return true;
    }

    marlOutOfStock(): boolean{

        if(this.__status === ProductStatus.OUT_OF_STOCK){
            throw new Error(`Product alredy out stock`);
        }

        this.__status = ProductStatus.OUT_OF_STOCK;
        return true;
    }

    toString(): string{
        return `Id => ${this.__id} | Name => ${this.__name} | Price => ${this.__price} | Stock => ${this.__stock} | Status => ${this.__status}`;
    }

    getId(): string{
        return this.__id;
    }

    getName(): string{
        return this.__name;
    }

    getPrice(): number{
        return this.__price;
    }

    getStock(): number{
        return this.__stock;
    }

    getStatus(): ProductStatus{
        return this.__status;
    }
}