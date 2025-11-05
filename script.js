 // Função que gera a sequência de Collatz para um número n e retorna um array com a sequência
    function collatz(n) {
      const seq = [n];                  // cria array com o valor inicial
      while (n !== 1) {                 // repete enquanto n não for 1
        n = n % 2 === 0 ? n / 2 : 3 * n + 1; // se par divide por 2, se ímpar faz 3n+1
        seq.push(n);                    // adiciona novo valor à sequência
      }
      return seq;                       // devolve a sequência completa
    }

    // Função para exibir a sequência com os cálculos detalhados
    function exibirSequenciaComCalculos(seq) {
      resultado.textContent = '';       // limpa área de resultado
      
      // Adiciona o número inicial
      resultado.textContent = `Início: ${seq[0]}\n\n`;
      
      // Para cada passo da sequência (exceto o primeiro)
      for (let i = 1; i < seq.length; i++) {
        const anterior = seq[i-1];
        const atual = seq[i];
        let calculo = '';
        
        // Determina qual cálculo foi feito
        if (anterior % 2 === 0) {
          calculo = `${anterior} é PAR → ${anterior} ÷ 2 = ${atual}`;
        } else {
          calculo = `${anterior} é ÍMPAR → 3 × ${anterior} + 1 = ${atual}`;
        }
        
        // Adiciona o cálculo ao resultado
        resultado.textContent += `${calculo}\n`;
        
        // Se for o último elemento (1), adiciona mensagem final
        if (atual === 1) {
          resultado.textContent += `\n✓ Chegou a 1 após ${seq.length-1} passos`;
        }
      }
    }

    // DOM: referências a elementos que usaremos
    const numInput = document.getElementById('numInput');
    const runBtn = document.getElementById('runBtn');
    const resultado = document.getElementById('resultado');
    const testesDiv = document.getElementById('testes');
    const copyBtn = document.getElementById('copyBtn');
    const clearBtn = document.getElementById('clearBtn');

    // Copiar sequência atual para a área de transferência
    function copiarSequencia() {
      const text = resultado.textContent;
      if (!text || text.includes('Digite um número')) return;
      navigator.clipboard?.writeText(text).then(() => {
        copyBtn.textContent = 'Copiado!';
        setTimeout(() => copyBtn.textContent = 'Copiar', 1100);
      }).catch(() => {
        copyBtn.textContent = 'Erro ao copiar';
        setTimeout(() => copyBtn.textContent = 'Copiar', 1100);
      });
    }

    // Limpar campo e resultado
    function limpar() {
      numInput.value = '';
      resultado.textContent = 'Digite um número e clique em Calcular...';
    }

    // Função executada ao clicar em "Calcular"
    function gerarSequencia() {
      const n = parseInt(numInput.value, 10);  // lê e converte para inteiro
      // validação simples
      if (!n || n <= 0) {                      
        resultado.textContent = '⚠️ Digite um número natural válido (maior que 0).';
        return;
      }
      const seq = collatz(n);                  // calcula sequência
      exibirSequenciaComCalculos(seq);         // exibe com cálculos detalhados
    }

    // Preencher a lista de testes (1..30) no carregamento da página
    function popularTestes() {
      for (let i = 1; i <= 30; i++) {
        const seq = collatz(i);
        const elem = document.createElement('div');
        elem.className = 'test-item';
        elem.textContent = `${i}: ${seq.join(' → ')} (${seq.length-1} passos)`;
        testesDiv.appendChild(elem);
      }
    }

    // listeners
    runBtn.addEventListener('click', gerarSequencia);
    copyBtn.addEventListener('click', copiarSequencia);
    clearBtn.addEventListener('click', limpar);
    numInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') gerarSequencia();
    });

    // inicialização
    document.addEventListener('DOMContentLoaded', () => {
      popularTestes();
    });