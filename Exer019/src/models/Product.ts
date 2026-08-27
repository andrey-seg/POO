import { ProductStatus } from "../enums/ProductStatus";
import { Category } from "../models/Category";
import { Review } from "../models/Review"

export class Product{

    private __id: string;
    private __name: string;
    private __price: number;
    private __status: ProductStatus;
    private __categoty: Category;
    private __reviews: Review[];
}