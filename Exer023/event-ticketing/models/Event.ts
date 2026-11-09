import { GenerateCustomId } from "../common/generateId";
import { EventStatus } from "../enums/EventStatus";


export class Event{

    private __id: string;
    private __name: string;
    private __location: string;
    private __date: string;
    private __capacity: number;
    private __basePrice: number;
    private __totalSeats: number;
    private __soldTickets: number;
    private __status: EventStatus;
    private __createdAt: string;

    constructor(name: string, location: string, date: string, capacity: number, basePrice: number, totalSeats: number){
        
        this.__id = GenerateCustomId(Event);
        this.__name = name;
        this.__location = location;
        this.__date = date;
        this.__capacity = capacity;
        this.__basePrice = basePrice
        this.__totalSeats = totalSeats;
        this.__soldTickets = 0;
        this.__status = EventStatus.DRAFT;
        this.__createdAt = new Date().toISOString();
    }

    publish(): boolean{

        if(this.__status !== EventStatus.DRAFT){
            throw new Error(`Cannot publish event`);
        }

        return true;
    }

    cancel(): boolean{

        if(this.__status === EventStatus.CANCELLED || this.__status === EventStatus.FINISHED){
            throw new Error(`Event is alredy cancelled or finished`);
        }

        return true;
    }

    finish(): boolean{

        if(this.__status === EventStatus.FINISHED || this.__status === EventStatus.CANCELLED){
            throw new Error(`Event is alredy canceled or finished`);
        }

        return true;
    }

    availableSeats(): number{

        return (this.__totalSeats - this.__soldTickets);
    }

    reservedSeats(quantity: number): number{
        
    }
}