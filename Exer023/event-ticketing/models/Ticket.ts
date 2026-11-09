import { Event } from "./Event";
import { Customer } from "./Customer";
import { TicketType } from "../enums/TicketType";
import { TicketStatus } from "../enums/TicketStatus";
import { GenerateCustomId } from "../common/generateId";
import { paymentStatus } from "../enums/PaymentStatus";

export class Ticket{

    private __id: string;
    private __event: Event;
    private __custumer: Customer;
    private __type: TicketType;
    private __price: number;
    private __status: TicketStatus;
    private __paymentStatus: paymentStatus;
    private __createdAt: string;

    constructor(event: Event, custumer: Customer, type: TicketType, price: number){

        this.__id = GenerateCustomId(Ticket);
        this.__event = event;
        this.__custumer = custumer;
        this.__type = type;
        this.__price = price;
        this.__status = TicketStatus.RESERVED;
        this.__paymentStatus = paymentStatus.PENDING_PAYMENT;
        this.__createdAt = new Date().toISOString();
    }

    pay(): boolean{

        if(this.__status !== TicketStatus.RESERVED){
            throw new Error(`Ticket is not `)
        }

        if(this.__paymentStatus === paymentStatus.PAYED){
            throw new Error(`Ticket is alredy payed.`);
        }

        this.__price - this.__price;
        return true;
    }

    cancel(): boolean{

        if(this.__status === TicketStatus.CANCELLED || this.__status === TicketStatus.USED){
            throw new Error(`Ticket is alredy used | cancelled`);
        }

        this.__status = TicketStatus.CANCELLED;
        return true;
    }

    use(): boolean{

        if(this.__status === TicketStatus.CANCELLED || this.__status === TicketStatus.USED){
            throw new Error(`Ticket is alredy used | cancelled`);
        }

        if(this.__paymentStatus === paymentStatus.PENDING_PAYMENT){
            throw new Error(`Ticket payment is pending`);
        }

        this.__status = TicketStatus.USED;
        return true;
    }

    toString(): string{
        return `id: ${this.__id} | event: ${this.__event} | custumer ${this.__custumer} | type ${this.__type} | price ${this.__price} | status: ${this.__status} | createdAt: ${this.__createdAt}`;
    }

    getId(): string{
        return this.__id;
    }

    getEvent(): Event{
        return this.__event;
    }

    getCustumer(): Customer{
        return this.__custumer;
    }

    getType(): TicketType{
        return this.__type;
    }

    getPrice(): number{
        return this.__price;
    }

    getCreatedAt(): string{
        return this.__createdAt;
    }
}