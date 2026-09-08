import { User } from "./User";
import { CartItem } from "./CartItem"
import { OrderStatus } from "../enums/OrderStatus";
export class Order{
    
    private __id: string;
    private __userId: User;
    private __items: CartItem[];
    private __total: number;
    private __status: OrderStatus;
    private __createdAt: string;

    constructor(id: string, userId: User, total: number, status: OrderStatus){

        this.__id = id;
        this.__userId = userId;
        this.__items = [];
        this.__total = total;
        this.__status = status;
        this.__createdAt = new Date().toISOString();
    }

    advanceStatus(): void{

        const orderStatus = [
            OrderStatus.PENDING,
            OrderStatus.CONFIRMED,
            OrderStatus.SHIPPED,
            OrderStatus.DELIVERED
        ]

        if(this.__status === OrderStatus.CANCELLED){
            throw new Error(`Order is cancelled.`);
        }

        const currentIndex = orderStatus.indexOf(this.__status);

        if(currentIndex === -1){
            throw new Error(`Order alredy delivered.`);
        }

        this.__status = orderStatus[currentIndex + 1];
    }
}