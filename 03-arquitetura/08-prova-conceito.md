# Prova de Conceito — {{ASSUNTO}}

> **Estado:** {{a decorrer | concluída}} · **Prazo fixo:** {{N dias}}
> **Início:** {{AAAA-MM-DD}} · **Fim:** {{AAAA-MM-DD}} · **Quem faz:** {{...}}

---

## 1. A pergunta

**Queremos saber se:** {{afirmação verificável, que pode dar verdadeira ou falsa}}

| Bom | Mau |
|---|---|
| {{"O leitor do PDA entrega o código como texto de teclado, sem SDK"}} | {{"Explorar o PDA"}} |
| {{"O Postgres aguenta 500 escritas/s neste hardware"}} | {{"Testar desempenho"}} |

**Porque importa:** {{que decisão fica bloqueada até isto ser respondido}}

---

## 2. Prazo fixo — e o que acontece quando acabar

**Esforço máximo:** {{N dias}}. Terminado o prazo, escreve-se o que se aprendeu
**mesmo que a resposta seja "continua sem se saber"** — e isso é um resultado
que muda o plano, não um fracasso.

| Se a resposta for | Então |
|---|---|
| Sim | {{avança-se com {{X}}}} |
| Não | {{avança-se com {{Y}}}} |
| Inconclusivo | {{{{decisão de escalada: mais tempo, ou decidir sem saber e assumir o risco}}}} |

---

## 3. Critérios de sucesso — definidos **antes** de começar

| # | Critério | Como se mede | Limite |
|---|---|---|---|
| 1 | {{...}} | {{...}} | {{...}} |

> Definir isto depois de ver os resultados é como apontar a alvo já disparado.

---

## 4. Âmbito

| Faz parte | Não faz parte |
|---|---|
| {{O caminho mínimo que responde à pergunta}} | {{Tratamento de erros}} |
| | {{Autenticação, testes, aspeto}} |
| | {{Qualquer coisa que se pareça com produção}} |

**Este código vai ser deitado fora.** Se não for, deixou de ser uma prova de
conceito e passou a ser a primeira versão — que é uma decisão diferente e tem
de ser tomada de olhos abertos.

---

## 5. Montagem

| Item | Valor |
|---|---|
| Hardware | {{...}} |
| Versões | {{...}} |
| Dados | {{...}} |
| Onde está o código | {{ramo/repositório — marcado como descartável}} |

---

## 6. Registo do que aconteceu

| Dia | O que se tentou | Resultado |
|---|---|---|
| 1 | {{...}} | {{...}} |

**Obstáculos encontrados**

| # | Obstáculo | Resolvido? | Como / porque não |
|---|---|---|---|
| 1 | {{...}} | {{...}} | {{...}} |

---

## 7. Resultados

| # | Critério | Alcançado | Medição | Notas |
|---|---|---|---|---|
| 1 | {{...}} | {{✔ / ✘}} | {{...}} | {{...}} |

---

## 8. Conclusão

**Resposta à pergunta:** {{Sim / Não / Inconclusivo}}

**Confiança:** {{alta | média | baixa}} — {{porquê}}

**O que continua por saber:** {{...}}

**Recomendação:** {{...}}

**Onde isto entra:** {{ADR / Escolha de Tecnologia / Plano de Projeto}}
