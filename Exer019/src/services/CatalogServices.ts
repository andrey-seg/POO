import { Category } from "../models/Category";
import { CategoryRepository } from "../repositories/CategoryRepository";
import { ProductRepository } from "../repositories/ProductRepository";
import { I_ApiResponse } from "../interfaces/I_ApiResponse";
import { Product } from "../models/Product";
import { Rating } from "../models/Review";
import { ProductStatus } from "../enums/ProductStatus";

export class CatalogServices{

    constructor(
        private __productRepository: ProductRepository,
        private __categoryRepository: CategoryRepository,
    ){}; //gerando uma dependency injection

    async addCategory(category: Category): Promise<I_ApiResponse<Category>>{

        try{
            const addCategoryToRepository = await this.__categoryRepository.save(category);

            return { success: true, data: category };
        }catch(error){
            return { success: false, error: (error as Error).message };
        }
    }

    async addProduct(product: Product): Promise<I_ApiResponse<Product>>{

        try{
            const addProductToRepository = await this.__productRepository.save(product);

            return { success: true, data: product };
        }catch(error){
            return { success: false, error: (error as Error).message };
        }
    }

    async addReview(productId: string, author: string, rating: Rating, comment: string): Promise<I_ApiResponse<Product>>{

        try{
            const addProductReview = await this.__productRepository.findById(productId);
            //Tratamento de bug, typescript reconhece como Product | null

            if(!addProductReview){
                return { success: false, error: "Product not found." }; // Gera a confirmação de não null
            }

            addProductReview?.addReview( author, rating, comment ); //adicionando produto

            const saved = await this.__productRepository.save(addProductReview)
            return{ success: true, data: addProductReview};

        }catch(error){
            return { success: false, error: (error as Error).message };
        }
    }

    async getProductByCategory(categoryId: string): Promise<I_ApiResponse<Product[]>> {

        try{
            const findProductsByCategory = await this.__productRepository.findByCategory(categoryId);

            if(findProductsByCategory.length === 0){
                return { success: false, error: `No Product found`}
            }

            return { success: true, data: findProductsByCategory };
        }catch(error){
            return { success: false, error: (error as Error).message };
        }
    }

    async getTopRatedProducts(): Promise<I_ApiResponse<Product[]>>{

        try{
            const allProducts = await this.__productRepository.findAll(); //Pega todos os produtos
            
            const topRated = allProducts.filter(ap => ap.getAverageRating() >= 4);//Deixa somente os que tem avaliação 4 ou acima

            if(topRated.length === 0){
                return { success: false, error: `No top rated products found` };
            }

            return { success: true, data: topRated };
        }catch(error){
            return { success: false, error: (error as Error).message };
        }
    }

    async updateProductStatus(productId: string, status: ProductStatus): Promise<I_ApiResponse<Product>>{

        try{
            const findProduct = await this.__productRepository.findById(productId);

            if(!findProduct){
                return { success: false, error: `Product not found`};
            }

            const statusAction = {
                [ProductStatus.ACTIVE]: () => findProduct.activate(),
                [ProductStatus.INACTIVE]: () => findProduct.deactivate(),
                [ProductStatus.OUT_OF_STOCK]: () => findProduct.markOutOfStock()
            }

            statusAction[status]();

            const saved = await this.__productRepository.save(findProduct);
            
            return { success: true, data: saved };
        }catch(error){
            return { success: false, error: (error as Error).message };
        }
    }

    async getProductReport(productId: string): Promise<I_ApiResponse<Product>>{

        try{
            
            const findProduct = await this.__productRepository.findById(productId);

            if(!findProduct){
                return { success: false, error: `Product not found`};
            }

            return { success: true, data: findProduct };
        }catch(error){
            return { success: false, error: (error as Error).message };
        }
    }
}