enum TipoPlano{
    MENSAL,
    TRIMESTRAL,
    ANUAL
};

class Plano{
    private __tipo: TipoPlano;
    private __preco: number;
    private __duracaoEmDias: number;

    constructor(tipo: TipoPlano, preco: number, duracaoEmDias: number){
        this.__tipo = tipo;
        this.__preco = preco;
        this.__duracaoEmDias = duracaoEmDias;
    };
    
    toString():string {
        return `Tipo: ${this.__tipo} | Preço: ${this.__preco} | Duração em dias ${this.__duracaoEmDias}`;
    };

    getTipo(){
        return this.__tipo;
    };

    getPreco(){
        return this.__preco;
    };

    getDuracaoEmDias(){
        return this.__duracaoEmDias;
    };
};

class Aluno{
    private __nome: string;
    private __cpf: string;
    private __plano:Plano;
    private __dataVencimento: string;
    private __ativo: boolean;

    constructor(nome: string, cpf: string, plano: Plano, dataVencimento: string, ativo: boolean){
        this.__nome = nome;
        this.__cpf = cpf;
        this.__plano = plano;
        this.__dataVencimento = dataVencimento;
        this.__ativo = ativo;
    };

    renovar(): string{
        if(this.__ativo){
            throw new Error(`Incrição já está ativa.`);
        };

        this.__ativo = true;
        return `Incrição renovada.`;
    };

    cancelar(): string{

        if(!this.__ativo){
            throw new Error(`Incrição não está ativa.`);
        };

        this.__ativo = false;
        return `Inscrição cancelada.`
    };

    estaAtivo(): string{
        if(!this.__ativo){
            return `Incrição não ativa`;
        } else{
            return `Inscrição ativa`;
        };
    };

    toString(): string{
        return `Aluno: ${this.__nome} | cpf: ${this.__cpf} | Plano: ${this.__plano} | Data de vencimento ${this.__dataVencimento} | Ativo? ${this.__ativo}`;
    };

    getNome(){
        return this.__nome;
    };

    getCpf(){
        return this.__cpf;
    };

    getPlano(){
        return this.__plano;
    };

    getDataVencimento(){
        return this.__dataVencimento;
    };

    getAtivo(){
        return this.__ativo;
    };

};

class Aula{
    private __nome: string;
    private __instrutor: string;
    private __horario: string;
    private __vagas: number;
    private __inscritos: Aluno[] = [];

    constructor(nome:string, instrutor: string, horario: string, vagas: number){
        this.__nome = nome;
        this.__instrutor = instrutor;
        this.__horario = horario;
        this.__vagas = vagas;
        this.__inscritos = [];
    };

    inscreverAluno(aluno: Aluno): string{
        const alunoCadastrado = this.__inscritos.find(a => a.getCpf() === aluno.getCpf() && aluno.getAtivo() === true);

        if(alunoCadastrado){
            throw new Error(`Aluno já cadastrado.`);
        };

        this.__inscritos.push(aluno);
        return `Aluno cadastrado.`
    };

    cancelarInscricao(cpf: string): void{
        this.__inscritos = this.__inscritos.filter(a => a.getCpf() !== cpf);
    };

    listarInscritos(): Aluno[]{
       return this.__inscritos;
    };

    getNome(){
        return this.__nome;
    };

    getInstrutor(){
        return this.__instrutor
    };

    getHorario(){
        return this.__horario;
    };

    getVagas(){
        return this.__vagas;
    };

    getInscritos(){
        return this.__inscritos;
    }

};

class Academia{
    private __Aluno: Aluno[] = [];
    private __Aula: Aula[] = [];

    constructor(){
        this.__Aluno = [];
        this.__Aula = [];
    };

    matricularAluno(aluno:Aluno): string{

        const AlunoExiste = this.__Aluno.find(a => a.getCpf() === aluno.getCpf());

        if(AlunoExiste){
            throw new Error(`Aluno já cadastrado, veja ele está ativo.`);
        };

        this.__Aluno.push(aluno);
        return `Aluno cadastrado.`
    };

    cancelarMatricula(cpf: string):string{
        const AlunoExiste = this.__Aluno.find(a => a.getCpf() !== cpf);

        if(!AlunoExiste){
            throw new Error(`Aluno não cadastrado`);
        };

        this.__Aluno = this.__Aluno.filter(CPF => CPF.getCpf() === cpf);
        return `Matricula cancelada`;
    };

    agendarAula(aula:Aula): string{
        const aulaOcupada = this.__Aula.find(a => a.getHorario() === aula.getHorario());

        if(aulaOcupada){
            throw new Error(`Horario já ocupado`);
        };

        this.__Aula.push(aula);
        return `Horario cadastrado`;
    };

    inscreverEmAula(cpf: string, nomeAula: string): string{
        const cadastroAluno = this.__Aluno.find(a => a.getCpf() === cpf);
        const cadastroAula = this.__Aula.find(a => a.getNome() === nomeAula);

        if(!cadastroAluno || !cadastroAula){
            throw new Error(`Aluno ou aula não cadastrado.`);
        };

        cadastroAula.inscreverAluno(cadastroAluno);
        return `Aluno cadastrado`;
    };

    listarAlunosAtivos(){
        return this.__Aluno.filter(a => a.getAtivo() === true);
    };
};