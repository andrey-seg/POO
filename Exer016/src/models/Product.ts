import { CategoryType } from "../enums/CategoryType";
import { MovimentType } from "../enums/MovementType";
import { StockMovement } from "./StockMovement";

export class Product{
    private __id: string;
    private __name: string;
    private __category: CategoryType;
    private __price: number;
    private __stock: number;
    private __supplierId: string;
    private __moviments: StockMovement[];

    constructor(id: string, name: string, category: CategoryType, price: number, stock: number, supplierId: string){
        this.__id = id;
        this.__name = name;
        this.__category = category;
        this.__price = price;
        this.__stock = stock;
        this.__supplierId = supplierId;
        this.__moviments = [];
    };

    addStock(quantity: number, reason: string): void{

        if(quantity >= 0){
            throw new Error(`Moviment quantity erro`);
        };

        const moviment = new StockMovement(
            `mov-${this.__moviments.length + 1}`,
            this.__id,
            MovimentType.IN,
            quantity,
            new Date().toISOString(),
            reason
        );

        this.__stock += quantity;
        this.__moviments.push(moviment);
    };

    removeStock(quantity: number, reason: string): void{
    
        if(this.__stock <= 0){
            throw new Error(`Iten not in stock`);
        };

        const moviment = new StockMovement(
            `Mov-${this.__moviments.length + 1}`,
            this.__id,
            MovimentType.OUT,
            quantity,
            new Date().toISOString(),
            reason
        );

        this.__stock -= quantity;
        this.__moviments.push(moviment);
    };

    adJust(newStock: number, reason: string): void{

        if(newStock >= 0){
            throw new Error(`New Stock erro`)
        };

         const moviment = new StockMovement(
            `Mov-${this.__moviments.length + 1}`,
            this.__id,
            MovimentType.OUT,
            newStock,
            new Date().toISOString(),
            reason
        );

        this.__stock = newStock;
        this.__moviments.push(moviment);
    };

    getLowStockAlert(minimum: number): string{

        if(minimum <= 0){
            throw new Error(`Minimal value erro`);
        };

        if(this.__stock < minimum){
            return `Stock below minimum`;
        };

        return `Stock at minimum`;
    };

    toString(): string{
        return `ID => ${this.__id} | Name => ${this.__name} | Categoty => ${this.__category} | Price => ${this.__price} | Stock => ${this.__stock} | Supplier ID => ${this.__supplierId} | Moviments => ${this.__moviments}`;
    };

    getID(){
        return this.__id;
    };

    getName(){
        return this.__name;
    };

    getCategory(){
        return this.__category;
    };

    getPrice(){
        return this.__price;
    };

    getStock(){
        return this.__stock;
    };

    getSupplierID(){
        return this.__supplierId;
    };

    getMoviments(){
        return this.__moviments;
    };
};