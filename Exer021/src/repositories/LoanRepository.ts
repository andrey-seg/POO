import { IRepository } from "../interfaces/IRepository";
import { Loan } from "../models/Loan";

export class loanRepository implements IRepository<Loan>{

    private __loans: Loan[] = [];

    findById(id: string): Promise<Loan | null> {
        
        return new Promise((resolve) => {

            const findByLoanId = this.__loans.find((l) => l.getId() === id);

            resolve(findByLoanId ?? null);
        });
    }

    findAll(): Promise<Loan[]> {
        
        return new Promise((resolve) => {

            resolve(this.__loans);
        });
    }

    save(entity: Loan): Promise<Loan> {
        
        return new Promise((resolve) => {

            this.__loans.push(entity);
            resolve(entity);
        })
    }

    delete(id: string): Promise<boolean> {
        
        return new Promise((resolve) => {

            const findByLoanIndexById = this.__loans.findIndex((l) => l.getId() === id);

            if(!findByLoanIndexById){
                resolve(false);
                return;
            }

            this.__loans.splice(findByLoanIndexById);
            resolve(true);
        });
    }

    findByMember(memberId: string): Promise<Loan[]>{

        return new Promise((resolve) => {

            const findMemberById = this.__loans.find((m) => m.getMember().getId() === memberId);

            resolve(findMemberById)
        })
    }

    findByBook(bookId: string): Promise<Loan[]>{

    }

    findActive(): Promise<Loan[]>{

    }
}