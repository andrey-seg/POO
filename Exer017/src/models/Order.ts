import type { OrderStatus } from "../enums/OrderStatus.js";
import { OrderItem } from "./OrderItems.js";
import type { Product } from "./Products.js";

export class Order{
    private __id: string;
    private __custumerId: string;
    private __items: OrderItem[];
    private __status: OrderStatus;
    private __createdAt: string;

    constructor(id: string, custumerId: string, status: OrderStatus, createdAt: string){
        this.__id = id;
        this.__custumerId = custumerId;
        this.__items = [];
        this.__status = status;
        this.__createdAt = createdAt;
    };

    addItem(product: Product, quantity: number): string{
        const findProduct = this.__items.find(p => p.getProduct().getID() === product.getID());

        if(!findProduct){
            throw new Error(`Product not found`);
        };

        const newItem = new OrderItem(product, quantity);
        this.__items.push(newItem);
        return `Product added`;
    };

    
}