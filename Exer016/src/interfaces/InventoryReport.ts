import { Product } from "../models/Product";

export interface I_InventoryReport{
    totalProduct: number,
    totalValue: number,
    lowStock: Product[],
};