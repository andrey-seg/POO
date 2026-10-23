import { Patient } from "../models/Patient";
import { IRepository } from "../interfaces/Repository";
import { PatientStatus } from "../enums/PatientStatus";

export class PatientRepository implements IRepository<Patient>{

    private __patientRepository: Patient[] = [];

    findAll(): Promise<Patient[]> {
        
        return new Promise((resolve) => {
            resolve(this.__patientRepository);
        });
    }

    findById(id: string): Promise<Patient | null> {
        
        return new Promise((resolve) => {

            const findPatientById = this.__patientRepository.find((p) => p.getId() === id);

            if(!findPatientById){
                throw new Error(`Cannot find patient`);
            }

            resolve(findPatientById);
        });
    }

    save(entity: Patient): Promise<Patient> {
        
        return new Promise((resolve) => {

            this.__patientRepository.push(entity);
            resolve(entity);
        });
    }

    delete(id: string): Promise<boolean> {

        return new Promise((resolve) => {

            const findPatientIndexId = this.__patientRepository.findIndex((p) => p.getId() === id);

            if(findPatientIndexId === -1){
                console.log(`Cannot find Patient`);
                resolve(false);
                return;
            }

            this.__patientRepository.splice(findPatientIndexId, 1);
            resolve(true);
            return;

        });
    }


    findByPatientEmail(email: string): Promise<Patient | null>{

        return new Promise((resolve) => {
            
            const findPatientByEmail = this.__patientRepository.find((p) => p.getEmail() === email);

            if(!findPatientByEmail){
                throw new Error(`Cannot find patient.`);
            }

            resolve(findPatientByEmail);
        });
    }

    findByStatus(status: PatientStatus): Promise<Patient[]>{

        return new Promise((resolve) => {

            const findPatientsByStatus = this.__patientRepository.filter((p) => p.getStatus() === status);

            resolve(findPatientsByStatus);
        });
    }
}