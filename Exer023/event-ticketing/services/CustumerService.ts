import { IApiResponse } from "../interfaces/IApiResponse";
import { Customer } from "../models/Customer";
import { CustumerRepository } from "../repositories/CustomerRepository";

export class CustumerService{

    private constructor(private __custumerRepository: CustumerRepository){};

    async registerCustumer(name: string, email: string, IsStudent: boolean): Promise<IApiResponse<Customer>>{

        try{

            const custumerAlredyRegister = await this.__custumerRepository.findByEmail(email);

            if(custumerAlredyRegister){
                return {success: false, error: `Custumer alredy exist.` };
            }

            const newCustumer = new Customer(
                name,
                email,
                IsStudent
            );

            this.__custumerRepository.save(newCustumer);
            return{ success: true, data: newCustumer };

        }catch(error){
            return { success: true, error: (error as Error).message };
        }
    }
}