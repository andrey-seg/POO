import { E_GrandeLevel } from "../enums/GradeLevel";
import { Grade } from "./Grade";
import { Subject } from "./Subject";

export class Student{
    private __id: string;
    private __name: string;
    private __email: string;
    private __level: E_GrandeLevel;
    private __subjects: Subject[];
    private __grade: Grade[];

    constructor(id: string, name: string, email: string, level: E_GrandeLevel){
        this.__id = id;
        this.__name = name;
        this.__email = email;
        this.__level = level;
        this.__subjects = [];
        this.__grade = [];
    };

    enroll(subject: Subject){
        const alreadyEnrolled = this.__subjects.find(s => s.getId() === subject.getId());

        if(alreadyEnrolled){
            throw new Error("Student alredy enrolled in this subject");
        };

        this.__subjects.push(subject);
    };

    addGrade(subjectId: string, value: number){
       const subject = this.__subjects.find(s => s.getId() === subjectId);
       
        if(!subject){
            throw new Error(`Subject not found.`);
        };

        const newGrade = new Grade(subjectId, value, new Date().toISOString());

        this.__grade.push(newGrade);

        if(newGrade.isPassing()){
            subject.pass();
        } else{
            subject.fail();
        };
    };

    getGPA(){
        if(this.__grade.length === 0){
            return 0;
        };

        const total = this.__grade.reduce((sum, grade) => {
            return sum + grade.getValue()
        }, 0)

        return total / this.__grade.length;
    };

    toString(): string{
        return `ID => ${this.__id} | Name => ${this.__name} | Email => ${this.__email} | Level => ${this.__level} | Subject => ${this.__subjects} | Grade => ${this.__grade}`
    };

    getId(){
        return this.__id;
    };

    getName(){
        return this.__name;
    };

    getEmail(){
        return this.__email;
    };

    getLevel(){
        return this.__level;
    };

    getSubject(){
        return this.__subjects;
    };

    getGrade(){
        return this.__grade;
    };
};