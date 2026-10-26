import { PatientRepository } from "../repositories/PatientRepository";
import { IApiResponse } from "../interfaces/ApiResponse";
import { Patient } from "../models/Patient";
import { PatientStatus } from "../enums/PatientStatus";

export class PatientService{

    constructor(private __patientRepository: PatientRepository){};

    async registerPatient(name: string, email: string, phone: string, status: PatientStatus): Promise<IApiResponse<Patient>>{

        try{

            const findPatientByEmail = await this.__patientRepository.findByPatientEmail(email);

            if(findPatientByEmail){
                return{ success: false, error: `Patient alredy exist` };
            }

            const newPatient = new Patient(
                name,
                email,
                phone,
                status
            );

            const saved = await this.__patientRepository.save(newPatient);
            return{ success: true, data: saved };
        }catch(error){
            return{ success: false, error: (error as Error).message };
        }
    }

    async addMedicalRecord(patientId: string, doctorId: string, diagnosis: string, prescription: string): Promise<IApiResponse<Patient>>{

        try{

            const medicaalRecord = await this.__patientRepository.findById(patientId);

            if(!medicaalRecord){
                return{ success: false, error: `Cannot find doctor.` };
            }

            medicaalRecord?.addMedicalRecord(patientId, doctorId, diagnosis, prescription);
            return{ success: true, data: medicaalRecord };
        }catch(error){
            return{ success: false, error: (error as Error).message };
        }
    }
}