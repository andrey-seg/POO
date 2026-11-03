import { AppointmentService } from "../../services/AppointmentService";
import { Appointment } from "../../models/Appointment";
import { Doctor } from "../../models/Doctor";
import { Patient } from "../../models/Patient";
import { AppointmentStatus } from "../../enums/AppointmentStatus";
import { DoctorSpecialty } from "../../enums/DoctorSpecialty";

const mockAppointmentRepository = {
    findById: jest.fn(),
    findAll: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    findByDoctor: jest.fn(),
    findByPatient: jest.fn(),
    findByStatus: jest.fn()
};

const mockDoctorRepository = {
    findById: jest.fn(),
    findAll: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    findBySpecialty: jest.fn(),
    findByEmail: jest.fn()
};

const mockPatientRepository = {
    findById: jest.fn(),
    findAll: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    findByEmail: jest.fn(),
    findByStatus: jest.fn()
};

describe("AppointmentService", () => {

    let service: AppointmentService;
    let doctor: Doctor;
    let patient: Patient;

    beforeEach(() => {
        jest.clearAllMocks();

        service = new AppointmentService(
            {
                appointmentRepository: mockAppointmentRepository,
                doctorRepository: mockDoctorRepository,
                patientRepository: mockPatientRepository
            } as any
        );

        doctor = new Doctor("Dr. Smith", "smith@clinic.com", DoctorSpecialty.CARDIOLOGY);
        doctor.addSlot("09:00");
        patient = new Patient("Alice", "alice@email.com", "11999999999");

        mockAppointmentRepository.save.mockImplementation((a: Appointment) => Promise.resolve(a));
    });

    describe("scheduleAppointment", () => {

        it("should schedule appointment successfully", async () => {
            // ARRANGE
            mockDoctorRepository.findById.mockResolvedValue(doctor);
            mockPatientRepository.findById.mockResolvedValue(patient);

            // ACT
            const result = await service.scheduleAppointment(doctor.getId(), patient.getId(), "09:00");

            // ASSERT
            expect(result.success).toBe(true);
            expect(result.data?.getStatus()).toBe(AppointmentStatus.SCHEDULED);
            expect(mockAppointmentRepository.save).toHaveBeenCalledTimes(1);
        });

        it("should return error when doctor not available", async () => {
            // ARRANGE — slot "10:00" não existe no médico
            mockDoctorRepository.findById.mockResolvedValue(doctor);
            mockPatientRepository.findById.mockResolvedValue(patient);

            // ACT
            const result = await service.scheduleAppointment(doctor.getId(), patient.getId(), "10:00");

            // ASSERT
            expect(result.success).toBe(false);
            expect(mockAppointmentRepository.save).not.toHaveBeenCalled();
        });

        it("should return error when patient is blocked", async () => {
            // ARRANGE
            patient.block();
            mockDoctorRepository.findById.mockResolvedValue(doctor);
            mockPatientRepository.findById.mockResolvedValue(patient);

            // ACT
            const result = await service.scheduleAppointment(doctor.getId(), patient.getId(), "09:00");

            // ASSERT
            expect(result.success).toBe(false);
            expect(mockAppointmentRepository.save).not.toHaveBeenCalled();
        });

        it("should return error when doctor or patient not found", async () => {
            // ARRANGE
            mockDoctorRepository.findById.mockResolvedValue(null);
            mockPatientRepository.findById.mockResolvedValue(patient);

            // ACT
            const result = await service.scheduleAppointment("invalid", patient.getId(), "09:00");

            // ASSERT
            expect(result.success).toBe(false);
        });
    });

    describe("confirmAppointment", () => {

        it("should confirm appointment successfully", async () => {
            // ARRANGE
            const appointment = new Appointment(doctor, patient, "09:00");
            mockAppointmentRepository.findById.mockResolvedValue(appointment);

            // ACT
            const result = await service.confirmAppointment(appointment.getId());

            // ASSERT
            expect(result.success).toBe(true);
            expect(result.data?.getStatus()).toBe(AppointmentStatus.CONFIRMED);
        });

        it("should return error when appointment not found", async () => {
            // ARRANGE
            mockAppointmentRepository.findById.mockResolvedValue(null);

            // ACT
            const result = await service.confirmAppointment("invalid-id");

            // ASSERT
            expect(result.success).toBe(false);
        });
    });

    describe("completeAppointment", () => {

        it("should complete appointment with notes", async () => {
            // ARRANGE
            const appointment = new Appointment(doctor, patient, "09:00");
            appointment.confirm();
            mockAppointmentRepository.findById.mockResolvedValue(appointment);

            // ACT
            const result = await service.completeAppointment(appointment.getId(), "All good");

            // ASSERT
            expect(result.success).toBe(true);
            expect(result.data?.getStatus()).toBe(AppointmentStatus.COMPLETED);
            expect(result.data?.getNotes()).toBe("All good");
        });
    });

    describe("markNoShow", () => {

        it("should mark no show", async () => {
            // ARRANGE
            const appointment = new Appointment(doctor, patient, "09:00");
            appointment.confirm();
            mockAppointmentRepository.findById.mockResolvedValue(appointment);

            // ACT
            const result = await service.markNoShow(appointment.getId());

            // ASSERT
            expect(result.success).toBe(true);
            expect(result.data?.getStatus()).toBe(AppointmentStatus.NO_SHOW);
        });
    });
});