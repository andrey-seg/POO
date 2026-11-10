import { GenerateCustomId } from "../common/generateId";
import { EventStatus } from "../enums/EventStatus";


export class Event{

    private __id: string;
    private __name: string;
    private __location: string;
    private __date: string;
    private __capacity: number;
    private __basePrice: number;
    private __soldTickets: number;
    private __status: EventStatus;
    private __createdAt: string;

    constructor(name: string, location: string, date: string, capacity: number, basePrice: number){
        
        this.__id = GenerateCustomId(this);
        this.__name = name;
        this.__location = location;
        this.__date = date;
        this.__capacity = capacity;
        this.__basePrice = basePrice
        this.__soldTickets = 0;
        this.__status = EventStatus.DRAFT;
        this.__createdAt = new Date().toISOString();
    }

    publish(): boolean{

        if(this.__status !== EventStatus.DRAFT){
            throw new Error(`Cannot publish event`);
        }

        this.__status = EventStatus.PUBLISHED;
        return true;
    }

    cancel(): boolean{

        if(this.__status === EventStatus.CANCELLED || this.__status === EventStatus.FINISHED){
            throw new Error(`Event is alredy cancelled or finished`);
        }

        this.__status = EventStatus.CANCELLED;
        return true;
    }

    finish(): boolean{

        if(this.__status === EventStatus.FINISHED || this.__status === EventStatus.CANCELLED){
            throw new Error(`Event is alredy canceled or finished`);
        }

        this.__status = EventStatus.FINISHED;
        return true;
    }

    availableSeats(): number{

        return this.__capacity - this.__soldTickets;
    }

    reservedSeats(quantity: number): true{

        if(this.__status !== EventStatus.PUBLISHED){
            throw new Error(`Event is not available for sales.`);
        }

        if(quantity <= 0){
            throw new Error(`Quantoty must be greater than zero.`);
        }

        if(quantity > this.availableSeats()){
            throw new Error(`Not enogh seats available`);
        }

        this.__soldTickets += quantity;

        if(this.availableSeats() === 0){
            this.__status = EventStatus.SOLD_OUT;
        }
        
        return true;
    }

    releseSeats(quantity: number): boolean{

        if(quantity <= 0){
            throw new Error(`Quantity must be greater than zero`);
        }

        if(quantity > this.__soldTickets){
            throw new Error(`Cannot realease more seats than were sold`);
        }

        this.__soldTickets -= quantity;


        if(this.__status === EventStatus.SOLD_OUT){
            this.__status = EventStatus.PUBLISHED;
        }

        return true;
    }

    toString(): string{
        return `id: ${this.__id} | name: ${this.__name} | location: ${this.__location} | date: ${this.__date} | capacity: ${this.__capacity} | sold tickets ${this.__soldTickets} | status: ${this.__status} | created at: ${this.__createdAt}`;
    }

    getId(): string{
        return this.__id;
    }

    getName(): string{
        return this.__name;
    }

    getLocation(): string{
        return this.__location;
    }

    getDate(): string{
        return this.__date;
    }

    getCapacity(): number{
        return this.__capacity;
    }

    getSoldTickets(): number{
        return this.__soldTickets;
    }

    getStatus(): EventStatus{
        return this.__status;
    }

    getCreatedAt(): string{
        return this.__createdAt;
    }
}