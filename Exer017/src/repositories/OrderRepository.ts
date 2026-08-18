import type { Repository } from "../interfaces/Repository.js";
import type { Order } from "../models/Order.js";

export class OrderRepositories implements Repository<Order>{

    private __Orders: Order[];

    constructor(){
        this.__Orders = [];
    };

    findById(id: string): Promise<Order | null> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const orders = this.__Orders.find(o => o.getID() === id);
                resolve(orders ?? null);
            }, 100);
        });
    };

    findAll(): Promise<Order[]> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.__Orders);
            }, 100);
        });
    };

    save(object: Order): Promise<Order> {
        return new Promise((resolve) => {
            setTimeout(() => {
                this.__Orders.push(object);
                resolve(object);
                return;
            }, 100);
        });
    };

    delete(id: string): Promise<boolean> {
        return new Promise((resolve) => {

            const index = this.__Orders.findIndex(o => o.getID() === id);

            if(index === -1){
                resolve(false);
                return;
            };

            this.__Orders.splice(index, 1);
            resolve(true);
            return;
        });
    };

    findByCustumer(custumerId: string): Promise<Order[]>{
        return new Promise((resolve) => {
            setTimeout(() => {
                const orders = this.__Orders.filter(o => o.getCustumerID() === custumerId);
                resolve(orders);
            }, 100);
        });
    };

    toString(): string{
        return `Orders => ${this.__Orders}`;
    };

    getOrders(): Order[]{
        return this.__Orders;
    };
};