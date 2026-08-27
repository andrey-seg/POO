type Rating = 1 | 2 | 3 | 4 | 5;

export class Review{

    private __id: string;
    private __author: string;
    private __rating: Rating;
    private __comment: string;
    private __createdAt: string;

    constructor(id: string, author: string, rating: Rating, comment: string){

        this.__id = id;
        this.__author = author;
        this.__rating = rating;
        this.__comment = comment;
        this.__createdAt = new Date().toISOString();
    }

    isPositive(): boolean{

        if(this.__rating < 4){
            return false;
        }

        return true;
    }

    toString(): string{
        return `Id => ${this.__id} | Author => ${this.__author} | Rating => ${this.__rating} | Comment => ${this.__comment} | CreatedAt => ${this.__createdAt}`;
    }

    getId(): string{
        return this.__id;
    }

    getAuthor(): string{
        return this.__author;
    }

    getRating(): Rating{
        return this.__rating;
    }

    getComment(): string{
        return this.__comment;
    }

    getCreatedAt(): string{
        return this.__createdAt;
    }
}