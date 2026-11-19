import { Event } from "../models/Event";
import { IRespository } from "../interfaces/IRepository";
import { EventStatus } from "../enums/EventStatus";

export class EventRepository implements IRespository<Event>{

    private __eventRepository: Event[] = [];

    findAll(): Promise<Event[]> {
        
        return new Promise((resolve) => {

            resolve(this.__eventRepository);
            return;
        });
    }

    findById(id: string): Promise<Event | null> {
        
        return new Promise((resolve) => {

            const findById = this.__eventRepository.find((e) => e.getId() === id);

            if(!findById){
                resolve(null);
                return `Cannot find event by id`;
            }

            resolve(findById);
            return;
        });
    }

    save(entity: Event): Promise<Event> {
        
        return new Promise((resolve) => {

            const findById = this.__eventRepository.find((e) => e.getId() === entity.getId());

            if(findById){
                throw new Error(`Event is alredy in repository`);
            }

            this.__eventRepository.push(entity);
            return;
        });
    }

    delete(id: string): Promise<boolean> {
        
        return new Promise((resolve) => {

            const findIndexById = this.__eventRepository.findIndex((e) => e.getId() === id);

            if(findIndexById === -1){
                resolve(false);
                return;
            }

            this.__eventRepository.splice(findIndexById);
            resolve(true);
            return;
        });
    }

    findByStatus(status: EventStatus): Promise<Event | null>{

        return new Promise((resolve) => {

            const findByStatus = this.__eventRepository.find((e) => e.getStatus() === status);

            if(!findByStatus){
                resolve(null);
                return;
            }

            resolve(findByStatus);
            return;
        });
    }

    findByName(name: string): Promise<Event | null>{

        return new Promise((resolve) => {

            const findByName = this.__eventRepository.find((e) => e.getName() === name)

            if(!findByName){
                resolve(null);
                return;
            }

            resolve(findByName);
            return;
        });
    }
}