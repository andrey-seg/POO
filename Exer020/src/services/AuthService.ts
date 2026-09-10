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

        async login(email: string, password: string): Promise<I_ApiResponse<User>> {
            
            try{

                const user = await this.__UserZRepository.findByEmail(email);

                if(!user || !user.validatePassword(password)){
                    return { success: false, error: `User or password incorrect.` };
                }

                return { success: true, data: user}
            }catch(error){
                return { success: false, error: (error as Error).message };
            }
        }

        async getProfile(userId: string): Promise<I_ApiResponse<User>> {
            
            try{

                const findUser = await this.__UserZRepository.findById(userId);

                if(!findUser){
                    return { success: false, error: `User not found.` };
                }

                return { success: true, data: findUser };
            }catch(error){
                return { success: false, error: (error as Error).message };
            }
        }
}
