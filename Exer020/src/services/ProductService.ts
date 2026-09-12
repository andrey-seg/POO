import { ProductRepository } from "../repositories/ProductRepository";
import { I_ApiResponse } from "../interfaces/I_ApiResponse";
import { Product } from "../models/Product";
import { ProductStatus } from "../enums/ProductStatus";

export class ProductService{
    
    constructor(private __productRepository: ProductRepository){};

    async addProduct(product: Product): Promise<I_ApiResponse<Product>>{

        try{

            const existingProduct = await this.__productRepository.findById(product.getId());

            if(existingProduct){
                return { success: false, error: `Product alredy exist.` };
            }

            const saved = await this.__productRepository.save(product);

            return { success: true, data: saved };

        }catch(error){
            return { success: false, error: (error as Error).message };
        }
    }

    async updateStatus(productID: string, status: ProductStatus): Promise<I_ApiResponse<Product>>{

        try{

            const findProductById = await this.__productRepository.findById(productID);

            if(!findProductById){
                return { success: false, error: `Product not found.` };
            }

            if(findProductById?.getStatus() === status){
                return { success: false, error: `Product alredy have this status.`};
            }

            const statusAction = {
                [ProductStatus.ACTIVE]: () => findProductById?.activate(),
                [ProductStatus.INACTIVE]: () => findProductById?.deactivate(),
                [ProductStatus.OUT_OF_STOCK]: () => findProductById?.marlOutOfStock()
            };

            statusAction[status]();

            const saved = await this.__productRepository.save(findProductById!);

            return { success: true, data: saved };

        }catch(error){
            return { success: false, error: (error as Error).message };
        }
    }

    async getAvailable(): Promise<I_ApiResponse<Product[]>>{

        try{

            const isAvailable = await this.__productRepository.findAll();

            if(isAvailable.length === 0){
                return { success: false, error: `Products not found.` };
            }

            return{ success: true, data: isAvailable };

        }catch(error){
            return { success: true, error: (error as Error).message };
        }
    }

    async restock(productID: string, quantity: number): Promise<I_ApiResponse<Product>>{

        try{

            const findById = await this.__productRepository.findById(productID);

            if(!findById){
                return { success: false, error: `Product not found.` };
            }

            findById.increaseStock(quantity);

            const saved = await this.__productRepository.save(findById);

            return { success: true, data: saved };

        }catch(error){
            return { success: false, error: (error as Error).message };
        }
    }
}