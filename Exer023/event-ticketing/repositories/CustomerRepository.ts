import { Customer } from "../models/Customer";
import { IRespository } from "../interfaces/IRepository";

export class CustumerRepository implements IRespository<Customer>{

    private __custumerRepository: Customer[] = [];

    findAll(): Promise<Customer[]> {
        
        return new Promise((resolve) => {
            resolve(this.__custumerRepository);
            return;
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
            return;
        });
    }

    save(entity: Customer): Promise<Customer> {
        
        return new Promise((resolve) => {

            const findByCustumerId = this.__custumerRepository.find((c) => c.getId() === entity.getId());

            if(findByCustumerId){
                throw new Error(`Custumer is alredy in repository`);
            }

            this.__custumerRepository.push(entity);
            resolve(entity);
            return;
        });
    }

    delete(id: string): Promise<boolean> {
        
        return new Promise((resolve) => {

            const findIndexByCustumerId = this.__custumerRepository.findIndex((c) => c.getId() === id);

            if(findIndexByCustumerId === -1){
                resolve(false);
                return
            }

            this.__custumerRepository.splice(findIndexByCustumerId, 1);
            resolve(true);
            return;
        });
    }

    findByEmail(email: string): Promise<Customer>{

        return new Promise((resolve) => {

            const findByEmail = this.__custumerRepository.find((c) => c.getEmail() === email);

            if(!findByEmail){
                throw new Error(`Cannot find custumer`);
            }

            resolve(findByEmail);
            return;
        });
    }
}