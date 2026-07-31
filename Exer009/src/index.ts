enum StatusTarefa{

    PENDENTE,
    EM_ANDAMENTO,
    CONCLUIDA
};

class Desenvolvedor{
    private __nome: string;
    private __email: string;
    private __especialidade: string;

    constructor(nome: string, email: string, especialidade: string){
        this.__nome = nome;
        this.__email = email;
        this.__especialidade = especialidade;
    }

    toString(): string{
        return `Nome: ${this.__nome} | Email: ${this.__email} | Especialidade: ${this.__especialidade}`;
    };

    getNome(){
        return this.__nome;
    };

    getEmail(){
        return this.__email;
    };

    getEspecialidade(){
        return this.__especialidade;
    };
};

class Tarefa{
    private __titulo: string;
    private __descrição: string;
    private __status: StatusTarefa;
    private __responsavel: Desenvolvedor | undefined;

    constructor(titulo: string, descricao: string, status: StatusTarefa, responsavel?: Desenvolvedor){
        this.__titulo = titulo;
        this.__descrição = descricao;
        this.__status = status;
        this.__responsavel = responsavel;
    };

    Iniciar(): string{
        if(this.__status !== StatusTarefa.PENDENTE){
            throw new Error(`Tarefa já iniciada`);
        };

        this.__status = StatusTarefa.EM_ANDAMENTO;
        return `Tarefa ${this.__titulo} iniciada.`;
    };

    concluir(): string{
        if(this.__status !== StatusTarefa.EM_ANDAMENTO){
            throw new Error(`Tarefa não iniciada ou finalizada`);
        };

        this.__status = StatusTarefa.CONCLUIDA;
        return `Tarefa ${this.__titulo} concluida`;
    };

    setResponsavel(desenvolvedor: Desenvolvedor){
        this.__responsavel = desenvolvedor;
    };

    toString(): string{
        return `Tarefa: ${this.__titulo} | Descrição: ${this.__descrição} | Status: ${this.__status} | Responsavel: ${this.__responsavel}`;
    };

    getTitulo(){
        return this.__titulo;
    };

    getDescricao(){
        return this.__descrição;
    };

    getStatus(){
        return this.__status;
    };

    getResponsavel(){
        return this.__responsavel;
    };
};

class Projeto{
    private __nomeProjeto: string;
    private __descricao: string;
    private __Tarefas: Tarefa[] = [];
    private __Time: Desenvolvedor[] = [];

    constructor(nomeProjeto: string, descricao: string){
        this.__nomeProjeto = nomeProjeto;
        this.__descricao = descricao;
        this.__Tarefas = [];
        this.__Time = [];
    };

    adicionarDesenvolvedor(desenvolvedor: Desenvolvedor): string{
        const emailExiste = this.__Time.find(e => e.getEmail() === desenvolvedor.getEmail());

        if(emailExiste){
            throw new Error(`Email já cadastrado.`);
        };

        this.__Time.push(desenvolvedor);
        return `Desenvolvedor adicionado no time`;
    };

    adionarTarefa(tarefa: Tarefa): string{
        const tarefaExiste = this.__Tarefas.find(t => t.getTitulo() === tarefa.getTitulo());

        if(tarefaExiste){
            throw new Error(`Tarefa já cadastrada`);
        };

        this.__Tarefas.push(tarefa);
        return `Tarefa adionada com sucesso.`;
    };

    atribuirTarefa(tituloTarefa: string, emailDesenvolvedor: string): string{

        const tarefaExiste = this.__Tarefas.find(t => t.getTitulo() === tituloTarefa);
        const emailExiste = this.__Time.find(e => e.getEmail() === emailDesenvolvedor);

        if(!tarefaExiste || !emailExiste){
            throw new Error(`Email ou desenvolvedor não encontrado`);
        };

        tarefaExiste.setResponsavel(emailExiste);
        return `Tarefa atribuida para ${emailExiste.getNome()}`;
    }

    listarPorStatus(status: StatusTarefa){
        return this.__Tarefas.filter(t => t.getStatus() === status);
    };

    listarPendentes(){
        return this.__Tarefas.filter(t => t.getStatus() === StatusTarefa.PENDENTE);
    };

    listarEmAndamento(){
        return this.__Tarefas.filter(t => t.getStatus() === StatusTarefa.EM_ANDAMENTO);
    };

    listarConcluido(){
        return this.__Tarefas.filter(t => t.getStatus() === StatusTarefa.CONCLUIDA);
    };

    progresso(): string{
        const totalDeTarefas = this.__Tarefas.length;

        if(totalDeTarefas === 0){
            throw new Error(`Nenhuma tarefa cadastrada.`);
        };

        const tarefasConcluidas = this.__Tarefas.filter( t => t.getStatus() === StatusTarefa.CONCLUIDA).length;

        const persentual = (tarefasConcluidas / totalDeTarefas) * 100;
        return `${persentual}% concluido`
    };

    getNomeProjeto(){
        return this.__nomeProjeto;
    };

    getDescricao(){
        return this.__descricao;
    };

    getTarefas(){
        return this.__Tarefas;
    };

    getTime(){
        return this.__Time;
    };
};