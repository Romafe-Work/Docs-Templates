# Ordem de Execução

Os 69 documentos pela ordem em que se produzem, do primeiro dia ao encerramento.
**A ordem dos ficheiros é a ordem de execução** — as pastas estão numeradas para
que assim seja, e a coletânea segue a mesma sequência.

> **Não se escrevem todos.** Ver §12: cada contexto tem o seu subconjunto. Um
> documento escrito por via das dúvidas é o primeiro a ficar desactualizado, e
> desactualizado ensina a desconfiar de todos os outros.

---

## Como ler as colunas

| Coluna | Significa |
|---|---|
| **Quando** | O momento em que se escreve, não o momento em que se lê |
| **Dono** | Quem responde por ele estar certo e atualizado |
| **Gatilho** | O acontecimento que torna este documento necessário |

---

## 1. Produto — porquê e para quem

| # | Documento | Quando | Dono | Gatilho |
|---|---|---|---|---|
| 1 | [Visão de Produto](00-produto/01-visao-produto.md) | Antes de tudo | PO | Existe uma ideia |
| 2 | [Personas](00-produto/02-personas.md) | Com a visão | PO / UX | Sabe-se para quem é |
| 3 | [PRD](00-produto/03-prd.md) | Depois da visão aprovada | PO | Há orçamento |
| 4 | [Roadmap](00-produto/04-roadmap.md) | Depois do PRD | PO | Há mais do que uma fase |

## 2. Gestão de projeto — como se conduz

| # | Documento | Quando | Dono | Gatilho |
|---|---|---|---|---|
| 5 | [Plano de Projeto](01-gestao-projeto/01-plano-projeto.md) | Ao arrancar | Gestor | O projeto é aprovado |
| 6 | [Estimativas e Esforço](01-gestao-projeto/02-estimativas-e-esforco.md) | Com o plano | Equipa | É preciso um prazo |
| 7 | [Responsabilidades e Comunicação](01-gestao-projeto/03-matriz-raci-e-comunicacao.md) | Com o plano | Gestor | Há mais de uma equipa |
| 8 | [Gestão de Alterações](01-gestao-projeto/04-gestao-alteracoes.md) | Antes do 1.º pedido | Gestor | O âmbito foi fechado |
| 9 | [Ata de Reunião](01-gestao-projeto/05-ata-reuniao.md) | A cada reunião | Quem convoca | Sempre |
| 10 | [Relatório de Estado](01-gestao-projeto/06-relatorio-estado.md) | Periódico | Gestor | Sempre |

## 3. Requisitos — o quê

| # | Documento | Quando | Dono | Gatilho |
|---|---|---|---|---|
| 11 | [Levantamento de Requisitos](01-requisitos/01-levantamento-requisitos.md) | Primeira fase | Analista | Antes de escrever requisitos |
| 12 | [Requisitos Funcionais](01-requisitos/02-requisitos-funcionais.md) | Após o levantamento | Analista | Sempre |
| 13 | [Requisitos Não Funcionais](01-requisitos/03-requisitos-nao-funcionais.md) | Com os funcionais | Analista / Arquiteto | **Nunca saltar** — decidem a arquitetura |
| 14 | [User Stories](01-requisitos/04-user-stories.md) | Antes de construir | PO | Trabalho iterativo |
| 15 | [Matriz de Rastreabilidade](01-requisitos/05-matriz-rastreabilidade.md) | Contínuo | Analista | Setor regulado ou âmbito volátil |
| 16 | [Glossário](01-requisitos/06-glossario.md) | Desde o 1.º dia | Analista | Duas pessoas usam a mesma palavra para coisas diferentes |

## 4. Análise — como funciona o negócio

| # | Documento | Quando | Dono | Gatilho |
|---|---|---|---|---|
| 17 | [Casos de Uso](02-analise/01-use-cases.md) | Após os requisitos | Analista | Há fluxos com alternativas |
| 18 | [Guia de Diagramas](02-analise/02-diagrama-casos-uso.md) | Referência | — | Consulta |
| 19 | [Fluxos e Processos](02-analise/03-fluxos-processo.md) | Com os casos de uso | Analista | Há processo a mudar |
| 20 | [User Journey](02-analise/04-user-journey.md) | Com as personas | UX | A experiência atravessa canais |
| 21 | [Regras de Negócio](02-analise/05-regras-negocio.md) | Com os requisitos | Analista | Há cálculos ou decisões automáticas |
| 22 | [Modelo de Domínio](02-analise/06-modelo-dominio.md) | Antes da arquitetura | Arquiteto | Domínio com mais de 10 entidades |

## 5. Design — como se apresenta

| # | Documento | Quando | Dono | Gatilho |
|---|---|---|---|---|
| 23 | [Especificação de Interface](02-design/01-especificacao-interface.md) | Antes de construir ecrãs | UX | Há interface |
| 24 | [Wireframes e Protótipo](02-design/02-wireframes-e-prototipo.md) | Antes da especificação final | UX | **Antes de escrever código** |
| 25 | [Sistema de Design](02-design/03-design-system.md) | Antes do 2.º ecrã | UX | Mais de uma pessoa a construir |
| 26 | [Acessibilidade](02-design/04-acessibilidade.md) | Desde o início | UX | Obrigação legal ou público diverso |
| 27 | [Conteúdo e Microcopy](02-design/05-conteudo-e-microcopy.md) | Com a especificação | UX / PO | Há mais de um idioma ou muitas mensagens |

## 6. Arquitetura — como está construído

| # | Documento | Quando | Dono | Gatilho |
|---|---|---|---|---|
| 28 | [Documento de Arquitetura](03-arquitetura/01-documento-arquitetura.md) | Antes de construir | Arquiteto | Mais de um componente |
| 29 | [ADR](03-arquitetura/02-adr-template.md) | A cada decisão | Quem decide | Decisão estrutural |
| 30 | [Modelo de Dados](03-arquitetura/03-modelo-dados.md) | Antes da 1.ª migração | Arquiteto | Há base de dados |
| 31 | [Diagramas de Sequência](03-arquitetura/04-diagramas-sequencia.md) | Conforme necessário | Arquiteto | Fluxo com 3+ componentes |
| 32 | [Desenho de API](03-arquitetura/05-api-design.md) | Antes do 1.º endpoint | Arquiteto | Há API |
| 33 | [Integrações](03-arquitetura/06-integracoes.md) | Antes de integrar | Arquiteto | Há sistema externo |
| 34 | [Escolha de Tecnologia](03-arquitetura/07-escolha-tecnologia.md) | **Antes de escrever código** | Arquiteto | Há 3+ candidatos sérios |
| 35 | [Prova de Conceito](03-arquitetura/08-prova-conceito.md) | Antes de decidir | Equipa | Não se sabe o suficiente para estimar |
| 36 | [Plano de Migração de Dados](03-arquitetura/09-plano-migracao-dados.md) | Antes da entrada em serviço | Arquiteto | Há dados a trazer de outro sítio |

## 7. Desenvolvimento — como se trabalha

| # | Documento | Quando | Dono | Gatilho |
|---|---|---|---|---|
| 37 | [Setup do Ambiente](04-desenvolvimento/01-setup-ambiente.md) | Antes de entrar a 2.ª pessoa | Tech Lead | Sempre |
| 38 | [Guia de Contribuição](04-desenvolvimento/02-contributing.md) | Com o setup | Tech Lead | Mais de uma pessoa |
| 39 | [Padrões de Código](04-desenvolvimento/03-padroes-codigo.md) | Primeira semana | Tech Lead | Mais de uma pessoa |

## 8. Qualidade — como se verifica

| # | Documento | Quando | Dono | Gatilho |
|---|---|---|---|---|
| 40 | [Plano de Testes](05-qualidade/01-plano-testes.md) | Antes de construir | QA | Sempre |
| 41 | [Casos de Teste](05-qualidade/02-casos-teste.md) | Com cada funcionalidade | QA | Sempre |
| 42 | [Critérios de Aceitação](05-qualidade/03-criterios-aceitacao.md) | Com cada story | PO | Sempre |
| 43 | [Critérios de Conclusão](05-qualidade/04-definition-of-done.md) | **Primeira semana** | Equipa | Mais de uma pessoa |
| 44 | [Testes de Desempenho e Carga](05-qualidade/05-testes-desempenho-carga.md) | Antes da entrada em serviço | QA | Há RNF de desempenho |
| 45 | [Relatório de Testes](05-qualidade/06-relatorio-testes.md) | Antes de cada entrega | QA | Alguém tem de autorizar |

## 9. Operação — como se mantém a correr

| # | Documento | Quando | Dono | Gatilho |
|---|---|---|---|---|
| 46 | [Deployment](06-operacao/01-deployment.md) | Antes da 1.ª publicação | SRE | Sempre |
| 47 | [Runbook](06-operacao/02-runbook.md) | **Antes da entrada em serviço** | SRE | Alguém vai estar de piquete |
| 48 | [Incidentes e Post-Mortem](06-operacao/03-incidentes-postmortem.md) | Antes do 1.º incidente | SRE | Sempre |
| 49 | [Monitorização](06-operacao/04-monitorizacao.md) | Com a 1.ª publicação | SRE | Sempre |
| 50 | [Backup e DR](06-operacao/05-backup-dr.md) | **Antes dos 1.os dados reais** | SRE | Há dados que não se podem perder |
| 51 | [Acordo de Nível de Serviço](06-operacao/06-acordo-nivel-servico.md) | Antes de prometer | Gestor | Há compromisso com terceiros |
| 52 | [Plano de Capacidade](06-operacao/07-plano-capacidade.md) | 1.º mês em produção | SRE | O sistema cresce |
| 53 | [Ambientes e Configuração](06-operacao/08-gestao-ambientes-configuracao.md) | Com o 2.º ambiente | SRE | Mais de um ambiente |

## 10. Governança — conformidade e risco

| # | Documento | Quando | Dono | Gatilho |
|---|---|---|---|---|
| 54 | [Segurança](07-governanca/01-security.md) | Antes da entrada em serviço | Segurança | Sempre |
| 55 | [Privacidade / RGPD](07-governanca/02-privacidade-rgpd.md) | **Antes do 1.º dado pessoal** | DPO | Há dados pessoais |
| 56 | [Matriz de Riscos](07-governanca/03-matriz-riscos.md) | Ao arrancar | Gestor | Sempre |
| 57 | [Licenças e Terceiros](07-governanca/04-licencas-e-terceiros.md) | Com a 1.ª dependência | Tech Lead | Há dependências externas |
| 58 | [Contratação e Fornecedores](07-governanca/05-contratacao-e-fornecedores.md) | Antes de contratar | Gestor | Há terceiros |
| 59 | [Plano de Auditoria](07-governanca/06-plano-auditoria.md) | Antes da entrada em serviço | Segurança | Setor regulado |

## 11. Utilizador — como se usa

| # | Documento | Quando | Dono | Gatilho |
|---|---|---|---|---|
| 60 | [README do produto](08-utilizador/01-readme-produto.md) | Com o repositório | Tech Lead | Sempre |
| 61 | [Manual do Utilizador](08-utilizador/02-manual-utilizador.md) | Antes da formação | PO | Há utilizadores externos à equipa |
| 62 | [Changelog](08-utilizador/03-changelog.md) | Desde a 1.ª versão | Tech Lead | Sempre |
| 63 | [Guia de Administração](08-utilizador/04-guia-administracao.md) | Antes da entrada em serviço | PO | Alguém administra contas |
| 64 | [FAQ e Resolução de Problemas](08-utilizador/05-faq-resolucao-problemas.md) | 1.ª semana em produção | Suporte | Há suporte |
| 65 | [Plano de Formação e Adesão](08-utilizador/06-plano-formacao-adesao.md) | **−4 semanas** | PO | O sistema substitui um processo existente |

## 12. Encerramento

| # | Documento | Quando | Dono | Gatilho |
|---|---|---|---|---|
| 66 | [Relatório de Encerramento](09-encerramento/01-relatorio-encerramento.md) | No fim | Gestor | O projeto acaba |
| 67 | [Lições Aprendidas](09-encerramento/02-licoes-aprendidas.md) | **Até 2 semanas depois** | Equipa | Sempre |
| 68 | [Plano de Transição](09-encerramento/03-plano-transicao-handover.md) | Antes de a equipa sair | Tech Lead | Quem construiu não vai manter |

---

## 13. Os que não esperam pela sua vez

Sete documentos que se escrevem **antes** do que a numeração sugere, porque a
sua ausência já custou tempo a alguém:

| Documento | Escrever quando | Porquê |
|---|---|---|
| [Glossário](01-requisitos/06-glossario.md) | 1.º dia | Duas palavras para a mesma coisa custam meses |
| [Requisitos Não Funcionais](01-requisitos/03-requisitos-nao-funcionais.md) | Antes da arquitetura | São eles que a decidem |
| [Critérios de Conclusão](05-qualidade/04-definition-of-done.md) | 1.ª semana | Sem ela, "pronto" significa cinco coisas |
| [Backup e DR](06-operacao/05-backup-dr.md) | Antes dos 1.os dados reais | Depois é tarde |
| [Privacidade / RGPD](07-governanca/02-privacidade-rgpd.md) | Antes do 1.º dado pessoal | Idem |
| [Escolha de Tecnologia](03-arquitetura/07-escolha-tecnologia.md) | Antes da 1.ª linha | Depois de escrita, a decisão já foi tomada por omissão |
| [Ata de Reunião](01-gestao-projeto/05-ata-reuniao.md) | 1.ª reunião | Uma decisão não registada volta à mesa em dois meses |

---

## 14. Que subconjunto escolher

| Contexto | Documentos | Quantos |
|---|---|---|
| **Protótipo / MVP** | 1, 14, 24, 29, 37, 43, 60 | 7 |
| **App interna pequena** | + 5, 9, 12, 13, 17, 28, 30, 40, 47, 61, 63 | 18 |
| **Produto em produção** | + 3, 6, 7, 8, 16, 21, 23, 25, 26, 32, 33, 36, 41, 42, 44, 45, 46, 48, 49, 50, 53, 54, 55, 56, 57, 62, 64, 65 | 46 |
| **Setor regulado** | Tudo, com ênfase em 15, 55, 56, 59 | 68 |
| **Projeto com fim previsto** | + 66, 67, 68 | — |

**Regra prática:** escreve o documento quando a sua ausência já custou tempo a
alguém — excepto os sete do §13, que se escrevem antes de custarem.
