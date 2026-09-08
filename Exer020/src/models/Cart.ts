import { CartItem } from "./CartItem";
import { Product } from "./Product";

export class Cart{
    
    private __userId: string;
    private __items: CartItem[];

    constructor(userId: string){
        
        this.__userId = userId;
        this.__items = [];
    }

   addItem(product: Product, quantity: number): void{

        const findProduct = this.__items.find((i) => i.getProduct().getId() === product.getId());
        
        if(findProduct){
            findProduct.increaseQuantity(quantity);
            return;
        }

        const newItem = new CartItem(
            `ID: ${this.__items.length + 1}`,
            product,
            quantity
        );
        this.__items.push(newItem);

   }

   removeItem(productId: string): void{

        const findProductIndex = this.__items.findIndex((i) => i.getProduct().getId() === productId);

        if(findProductIndex === -1){
            throw new Error("Item not found.");
        }
    
        this.__items.splice(findProductIndex, 1);

   }

    updateQuantity(productId: string, quantity: number): void{

        const findProduct = this.__items.find((i) => i.getProduct().getId() === productId);
        
        if(!findProduct){
            throw new Error("Item not found");
        }

        findProduct.setQuantity(quantity);
    }

    caculateTotal(): number{

        return this.__items.reduce((total, item) => {
            return total + item.subTotal();
        }, 0);
    }

    clear(): void{
        
        this.__items = [];
    }

    isEmpty(): boolean{

        return this.__items.length === 0;
    }

    toString(): string{
        return `User id => ${this.__userId} | Items => ${this.__items}`;
    }

    getUserId(): string{
        return this.__userId;
    }

    getItem(): CartItem[]{
        return this.__items;
    }
}