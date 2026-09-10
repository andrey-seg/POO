import { I_ApiResponse } from "../interfaces/I_ApiResponse";
import { I_UserService } from "../interfaces/I_UserService";
import { User } from "../models/User";
import { UserRepository } from "../repositories/UserRepository";
import { UserRole } from "../enums/UserRole";

export class AuthServices implements I_UserService{

    constructor(private __UserZRepository: UserRepository){};
    
    async register(name: string, email: string, password: string): Promise<I_ApiResponse<User>> {
        
           try{

                const existingUser = await this.__UserZRepository.findByEmail(email);

                if(existingUser){
                    return { success: false, error: `User alredy register` };
                }

                const newUser = new User(
                    name,
                    email,
                    password,
                    UserRole.CUSTUMER,
                );

                const saved = await this.__UserZRepository.save(newUser);

                return { success: true, data: saved };

           }catch(error){

                return { success: false, error: (error as Error).message };

           }
        }

        async login(email: string, password: string, user: User): Promise<I_ApiResponse<User>> {
            
            try{

                const existingUser = this.__UserZRepository.findByEmail(email);
                
                const passwordIsValid = user.validatePassword(password);

                if(!existingUser || !passwordIsValid){
                    return { success: false, error: `User or password incorrect.` };
                }

                
            }
        }
}
