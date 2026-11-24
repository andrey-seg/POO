import { Ticket } from "../models/Ticket";
import { IRespository } from "../interfaces/IRepository";

export class TicketRepository implements IRespository<Ticket>{

    private __ticketRepository: Ticket[] = [];

    findAll(): Promise<Ticket[]> {
        
        return new Promise((resolve) => {

            resolve(this.__ticketRepository);
            return;
        });
    }

    findById(id: string): Promise<Ticket | null> {
        
        return new Promise((resolve) => {

            const findById = this.__ticketRepository.find((t) => t.getId() === id);

            if(!findById){
                resolve(null);
                return;
            }

            resolve(findById);
            return;
        });
    }

    save(entity: Ticket): Promise<Ticket> {
        
        return new Promise((resolve) => {

            const findById = this.__ticketRepository.find((t) => t.getId() === entity.getId());

            if(findById){
                throw new Error(`Ticket is alredy on repository`);
            }

            this.__ticketRepository.push(entity);
            resolve(entity);
            return;
        });
    }

    delete(id: string): Promise<boolean> {
        
        return new Promise((resolve) => {

            const findIndexById = this.__ticketRepository.findIndex((t) => t.getId() === id);

            if(findIndexById === -1){
                resolve(false);
                return;
            }

            this.__ticketRepository.splice(findIndexById);
            resolve(true);
            return;
        })
    }

    findByCustumer(custumerId: string): Promise<Ticket | null>{

        return new Promise((resolve) => {
           
            const findCustumerById = this.__ticketRepository.find((t) => t.getCustumer().getId() === custumerId);

            if(!findCustumerById){
                resolve(null);
                return;
            }

            resolve(findCustumerById);
            return;
        });
    }

    findByEvent(eventId: string): Promise<Ticket | null>{

        return new Promise((resolve) => {

            const findEventById = this.__ticketRepository.find((t) => t.getEvent().getId() === eventId);

            if(!findEventById){
                resolve(null);
                return;
            }

            resolve(findEventById);
            return;
        });
    }
}