import type { OrderRepositories } from "../repositories/OrderRepository.js";
import type { ProductRepositoy } from "../repositories/ProductsRepository.js";
import type { I_ApiResponse } from "../interfaces/ApiResponse.js";
import { Order } from "../models/Order.js";

export class OrderService{
    
    private __orderRepository: OrderRepositories;
    private __productRepository: ProductRepositoy;

    constructor(orderRepository: OrderRepositories, productsRepository: ProductRepositoy){
        this.__orderRepository = orderRepository;
        this.__productRepository = productsRepository;
    };

    async createOrder(custumerId: string): Promise<I_ApiResponse<Order>>{

        try{
            const order = new Order(`ord-${Date.now()}`, custumerId);
            const saved = await this.__orderRepository.save(order);
            return { success: true, data: saved };
        }catch(error){
            return { success: false, error: (error as Error).message };
        };

    };

    async addItem(orderID: string, productID: string, quantity: number): Promise<I_ApiResponse<Order>>{

        try{
            const order = await this.__orderRepository.findById(orderID);
            const product = await this.__productRepository.findById(productID);

            if(!order){
                return { success: false, error: "Order not found"};
            };

            if(!product){
                return { success: false, error: "Product not found"};
            };

            order.addItem(product, quantity);

            const saved = await this.__orderRepository.save(order);
            return { success: true, data: saved }; 
        }catch(error){
            return { success: false, error: (error as Error).message };
        };
    };

    async getOrder(orderID: string): Promise<I_ApiResponse<Order>>{

        try{
            const order = await this.__orderRepository.findById(orderID);

            if(!order){
                return { success: false, error: "Order not found" };
            };

            return { success: true, data: order };

        }catch(error){
            return { success: false, error: (error as Error).message };
        };
    };

    async getCusomerOrders(custumerId: string): Promise<I_ApiResponse<Order[]>>{

        try{
            const orders = await this.__orderRepository.findByCustumer(custumerId);

            if(orders.length === 0){
                return { success: false, error: "No orders found" };
            };

            return { success: true, data: orders };
        }catch(error){
            return { success: false, error: (error as Error).message };
        };
    };
};