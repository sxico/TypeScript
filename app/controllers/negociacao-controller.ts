import { logarTempoDeExecucao } from "../decorators/logar-tempo-execucao.js";
import { DiasDaSemana } from "../enums/dias-da-semana.js";
import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";
import { MensagemView } from "../views/mensagem-view.js";
import { NegociacoesView } from "../views/negociacoes-view.js";
import { domInjector } from "../decorators/dom-injector.js";
import { NegociacoesService } from "../services/negociacoes-services.js";
import { imprimir } from "../utils/imprimir.js";
//import { NegociacaoDoDia } from "../interfaces/negociacao-do-dia.js";

export class NegociacaoController{
    @domInjector('#data')
    private inputData: HTMLInputElement;
    @domInjector('#quantidade')
    private inputQuantidade: HTMLInputElement;
    @domInjector('#valor')
    private inputValor: HTMLInputElement;
    private negociacoes = new Negociacoes;
    private negociacoesView = new NegociacoesView('#negociacoesView');
    private mensagemView = new MensagemView('#mensagemView');
    private negociacoesServices = new NegociacoesService();

    constructor(){
        this.negociacoesView.update(this.negociacoes);
    }
    //Parâmetro opcional (padrão false) - caso queira carregar em segundos passe true
    @logarTempoDeExecucao()
    public adiciona():void {
        const negociacao = Negociacao.criaDe(
            this.inputData.value,
            this.inputQuantidade.value,
            this.inputValor.value
        );
        if(!this.diaUtil(negociacao.data)){
            this.mensagemView.update('Somente dias úteis são aceitos para a negociação!');
            return ;
        }
            this.negociacoes.adiciona(negociacao);
            imprimir(negociacao, this.negociacoes);
            this.limparFormulario();
            this.atualizaView();
    }

    importaDados(): void{
        this.negociacoesServices.obterNegociacoesDoDia()
        .then(negociacoesDeHoje => {
            for(let negociacao of negociacoesDeHoje) {
                this.negociacoes.adiciona(negociacao);
            }
            this.negociacoesView.update(this.negociacoes);
        })
    }

    private diaUtil(data: Date): boolean {
        return (data.getDay() > DiasDaSemana.DOMINGO 
                && data.getDay() < DiasDaSemana.SABADO)
    }

    // private criaNegociacao():Negociacao {
    // }

    private limparFormulario(): void {
        this.inputData.value = '';
        this.inputQuantidade.value = '';
        this.inputValor.value = '';
        this.inputData.focus();
    }

    private atualizaView(): void {
        this.negociacoesView.update(this.negociacoes);
        this.mensagemView.update('Negociação adicionada com sucesso!');
    }
}