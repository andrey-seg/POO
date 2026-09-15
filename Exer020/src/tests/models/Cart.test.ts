import { Cart } from "../../models/Cart";
import { Product } from "../../models/Product";
import { ProductStatus } from "../../enums/ProductStatus";

describe("Cart", () => {
    let cart: Cart;
    let product: Product;

    beforeEach(() => {
        cart = new Cart();
        product = new Product("laptop", 2999, 10, ProductStatus.ACTIVE);
    });

    describe("addItem", () => {

        it("should add item to cart", () => {
            cart.addItem(product, 1);
            expect(cart.getItem()).toHaveLength(1);
        });

        it("shold return 0 for empty cart", () => {
            expect(cart.caculateTotal()).toBe(0);
        })
    });

    describe("isEmpty", () => {

        it("should return true when empty", () => {
            expect(cart.isEmpty()).toBe(true);
        });

        it("should return false when has items", () => {
            cart.addItem(product, 1);
            expect(cart.isEmpty()).toBe(false);
        });
    });
})