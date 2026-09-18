import { generateCustomId } from "../common/generateId";
import { BookStatus } from "../enums/BookStatus";
import { Review } from "./Review";
import { Rating } from "../feature/Rating";

export class Book{

    private __id: string;
    private __title: string;
    private __author: string;
    private __isbn: string;
    private __status: BookStatus;
    private __reviews: Review[];

    constructor(id: string, title: string, author: string, isbn: string){

        this.__id = id;
        this.__title = title;
        this.__author = author;
        this.__isbn = isbn;
        this.__status = BookStatus.AVAILABLE;
        this.__reviews = [];
    }

    borrow(): void{
        this.__status = BookStatus.BORROWED;
    }

    returnBook(): void{
        this.__status = BookStatus.AVAILABLE;
    }

    reserve(): void{
        this.__status = BookStatus.RESERVED;
    }

    addReview(memberId: string, rating: )
}