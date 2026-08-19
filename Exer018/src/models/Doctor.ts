import { DepartamentType } from "../enums/DepartamentType";

export class Doctor{
    private __id: string;
    private __name: string;
    private __departament: DepartamentType;
    private __avilableSlots: String[];
    
    constructor(id: string, name: string, departament: DepartamentType){

        this.__id = id;
        this.__name = name;
        this.__departament = departament;
        this.__avilableSlots = [];

    };

    addSlot(slot: string): void{
        
        if(this.__avilableSlots.includes(slot)){
            throw new Error(`Slot alredy exist`);
        };

        this.__avilableSlots.push(slot);
    };

    removeSlot(slot: string): void{
        
        if(!this.__avilableSlots.includes(slot)){
            throw new Error(`Slot not found.`);
        };

        this.__avilableSlots = this.__avilableSlots.filter(s => s !== slot);
    };

    isAvailable(slot: string): boolean{
        return this.__avilableSlots.includes(slot);
    };

    toString(): string{
        return `ID => ${this.__id} | Name => ${this.__name} | Departament => ${this.__departament} | Slots => ${this.__avilableSlots}`;
    };

    getId(): string{
        return this.__id;
    };

    getName(): string{
        return this.__name;
    };

    getDepartament(): DepartamentType{
        return this.__departament;
    };

    getSlots(): String[]{
        return this.__avilableSlots;
    };
}