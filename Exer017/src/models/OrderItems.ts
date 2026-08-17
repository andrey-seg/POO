import type { Product } from "./Products.js";

export class OrderItem{
    private __product: Product;
    private __quantity: number;

    constructor(product: Product, quantity: number){
        this.__product = product;
        this.__quantity = quantity;
    };

    subtotal(): number{
        return this.__quantity * this.__product.getPrice();
    };

    toString(): string{
        return `Product => ${this.__product} | Quantity => ${this.__quantity}`;
    };

    getProduct(): Product{
        return this.__product;
    };

    getQuantity(): number{
        return this.__quantity;
    };
};