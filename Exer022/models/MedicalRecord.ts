import { GenerateCustomId } from "../common/generateId";

export class MedicalRecord{
    
    private __id: string;
    private __patientId: string;
    private __doctorId: string;
    private __diagnosis: string;
    private __prescription: string;
    private __createdAt: string;

    constructor(patientId: string, doctorId: string, diagnosis: string, prescrition: string){

        this.__id = GenerateCustomId(MedicalRecord);
        this.__patientId = patientId;
        this.__doctorId = doctorId;
        this.__diagnosis = diagnosis;
        this.__prescription = prescrition;
        this.__createdAt = new Date().toISOString();
    }

    toString(): string{
        return `id: ${this.__id} | patientID: ${this.__patientId} | doctorID: ${this.__doctorId} | diagnosis: ${this.__diagnosis} | prescription: ${this.__prescription} | created at: ${this.__createdAt}`;
    }

    getId(): string{
        return this.__id;
    }

    getPatientId(): string{
        return this.__patientId;
    }

    getDoctorId(): string{
        return this.__doctorId;
    }

    getDiagnosis(): string{
        return this.__diagnosis;
    }

    getPrescription(): string{
        return this.__prescription;
    }

    getCreatedAt(): string{
        return this.__createdAt;
    }
}