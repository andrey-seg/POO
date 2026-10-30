import { Patient } from "../../models/Patient";
import { PatientStatus } from "../../enums/PatientStatus";
import { MedicalRecord } from "../../models/MedicalRecord";
import { Doctor } from "../../models/Doctor";
import { DoctorSpecialty } from "../../enums/DoctorSpecialty";

describe("Patient", () => {
    let patient: Patient;
    let doctor: Doctor;
    let medicalRecord: MedicalRecord;

    beforeEach(() => {
        doctor = new Doctor("Dr. Smith", "smith@clinic.com", DoctorSpecialty.CARDIOLOGY);
        patient = new Patient("Pacient 0", "e-mailDoMal@email.com", "(67)9999-9911");
    });

    describe("addMEdicalRecord", () => {

        it("should add medical record successfully", () => {
            patient.addMedicalRecord(patient.getId(), doctor.getId(), "Febre", "dipirona");
            expect(patient.getMedicalRecord()).toHaveLength(1);
        });

        it("should store diagnosis and prescription correctly", () => {
            patient.addMedicalRecord(patient.getId(), doctor.getId(), "Febre", "dipirona");
            
            const record = patient.getMedicalRecord()[0];
            expect(record.getDiagnosis()).toBe("Febre");
            expect(record.getPrescription()).toBe("dipirona");
        });
    });

    describe("block", () => {
    
        it("should block patient successfully", () => {
            patient.block();
            expect(patient.getStatus()).toBe(PatientStatus.BLOCKED);
        });

        it("should throw error when blocking an already blocked patient", () => {
            patient.block();
            expect(patient.block()).toThrow();
        });
    });

    describe("IsActive", () => {

        it("should return true for a new patient", () => {
            expect(patient.isActive).toBe(true);
        });

        it("should return false when block", () => {
            patient.block();
            expect(patient.isActive()).toBe(false);
        });
    });

    describe("active", () => {

        it("should activate a blocked patient successfully", () => {
            patient.block();
            expect(patient.activate()).toBe(PatientStatus.ACTIVE);
        });

        it("should throw error when activating an already active patient", () => {
            expect(patient.activate()).toThrow();
        });
    });
});
