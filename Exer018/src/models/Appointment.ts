import { AppointmentStatus } from "../enums/AppointmentsStatus";
import { Doctor } from "./Doctor";
import { Patient } from "./Patient";

export class Appointment{

    private __id: string;
    private __doctor: Doctor;
    private __patient: Patient;
    private __slot: string;
    private __status: AppointmentStatus;
    private __notes: string;
    private __createdAt: string;

    constructor(id: string, doctor: Doctor, patient: Patient, slot: string, notes: string){

        this.__id = id;
        this.__doctor = doctor;
        this.__patient = patient;
        this.__slot = slot;
        this.__status = AppointmentStatus.SCHEDULED;
        this.__notes = notes;
        this.__createdAt = new Date().toISOString();

    };

    confirm(): void{

        if(this.__status === AppointmentStatus.CANCELLED){
            throw new Error(`Appoiment alredy cancelled`);
        };

        if(this.__status === AppointmentStatus.CONFIRMED){
            throw new Error(`Appointment alredy confirmed`);
        };

        this.__status = AppointmentStatus.CONFIRMED;
    };

    complete(notes: string): void{
    
        if(this.__status === AppointmentStatus.CANCELLED){
            throw new Error(`Appoiment alredy cancelled`);
        };

        if(this.__status === AppointmentStatus.COMPLETED){
            throw new Error(`Appoinment alredy complete`);
        };

        this.__notes = notes;
        this.__status = AppointmentStatus.COMPLETED;
    };

    cancel(): void{

        if(this.__status === AppointmentStatus.CANCELLED){
            throw new Error(`Appoiment alredy cancelled`);
        };

        if(this.__status === AppointmentStatus.COMPLETED){
            throw new Error(`Appoinment alredy complete`);
        };

        this.__status = AppointmentStatus.CANCELLED;
    };

    toString(): string{
        return `ID => ${this.__id} | Doctor => ${this.__doctor} | Patient => ${this.__patient} | Slot => ${this.__slot} | Status => ${this.__status} | Notes => ${this.__notes} | Create at => ${this.__createdAt}`;
    };

    getId(): string{
        return this.__id;
    };

    getDoctor(): Doctor{
        return this.__doctor;
    };

    getPatient(): Patient{
        return this.__patient;
    };

    getSlot(): string{
        return this.__slot;
    };

    getStatus(): AppointmentStatus{
        return this.__status;
    };

    getNotes(): string{
        return this.__notes;
    };

    getCreateAt(): string{
        return this.__createdAt;
    };
};