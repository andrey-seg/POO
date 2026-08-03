enum LoanStatus{
    ACTIVE,
    RETURNED,
    OVERDUE
};

class Book{
    private __title: string;
    private __author: string;
    private __isbn: string;
    private __available: boolean;

    constructor(title: string, author: string, isbn: string, available: boolean){
        this.__title = title;
        this.__author = author;
        this.__isbn = isbn;
        this.__available = available;
    };

    checkout(): string{
        if(!this.__available){
            throw new Error(`Livro não disponivel`);
        };

        this.__available = false;
        return `Livro locado com sucesso`;
    };

    returnBook(): string{
        this.__available = true;
        return `Livro retornado com sucesso`;
    };

    toString(): string{
        return `Livro: ${this.__title} | Autor: ${this.__author} | Codigo do livro ${this.__isbn} | Disponivel? ${this.__available}`;
    };

    getTitle(){
        return this.__title;
    };

    getAuthor(){
        return this.__author;
    };

    getIsbn(){
        return this.__isbn;
    };

    getAvailable(){
        return this.__available;
    };
};

class Member{
    private __name: string;
    private __email: string;
    private __membershipId: string;
    private __active: boolean;

    constructor(name: string, email: string, membershipId: string, active: boolean){
        this.__name = name;
        this.__email = email;
        this.__membershipId = membershipId;
        this.__active = active;
    };

    suspend(){
        if(this.__active === false){
            throw new Error(`Assinatura já cancelada.`);
        };

        this.__active = false;
        return `Assinatura da biblioteca cancelada.`;
    };

    activate(){
        if(this.__active === true){
            throw new Error(`Assinatura já ativa.`);
        };

        this.__active = true;
        return `Assinatura já ativa.`
    };

    toString(){
        return `Nome: ${this.__name} | Email: ${this.__email} | Id de assinatura ${this.__membershipId} | Assinatura ativa? ${this.__active}`;
    };

    getName(){
        return this.__name;
    };

    getEmail(){
        return this.__email;
    };

    getMembershipId(){
        return this.__membershipId;
    };

    getActive(){
        return this.__active;
    };
};

class Loan{
    private __book: Book;
    private __member: Member;
    private __loanDate: string;
    private __dueDate: string;
    private __status: LoanStatus;

    constructor(book: Book, member: Member, loanDate: string, dueDate: string, status: LoanStatus){
        this.__book = book;
        this.__member = member;
        this.__loanDate = loanDate;
        this.__dueDate = dueDate;
        this.__status = status;
    };

    returnLoan(): string{
        if(this.__status === LoanStatus.RETURNED){
            throw new Error(`Livro já retornado`);
        };

        this.__status = LoanStatus.RETURNED;
        return `Livro retornado a biblioteca`;
    };

    isOverdue(): boolean{
        return new Date() > new Date(this.__dueDate);
    };

    toString(){
        return `Livro: ${this.__book} | Membro: ${this.__member} | Data de inicio emprestimo: ${this.__loanDate} | Data de vencimento: ${this.__dueDate} | Status emprestimo? ${this.__status}`
    };

    getBook(){
        return this.__book;
    };

    getMember(){
        return this.__member;
    };

    getLoanDate(){
        return this.__loanDate;
    };

    getDueDate(){
        return this.__dueDate;
    };

    getStatus(){
        return this.__status;
    };
};

class Library{
    private __booksArray: Book[] = [];
    private __membersArray: Member[] = [];
    private __loanArray: Loan[] = [];

    constructor(){
        this.__booksArray = [];
        this.__membersArray = [];
        this.__loanArray = [];
    };

    addBook(book: Book): string{
        const bookIsbnExist = this.__booksArray.find(b => b.getIsbn() === book.getIsbn());

        if(bookIsbnExist){
            return `Livro já cadastrado na biblioteca`;
        };

        this.__booksArray.push(book);
        return `Livro cadastrado com sucesso`;
    };

    registerMember(member: Member): string{
        const memberEmailExist = this.__membersArray.find(m => m.getEmail() === member.getEmail());

        if(memberEmailExist){
            throw new Error(`Membro já está cadastrado`);
        };

        this.__membersArray.push(member);
        return `Membro cadastrado com sucesso`;
    };

    checkoutBook(isbn: string, membershipId: string, dueDate: string): string{
        const findIsbn = this.__booksArray.find(b => b.getIsbn() === isbn);
        const memberEmailExist = this.__membersArray.find(m => m.getMembershipId() === membershipId);

        if(!findIsbn || !memberEmailExist){
            throw new Error(`Membro ou livro inexistente ou não cadastrado.`);
        };

        const newLoan = new Loan(findIsbn, memberEmailExist, new Date().toISOString(), dueDate, LoanStatus.ACTIVE);
        this.__loanArray.push(newLoan);
        return `Emprestimo cadastrado`;
    };

    returnBook(isbn: string): string{
        const isbnExist = this.__loanArray.find(b => b.getBook().getIsbn() ===isbn);

        if(!isbnExist || isbnExist.getStatus() === LoanStatus.RETURNED){
            throw new Error(`Livro não encontrado ou já retornado`);
        };

       isbnExist.returnLoan();
       isbnExist.getBook().returnBook();
       return `Livro devolvido`;
    };

    listOverDueLoans(){
        return this.__loanArray.filter(l => l.isOverdue() && l.getStatus() === LoanStatus.ACTIVE);
    };

    getMemberHistory(membershipId: string){

        const memberExist = this.__membersArray.find(m => m.getMembershipId() === membershipId);

        if(!memberExist){
            throw new Error(`Membro não cadastrado`);
        };


        return this.__loanArray.filter(l => l.getMember().getMembershipId() === membershipId);
    };
};