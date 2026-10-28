import { GenerateCustomId } from "../common/generateId";
import { Doctor } from "./Doctor";
import { Patient } from "./Patient";
import { AppointmentStatus } from "../enums/AppointmentStatus";

export class Appointment{

    private __id: string;
    private __doctor: Doctor;
    private __patient: Patient;
    private __slot: string;
    private __status?: AppointmentStatus;
    private __notes?: string[];
    private __createdAt: string;

    constructor(doctor: Doctor, patient: Patient, slot: string, status: AppointmentStatus.SCHEDULED){

        this.__id = GenerateCustomId(AppointmentStatus);
        this.__doctor = doctor;
        this.__patient = patient;
        this.__slot = slot;
        this.__status = status;
        this.__notes = [];
        this.__createdAt = new Date().toISOString();
    }

    confirm(): boolean{

        if(this.__status === AppointmentStatus.CONFIRMED){
            throw new Error(`Status is alredy confirmed`);
        }

        this.__status = AppointmentStatus.CONFIRMED;
        return true;
    }

    complete(notes?: string): boolean{

        if(this.__status === AppointmentStatus.CONFIRMED){
            throw new Error(`Appointement alredy confirmed`);
        }

        if(notes !== undefined){
            this.__notes!.push(notes);
        }
        return true;
    }

    cancel(): boolean{

        if(this.__status === AppointmentStatus.CANCELLED){
            throw new Error(`Appointement is alredy cancelled`)
        }

        this.__status = AppointmentStatus.CANCELLED;
        return true;
    }

    markNoShow(): boolean{

        if(this.__status === AppointmentStatus.NO_SHOW){
            throw new Error(`Status alredy marked as no show`);
        }

        this.__status = AppointmentStatus.NO_SHOW;
        return true;
    }

    toString(): string{

        return `Id: ${this.__id} | doctor: ${this.__doctor} | Patient: ${this.__patient} | Slot: ${this.__slot} | status: ${this.__status} | Notes: ${this.__notes} | createdAt: ${this.__createdAt}`;
    }

    getId(): string{
        return this.__id;
    }

    getDoctor(): Doctor{
        return this.__doctor;
    }

    getPatient(): Patient{
        return this.__patient;
    }

    getStatus(): AppointmentStatus{
        return this.__status!;
    }

    getSlot(): string[]{
        return this.__notes!;
    }

    getCreatedAt(): string{
        return this.__createdAt;
    }
}