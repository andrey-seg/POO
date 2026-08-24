import { Repository } from "../interfaces/Repository";
import { Appointment } from "../models/Appointment";

export class AppointmentRepository implements Repository<Appointment>{

    private __appointmetsList: Appointment[] = [];

    findById(id: string): Promise<Appointment | null> {
        
        return new Promise((resolve) => {

            setTimeout(() => {

                const appointment = this.__appointmetsList.find(a => a.getId() === id);
                resolve(appointment ?? null);

            }, 100);
        });
    };

    findAll(): Promise<Appointment[]> {
        
        return new Promise((resolve) => {

            setTimeout(() => {
                
                resolve(this.__appointmetsList);
            }, 100);
        });
    };

    save(entity: Appointment): Promise<Appointment> {
        
        return new Promise((resolve) => {

            setTimeout(() => {

                this.__appointmetsList.push(entity);

                resolve(entity);

                return;

            }, 100);
        });
    };

    delete(id: string): Promise<boolean> {
        
        return new Promise((resolve) => {

            setTimeout(() => {

                const findAppointmentId = this.__appointmetsList.findIndex(p => p.getId() === id);

                if(findAppointmentId === -1){
                    resolve(false);
                    return;
                };

                this.__appointmetsList.splice(findAppointmentId, 1);
                resolve(true);
                return;

            }, 100);
        });
    };

    findByDoctor(doctorId: string): Promise<Appointment[]>{

        return new Promise((resolve) => {

            setTimeout(() => {
                
                const appointments = this.__appointmetsList.filter(a => a.getDoctor().getId() === doctorId);
                resolve(appointments)

            }, 100);
        })
    };

    findByPatient(patientId: string): Promise<Appointment[]>{

        return new Promise((resolve) => {

            setTimeout(() => {

                const appointment = this.__appointmetsList.filter((a => a.getPatient().getId() === patientId));
                resolve(appointment);

            }, 100)
        })
    };
};

