import { NegociacaoController } from "./controllers/negociacao-controller.js";
// import { negociacoesView } from "./views/negociacoes-view.js";

const controller = new NegociacaoController();
const form = document.querySelector(".form");
if (form){
    form.addEventListener('submit', event => {
        event.preventDefault();
        controller.adiciona();
    });
} else {
    throw Error('Não foi possível inicializar a aplicação. Verifique o forms');
}

const botaoImporta = document.querySelector("#botao-importa");
if(botaoImporta){
    botaoImporta.addEventListener('click', () => {
        controller.importaDados();
    })
} else {
    throw Error('Botão Importa não foi encontrado.');
}
