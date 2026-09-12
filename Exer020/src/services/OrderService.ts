import { OrderRepository } from "../repositories/OrderRepository";
import { ProductRepository } from "../repositories/ProductRepository";
import { Cart } from "../models/Cart";
import { I_ApiResponse } from "../interfaces/I_ApiResponse";
import { Order } from "../models/Order";
import { OrderStatus } from "../enums/OrderStatus";

export class OrderService{
    
    constructor(private __orderRepository: OrderRepository, private __productRepository: ProductRepository){};

    async createOrder(userId: string, cart: Cart): Promise<I_ApiResponse<Order>{

        try{
            
           if(cart.isEmpty()){
            return { success: false, error: `Cart is empty.` };
           }

        
           for(const item of cart.getItem()){
            const product = item.getProduct();

            if(!product.isAvailable(item.getQuantity())){
                return { success: false, error: `Product ${product.getName()} out of stock` };
            }

            product.deacreseStock(item.getQuantity());
            await this.__productRepository.save(product);

           }

           const order = new Order(

            userId,
            cart.caculateTotal(),
            OrderStatus.PENDING
           );

           const saved = await this.__orderRepository.save(order);
           return { success: true, data: saved };
        }catch(error){
            return { success: true, error: (error as Error).message };
        }
    }
}