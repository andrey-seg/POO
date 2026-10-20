import { DoctorSpecialty } from "../enums/DoctorSpecialty"
import { GenerateCustomId } from "../common/generateId"

export class Doctor{

    private __id: string;
    private __name: string;
    private __email: string;
    private __specialty: DoctorSpecialty;
    private __availableSlots: string[];
    private __active: boolean;

    constructor(name: string, email: string, specialty: DoctorSpecialty){

        this.__id = GenerateCustomId(Doctor);
        this.__name = name;
        this.__email = email;
        this.__specialty = specialty;
        this.__availableSlots = [];
        this.__active = true;
    }

    addSlot(slot: string): boolean{

        if(this.__availableSlots.includes(slot)){
            return false;
        }

        this.__availableSlots.push(slot);
        return true;
    }

    removeSlot(slot: string): boolean{

        if(!this.__availableSlots.includes(slot)){
            return false
        }

        this.__availableSlots = this.__availableSlots.filter(s => s !== slot);
        return true;
    }

    isActive(slot: string): boolean{

        if(!this.__availableSlots.includes(slot)){
            return false;
        }

        return true;
    }

    setActive(): void{
        
        if(this.__active){
            throw new Error(`Doctor is alredy active.`);
        }

        this.__active = true;
    }

    setDeactivate(): void{

        if(!this.__active){
            throw new Error(`Doctor is alredy deactivate`)
        }

        this.__active = false;
    }

    toString(): string{
        return `id: ${this.__id} | name: ${this.__name} | ${this.__email} | especialty: ${this.__specialty} | avilable slots: ${this.__availableSlots} | Active? ${this.__active}`;
    }

    getId(): string{
        return this.__id;
    }

    getName(): string{
        return this.__name;
    }

    getEmail(): string{
        return this.__email;
    }

    getEspecialty(): DoctorSpecialty{
        return this.__specialty;
    }

    getAvailableSlot(): String[]{
        return this.__availableSlots;
    }

    getActive(): boolean{
        return this.__active;
    }
}