import { Product } from "../../models/Product";
import { ProductStatus } from "../../enums/ProductStatus";

describe("Product", () => {
    let product: Product;

    beforeEach(() => {
        product = new Product("laptop", 2999, 10, ProductStatus.ACTIVE);
    });

    describe("decreaseStock", () => {

        //Exemplo de que deve diminiur o estoque onde o toBe() deve verifica o valor restante
        it("should decrease stock correctly", () => {
            product.deacreseStock(3);
            expect(product.getStock()).toBe(7);
        });

        //Exemplo de to toThorow, onde e esperado um lançamento de erro
        it("Should thow erro when stock is insufficient", () => {
            expect(() => product.deacreseStock(999)).toThrow();
        });

    });

    describe("increaceStock", () => {

        //Exemplo de aumento de estoque usando toBe() para verificar quantidade.
        it("Shoud increase stock correctly", () => {
            product.increaseStock(5);
            expect(product.getStock()).toBe(15);
        });
    });

    describe("isAvailable", () => {

        //Exemplo de uso do toBe() com um valor bolleano
        it("Should return when the stock is suficient", () => {
            expect(product.isAvailable(5)).toBe(true);
        })

        it("Should return when the stock is insuficient", () => {
            expect(product.isAvailable(999)).toBe(false);
        });
    });

    describe("Activate / Deactivate", () => {

        it("Should deactivate product", () => {
            product.deactivate();
            expect(product.getStatus()).toBe(ProductStatus.INACTIVE);
        });
    });

    it("Should activate product", () => {
        product.deactivate();
        product.activate();
        expect(product.getStatus()).toBe(ProductStatus.ACTIVE);
    });

    it("Should thow error when activating alredy active product", () => {
        expect(() => product.activate()).toThrow();
    });

    it("Should mark as out of stock", () => {
        product.marlOutOfStock();
        expect(product.getStatus()).toBe(ProductStatus.OUT_OF_STOCK);
    });

});
