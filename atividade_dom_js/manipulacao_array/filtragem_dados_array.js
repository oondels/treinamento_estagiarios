/*
Filtragem de uma Lista de Dados (Array de Objetos)

Objetivo: Praticar a manipulação de arrays, que é o coração de qualquer aplicação que exibe listas de dados (como a lista de reservas).

Descrição:
    O array de objetos chamado salas contém informações sobre diferentes salas disponíveis em um espaço. Cada objeto representa uma sala 
    e deve ter as propriedades: nome (string), capacidade (number) e disponivel (boolean).

    Ao carregar a página, use JavaScript para "desenhar" essa lista de salas na tela, mostrando o nome e a capacidade de cada uma.

    Adicione dois elementos na página:

        Um checkbox com o texto "Mostrar apenas salas disponíveis".

        Um campo de texto (input) para "Filtrar por nome".

    Faça com que, ao marcar/desmarcar o checkbox ou ao digitar no campo de texto, a lista de salas na tela seja atualizada dinamicamente para refletir os filtros.
*/


const salas = [
  { nome: "Paixão", capacidade: 10, disponivel: true },
  { nome: "Respeito", capacidade: 20, disponivel: false },
  { nome: "Hoshin", capacidade: 15, disponivel: true },
  { nome: "Auditorio Fab. 1", capacidade: 25, disponivel: true },
  { nome: "Auditorio Fab. 2", capacidade: 30, disponivel: false }
];

const chkDisponiveis = document.getElementById("chk-disponiveis");
const txtNome = document.getElementById("txt-nome");
const listaSalas = document.getElementById("lista-salas");


function normalizeText(text) {
  return (text || "").toString().toLowerCase()
    .normalize("NFD")              
    .replace(/[\u0300-\u036f]/g, "") 
    .trim();
}

// Função de filtragem com a opção de recebe texto de busca
function filtrarSalas(textoBusca, mostrarDisponiveis) {
  const termo = normalizeText(textoBusca);

  return salas.filter(sala => {
    const nomeNormalizado = normalizeText(sala.nome);

    const correspondeNome = nomeNormalizado.includes(termo);
    const correspondeDisponibilidade = mostrarDisponiveis ? sala.disponivel === true : true;

    return correspondeNome && correspondeDisponibilidade;
  });
}

function desenharSalas(lista) {
  listaSalas.innerHTML = "";

  if (!Array.isArray(lista) || lista.length === 0) {
    const liVazio = document.createElement("li");
    liVazio.className = "empty";
    liVazio.textContent = "Nenhuma sala encontrada.";
    listaSalas.appendChild(liVazio);
    return;
  }

  lista.forEach(sala => {
    const li = document.createElement("li");
    
    // estrutura: nome à esquerda, info (capacidade + tag) à direita
    const left = document.createElement("div"); 
    left.textContent = sala.nome;

    const right = document.createElement("div");
    right.style.display = "flex";
    right.style.gap = "0.75rem";
    right.style.alignItems = "center";

    const capacidade = document.createElement("span");
    capacidade.style.fontSize = "0.9rem";
    capacidade.textContent = `${sala.capacidade} lugares`;

    const checkDisponibilidade =(sala) => {
      if (sala.disponivel) {
        return "Disponível"
      } else {
        return "Não Disponível"
      }
    }

    const tag = document.createElement("span")
     tag.style.fontSize = "0.9rem";
    tag.textContent = checkDisponibilidade(sala);
     
    right.appendChild(tag);

    right.appendChild(capacidade);
  
    li.appendChild(left);
    li.appendChild(right);

    listaSalas.appendChild(li);
  });
}


// Atualiza a lista conforme controles
function atualizarLista() {
  const texto = txtNome.value;
  const apenasDisponiveis = chkDisponiveis.checked;

  const resultado = filtrarSalas(texto, apenasDisponiveis);
  desenharSalas(resultado);
}

// Eventos: filtra quando digita e ao marcar/desmarcar o checkbox
txtNome.addEventListener("input", atualizarLista);
chkDisponiveis.addEventListener("change", atualizarLista);

// Inicial: desenha todas as salas sem filtro
document.addEventListener("DOMContentLoaded", () => {
  // caso o script seja carregado antes do DOM (segurança), mas no seu HTML o script vem no fim.
  atualizarLista();
});
