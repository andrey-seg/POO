import type { Repository } from "../interfaces/Repository.js";
import { Product } from "../models/Products.js";

export class ProductRepositoy implements Repository<Product>{

    private __products: Product[];

    constructor(){
        this.__products = [];
    };

    findById(id: string): Promise<Product | null> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const product = this.__products.find(p => p.getID() === id);
                resolve(product ?? null);
            }, 100);
        });
    };

    findAll(): Promise<Product[]> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.__products);
            }, 100);
        });
    };

    save(object: Product): Promise<Product> {
        return new Promise((resolve) => {
            setTimeout(() => {
                this.__products.push(object);
                resolve(object);
            }, 100)
        });
    };

    delete(id: string): Promise<boolean> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const index = this.__products.findIndex(p => p.getID() === id);

                if(index === -1){
                    resolve(false);
                    return;
                };

                this.__products.splice(index, 1);
                resolve(true);
            }, 100);
        });
    };

    toString(): string{
        return `Products => ${this.__products}`;
    };

    getProducts(): Product[]{
        return this.__products;
    };
};