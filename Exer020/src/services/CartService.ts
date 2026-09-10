import { OrderRepository } from '../repositories/OrderRepository';
import { ProductRepository } from '../repositories/ProductRepository';
import { I_ApiResponse } from '../interfaces/I_ApiResponse';
import { Cart } from '../models/Cart';

export class CartService{
    
    constructor(private __productRepository: ProductRepository){};

    getCart(userId: string): I_ApiResponse<Cart>{
        
        try{

            const findCart = await this.__productRepository.findById()
        }
    }
}