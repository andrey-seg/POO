import { I_ApiResponse } from "../interfaces/ApiResponse";
import { Appointment } from "../models/Appointment";
import { Doctor } from "../models/Doctor";
import { Patient } from "../models/Patient";
import { AppointmentRepository } from "../repositories/AppointmentRepository";
import { DoctorRepository } from "../repositories/DoctorRepository";
import { PatientRepository } from "../repositories/PatientRepositoty";

export class HospitalServices{

    private __appointmentsRepository: AppointmentRepository;
    private __doctorRepository: DoctorRepository;
    private __patientRepository: PatientRepository;

    constructor(appointmentsRepository: AppointmentRepository, doctorRepository: DoctorRepository, patientRepository: PatientRepository){
        this.__appointmentsRepository = appointmentsRepository;
        this.__doctorRepository = doctorRepository;
        this.__patientRepository = patientRepository;
    };

    async registerDoctor(doctor: Doctor): Promise<I_ApiResponse<Doctor>>{

        try{
            const saved = await this.__doctorRepository.save(doctor);

            return{ success: true, data: doctor }

        }catch(error){
            return { success: false, error: (error as Error).message };
        }
    }

    async registerPatient(patient: Patient): Promise<I_ApiResponse<Patient>>{

        try{

            const saved = await this.__patientRepository.save(patient);

            return { success: true, data: patient };

        }catch(error){
            return { success: false, error: (error as Error).message };
        }
    }

    async scheduleAppointment(doctorId: string, patientId: string, slot: string): Promise<I_ApiResponse<Appointment>>{

        try{
        const findDoctor = await this.__doctorRepository.findById(doctorId);
        const findPatient = await this.__patientRepository.findById(patientId);

        if(!findDoctor || !findPatient){
            return { success: false, error: `Patient or doctor not found` };
        }

        if(!findDoctor.isAvailable(slot)){
            return { success: false, error: `Doctor Slot not found `};
        }

        findDoctor.removeSlot(slot);

        const appointment = new Appointment(`Apt-${Date.now()}`, findDoctor, findPatient, slot, "");
        const saved = await this.__appointmentsRepository.save(appointment);

        return { success: true, data: saved }

    }catch(error){
        return { success: false, error: (error as Error).message };
    }
    }

    async confirmAppointment(appointmentId: string): Promise<I_ApiResponse<Appointment>>{

        try{
            const findAppointment = await this.__appointmentsRepository.findById(appointmentId);

            if(!findAppointment){
                return { success: false, error: `Appointment not found`};
            }
            
            findAppointment.confirm();

            const saved = await this.__appointmentsRepository.save(findAppointment);

            return { success: true, data: saved };

        }catch(error){
            return { success: false, error: (error as Error).message };
        }
    }

    async completeAppointment(appointmentId:string, notes: string): Promise<I_ApiResponse<Appointment>>{

        try{
            const findAppointment = await this.__appointmentsRepository.findById(appointmentId);

            if(!findAppointment){
                return { success: false, error: `Appointment not found` }; 
            }

            findAppointment.complete(notes);

            const saved = await this.__appointmentsRepository.save(findAppointment);

            return { success: true, data: saved };

        }catch(error){
            return { success: false, error: (error as Error).message };
        }
    }

    async cancelAppointment(appointmentId: string): Promise<I_ApiResponse<Appointment>>{

        try{
            
            const findAppointment = await this.__appointmentsRepository.findById(appointmentId);

            if(!findAppointment){
                return { success: false, error: `Appointment not found`};
            }

            findAppointment.cancel();
            findAppointment.getDoctor().addSlot(findAppointment.getSlot());

            const saved = await this.__appointmentsRepository.save(findAppointment);
            return { success: true, data: saved };

        }catch(error){
            return { success: false, error: (error as Error).message };
        }
    }

    async getDoctorSchedule(doctorId: string): Promise<I_ApiResponse<Appointment[]>>{
         
        try{

            const findDoctor = await this.__appointmentsRepository.findByDoctor(doctorId);

            if(!findDoctor){
                return { success: false, error: `Doctor not found.`};
            }

            return { success: true, data: findDoctor };
        }catch(error){
            return { success: false, error: (error as Error).message };
        }
    }

    async getPatientHistory(patientId: string): Promise<I_ApiResponse<Appointment[]>>{

        try{

            const findPatient = await this.__appointmentsRepository.findByPatient(patientId);

            if(!findPatient){
                return { success: false, error: `Patient not found.`};
            }

            return { success: true, data: findPatient };
        }catch(error){
            return {success: false, error: (error as Error).message };
        }
    }

    toString():string {
        return `Appointments Repository => ${this.__appointmentsRepository} | Doctor Repository => ${this.__doctorRepository} | Patient Repository => ${this.__patientRepository}`;
    }

    getAppointmentsRepository(){
        return this.__appointmentsRepository;
    }

    getDoctorRepository(){
        return this.__doctorRepository;
    }

    getPatientRepository(){
        return this.__patientRepository;
    }
}