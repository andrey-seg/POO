enum StatusPedido{
    ABERTO,
    EM_PREPARO,
    ENTREGUE,
    CANCELADO
}

class ItemCardapio{
    private __nome: string;
    private __preco: number;
    private __categoria: string;

    constructor(nome: string, preco: number, categoria: string){
        this.__nome = nome;
        this.__preco = preco;
        this.__categoria = categoria;
    };

    toString(){
        return `Nome: ${this.__nome} | Preço: ${this.__preco} | Categoria: ${this.__categoria}`;
    };

    getNome(){
        return this.__nome;
    };

    getPreco(){
        return this.__preco;
    };

    getCategoria(){
        return this.__categoria;
    };
};

class ItemPedido{
    private __item: ItemCardapio;
    private __quantidade: number;

    constructor(item: ItemCardapio, quantidade: number){
        this.__item = item;
        this.__quantidade = quantidade;
    };

    subtotal(){
        return this.__item.getPreco() * this.__quantidade;
    };

    toString(){
        return `Item: ${this.__item} | Quantidade: ${this.__quantidade}`;
    };

    getItem(){
        return this.__item;
    };

    getQuantidade(){
        return this.__quantidade;
    };
};

class Pedido{
    private __numeroMesa: number;
    private __itens: ItemPedido[] = [];
    private __status: StatusPedido;

    constructor(numeroMesa: number, status: StatusPedido,){
        this.__numeroMesa = numeroMesa;
        this.__itens = [];
        this.__status = status;
    };

    adicionarItem(item: ItemCardapio, quantidade: number): string{
        const novoPedidoDeItem = new ItemPedido(item, quantidade);
        this.__itens.push(novoPedidoDeItem);
        return `Pedido realizado`
    };

    removerItem(nomeItem: string){
        this.__itens = this.__itens.filter(i => i.getItem().getNome() !== nomeItem);

        return `Item ${nomeItem} removido`;
    };

    calcularTotal(){
        return this.__itens.reduce((total, item) =>{
            return total + item.subtotal();
        },0);
    };

    avancarStatus(){

        const ordem = [StatusPedido.ABERTO, StatusPedido.EM_PREPARO, StatusPedido.ENTREGUE];
        const indexAtual = ordem.indexOf(this.__status);
        
        if(this.__status === StatusPedido.CANCELADO){
            throw new Error(`Pedido cancelado`);
        };

        if(indexAtual === -1 || indexAtual === ordem.length -1){
            throw new Error(`Não e possivel avançar os status`);
        };

        this.__status = ordem[indexAtual + 1]!//diz ao typescript que esse valor existe sim;

    };

    cancelar(): string{

        if(this.__status === StatusPedido.CANCELADO){
            throw new Error(`Pedido já cancelado`);
        };

        this.__status = StatusPedido.CANCELADO;
        return `Pedido cancelado`;
    };

    toSting(): string{
        return `Número da mesa ${this.__numeroMesa} | Itens: ${this.__itens} | Status: ${this.__status}`;
    };

    getNumeroDaMesa(){
        return this.__numeroMesa;
    };

    getItens(){
        return this.__itens;
    };

    getStatus(){
        return this.__status;
    };
};

class Restalrante{
    private __cardapio: ItemCardapio[] = [];
    private __pedidos: Pedido[] = [];

    constructor(){
        this.__cardapio = [];
        this.__pedidos = [];
    };

    adicionarItemCardapio(item: ItemCardapio): string{
        const existeNoCardapio = this.__cardapio.find(c => c.getNome() === item.getNome());

        if(existeNoCardapio){
           throw new Error(`Item já existe no cardapio`); 
        };

        this.__cardapio.push(item);
        return `Item adicionado no cardapio`;
    };

    abrirPedido(numeroMesa: number): string{
        const pedidoAtivo = this.__pedidos.find(p => p.getNumeroDaMesa() === numeroMesa && p.getStatus() === StatusPedido.ABERTO);

        if(pedidoAtivo){
            throw new Error(`Mesa ${numeroMesa} com pedido já aberto`);
        };

        const novopedido = new Pedido(numeroMesa, StatusPedido.ABERTO);
        this.__pedidos.push(novopedido);
        return `Pedidos abertos com sucesso.`;
    };

    buscarPedidos(numeroMesa: number){
    
        const pedidosMesa = this.__pedidos.find(p => p.getNumeroDaMesa() === numeroMesa);

        if(!pedidosMesa){
            throw new Error(`Mesa inexistente ou não cadastrada`)
        };

        return pedidosMesa;
    };

    fecharConta(numeroMesa: number){
        const pedidoMesa = this.__pedidos.find(p => p.getNumeroDaMesa() === numeroMesa && p.getStatus() === StatusPedido.ENTREGUE);

        if(!pedidoMesa){
            throw new Error(`Mesa encerrada ou não existente`);
        };

        const itens = pedidoMesa.getItens().map(i => `${i.getItem().getNome()} X ${i.getQuantidade()} - R$${i.subtotal()}`).join("\n");

        const total = pedidoMesa.calcularTotal();

        return `=== Conta mesa: ${numeroMesa} ===\n Itens: ${itens} ===\n Total R$${total}`;
    };

    listarPedidosPorStatus(status: StatusPedido){
        return this.__pedidos.filter(p => p.getStatus() === status);
    };

    getCardapio(){
        return this.__cardapio;
    };

    getPedidos(){
        return this.__pedidos
    };
};