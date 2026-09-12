import { OrderRepository } from "../repositories/OrderRepository";
import { ProductRepository } from "../repositories/ProductRepository";
import { Cart } from "../models/Cart";
import { I_ApiResponse } from "../interfaces/I_ApiResponse";
import { Order } from "../models/Order";

export class OrderService{
    
    constructor(private __orderRepository: OrderRepository, private __productRepository: ProductRepository){};

    async createOrder(userId: string, cart: Cart): Promise<I_ApiResponse<Order>{

        try{
            
            const findUserById = await this.__orderRepository.findByUser(userId);

            if(!findUserById){
                return { success: false, error: `User not found.` };
            }

            const newOrder = new Order{
                
            }
        }
    }
}