# Monitorização, SLOs e Observabilidade

---

## 1. Princípios

| # | Princípio |
|---|---|
| 1 | **Alertar sobre sintomas, não causas.** "Os utilizadores veem erros" acorda alguém; "o CPU está a 80%" não. |
| 2 | Todo o alerta que acorda alguém tem de ser **acionável** e ter entrada no [runbook](02-runbook.md). |
| 3 | Alertas ruidosos são um defeito: se é ignorado, ou se corrige ou se apaga. |
| 4 | SLOs definem o que é "suficientemente bom" — perfeição não é o objetivo, o orçamento de erro é. |

---

## 2. Service Level Objectives

### 2.1 SLIs e SLOs

| SLI | Definição precisa | SLO | Janela | Orçamento de erro |
|---|---|---|---|---|
| **Disponibilidade** | % de pedidos não-5xx em endpoints críticos | {{99,9%}} | 30 dias | {{43 min}} |
| **Latência** | % de pedidos servidos em < {{300 ms}} | {{99%}} | 30 dias | {{1% dos pedidos}} |
| **Correção** | % de encomendas processadas sem intervenção manual | {{99,5%}} | 30 dias | {{0,5%}} |
| **Frescura** | % de sincronizações com ERP com atraso < {{15 min}} | {{99%}} | 30 dias | |

**Endpoints críticos (perímetro do SLO):** `POST /encomendas` · `GET /encomendas` · `POST /auth/token`
**Fora do perímetro:** {{relatórios, exportações}}

### 2.2 Política de orçamento de erro

| Orçamento consumido | Ação |
|---|---|
| < 50% | Ritmo normal de entrega |
| 50–75% | Rever alterações de risco com mais cuidado |
| 75–100% | Congelar funcionalidades novas; prioridade a fiabilidade |
| > 100% | **Só correções de fiabilidade** até recuperar |

### 2.3 Alertas de consumo (burn rate)

| Velocidade | Consome o orçamento em | Janela de deteção | Gravidade |
|---|---|---|---|
| 14,4× | {{2 dias}} | 1 h | **Página (acorda)** |
| 6× | {{5 dias}} | 6 h | **Página** |
| 3× | {{10 dias}} | 24 h | Ticket |
| 1× | {{30 dias}} | 72 h | Ticket |

---

## 3. Os quatro sinais de ouro

| Sinal | Métrica | Alerta |
|---|---|---|
| **Latência** | `http_request_duration_seconds` (histograma, por rota e código) | p95 > {{1 s}} durante 10 min |
| **Tráfego** | `http_requests_total` (por rota, método, código) | Queda > {{50%}} face à semana anterior |
| **Erros** | `http_requests_total{status=~"5.."}` | Taxa > {{0,5%}} durante 5 min |
| **Saturação** | CPU, memória, ligações à BD, profundidade de fila | Pool de ligações > {{80%}} |

---

## 4. Métricas de negócio

> Frequentemente detetam problemas que as métricas técnicas não veem: tudo responde 200, mas ninguém consegue concluir uma compra.

| Métrica | Normal | Alerta |
|---|---|---|
| Encomendas criadas/hora | {{40–120}} (padrão diário) | Desvio > {{50%}} do esperado para a hora |
| Taxa de conclusão do fluxo | {{> 85%}} | < {{70%}} durante 30 min |
| Autenticações falhadas / total | {{< 5%}} | > {{20%}} (possível problema no IdP ou ataque) |
| Encomendas em aprovação pendente | {{< 20}} | > {{100}} |
| Tempo médio de sincronização com ERP | {{< 2 min}} | > {{15 min}} |

---

## 5. Logs

| Aspeto | Decisão |
|---|---|
| Formato | JSON estruturado, uma linha por evento |
| Campos obrigatórios | `ts` (ISO 8601 UTC), `nivel`, `mensagem`, `trace_id`, `servico`, `versao` |
| Correlação | `trace_id` propagado por todas as chamadas (W3C Trace Context) |
| Retenção | {{Quentes 30 dias · frios 1 ano · auditoria {{7 anos}}}} |
| Amostragem | {{`debug` amostrado a 1% em produção; `error` sempre completo}} |
| **Nunca registar** | Palavras-passe, tokens, cartões, dados pessoais em claro, payloads completos de clientes |

---

## 6. Tracing distribuído

| Aspeto | Decisão |
|---|---|
| Norma | OpenTelemetry |
| Amostragem | {{100% de escritas e erros; 5% de leituras}} |
| Retenção | {{7 dias}} |
| Atributos obrigatórios | `tenant_id`, `user_id` (pseudonimizado), `route`, `db.statement` (sanitizado) |

---

## 7. Painéis

### 7.1 Painel de serviço (uso diário)
1. SLO e orçamento de erro restante
2. Os quatro sinais de ouro
3. Métricas de negócio principais
4. Estado das dependências externas
5. Deploys recentes (marcadores sobre os gráficos)

### 7.2 Painel de incidente (durante um P1)
1. Taxa de erro por endpoint (últimos 60 min)
2. Latência por endpoint
3. Erros por causa (agrupados)
4. Saúde das dependências
5. Últimos 5 deploys e alterações de configuração

### 7.3 Painel de negócio (para o PO)
{{Encomendas, receita, utilizadores ativos, funil de conversão}}

---

## 8. Catálogo de alertas

| Alerta | Condição | Gravidade | Destino | Runbook |
|---|---|---|---|---|
| `SLO_BURN_RAPIDO` | Burn rate 14,4× em 1 h | P1 | Página | [→](02-runbook.md#5-alertas--o-que-fazer) |
| `ALTA_TAXA_ERRO_5XX` | > 2% durante 5 min | P1 | Página | [→](02-runbook.md#alta_taxa_erro_5xx) |
| `LATENCIA_ALTA` | p95 > 1 s durante 10 min | P2 | Página | [→](02-runbook.md#latencia_alta) |
| `FILA_ACUMULADA` | > 1000 pendentes 15 min | P2 | Página | [→](02-runbook.md#fila_acumulada) |
| `TRAFEGO_ANORMAL` | Queda > 50% vs semana anterior | P2 | Página | {{...}} |
| `ESPACO_DISCO_BAIXO` | < 15% livre | P3 | Ticket | [→](02-runbook.md#espaco_disco_baixo) |
| `CERTIFICADO_A_EXPIRAR` | < 21 dias | P3 | Ticket | [→](02-runbook.md#certificado_a_expirar) |
| `DEPENDENCIA_EM_BAIXO` | Circuit breaker aberto > 5 min | P2 | Página | {{...}} |
| `BACKUP_FALHOU` | Sem backup bem-sucedido em 26 h | P2 | Página | [→](05-backup-dr.md) |

**Revisão mensal de alertas**
| Alerta | Disparos | Acionáveis | Falsos positivos | Decisão |
|---|---|---|---|---|
| {{...}} | {{12}} | {{2}} | {{10}} | {{Ajustar limiar / remover}} |

---

## 9. On-call

| Aspeto | Regra |
|---|---|
| Rotação | {{Semanal, {{n}} pessoas}} |
| Horário | {{24/7 para P1; horário laboral para P2}} |
| Tempo de reconhecimento | {{≤ 5 min para P1}} |
| Passagem de turno | {{Reunião de 15 min: incidentes abertos, alertas ruidosos, alterações planeadas}} |
| Compensação | {{...}} |
| Carga aceitável | {{≤ 2 interrupções fora de horas por turno; acima disso é problema de fiabilidade a corrigir}} |
