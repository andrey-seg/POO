import { DepartamentType } from "../enums/DepartamentType";
import { Repository } from "../interfaces/Repository";
import { Doctor } from "../models/Doctor";
import { Patient } from "../models/Patient";

export class DoctorRepository implements Repository<Doctor>{

    private __doctorList: Doctor[] = [];
    private __patientList: Patient[] = [];

    findById(id: string): Promise<Doctor | null> {
        
        return new Promise((resolve) => {

            setTimeout(() => {

                const doctor = this.__doctorList.find(d => d.getId() === id);
                resolve(doctor ?? null);

            }, 100);

        });
    };

    findAll(): Promise<Doctor[]> {
    
        return new Promise((resolve) => {

            setTimeout(() => {

                resolve(this.__doctorList);

            }, 100);

        });
    };

    save(entity: Doctor): Promise<Doctor> {
        
        return new Promise((resolve) => {

            setTimeout(() => {

                this.__doctorList.push(entity);
                resolve(entity);
                return;

            }, 100);

        });
    };

    delete(id: string): Promise<boolean> {
        
        return new Promise((resolve) => {

            setTimeout(() => {

                const findIndexDoctor = this.__doctorList.findIndex(d => d.getId() === id);

                if(findIndexDoctor === -1){
                    resolve(false);
                    return;
                };

                this.__doctorList.splice(findIndexDoctor, 1);
                resolve(true);
                return;
            }, 100)

        });
    };

    findByDepartament(departament: DepartamentType): Promise<Doctor[]>{

        return new Promise((resolve) => {

            setTimeout(() =>{

                 const doctorDepartament = this.__doctorList.filter(d => d.getDepartament() === departament);

                resolve(doctorDepartament);

            }, 100);

        }); 
    };

    findDoctorById(doctorId: string): Promise<Doctor[]>{
        
        return new Promise((resolve) => {

            setTimeout(() => {
                
                const findDoctor = this.__doctorList.filter(d => d.getId() === doctorId);

                resolve(findDoctor);
            }, 100);

        });
    };

    findPatientById(patientId: string): Promise<Patient[]>{

        return new Promise((resolve) => {

            setTimeout(() => {

                const findPatient = this.__patientList.filter(p => p.getId() === patientId);

                resolve(findPatient);
            }, 100);
        });
    };

    toString(): string{
        return `Doctor list => ${this.__doctorList} | Patient list => ${this.__patientList}`;
    };

    getDoctorList(): Doctor[]{
        return this.__doctorList;
    };

    getPatientList(): Patient[]{
        return this.__patientList;
    };
    
};