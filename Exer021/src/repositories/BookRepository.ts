import { loanStatus } from "../enums/LoanStatus";
import { IRepository } from "../interfaces/IRepository";
import { Book } from "../models/Book";

export class BookRepository implements IRepository<Book>{

    findById(id: string): Promise<Book | null> {
        
    }

    findAll(): Promise<Book[]> {
        
    }

    save(entity: Book): Promise<Book> {
        
    }

    delete(id: string): Promise<boolean> {
        
    }

    findByIsbn(isbn: string): Promise<Book | null>{

    }

    findByStatus(status: loanStatus): Promise<Book[]>{

    }

    findByAuthor(author: string): Promise<Book[]>{
        
    }
}