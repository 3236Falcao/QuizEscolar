const quiz = JSON.parse(localStorage.getItem('currentQuiz')) || { name: '', questions: [] };
let respostasUsuario = [];

function carregarQuiz() {
    const quizNameElement = document.getElementById('quizName');
    const container = document.getElementById('quizContainer');
    quizNameElement.textContent = quiz.name || 'Quiz Sem Nome';

    if (quiz.questions.length === 0) {
        container.innerHTML = '<p>Nenhuma pergunta disponível.</p>';
        return;
    }

    quiz.questions.forEach((q, index) => {
        const div = document.createElement('div');
        div.className = 'question';
        div.innerHTML = `
            <p>${index + 1}. ${q.pergunta}</p>
            <label><input type="radio" name="q${index}" value="0" required> ${q.opcoes[0]}</label><br>
            <label><input type="radio" name="q${index}" value="1"> ${q.opcoes[1]}</label><br>
            <label><input type="radio" name="q${index}" value="2"> ${q.opcoes[2]}</label>
        `;
        container.appendChild(div);
    });
}

function verificarRespostas() {
    const radios = document.querySelectorAll('input[type="radio"]');
    let pontuacao = 0;
    let todasRespondidas = true;

    quiz.questions.forEach((q, index) => {
        let respondida = false;
        radios.forEach(radio => {
            if (radio.checked && radio.name === `q${index}`) {
                respondida = true;
                if (radio.value == q.resposta) {
                    pontuacao++;
                }
            }
        });
        if (!respondida) todasRespondidas = false;
    });

    if (!todasRespondidas) {
        document.getElementById('resultado').innerText = 'Por favor, responda todas as perguntas!';
        return;
    }

    document.getElementById('resultado').innerText = `Você acertou ${pontuacao} de ${quiz.questions.length} perguntas!`;
}

// Carrega o quiz ao abrir a página
carregarQuiz();