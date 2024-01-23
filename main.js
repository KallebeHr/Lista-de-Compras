document.addEventListener('DOMContentLoaded', function () {
  setTimeout(function () {
    document.querySelector('.text-inicio').classList.add('show');
  }, 500);
  setTimeout(function () {
    document.querySelector('.text-hora').classList.add('show');
  }, 1000);
  setTimeout(function () {
    document.querySelector('.btn-add').classList.add('show');
  }, 1500);
  setTimeout(function () {
    document.querySelector('.btn-fin').classList.add('show');
  }, 2000);

});
function updateClock() {
  let now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  // coloca um zero à esquerda se for menor que 10
  hours = (hours < 10) ? '0' + hours : hours;
  minutes = (minutes < 10) ? '0' + minutes : minutes;
  seconds = (seconds < 10) ? '0' + seconds : seconds;

  var timeString = hours + ':' + minutes + ':' + seconds;

  document.querySelector('.text-hora').innerHTML = timeString;
}

// Atualiza o relógio a cada segundo
setInterval(updateClock, 1000);

// Abrir os Modal e fechar

function openModal(modal) {
  modal.showModal();
}

function closeModal(modal) {
  modal.close();
}

const cart = document.querySelector('#cart');
const modalItens = document.querySelector('.modalItens');
const cartclose = document.querySelector('#itensclose');
const buttonModalAdd = document.querySelector('#bntAdd')
const modalAdd = document.querySelector('.modalAdd')
const modaladdclose = document.querySelector('#addclose')

modaladdclose.onclick = function (){
  closeModal(modalAdd)
}

cart.onclick = function () {
  openModal(modalItens);
};

cartclose.onclick = function () {
  closeModal(modalItens);
}
buttonModalAdd.onclick = function () {
  openModal(modalAdd)
}

// Lista de itens no carrinho
var carrinhoItens = [];

// Função para abrir o modal de adição de item
function abrirModalAddItem() {
  const modalAdd = document.querySelector('.modalAdd');
  modalAdd.showModal();
}
// Função para fechar o modal de adição de item

// Função para adicionar um novo item ao carrinho
function adicionarItem() {
  const nomeInput = document.getElementById("btnItemNome");
  const precoInput = document.getElementById("btnItemPreco");
  const descontoInput = document.getElementById("btnItemDesco");
  const quantidadeInput = document.getElementById("btnItemQuant");

  const nome = nomeInput.value.trim();
  const preco = parseFloat(precoInput.value) || 0;
  const desconto = parseFloat(descontoInput.value) || 0;
  const quantidade = parseInt(quantidadeInput.value) || 1;

  // Função para tratar erros de entrada
  function tratarErroEntrada(inputElement, mensagem) {
    inputElement.value = "";
    inputElement.placeholder = mensagem;
    inputElement.classList.add("campo-invalido");
  }

  // Verifica se o nome está vazio
  if (nome === "") {
    tratarErroEntrada(nomeInput, "Entre 1 a 25 caracteres");
    mensagemNotfitEnsErr("Nome")
    return;
  }

  // Verifica se o preço é um número válido
  if (isNaN(preco) || preco <= 0 || preco >= 100000) {
    tratarErroEntrada(precoInput, 'Entre 1 a 10000 reais');
    mensagemNotfitEnsErr("Preço")
    return;
  }
  if (isNaN(desconto) || desconto >= 101) {
    tratarErroEntrada(descontoInput, 'Entre 0% a 100%');
    mensagemNotfitEnsErr("Desconto")
    return;
  }
  // Remove a classe de campo inválido se a entrada for válida
  nomeInput.classList.remove("campo-invalido");
  precoInput.classList.remove("campo-invalido");

  const novoItem = {
    nome: nome,
    preco: preco,
    desconto: desconto,
    quantidade: quantidade
  };

  carrinhoItens.push(novoItem);
  exibirItensNoCarrinho();
  fecharModalAddItem();

  // Limpar os valores dos campos de entrada no modal
  nomeInput.value = "";
  precoInput.value = "";
  descontoInput.value = "";
  quantidadeInput.value = "";
  mensagemNotfSucesso(nome)
}
// Função para fechar o modal de adição de item
function fecharModalAddItem() {
  const modalAdd = document.querySelector('.modalAdd');
  modalAdd.close();
}
// Função para exibir os itens no carrinho no modal
function exibirItensNoCarrinho() {
  const containerModais = document.querySelector('.container-modais');

  // Limpa o conteúdo atual

  containerModais.innerHTML = "";
  // Adiciona os novos itens
  carrinhoItens.forEach((item, index) => {
    const containerModalItem = document.createElement("div");
    containerModalItem.classList.add("container-modal-item");
    containerModalItem.innerHTML = `
      <p class="text-modal-Item">${item.nome}</p>
      <p class="text-modal-Preco">R$ ${item.preco.toFixed(2)}</p>
      <p class="text-modal-Desconto">Desconto: ${item.desconto.toFixed(0)}%</p>
      <p class="text-modal-Desconto">Quantidade: ${item.quantidade}</p>
      <button class="buttonClose" data-index="${index}">×</button>
    `;
    containerModais.appendChild(containerModalItem);
  });
  
 // Adicione um ouvinte de evento para os botões de fechar
const buttonsClose = document.querySelectorAll(".buttonClose");
buttonsClose.forEach(button => {
  button.addEventListener("click", (event) => {
    const index = event.target.dataset.index;

    // Adicione aqui a lógica para excluir o item com o índice 'index' do carrinho
    carrinhoItens.splice(index, 1);
    // Em seguida, atualize o modal com os itens atualizados
    exibirItensNoCarrinho();
  });
});

  // Atualiza os totais no modal
  atualizarTotaisNoModal();


}

// Função para atualizar os totais no modal
function atualizarTotaisNoModal() {
  const precoBruto = calcularPrecoBruto();
  const descontoCarrinho = calcularDescontoCarrinho();
  const precoFinalCarrinho = calcularPrecoFinal();

  document.querySelector('.text-modal-resultado:nth-child(1)').textContent = `Preço bruto: R$ ${precoBruto.toFixed(2)}`;
  document.querySelector('.text-modal-resultado:nth-child(2)').textContent = `Desconto: R$ ${descontoCarrinho.toFixed(2)}`;
  document.querySelector('.text-modal-resultado:nth-child(3)').textContent = `Preço final: R$ ${precoFinalCarrinho.toFixed(2)}`;
}

// Função para calcular o preço bruto do carrinho
function calcularPrecoBruto() {
  return carrinhoItens.reduce((total, item) => total + (item.preco * item.quantidade), 0);
}

// Função para calcular o desconto total do carrinho
function calcularDescontoCarrinho() {
  return carrinhoItens.reduce((total, item) => total + ((item.desconto / 100) * (item.preco * item.quantidade)), 0);
}

// Função para calcular o preço final do carrinho após desconto
function calcularPrecoFinal() {
  const precoBruto = calcularPrecoBruto();
  const descontoCarrinho = calcularDescontoCarrinho();
  return precoBruto - descontoCarrinho;
}

// Event listener para o botão "Adicionar Item"
document.getElementById('bntAdd').addEventListener('click', abrirModalAddItem);


// Exibe os itens iniciais no carrinho
exibirItensNoCarrinho();
// Funções para notificações

// Notificação Sucesso
function mensagemNotfSucesso(itemAtual) {
  iziToast.show({
    message: `${itemAtual} Adicionado ao Carrinho`,
    color: 'green',
    messageColor: '#082005'
  });
}
// Notificação itens apagados
function mensagemNotfapagados() {
  iziToast.error({
    title: 'Itens apagados!',
    position: 'topRight',
    timeout: 3000,

  });
}
// Notificação Carrinho Vazio

function mensagemNotCarVazio() {
  iziToast.error({
    title: 'Carrinho Vazio!',
    message: 'Adicione algum item ao carrinho!',
    position: 'topRight',
    timeout: 3000,

  });
}
// Notificação itens errados
function mensagemNotfitEnsErr(i) {
  iziToast.warning({
    title: 'Atenção',
    message: `Verifique o campo de ${i}`,
    position: 'topLeft',
    timeout: 5000
  });

}

// Inicializa o estado do modal como fechado
let modalAberto = false;

function itensClean() {
  // Verifica se o modal já está aberto
  if (modalAberto) {
    return;
  }
  if(carrinhoItens.length == ''){
    mensagemNotCarVazio()
  } else{
 // Configurações do toast
 const toastConfig = {
  theme: 'red',
  icon: 'icon-person',
  messageColor: 'red',
  timeout: 5000,
  message: 'Deseja realmente apagar os itens?',
  position: 'center',
  progressBarColor: 'rgb(0, 255, 184)',
  buttons: [
    [
      '<button>Sim</button>',
      function (instance, toast) {
        // Ação quando o botão "Sim" é clicado
        mensagemNotfapagados()
        limparItens();
        instance.hide({
          transitionOut: 'fadeOutUp',
          onClosing: function (instance, toast, closedBy) { }
        }, toast, 'buttonName');
      },
      true
    ],
    [
      '<button>Fechar</button>',
      function (instance, toast) {
        // Ação quando o botão "Fechar" é clicado
        instance.hide({
          transitionOut: 'fadeOutUp',
          onClosing: function (instance, toast, closedBy) {
            console.info('closedBy: ' + closedBy);
            // Atualiza o estado do modal para indicar que foi fechado
            modalAberto = false;
          }
        }, toast, 'buttonName');
      }
    ]
  ],
  onOpening: function (instance, toast) {
    console.info('callback abriu!');
  },
  onClosing: function (instance, toast, closedBy) {
    console.info('closedBy: ' + closedBy);
    // Atualiza o estado do modal para indicar que foi fechado
    modalAberto = false;
  }
};

// Exibe o toast com as configurações definidas
iziToast.show(toastConfig);

// Atualiza o estado do modal para indicar que está aberto
modalAberto = true;

// Função para limpar os itens
function limparItens() {
  const containerModais = document.querySelector('.container-modais');
  containerModais.innerHTML = "";
  carrinhoItens = [];
  atualizarTotaisNoModal();

  // Atualiza o estado do modal para indicar que foi fechado
  modalAberto = false;
}
  }
 
}

const themeLink = document.getElementById('temasCss');
const temaSun = document.getElementById('temaSun');
const temaMoon = document.getElementById('temaMoon');

// Função para modar o tema
function iniciarTema() {
  if (themeLink.getAttribute('href') === 'styles/index.css') {
    temaSun.style.display = 'inline';
    temaMoon.style.display = 'none';
  } else {
    temaSun.style.display = 'none';
    temaMoon.style.display = 'inline';
  }
}

function toggleTheme() {
  if (themeLink.getAttribute('href') === 'styles/index.css') {
    themeLink.setAttribute('href', 'styles/index-dark.css');
    temaSun.style.display = 'none';
    temaMoon.style.display = 'inline';
  } else {
    themeLink.setAttribute('href', 'styles/index.css');
    temaSun.style.display = 'inline';
    temaMoon.style.display = 'none';
  }
}

document.addEventListener('DOMContentLoaded', function () {
  iniciarTema();
  temaSun.addEventListener('click', toggleTheme);
  temaMoon.addEventListener('click', toggleTheme);
});


