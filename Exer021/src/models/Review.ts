import { generateCustomId } from "../common/generateId";
import { Member } from "../models/Member";

type Rating = 1 | 2 | 3 | 4 | 5;

export class Review{
   
    private __id: string;
    private __memberId: string;
    private __rating: Rating;
    private __comment: string;
    private __createdAt: string;

    constructor(member: Member, rating: Rating, comment: string){

        this.__id = generateCustomId(Review);
        this.__memberId = member.getId();
        this.__rating = rating;
        this.__comment = comment;
        this.__createdAt = new Date().toDateString();
    }

    isRatingPositive(): boolean{
        return this.__rating > 3;
    }

    toString(): string{
        return `Id => ${this.__id} | Member id => ${this.__memberId} | Rating => ${this.__rating} | Comment => ${this.__comment} | CreatedAt => ${this.__createdAt}`;
    }

    getId(): string{
        return this.__id;
    }

    getMemberId(): string{
        return this.__memberId;
    }

    getRating(): Rating{
        return this.__rating;
    }

    getCreatedAt(): string{
        return this.__createdAt;
    }
}