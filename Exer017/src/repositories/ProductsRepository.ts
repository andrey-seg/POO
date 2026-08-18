import type { Repository } from "../interfaces/Repository.js";
import type { Product } from "../models/Products.js";

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
                const product = 
            })
        })
    }
};