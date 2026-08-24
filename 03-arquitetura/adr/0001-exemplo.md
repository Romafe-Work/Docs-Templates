# ADR-0001 — Usar monólito modular em vez de microsserviços

| Campo | Valor |
|---|---|
| **Estado** | Aceite |
| **Data** | {{AAAA-MM-DD}} |
| **Decisores** | {{Nomes}} |

## Contexto e problema
A equipa tem {{5}} pessoas e prazo de {{6}} meses para GA. Existe pressão interna para adotar microsserviços "porque escala". O sistema tem três domínios identificados (Vendas, Inventário, Faturação) com fronteiras razoavelmente claras, mas ainda pouco validadas pela prática.

**Pergunta:** que granularidade de implantação adotar na v1?

**Critérios:** velocidade de entrega (alto) · competências da equipa (alto) · custo operacional (médio) · capacidade de evoluir para serviços separados (alto).

## Opções consideradas
### A — Microsserviços desde o início
| Prós | Contras |
|---|---|
| Escala independente | Complexidade operacional elevada para 5 pessoas |
| Fronteiras forçadas | Fronteiras ainda não validadas — risco de dividir mal |
| | Transações distribuídas desde o dia 1 |

### B — Monólito modular (módulos com fronteiras explícitas, uma implantação)
| Prós | Contras |
|---|---|
| Uma implantação, uma transação, depuração simples | Escala apenas em conjunto |
| Fronteiras podem ser corrigidas sem custo de rede | Requer disciplina para não erodir os módulos |
| Caminho de extração posterior mantido aberto | |

### C — Monólito sem modularização
Descartada: hipoteca a evolução sem ganho relevante.

## Decisão
**Opção B — monólito modular.** Cada contexto delimitado é um módulo com API interna explícita; comunicação entre módulos apenas por essas interfaces e por eventos de domínio, nunca por acesso direto a tabelas alheias. Aceitamos escalar em bloco em troca de velocidade de entrega e de fronteiras corrigíveis.

## Consequências
**Positivas:** entrega mais rápida; sem infraestrutura de service mesh; transações locais garantem as invariantes de encomenda.
**Negativas:** um módulo com carga anómala obriga a escalar tudo — *mitigação:* módulos sem estado, escalonamento horizontal barato. Risco de erosão das fronteiras — *mitigação:* teste de arquitetura no CI que falha se um módulo importar internals de outro.

## Condições de revisão
Revisitar se: um módulo passar a exigir perfil de recursos muito distinto; a equipa ultrapassar {{15}} pessoas; o tempo de build exceder {{10}} min.
