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
    private __notes?: string;
    private __createdAt: string;

    constructor(doctor: Doctor, patient: Patient, slot: string){

        this.__id = GenerateCustomId(AppointmentStatus);
        this.__doctor = doctor;
        this.__patient = patient;
        this.__slot = slot;
        this.__status = AppointmentStatus.SCHEDULED;
        this.__notes = "";
        this.__createdAt = new Date().toISOString();
    }

    confirm(): void {
        if(this.__status !== AppointmentStatus.SCHEDULED){
            throw new Error("Only scheduled appointments can be confirmed.");
        }
        
        this.__status = AppointmentStatus.CONFIRMED;
    }

    complete(notes: string): void {
    if(this.__status !== AppointmentStatus.CONFIRMED){
        throw new Error("Only confirmed appointments can be completed.");
    }

    this.__notes = notes;
    this.__status = AppointmentStatus.COMPLETED;
    }

    cancel(): void {

        if(this.__status === AppointmentStatus.COMPLETED){
            throw new Error("Cannot cancel a completed appointment.");
        }

        if(this.__status === AppointmentStatus.CANCELLED){
            throw new Error("Appointment is already cancelled.");
        }

        this.__status = AppointmentStatus.CANCELLED;
    }

    markNoShow(): void {

        if(this.__status !== AppointmentStatus.CONFIRMED){
            throw new Error("Only confirmed appointments can be marked as no show.");
        }

        this.__status = AppointmentStatus.NO_SHOW;
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

    getNotes(): string{
        return this.__notes;
    }

    getSlot(): string{
        return this.__slot;
    }

    getCreatedAt(): string{
        return this.__createdAt;
    }
}