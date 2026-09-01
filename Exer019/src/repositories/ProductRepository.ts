import { ProductStatus } from "../enums/ProductStatus";
import { I_Repository } from "../interfaces/I_Repository";
import { Product } from "../models/Product";

export class ProductRepository implements I_Repository<Product>{

    private __products: Product[] = [];

    findById(id: string): Promise<Product | null> {
        
        return new Promise((resolve) => {

            setTimeout(() => {
                
                const findProductById = this.__products.find(p => p.getId() === id);
                resolve(findProductById ?? null);
            }, 100);
        });
    }

    findAll(): Promise<Product[]> {
        
        return new Promise((resolve) => {

            setTimeout(() => {
                resolve(this.__products);
            }, 100);
        });
    }

    save(entity: Product): Promise<Product> {
        
        return new Promise((resolve) => {

            setTimeout(() => {
                this.__products.push(entity);
                resolve(entity);
                return;
            }, 100);
        });
    }

    delete(id: string): Promise<boolean> {
        
        return new Promise((resolve) => {

            setTimeout(() => {
                
                const findProductById = this.__products.findIndex(p => p.getId() === id);

                if(findProductById === -1){
                    resolve(false);
                    return   
                }

                this.__products.splice(findProductById, 1);
                resolve(true);
                return;
            }, 100);
        });
    }

    findByCategory(categoryId: string): Promise<Product[]>{

        return new Promise((resolve) => {

            setTimeout(() => {
            const findByCategoryId = this.__products.filter(p => p.getCategory().getId() === categoryId);
            resolve(findByCategoryId);
            }, 100);
        });
    }

    findByStatus(status: ProductStatus): Promise<Product[]>{

        return new Promise((resolve) => {

            setTimeout(() => {
                const findByStatus = this.__products.filter(p => p.getStatus() === status);
                resolve(findByStatus);
            }, 100);
        });
    }
}