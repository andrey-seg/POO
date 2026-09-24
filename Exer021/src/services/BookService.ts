import { IApiResponse } from "../interfaces/IApiResponse";
import { Book } from "../models/Book";
import { BookRepository } from "../repositories/BookRepository";
import { BookStatus } from "../enums/BookStatus";
import { Rating } from "../feature/Rating";

export class BookServices{

    constructor(private __bookRepository: BookRepository){};

    async addBook(title: string, author: string, isbn: string): Promise<IApiResponse<Book>>{

        try{
            const findBookByIsbn = await this.__bookRepository.findByIsbn(isbn);

            if(findBookByIsbn){
                return { success: false, error: `Book is alredy registerd.` };
            };

            const newBook = new Book(title, author, isbn);
            this.__bookRepository.save(newBook);
            
            return{ success: true, data: newBook };
        }catch(error){
            return{ success: false, error: (error as Error).message };
        }
    }

    async getAveilable(available: BookStatus.AVAILABLE): Promise<IApiResponse<Book[]>>{

        try{

            const findBookAveilable = await this.__bookRepository.findByStatus(available);

            if(!findBookAveilable){
                return { success: false, error: `Cannot find books with that status.` }; 
            };

            return{ success: true, data: findBookAveilable};
        }catch(error){
            return{ success: false, error: (error as Error).message };
        }
    }

    async addReview(bookId: string, memberId: string, rating: Rating, comment: string): Promise<IApiResponse<Book>>{
    
        try{

            const findBook = await this.__bookRepository.findById(bookId);

            if(!findBook){
                return{ success: false, error: `Cannot find book.` };
            };

            findBook.addReview(memberId, rating, comment);
            const saved = this.__bookRepository.save(findBook);

            return{ success: true, data: findBook };
        }catch(error){
            return{ success: false, error: (error as Error).message };
        }
    }

    
}