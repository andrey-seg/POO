import { Doctor } from "../models/Doctor";
import { IRepository } from "../interfaces/Repository";
import { DoctorSpecialty } from "../enums/DoctorSpecialty";

export class DoctorRepository implements IRepository<Doctor>{

    private __doctorRepository: Doctor[] = [];

    findAll(): Promise<Doctor[]> {
        
        return new Promise((resolve) => {
            resolve(this.__doctorRepository);
        });
    }

    findById(id: string): Promise<Doctor | null> {
        
        return new Promise((resolve) => {

            const findDoctorById = this.__doctorRepository.find((d) => d.getId() === id);

            if(!findDoctorById){
                throw new Error(`Cannot find doctor id`);
            }

            resolve(findDoctorById);
        })
    }

    save(entity: Doctor): Promise<Doctor> {
        
        return new Promise((resolve) => {

            this.__doctorRepository.push(entity)
            resolve(entity);
        })
    }

    delete(id: string): Promise<boolean> {

        return new Promise((resolve) => {

            const findDoctorIndexById = this.__doctorRepository.findIndex((d) => d.getId() === id);

            if(findDoctorIndexById === -1){
                console.log(`Cannot find doctor`);
                resolve(false);
                return;
            }

            this.__doctorRepository.splice(findDoctorIndexById, 1);
            resolve(true);
            return;

        });
    }

    findBySpecialty(specilty: DoctorSpecialty): Promise<Doctor[]>{
        
        return new Promise((resolve) => {

            const findByDoctorSpecialty = this.__doctorRepository.filter((d) => d.getEspecialty() === specilty);

            if(!findByDoctorSpecialty){
                throw new Error(`Cannot find doctor by specialty`);
            }

            resolve(findByDoctorSpecialty);
        });
    }

    findByEmail(email: string): Promise<Doctor | null>{

        return new Promise((resolve) => {

            const findDoctorByEmail = this.__doctorRepository.find((d) => d.getEmail() === email);

            if(!findDoctorByEmail){
                throw new Error(`Cannot find doctor by email`);
            }

            resolve(findDoctorByEmail);
        })
    }
}