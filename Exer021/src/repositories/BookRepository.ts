import { IRepository } from "../interfaces/IRepository";
import { Book } from "../models/Book";
import { BookStatus } from "../enums/BookStatus";

export class BookRepository implements IRepository<Book>{

    private __book: Book[] = [];

    findById(id: string): Promise<Book | null> {
        
       return new Promise((resolve) => {

            const findBookByid = this.__book.find((b) => b.getId() === id);

            resolve(findBookByid ?? null);
       });
    }

    findAll(): Promise<Book[]> {

        return new Promise((resolve) => {

            resolve(this.__book);
        });
    }

    save(entity: Book): Promise<Book> {
        
        return new Promise((resolve) => {
            
            this.__book.push(entity);
            resolve(entity);
        });
    }

    delete(id: string): Promise<boolean> {
        
        return new Promise((resolve) => {

            const findBookIndexById = this.__book.findIndex((b) => b.getId() === id);

            if(findBookIndexById === -1){
                resolve(false);
                return;
            };

            this.__book.splice(findBookIndexById, 1);
            resolve(true);
        });
    }

    findByIsbn(isbn: string): Promise<Book | null>{

        return new Promise((resolve) => {

            const findBookByIsbn = this.__book.find((b) => b.getIsbn() === isbn);

            resolve(findBookByIsbn ?? null);
        });
    }

    findByStatus(status: BookStatus): Promise<Book[]>{

        return new Promise((resolve) => {

            const findBooksByStatus = this.__book.filter((b) => b.getStatus() === status);

            if(findBooksByStatus.length === 0){
                resolve(findBooksByStatus);
            };

            resolve(findBooksByStatus);
        });
    }

    findByAuthor(author: string): Promise<Book[]>{
        
        return new Promise((resolve) => {

            const findBooksByAuthor = this.__book.filter((b) => b.getAuthor() === author);

            if(findBooksByAuthor.length === 0){
                resolve(findBooksByAuthor);
            };

            resolve(findBooksByAuthor);
        });
    }
}