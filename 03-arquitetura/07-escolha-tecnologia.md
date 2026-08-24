# Escolha de Tecnologia — {{DECISÃO}}

> **Estado:** {{em avaliação | recomendação | decidido}} · **Data:** {{AAAA-MM-DD}}
> **Elabora:** {{...}} · **Decide:** {{...}}

---

## 1. Quando usar este documento em vez de um ADR

| Usa um [ADR](02-adr-template.md) | Usa este documento |
|---|---|
| A decisão é local e reversível | A decisão define a stack para anos |
| Há uma opção evidente e é preciso registar o porquê | Há 3+ candidatos sérios |
| Uma página chega | É preciso construir provas antes de decidir |
| {{"Usámos Redis para a cache"}} | {{"Em que tecnologia se escreve a aplicação do terminal"}} |

Este documento termina num ADR. O ADR é o registo; isto é o trabalho que o
sustenta.

---

## 2. A pergunta, e o que a decide

**Pergunta:** {{Em que tecnologia se constrói {{X}}?}}

**Restrições inegociáveis** — quem falhar uma destas está fora, por melhor que
seja no resto:

| # | Restrição | Origem |
|---|---|---|
| 1 | {{Funciona no aparelho {{modelo}}}} | {{Hardware já comprado}} |
| 2 | {{Funciona sem rede}} | {{RNF-07}} |
| 3 | {{Mantível por quem cá fica}} | {{Equipa de 1 pessoa}} |

**Critérios ponderados**

| # | Critério | Peso | Porquê este peso |
|---|---|---|---|
| C1 | {{Experiência de quem constrói e mantém}} | {{25%}} | {{Manutenção por quem sabe vale mais que vantagem técnica de partida}} |
| C2 | {{Existe código a funcionar}} | {{20%}} | {{...}} |
| C3 | {{Desempenho no hardware real}} | {{20%}} | {{...}} |
| C4 | {{Robustez do ecossistema}} | {{15%}} | {{...}} |
| C5 | {{Custo de licenças}} | {{10%}} | {{...}} |
| C6 | {{Alinhamento com o resto da casa}} | {{10%}} | {{...}} |

---

## 3. Candidatos

| # | Opção | Versão avaliada | Porque entrou na lista |
|---|---|---|---|
| A | {{...}} | {{...}} | {{...}} |
| B | {{...}} | {{...}} | {{...}} |
| C | {{...}} | {{...}} | {{...}} |

**Descartados sem avaliação, e porquê:** {{...}}

---

## 4. O que foi medido — e o que não

> A secção que separa uma avaliação de uma opinião. **Distinguir explicitamente
> o que foi provado do que foi lido.**

| Opção | Compilou? | Correu no aparelho? | Medições feitas | Fonte |
|---|---|---|---|---|
| A | {{Sim}} | {{Sim}} | {{arranque, leitura, lista}} | Medido |
| B | {{Sim}} | {{Não}} | — | Documentação |
| C | {{**Nunca compilou**}} | Não | Nenhuma | {{Tudo o que se diz de C é de segunda mão}} |

### Medições

| Medição | Limite aceitável | A | B | C |
|---|---|---|---|---|
| {{Arranque a frio}} | {{< 3 s}} | {{2,1 s}} | {{?}} | {{?}} |
| {{Gatilho até ecrã}} | {{< 300 ms}} | {{180 ms}} | {{?}} | {{?}} |
| {{Lista de 300 linhas}} | {{Sem tremura}} | {{✔}} | {{?}} | {{?}} |
| {{Tamanho da aplicação}} | {{< 100 MB}} | {{80 MB}} | {{16 MB}} | {{?}} |

### Falhas encontradas na avaliação

| Opção | Falha | Estrutural ou de configuração? |
|---|---|---|
| {{B}} | {{...}} | {{Estrutural — não se resolve com uma flag}} |

---

## 5. Prós e contras

### Opção A — {{nome}}

**A favor:** {{...}}
**Contra:** {{...}}
**Risco por medir:** {{...}}

_(repetir por opção)_

---

## 6. Matriz de decisão

| Critério | Peso | A | B | C |
|---|---:|---:|---:|---:|
| C1 {{Experiência}} | 25% | {{5}} | {{2}} | {{5}} |
| C2 {{Código a funcionar}} | 20% | {{5}} | {{1}} | {{1}} |
| C3 {{Desempenho}} | 20% | {{3}} | {{5}} | {{4}} |
| C4 {{Ecossistema}} | 15% | {{4}} | {{5}} | {{4}} |
| C5 {{Custo}} | 10% | {{3}} | {{5}} | {{4}} |
| C6 {{Alinhamento}} | 10% | {{3}} | {{2}} | {{3}} |
| **Total** | | **{{4,1}}** | **{{3,1}}** | **{{3,5}}** |

> A matriz **ordena**, não decide. Se o resultado contrariar o julgamento de
> quem sabe, o erro está nos pesos ou falta um critério — não se ignora o
> julgamento, corrige-se a matriz e diz-se o que se corrigiu.

---

## 7. Recomendação

**{{Opção}}.**

{{Três razões, por ordem de peso.}}

**O que fica por decidir:** {{...}}
**Plano B, e quando se aciona:** {{...}}

---

## 8. O que faria mudar esta decisão

| Se acontecer | Efeito |
|---|---|
| {{A manutenção passar para outra equipa}} | {{C1 inverte-se; reavaliar}} |
| {{Falhar uma das medições em falta}} | {{Passa ao plano B}} |
| {{Aparecer um segundo modelo de aparelho}} | {{Portabilidade sobe de peso}} |

---

## 9. Registo de decisão

| | |
|---|---|
| **Decisão** | {{...}} |
| **Data** | {{...}} |
| **Fundamento** | {{§7}} |
| **Condição** | {{medições em falta}} |
| **Rever quando** | {{...}} |
| **ADR correspondente** | {{adr/000n-....md}} |
