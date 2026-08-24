import { Repository } from "../interfaces/Repository";
import { Patient } from "../models/Patient";

export class PatientRepository implements Repository<Patient>{

    private __pacientList: Patient[] = [];

    findById(id: string): Promise<Patient | null> {
        
        return new Promise((resolve) => {

            setTimeout(() => {

                const patient =  this.__pacientList.find(p => p.getId() === id);
                resolve(patient ?? null);
            }, 100);
        });
    };

    findAll(): Promise<Patient[]> {
        
        return new Promise((resolve) => {

            setTimeout(() => {

                resolve(this.__pacientList);
            }, 100);
        });
    };

    save(entity: Patient): Promise<Patient> {
        
        return new Promise((resolve) => {

            setTimeout(() => {

                this.__pacientList.push(entity);

                resolve(entity);

                return;

            }, 100);
        });
    };

    delete(id: string): Promise<boolean> {
        
        return new Promise((resolve) => {

            setTimeout(() => {

                const findPatientIndex = this.__pacientList.findIndex(p => p.getId() === id);

                if(findPatientIndex === -1){
                    resolve(false);
                    return;
                };

                this.__pacientList.splice(findPatientIndex, 1);
                resolve(true);
                return;
            }, 100);
        });
    };

    toString(): string{
        return `Pacient list => ${this.__pacientList}`;
    };

    getPacientList(): Patient[]{
        return this.__pacientList;
    };
};