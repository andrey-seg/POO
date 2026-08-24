import { AppointmentRepository } from "../repositories/AppointmentRepository";
import { DoctorRepository } from "../repositories/DoctorRepository";
import { PatientRepository } from "../repositories/PatientRepositoty";

export class HospitalServices{

    private __appointmentsRepository: AppointmentRepository;
    private __doctorRepository: DoctorRepository;
    private __patientRepository: PatientRepository;

    constructor(appointmentsRepository: AppointmentRepository, doctorRepository: DoctorRepository, patientRepository: PatientRepository){
        this.__appointmentsRepository = appointmentsRepository;
        this.__doctorRepository = doctorRepository;
        this.__patientRepository = patientRepository;
    };


}