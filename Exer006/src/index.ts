enum tipoMovimentacao{
    ENTRADA,
    SAIDA
};

class Movimentacao{
    private __produto: string;
    private __quantidade: number;
    private __tipo: tipoMovimentacao;

    constructor(produto: string, quantidade: number, tipo: tipoMovimentacao){
        this.__produto = produto;
        this.__quantidade = quantidade;
        this.__tipo = tipo;
    };

    toString(){
        return `Produto => ${this.__produto} | Quantidade => ${this.__quantidade} | Tipo => ${this.__tipo}`
    };

    getProduto(){
        return this.__produto;
    };

    getQuantidade(){
        return this.__quantidade;
    };

    getTipo(){
        return this.__tipo;
    };
};

class Produto{
    private __nome: string;
    private __Preco: number;
    private __QuantidadeEstoque: number;

    constructor(nome: string, preco: number, QuantidadeEstoque: number){
        this.__nome = nome;
        this.__Preco = preco;
        this.__QuantidadeEstoque = QuantidadeEstoque;
    };

    entrada(quantidadeEntrada: number): string{
        this.__QuantidadeEstoque += quantidadeEntrada;
        return `Quantidade de itens recebidos: ${quantidadeEntrada}`;
    };

    saida(quantidadeSaida: number): string{
        this.__QuantidadeEstoque -= quantidadeSaida;
        return `Quantidade de itens de Saida: ${quantidadeSaida}`;
    };

    toString(): string{
        return `Nome => ${this.__nome} | Preço => ${this.__Preco} | Quantidade em estoque => ${this.__QuantidadeEstoque}`;
    };

    getNome(){
        return this.__nome;
    };

    getPreco(){
        return this.__Preco;
    };

    getQuantidadeEstoque(){
        return this.__QuantidadeEstoque;
    };
};

class Estoque{
    private __produtos: Produto[] = [];
    private __movimentos: Movimentacao[] = [];

    constructor(){
        this.__produtos = [];
        this.__movimentos = [];
    };

    adicionarProduto(produto: Produto): string{
        const produtoCadastrado = this.__produtos.find(p => p.getNome() === produto.getNome());

        if(produtoCadastrado){
            throw new Error(`Produto já cadastrado!`);
        };

        this.__produtos.push(produto);
        const movimentacao = new Movimentacao(produto.getNome(), produto.getQuantidadeEstoque(), tipoMovimentacao.ENTRADA);
        this.__movimentos.push(movimentacao);
        return `Produto cadastrado com sucesso!`;
    };

    registrarSaida(nomeProduto: string, quantidade: number): string{
        const produtoSaida = this.__produtos.find(p => p.getNome() === nomeProduto);

        if(!produtoSaida){
            throw new Error(`Produto inexistente ou já removido.`)
        };

        produtoSaida.saida(quantidade);
        const movimentacao = new Movimentacao(nomeProduto, quantidade, tipoMovimentacao.SAIDA);
        this.__movimentos.push(movimentacao)
        return `Produto retirado com sucesso!`;
    };

    registrarEntrada(nomeProduto: string, quantidade: number): string{
        const produtoEntrada = this.__produtos.find(p => p.getNome() === nomeProduto);

        if(!produtoEntrada){
            throw new Error(`Produto não cadastrado.`);
        };

        produtoEntrada.entrada(quantidade);
        const movimentacao = new Movimentacao(nomeProduto, quantidade, tipoMovimentacao.ENTRADA);
        this.__movimentos.push(movimentacao);
        return `Entrada adicionada ao estoque.`;
    };

    gerarRelatorio(): void{
        this.__produtos.forEach(produto => {
            console.log(produto.toString());
        });
    };

    listarMovimentacao(): void{
        this.__movimentos.forEach(movimentos => {
            console.log(movimentos.toString());
        });
    };

    getListaPordutos(){
        return this.__produtos;
    };

    getListaMovimentos(){
        return this.__movimentos;
    };
};