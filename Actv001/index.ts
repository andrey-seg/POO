interface InotificadorEmail{
    enviar(destinatario: string, mensagem: string): void;
    validarEmailDestinatario(email: string): boolean;
};

interface InotificadorNumero{
    enviar(destinatario: string, mensagem: string): void;
    validarNumeroDestinatario(numero: string): boolean;
}

class Usuario{
    private __usuario: string;
    private __email: string;
    private __numero: string;

    constructor(usuario: string, email: string, numero: string){

        this.__usuario = usuario;
        this.__email =  email;
        this.__numero = numero;
    }

    // definindo o valor dos itens em outras classes

    set nameUser(nome: string){
        this.__usuario = nome;
    }

    set emailUser(email: string){
        this.__email = email;
    }

    set numberUser(numero: string){
        this.__numero = numero;
    }

    get userNome(){
        return this.__usuario;
    }

    get userEmail(){
        return this.__email;
    }

    get userNuber(){
        return this.__numero;
    }

    validarUsuario(email: string, numero: string): boolean{
        const emailValido = email.includes('@') && email.indexOf('.') > email.indexOf('@') + 1;

        const numeroValido = /^\d{11}$/.test(numero);

        return emailValido && numeroValido;
    }
}

class EnviarEmail implements InotificadorEmail{

    private __mensagem: string;

    constructor(mensagem: string){
        this.__mensagem = mensagem;
    }
    
    validarEmailDestinatario(email: string): boolean {
        
        if(email.includes('@') && email.indexOf('.') > email.indexOf('@') + 1){
            return true;
        }

        return false;
    }

    enviar(destinatario: string, mensagem: string): void {
        console.log(`Destinatario => ${destinatario}`);
        console.log(`${this.__mensagem}`)
    }

    get mensage(){
        return this.__mensagem;
    }
}

class EnviarSMS implements InotificadorNumero{

    private __mensagem: string;

    constructor(mensagem: string){
        this.__mensagem = mensagem;
    }

    validarNumeroDestinatario(numero: string): boolean {
        if(/^\d{11}/.test(numero)){
            return true;
        }

        return false;
    }

    enviar(destinatario: string, mensagem: string): void {
        console.log(`Destinatario => ${destinatario}`);
        console.log(`${this.__mensagem}`)
    }
}
