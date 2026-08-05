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

    removeSlot(slot: string){
        if(!this.__availableSlots.includes(slot)){
            throw new Error(`Slot not found`);
        };

        this.__availableSlots = this.__availableSlots.filter(s => s !== slot);
    };

    
}