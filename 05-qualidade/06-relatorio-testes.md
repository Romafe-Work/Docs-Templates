# Relatório de Testes — {{PROJETO}} {{versão}}

> **Período:** {{AAAA-MM-DD}} a {{AAAA-MM-DD}} · **Versão testada:** {{x.y.z}}
> **Elabora:** {{...}} · **Destinatário:** {{PO, patrocinador}}

---

## 1. Recomendação

> A conclusão primeiro. Quem lê isto quer saber se pode ir para produção.

**{{Apto para entrar em serviço | Apto com reservas | Não apto}}**

{{Um parágrafo. Se houver reservas, dizer exactamente quais e o que as levanta.}}

| | |
|---|---|
| Defeitos de gravidade 1 em aberto | {{0}} |
| Defeitos de gravidade 2 em aberto | {{2}} — {{aceites com solução de contorno}} |
| Requisitos sem cobertura de teste | {{0}} |
| Testes de desempenho | {{Passaram}} |

---

## 2. Âmbito do que foi testado

| Testado | Não testado | Porquê |
|---|---|---|
| {{Registo de viaturas}} | {{Integração com o ERP}} | {{Ambiente indisponível}} |
| {{...}} | {{Recuperação de desastre}} | {{Exercício agendado para {{data}}}} |

**O que não foi testado é a informação mais importante deste documento**, porque
é o que pode falhar sem aviso.

---

## 3. Execução

| Tipo | Planeados | Executados | Passaram | Falharam | Bloqueados |
|---|---|---|---|---|---|
| Unitários | {{412}} | {{412}} | {{412}} | 0 | 0 |
| Integração | {{86}} | {{86}} | {{84}} | {{2}} | 0 |
| Ponta a ponta | {{24}} | {{24}} | {{23}} | {{1}} | 0 |
| Manuais / exploratórios | {{18}} | {{16}} | {{15}} | {{1}} | {{2}} |
| Aceitação (UAT) | {{12}} | {{12}} | {{11}} | {{1}} | 0 |
| **Total** | | | | | |

**Cobertura de código:** {{83%}} ({{linhas}}) · **das regras de negócio:** {{...}}

---

## 4. Defeitos

### Por gravidade

| Gravidade | Abertos | Corrigidos | Em aberto | Aceites |
|---|---|---|---|---|
| 1 — Impede o uso | {{3}} | {{3}} | 0 | 0 |
| 2 — Grave com contorno | {{7}} | {{5}} | {{2}} | {{2}} |
| 3 — Menor | {{14}} | {{9}} | {{5}} | {{5}} |
| 4 — Cosmético | {{11}} | {{2}} | {{9}} | {{9}} |

### Em aberto no fecho

| # | Gravidade | Descrição | Contorno | Decisão | Prazo |
|---|---|---|---|---|---|
| {{D-14}} | 2 | {{...}} | {{...}} | {{Aceite para esta versão}} | {{...}} |

### Onde estavam

| Área | Defeitos | Comentário |
|---|---|---|
| {{Cálculo de custos}} | {{9}} | {{Concentração — vale a pena rever o desenho}} |

> Defeitos concentrados numa área raramente são coincidência. É onde procurar
> os que ainda não foram encontrados.

---

## 5. Rastreabilidade

| Requisito | Testes | Estado |
|---|---|---|
| {{RF-01}} | {{TC-001, TC-002}} | ✔ |
| {{RF-07}} | {{TC-018}} | ✘ {{falha D-14}} |
| {{RNF-03}} | {{Carga cenário 1}} | ✔ |

**Requisitos sem teste:** {{lista — ou "nenhum"}}

---

## 6. Aceitação pelo utilizador

| Participante | Papel | Cenários | Resultado | Observações |
|---|---|---|---|---|
| {{...}} | {{Gestor}} | {{6}} | {{6/6}} | {{...}} |
| {{...}} | {{Condutor}} | {{6}} | {{5/6}} | {{...}} |

**Comentários recorrentes:** {{...}}

---

## 7. Riscos residuais

| # | Risco | Probabilidade | Impacto | Mitigação em produção |
|---|---|---|---|---|
| 1 | {{Integração com o ERP nunca testada}} | {{Média}} | {{Alto}} | {{Arranque assistido; reversão pronta}} |

---

## 8. Anexos

| Anexo | Onde |
|---|---|
| Evidências de execução | {{...}} |
| Registo completo de defeitos | {{...}} |
| Resultados de desempenho | {{05-testes-desempenho-carga.md}} |
