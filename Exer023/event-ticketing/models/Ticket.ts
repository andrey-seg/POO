import { Event } from "./Event";
import { Customer } from "./Customer";
import { TicketType } from "../enums/TicketType";
import { TicketStatus } from "../enums/TicketStatus";
import { GenerateCustomId } from "../common/generateId";

export class Ticket{

    private __id: string;
    private __event: Event;
    private __custumer: Customer;
    private __type: TicketType;
    private __price: number;
    private __status: TicketStatus;
    private __createdAt: string;

    constructor(event: Event, custumer: Customer, type: TicketType, price: number){

        this.__id = GenerateCustomId(Ticket);
        this.__event = event;
        this.__custumer = custumer;
        this.__type = type;
        this.__price = price;
        this.__status = TicketStatus.RESERVED;
        this.__createdAt = new Date().toISOString();
    }

    private calculatePrice(basePrice: number, type: TicketType): number{
        const multipliers: Record<TicketType, number> = {
            [TicketType.STANDARD]: 1,
            [TicketType.VIP]: 2,
            [TicketType.STUDENT]: 0.5
        };

        return basePrice * multipliers[type];
    }

    pay(): boolean{

        if(this.__status !== TicketStatus.RESERVED){
            throw new Error(`Ticket is not reserved`)
        }

        this.__status = TicketStatus.PAID;
        return true;
    }

    cancel(): boolean{

        if(this.__status === TicketStatus.CANCELLED || this.__status === TicketStatus.USED){
            throw new Error(`Ticket is alredy used or cancelled`);
        }

        this.__status = TicketStatus.CANCELLED;
        return true;
    }

    use(): boolean{

        if(this.__status !== TicketStatus.PAID){
            throw new Error(`Only paid tickets can be used`);
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