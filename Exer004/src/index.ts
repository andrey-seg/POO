class Servico {
    private __nome: string;
    private __duracao: number;
    private __preco: number;

    constructor(nome: string, duracao: number, preco: number){
        this.__nome = nome;
        this.__duracao = duracao;
        this.__preco = preco;
    };

    toString(){
        return (`Cliente => ${this.__nome} | Duração => ${this.__duracao} | Valor => ${this.__preco}`);
    };

    getNome(){
        return this.__nome;
    };

    getDuracao(){
        return this.__duracao;
    };

    getPreco(){
        return this.__preco
    };
};

class Agendamento{
    private __cliente: string;
    private __servico: Servico;
    private __data: string;
    private __horario: string;
    private __confirmado: boolean;

    constructor(cliente: string, servico: Servico, data: string, horario: string, confirmado: boolean){
        this.__cliente = cliente;
        this.__servico = servico;
        this.__data = data;
        this.__horario = horario;
        this.__confirmado = confirmado;
    }

   confirmar(){
    this.__confirmado = true;
   }

   cancelar(){
    this.__confirmado = false;
   }

   toString(){
    return(`Cliente => ${this.__cliente} | Serviço => ${this.__servico} | Data => ${this.__data} | Hoarario => ${this.__horario} | Confirmado => ${this.__confirmado}`);
   }

   getCliente(){
    return this.__cliente;
   };

   getServico(){
    return this.__servico;
   };

   getData(){
    return this.__data;
   };

   getHorario(){
    return this.__horario;
   };

   getConfirmado(){
    return this.__confirmado;
   };
};

class Agenda{
    private __agendeamentos: Agendamento[];

    constructor(){
        this.__agendeamentos = [];
    };

    agendar(cliente: string, servico: Servico, data: string, horario: string){
        const horarioOcupado = this.__agendeamentos.some(Agendamento => Agendamento.getData() === data && Agendamento.getHorario() === horario);

        if(horarioOcupado){
            throw new Error("Horário ja ocupado!");
        }

        const novoAgendamento = new Agendamento(cliente, servico, data, horario, false);
        this.__agendeamentos.push(novoAgendamento);
    };

    cancelarAgendamento(cliente: string, data: string, horario: string){
        const agendamento = this.__agendeamentos.find(Agendamento => Agendamento.getCliente() === cliente && Agendamento.getData() === data && Agendamento.getHorario() === horario);

        if(!agendamento){
            throw new Error(`Agendamento não encontrado`);
        };

        agendamento.cancelar();
    };

    listarPorData(data: string){
        return this.__agendeamentos.filter(Agendamento => Agendamento.getData() === data);
    };

    listaConfirmados(){
        return this.__agendeamentos.filter(Agendamento => Agendamento.getConfirmado() === true);
    };
};