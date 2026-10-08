import { BookRepository } from "../services/BookService";
import { LoanRepository } from "../services/LoanService";
import { MemberRepository } from "../services/MemberService";
import { IApiResponse } from "../interfaces/IApiResponse";
import { Loan } from "../models/Loan";
import { loanStatus } from "../enums/LoanStatus";

export class LoanService{

    constructor(private __loanRepository: LoanRepository, private __bookRepository: BookRepository, private __memberRepository: MemberRepository){};

    async createLoan(memberId: string, bookId: string, dueDate: string): Promise<IApiResponse<Loan>>{

        try{

            const findMemberById = await this.__memberRepository.findById(memberId);
            const findBookByid = await this.__bookRepository.findById(bookId);

            if(!findMemberById || !findBookByid){
                return { success: false, error: `Member not found!.` };
            }

            if(!findMemberById.canBorrow()){
                return { success: false, error: `Member cannot borrow more books.` };
            }

            if(!findBookByid.isAvailable()){
                return { success: false, error: `Book is not available. ` }; 
            }

            findBookByid.borrow();
            findMemberById.incrementLoan();

            const newLoan = new Loan(findBookByid, findMemberById, dueDate);
            const saved = await this.__loanRepository.save(newLoan);

            return { success: true, data: saved };
        }catch(error){
            return { success: false, error: (error as Error).message };
        }
    }

    async returnLoan(loanId: string): Promise<IApiResponse<Loan>>{

        try{

            const findLoanById = await this.__loanRepository.findById(loanId);

            if(!findLoanById){
                return { success: false, error: `Loan not found.` };
            }

            return{ success: true, data: findLoanById };
        }catch(error){
            return{ success: false, error: (error as Error).message };
        }
    }

    async getMemberLoans(memberId: string): Promise<IApiResponse<Loan[]>>{

        try{

            const findMemberLoansById = await this.__loanRepository.findByMember(memberId);

            if(findMemberLoansById.length === 0){
                return { success: false, error: `Cannot find member loans. `};
            }

            return { success: true, data: findMemberLoansById };
        }catch(error){
            return { success: false, error: (error as Error).message };
        }
    }

    async getOverDueLoans(): Promise<IApiResponse<Loan[]>>{

        try{

            const AllLoans = await this.__loanRepository.findAll();
            const filterLoans = AllLoans.filter((l) => l.getStatus() === loanStatus.OVERDUE);

            if(AllLoans.length === 0){
                return { success: false, error: `Cannot find books`};
            }

            if(filterLoans.length === 0){
                return { success: false, error: `Cannot find overdue loans.` };
            }

            return { success: true, data: filterLoans };
        }catch(error){
            return { success: false, error: (error as Error).message };
        }
    }

    async renewLoan(loansId: string, newDueDate: string): Promise<IApiResponse<Loan>>{

        try{
            const findLoanById = await this.__loanRepository.findById(loansId);

            if(!findLoanById){
                return { success: false, error: `Cannot find loan.`};
            }

            findLoanById.setNewLoanDate(newDueDate);
            const saved = await this.__loanRepository.save(findLoanById)

            return { success: true, data: saved };
        }catch(error){
            return { success: false, error: (error as Error).message };
        }
    }
}