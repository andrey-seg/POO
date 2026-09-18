import { generateCustomId } from "../common/generateId";
import { MemberRole } from "../enums/MemberRole";

export class Member{

    private __id: string;
    private __name: string;
    private __email: string;
    private __password: string;
    private __role: MemberRole;
    private __activeLoan: number;

    constructor(name: string, email: string, password: string, role: MemberRole){

        this.__id = generateCustomId(Member);
        this.__name = name;
        this.__email = email;
        this.__password = password;
        this.__role = role;
        this.__activeLoan = 0;
    }

    validatePassword(password: string): boolean{
        return this.__password === password;
    }

    isAdmin(): boolean{
        return this.__role === MemberRole.ADMIN;
    }

    incrementLoan(): void{
        this.__activeLoan++;
    }

    decrementLoan(): void{
        this.__activeLoan--;
    }

    canBorrow(): boolean{
        return this.__activeLoan < 3;
    }

    toString(): string{
        return `Id => ${this.__id} | Name => ${this.__name} | Email => ${this.__email} | Password => ${this.__password} | Role => ${this.__role} | Active Loans => ${this.__activeLoan}`;
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

    getRole(): MemberRole{
        return this.__role;
    }

    getActiveLoan(): number{
        return this.__activeLoan;
    }
}