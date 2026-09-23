import { IRepository } from "../interfaces/IRepository";
import { Member } from "../models/Member";

export class MemberRepository implements IRepository<Member>{

    private __members: Member[] = [];

    findById(id: string): Promise<Member | null> {
        
        return new Promise((resolve) => {

            const findMemberById = this.__members.find((m) => m.getId() === id);

            resolve(findMemberById ?? null);
        });
    }

    findAll(): Promise<Member[]> {
        
        return new Promise((resolve) => {

            resolve(this.__members);
        });
    }

    save(entity: Member): Promise<Member> {
        
        return new Promise((resolve) => {

            this.__members.push(entity);
            resolve(entity);
        });
    }

    delete(id: string): Promise<boolean> {
        
        return new Promise((resolve) => {

            const findMemberById = this.__members.findIndex((m) => m.getId() === id);

            if(findMemberById === -1){
                resolve(false);
                return;
            };

            this.__members.splice(findMemberById);
            resolve(true);
        })
    }

    findByEmail(email: string): Promise<Member | null>{
        
        return new Promise((resolve) => {

            const findMemberByEmail = this.__members.find((m) => m.getEmail() === email);

            return(findMemberByEmail ?? null);
        })
    }
}