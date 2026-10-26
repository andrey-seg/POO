import { Doctor } from "../models/Doctor";
import { IApiResponse } from "../interfaces/ApiResponse";
import { DoctorRepository } from "../repositories/DoctorRepository";
import { DoctorSpecialty } from "../enums/DoctorSpecialty"; 

export class DoctorService{

    constructor(private __doctorRepository: DoctorRepository){};

    async registerDoctor(name: string, email: string, specialty: DoctorSpecialty): Promise<IApiResponse<Doctor>>{

        try{
            
            const doctorExist = await this.__doctorRepository.findByEmail(email);

            if(doctorExist){
                return { success: false, error: `Doctor alredy exist.`};
            }

            const newDoctor = new Doctor(
                name,
                email,
                specialty
            );

            const saved = await this.__doctorRepository.save(newDoctor);

            return{ success: true, data: saved };
        }catch(error){
            return { success: false, error: (error as Error).message };
        }
    }

    async addSlot(doctorId: string, slot: string): Promise<IApiResponse<Doctor>>{

        try{

            const findDoctorById = await this.__doctorRepository.findById(doctorId);

            if(!findDoctorById){
                return { success: false, error: `Cannot find doctor.`};
            }

            findDoctorById.addSlot(slot);
            return{ success: true, data: findDoctorById };
        }catch(error){
            return { success: false, error: (error as Error).message };
        }
    }

    async removeSlot(doctorId: string, slot: string): Promise<IApiResponse<Doctor>>{

        try{

            const findDoctorById = await this.__doctorRepository.findById(doctorId);

            if(!findDoctorById){
                return { success: false, error: `Cannot find doctor by id`};
            }

            findDoctorById.removeSlot(slot);
            return { success: true, data: findDoctorById };
        }catch(error){
            return { success: false, error: (error as Error).message };
        }
    }

    async getBySpecialty(specialty: DoctorSpecialty): Promise<IApiResponse<Doctor[]>>{

        try{

            const findDoctorsBySpecialty = await this.__doctorRepository.findBySpecialty(specialty);

            if(!findDoctorsBySpecialty){
                return { success: false, error: `Cannot find doctors`};
            }

            return{ success: true, data: findDoctorsBySpecialty };
        }catch(error){
            return{ success: false, error: (error as Error).message };
        }
    }

    async deactivateDoctor(doctorId: string): Promise<IApiResponse<Doctor>>{

        try{

            const findDoctorById = await this.__doctorRepository.findById(doctorId);

            if(!findDoctorById){
                return{ success: false, error: `Cannot find Doctor by Id`};
            }

            findDoctorById.setDeactivate();
            return{ success: true, data: findDoctorById };
        }catch(error){
            return{ success: false, error: (error as Error).message };
        }
    }
}