interface I_ApiResponse<T>{
    sucess: boolean,
    data?: T,
    error?: string;
};

enum E_AppointmentStatus{
    SCHEDULED,
    CONFIRMED,
    COMPLETED,
    CANCELLED
};

enum E_Specialty{
    CARDIOLOGY,
    DERMATOLOGY,
    ORTHOPEDICS,
    GENERAL
};

class Doctor{
    private __id: string;
    private __name: string;
    private __specialty: E_Specialty;
    private __availableSlots: string[];

    constructor(id: string, name: string, specialty: E_Specialty){
        this.__id = id;
        this.__name = name;
        this.__specialty = specialty;
        this.__availableSlots = [];
    };

    addSlot(slot: string): void{
        if(this.__availableSlots.includes(slot)){
            throw new Error(`Slot alredy exist`);
        };
        this.__availableSlots.push(slot);
    };

    removeSlot(slot: string): void{
        if(!this.__availableSlots.includes(slot)){
            throw new Error(`Slot not found`);
        };

        this.__availableSlots = this.__availableSlots.filter(s => s !== slot);
    };

    isAvilable(slot: string): boolean{
       return this.__availableSlots.includes(slot);
    };

    toString(): string{
        return `ID => ${this.__id} | Name => ${this.__name} | Especialty => ${this.__specialty} | AvailableSlot => ${this.__availableSlots}.`;
    };

    getID(){
        return this.__id;
    };

    getName(){
        return this.__name;
    };

    getEspecialty(){
        return this.__specialty;
    };

    getAvailableSlot(){
        return this.__availableSlots;
    };
};

class Patient{
    private __id: string;
    private __name: string;
    private __email: string;
    private __birthDate: string;

    constructor(id: string, name: string, email: string, birthDate: string){
        this.__id = id;
        this.__name = name;
        this.__email = email;
        this.__birthDate = birthDate;
    };

    toString(): string{
        return `ID => ${this.__id} | Name => ${this.__name} | Email => ${this.__email} | BirthDate => ${this.__birthDate}.`;
    };

    getId(){
        return this.__id;
    };

    getName(){
        return this.__name;
    };

    getEmail(){
        return this.__email;
    };

    getBirthDate(){
        return this.__birthDate;
    };
};

class Appointment{
    private __id: string;
    private __doctor: Doctor;
    private __patient: Patient;
    private __slot: string;
    private __status: E_AppointmentStatus;
    private __createdAt: string;

    constructor(id: string, doctor: Doctor, patient: Patient, slot: string){
        this.__id = id;
        this.__doctor = doctor;
        this.__patient = patient;
        this.__slot = slot;
        this.__status = E_AppointmentStatus.SCHEDULED
        this.__createdAt = new Date().toISOString();

    };

    confirm(): string{
        if(this.__status === E_AppointmentStatus.CANCELLED || this.__status === E_AppointmentStatus.CONFIRMED){
            throw new Error(`Appointment cancelled or alredy confirmed`);
        };

        if(this.__status !== E_AppointmentStatus.SCHEDULED){
            throw new Error(`Appointment cannot be confirmed`);
        };

        this.__status = E_AppointmentStatus.CONFIRMED;
        return `Appointment confirmed`;
    };

    complete(): string{
        if(this.__status === E_AppointmentStatus.CANCELLED || this.__status === E_AppointmentStatus.COMPLETED){
            throw new Error(`Appointment cancelled alredy complete`);
        };

        this.__status = E_AppointmentStatus.COMPLETED;
        return `Appointment complete`;
    };

    cancel(){
        if(this.__status === E_AppointmentStatus.CANCELLED || this.__status === E_AppointmentStatus.COMPLETED){
            throw new Error(`Appointment alredy canceled or complete`);
        };

        this.__status = E_AppointmentStatus.CANCELLED;
    };

    toString(): string{
        return `Id => ${this.__id} | Doctor => ${this.__doctor} | Patient => ${this.__patient} | Slot => ${this.__slot} | Status => ${this.__status} | CreatedAt => ${this.__createdAt}.`;
    };

    getId(){
        return this.__id;
    };

    getDoctor(){
        return this.__doctor;
    };

    getPatient(){
        return this.__patient;
    };

    getSlot(){
        return this.__slot;
    };

    getStatus(){
        return this.__status;
    };

    getCreatedAt(){
        return this.__createdAt;
    };
};

class clinicService{
    private __doctors: Doctor[] = [];
    private __patients: Patient[] = [];
    private __appointment: Appointment[] = [];
    
    constructor(){
        this.__doctors = [];
        this.__patients = [];
        this.__appointment = [];
    };

    registerDoctor(doctor: Doctor): I_ApiResponse<Doctor>{
        const doctorAlredyRegister = this.__doctors.find(d => d.getID() === doctor.getID());

        if(doctorAlredyRegister){
            return {sucess: false, error: `Doctor alredy register`};
        };

        try{
            this.__doctors.push(doctor);
            return {sucess: true, data: doctor};
        }catch(error){
            return {sucess: false, error: (error as Error).message};
        };
    };

    registerPatient(patient: Patient): I_ApiResponse<Patient>{
        const patientAlredyRegister = this.__patients.find(p => p.getId() === patient.getId());

        if(patientAlredyRegister){
            return {sucess: false, error: `Patient alredy register`};
        };

        try{
            this.__patients.push(patient);
            return {sucess: true, data: patient};
        } catch(error){
            return {sucess: false, error: (error as Error).message};
        };
    };

    scheduleAppointment(doctorID: string, patientID: string, slot: string): I_ApiResponse<Appointment>{
        const doctorExist = this.__doctors.find(d => d.getID() === doctorID);
        const patientExist = this.__patients.find(p => p.getId() === patientID);
        const slotExist = this.__appointment.find(a => a.getSlot() === slot);

        if(!doctorExist || !patientExist){
            return {sucess:false, error: `Doctor ou patient not found.`};
        };

        if(slotExist){
            return {sucess: false, error: `Slot alredy booked`};
        };

        if(!doctorExist.isAvilable(slot)){
            return { sucess: false, error: `Slot not available`};
        };

        const id = `apt-${this.__appointment.length + 1}`;
        const newAppointment = new Appointment(id, doctorExist, patientExist, slot);

        doctorExist.removeSlot(slot);
        this.__appointment.push(newAppointment);
        return {sucess: true, data: newAppointment};
    };

    confirmAppointment(appointmentID: string): I_ApiResponse<Appointment>{
        const appointmentExit = this.__appointment.find(a => a.getId() === appointmentID);

        if(!appointmentExit){
            return {sucess: false, error: `Appointment not found`};
        };

        appointmentExit.confirm();
        return {sucess: true, data: appointmentExit};
    };

    completeAppointment(appointmentID: string): I_ApiResponse<Appointment>{
        const appointmentExit = this.__appointment.find(a => a.getId() === appointmentID);

        if(!appointmentExit){
            return {sucess: false, error: `Appointment not found`};
        };

        appointmentExit.complete()
        return {sucess: true, data: appointmentExit};
    };

    cancelAppointment(appointmentID: string): I_ApiResponse<Appointment>{
        const appointmentExit = this.__appointment.find(a => a.getId() === appointmentID);

        if(!appointmentID){
            return {sucess: false, error: `Appointment not found`}
        };

        appointmentExit?.cancel();
        return {sucess: true, data: appointmentExit};
    };
};