import { Student } from "../models/Student";
import { Subject } from "../models/Subject";
import { I_ApiResponse } from "../intrefaces/ApiResponse";

export class AcademicService{
    private __StudentList: Student[] = [];
    private __SubjectList: Subject[] = [];

    registerStudent(student: Student): I_ApiResponse<Student>{
        const studentAlredyRegister = this.__StudentList.find(s => s.getId() === student.getId());

        if(studentAlredyRegister){
            return { success: false, error: `Student alredy register`};
        };

        try{
            this.__StudentList.push(student);
            return { success: true, data: student };
        }catch(error){
            return { success: false, error: (error as Error).message};
        };
    };

    addSubject(subject: Subject): I_ApiResponse<Subject>{
        const subjectAlredyRegister = this.__SubjectList.find(s => s.getId() === subject.getId());

        if(subjectAlredyRegister){
            return { success: false, error: `Subject alredy register` };
        };

        try{
            this.__SubjectList.push(subject);
            return { success: true, data: subject };
        }catch(error){
            return { success: false, error: (error as Error).message };
        };
    };

    enrollStudent(studentID: string, subjectID: string): I_ApiResponse<Student>{

    }
}