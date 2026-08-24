# Matriz de Rastreabilidade de Requisitos (RTM)

**Projeto:** {{...}} · **Versão:** {{0.1}} · **Data:** {{AAAA-MM-DD}}

> Serve para responder a três perguntas: *(1)* este requisito veio de onde? *(2)* está implementado e testado? *(3)* se eu mudar isto, o que parte?

---

## 1. Matriz principal (origem → verificação)

| Req. | Descrição resumida | Origem | Prio | User Story | Caso de Uso | Regra de Negócio | Componente | Casos de Teste | Estado | Verificado em |
|---|---|---|---|---|---|---|---|---|---|---|
| RF-01 | {{Autenticação}} | {{Entrevista {{Nome}} {{data}}}} | Must | US-01 | UC-01 | RN-01 | `auth-service` | TC-001, TC-002, TC-003 | Verificado | {{v1.0}} |
| RF-02 | {{Recuperar palavra-passe}} | {{Regulamento interno}} | Must | US-02 | UC-02 | RN-01 | `auth-service` | TC-004 | Em dev | — |
| RNF-01 | {{p95 ≤ 300 ms}} | {{SLA cliente X}} | Must | — | — | — | `api-gateway` | TC-P01 | Aprovado | — |

**Legenda de estado:** Proposto · Aprovado · Em dev · Implementado · Verificado · Removido

---

## 2. Cobertura — indicadores

| Indicador | Valor | Meta |
|---|---|---|
| Requisitos com pelo menos um caso de teste | {{18/20 = 90%}} | 100% |
| Requisitos sem user story associada (órfãos) | {{2}} | 0 |
| Testes sem requisito associado (testes órfãos) | {{1}} | 0 |
| Requisitos Must verificados | {{12/14}} | 100% |

### Requisitos sem cobertura de teste
| Req. | Motivo | Ação |
|---|---|---|
| {{RNF-09}} | {{Só testável em DR drill}} | {{Agendar exercício {{data}}}} |

---

## 3. Matriz inversa (o que é que este teste cobre?)

| Caso de teste | Requisitos cobertos | Tipo | Automatizado |
|---|---|---|---|
| TC-001 | RF-01 | Funcional | Sim |
| TC-P01 | RNF-01, RNF-04 | Carga | Sim |

---

## 4. Análise de impacto (para alterações)

> Preencher sempre que se propõe alterar ou remover um requisito.

### Alteração proposta: {{descrição}}
| | |
|---|---|
| Requisito afetado | {{RF-07}} |
| Solicitante | {{Nome}} |
| Data | {{data}} |

**Impacto a jusante**
| Artefacto | Referência | Alteração necessária | Esforço |
|---|---|---|---|
| User story | US-05 | Reescrever critérios 2 e 3 | S |
| Caso de uso | UC-03 | Novo fluxo alternativo | S |
| Componente | `orders-api` | Novo campo + migração | M |
| Testes | TC-012…TC-015 | Atualizar | S |
| Documentação | Manual §4.2 | Atualizar capturas | S |

**Requisitos dependentes que podem quebrar:** {{RF-09 (assume o formato antigo)}}
**Decisão:** {{Aprovado / Rejeitado}} — {{quem}} — {{data}}
