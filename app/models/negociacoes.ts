import { Negociacao } from "./negociacao.js";

export class Negociacoes {
    //private negociacoes : Negociacoes[] = [];
    private negociacoes : Array<Negociacao> = [];

    adiciona(negociacao: Negociacao) {
        this.negociacoes.push(negociacao);
    }
    //lista() : readonly Negociacao[];
    lista() : ReadonlyArray<Negociacao> {
        return this.negociacoes;
    }

}