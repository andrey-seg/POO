import { Appointment } from "../../models/Appointment";
import { Doctor } from "../../models/Doctor";
import { Patient } from "../../models/Patient";
import { AppointmentStatus } from "../../enums/AppointmentStatus";
import { DoctorSpecialty } from "../../enums/DoctorSpecialty";

describe("Appointment", () => {
    let appointement: Appointment;
    let doctor: Doctor;
    let patient: Patient;

    beforeEach(() => {
        doctor = new Doctor("Dr. Smith", "smith@clinic.com", DoctorSpecialty.CARDIOLOGY);
        patient = new Patient("Alice", "alice@email.com", "11999999999");
        appointement = new Appointment(doctor, patient, "terça-feira 09:00", AppointmentStatus.NO_SHEDULED);
    });

    describe(confirm, () => {

        it("should confirm appointment successfully", () => {
            appointement.confirm();
            expect(appointement.getStatus()).toBe(AppointmentStatus.CONFIRMED);
        });

        it("should throw error when confirming an already confirmed appointment", () => {
            appointement.confirm();
            expect(appointement.complete()).toThrow();
        });

        it("should throw error when confirming a cancelled appointment", () => {
            appointement.cancel();
            expect(appointement.complete()).toThrow();
        });
    });

    describe("Complete", () => {
        
        it("should complete appointment with notes", () => {
            appointement.confirm();
            appointement.complete("Paciente está vivo.");

            expect(appointement.getStatus()).toBe(AppointmentStatus.COMPLETED);
            expect(appointement.getNotes()).toBe("Patient in good health"); //Pode causar erro por não retornar lista? sla
        });

        it("should throw error when completing a non-confirmed appointment", () => {
            expect(() => appointement.complete("Anotação")).toThrow();
        });
    });

    describe("cancel", () => {
        
        it("should cancel appointment successfully", () => {
            appointement.cancel();
            expect(appointement.getStatus()).toBe(AppointmentStatus.CANCELLED);
        });

        it("should throw error when cancelling a completed appointment", () => {
            appointement.confirm();
            appointement.complete("anotação");
            expect(() => appointement.cancel()).toThrow();
        });
    });

    describe("markNoShow", () => {

        it("should mark no show successfully", () => {
            appointement.confirm();
            appointement.markNoShow();
            expect(appointement.getStatus()).toThrow();
        });

        it("should throw error when marking no show on non-confirmed appointment", () => {
            expect(() => appointement.markNoShow()).toThrow();
        })
    })
})