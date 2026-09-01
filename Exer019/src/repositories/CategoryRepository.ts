import { I_Repository } from "../interfaces/I_Repository";
import { Product } from "../models/Product";

export class CategoryRepository implements I_Repository<Product>{

    private __product: Product[] = [];
    
    findById(id: string): Promise<Product | null> {
        
        return new Promise((resolve) => {

            setTimeout(() => {

                const findProductById = this.__product.find(p => p.getId() === id);
                resolve(findProductById ?? null);
            }, 100);
        });
    }

    findAll(): Promise<Product[]> {
        
        return new Promise((resolve) => {

            setTimeout(() => {
                resolve(this.__product);
            }, 100);
        });
    }

    save(entity: Product): Promise<Product> {
        
        return new Promise((resolve) => {

            setTimeout(() => {
               this.__product.push(entity);
               resolve(entity);
               return;
            }, 100);
        });
    }

    delete(id: string): Promise<boolean> {
        
        return new Promise((resolve) => {

            setTimeout(() => {
                const findProductById = this.__product.findIndex(p => p.getId() === id);

                if(findProductById === -1){
                    throw new Error(`Product not found`);
                }

                this.__product.splice(findProductById, 1);
                resolve(true);
                return;
            }, 100);
        });
    }
}