import { I_Repository } from "../interfaces/I_Repository";
import { Order } from "../models/Order";

export class OrderRepository implements I_Repository<Order>{
    
    private __oredersList: Order[] = [];

    findById(id: string): Promise<Order | null> {
        
        return new Promise((resolve) => {

            const findOrderById = this.__oredersList.find((o) => o.getId() === id);
            resolve( findOrderById ?? null );
        });
    }

    findAll(): Promise<Order[]> {
        
        return new Promise((resolve) => {
            resolve(this.__oredersList);
        });
    }

    save(entity: Order): Promise<Order> {
        
        return new Promise((resolve) => {
            this.__oredersList.push(entity);
            resolve(entity);
            return;
        });
    }

    delete(id: string): Promise<boolean> {
        
        return new Promise((resolve) => {

            const findOrderById  = this.__oredersList.findIndex((o) => o.getId() === id);

            if(findOrderById === -1){
                resolve( false );
                return;
            }

            this.__oredersList.splice(findOrderById, 1);
            resolve( true );
            return;
        });
    }
    
    findByUser(userId: string): Promise<Order[]>{

        return new Promise((resolve) => {

            const findOrderByUserId = this.__oredersList.filter((o) => o.getUserId() === userId);
            resolve(findOrderByUserId);
        });
    }
}