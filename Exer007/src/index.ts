enum tipoQuarto{
    SOLTEIRO,
    CASAL,
    SUITE
}

class Quarto{
    private __numero: number;
    private __tipo: tipoQuarto;
    private __precoPorNoite: number;
    private __disponivel: boolean = true;

    constructor(numero: number, tipo: tipoQuarto, precoPorNoite: number, disponivel: boolean){
        this.__numero = numero;
        this.__tipo = tipo;
        this.__precoPorNoite = precoPorNoite;
        this.__disponivel = disponivel;
    };

    ocupar(){

        if(!this.__disponivel){
            throw new Error(`Quarto indisponivel.`);
        };
        return this.__disponivel = false;
    };

    liberar(){
        if(this.__disponivel){
            throw new Error(`Quarto já está disponivel.`);
        };
        
        return this.__disponivel = true;
    };

    toString(){
        return `Quarto: ${this.__numero} | tipo: ${this.__tipo} | Preço por noite ${this.__precoPorNoite} | disponivel? ${this.__disponivel}`;
    };

    getNumero(){
        return this.__numero;
    };

    getTipo(){
        return this.__tipo;
    };

    getPrecoPorNoite(){
        return this.__precoPorNoite;
    };

    getDisponivel(){
        return this.__disponivel;
    };
};

class Reserva{
    private __hospede: string;
    private __quarto: Quarto;
    private __dataEntrada: string;
    private __dataSaida: string;
    private __ativa: boolean;

    constructor(hospede: string, quarto: Quarto, dataEntrada: string, dataSaida: string, ativa: boolean){
        this.__hospede = hospede;
        this.__quarto = quarto;
        this.__dataEntrada = dataEntrada;
        this.__dataSaida = dataSaida;
        this.__ativa = ativa;
    };

    calcularTotal(){
        const inicio = new Date(this.__dataEntrada);
        const fim = new Date(this.__dataSaida);

        if(inicio > fim){
            throw new Error(`Data de inicio não pode ser antes de data de fim.`)
        }

        const diferencaDias = fim.getTime() - inicio.getTime();
        const dias = diferencaDias / (1000 * 60 * 60 * 24);

        return dias * this.__quarto.getPrecoPorNoite();
    };

    encerrar(): string{
        if(!this.__ativa){
            throw new Error(`Contrato não ativo.`);
        };

        this.__ativa = false;
        return `Contrato encerrado.`;
    };

    toString(){
        return `Hospede: ${this.__hospede} | Quarto: ${this.__quarto} | Data de entrada: ${this.__dataEntrada} | Data de saida: ${this.__dataSaida} | Contrato ativo? ${this.__ativa}`;
    };

    getHospede(){
        return this.__hospede;
    };

    getQuarto(){
        return this.__quarto;
    };

    getDataEntrada(){
        return this.__dataEntrada;
    };

    getDataSaida(){
        return this.__dataSaida;
    };

    getAtivo(){
        return this.__ativa;
    };
};

class Hotel{
    private __quarto: Quarto[] = [];
    private __reserva: Reserva[] = [];

    constructor(){
        this.__quarto = [];
        this.__reserva = [];
    };

    adicionarQuarto(quarto: Quarto): string{
        const quartoExiste = this.__quarto.find(q => q.getNumero() === quarto.getNumero());

        if(quartoExiste){
            throw new Error(`Quarto já existe.`);
        };

        this.__quarto.push(quarto);
        return `Quarto adicionado com sucesso.`;
    };

    fazerReserva(hospede: string, numeroQuarto: number, dataEntrada: string, dataSaida: string):string{
        const quartoExiste =  this.__quarto.find(q => q.getNumero() === numeroQuarto && q.getDisponivel() === true);

        if(!quartoExiste){
            throw new Error(`Quarto já reservado.`);
        };

        quartoExiste.ocupar();
        const novaReserva = new Reserva(hospede, quartoExiste, dataEntrada, dataSaida, true)
        this.__reserva.push(novaReserva);
        return `Quarto reservado com sucesso.`;
    };

    fazerCheckOut(numeroQuarto: number): string{
        const reserva = this.__reserva.find(r => r.getQuarto().getNumero() === numeroQuarto && r.getAtivo() === true);

        if(!reserva){
            throw new Error(`Check out já realizado`);
        }
        reserva.encerrar();
        reserva.getQuarto().liberar();
        return`Check out realizado.`;
    };

    listarDisponiveis(): Quarto[] {
        return this.__quarto.filter(q => q.getDisponivel() === true);
    };

    listarReservas(): Reserva[]{
        return this.__reserva.filter(q => q.getAtivo() === true);
    };
};