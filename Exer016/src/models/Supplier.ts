export class Supplier{
    private __id: string;
    private __name: string;
    private __email: string;
    private __phone: string;

    constructor(id: string, name: string, email: string, phone: string){
        this.__id = id;
        this.__name = name;
        this.__email = email;
        this.__phone = phone;
    };

    toString(): string{
        return `ID => ${this.__id} | Name => ${this.__name} | Email => ${this.__email} | Phone => ${this.__phone}`;
    };

    getID(){
        return this.__id;
    };

    getName(){
        return this.__name;
    };

    getEmail(){
        return this.__email;
    };

    getPhone(){
        return this.__phone;
    };
};