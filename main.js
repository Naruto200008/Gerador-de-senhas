// Seleciona o elemento onde o número de caracteres da senha será exibido
const numeroSenha = document.querySelector('.parametro-senha__texto');
let tamanhoSenha = 12;  // Valor inicial de caracteres da senha
numeroSenha.textContent = tamanhoSenha;  // Exibe o número de caracteres na tela

// Definindo os conjuntos de caracteres possíveis para a senha
const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVXYWZ';
const letrasMinusculas = 'abcdefghijklmnopqrstuvxywz';
const numeros = '0123456789';
const simbolos = '!@%*?';

// Seleciona os botões de aumento e diminuição de tamanho de senha
const botoes = document.querySelectorAll('.parametro-senha__botao');

// Seleciona o campo onde a senha gerada será exibida
const campoSenha = document.querySelector('#campo-senha');

// Seleciona todos os checkboxes que controlam os tipos de caracteres a serem usados
const checkbox = document.querySelectorAll('.checkbox');

// Seleciona a classe responsável por exibir a força da senha
const forcaSenha = document.querySelector('.forca');

// Definindo os eventos de clique nos botões de aumentar e diminuir tamanho da senha
botoes[0].onclick = diminuiTamanho;  // Botão para diminuir o tamanho da senha
botoes[1].onclick = aumentaTamanho;  // Botão para aumentar o tamanho da senha

// Função para diminuir o tamanho da senha
function diminuiTamanho() {
    if (tamanhoSenha > 1) {  // Limita o tamanho mínimo da senha para 1 caractere
        tamanhoSenha--;
    }
    numeroSenha.textContent = tamanhoSenha;  // Atualiza a exibição do número de caracteres
    geraSenha();  // Regera a senha com o novo tamanho
}

// Função para aumentar o tamanho da senha
function aumentaTamanho() {
    if (tamanhoSenha < 20) {  // Limita o tamanho máximo da senha para 20 caracteres
        tamanhoSenha++;
    }
    numeroSenha.textContent = tamanhoSenha;  // Atualiza a exibição do número de caracteres
    geraSenha();  // Regera a senha com o novo tamanho
}

// Define os eventos para cada checkbox que altera os parâmetros da senha
for (i = 0; i < checkbox.length; i++) {
    checkbox[i].onclick = geraSenha;  // Sempre que um checkbox for alterado, gera uma nova senha
}

// Função para gerar a senha com base nos parâmetros selecionados
function geraSenha() {
    let alfabeto = '';  // Inicializa a string do alfabeto (conjunto de caracteres possíveis)

    // Verifica quais checkboxes estão marcados e adiciona os caracteres correspondentes ao alfabeto
    if (checkbox[0].checked) {
        alfabeto = alfabeto + letrasMaiusculas;
    }
    if (checkbox[1].checked) {
        alfabeto = alfabeto + letrasMinusculas;
    }
    if (checkbox[2].checked) {
        alfabeto = alfabeto + numeros;
    }
    if (checkbox[3].checked) {
        alfabeto = alfabeto + simbolos;
    }

    let senha = '';  // Inicializa a variável que irá armazenar a senha gerada

    // Gera a senha aleatoriamente com os caracteres escolhidos
    for (let i = 0; i < tamanhoSenha; i++) {
        let numeroAleatorio = Math.random() * alfabeto.length;  // Gera um número aleatório
        numeroAleatorio = Math.floor(numeroAleatorio);  // Arredonda para o inteiro mais próximo
        senha = senha + alfabeto[numeroAleatorio];  // Adiciona o caractere aleatório à senha
    }

    campoSenha.value = senha;  // Exibe a senha gerada no campo de entrada
    classificaSenha(alfabeto.length);  // Chama a função para classificar a força da senha
}

// Função para classificar a força da senha com base na entropia
function classificaSenha(tamanhoAlfabeto) {
    // Calcula a entropia (complexidade) da senha, com base no tamanho da senha e no alfabeto utilizado
    let entropia = tamanhoSenha * Math.log2(tamanhoAlfabeto);  
    console.log(entropia);  // Exibe a entropia no console para debugging

    // Remove as classes de força anteriores
    forcaSenha.classList.remove('fraca', 'media', 'forte');

    // Classifica a força da senha com base na entropia
    if (entropia > 57) {
        forcaSenha.classList.add('forte');  // Força forte
    } else if (entropia > 35 && entropia < 57) {
        forcaSenha.classList.add('media');  // Força média
    } else if (entropia <= 35) {
        forcaSenha.classList.add('fraca');  // Força fraca
    }

    // Exibe o valor da entropia em termos de tempo para quebrar a senha
    const valorEntropia = document.querySelector('.entropia');
    valorEntropia.textContent = 2**Math.floor(entropia) / (100e6 * 60 * 60 * 24);  // Converte a entropia para um valor de tempo estimado
}
