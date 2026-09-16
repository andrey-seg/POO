import { OrderService } from "../../services/OrderService";
import { Cart } from "../../models/Cart";
import { Product } from "../../models/Product";
import { Order } from "../../models/Order";
import { ProductStatus } from "../../enums/ProductStatus";
import { OrderStatus } from "../../enums/OrderStatus";
import { UserRole } from "../../enums/UserRole";

const mockOrderRepository = {
    findById: jest.fn(),
    findAll: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    findByUser: jest.fn()
};

const mockProductRepository = {
    findById: jest.fn(),
    findAll: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    findByStatus: jest.fn()
};

describe("OrderService", () => {

    let orderService: OrderService;
    let cart: Cart;
    let product: Product;

    beforeEach(() => {
        jest.clearAllMocks();
        orderService = new OrderService(mockOrderRepository as any, mockProductRepository as any);
    });

    product = new Product("Banana", 2.99, 110, ProductStatus.ACTIVE);
    cart = new Cart();

    describe("Create Order", () => {

        it("Should create order from cart", async () => {
            
            cart.addItem(product, 2);
            mockProductRepository.save.mockImplementation((p: Product) => Promise.resolve(p));
            mockOrderRepository.save.mockImplementation((o: Order) => Promise.resolve(o));

            const result = await orderService.createOrder(cart);

            expect(result.success).toBe(true);
            expect(result.data?.getTotal()).toBe(3.98);
            expect(result.data?.getStatus()).toBe(OrderStatus.PENDING);
        });

        it("Should return erro for empty cart", async () => {

            const result = await orderService.createOrder(cart);

            expect(result.success).toBe(false);
            expect(result.error).toBe(`Product ${product.getName()} out of stock`);
            expect(mockOrderRepository.save).not.toHaveBeenCalled();
        });

        it("Should return error when product is out of stock", async () => {

            const lowStockProduct = new Product("banana", 2, 1, ProductStatus.ACTIVE);
            cart.addItem(lowStockProduct, 5);

            const result = await orderService.createOrder(cart);

            expect(result.success).toBe(false);
            expect(mockOrderRepository.save).not.toHaveBeenCalled();
        });
    });

    describe("advanceStatus", () => {

        it("Should advance order status", async () => {

            const order = new Order(product.getId(), 6000, OrderStatus.PENDING);
            mockOrderRepository.findById.mockResolvedValue(order);
            mockOrderRepository.save.mockImplementation((o: Order) => Promise.resolve(o));

            const result = await orderService.advanceStatus(order.getId());

            expect(result.success).toBe(true);
            expect(result.data?.getStatus()).toBe(OrderStatus.CONFIRMED);
        });

        it("Should return erro for non existing order", async () => {

            mockOrderRepository.findById.mockResolvedValue(null);

            const result = await orderService.advanceStatus("Invalid id here");

            expect(result.success).toBe(false);
            expect(result.error).toBe("Order not found.");
        });
    });

    describe("cancelOrder", () => {

        it("Should cancel order", async () => {
            const order = new Order(product.getId(), 6000, OrderStatus.PENDING);

            mockOrderRepository.findById.mockResolvedValue(order);
            mockOrderRepository.save.mockImplementation((o: Order) => Promise.resolve(o));

            const result = await orderService.cancelOrder(order.getId());

            expect(result.success).toBe(true);
            expect(result.data?.getStatus).toBe(OrderStatus.CANCELLED);
        });

        it("Should return erro when cancelling deliverd order", async () => {

            const order = new Order(product.getId(), 6000, OrderStatus.DELIVERED);
            mockOrderRepository.findById.mockResolvedValue(order);

            const result = await orderService.cancelOrder(order.getId());

            expect(result.success).toBe(false);
        });
    });

    describe("getUserOrders", () => {

        const orders = [
            new Order(product.getId(), 5000, OrderStatus.PENDING),
            new Order(product.getId(), 6000, OrderStatus.CONFIRMED)
        ];

        mockOrderRepository.findByUser.mockResolvedValue(orders);

        const result = await orderService.getUserOrder(orders./*Sla como resolve esse caralho aqui, tenho que acessar um id auto generado? fudeu */);

        expect(result.success).toBe(true);
        expect(result.data).toHaveLength(2);
        /*Termino amanhã esse caralho*/
    })
});