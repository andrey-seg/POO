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
        const studentExist = this.__StudentList.find(s => s.getId() === studentID);
        const subjectExist = this.__SubjectList.find(s => s.getId() === subjectID);

        if(!studentExist || !subjectExist){
            return { success: false, error: `Subject or student not found`};
        };

        try{
            studentExist.enroll(subjectExist);
            return { success: true, data: studentExist};
        }catch(error){
            return { success:false, error: (error as Error).message };
        };
    };

    submitGrade(studentID: string, subjectID: string, value: number): I_ApiResponse<Student>{
        const studentExist = this.__StudentList.find(s => s.getId() === studentID);
        const subjectExist = this.__SubjectList.find(s => s.getId() === subjectID);

        if(!studentExist || !subjectExist){
            return { success: false, error: `Subject or student not found`};
        };

        try{
            studentExist.addGrade(subjectID, value);
            return { success: true, data: studentExist};
        }catch(error){
            return { success: false, error: (error as Error).message};
        };
    };

    getStudentReport(studentID: string): I_ApiResponse<Student>{
        const studentExist = this.__StudentList.find(s => s.getId() === studentID);

        if(!studentExist){
            return { success: false, error: `Student not found`};
        };

        return {success: true, data: studentExist};
    };

    getPassingStudents(): I_ApiResponse<Student[]>{
        const passingStudents = this.__StudentList.filter(s => s.getGPA() >= 6);

        if(passingStudents.length === 0){
            return { success: false, error: `No passing students found`};
        };

        return { success: true, data: passingStudents };
    };
}