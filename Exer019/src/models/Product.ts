import { ProductStatus } from "../enums/ProductStatus";
import { Category } from "../models/Category";
import { Review } from "../models/Review"
import { Rating } from "../models/Review";

export class Product{

    private __id: string;
    private __name: string;
    private __price: number;
    private __status: ProductStatus;
    private __categoty: Category;
    private __reviews: Review[];

    constructor(id: string, name: string, price: number, status: ProductStatus, category: Category,){

        this.__id = id;
        this.__name = name;
        this.__price = price;
        this.__status = status;
        this.__categoty = category;
        this.__reviews = [];
    }

    addReview(author: string, rating: Rating, comment: string): void{

        const review = new Review(
            `Rev-${this.__reviews.length+ 1}`,
            author,
            rating,
            comment
        );

        this.__reviews.push(review);
    }

    getAverageRating(): number{

        if(this.__reviews.length === 0){
            throw new Error(`List is empty`);
        }

        const totalRating = this.__reviews.reduce((sum, review) => {
            return sum + review.getRating();
        }, 0);

        return totalRating / this.__reviews.length;
    }

    activate(): ProductStatus{

        if(this.__status === ProductStatus.OUT_OF_STOCK){
            throw new Error(`Product out of stock`);
        }

        if(this.__status === ProductStatus.ACTIVE){
            throw new Error(`Product alredy mark as active`);
        }

        this.__status = ProductStatus.ACTIVE;
        return this.__status;
    }

    deactivate(): ProductStatus{

        if(this.__status === ProductStatus.OUT_OF_STOCK){
            throw new Error(`Product out of stock`);
        }

        if(this.__status === ProductStatus.INACTIVE){
            throw new Error(`Product alredy deactivated`);
        }

        this.__status = ProductStatus.INACTIVE;
        return this.__status;
    }

    markOutOfStock(): ProductStatus{

        if(this.__status === ProductStatus.OUT_OF_STOCK){
            throw new Error(`Product alredy register as out of stock`);
        }

        this.__status = ProductStatus.OUT_OF_STOCK;
        return this.__status;
    }

    toString(): string{
        return `id => ${this.__id} | Name => ${this.__name} | Price => ${this.__price} | Status => ${this.__status} | Category => ${this.__categoty} | Reviews => ${this.__reviews}`;
    }

    getId(): string{
        return this.__id;
    }

    getName(): string{
        return this.__name;
    }

    getPrice(): number{
        return this.__price;
    }

    getStatus(): ProductStatus{
        return this.__status;
    }

    getCategory(): Category{
        return this.__categoty;
    }

    getReviews(): Review[]{
        return this.__reviews;
    }
}