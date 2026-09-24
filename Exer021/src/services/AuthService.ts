import { MemberRepository } from "../repositories/MemberRepository";
import { IApiResponse } from "../interfaces/IApiResponse";
import { Member } from "../models/Member";
import { MemberRole } from "../enums/MemberRole";

export class AuthService{

    constructor(private __memberRepository: MemberRepository){};

    async register(name: string, email: string, password: string): Promise<IApiResponse<Member>>{

       try{

            const findUserByEmail = await this.__memberRepository.findByEmail(email);

            if(findUserByEmail){
                return{ success: false, error: `Member is alredy registerd.`};
            };

            const member = new Member(name, email, password, MemberRole.MEMBER);
            this.__memberRepository.save(member);

            return{ success: true, data: member };

       }catch(error){
            return{ success: false, error: (error as Error).message };
       }
    }

    async login(email: string, password: string): Promise<IApiResponse<Member>>{

        try{

            const findUserByEmail = await this.__memberRepository.findByEmail(email);

            if(!findUserByEmail?.validatePassword(password) || !findUserByEmail){

                return {success: false, error: `User or passaword is incorrect.`}
            };

            findUserByEmail.validatePassword(password)
            return { success: true, data: findUserByEmail };

        }catch(error){
            return{ success: false, error: (error as Error).message };
        }
    }

    async getProfile(memberId: string): Promise<IApiResponse<Member>>{

        try{

            const findUser = await this.__memberRepository.findById(memberId);

            if(!findUser){
                return { success: false, error: `Cannot find user.` };
            }

            return{ success: true, data: findUser };
        }catch(error){
            return { success: false, error: (error as Error).message };
        }
    }
}