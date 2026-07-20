class Produto{
    private __nome: string;
    private __preco: number;
    private __estoque: number;

    constructor(nome: string, preco: number, estoque: number){
        this.__nome = nome;
        this.__preco = preco;
        this.__estoque = estoque;
    };

    diminuirEstoque(quantidade: number){
        this.__estoque -= quantidade;
    };

    estaDisponivel(quantidade: number){
        if (this.__estoque > 0 && this.__estoque > quantidade){
            return true
        };

        return false;
    };

    toString(){
        return (`Produto: ${this.__nome} - valor: ${this.__preco} | estoque: ${this.__estoque}`);
    };

    getNome(): string{
        return this.__nome;
    };

    getPreco(): number{
        return this.__preco;
    };

    getEstoque(): number{
        return this.__estoque
    };
}

class ItemCarrinho{
    private __produto: Produto;
    private __quantidade: number;

    constructor(produto: Produto, quatidade: number){
        this.__produto = produto;
        this.__quantidade = quatidade;
    };

    subTotal(){
        return this.__quantidade * this.__produto.getPreco()
    };

    getProduto(){
        return this.__produto;
    };

    getQuantidade(){
        return  this.__quantidade;
    };
}

class Carrinho{
    private __produto: Produto;
    private __quantidade: number;
    private __itens:ItemCarrinho[];

    constructor(produto: Produto, quantidade: number){
        this.__produto = produto;
        this.__quantidade = quantidade;
        this.__itens = [];
    };

    adicionarItem(produto: Produto, quantidade: number){
        if(!produto.estaDisponivel(quantidade)){
             return (`${this.__produto} não possui quantidades suficientes.`)
        };

            //Criação do objeto para adição
            const novoItem = new ItemCarrinho(produto, quantidade);
            //Adição de item
            this.__itens.push(novoItem);
            //validação
            console.log(`Item: ${produto.getNome()} | quantidade: ${this.__quantidade}, adicionado ao carrinho`)
    };

    removerNome(nomeProduto: string): void{
        this.__itens = this.__itens.filter(Item => Item.getProduto().getNome() !== nomeProduto)
    };

    cacularTotal(){
        const total = this.__itens.reduce((total, item) =>{
            return total + item.subTotal();
        }, 0);

        return total
    };

    finalizar(pagamento: boolean){
        if(pagamento){
            this.__itens.forEach(item => item.getProduto().diminuirEstoque(item.getQuantidade()))
            this.__itens = []
        }

        return (`Erro em pagamento`)
    }
}
