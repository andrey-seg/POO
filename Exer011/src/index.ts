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

    checkout(bookTitle: string): string{
        if(this.__title !== bookTitle || this.__available !== true){
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
    private __book: string;
    private __member: string;
    private __loanDate: string;
    private __dueDate: string;
    private __status: boolean;

    constructor(book: string, member: string, loanDate: string, dueDate: string, status: boolean){
        this.__book = book;
        this.__member = member;
        this.__loanDate = loanDate;
        this.__dueDate = dueDate;
        this.__status = status;
    };

    
}