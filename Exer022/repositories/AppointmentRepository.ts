import { AppointmentStatus } from "../enums/AppointmentStatus";
import { IRepository } from "../interfaces/Repository";
import { Appointment } from "../models/Appointment";

export class AppointmentRepository implements IRepository<Appointment>{

    private __appointmentRepository: Appointment[] = [];

    findAll(): Promise<Appointment[]> {
        
        return new Promise((resolve) => {
            resolve(this.__appointmentRepository);
        });
    }

    findById(id: string): Promise<Appointment | null> {
        
        return new Promise((resolve) => {

            const findAppointmentById = this.__appointmentRepository.find((p) => p.getId() === id);

            if(!findAppointmentById){
                resolve(null);
                return;
            }

            resolve(findAppointmentById);
            return;
        });
    }

    save(entity: Appointment): Promise<Appointment> {
        
        return new Promise((resolve) => {

            this.__appointmentRepository.push(entity);
            resolve(entity);
            return;
        });
    }

    delete(id: string): Promise<boolean> {
        
        return new Promise((resolve) => {

            const findAppointmentIndexById = this.__appointmentRepository.findIndex((a) => a.getId() === id);

            if(findAppointmentIndexById === -1){
                resolve(false);
                return;
            }

            this.__appointmentRepository.splice(findAppointmentIndexById);
            resolve(true);
            return;
        });
    }

    findByDoctor(doctorId: string): Promise<Appointment[]>{

        return new Promise((resolve) => {

            const findDoctorById = this.__appointmentRepository.filter((a) => a.getDoctor().getId() === doctorId);

            if(findDoctorById.length === -1){
                resolve(this.__appointmentRepository);
                console.log(`Cannot find doctor appointment`);
                return;
            }

            resolve(findDoctorById);
            return;
        });
    }

    findByPatient(patientId: string): Promise<Appointment[]>{

        return new Promise((resolve) => {

            const findPatientById = this.__appointmentRepository.filter((p) => p.getPatient().getId() === patientId);

            if(findPatientById.length === -1){
                resolve(findPatientById);
                console.log(`Cannot find patient appointment.`);
                return;
            }

            resolve(findPatientById);
            return;
        });
    }

    findByStatus(status: AppointmentStatus): Promise<Appointment[]>{

        return new Promise((resolve) => {

            const findByStatus = this.__appointmentRepository.filter((a) => a.getStatus() === status);

            if(findByStatus.length === -1){
                resolve(findByStatus);
                console.log(`Cannot find appointments by status.`);
                return;
            }

            resolve(findByStatus);
            return;
        });
    }
}