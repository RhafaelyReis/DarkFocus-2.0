document.addEventListener("DOMContentLoaded", function() {
    const botaoStart = document.getElementById('botao-start');
    const temporizadorTexto = document.getElementById('temporizador');
    const botoesTemporizador = document.querySelectorAll('.botoes-temporizador');
    let tempoTotal = 1500; // Tempo total inicial em segundos (25 minutos)
    let timer = null;
    let temporizadorAtivo = false;

    // Adiciona evento de clique para o botão "COMEÇAR"
    botaoStart.addEventListener('click', function() {
        if (!temporizadorAtivo) {
            iniciarTemporizador();
            temporizadorAtivo = true;
            this.textContent = 'PAUSAR';
        } else {
            pausarTemporizador();
            temporizadorAtivo = false;
            this.textContent = 'RETOMAR';
        }
    });

    // Adiciona evento de clique para os botões de modo (FOCO, PAUSA, PAUSA LONGA)
    botoesTemporizador.forEach(function(botao) {
        botao.addEventListener('click', function() {
            resetarEstilosBotoes();
            this.classList.add('ativo');
            // Atualiza o tempo total baseado no modo selecionado
            if (this.textContent === 'FOCO') {
                tempoTotal = 1500; // 25 minutos
            } else if (this.textContent === 'PAUSA') {
                tempoTotal = 300; // 5 minutos
            } else if (this.textContent === 'PAUSA LONGA') {
                tempoTotal = 900; // 15 minutos
            }
            // Atualiza o temporizador com o novo tempo total
            atualizarTemporizador(tempoTotal);
            // Habilita o botão "COMEÇAR" ao selecionar um modo
            botaoStart.style.display = 'block';
        });
    });

    // Função para iniciar o temporizador
    function iniciarTemporizador() {
        timer = setInterval(function() {
            tempoTotal--;
            atualizarTemporizador(tempoTotal);
            if (tempoTotal <= 0) {
                clearInterval(timer);
                timer = null;
                temporizadorAtivo = false;
                botaoStart.textContent = 'COMEÇAR';
                reproduzirSomFimTemporizador(); // Chama a função para reproduzir o som ao final do temporizador
            }
        }, 1000);
    }

    // Função para pausar o temporizador
    function pausarTemporizador() {
        clearInterval(timer);
        timer = null;
    }

    // Função para atualizar o texto do temporizador
    function atualizarTemporizador(segundos) {
        const minutos = Math.floor(segundos / 60);
        const segundosRestantes = segundos % 60;
        const textoTemporizador = `${minutos.toString().padStart(2, '0')}:${segundosRestantes.toString().padStart(2, '0')}`;
        temporizadorTexto.textContent = textoTemporizador;
    }

    // Função para resetar estilos de todos os botões
    function resetarEstilosBotoes() {
        botoesTemporizador.forEach(function(botao) {
            botao.classList.remove('ativo');
        });
    }

    // Função para reproduzir o som ao final do temporizador
    function reproduzirSomFimTemporizador() {
        const audio = new Audio('darkfocus/imagens/som.mp3');
        audio.play();
    }
});
