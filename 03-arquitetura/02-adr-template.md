# ADR-{{NNN}} — {{Título da decisão em forma de afirmação}}

> **Como usar:** copiar para `adr/NNN-titulo-curto.md`. Numeração sequencial, nunca reutilizada. Um ADR é **imutável** depois de aceite — para mudar, cria-se um novo que o substitui (`Substitui ADR-XXX`).

| Campo | Valor |
|---|---|
| **Estado** | Proposto \| Aceite \| Rejeitado \| Substituído por ADR-{{NNN}} \| Descontinuado |
| **Data** | {{AAAA-MM-DD}} |
| **Decisores** | {{Nomes}} |
| **Consultados** | {{Nomes}} |
| **Informados** | {{Nomes/equipas}} |
| **Substitui** | {{ADR-XXX ou —}} |
| **Relacionado com** | {{ADR-YYY, RNF-01, RF-07}} |

---

## Contexto e problema

{{Qual é a força que nos obriga a decidir? Descreve os factos, não a solução. Inclui restrições reais (prazo, competências, contrato) — são parte legítima do contexto e explicam decisões que de outro modo parecem irracionais no futuro.}}

**Pergunta a decidir:** {{Formulada como pergunta: "Como devemos armazenar X, dado que Y?"}}

**Critérios de decisão**
| # | Critério | Peso | Porquê |
|---|---|---|---|
| C1 | {{Latência de leitura}} | Alto | {{RNF-01}} |
| C2 | {{Competências da equipa}} | Alto | {{Equipa de 5, sem experiência em {{X}}}} |
| C3 | {{Custo operacional}} | Médio | {{RNF-46}} |
| C4 | {{Maturidade e comunidade}} | Médio | |

---

## Opções consideradas

### Opção A — {{...}}
{{Descrição em 2-3 linhas}}

| Prós | Contras |
|---|---|
| {{...}} | {{...}} |

**Custo estimado:** {{...}} · **Esforço de adoção:** {{...}} · **Reversibilidade:** {{Fácil/Difícil}}

### Opção B — {{...}}
{{...}}

### Opção C — Não fazer nada / manter o atual
{{Sempre incluir. Qual é o custo de não decidir?}}

### Comparação
| Critério | Peso | Opção A | Opção B | Opção C |
|---|---|---|---|---|
| C1 {{Latência}} | 3 | 3 (9) | 2 (6) | 1 (3) |
| C2 {{Competências}} | 3 | 2 (6) | 3 (9) | 3 (9) |
| C3 {{Custo}} | 2 | 2 (4) | 3 (6) | 3 (6) |
| **Total** | | **19** | **21** | **18** |

> A tabela informa, não decide. Se a decisão contraria a pontuação, explica porquê.

---

## Decisão

**Escolhemos a Opção {{B}} — {{nome}}.**

{{Justificação em 3-5 linhas. Explicita o trade-off aceite: "Aceitamos {{pior latência}} em troca de {{menor risco de execução}}, porque {{...}}".}}

---

## Consequências

### Positivas
- {{...}}

### Negativas (aceites conscientemente)
- {{...}} — *mitigação:* {{...}}

### Neutras / a acompanhar
- {{...}}

### Impacto em atributos de qualidade
| Atributo | Impacto | Nota |
|---|---|---|
| Desempenho | ↓ ligeiro | {{+20 ms p95, dentro do orçamento}} |
| Manutenibilidade | ↑ | {{Equipa já domina}} |
| Custo | ↔ | |

---

## Condições de revisão

> Uma decisão sem gatilho de revisão torna-se dogma.

Revisitar este ADR se:
- {{O volume ultrapassar {{N}} registos/dia}}
- {{A latência p95 exceder {{X}} ms de forma sustentada}}
- {{Passarem {{12}} meses}}

**Próxima revisão agendada:** {{data}}

---

## Notas de implementação
- {{Passos necessários, migração, feature flag, ordem de rollout}}

## Referências
- {{Links, benchmarks, provas de conceito, discussões}}
