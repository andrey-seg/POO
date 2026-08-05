interface I_ApiResponse<T>{
    success: boolean;
    data?: T;
    error?: string;
};

enum OrderStatus{
    PENDING,
    CONFIRMED,
    SHIPPED,
    DELIVERED,
    CANCELLED
};

class Product {
    private __id: string;
    private __name: string;
    private __price: number;
    private __stock: number;

    constructor(id: string, name: string, price: number, stock: number){
        this.__id = id;
        this.__name = name;
        this.__price = price;
        this.__stock = stock;
    };

    decreseStock(quantity: number){
        this.__stock -= quantity;
    };

    increseStock(quantity: number){
        this.__stock += quantity;
    };

    isAvailable(quantity: number): boolean{
      return this.__stock >= quantity;
    };

    toString(){
        return `id => ${this.__id} | Name => ${this.__name} | Price => ${this.__price} | Stock => ${this.__stock}`
    };

    getId(){
        return this.__id;
    };

    getName(){
        return this.__name;
    };

    getPrice(){
        return this.__price;
    };

    getStock(){
        return this.__stock;
    };
};

class OrdemItem{
    private __product: Product;
    private __quantity: number;

    constructor(product: Product, quantity: number){
        this.__product = product;
        this.__quantity = quantity;
    };

    subTotal(){
        return this.__product.getPrice() * this.__quantity;
    };

    getProduct(){
        return this.__product;
    };

    getQuantity(){
        return this.__quantity;
    };
};

class Order{
    private __id: string;
    private __customerId: string;
    private __items: OrdemItem[] = [];
    private __status: OrderStatus;
    private __createdAt:  string;

    constructor(id: string, customerId: string){
        this.__id = id;
        this.__customerId = customerId;
        this.__items = [];
        this.__status = OrderStatus.PENDING;
        this.__createdAt = new Date().toISOString();
    };

    addItem(product: Product, quantity: number): void{
        if(!product.isAvailable(quantity)){
            throw new Error(`Product out of stock`);
        };

        const newItem = new OrdemItem(product, quantity);
        this.__items.push(newItem);
    };

    removeItem(product: Product){
        const item = this.__items.find(i => i.getProduct().getName() === product.getName());

        if(!item){
            throw new Error(`Item not found.`);
        };

        item.getProduct().increseStock(item.getQuantity());
        this.__items = this.__items.filter(i => i.getProduct().getName() !== product.getName());
    };

    caculateTotal(){
        return this.__items.reduce((total, item) =>{
            return total + item.subTotal();
        },0);
    };

    advanceStatus(): void{

        const order = [
            OrderStatus.PENDING,
            OrderStatus.CONFIRMED,
            OrderStatus.SHIPPED,
            OrderStatus.DELIVERED
        ];

        if(this.__status === OrderStatus.CANCELLED){
            throw new Error(`Order is cancelled`);
        };

        const curretIndex = order.indexOf(this.__status);

        if(curretIndex === order.length -1){
            throw new Error(`Order already delivered.`);
        };

        this.__status = order[curretIndex + 1]!;
    };

    cancel(): void{
      
        if(this.__status === OrderStatus.CANCELLED){
            throw new Error(`Order is alredy cancelled.`);
        };

        if(this.__status === OrderStatus.DELIVERED){
            throw new Error(`Order is alredy delivered.`);
        };

        this.__status = OrderStatus.CANCELLED;
    };

    toString(): string{
        return `ID => ${this.__id} | Custumer ID => ${this.__customerId} | Items => ${this.__items} | Status => ${this.__status} | Created AT ${this.__createdAt}`;
    };

    getID(){
        return this.__id;
    };

    getCustumerId(){
        return this.__customerId;
    };

    getItems(){
        return this.__items;
    };

    getStatus(){
        return this.__status;
    };

    getCreatedAt(){
        return this.__createdAt;
    };
};

class OrdeService{
    private __product: Product[] = [];
    private __order: Order[] = [];

    constructor(){
        this.__product = [];
        this.__order = [];
    };

    addProduct(product: Product): I_ApiResponse<Product>{
        const productExist = this.__product.find(p => p.getName() === product.getName());

        if(productExist){
            return {success: false, error: "Product already exists"}
        };

        this.__product.push(product);
        return {success: true, data: product};
    };

    createOrder(customerId: string): I_ApiResponse<Order>{
        const id = `Ord-${this.__order.length+1}`;

        const newOrder = new Order(id, customerId);
        this.__order.push(newOrder);

        return {success: true, data: newOrder};
    };

    addItemToOrder(orderId: string, productId: string, quantity: number): I_ApiResponse<Order>{
      const order = this.__order.find(o => o.getID() === orderId);
      const product = this.__product.find(p => p.getId() === productId);

      if(!order || !product){
        return {success: false, error: `Order or product not found.`};
      }

      try{
<<<<<<< HEAD
        order.addItem(product!, quantity);
=======
        order.addItem(product, quantity);
>>>>>>> 617815a (feat: adionando atividades POO)
        return{success: true, data: order};
      }catch(error){
        return {success: false, error: (error as Error).message};
      };
    };

    advanceOrderStatus(orderId: string): I_ApiResponse<Order>{
        const order = this.__order.find(o => o.getID() === orderId);

        if(!order){
            return {success: false, error: `Order or product not found`};
        };

        try{
            order.advanceStatus();
            return {success: true, data: order};
        } catch(error){
            return {success: false, error: (error as Error).message};
        };
    };

    cancelOrder(orderId: string): I_ApiResponse<Order>{
        const order = this.__order.find(o => o.getID() === orderId);

        if(!order){
            return {success: false, error: `Order or product not found`};
        };

        try{
            order.cancel();
            return {success: true, data: order};
        } catch(error){
            return {success: false, error: (error as Error).message};
        };
    };

    getOrdersByCustomer(customerId: string): I_ApiResponse<Order[]>{
        const orders = this.__order.filter(o => o.getCustumerId() === customerId);

        if(orders.length === 0){
            return {success: false, error: `Orders not found`};
        };

        return {success: true, data: orders};
    };
};