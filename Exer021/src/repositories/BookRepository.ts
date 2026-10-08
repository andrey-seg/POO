import { IApiResponse } from "../interfaces/IApiResponse";
import { Book } from "../models/Book";
import { BookService } from "../services/BookService";
import { BookStatus } from "../enums/BookStatus";
import { Rating } from "../feature/Rating";

export class BookRepository{

    constructor(private __bookService: BookService){};

    async addBook(title: string, author: string, isbn: string): Promise<IApiResponse<Book>>{

        try{
            const findBookByIsbn = await this.__bookService.findByIsbn(isbn);

            if(findBookByIsbn){
                return { success: false, error: `Book is alredy registerd.` };
            };

            const newBook = new Book(title, author, isbn);
            this.__bookService.save(newBook);
            
            return{ success: true, data: newBook };
        }catch(error){
            return{ success: false, error: (error as Error).message };
        }
    }

    async getAveilable(available: BookStatus.AVAILABLE): Promise<IApiResponse<Book[]>>{

        try{

            const findBookAveilable = await this.__bookService.findByStatus(available);

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

            const findBook = await this.__bookService.findById(bookId);

            if(!findBook){
                return{ success: false, error: `Cannot find book.` };
            };

            findBook.addReview(memberId, rating, comment);
            await this.__bookService.save(findBook);

            return{ success: true, data: findBook };
        }catch(error){
            return{ success: false, error: (error as Error).message };
        }
    }

    async getTopRated(): Promise<IApiResponse<Book[]>>{

      try{

            const allBooks = await this.__bookService.findAll();

            const topRated = allBooks.filter(b => b.getAverageRating() >= 4);

            if(topRated.length === 0){
                return { success: false, error: "No top rated book found"};
            }

            return{ success: true, data: topRated };
      }catch(error){
        return { success: false, error: (error as Error).message };
      }
    } 

    async serchByAuthor(author: string): Promise<IApiResponse<Book[]>>{

        try{

            const allBooks = await this.__bookService.findAll();

            const authorBooks = allBooks.filter(b => b.getAuthor() === author);

            if(authorBooks.length === 0){
                return { success: false, error: "No book of this author was found." };
            }

            return{ success: true, data: authorBooks };
        }catch(error){
            return { success: false, error: (error as Error).message };
        }
    }
}