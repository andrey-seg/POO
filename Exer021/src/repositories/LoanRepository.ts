import { loanStatus } from "../enums/LoanStatus";
import { IRepository } from "../interfaces/IRepository";
import { Loan } from "../models/Loan";

export class LoanRepository implements IRepository<Loan>{

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

            if(findByLoanIndexById === -1){
                resolve(false);
                return;
            }

            this.__loans.splice(findByLoanIndexById, 1);
            resolve(true);
        });
    }

    findByMember(memberId: string): Promise<Loan[]>{

        return new Promise((resolve) => {

            const findMemberById = this.__loans.filter((m) => m.getMember().getId() === memberId);

            resolve(findMemberById)
        })
    }

    findByBook(bookId: string): Promise<Loan[]>{

        return new Promise((resolve) => {
            
            const findBookById = this.__loans.filter((l) => l.getBook().getId() === bookId);

            resolve(findBookById);
        })
    }

    findActive(): Promise<Loan[]>{

        return new Promise((resolve) => {

            const activeLoans = this.__loans.filter((l) => l.getStatus() === loanStatus.ACTIVE);

            resolve(activeLoans);
        })
    }
}