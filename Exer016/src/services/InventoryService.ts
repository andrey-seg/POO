import { Product } from "../models/Product";
import { Supplier } from "../models/Supplier";
import { I_ApiResponse } from "../interfaces/ApiResponse";
import { I_InventoryReport } from "../interfaces/InventoryReport";

export class InventoryService{

    private __products: Product[];
    private __supplier: Supplier[];

    constructor(){
        this.__products = [];
        this.__supplier = [];
    };

    registerSupplier(supplier: Supplier): I_ApiResponse<Supplier>{
        const supplierAlredyExist = this.__supplier.find(s => s.getID() === supplier.getID());

        if(supplierAlredyExist){
            return { success: false, error: `Erro on register supplier` };
        };

        try{
            this.__supplier.push(supplier);
            return { success: true, data: supplier };
        } catch(error){
            return { success: false, error: (error as Error).message };
        };
    };

    addProduct(product: Product): I_ApiResponse<Product>{
        const productAlredyExist = this.__products.find(p => p.getID() === product.getID());

        if(productAlredyExist){
            return { success: false, error: `Product already exists.` };
        };

        try{
            this.__products.push(product);
            return { success: true, data: product };
        }catch(error){
            return { success: false, error: (error as Error).message };
        };
    };

    restock(productID: string, quantity: number, reason: string): I_ApiResponse<Product>{
        const product = this.__products.find(p => p.getID() === productID);

        if(!product){
            return { success: false, error: `Erro Product not found` };
        };

        try{
            product.addStock(quantity, reason);
            return { success: true, data: product };
        }catch(erro){
            return { success: false, error: (erro as Error).message };
        };
    };

    sell(productID: string, quantity: number, reason: string): I_ApiResponse<Product>{
        const product = this.__products.find(p => p.getID() === productID);

        if(!product){
            return { success: false, error: `Erro Product not found` };
        };

        try{
            product.removeStock(quantity, reason);
            return { success: true, data: product };
        }catch(erro){
            return { success: false, error: (erro as Error).message };
        };
    };

    adJustStock(productID: string, newStock: number, reason: string): I_ApiResponse<Product>{
        const product = this.__products.find(p => p.getID() === productID);

        if(!product){
            return { success: false, error: `Erro product not found` };
        };

        try{
            product.adJust(newStock, reason);
            return { success: true, data: product };
        }catch(erro){
            return { success: false, error: (erro as Error).message };
        };
    };

    getLowStockProducts(minimal: number): I_ApiResponse<Product[]>{
        const lowStockProducts = this.__products.filter(p => p.getLowStockAlert(minimal));

        if(lowStockProducts.length === 0){
            return { success: false, error: `Erro low stock products not found` };
        };

        return { success: true, data: lowStockProducts };
    };

    getProductBySupplier(supplierId: string): I_ApiResponse<Product[]>{
        const selectedSuppliersProducts = this.__products.filter(p => p.getSupplierID() === supplierId);

        if(selectedSuppliersProducts.length === 0){
            return { success: false, error: `Erro supplier not found `};
        };

        return { success: true, data: selectedSuppliersProducts};
    };

    generateInventoryReport(minimal: number): I_ApiResponse<I_InventoryReport>{
        const totalProduct = this.__products.length;

        const totalValue = this.__products.reduce((sum, product) =>{
            return sum + (product.getPrice() *product.getStock());
        }, 0);

        const lowStock = this.__products.filter(p => p.getLowStockAlert(minimal))

        return { success: true, data: { totalProduct, totalValue, lowStock }};
    };
};