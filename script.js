const nomes = new Set();
let sorteados = [];

function adicionar() {
    const nomeElemento = document.getElementById('nomeInput');
    // P1 e P2: Nome em maiúsculas e sem espaços nas extremidades
    const nome = nomeElemento.value.trim().toUpperCase();

    if (nome === '') {
        alert('Por favor, digite um nome!');
        return;
    }
    
    if (nomes.has(nome)) {
        alert('Este nome já foi adicionado!');
        return;
    }
    
    nomes.add(nome);
    atualizarParticipantes();
    habilitarSorteio();
    nomeElemento.value = '';
    nomeElemento.focus();
}

function remover(nome) {
    // P3 - remover nome da coleção Set
    nomes.delete(nome);
    atualizarParticipantes();
    habilitarSorteio();
}

function atualizarParticipantes() {
    const participantesDiv = document.getElementById('participantesDiv');
    const participantesQtd = document.getElementById('participantesQtd');
    const excluir = document.getElementById('excluirParticipantes');
    
    participantesQtd.textContent = nomes.size;
    if (nomes.size === 0) {
        participantesDiv.innerHTML = '<div class="vazio">Nenhum participante adicionado ainda...</div>';
        excluir.style.display = 'none';
    } else {
        participantesDiv.innerHTML = "";
        for (let nome of nomes) {
            participantesDiv.innerHTML += 
            `<div class="participante-item">
                ${nome}
                <span class="remove-btn" onclick="remover('${nome}')">×</span>
            </div>`;
        }
        excluir.style.display = 'inline-block';
    }
}

function atualizarSorteados() {
    const sorteadosDiv = document.getElementById('sorteadosDiv');
    const excluir = document.getElementById('excluirSorteados');
    const participantesQtd = document.getElementById('participantesQtd');

    participantesQtd.textContent = nomes.size;
    if (sorteados.length === 0) {
        sorteadosDiv.innerHTML = '<div class="vazio">Clique em "Sortear" para ver o resultado!</div>';
        excluir.style.display = 'none';
    } else {
        sorteadosDiv.innerHTML = "";
        for (let sorteado of sorteados) {
            sorteadosDiv.innerHTML += 
            `<div class="sorteado-item">
                ${sorteado}                
            </div>`;
        }
        excluir.style.display = 'inline-block';
    }
}

function habilitarSorteio() {
    const sortearButton = document.getElementById('sortearButton');
    sortearButton.disabled = nomes.size < 2;
}

function sortear() {
    if (nomes.size < 2) {
        alert('É necessário pelo menos 2 participantes para fazer o sorteio!');
        return;
    }
    
    const resultado = document.getElementById('sorteadosDiv');
    const excluir = document.getElementById('excluirSorteados');
    
    // Animação de sorteio
    resultado.innerHTML = '<div class="vazio">Sorteando...</div>';
    
    setTimeout(() => {
        const participantesArray = Array.from(nomes);
        const randomIndex = Math.floor(Math.random() * participantesArray.length);
        const vencedor = participantesArray[randomIndex];

        // P4 - Retirar o sorteado da lista nomes (Set)
        nomes.delete(vencedor);

        sorteados.push(vencedor);
        resultado.classList.add('vencedor');
                
        setTimeout(() => {
             resultado.classList.remove('vencedor');
        }, 1000);

        excluir.style.display = 'inline-block';

        resultado.innerHTML = "";
        for (let sorteado of sorteados) {
           resultado.innerHTML += 
            `<div class="sorteado-item">
                ${sorteado}                
            </div>`;
        }

        atualizarParticipantes();
        habilitarSorteio();

    }, 1500);
}

function excluirTodosParticipantes() {
    if (confirm('Tem certeza que deseja remover todos os participantes?')) {
        // P5 - Excluir todos participantes e sorteados
        nomes.clear();
        sorteados = [];

        atualizarParticipantes();
        atualizarSorteados();
        habilitarSorteio();      
    }
}

function excluirTodosSorteados() {
    if (confirm('Tem certeza que deseja remover todos os Sorteados?')) {
        // P6 - Excluir todos os sorteados
        sorteados = [];

        atualizarSorteados();
        habilitarSorteio();
    }
}
