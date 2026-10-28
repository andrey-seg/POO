import { AppointmentStatus } from "../enums/AppointmentStatus";
import { IApiResponse } from "../interfaces/ApiResponse";
import { Appointment } from "../models/Appointment";
import { Doctor } from "../models/Doctor";
import { Patient } from "../models/Patient";
import { AppointmentRepository } from "../repositories/AppointmentRepository";

export class AppointmentService{

    constructor(private __appointmentRepository: AppointmentRepository){};

    async scheduleAppointment(doctorId: string, patientId: string, slot: string): Promise<IApiResponse<Appointment>>{

        try{
            
           const findDoctorById = await this.__appointmentRepository.findByDoctor(doctorId) as unknown as Doctor;
           const findPatientById = await this.__appointmentRepository.findByPatient(patientId) as unknown as Patient;

           if(!findDoctorById || !findPatientById){
                return{ success: false, error: `Cannot find doctor or patient` };
           }

            const newAppointment = new Appointment(
                findDoctorById,
                findPatientById,
                slot,
                AppointmentStatus.SCHEDULED
            );

            this.__appointmentRepository.save(newAppointment);
            return{ success: true, data: newAppointment };
        }catch(error){
            return{ success: true, error: (error as Error).message };
        }
    }

    async confirmAppointment(appointementId: string): Promise<IApiResponse<Appointment>>{

        try{

            const findAppointmentById = await this.__appointmentRepository.findById(appointementId);

            if(!findAppointmentById){
                return{ success: true, error: `Cannot find appointment.` };
            }

            findAppointmentById.confirm();
            return{ success: true, data: findAppointmentById };
        }catch(error){
            return{ success: false, error: (error as Error).message };
        }
    }

    async completeAppointment(appointementId: string, notes: string): Promise<IApiResponse<Appointment>>{

        try{

            const findAppointmentById = await this.__appointmentRepository.findById(appointementId);

            if(!findAppointmentById){
                return{ success: false, error: `Cannot find appointment.` };
            }

            findAppointmentById.complete(notes);
            return{ success: true, data: findAppointmentById };
        }catch(error){
            return{ success: false, error: (error as Error).message };
        }
    }

    async cancelAppointment(appointementId: string): Promise<IApiResponse<Appointment>>{

        try{

            const findAppointmentById = await this.__appointmentRepository.findById(appointementId);

            if(!findAppointmentById){
                return{ success: false, error: `Cannot find appointment` };
            }

            findAppointmentById.cancel();
            return{ success: true, data: findAppointmentById };
        }catch(error){
            return{ success: false, error: (error as Error).message };
        }
    }

    async markNoShow(appointementId: string): Promise<IApiResponse<Appointment>>{

        try{

            const findAppointmentById = await this.__appointmentRepository.findById(appointementId);

            if(!findAppointmentById){
                return{ success: false, error: `Cannot find appointment` };
            }

            findAppointmentById.markNoShow();
            return{ success: true, data: findAppointmentById };
        }catch(error){
            return{ success: false, error: (error as Error).message };
        }
    }

    async getDoctorSchedule(doctorId: string): Promise<IApiResponse<Appointment[]>>{

        try{

            const appointment = await this.__appointmentRepository.findByDoctor(doctorId);

            if(appointment.length === -1){
                return{ success: false, error: `Cannot find appointments.` };
            }

            return{ success: true, data: appointment };
        }catch(error){
            return{ success: false, error: (error as Error).message };
        }
    }

    async getPatientHistory(patientId: string): Promise<IApiResponse<Appointment[]>>{

        try{

            const history = await this.__appointmentRepository.findByPatient(patientId);

            if(history.length === -1){
                return{ success: false, error: `Cannot find patient history` };
            }

            return{ success: true, data: history };
        }catch(error){
            return{ success: false, error: (error as Error).message };
        }
    }
}