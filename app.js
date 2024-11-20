//let titulo = document.querySelector('h1'); //Com a função documento.querySelector nos vamos SELECIONAR no documento HTML o que nós queremos manipular
//titulo.innerHTML = 'Jogo do número secreto.'; //Nao colocar o let, pois a variável ja foi criada.
//O innerHTML, vai indicar o que vamos alterar na seleção realizada.

//let paragrafo = document.querySelector ('p');
//paragrafo.innerHTML = 'Escolha um número entre 1 e 10';
let listaDeNumerosSorteados = []
let limite = 10
let numeroSecreto = geradorAleatorio ();
let tentativas = 1;

console.log (`O numero gerado foi ${numeroSecreto}`);


function exibirTextoNaTela (tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2})
}

function mensagemInicial(){
exibirTextoNaTela('h1', 'Jogo do número secreto.');
exibirTextoNaTela('p', `Escolha um número de 1 a ${limite}.`);;
}
//Acima, criamos uma função para facilitar a edição dos titulos e textos.

mensagemInicial();

function verificarChute () {
    let chute = document.querySelector('input').value; //.value para definir que queremos o numero como valor nao como texto
    
    if(chute==numeroSecreto){
        exibirTextoNaTela('h1', 'Parabéns, você acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `você descobriu o número secerto com ${tentativas} ${palavraTentativa}.`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled')
        //Devido a haver dois botoes no app, nao podemos usar o querySelector, então utilizamos pela Id com o .getElementById
        //Utilizamos o .removeAttribute para tirar a atribuição no HTML que desabilitava o botão Novo Jogo

    }else {
        if (chute > numeroSecreto){
            exibirTextoNaTela('p', 'O número secreto é MENOR!');
        }else {
            exibirTextoNaTela('p', 'O número secreto é Maior!');
        }
        tentativas++
        limparCampo()
        }
}
//A função function, irá criar uma função no documento, conforme linha 27 do HTML

function geradorAleatorio () {
   let numeroEscolhido = parseInt((Math.random () * limite + 1));
   let quantidadeElementosLista = listaDeNumerosSorteados.length;
   
   if (quantidadeElementosLista == limite){//Função return devivo a linha 1. Se retirar e abrirmos o console, o numero será undefined.
        listaDeNumerosSorteados = [];
   }
   if (listaDeNumerosSorteados.includes(numeroEscolhido)) {//.includes para verificarmos se o numero escolhido ja esta na lista.
        return geradorAleatorio();
}else {
    listaDeNumerosSorteados.push(numeroEscolhido);
    console.log(listaDeNumerosSorteados);
    return numeroEscolhido;
}
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    numeroSecreto = geradorAleatorio();
    limparCampo();
    tentativas = 1;
    mensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled',true);
    //O .setAttribute vem para colocar um atributo novamente que foi removido anteriormente quando acertamos o numero secreto no app.
}
