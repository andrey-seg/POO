import { Product } from "./Product";
import { generateCustomId } from "../common/idGenerator";

export class CartItem{
    
    private __id: string;
    private __product: Product;
    private __quantity: number;

    constructor(product: Product, quantity: number){

        this.__id = generateCustomId();
        this.__product = product;
        this.__quantity = quantity;
    }

    subTotal(): number{
        return this.__product.getPrice() * this.__quantity;
    }

    increaseQuantity(quantity: number): number{
        return this.__quantity += quantity;
    }

    decreaseQuantity(quantity: number): number{
        return this.__quantity -= quantity;
    }

    toString(): string{
        return `Id => ${this.__id} | Product => ${this.__product} | Quantity => ${this.__quantity}`;
    }

    getId(): string{
        return this.__id;
    }

    getProduct(): Product{
        return this.__product;
    }

    getQuantity(): number{
        return this.__quantity;
    }

    setQuantity(quantity: number): void {
        this.__quantity = quantity;
    }
}