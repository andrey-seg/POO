export class Patient{
    private __id: string;
    private __name: string;
    private __email: string;
    private __phone: string;
    private __medicalHistory: String[];

    constructor(id: string, name: string, email: string, phone: string,){
        this.__id = id;
        this.__name = name;
        this.__email = email;
        this.__phone = phone;
        this.__medicalHistory = [];

    };

    addMedicationRecord(record: string): void{

        if(this.__medicalHistory.includes(record)){
            throw new Error(`Patient record alredy registered`);
        };

        this.__medicalHistory.push(record);
    };

    toString(): string{
        return `Id => ${this.__id} | Name => ${this.__name} | Email => ${this.__email} | Phone => ${this.__phone} | Medical history => ${this.__medicalHistory}`;
    };

    getId(): string{
        return this.__id;
    };

    getName(): string{
        return this.__name;
    };

    getEmail(): string{
        return this.__email;
    };

    getPhone(): string{
        return this.__phone;
    };

    getMedicalHistory(): String[]{
        return this.__medicalHistory;
    };
};