import { SubjectStatus } from "../enums/SubjectStatus";

export class Subject{
    private __id: string;
    private __name: string;
    private __credits: number;
    private __Status: SubjectStatus;

    constructor(id: string, name: string, credits: number, status: SubjectStatus){
        this.__id = id;
        this.__name = name;
        this.__credits = credits;
        this.__Status = status;
    };

    drop(){
        if(this.__Status === SubjectStatus.DROPPED){
            return `Alredy Dropped`;
        };

        this.__Status = SubjectStatus.DROPPED;
        return `Dropped successfully`;
    };

    pass(){
        if(this.__Status === SubjectStatus.PASSED){
            return `Alredy passed`;
        };

        this.__Status = SubjectStatus.PASSED;
        return `Passed successfully`;
    };

    fail(){
        if(this.__Status === SubjectStatus.FAILED){
            return `Alredy failed`;
        };

        this.__Status = SubjectStatus.FAILED;
        return `Failed`;
    };

    toString(): string{
        return `Id => ${this.__id} | Name => ${this.__name} | Credits => ${this.__credits} | Status => ${this.__Status}`;
    };

    getId(){
        return this.__id;
    };

    getName(){
        return this.__name;
    };

    getCredits(){
        return this.__credits;
    };

    getStatus(){
        return this.__Status;
    };
};