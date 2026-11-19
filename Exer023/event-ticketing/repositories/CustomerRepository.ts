import { Customer } from "../models/Customer";
import { IRespository } from "../interfaces/IRepository";

export class CustumerRepository implements IRespository<Customer>{

    private __custumerRepository: Customer[] = [];

    findAll(): Promise<Customer>[] {
        
        return new Promise((resolve) => {
            resolve(this.__custumerRepository);
        });
    }

    findById(id: string): Promise<Customer | null> {
        
        return new Promise((resolve) => {

            const findByCustumerId = this.__custumerRepository.find((c) => c.getId() === id);

            if(!findByCustumerId){
                resolve(null);
                return `Cannot find custumer`;
            }

            resolve(findByCustumerId);
        });
    }

    save(entity: Customer): Promise<Customer> {
        
    }

    delete(id: string): Promise<boolean> {
        
    }
}