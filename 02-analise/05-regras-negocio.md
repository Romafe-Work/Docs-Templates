# Regras de Negócio — {{PROJETO}}

> Uma regra de negócio existe **independentemente do software**. "O desconto máximo é 20%" é regra de negócio; "o campo desconto é um input numérico" é requisito de interface.

**Versão:** {{0.1}} · **Dono do catálogo:** {{Nome}} · **Última revisão:** {{data}}

---

## Tipos de regra

| Tipo | Descrição | Exemplo |
|---|---|---|
| **Facto / termo** | Define um conceito | Uma encomenda tem sempre um cliente |
| **Restrição** | Limita estados ou ações | Não se cancela uma encomenda expedida |
| **Derivação / cálculo** | Deriva um valor | Total = Σ(subtotais) + IVA − desconto |
| **Inferência** | Conclui um facto | Cliente com 3 faturas vencidas é "Cliente em risco" |
| **Acionamento (ECA)** | Quando X, faz Y | Quando o stock desce de 10, notificar compras |
| **Autorização** | Quem pode o quê | Só o gestor aprova acima de 5000 € |

---

## Catálogo

### RN-01 — {{Bloqueio por tentativas de autenticação}}

| Campo | Valor |
|---|---|
| **Tipo** | Restrição |
| **Categoria** | Segurança |
| **Estado** | Ativa |
| **Origem** | {{Política de Segurança da Informação v3, §4.2}} |
| **Dono** | {{Responsável de Segurança}} |
| **Em vigor desde** | {{AAAA-MM-DD}} |
| **Requisitos** | RF-01, RNF-13 |
| **Casos de uso** | UC-01 (E2) |

**Enunciado**
> Uma conta DEVE ser bloqueada durante **15 minutos** após **5 tentativas de autenticação falhadas** no espaço de **15 minutos**.

**Parâmetros configuráveis**
| Parâmetro | Valor atual | Intervalo permitido | Quem altera |
|---|---|---|---|
| `max_tentativas` | 5 | 3–10 | Responsável de Segurança |
| `janela_minutos` | 15 | 5–60 | Responsável de Segurança |
| `bloqueio_minutos` | 15 | 5–1440 | Responsável de Segurança |

**Exceções**
| Exceção | Condição | Autorizada por |
|---|---|---|
| {{Contas de serviço}} | {{Usam chave de API, não palavra-passe}} | {{Arquiteto}} |

**Como se verifica:** TC-003
**Notas:** {{o contador é por conta, não por IP; um atacante distribuído exige controlo adicional (RNF-16)}}

---

### RN-02 — {{Limite de aprovação por valor}}

| Campo | Valor |
|---|---|
| **Tipo** | Autorização |
| **Categoria** | Financeira |
| **Estado** | Ativa |
| **Origem** | {{Delegação de competências, Ata da Direção {{data}}}} |
| **Dono** | {{Direção Financeira}} |

**Enunciado**
> Uma encomenda de valor **superior a 5 000 €** (sem IVA) DEVE ser aprovada por um utilizador com o papel **Gestor** ou superior antes de passar ao estado *Aprovada*.

**Tabela de decisão**

| Valor (€) | Cliente em risco? | Papel necessário | Prazo de aprovação |
|---|---|---|---|
| ≤ 1 000 | Não | Automática | — |
| ≤ 1 000 | Sim | Gestor | 48 h |
| 1 001 – 5 000 | Não | Automática | — |
| 1 001 – 5 000 | Sim | Gestor | 48 h |
| 5 001 – 25 000 | Qualquer | Gestor | 48 h |
| > 25 000 | Qualquer | Diretor | 72 h |

**Comportamento no fim do prazo:** a encomenda transita para *Rejeitada* e o cliente é notificado (ver [Diagrama de estados](03-fluxos-processo.md#4-diagrama-de-estados--ciclo-de-vida-de-uma-entidade)).

---

### RN-03 — {{Cálculo do total da encomenda}}

| Campo | Valor |
|---|---|
| **Tipo** | Derivação |
| **Categoria** | Financeira |
| **Estado** | Ativa |

**Enunciado**
> `subtotal_linha = quantidade × preço_unitário`
> `subtotal = Σ subtotal_linha`
> `desconto = subtotal × taxa_desconto` *(taxa_desconto conforme RN-04)*
> `base_tributável = subtotal − desconto`
> `iva = base_tributável × taxa_iva` *(taxa conforme país de entrega)*
> `total = base_tributável + iva + portes`

**Regras de arredondamento**
- Arredondar a **2 casas decimais**, meio para cima (`HALF_UP`), **no fim de cada operação monetária**.
- Nunca usar vírgula flutuante binária para dinheiro — usar decimal de precisão fixa ou inteiros em cêntimos.

**Exemplos verificáveis**
| Linhas | Desconto | IVA | Portes | Total esperado |
|---|---|---|---|---|
| 3 × 10,00 | 0% | 23% | 5,00 | 41,90 |
| 2 × 33,33 | 10% | 23% | 0,00 | 73,80 |

---

### RN-04 — {{...}}

---

## Regras revogadas

| ID | Enunciado | Revogada em | Substituída por | Motivo |
|---|---|---|---|---|
| RN-99 | {{Desconto fixo de 5% para todos}} | {{data}} | RN-04 | {{Nova política comercial}} |

---

## Matriz Regra × Componente

| Regra | Onde é aplicada | Duplicada? | Risco |
|---|---|---|---|
| RN-02 | `orders-service/approval.ts` | Não | — |
| RN-03 | `orders-service/pricing.ts` **e** `web/cart.ts` | **Sim** | {{Divergência de arredondamento — DT-04}} |

> **Princípio:** cada regra deve ter **um único ponto de verdade**. Duplicação em cliente para UX é aceitável desde que o servidor seja a autoridade e o teste garanta a paridade.
