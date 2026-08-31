const FASES = [
 {
  "pasta": "00-produto",
  "nome": "Produto",
  "fase": "Porquê e para quem",
  "audiencia": "Negócio, PO, partes interessadas",
  "quando": "Antes de tudo",
  "documentos": [
   {
    "titulo": "Visão de Produto",
    "desc": "Problema, objetivos, métricas, âmbito, partes interessadas",
    "docx": "00-produto/01-visao-produto.docx"
   },
   {
    "titulo": "Personas e Perfis de Utilizador",
    "desc": "Perfis de utilizador, dores, matriz persona × funcionalidade",
    "docx": "00-produto/02-personas.docx"
   },
   {
    "titulo": "Requerimentos do Produto",
    "desc": "Requisitos de produto por funcionalidade, plano de lançamento",
    "docx": "00-produto/03-requerimentos-do-produto.docx"
   },
   {
    "titulo": "Plano de Evolução",
    "desc": "Agora/A seguir/Mais tarde, Gantt, marcos",
    "docx": "00-produto/04-plano-de-evolucao.docx"
   },
   {
    "titulo": "Plano de Instrumentação e Analítica",
    "desc": "Que eventos o produto emite, nomes, consentimento, qualidade dos dados",
    "docx": "00-produto/05-plano-de-instrumentacao.docx"
   }
  ]
 },
 {
  "pasta": "01-gestao-projeto",
  "nome": "Gestão de projeto",
  "fase": "Como se conduz",
  "audiencia": "Gestor, patrocinador",
  "quando": "Ao arrancar",
  "documentos": [
   {
    "titulo": "Plano de Projeto",
    "desc": "Âmbito, marcos, WBS, equipa, orçamento, critérios de encerramento",
    "docx": "01-gestao-projeto/01-plano-projeto.docx"
   },
   {
    "titulo": "Estimativas e Esforço",
    "desc": "Três pontos (PERT), capacidade real, spikes, registo de desvios",
    "docx": "01-gestao-projeto/02-estimativas-e-esforco.docx"
   },
   {
    "titulo": "Responsabilidades e Comunicação",
    "desc": "Partes interessadas, matriz RACI, plano de comunicação",
    "docx": "01-gestao-projeto/03-matriz-raci-e-comunicacao.docx"
   },
   {
    "titulo": "Gestão de Alterações ao Âmbito",
    "desc": "Ficha de pedido, limiares de decisão, acumulado de desvio",
    "docx": "01-gestao-projeto/04-gestao-alteracoes.docx"
   },
   {
    "titulo": "Ata de Reunião",
    "desc": "Decisões, ações com dono, registo consolidado",
    "docx": "01-gestao-projeto/05-ata-reuniao.docx"
   },
   {
    "titulo": "Relatório de Estado",
    "desc": "Semáforo com justificação, bloqueios, decisões pendentes",
    "docx": "01-gestao-projeto/06-relatorio-estado.docx"
   },
   {
    "titulo": "Convocatória e Agenda",
    "desc": "Teste das três perguntas, tipos de reunião, agenda com tempos, papéis na sala",
    "docx": "01-gestao-projeto/07-convocatoria-e-agenda.docx"
   },
   {
    "titulo": "Reunião de Arranque",
    "desc": "Guião do arranque, as perguntas obrigatórias, entregas do cliente, sinais de alarme",
    "docx": "01-gestao-projeto/08-guiao-reuniao-arranque.docx"
   },
   {
    "titulo": "Reuniões de Cadência",
    "desc": "Ponto diário, planeamento, demo, retrospetiva, ponto com cliente, comité",
    "docx": "01-gestao-projeto/09-reunioes-de-cadencia.docx"
   },
   {
    "titulo": "Registo de Ações e Próximos Passos",
    "desc": "Ação bem escrita, estados, vista por horizonte, escalonamento de atrasos",
    "docx": "01-gestao-projeto/10-registo-de-acoes.docx"
   }
  ]
 },
 {
  "pasta": "01-requisitos",
  "nome": "Requisitos",
  "fase": "O quê",
  "audiencia": "Analistas, PO, equipa",
  "quando": "Primeira fase",
  "documentos": [
   {
    "titulo": "Levantamento de Requisitos — Guia e Registo",
    "desc": "Técnicas, <b>guião de entrevista</b>, priorização MoSCoW/Kano, critérios de qualidade",
    "docx": "01-requisitos/01-levantamento-requisitos.docx"
   },
   {
    "titulo": "Requisitos Funcionais",
    "desc": "Formato RF-nn com critérios de aceitação Gherkin",
    "docx": "01-requisitos/02-requisitos-funcionais.docx"
   },
   {
    "titulo": "Requisitos Não Funcionais (Atributos de Qualidade)",
    "desc": "46 RNF mensuráveis em 12 categorias",
    "docx": "01-requisitos/03-requisitos-nao-funcionais.docx"
   },
   {
    "titulo": "Histórias de Utilizador e Backlog",
    "desc": "Épicos, stories, DoR/DoD, INVEST, spikes",
    "docx": "01-requisitos/04-historias-de-utilizador.docx"
   },
   {
    "titulo": "Matriz de Rastreabilidade de Requisitos (RTM)",
    "desc": "Origem → story → teste; análise de impacto",
    "docx": "01-requisitos/05-matriz-rastreabilidade.docx"
   },
   {
    "titulo": "Glossário e Linguagem Ubíqua",
    "desc": "Linguagem ubíqua, termos ambíguos, contextos delimitados",
    "docx": "01-requisitos/06-glossario.docx"
   }
  ]
 },
 {
  "pasta": "02-analise",
  "nome": "Análise",
  "fase": "Como funciona o negócio",
  "audiencia": "Analistas, equipa, UX",
  "quando": "Antes de desenhar",
  "documentos": [
   {
    "titulo": "Casos de Uso",
    "desc": "Atores, diagrama, <b>ficha completa por caso de uso</b> — fluxos alternativos e de exceção, extensões, dados, permissões, critérios de aceitação — formulário em branco e lista de verificação",
    "docx": "02-analise/01-casos-de-uso.docx"
   },
   {
    "titulo": "Guia de Diagramas UML e de Modelação",
    "desc": "Qual diagrama para que pergunta + sintaxe Mermaid de 8 tipos",
    "docx": "02-analise/02-diagrama-casos-uso.docx"
   },
   {
    "titulo": "Fluxos e Processos — Catálogo de Diagramas",
    "desc": "<b>Fluxogramas as-is/to-be, raias, sequência, estados, DFD, navegação, integrações</b>",
    "docx": "02-analise/03-fluxos-processo.docx"
   },
   {
    "titulo": "Mapa de Jornada do Utilizador",
    "desc": "Jornada por fase, momentos da verdade, service blueprint",
    "docx": "02-analise/04-jornada-do-utilizador.docx"
   },
   {
    "titulo": "Regras de Negócio",
    "desc": "Catálogo RN-nn, tabelas de decisão, matriz regra × componente",
    "docx": "02-analise/05-regras-negocio.docx"
   },
   {
    "titulo": "Modelo de Domínio",
    "desc": "Contextos delimitados, agregados, objetos de valor, eventos",
    "docx": "02-analise/06-modelo-dominio.docx"
   }
  ]
 },
 {
  "pasta": "02-design",
  "nome": "Design",
  "fase": "Como se apresenta",
  "audiencia": "UX, equipa",
  "quando": "Antes de construir",
  "documentos": [
   {
    "titulo": "Especificação de Interface",
    "desc": "Ficha por ecrã, <b>os cinco estados</b>, validações, teclado",
    "docx": "02-design/01-especificacao-interface.docx"
   },
   {
    "titulo": "Esboços e Protótipo",
    "desc": "Níveis de fidelidade, esboço em texto, teste com utilizadores",
    "docx": "02-design/02-esbocos-e-prototipo.docx"
   },
   {
    "titulo": "Sistema de Design",
    "desc": "Tokens de cor, tipografia, espaçamento, componentes",
    "docx": "02-design/03-sistema-de-design.docx"
   },
   {
    "titulo": "Acessibilidade",
    "desc": "WCAG 2.2 AA como lista verificável, como testar, erros comuns",
    "docx": "02-design/04-acessibilidade.docx"
   },
   {
    "titulo": "Conteúdo e Microtextos",
    "desc": "Tom de voz, catálogo de mensagens, terminologia, idiomas",
    "docx": "02-design/05-conteudo-e-microtextos.docx"
   },
   {
    "titulo": "Internacionalização e Localização",
    "desc": "O que decidir cedo, chaves e plurais, formatos por região, verificação",
    "docx": "02-design/06-internacionalizacao.docx"
   }
  ]
 },
 {
  "pasta": "03-arquitetura",
  "nome": "Arquitetura",
  "fase": "Como está construído",
  "audiencia": "Equipa técnica",
  "quando": "Antes da primeira linha",
  "documentos": [
   {
    "titulo": "Documento de Arquitetura de Software",
    "desc": "C4 (contexto/contentores/componentes), atributos de qualidade, princípios",
    "docx": "03-arquitetura/01-documento-arquitetura.docx"
   },
   {
    "titulo": "ADR-{{NNN}}",
    "desc": "Decisões arquiteturais + [exemplo preenchido](03-arquitetura/decisoes/0001-exemplo.md)",
    "docx": "03-arquitetura/02-modelo-decisao-arquitetura.docx"
   },
   {
    "titulo": "Modelo de Dados",
    "desc": "ER, dicionário de dados, classificação de privacidade, migrações Expand/Contract",
    "docx": "03-arquitetura/03-modelo-dados.docx"
   },
   {
    "titulo": "Diagramas de Sequência — Cenários Técnicos",
    "desc": "OIDC, idempotência, outbox, circuit breaker, upload",
    "docx": "03-arquitetura/04-diagramas-sequencia.docx"
   },
   {
    "titulo": "Desenho e Contrato de API",
    "desc": "Convenções REST, erros RFC 9457, paginação, versionamento, OpenAPI, webhooks",
    "docx": "03-arquitetura/05-desenho-da-api.docx"
   },
   {
    "titulo": "Integrações com Sistemas Externos",
    "desc": "Ficha por sistema externo, mapeamento, falhas, reconciliação",
    "docx": "03-arquitetura/06-integracoes.docx"
   },
   {
    "titulo": "Escolha de Tecnologia",
    "desc": "Avaliação de alternativas, o que foi medido vs. lido, matriz de decisão",
    "docx": "03-arquitetura/07-escolha-tecnologia.docx"
   },
   {
    "titulo": "Prova de Conceito",
    "desc": "Pergunta verificável, prazo fixo, critérios definidos antes",
    "docx": "03-arquitetura/08-prova-conceito.docx"
   },
   {
    "titulo": "Plano de Migração de Dados",
    "desc": "Perfilagem, mapeamento, ensaio, reconciliação, ponto de não retorno",
    "docx": "03-arquitetura/09-plano-migracao-dados.docx"
   },
   {
    "titulo": "ADR-0001 — Usar monólito modular em vez de microsserviços",
    "desc": "Exemplo preenchido de registo de decisão de arquitetura: monólito modular em vez de microsserviços.",
    "docx": "03-arquitetura/decisoes/0001-exemplo.docx"
   }
  ]
 },
 {
  "pasta": "04-desenvolvimento",
  "nome": "Desenvolvimento",
  "fase": "Como se trabalha",
  "audiencia": "Programadores",
  "quando": "Antes de entrar a 2.ª pessoa",
  "documentos": [
   {
    "titulo": "Ambiente de Desenvolvimento",
    "desc": "Do clone ao \"a correr\" em 30 min; troubleshooting",
    "docx": "04-desenvolvimento/01-preparacao-do-ambiente.docx"
   },
   {
    "titulo": "Guia de Contribuição",
    "desc": "Branching, Conventional Commits, PRs, revisão de código",
    "docx": "04-desenvolvimento/02-guia-de-contribuicao.docx"
   },
   {
    "titulo": "Padrões de Código",
    "desc": "Nomenclatura, camadas, erros, segurança, logging",
    "docx": "04-desenvolvimento/03-padroes-codigo.docx"
   },
   {
    "titulo": "Integração e Entrega Contínua (CI/CD)",
    "desc": "O que corre em cada PR, verificações obrigatórias, testes intermitentes",
    "docx": "04-desenvolvimento/04-integracao-e-entrega-continua.docx"
   },
   {
    "titulo": "Gestão de Dívida Técnica",
    "desc": "Registo com juro e vencimento, orçamento por ciclo, sinais",
    "docx": "04-desenvolvimento/05-gestao-divida-tecnica.docx"
   },
   {
    "titulo": "Integração de Novos Elementos na Equipa",
    "desc": "Primeiro dia, ordem de leitura, primeira tarefa, conversa dos 30 dias",
    "docx": "04-desenvolvimento/06-integracao-de-novos-elementos.docx"
   },
   {
    "titulo": "Uso de IA no Desenvolvimento",
    "desc": "O que nunca se cola, revisão obrigatória, licenças, AGENTS.md",
    "docx": "04-desenvolvimento/07-uso-de-ia-no-desenvolvimento.docx"
   },
   {
    "titulo": "Ficheiros de Repositório",
    "desc": ".editorconfig, Makefile, modelos de PR e de bug, CODEOWNERS, CI",
    "docx": "04-desenvolvimento/08-ficheiros-de-repositorio.docx"
   }
  ]
 },
 {
  "pasta": "05-qualidade",
  "nome": "Qualidade",
  "fase": "Como se verifica",
  "audiencia": "QA, equipa, PO",
  "quando": "Durante a construção",
  "documentos": [
   {
    "titulo": "Plano de Testes",
    "desc": "Pirâmide, critérios de entrada/saída, testes baseados em risco, não funcionais",
    "docx": "05-qualidade/01-plano-testes.docx"
   },
   {
    "titulo": "Casos de Teste",
    "desc": "TC-nnn passo a passo, tabelas de decisão, valores-limite, charters exploratórios",
    "docx": "05-qualidade/02-casos-teste.docx"
   },
   {
    "titulo": "Critérios de Aceitação e UAT",
    "desc": "Gherkin, exemplo completo, protocolo de UAT",
    "docx": "05-qualidade/03-criterios-aceitacao.docx"
   },
   {
    "titulo": "Critérios de Conclusão",
    "desc": "DoR, DoD por story, por incremento e por entrada em serviço",
    "docx": "05-qualidade/04-criterios-de-conclusao.docx"
   },
   {
    "titulo": "Testes de Desempenho e Carga",
    "desc": "Perfil de carga, p95/p99, estrangulamentos, ponto de rutura",
    "docx": "05-qualidade/05-testes-desempenho-carga.docx"
   },
   {
    "titulo": "Relatório de Testes",
    "desc": "Recomendação, o que <b>não</b> foi testado, defeitos, riscos residuais",
    "docx": "05-qualidade/06-relatorio-testes.docx"
   },
   {
    "titulo": "Dados de Teste e Anonimização",
    "desc": "Dados gerados, técnicas de anonimização, o que sobra sempre",
    "docx": "05-qualidade/07-dados-de-teste-e-anonimizacao.docx"
   }
  ]
 },
 {
  "pasta": "06-operacao",
  "nome": "Operação",
  "fase": "Como se mantém a correr",
  "audiencia": "SRE, piquete",
  "quando": "Antes de entrar em produção",
  "documentos": [
   {
    "titulo": "Guia de Implantação",
    "desc": "Pipeline, canary, lista de verificaçãos, rollback",
    "docx": "06-operacao/01-implantacao.docx"
   },
   {
    "titulo": "Manual de Operação",
    "desc": "Procedimentos operacionais, resposta a cada alerta, o que <b>não</b> fazer",
    "docx": "06-operacao/02-manual-de-operacao.docx"
   },
   {
    "titulo": "Gestão de Incidentes e Análise Posterior",
    "desc": "Gravidades, papéis, comunicação, análise posterior sem culpados",
    "docx": "06-operacao/03-incidentes-e-analise-posterior.docx"
   },
   {
    "titulo": "Monitorização, SLOs e Observabilidade",
    "desc": "SLO/SLI, orçamento de erro, ritmo de consumo, sinais de ouro, catálogo de alertas",
    "docx": "06-operacao/04-monitorizacao.docx"
   },
   {
    "titulo": "Cópias de Segurança e Recuperação de Desastre (DR)",
    "desc": "RPO/RTO, regra 3-2-1, cenários, procedimentos de restauro, exercícios",
    "docx": "06-operacao/05-copias-de-seguranca-e-recuperacao.docx"
   },
   {
    "titulo": "Acordo de Nível de Serviço (SLA)",
    "desc": "SLA vs SLO, gravidades, exclusões, dependências de terceiros",
    "docx": "06-operacao/06-acordo-nivel-servico.docx"
   },
   {
    "titulo": "Plano de Capacidade",
    "desc": "Projeção, limites invisíveis, picos previsíveis, gatilhos",
    "docx": "06-operacao/07-plano-capacidade.docx"
   },
   {
    "titulo": "Gestão de Ambientes e Configuração",
    "desc": "Inventário de variáveis, segredos, paridade, armadilhas conhecidas",
    "docx": "06-operacao/08-gestao-ambientes-configuracao.docx"
   },
   {
    "titulo": "Gestão de Feature Flags",
    "desc": "Tipos, inventário, ciclo de vida, remoção, uso em incidente",
    "docx": "06-operacao/09-gestao-de-feature-flags.docx"
   },
   {
    "titulo": "Custos de Infraestrutura",
    "desc": "Custo por componente, projeção, degraus, alertas, onde se poupa",
    "docx": "06-operacao/10-custos-de-infraestrutura.docx"
   },
   {
    "titulo": "Modelo de Suporte",
    "desc": "N1/N2/N3, caminho do pedido, gravidades, base de conhecimento",
    "docx": "06-operacao/11-modelo-de-suporte.docx"
   },
   {
    "titulo": "Publicação nas Lojas de Aplicações",
    "desc": "Conta e chaves, ficha da loja, lançamento faseado, motivos de recusa",
    "docx": "06-operacao/12-publicacao-nas-lojas.docx"
   }
  ]
 },
 {
  "pasta": "07-governanca",
  "nome": "Governança",
  "fase": "Conformidade e risco",
  "audiencia": "Segurança, DPO, gestão",
  "quando": "Antes do primeiro dado real",
  "documentos": [
   {
    "titulo": "Política e Documentação de Segurança",
    "desc": "Reporte de vulnerabilidades, modelo de ameaças STRIDE, OWASP Top 10, controlos",
    "docx": "07-governanca/01-seguranca.docx"
   },
   {
    "titulo": "Privacidade e Conformidade com o RGPD",
    "desc": "Registo de tratamentos, direitos dos titulares, subcontratantes, DPIA, violações",
    "docx": "07-governanca/02-privacidade-rgpd.docx"
   },
   {
    "titulo": "Matriz de Riscos",
    "desc": "Escalas P×I, registo, mapa de calor, planos de contingência",
    "docx": "07-governanca/03-matriz-riscos.docx"
   },
   {
    "titulo": "Licenças e Componentes de Terceiros",
    "desc": "Que licenças se podem usar, SBOM, vulnerabilidades, abandono",
    "docx": "07-governanca/04-licencas-e-terceiros.docx"
   },
   {
    "titulo": "Contratação e Fornecedores",
    "desc": "Caderno de encargos, propriedade do código, plano de saída",
    "docx": "07-governanca/05-contratacao-e-fornecedores.docx"
   },
   {
    "titulo": "Plano de Auditoria e Conformidade",
    "desc": "Registo de auditoria, calendário, revisão de acessos",
    "docx": "07-governanca/06-plano-auditoria.docx"
   },
   {
    "titulo": "Matriz de Acessos e Permissões",
    "desc": "Papéis, matriz por recurso, regras de contexto, ciclo de vida",
    "docx": "07-governanca/07-matriz-de-acessos-e-permissoes.docx"
   },
   {
    "titulo": "Política de Privacidade e Termos de Utilização",
    "desc": "Textos públicos para o utilizador, exigidos pelas lojas",
    "docx": "07-governanca/08-politica-privacidade-e-termos.docx"
   }
  ]
 },
 {
  "pasta": "08-utilizador",
  "nome": "Utilizador",
  "fase": "Como se usa",
  "audiencia": "Utilizadores finais, integradores",
  "quando": "Antes da formação",
  "documentos": [
   {
    "titulo": "{{Nome do Produto}}",
    "desc": "Porta de entrada do repositório",
    "docx": "08-utilizador/01-apresentacao-do-produto.docx"
   },
   {
    "titulo": "Manual do Utilizador",
    "desc": "Estruturado segundo Diátaxis (tutorial/how-to/referência/explicação)",
    "docx": "08-utilizador/02-manual-utilizador.docx"
   },
   {
    "titulo": "Registo de Alterações",
    "desc": "Keep a Registo de Alterações + SemVer",
    "docx": "08-utilizador/03-registo-de-alteracoes.docx"
   },
   {
    "titulo": "Guia de Administração",
    "desc": "Contas, papéis, tabelas de referência, o que <b>não</b> fazer",
    "docx": "08-utilizador/04-guia-administracao.docx"
   },
   {
    "titulo": "Perguntas Frequentes e Resolução de Problemas",
    "desc": "Sintomas, mensagens de erro, o que enviar ao suporte",
    "docx": "08-utilizador/05-perguntas-frequentes.docx"
   },
   {
    "titulo": "Plano de Formação e Adesão",
    "desc": "O que cada grupo <b>perde</b>, resistências, adesão faseada, medição",
    "docx": "08-utilizador/06-plano-formacao-adesao.docx"
   }
  ]
 },
 {
  "pasta": "09-encerramento",
  "nome": "Encerramento",
  "fase": "Como se fecha e se entrega",
  "audiencia": "Gestor, equipa que recebe",
  "quando": "No fecho",
  "documentos": [
   {
    "titulo": "Relatório de Encerramento",
    "desc": "Prometido vs entregue, desvios, dívida deixada",
    "docx": "09-encerramento/01-relatorio-encerramento.docx"
   },
   {
    "titulo": "Lições Aprendidas",
    "desc": "Sem culpados, causa raiz, o que nos surpreendeu, ações",
    "docx": "09-encerramento/02-licoes-aprendidas.docx"
   },
   {
    "titulo": "Plano de Transição e Entrega",
    "desc": "As sete provas de transição, sombra invertida, conhecimento não escrito",
    "docx": "09-encerramento/03-plano-de-transicao.docx"
   }
  ]
 }
];
