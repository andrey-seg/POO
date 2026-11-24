import { IApiResponse } from "../interfaces/IApiResponse";
import { EventRepository } from "../repositories/EventRepository";
import { Event } from "../models/Event";

export class EventService{

    private constructor(private __eventRepository: EventRepository){};

    async createEvent(name: string, location: string, date: string, capacity: number, basePrice: number): Promise<IApiResponse<Event>>{

        try{

            const findEvent = await this.__eventRepository.findByName(name);

            if(!findEvent){
                return{ success: false, error: `Cannot find event`};
            }

            const newEvent = new Event(
                name,
                location,
                date,
                capacity,
                basePrice
            );

            this.__eventRepository.save(newEvent);
            return{ success: true, data: findEvent }
        }catch(error){
            return{ success: false, error: (error as Error).message }
        }
    }

    async publishEvent(eventId: string): Promise<IApiResponse<Event>>{

        try{

            const findById = await this.__eventRepository.findById(eventId);

            if(!findById){
                return{ success: true, error: `Cannot find event by id`};
            }

            findById.publish();
            return{ success: true, data: findById };
        }catch(error){
            return{ success: true, error: (error as Error).message };
        }
    }
}