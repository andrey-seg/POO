import { UserRole } from "../enums/UserRole"
import { generateCustomId } from "../common/idGenerator";

export class User{
    
    private __id: string;
    private __name: string;
    private __email: string;
    private __password: string;
    private __role: UserRole;
    private __createdAt: string;

    constructor(name: string, email: string, password: string, role: UserRole){

        this.__id = generateCustomId();
        this.__name = name;
        this.__email = email;
        this.__password = password;
        this.__role = role;
        this.__createdAt = new Date().toISOString();
    }

    validatePassword(password: string): boolean{
        return this.__password === password;
    }

    isAdmin(): boolean{
        return this.__role === UserRole.ADMIN;
    }

    toString(): string{
        return `Id => ${this.__id} | Name => ${this.__name} | Email => ${this.__email} | Password => Cannot get | Role => ${this.__role} | Created At => ${this.__createdAt}`;
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

    getPassword(): string{
        return this.__password;
    }

    getRole(): UserRole{
        return this.__role;
    }

    getCreatedAt(): string{
        return this.__createdAt;
    }
}