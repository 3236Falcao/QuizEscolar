// Selecionando os elementos HTML necessários
const quizContainer = document.getElementById('quiz');
const submitButton = document.getElementById('submit');
const resultContainer = document.getElementById('resultado');

// Definindo as perguntas do quiz
const perguntas = [
    {
        pergunta: "Pergunta 1: Qual é a função dos adjetivos na linguagem?",
        respostas: {
            a: "Descrever ações.",
            b: "Descrever características de substantivos.",
            c: "Descrever emoções"
        },
        respostaCorreta: "b"
    },
    {
        pergunta: "Pergunta 2: Qual das seguintes frases contém um advérbio de modo?",
        respostas: {
            a: "Ele correu rápido para pegar o ônibus",
            b: "Ela estava sempre sorrindo.",
            c: "Eles se encontram aqui todos os dias"
        },
        respostaCorreta: "a"
    },
    {
        pergunta: "Pergunta 3: Em - Ele é um bom jogador - , qual palavra é um adjetivo?",
        respostas: {
            a: "Ele",
            b: "Bom",
            c: "Jogador"
        },
        respostaCorreta: "b"
    },
    {
        pergunta: "Pergunta 4:  Qual dos seguintes advérbios de tempo indica uma ação futura?",
        respostas: {
            a: "Ontem",
            b: "Agora",
            c: "Amanhã"
        },
        respostaCorreta: "c"
    }   
];

// Função para construir o quiz com as perguntas e opções de resposta
function construirQuiz() {
    const saida = [];

    perguntas.forEach((perguntaAtual, numeroPergunta) => {
        const respostas = [];
        let letra = 'a';

        // Construindo as opções de resposta para cada pergunta
        for (opcao in perguntaAtual.respostas) {
            respostas.push(
                `<label>
                    <input type="radio" name="pergunta${numeroPergunta}" value="${opcao}">
                    ${letra}): ${perguntaAtual.respostas[opcao]}
                </label><br>`
            );
            letra = String.fromCharCode(letra.charCodeAt(0) + 1); // Incrementa a letra
        }

        // Adicionando a pergunta e as opções de resposta à saída
        saida.push(
            `<div class="question">${perguntaAtual.pergunta}</div>
            <div class="answer">${respostas.join('')}</div>`
        );
    });

    // Exibindo o quiz na página HTML
    quizContainer.innerHTML = saida.join('');
}

// Função para mostrar os resultados do quiz
function mostrarResultados() {
    const containersResposta = quizContainer.querySelectorAll('.answer');
    let numCorretas = 0;

    perguntas.forEach((perguntaAtual, numeroPergunta) => {
        const containerResposta = containersResposta[numeroPergunta];
        const seletor = `input[name=pergunta${numeroPergunta}]:checked`;
        const respostaUsuario = (containerResposta.querySelector(seletor) || {}).value;

        // Verificando se a resposta do usuário está correta e atualizando o contador de respostas corretas
        if (respostaUsuario === perguntaAtual.respostaCorreta) {
            numCorretas++;
            containersResposta[numeroPergunta].style.color = 'green'; // Destacando respostas corretas em verde
        } else {
            containersResposta[numeroPergunta].style.color = 'red'; // Destacando respostas incorretas em vermelho
        }
    });

    // Exibindo a contagem de respostas corretas e incorretas
    resultContainer.innerHTML = `Você acertou ${numCorretas} de ${perguntas.length} perguntas.`;
}

// Construindo o quiz quando a página carrega
construirQuiz();

// Adicionando um event listener para o botão de enviar respostas
submitButton.addEventListener('click', mostrarResultados);
