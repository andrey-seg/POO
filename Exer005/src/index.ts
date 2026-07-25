abstract class Veiculo{
    protected __modelo: string;
    private __placa: string;
    protected __precoPorDia: number;
    protected __disponivel: boolean;

    constructor(modelo: string, placa: string, precoPorDia: number, disponivel: boolean){
        this.__modelo = modelo;
        this.__placa = placa;
        this.__precoPorDia = precoPorDia;
        this.__disponivel = disponivel;
    };

    alugar(){
        if(!this.__disponivel){
            throw new Error (`Veiculo indisponivel`);
        };

        this.__disponivel = false;
        return (`Veiculo ${this.__modelo} alugado com sucesso.`)

    };

    devolver(){
        if(!this.__disponivel){
            this.__disponivel = true;
            return (`Veiculo ${this.__modelo} devolvido a locadora`)
        }
    };

    toString(){
        return (`Veiculo: ${this.__modelo} | Placa: ${this.__placa} | | Preço por dia ${this.__precoPorDia} | Disponivel ${this.__disponivel}`);
    };

    getModelo(){
        return this.__modelo;
    };

    getPlaca(){
        return this.__placa;
    };

    getPrecoPorDia(){
        return this.__precoPorDia;
    };

    getDisponivel(){
        return this.__disponivel;
    };
};

class Carro extends Veiculo{
    private __numeroDePortas: number;

    constructor(modelo: string, placa: string, precoPorDia: number, numeroDePortas: number){
        super(modelo, placa, precoPorDia, true);
        this.__numeroDePortas = numeroDePortas;
    };

    getNumeroDePortas(){
        return this.__numeroDePortas;
    };
};

class Moto extends Veiculo{
    private __cilindradas: number;

     constructor(modelo: string, placa: string, precoPorDia: number, cilindradas: number){
        super(modelo, placa, precoPorDia, true);
        this.__cilindradas = cilindradas;
    };

    getCilindradas(){
        return this.__cilindradas;
    }
};

class Van extends Veiculo{
    private __capacidadePassageiros: number;

     constructor(modelo: string, placa: string, precoPorDia: number, capacidadePassageiros: number){
        super(modelo, placa, precoPorDia, true);
        this.__capacidadePassageiros = capacidadePassageiros;
    };

    getCapacidadeDePassageiros(){
        return this.__capacidadePassageiros;
    };
};

class Alugel{
    private __cliente: string;
    private __veiculo: Veiculo;
    private __dataInicio: string;
    private __dataFim: string;
    private __ativo: boolean;

    constructor(cliente: string, veiculo: Veiculo, dataInicio: string, dataFim: string, ativo: boolean){
        this.__cliente = cliente;
        this.__veiculo = veiculo;
        this.__dataInicio = dataInicio;
        this.__dataFim = dataFim;
        this.__ativo = ativo;
    }

    calcularTotal(): number{
        const inicio = new Date(this.__dataInicio);
        const fim = new Date(this.__dataFim);

        const diferencaMs = fim.getTime() - inicio.getTime();
        const dias = diferencaMs / (1000 * 60 * 60 * 24);

        return dias * this.__veiculo.getPrecoPorDia()
    };

    encerrar(){
        if(!this.__ativo){
            throw new Error (`Aluguel de veiculo já encerrado.`)
        }

        this.__ativo = false;
        return `Veículo retornado, contrato encerrado.`
    }

    getCliente(){
        return this.__cliente;
    };

    getVeiculo(){
        return this.__veiculo;
    };

    getAtivo(){
        return this.__ativo;
    }
};

class Locadora{
    private __veiculos: Veiculo[] =[];
    private __alugados: Alugel[] = [];

    constructor(){
        this.__veiculos = [];
        this.__alugados = [];
    };

    adicionarVeiculo(veiculo: Veiculo): string{
        const placaCadastrada = this.__veiculos.find(v => v.getPlaca() === veiculo.getPlaca());

        if(placaCadastrada){
            throw new Error (`Placa já cadastrada.`)
        }

        this.__veiculos.push(veiculo)
        return `Placa cadastrada com sucesso.`
    };

    alugarVeiculo(cliente: string, placa: string, dataInicio: string, dataFim: string): string{
        
        const placaCadastrada = this.__veiculos.find(v => v.getPlaca() === placa);

        if(!placaCadastrada){
            throw new Error (`Veiculo indisponivel para alugel`)
        }

        placaCadastrada.alugar();

        const novoAlugel = new Alugel(cliente, placaCadastrada, dataInicio, dataFim, true)

        this.__alugados.push(novoAlugel)
        return `Veiculo ${placaCadastrada.getModelo()} alugado`
    };

    devolverVeiculo(placa: string): string{

        const placaCadastrada = this.__alugados.find(v => v.getVeiculo().getPlaca() === placa && v.getAtivo() === true);

        if(!placaCadastrada){
            throw new Error (`Veiculo já devolvido.`)
        };

        placaCadastrada.encerrar();
        placaCadastrada.getVeiculo().devolver();
        return `Veiculo devolvido com sucesso.`
    };

    listarDisponivel(): Veiculo[]{
        const disponiveis = this.__veiculos.filter(v => v.getDisponivel() === true);

        if(disponiveis.length === 0){
            throw new Error (`Nenhum veiculo disponivel`);
        }

        return disponiveis;
    };
};