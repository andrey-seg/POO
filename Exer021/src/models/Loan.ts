import { generateCustomId } from "../common/generateId";
import { loanStatus } from "../enums/LoanStatus";
import { Book } from "./Book";
import { Member } from "./Member";

export class Loan{

    private __id: string;
    private __book: Book;
    private __member: Member;
    private __loanDate: string;
    private __dueDate: string;
    private __returnDate: string;
    private __status: loanStatus;

    constructor(book: Book, member: Member, status: loanStatus){

        this.__id = generateCustomId(Loan);
        this.__book = book;
        this.__member = member;
        this.__loanDate = new Date().toDateString();
        this.__dueDate = new Date().toDateString();
        this.__returnDate = new Date().toDateString();
        this.__status = status;
    }

    returnLoan(): void{

        if(this.__status === loanStatus.RETURNED){
            throw new Error(`Book is alredy returned.`);
        };

        this.__returnDate = new Date().toISOString();
        this.__status = loanStatus.RETURNED
    }

    markOverdue(): void{

        if(this.__status === loanStatus.OVERDUE){
            throw new Error(`Book is alredy mark as Overdue`);
        };

        this.__status = loanStatus.OVERDUE;
    }

    isOverdue(): boolean{

        const currentDate = new Date().toDateString();

        if(this.__status === loanStatus.OVERDUE){
            throw new Error(`Book is alredy mark as Overdue`);
        };

        if(this.__dueDate < currentDate && this.__status === loanStatus.ACTIVE){
            return true;
        };

        return false;
    }

    getDaysRemaining(): number{

        const today = new Date();
        const endDate = new Date(this.__dueDate);

        const diffTime = endDate.getTime() - today.getTime();
        const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        return days;
    }

    toString(): string{
        return `id => ${this.__id} | Book => ${this.__book} | Member => ${this.__member} | Loan Date => ${this.__loanDate} | Due Date => ${this.__dueDate} | Return Date => ${this.__returnDate} | Status => ${this.__status} `;
    }

    getId(): string{
        return this.__id;
    }

    getBook(): Book{
        return this.__book;
    }

    getMember(): Member{
        return this.__member;
    }

    getLoanDate(): string{
        return this.__loanDate;
    }

    getDueDate(): string{
        return this.__dueDate;
    }

    getReturnDate(): string{
        return this.__returnDate;
    }

    getStatus(): loanStatus{
        return this.__status;
    }
}