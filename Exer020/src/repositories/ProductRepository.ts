import { I_Repository } from "../interfaces/I_Repository"
import { Product } from "../models/Product";
import { ProductStatus } from "../enums/ProductStatus";

export class ProductRepository implements I_Repository<Product>{

    private __productList: Product[] = [];

    findById(id: string): Promise<Product | null> {
        
        return new Promise((resolve) => {

            const findProductById = this.__productList.find((p) => p.getId() === id);
            resolve( findProductById ?? null ); 
        });
    }

    findAll(): Promise<Product[]> {
        
        return new Promise((resolve) => {

            resolve(this.__productList);
        });
    }

    save(entity: Product): Promise<Product> {
        
        return new Promise((resolve) => {

            this.__productList.push(entity);
            resolve(entity);
            return;
        });
    }

    delete(id: string): Promise<boolean> {
        
        return new Promise((resolve) => {

            const findProductById = this.__productList.findIndex((p) => p.getId() === id);

            if(findProductById === -1){
                resolve( false );
                return;
            }

            this.__productList.splice(findProductById, 1);
            resolve( true );
            return;
        });
    }

    findByStatus(status: ProductStatus): Promise<Product[]>{
        
        return new Promise((resolve) => {

            const findProductByStatus = this.__productList.filter((p) => p.getStatus() === status);
            resolve(findProductByStatus);
            return;
        })
    }

    getProductList(): Product[]{
        return this.__productList;
    }
}