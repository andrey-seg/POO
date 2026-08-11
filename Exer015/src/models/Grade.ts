export class Grade{
    private __subjectId: string;
    private __value: number;
    private __date: string;

    constructor(subjectId: string, value: number, date: string){
        this.__subjectId = subjectId;
        this.__value = value;
        this.__date = date;
    };

    isPassing(){
        if(this.__value < 6){
            return `Failed`;
        };

        return `Approved`;
    };

    toString(): string{
        return `SubjectId => ${this.__subjectId} | Value => ${this.__value} | Date => ${this.__date}`;
    };

    getSubjectId(){
        return this.__subjectId;
    };

    getValue(){
        return this.__value;
    };

    getDate(){
        this.__date;
    };
};