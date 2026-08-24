# Visão de Produto — {{NOME_DO_PRODUTO}}

| Campo | Valor |
|---|---|
| Versão do documento | 0.1 |
| Autor | {{NOME}} |
| Data | {{AAAA-MM-DD}} |
| Estado | Rascunho / Em revisão / Aprovado |
| Aprovado por | {{NOME}} |

---

## 1. Elevator pitch

> Para **{{público-alvo}}**
> que **{{necessidade/problema}}**,
> o **{{nome do produto}}**
> é um **{{categoria de produto}}**
> que **{{benefício-chave}}**.
> Ao contrário de **{{alternativa principal}}**,
> o nosso produto **{{diferenciador}}**.

## 2. Problema

### 2.1 Descrição
{{Qual é o problema real? Quem sofre com ele? Com que frequência?}}

### 2.2 Evidência
| Fonte | Evidência | Data |
|---|---|---|
| Entrevista com {{X}} | "{{citação}}" | {{data}} |
| Dados de suporte | {{n.º de tickets/mês sobre o tema}} | {{data}} |

### 2.3 Como é resolvido hoje (workarounds)
{{Excel, e-mail, processo manual, concorrente Y...}}

## 3. Solução proposta
{{Descrição em 1-2 parágrafos, sem entrar em implementação.}}

## 4. Objetivos e métricas de sucesso

| # | Objetivo | Métrica (KPI) | Baseline | Meta | Prazo |
|---|---|---|---|---|---|
| O1 | {{Reduzir tempo de X}} | {{minutos por operação}} | {{15 min}} | {{3 min}} | {{Q3}} |
| O2 | | | | | |

**Anti-metas** (o que *não* queremos otimizar): {{ex.: nº de cliques à custa de erros}}

## 5. Âmbito

### 5.1 Dentro do âmbito (In scope)
- {{...}}

### 5.2 Fora do âmbito (Out of scope)
- {{...}} — *razão:* {{...}}

### 5.3 Diferido para depois
- {{...}} — *reavaliar em:* {{data}}

## 6. Stakeholders

| Nome | Papel | Interesse | Influência (A/M/B) | Envolvimento |
|---|---|---|---|---|
| {{Nome}} | Sponsor | {{...}} | Alta | Aprova âmbito e orçamento |
| {{Nome}} | Product Owner | {{...}} | Alta | Prioriza backlog |
| {{Nome}} | Utilizador final | {{...}} | Média | Valida protótipos |

## 7. Pressupostos, restrições e dependências

| Tipo | Descrição | Impacto se falhar | Responsável |
|---|---|---|---|
| Pressuposto | {{Assumimos que o ERP expõe API REST}} | Alto — redesenho da integração | {{Nome}} |
| Restrição | {{Orçamento máximo de X}} | — | {{Nome}} |
| Dependência | {{Equipa de Identidade entrega SSO até {{data}}}} | Bloqueia entrega | {{Nome}} |

## 8. Riscos principais
> Detalhe completo em [Matriz de Riscos](../07-governanca/03-matriz-riscos.md)

| # | Risco | Prob. | Impacto | Mitigação |
|---|---|---|---|---|
| R1 | {{...}} | M | A | {{...}} |

## 9. Concorrência / alternativas

| Alternativa | Pontos fortes | Pontos fracos | Como nos diferenciamos |
|---|---|---|---|
| {{Concorrente A}} | | | |
| Não fazer nada | | | |

## 10. Histórico de revisões

| Versão | Data | Autor | Alterações |
|---|---|---|---|
| 0.1 | {{data}} | {{nome}} | Versão inicial |
