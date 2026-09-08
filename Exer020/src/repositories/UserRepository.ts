import { I_Repository } from "../interfaces/I_Repository"
import { User } from "../models/User";

export class UserRepository implements I_Repository<User>{

    private __userList: User[] = [];

    findById(id: string): Promise<User | null> {
        
        return new Promise((resolve) => {

            const findUserById = this.__userList.find((u) => u.getId() === id);
            resolve(findUserById ?? null);
        });
    }

    findAll(): Promise<User[]> {
        
        return new Promise((resolve) => {
            resolve(this.__userList);
        });
    }

    save(entity: User): Promise<User> {
        
        return new Promise((resolve) => {
            this.__userList.push(entity);
            resolve(entity);
            return;
        });
    }

    delete(id: string): Promise<boolean> {
        
        return new Promise((resolve) => {
            const findUserById = this.__userList.findIndex((u) => u.getId() === id);

            if(findUserById === -1){
                resolve(false);
                return;
            }
            
            this.__userList.splice(findUserById, 1);
            resolve(true);
            return;
        });
    }

    findByEmail(email: string): Promise< User | null >{

        return new Promise((resolve) => {

            const findByEmail = this.__userList.find((u) => u.getEmail() === email);
            resolve( findByEmail ?? null );
        });
    }
}