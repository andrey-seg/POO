import { Doctor } from "../../models/Doctor";
import { DoctorSpecialty } from "../../enums/DoctorSpecialty";

describe("Doctor", () => {
    let doctor: Doctor;

    beforeEach(() => {
        doctor = new Doctor("Dr. Smith", "smith@clinic.com", DoctorSpecialty.CARDIOLOGY);
    });

    describe("Slots", () => {

        it("Should add slot successfully", () => {
            expect(doctor.addSlot("Horario marcado")).toBe(true);
        });

        it("Should remove slot successfully", () => {
            doctor.addSlot("Horario marcado");
            expect(doctor.removeSlot("Horario marcado")).toBe(true);
        });
    });

    describe("Doctor status manipulation", () => {
        
        it("Should thow when alredy activate doctor successfully", () => {
            expect(doctor.setActive()).toThrow();
        });

        it("Should deactivate doctor successfully", () => {
            expect(doctor.setDeactivate()).toBe(true);
        });
    });
});