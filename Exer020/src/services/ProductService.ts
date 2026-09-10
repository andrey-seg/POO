import { ProductRepository } from "../repositories/ProductRepository";
import { I_ApiResponse } from "../interfaces/I_ApiResponse";
import { Product } from "../models/Product";
import { ProductStatus } from "../enums/ProductStatus";

export class ProductService{
    
    constructor(private __productRepository: ProductRepository){};

    async addProduct(product: Product): I_ApiResponse<Product>{

        try{

            const existingProduct = await this.__productRepository.findById(product.getId());

            if(!existingProduct){
                return { success: false, error: `Product alredy exist.` };
            }

            const saved = await this.__productRepository.save(product);
            return { success: true, data: saved };
        }catch(error){
            return { success: false, error: (error as Error).message };
        }
    }

    async updateStatus(productID: string, status: ProductStatus): I_ApiResponse<Product>{

        try{

            const findProductById = await this.__productRepository.findById(productID);

            if(findProductById?.getStatus() === status){
                return { success: false, error: `Product alredy have this status.`};
            }

            const statusAction = {
                [ProductStatus.ACTIVE]: () => findProductById?.activate(),
                [ProductStatus.INACTIVE]: () => findProductById?.deactivate(),
                [ProductStatus.OUT_OF_STOCK]: () => findProductById?.marlOutOfStock()
            };
            return { success: true, data: findProductById };
        }catch(error){
            return { success: false, error: (error as Error).message };
        }
    }
}