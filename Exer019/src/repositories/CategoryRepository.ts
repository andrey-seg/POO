import { I_Repository } from "../interfaces/I_Repository";
import { Category } from "../models/Category";

export class CategoryRepository implements I_Repository<Category>{

    private __category: Category[] = [];
    
    findById(id: string): Promise<Category | null> {
        
        return new Promise((resolve) => {

            setTimeout(() => {

                const findProductById = this.__category.find(c => c.getId() === id);
                resolve(findProductById ?? null);
            }, 100);
        });
    }

    findAll(): Promise<Category[]> {
        
        return new Promise((resolve) => {

            setTimeout(() => {
                resolve(this.__category);
            }, 100);
        });
    }

    save(entity: Category): Promise<Category> {
        
        return new Promise((resolve) => {

            setTimeout(() => {
               this.__category.push(entity);
               resolve(entity);
               return;
            }, 100);
        });
    }

    delete(id: string): Promise<boolean> {
        
        return new Promise((resolve) => {

            setTimeout(() => {
                const findProductById = this.__category.findIndex(p => p.getId() === id);

                if(findProductById === -1){
                    throw new Error(`Product not found`);
                    resolve(false);
                    return;
                }

                this.__category.splice(findProductById, 1);
                resolve(true);
                return;
            }, 100);
        });
    }
}