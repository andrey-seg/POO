import { DoctorService } from "../../services/DoctorService";
import { Doctor } from "../../models/Doctor";
import { DoctorSpecialty } from "../../enums/DoctorSpecialty";

const mockDoctorRepository = {
    findById: jest.fn(),
    findAll: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    findBySpecialty: jest.fn(),
    findByEmail: jest.fn()
}

describe("DoctorService", () => {

    let doctorService: DoctorService;

    beforeEach(() => {
        jest.clearAllMocks();
        doctorService = new DoctorService(mockDoctorRepository as any);
    });

    describe("Register Doctor", () => {
        
        it("should register doctor successfully", async () => {
            mockDoctorRepository.findByEmail.mockResolvedValue(null);

            mockDoctorRepository.save.mockImplementation((d: Doctor) => Promise.resolve(d));

            const result = await doctorService.registerDoctor("Dr. Smith", "smith@clinic.com", DoctorSpecialty.CARDIOLOGY);

            expect(result.success).toBe(true);
            expect(result.data.getName()).toBe("Dr. Smith");
            expect(mockDoctorRepository.save).toHaveBeenCalledTimes(1);
        });

        it("should return error for duplicate email", async () => {
            const existingEmail = new Doctor("Dr. Smith", "smith@clinic.com", DoctorSpecialty.CARDIOLOGY);
            mockDoctorRepository.findByEmail.mockResolvedValue(existingEmail);

            const result = await doctorService.registerDoctor("Dr. Jones", "smith@clinic.com", DoctorSpecialty.CARDIOLOGY);

            expect(result.success).toBe(false);
            expect(mockDoctorRepository.save).not.toHaveBeenCalled();
        });
    });

    describe("AddSlot", () => {
        it("should add a slot successfully", async () => {
            const doctor = new Doctor("Dr. Smith", "smith@clinic.com", DoctorSpecialty.CARDIOLOGY);
            mockDoctorRepository.findById.mockResolvedValue(doctor);
            mockDoctorRepository.save.mockImplementation((d: Doctor) => Promise.resolve(d));

            const result = await doctorService.addSlot(doctor.getId(), "09:00");

            expect(result.success).toBe(true);
        });

        it("should return error when slot alredy exist", async () => {
            const doctor = new Doctor("Dr. Smith", "smith@clinic.com", DoctorSpecialty.CARDIOLOGY);
            doctor.addSlot("09:00");

            const result = await doctor.addSlot("09:00");

            expect(result).toBe(false);
            expect(mockDoctorRepository.save).not.toHaveBeenCalled();
        });

        it("should return error when doctor not found", async () => {
            // ARRANGE
            mockDoctorRepository.findById.mockResolvedValue(null);

            // ACT
            const result = await doctorService.addSlot("invalid-id", "09:00");

            // ASSERT
            expect(result.success).toBe(false);
        });
    });

    describe("getBySpecialty", () => {

        it("should get doctors by specialty", async () => {
            // ARRANGE
            const doctors = [
                new Doctor("Dr. Smith", "smith@clinic.com", DoctorSpecialty.CARDIOLOGY),
                new Doctor("Dr. Jones", "jones@clinic.com", DoctorSpecialty.CARDIOLOGY)
            ];
            mockDoctorRepository.findBySpecialty.mockResolvedValue(doctors);

            // ACT
            const result = await doctorService.getBySpecialty(DoctorSpecialty.CARDIOLOGY);

            // ASSERT
            expect(result.success).toBe(true);
            expect(result.data).toHaveLength(2);
        });
    });
});

