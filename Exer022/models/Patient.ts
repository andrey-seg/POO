import { GenerateCustomId } from "../common/generateId";
import { PatientStatus } from "../enums/PatientStatus";
import { medicalRecord } from "./MedicalRecord";

export class Patient{

    private __id: string;
    private __name: string;
    private __email: string;
    private __phone: string;
    private __status: PatientStatus;
    private __medicalRecord: medicalRecord[];

    
}