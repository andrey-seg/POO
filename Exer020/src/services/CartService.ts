import { OrderRepository } from '../repositories/OrderRepository';
import { ProductRepository } from '../repositories/ProductRepository';
import { I_ApiResponse } from '../interfaces/I_ApiResponse';
import { Cart } from '../models/Cart';

export class CartService{
    
    private __carts: Map<string, Cart> = new Map();

    constructor(private __productRepository: ProductRepository){};

    async getCart(userId: string): Promise<I_ApiResponse<Cart>>{
        
        try{

            const cart = this.__carts.get(userId);

            if(!cart){
                return { success: false, error: `Cart not found.` };
            }

            return { success: true, data: cart };
        }catch(error){
            return { success: false, error: (error as Error).message };
        }
    }

    async addToCart(userID: string, productID: string, quantity: number): Promise<I_ApiResponse<Cart>>{

        try{

            const product = await this.__productRepository.findById(productID);

            if(!product){
                return { success: false, error: `Product not found.` };
            }

            if(!product.isAvailable(quantity)){
                return { success: false, error: `Product out of stock.` };
            }

            let cart = this.__carts.get(userID);

            if(!cart){
                cart = new Cart();
                this.__carts.set(userID, cart);
            }

            cart.addItem(product, quantity);
            return { success: true, data: cart };

        }catch(error){
            return { success: false, error: (error as Error).message };
        }
    }

    async removeFromCart(userID: string, productID: string): Promise<I_ApiResponse<Cart>>{

        try{

            const findUserById = this.__carts.get(userID);
            const findProductById = await this.__productRepository.findById(productID);

            if(!findUserById){
                return { success: false, error: `User not found`}
            }

            if(!findProductById){
                return { success: false, error: `Product not found.` };
            }

            const removed = findUserById.removeItem(productID);

            return{ success: true, data: findUserById };
        }catch(error){
            return { success: false, error: (error as Error).message };
        }
    }

    async checkout(userID: string): Promise<I_ApiResponse<Cart>>{

        try{

            const findUser = this.__carts.get(userID);

            if(findUser?.isEmpty()){
                return { success: false, error: `Cart is empty.` };
            }

            findUser?.clear();
            return { success: true, data: findUser };
        }catch(error){
            return { success: false, error: (error as Error).message };
        }
    }
}