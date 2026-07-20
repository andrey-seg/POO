abstract class Personagem {
  protected __nome: string;
  protected __hp: number;
  protected __ataque: number;
  protected __defesa: number;

  constructor(nome: string, hp: number, ataque: number, defesa: number){
    this.__nome = nome;
    this.__hp = hp;
    this.__ataque = ataque;
    this.__defesa = defesa;
  }

  atacar(alvo: Personagem): void{
    alvo.__hp -= this.__ataque - alvo.__defesa;
  }

  receberDano(dano: number): void{
    this.__hp -= dano;
  }

  estaVivo(): boolean{
    if(this.__hp > 0){
        return true;
    }

    return false;
  }

  abstract ataqueEspecial(alvo: Personagem): void;

  toString(): string{
    return `${this.__nome}, ${this.__hp}, ${this.__ataque}, ${this.__defesa}`;
  }
}