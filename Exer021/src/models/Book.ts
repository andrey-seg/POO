import { generateCustomId } from "../common/generateId";
import { BookStatus } from "../enums/BookStatus";
import { Rating } from "../feature/Rating";
import { Review } from "./Review";

export class Book{

    private __id: string;
    private __title: string;
    private __author: string;
    private __isbn: string;
    private __status: BookStatus;
    private __reviews: Review[];

    constructor(title: string, author: string, isbn: string){

        this.__id = generateCustomId(Book);
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

    addReview(memberId: string, rating: Rating, comment: string): void{
        const review = new Review(memberId, rating, comment);
        this.__reviews.push(review);
    }

    getAverageRating(): number{

        if (this.__reviews.length === 0) {
            return 0;
        }

        const average = this.__reviews.reduce((sum, review) => sum + review.getRating(), 0) / this.__reviews.length;
        return average;
    }

    isAvailable(): boolean{
        
        if( this.__status === BookStatus.BORROWED || this.__status === BookStatus.MAINTENANCE || this.__status === BookStatus.RESERVED){
            return false;
        }

        return true;
    }

    toString(): string{
        return `Id => ${this.__id} | Title => ${this.__title} | Author => ${this.__author} | ISBN => ${this.__isbn} | Status => ${this.__status} | Reviews => ${this.__reviews.length}`;
    }

    getId(): string{
        return this.__id;
    }

    getTitle(): string{
        return this.__title;
    }

    getAuthor(): string{
        return this.__author;
    }

    getIsbn(): string{
        return this.__isbn;
    }

    getStatus(): BookStatus{
        return this.__status;
    }

    getReviews(): Review[]{
        return this.__reviews;
    }
}