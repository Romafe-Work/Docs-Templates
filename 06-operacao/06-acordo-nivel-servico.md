# Acordo de Nível de Serviço (SLA) — {{PROJETO}}

> **Vigência:** {{AAAA-MM-DD}} a {{AAAA-MM-DD}} · **Partes:** {{fornecedor}} e {{cliente/área}}
> **Revisão:** {{anual}}

---

## 1. SLA, SLO e SLI — não são a mesma coisa

| Termo | O que é | Para quem | Onde vive |
|---|---|---|---|
| **SLI** | O que se mede | Engenharia | [Monitorização](04-monitorizacao.md) |
| **SLO** | O objetivo interno, mais exigente | Engenharia | [Monitorização](04-monitorizacao.md) |
| **SLA** | O compromisso com quem usa, com consequência | Cliente | **Este documento** |

**O SLO é sempre mais apertado que o SLA.** Se forem iguais, qualquer falha
técnica é imediatamente um incumprimento contratual e não há margem para
reagir antes disso.

---

## 2. Serviço abrangido

| Serviço | Descrição | Abrangido |
|---|---|---|
| {{Aplicação web}} | {{...}} | Sim |
| {{API}} | {{...}} | Sim |
| {{Relatórios mensais}} | {{...}} | {{Não — melhor esforço}} |

**Utilizadores abrangidos:** {{...}} · **Horário de serviço:** {{dias úteis 08:00–19:00}}

---

## 3. Compromissos

| # | Compromisso | Valor | Como se mede | Período |
|---|---|---|---|---|
| S1 | Disponibilidade | {{99,5%}} | {{Pedidos com sucesso / total, em horário de serviço}} | Mensal |
| S2 | Tempo de resposta | {{p95 < 2 s}} | {{Do lado do servidor}} | Mensal |
| S3 | Primeira resposta a incidente G1 | {{30 min}} | {{Do registo à resposta}} | Por ocorrência |
| S4 | Resolução de incidente G1 | {{4 h}} | {{...}} | Por ocorrência |
| S5 | Perda máxima de dados (RPO) | {{1 h}} | {{[Backup e DR](05-backup-dr.md)}} | — |
| S6 | Tempo de reposição (RTO) | {{4 h}} | {{...}} | — |

**Tradução de 99,5%:** {{~3,6 h}} de indisponibilidade por mês. Escrever a
tradução ao lado da percentagem — quase ninguém a faz de cabeça, e é aí que as
expectativas se desalinham.

| Disponibilidade | Indisponibilidade/mês | Indisponibilidade/ano |
|---|---|---|
| 99% | 7,2 h | 3,65 d |
| 99,5% | 3,6 h | 1,83 d |
| 99,9% | 43 min | 8,8 h |
| 99,99% | 4,3 min | 53 min |

---

## 4. Gravidades e tempos

| Gravidade | Definição | Exemplo | 1.ª resposta | Resolução | Como se comunica |
|---|---|---|---|---|---|
| **G1 — Crítico** | Serviço parado ou dados em risco | {{Ninguém entra}} | {{30 min}} | {{4 h}} | {{Telefone + e-mail}} |
| **G2 — Alto** | Funcionalidade principal indisponível, com contorno | {{...}} | {{2 h}} | {{1 dia útil}} | {{E-mail}} |
| **G3 — Médio** | Funcionalidade secundária afetada | {{...}} | {{1 dia útil}} | {{5 dias úteis}} | {{Sistema de tickets}} |
| **G4 — Baixo** | Cosmético ou pedido de melhoria | {{...}} | {{3 dias úteis}} | {{Planeado}} |

**Quem classifica a gravidade:** {{...}}. Em desacordo, prevalece {{a
classificação mais alta até haver acordo}}.

---

## 5. O que não conta como indisponibilidade

| Exclusão | Condição |
|---|---|
| Manutenção programada | Avisada com {{5 dias úteis}}; fora do horário de serviço; máx. {{4 h/mês}} |
| Falha de infraestrutura do cliente | {{Rede interna, postos de trabalho}} |
| Uso fora do previsto | {{Volume acima de {{X}}, integração não acordada}} |
| Força maior | {{...}} |
| Indisponibilidade de terceiros | {{Só as listadas em §7}} |

**Sem esta secção o SLA não é cumprível**, porque passa a cobrir coisas que não
estão sob controlo de quem o assina.

---

## 6. Incumprimento

| Nível | Consequência |
|---|---|
| 1.º mês abaixo | {{Relatório de causa raiz em 5 dias úteis}} |
| 2.º mês consecutivo | {{Plano de correção com datas}} |
| 3.º mês consecutivo | {{{{revisão do acordo / penalização / escalada}}}} |

---

## 7. Dependências de terceiros

O serviço não pode ser mais fiável do que aquilo de que depende.

| Terceiro | Serviço | SLA deles | Efeito se falhar |
|---|---|---|---|
| {{Alojamento}} | {{...}} | {{99,9%}} | {{Serviço parado}} |
| {{Autenticação}} | {{...}} | {{...}} | {{Ninguém entra}} |

**Disponibilidade máxima teórica:** produto dos SLA das dependências em série.
{{99,9% × 99,9% = 99,8%}} — prometer mais do que isto é prometer o que não se controla.

---

## 8. Relatório

| Item | Frequência | Para quem |
|---|---|---|
| Disponibilidade e tempos | Mensal | {{...}} |
| Incidentes G1/G2 com causa raiz | Por ocorrência | {{...}} |
| Revisão do acordo | Anual | {{...}} |
