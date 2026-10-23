import { GenerateCustomId } from "../common/generateId";
import { PatientStatus } from "../enums/PatientStatus";
import { MedicalRecord } from "./MedicalRecord";

export class Patient{

    private __id: string;
    private __name: string;
    private __email: string;
    private __phone: string;
    private __status: PatientStatus;
    private __medicalRecord: MedicalRecord[];

    constructor(name: string, email: string, phone: string, status: PatientStatus){

        this.__id = GenerateCustomId(Patient);
        this.__name = name;
        this.__email = email;
        this.__phone = phone;
        this.__status = status;
        this.__medicalRecord = [];
    }

    addMedicalRecord(patientId = this.__id, doctorId: string, diagnosis: string, prescription: string): boolean{

        const medicalRecord = new MedicalRecord(patientId, doctorId, diagnosis, prescription)

        if(!medicalRecord){
            return false;
        }
        
        this.__medicalRecord.push(medicalRecord);

        return true;
    }

    block(): boolean{

        if(this.__status === PatientStatus.BLOCKED){
            return false;
        }

        this.__status = PatientStatus.BLOCKED;
        return true;
    }

    activate(): boolean{

        if(this.__status === PatientStatus.ACTIVE){
            return false;
        }

        this.__status = PatientStatus.ACTIVE;
        return true;
    }

    deactivate(): boolean{

        if(this.__status === PatientStatus.INACTIVE){
            return false;
        }

        this.__status = PatientStatus.INACTIVE;
        return true;
    }

    isActive(): boolean{

        if(this.__status === PatientStatus.INACTIVE || this.__status === PatientStatus.BLOCKED){
            return false
        }

        return true;
    }

    toSting(): string{
        return `Id: ${this.__id} | Name: ${this.__name} | Email: ${this.__email} | Phone: ${this.__phone} | Status: ${this.__status} | Medical Record: ${this.__medicalRecord}`
    }

    getId(): string{
        return this.__id;
    }

    getName(): string{
        return this.__name;
    }

    getEmail(): string{
        return this.__email;
    }

    getPhone(): string{
        return this.__phone;
    }

    getStatus(): PatientStatus{
        return this.__status;
    }

    getMedicalRecord(): MedicalRecord[]{
        return this.__medicalRecord;
    }
}