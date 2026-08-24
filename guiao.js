/* Modelos de Documentação de Software — comportamento da página.
   Sem dependências externas: os dados vêm de dados.js (const FASES). */

const PERFIS = {
  mvp: [
    "08-utilizador/01-apresentacao-do-produto",
    "00-produto/01-visao-produto",
    "01-requisitos/04-historias-de-utilizador",
    "02-design/02-esbocos-e-prototipo",
    "03-arquitetura/02-modelo-decisao-arquitetura",
    "05-qualidade/04-criterios-de-conclusao",
    "04-desenvolvimento/01-preparacao-do-ambiente",
    "04-desenvolvimento/08-ficheiros-de-repositorio"
  ],
  interna: [
    "01-gestao-projeto/01-plano-projeto",
    "01-gestao-projeto/05-ata-reuniao",
    "01-gestao-projeto/07-convocatoria-e-agenda",
    "01-gestao-projeto/08-guiao-reuniao-arranque",
    "01-gestao-projeto/10-registo-de-acoes",
    "01-requisitos/01-levantamento-requisitos",
    "01-requisitos/02-requisitos-funcionais",
    "01-requisitos/03-requisitos-nao-funcionais",
    "01-requisitos/06-glossario",
    "02-analise/01-casos-de-uso",
    "02-design/01-especificacao-interface",
    "04-desenvolvimento/02-guia-de-contribuicao",
    "05-qualidade/01-plano-testes",
    "06-operacao/02-manual-de-operacao",
    "08-utilizador/02-manual-utilizador",
    "08-utilizador/04-guia-administracao",
    "04-desenvolvimento/04-integracao-e-entrega-continua",
    "04-desenvolvimento/06-integracao-de-novos-elementos",
    "05-qualidade/07-dados-de-teste-e-anonimizacao"
  ],
  producao: [
    "00-produto/03-requerimentos-do-produto",
    "00-produto/04-plano-de-evolucao",
    "01-gestao-projeto/02-estimativas-e-esforco",
    "01-gestao-projeto/03-matriz-raci-e-comunicacao",
    "01-gestao-projeto/04-gestao-alteracoes",
    "01-gestao-projeto/06-relatorio-estado",
    "01-gestao-projeto/09-reunioes-de-cadencia",
    "01-requisitos/05-matriz-rastreabilidade",
    "02-analise/05-regras-negocio",
    "02-design/03-sistema-de-design",
    "02-design/04-acessibilidade",
    "03-arquitetura/01-documento-arquitetura",
    "03-arquitetura/03-modelo-dados",
    "03-arquitetura/05-desenho-da-api",
    "03-arquitetura/06-integracoes",
    "04-desenvolvimento/03-padroes-codigo",
    "05-qualidade/02-casos-teste",
    "05-qualidade/03-criterios-aceitacao",
    "05-qualidade/05-testes-desempenho-carga",
    "06-operacao/01-implantacao",
    "06-operacao/03-incidentes-e-analise-posterior",
    "06-operacao/04-monitorizacao",
    "06-operacao/05-copias-de-seguranca-e-recuperacao",
    "06-operacao/06-acordo-nivel-servico",
    "06-operacao/08-gestao-ambientes-configuracao",
    "07-governanca/01-seguranca",
    "07-governanca/02-privacidade-rgpd",
    "07-governanca/03-matriz-riscos",
    "07-governanca/04-licencas-e-terceiros",
    "08-utilizador/03-registo-de-alteracoes",
    "08-utilizador/05-perguntas-frequentes",
    "08-utilizador/06-plano-formacao-adesao",
    "00-produto/05-plano-de-instrumentacao",
    "04-desenvolvimento/05-gestao-divida-tecnica",
    "04-desenvolvimento/07-uso-de-ia-no-desenvolvimento",
    "06-operacao/09-gestao-de-feature-flags",
    "06-operacao/10-custos-de-infraestrutura",
    "06-operacao/11-modelo-de-suporte",
    "07-governanca/07-matriz-de-acessos-e-permissoes",
    "07-governanca/08-politica-privacidade-e-termos"
  ]
};
// Os perfis são cumulativos: uma aplicação interna inclui o mínimo do protótipo.
PERFIS.interna = PERFIS.mvp.concat(PERFIS.interna);
PERFIS.producao = PERFIS.interna.concat(PERFIS.producao);

const CHAVE = "modelos-documentacao:feitos";
const feitos = new Set(JSON.parse(localStorage.getItem(CHAVE) || "[]"));

const cronologia = document.getElementById("cronologia");
const campoPesquisa = document.getElementById("pesquisa");
const seletorFase = document.getElementById("fase");
const seletorPerfil = document.getElementById("perfil");
const contagem = document.getElementById("contagem");
const progresso = document.getElementById("progresso");

FASES.forEach(function (f) {
  const o = document.createElement("option");
  o.value = f.pasta;
  o.textContent = f.nome;
  seletorFase.appendChild(o);
});

function semAcentos(texto) {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function guardar() {
  localStorage.setItem(CHAVE, JSON.stringify(Array.from(feitos)));
}

function total() {
  return FASES.reduce(function (n, f) { return n + f.documentos.length; }, 0);
}

function desenhar() {
  const procura = semAcentos(campoPesquisa.value.trim());
  const fase = seletorFase.value;
  const perfil = seletorPerfil.value;
  const lista = perfil === "tudo" ? null : PERFIS[perfil];

  cronologia.innerHTML = "";
  let visiveis = 0;

  FASES.forEach(function (f, i) {
    if (fase !== "tudo" && fase !== f.pasta) return;

    const docs = f.documentos.filter(function (d) {
      const chave = d.docx.replace(/\.docx$/, "");
      if (lista && lista.indexOf(chave) === -1) return false;
      if (!procura) return true;
      return semAcentos(d.titulo + " " + d.desc).indexOf(procura) !== -1;
    });
    if (!docs.length) return;
    visiveis += docs.length;

    const seccao = document.createElement("section");
    seccao.className = "fase";
    seccao.innerHTML =
      '<div class="marco">' + String(i + 1).padStart(2, "0") + "</div>" +
      "<h2>" + f.nome + '<span class="quando">' + f.quando + "</span></h2>" +
      '<p class="meta"><b>' + f.fase + "</b> · para " + f.audiencia +
      " · " + docs.length + (docs.length === 1 ? " documento" : " documentos") + "</p>";

    const grelha = document.createElement("div");
    grelha.className = "grelha";

    docs.forEach(function (d) {
      const chave = d.docx.replace(/\.docx$/, "");
      const cartao = document.createElement("article");
      cartao.className = "cartao" + (feitos.has(chave) ? " feito" : "");
      cartao.innerHTML =
        "<h3>" + d.titulo + "</h3>" +
        "<p>" + (d.desc || "Documento do modelo, pronto a preencher.") + "</p>" +
        '<div class="rodape-cartao">' +
        '<a class="descarregar" href="' + encodeURI(d.docx) + '" download>Descarregar .docx</a>' +
        '<label class="marcar"><input type="checkbox"' + (feitos.has(chave) ? " checked" : "") +
        "> feito</label></div>";

      cartao.querySelector("input").addEventListener("change", function (e) {
        if (e.target.checked) { feitos.add(chave); cartao.classList.add("feito"); }
        else { feitos.delete(chave); cartao.classList.remove("feito"); }
        guardar();
        actualizarProgresso();
      });

      grelha.appendChild(cartao);
    });

    seccao.appendChild(grelha);
    cronologia.appendChild(seccao);
  });

  if (!visiveis) {
    cronologia.innerHTML = '<p class="vazio">Nenhum documento corresponde a este filtro.</p>';
  }

  contagem.textContent = visiveis + " de " + total() + " documentos";
  actualizarProgresso();
}

function actualizarProgresso() {
  const pct = total() ? Math.round((feitos.size / total()) * 100) : 0;
  progresso.style.width = pct + "%";
  progresso.parentElement.title = feitos.size + " de " + total() + " marcados como feitos (" + pct + "%)";
}

campoPesquisa.addEventListener("input", desenhar);
seletorFase.addEventListener("change", desenhar);
seletorPerfil.addEventListener("change", desenhar);
document.getElementById("limpar-progresso").addEventListener("click", function () {
  feitos.clear();
  guardar();
  desenhar();
});

desenhar();
