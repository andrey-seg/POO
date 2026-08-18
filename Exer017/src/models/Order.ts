import { OrderStatus } from "../enums/OrderStatus.js";
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

    calculateTotal(): number{
      this.__items.reduce((sum, item) => {
        return sum + item.subtotal();
      }, 0);
    };

    advanceStatus(): void{
        const orderStatus = [
            OrderStatus.PENDING,
            OrderStatus.PREPARING,
            OrderStatus.SHIPPED,
            OrderStatus.DELIVERED
        ];

        if(this.__status === OrderStatus.CANCELLED){
            throw new Error(`Order cancelled.`);
        };

        const curretOrderIndex = orderStatus.indexOf(this.__status);

        if(curretOrderIndex === -1){
            throw new Error(`Invalid status`);
        };

        if(curretOrderIndex === orderStatus.length -1){
            throw new Error(`Order alredy delivered`);
        };

        this.__status = orderStatus[curretOrderIndex + 1]!;
    }

    cancel(): void{
        if(this.__status === OrderStatus.CANCELLED){
            throw new Error(`Order alredy cancel`);
        };

        if(this.__status === OrderStatus.DELIVERED){
            throw new Error(`Order alredy delivered`);
        };

        this.__status = OrderStatus.CANCELLED;
    };

    toString(): string{
        return `ID => ${this.__id} | CustumerID => ${this.__custumerId} | Items => ${this.__items} | Status => ${this.__status} | CreatedAt => ${this.__createdAt}`;
    };

    getID(): string{
        return this.__id;
    };

    getCustumerID(): string{
        return this.__custumerId;
    };

    getItems(): OrderItem[]{
        return this.__items;
    };

    getStatus(): OrderStatus{
        return this.__status;
    };

    getCreateAt(): string{
        return this.__createdAt;
    };
};