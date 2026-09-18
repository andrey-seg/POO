import { generateCustomId } from "../common/generateId";
import { Member } from "../models/Member";

type Rating = 1 | 2 | 3 | 4 | 5;

export class Review{
   
    private __id: string;
    private __memberId: Member;
    private __rating: Rating;
    private __comment: string;
    private __createdAt: string;

    constructor(rating: Rating, comment: string){

        this.__id = generateCustomId(Review);
    }
}