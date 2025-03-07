let perguntas = [];
let quizName = '';

document.getElementById('quizForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Captura o nome do quiz do campo de entrada
    if (!quizName) {
        quizName = document.getElementById('quizName').value.trim();
        if (!quizName) {
            alert('Por favor, preencha o nome do quiz!');
            return;
        }
        // Desabilita o campo após definir o nome
        document.getElementById('quizName').disabled = true;
    }

    const pergunta = document.getElementById('question').value;
    const opcao1 = document.getElementById('option1').value;
    const opcao2 = document.getElementById('option2').value;
    const opcao3 = document.getElementById('option3').value;
    const resposta = document.getElementById('answer').value - 1; // Ajusta para índice (0, 1 ou 2)

    if (resposta < 0 || resposta > 2) {
        alert('A resposta correta deve ser 1, 2 ou 3!');
        return;
    }

    perguntas.push({ pergunta, opcoes: [opcao1, opcao2, opcao3], resposta });
    atualizarListaPerguntas();
    alert('Pergunta adicionada!');
    // Limpa apenas os campos da pergunta, mantendo o nome do quiz
    document.getElementById('question').value = '';
    document.getElementById('option1').value = '';
    document.getElementById('option2').value = '';
    document.getElementById('option3').value = '';
    document.getElementById('answer').value = '';
});

function salvarQuiz() {
    if (!quizName) {
        alert('Por favor, preencha o nome do quiz!');
        return;
    }
    if (perguntas.length === 0) {
        alert('Adicione pelo menos uma pergunta antes de salvar!');
        return;
    }
    let quizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
    quizzes.push({ name: quizName, questions: [...perguntas] });
    localStorage.setItem('quizzes', JSON.stringify(quizzes));
    alert('Quiz salvo com sucesso!');
    // Limpa tudo para um novo quiz
    perguntas = [];
    quizName = '';
    document.getElementById('quizName').value = '';
    document.getElementById('quizName').disabled = false;
    atualizarListaPerguntas();
}

function atualizarListaPerguntas() {
    const lista = document.getElementById('perguntasList');
    lista.innerHTML = '';

    if (perguntas.length === 0) {
        lista.innerHTML = '<p>Nenhuma pergunta adicionada ainda.</p>';
        return;
    }

    const ul = document.createElement('ul');
    perguntas.forEach((q, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${index + 1}. ${q.pergunta} <br>
            - Opção 1: ${q.opcoes[0]} <br>
            - Opção 2: ${q.opcoes[1]} <br>
            - Opção 3: ${q.opcoes[2]} <br>
            - Resposta correta: ${q.opcoes[q.resposta]}
        `;
        ul.appendChild(li);
    });
    lista.appendChild(ul);
}

// Carrega a lista ao abrir a página
atualizarListaPerguntas();