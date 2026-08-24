# Templates de Documentação de Software

Conjunto de templates que cobre o ciclo de vida completo de uma aplicação — do levantamento de requisitos à operação em produção.

Todos os templates estão em **Português (PT)**, em Markdown, com diagramas em **Mermaid** (renderizam no GitHub, GitLab, Obsidian, Notion e na maioria dos wikis).

---

## Formatos disponíveis

| Formato | Onde | Para quê |
|---|---|---|
| **Word (.docx)** | **ao lado de cada `.md`, na mesma pasta** | É o formato de apresentação. Abre no Word, circula por e-mail, revê-se com controlo de alterações, imprime-se |
| **Word — coletânea** | [`00-COLETANEA-COMPLETA.docx`](00-COLETANEA-COMPLETA.docx) | Os 71 documentos num único ficheiro, com índice geral |
| **Markdown** | ao lado de cada `.docx` | Fonte de verdade para edição e controlo de versões |

**Todos os ficheiros abrem no Word.** Cada `.md` tem o seu `.docx` ao lado, com o mesmo nome — não há pasta separada.

Os `.docx` são gerados a partir dos `.md` — **edita sempre o Markdown** e regenera, para os dois formatos não divergirem:

```bash
./gerar-docx.sh                 # regenera tudo (~25 s)
./gerar-docx.sh 02-analise      # só uma pasta
./gerar-docx.sh --sem-coletanea # sem o ficheiro consolidado
```

Cada `.docx` traz: página A4, índice automático (atualizável com `Ctrl+A` → `F9` no Word), rodapé com numeração, tabelas formatadas, estilos de título nativos e os **diagramas Mermaid convertidos em imagens**.

**Requisitos para regenerar:** [pandoc](https://pandoc.org/installing.html) ≥ 3.0 e Node.js ≥ 18. Em Linux/WSL, o Chromium usado para renderizar os diagramas precisa de bibliotecas do sistema:
```bash
sudo apt-get install -y libasound2t64 libnss3 libatk-bridge2.0-0 libgbm1 libxkbcommon0
```

### Cores

O aspeto segue o **manual de UI/UX da Romafe** (`02-COR-E-TEMAS`):

| Elemento | Cor | Papel no manual |
|---|---|---|
| Títulos e texto principal | `#222428` | Tinta principal — *os títulos são tinta principal, e não azuis* (§3) |
| Texto secundário | `#52514e` | Tinta secundária (§3) |
| Legendas | `#6b6e74` | Tinta discreta (§3) |
| Ligações, código em linha, cabeçalho de tabela | `#00537e` | Azul da marca — identidade e estrutura (§1) |
| Fundo de realce e de código | `#f7f8fa` · `#eceff3` | Realce 1 e realce 2 (§2) |
| Filetes de tabela e separadores | `#bfc0c2` | Cinzento corporativo, reservado a separação em impresso (§1) |
| **Filete do título e barra das citações** | **`#ef7b10`** | **Laranja de referência da marca — preenchimento e traço grosso (§1)** |
| **Filete dos títulos de secção e do código** | **`#ba5c00`** | **Laranja escurecido, *para traço e preenchimento sobre fundo claro* (§1.2)** |
| **Fundo das citações e notas** | **`#fee1ce`** | **Fundo suave da escala do laranja (§1.2)** |

As duas cores da marca estão as duas presentes, e cada uma no seu papel: **o azul identifica** — títulos de tabela, ligações, nós dos diagramas — e **o laranja marca** — o filete sob o título de capa, o filete de cada secção, a barra das citações, o bloco de código, as notas dos diagramas, os marcos dos Gantt.

**O laranja não é usado como cor de texto**, e isso não é uma escolha de gosto: o manual di-lo em §1.2 — *"nenhum laranja desta escala serve de texto"* — porque branco sobre `#ef7b10` dá 2.80:1 contra o mínimo de 4.5:1, a dívida registada em §1. A única entrada do laranja como fundo de texto é a etiqueta curta e a negrito das caixas de sequência nos diagramas, que é exactamente a exceção que o manual admite para o rótulo do botão primário. Como texto usa-se `#a2451c`, o laranja escuro que o manual dá como tinta de estado.

Personalização: [`assets/reference.docx`](assets/reference.docx) (estilos, margens, rodapé), [`assets/mermaid.json`](assets/mermaid.json) (tema dos diagramas) e [`assets/realce.theme`](assets/realce.theme) (realce de sintaxe do código).

---

## Como usar

1. **Não uses tudo.** Escolhe o subconjunto adequado ao teu contexto — ver [tabela de seleção](#que-documentos-preciso-mesmo).
2. Copia os ficheiros para a pasta `docs/` do teu projeto.
3. Substitui todos os `{{marcadores}}`. Se um marcador continua por preencher, ou o preenches ou apagas a secção — meio preenchido é pior que ausente.
4. Apaga o que não se aplica. Um documento com secções vazias ensina a equipa a ignorar a documentação.
5. Coloca a documentação **junto do código**, no mesmo repositório, revista nos mesmos PRs.

```bash
# Encontrar marcadores por preencher
grep -rn '{{' --include='*.md' . | wc -l
```

---

## Estrutura

| Pasta | Fase | Audiência principal |
|---|---|---|
| [`00-produto/`](00-produto/) | Porquê e para quem | Negócio, PO, stakeholders |
| [`01-gestao-projeto/`](01-gestao-projeto/) | Como se conduz | Gestor, patrocinador |
| [`01-requisitos/`](01-requisitos/) | O quê | Analistas, PO, equipa |
| [`02-analise/`](02-analise/) | Como funciona o negócio | Analistas, equipa, UX |
| [`02-design/`](02-design/) | Como se apresenta | UX, equipa |
| [`03-arquitetura/`](03-arquitetura/) | Como está construído | Equipa técnica |
| [`04-desenvolvimento/`](04-desenvolvimento/) | Como se trabalha | Programadores |
| [`05-qualidade/`](05-qualidade/) | Como se verifica | QA, equipa, PO |
| [`06-operacao/`](06-operacao/) | Como se mantém a correr | SRE, on-call |
| [`07-governanca/`](07-governanca/) | Conformidade e risco | Segurança, DPO, gestão |
| [`08-utilizador/`](08-utilizador/) | Como se usa | Utilizadores finais, integradores |
| [`09-encerramento/`](09-encerramento/) | Como se fecha e se entrega | Gestor, equipa que recebe |

**A numeração das pastas é a ordem de execução.** Quem quiser a sequência completa, documento a documento, com o momento em que cada um se escreve: [**Ordem de Execução**](ORDEM-DE-EXECUCAO.md).

---

## Índice completo

### 00 — Produto
| Ficheiro | Conteúdo |
|---|---|
| [Visão de Produto](00-produto/01-visao-produto.md) | Problema, objetivos, métricas, âmbito, stakeholders |
| [Personas](00-produto/02-personas.md) | Perfis de utilizador, dores, matriz persona × funcionalidade |
| [PRD](00-produto/03-prd.md) | Requisitos de produto por funcionalidade, plano de lançamento |
| [Roadmap](00-produto/04-roadmap.md) | Agora/A seguir/Mais tarde, Gantt, marcos |

### 01 — Gestão de projeto
| Ficheiro | Conteúdo |
|---|---|
| [Plano de Projeto](01-gestao-projeto/01-plano-projeto.md) | Âmbito, marcos, WBS, equipa, orçamento, critérios de encerramento |
| [Estimativas e Esforço](01-gestao-projeto/02-estimativas-e-esforco.md) | Três pontos (PERT), capacidade real, spikes, registo de desvios |
| [Responsabilidades e Comunicação](01-gestao-projeto/03-matriz-raci-e-comunicacao.md) | Partes interessadas, matriz RACI, plano de comunicação |
| [Gestão de Alterações](01-gestao-projeto/04-gestao-alteracoes.md) | Ficha de pedido, limiares de decisão, acumulado de desvio |
| [Ata de Reunião](01-gestao-projeto/05-ata-reuniao.md) | Decisões, ações com dono, registo consolidado |
| [Relatório de Estado](01-gestao-projeto/06-relatorio-estado.md) | Semáforo com justificação, bloqueios, decisões pendentes |

### 01 — Requisitos
| Ficheiro | Conteúdo |
|---|---|
| [Levantamento de Requisitos](01-requisitos/01-levantamento-requisitos.md) | Técnicas, **guião de entrevista**, priorização MoSCoW/Kano, critérios de qualidade |
| [Requisitos Funcionais](01-requisitos/02-requisitos-funcionais.md) | Formato RF-nn com critérios de aceitação Gherkin |
| [Requisitos Não Funcionais](01-requisitos/03-requisitos-nao-funcionais.md) | 46 RNF mensuráveis em 12 categorias |
| [User Stories](01-requisitos/04-user-stories.md) | Épicos, stories, DoR/DoD, INVEST, spikes |
| [Matriz de Rastreabilidade](01-requisitos/05-matriz-rastreabilidade.md) | Origem → story → teste; análise de impacto |
| [Glossário](01-requisitos/06-glossario.md) | Linguagem ubíqua, termos ambíguos, contextos delimitados |

### 02 — Análise
| Ficheiro | Conteúdo |
|---|---|
| [Casos de Uso](02-analise/01-use-cases.md) | Atores, diagrama, especificação completa com fluxos alternativos e exceções |
| [Guia de Diagramas](02-analise/02-diagrama-casos-uso.md) | Qual diagrama para que pergunta + sintaxe Mermaid de 8 tipos |
| [Fluxos e Processos](02-analise/03-fluxos-processo.md) | **Fluxogramas as-is/to-be, swimlanes, sequência, estados, DFD, navegação, integrações** |
| [User Journey](02-analise/04-user-journey.md) | Jornada por fase, momentos da verdade, service blueprint |
| [Regras de Negócio](02-analise/05-regras-negocio.md) | Catálogo RN-nn, tabelas de decisão, matriz regra × componente |
| [Modelo de Domínio](02-analise/06-modelo-dominio.md) | Contextos delimitados, agregados, objetos de valor, eventos |

### 02 — Design
| Ficheiro | Conteúdo |
|---|---|
| [Especificação de Interface](02-design/01-especificacao-interface.md) | Ficha por ecrã, **os cinco estados**, validações, teclado |
| [Wireframes e Protótipo](02-design/02-wireframes-e-prototipo.md) | Níveis de fidelidade, wireframe em texto, teste com utilizadores |
| [Sistema de Design](02-design/03-design-system.md) | Tokens de cor, tipografia, espaçamento, componentes |
| [Acessibilidade](02-design/04-acessibilidade.md) | WCAG 2.2 AA como lista verificável, como testar, erros comuns |
| [Conteúdo e Microcopy](02-design/05-conteudo-e-microcopy.md) | Tom de voz, catálogo de mensagens, terminologia, idiomas |

### 03 — Arquitetura
| Ficheiro | Conteúdo |
|---|---|
| [Documento de Arquitetura](03-arquitetura/01-documento-arquitetura.md) | C4 (contexto/contentores/componentes), atributos de qualidade, princípios |
| [Modelo de ADR](03-arquitetura/02-adr-template.md) | Decisões arquiteturais + [exemplo preenchido](03-arquitetura/adr/0001-exemplo.md) |
| [Modelo de Dados](03-arquitetura/03-modelo-dados.md) | ER, dicionário de dados, classificação de privacidade, migrações Expand/Contract |
| [Diagramas de Sequência](03-arquitetura/04-diagramas-sequencia.md) | OIDC, idempotência, outbox, circuit breaker, upload |
| [Desenho de API](03-arquitetura/05-api-design.md) | Convenções REST, erros RFC 9457, paginação, versionamento, OpenAPI, webhooks |
| [Integrações](03-arquitetura/06-integracoes.md) | Ficha por sistema externo, mapeamento, falhas, reconciliação |
| [Escolha de Tecnologia](03-arquitetura/07-escolha-tecnologia.md) | Avaliação de alternativas, o que foi medido vs. lido, matriz de decisão |
| [Prova de Conceito](03-arquitetura/08-prova-conceito.md) | Pergunta verificável, prazo fixo, critérios definidos antes |
| [Plano de Migração de Dados](03-arquitetura/09-plano-migracao-dados.md) | Perfilagem, mapeamento, ensaio, reconciliação, ponto de não retorno |

### 04 — Desenvolvimento
| Ficheiro | Conteúdo |
|---|---|
| [Setup do Ambiente](04-desenvolvimento/01-setup-ambiente.md) | Do clone ao "a correr" em 30 min; troubleshooting |
| [Guia de Contribuição](04-desenvolvimento/02-contributing.md) | Branching, Conventional Commits, PRs, revisão de código |
| [Padrões de Código](04-desenvolvimento/03-padroes-codigo.md) | Nomenclatura, camadas, erros, segurança, logging |

### 05 — Qualidade
| Ficheiro | Conteúdo |
|---|---|
| [Plano de Testes](05-qualidade/01-plano-testes.md) | Pirâmide, critérios de entrada/saída, testes baseados em risco, não funcionais |
| [Casos de Teste](05-qualidade/02-casos-teste.md) | TC-nnn passo a passo, tabelas de decisão, valores-limite, charters exploratórios |
| [Critérios de Aceitação](05-qualidade/03-criterios-aceitacao.md) | Gherkin, exemplo completo, protocolo de UAT |
| [Critérios de Conclusão](05-qualidade/04-definition-of-done.md) | DoR, DoD por story, por incremento e por entrada em serviço |
| [Testes de Desempenho e Carga](05-qualidade/05-testes-desempenho-carga.md) | Perfil de carga, p95/p99, estrangulamentos, ponto de rutura |
| [Relatório de Testes](05-qualidade/06-relatorio-testes.md) | Recomendação, o que **não** foi testado, defeitos, riscos residuais |

### 06 — Operação
| Ficheiro | Conteúdo |
|---|---|
| [Deployment](06-operacao/01-deployment.md) | Pipeline, canary, checklists, rollback |
| [Runbook](06-operacao/02-runbook.md) | Procedimentos operacionais, resposta a cada alerta, o que **não** fazer |
| [Incidentes e Post-Mortem](06-operacao/03-incidentes-postmortem.md) | Gravidades, papéis, comunicação, post-mortem sem culpados |
| [Monitorização](06-operacao/04-monitorizacao.md) | SLO/SLI, orçamento de erro, burn rate, sinais de ouro, catálogo de alertas |
| [Backup e DR](06-operacao/05-backup-dr.md) | RPO/RTO, regra 3-2-1, cenários, procedimentos de restauro, exercícios |
| [Acordo de Nível de Serviço](06-operacao/06-acordo-nivel-servico.md) | SLA vs SLO, gravidades, exclusões, dependências de terceiros |
| [Plano de Capacidade](06-operacao/07-plano-capacidade.md) | Projeção, limites invisíveis, picos previsíveis, gatilhos |
| [Ambientes e Configuração](06-operacao/08-gestao-ambientes-configuracao.md) | Inventário de variáveis, segredos, paridade, armadilhas conhecidas |

### 07 — Governança
| Ficheiro | Conteúdo |
|---|---|
| [Segurança](07-governanca/01-security.md) | Reporte de vulnerabilidades, modelo de ameaças STRIDE, OWASP Top 10, controlos |
| [Privacidade / RGPD](07-governanca/02-privacidade-rgpd.md) | Registo de tratamentos, direitos dos titulares, subcontratantes, DPIA, violações |
| [Matriz de Riscos](07-governanca/03-matriz-riscos.md) | Escalas P×I, registo, mapa de calor, planos de contingência |
| [Licenças e Terceiros](07-governanca/04-licencas-e-terceiros.md) | Que licenças se podem usar, SBOM, vulnerabilidades, abandono |
| [Contratação e Fornecedores](07-governanca/05-contratacao-e-fornecedores.md) | Caderno de encargos, propriedade do código, plano de saída |
| [Plano de Auditoria](07-governanca/06-plano-auditoria.md) | Registo de auditoria, calendário, revisão de acessos |

### 08 — Utilizador
| Ficheiro | Conteúdo |
|---|---|
| [README do produto](08-utilizador/01-readme-produto.md) | Porta de entrada do repositório |
| [Manual do Utilizador](08-utilizador/02-manual-utilizador.md) | Estruturado segundo Diátaxis (tutorial/how-to/referência/explicação) |
| [Changelog](08-utilizador/03-changelog.md) | Keep a Changelog + SemVer |
| [Guia de Administração](08-utilizador/04-guia-administracao.md) | Contas, papéis, tabelas de referência, o que **não** fazer |
| [FAQ e Resolução de Problemas](08-utilizador/05-faq-resolucao-problemas.md) | Sintomas, mensagens de erro, o que enviar ao suporte |
| [Plano de Formação e Adesão](08-utilizador/06-plano-formacao-adesao.md) | O que cada grupo **perde**, resistências, adesão faseada, medição |

### 09 — Encerramento
| Ficheiro | Conteúdo |
|---|---|
| [Relatório de Encerramento](09-encerramento/01-relatorio-encerramento.md) | Prometido vs entregue, desvios, dívida deixada |
| [Lições Aprendidas](09-encerramento/02-licoes-aprendidas.md) | Sem culpados, causa raiz, o que nos surpreendeu, ações |
| [Plano de Transição](09-encerramento/03-plano-transicao-handover.md) | As sete provas de transição, sombra invertida, conhecimento não escrito |

---

## Que documentos preciso mesmo?

| Contexto | Mínimo viável | Acrescenta quando |
|---|---|---|
| **Protótipo / MVP** | README, Visão de Produto, User Stories, Wireframes, ADRs, Definition of Done | Aparecerem utilizadores reais |
| **App interna pequena** | + Plano de Projeto, Requisitos, Casos de Uso, Especificação de Interface, Setup, Runbook, Guia de Administração | Houver mais do que uma equipa a mexer |
| **SaaS em produção** | + Arquitetura, Modelo de Dados, API, Plano de Testes, Monitorização, Backup/DR, Segurança, RGPD, SLA, Licenças, Formação | — |
| **Open source** | README, CONTRIBUTING, SECURITY, LICENSE, Changelog, API | Houver contribuidores externos regulares |
| **Setor regulado** | Tudo, com ênfase em Rastreabilidade, Riscos, RGPD, Auditoria | — |
| **Substitui um processo existente** | + Formação e Adesão, Migração de Dados, FAQ | — |
| **Projeto com fim previsto** | + Encerramento, Lições Aprendidas, Transição | — |
| **App móvel** | + Guia de submissão às lojas, política de privacidade | — |

**Regra prática:** escreve o documento quando a sua ausência já custou tempo a alguém. Documentação escrita "por via das dúvidas" é a primeira a ficar desatualizada.

---

## Princípios de boa documentação

| # | Princípio |
|---|---|
| 1 | **Documentação desatualizada é pior que nenhuma** — ensina a desconfiar de tudo o resto |
| 2 | **Junto do código, no mesmo PR** — se vive noutro sítio, morre noutro sítio |
| 3 | **Escreve para quem chega às 3 da manhã** — sem contexto, sem pressupostos |
| 4 | **Explica o *porquê*** — o *quê* está no código; o *porquê* perde-se |
| 5 | **Uma audiência por documento** — misturar utilizador final e SRE não serve nenhum dos dois |
| 6 | **Cada documento tem dono** — sem dono, ninguém o atualiza |
| 7 | **Diagramas como código** — Mermaid em texto é revisível e versionável; um PNG não é |
| 8 | **Data de revisão visível** — permite a quem lê calibrar a confiança |

### Manutenção

| Documento | Atualizar quando | Rever pelo menos |
|---|---|---|
| Requisitos, Casos de Uso | Muda o âmbito | Por release |
| Arquitetura, ADR | Muda uma decisão estrutural | Trimestral |
| Runbook | Após cada incidente | Trimestral + exercício |
| Manual do Utilizador | Muda a interface | Por release |
| Riscos | Continuamente | Conforme cadência definida |
| Segurança / RGPD | Muda o tratamento de dados | Anual |

---

## Referências

- [Diátaxis](https://diataxis.fr/) — modelo dos quatro tipos de documentação técnica
- [C4 Model](https://c4model.com/) — diagramas de arquitetura em quatro níveis
- [ADR](https://adr.github.io/) — Architecture Decision Records
- [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/) · [SemVer](https://semver.org/lang/pt-BR/) · [Conventional Commits](https://www.conventionalcommits.org/pt-br/)
- [Mermaid](https://mermaid.js.org/) — sintaxe dos diagramas
- [Google SRE Book](https://sre.google/books/) — SLOs, post-mortems, on-call
