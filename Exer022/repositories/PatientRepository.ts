import { Patient } from "../models/Patient";
import { IRepository } from "../interfaces/Repository";

export class PatientRepository implements IRepository<Patient>{

    private __patientRepository: Patient[] = [];

    findAll(): Promise<Patient[]> {
        
        return new Promise((resolve) => {
            resolve(this.__patientRepository);
        });
    }

    findById(id: string): Promise<Patient | null> {
        
        return new Promise((resolve) => {

            const 
        })
    }
}