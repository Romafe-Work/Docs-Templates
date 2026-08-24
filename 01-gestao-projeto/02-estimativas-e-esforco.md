# Estimativas e Esforço — {{PROJETO}}

> **Data:** {{AAAA-MM-DD}} · **Dono:** {{nome}}
> **Confiança global:** {{baixa | média | alta}}

---

## 1. A regra antes de qualquer número

Uma estimativa **não é um compromisso**. É uma previsão com incerteza, e a
incerteza faz parte do valor. Um número único apresentado sem intervalo será
lido como promessa por quem o receber — e a partir daí a conversa deixa de ser
sobre engenharia.

**Escreve sempre três números, nunca um.**

---

## 2. Técnica usada

| Técnica | Quando serve | Usada aqui |
|---|---|---|
| **Três pontos (PERT)** | Há incerteza mensurável e experiência anterior | {{sim/não}} |
| **Comparação por analogia** | Existe trabalho semelhante já feito e medido | {{sim/não}} |
| **Decomposição** | O trabalho é grande e divisível em partes conhecidas | {{sim/não}} |
| **Planning poker** | Equipa estável, trabalho em stories | {{sim/não}} |
| **Spike com prazo fixo** | A incerteza é técnica e não se resolve a pensar | {{sim/não}} |

**Fórmula PERT:** `E = (O + 4M + P) / 6` · **Desvio:** `σ = (P − O) / 6`

---

## 3. Estimativa por pacote de trabalho

| ID | Pacote | Otimista | Provável | Pessimista | **PERT** | σ | Confiança |
|---|---|---|---|---|---|---|---|
| 1.1 | {{Levantamento}} | {{10 d}} | {{15 d}} | {{25 d}} | {{15,8 d}} | {{2,5}} | Média |
| 2.1 | {{Módulo A}} | {{20 d}} | {{30 d}} | {{55 d}} | {{32,5 d}} | {{5,8}} | Baixa |
| | **Total** | | | | **{{...}}** | **{{√Σσ²}}** | |

**Intervalo a comunicar:** {{Total PERT ± 2σ}} → entre {{X}} e {{Y}} dias, com
~95% de confiança.

---

## 4. O que a estimativa inclui — e o que não

| Incluído | Excluído (e tem de ser somado à parte) |
|---|---|
| Programação e testes automáticos | Férias, feriados, baixas |
| Revisão de código | Reuniões que não sejam do projeto |
| Correção de defeitos encontrados na revisão | Formação em tecnologia nova |
| Documentação técnica do que se constrói | Apoio a produção de outros sistemas |

**Capacidade real:** um dia de calendário **não** é um dia de trabalho.
Use-se {{5,5}} horas produtivas por dia e {{80%}} de disponibilidade.

| Pessoa | Dias de calendário | Disponibilidade | Dias úteis reais |
|---|---|---|---|
| {{...}} | {{60}} | {{80%}} | {{48}} |

---

## 5. Fatores que alteram a estimativa

| Fator | Efeito | Presente aqui? |
|---|---|---|
| Tecnologia nova para a equipa | +{{30–50%}} no primeiro incremento | {{sim/não}} |
| Dependência de terceiros para responder | +{{tempo de espera}}, não paralelizável | {{sim/não}} |
| Requisitos por fechar | Estimativa não é possível; fazer spike | {{sim/não}} |
| Base de dados legada sem documentação | +{{...}} | {{sim/não}} |
| Migração de dados reais | Quase sempre subestimada por 2× | {{sim/não}} |

---

## 6. Spikes — quando não se sabe o suficiente para estimar

| # | Pergunta a responder | Prazo fixo | Resultado esperado | Estado |
|---|---|---|---|---|
| S1 | {{O leitor do PDA funciona por wedge?}} | {{2 dias}} | {{sim/não + como}} | {{...}} |

Um spike tem **prazo fixo e resultado escrito**. Acabado o prazo, escreve-se o
que se aprendeu mesmo que a resposta seja "ainda não sabemos" — e essa é uma
resposta válida que muda o plano.

---

## 7. Registo de desvios

Preenchido **durante** o projeto. É o que torna a próxima estimativa melhor.

| Pacote | Estimado | Real | Desvio | Causa |
|---|---|---|---|---|
| {{1.1}} | {{15 d}} | {{22 d}} | {{+47%}} | {{Dados-mestre por limpar}} |

**Fator de correção observado:** {{real/estimado médio}} — aplicar às
estimativas seguintes deste projeto.
