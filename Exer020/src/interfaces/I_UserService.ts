import { I_ApiResponse } from "./I_ApiResponse";
import { User } from "../models/User";

export interface I_UserService{
    register(name: string, email: string, password: string): Promise<I_ApiResponse<User>>;
    login(email: string, password: string): Promise<I_ApiResponse<User>>;
    getProfile(userId: string): Promise<I_ApiResponse<User>>;
}