# Integrações com Sistemas Externos

**Última revisão:** {{AAAA-MM-DD}}

---

## 1. Inventário de integrações

| # | Sistema | Direção | Protocolo | Criticidade | Dono interno | Dono externo | Contrato |
|---|---|---|---|---|---|---|---|
| I-01 | {{ERP}} | Bidirecional | REST/JSON | **Crítica** | {{Nome}} | {{Equipa/Fornecedor}} | {{link}} |
| I-02 | {{Gateway Pagamento}} | Saída + webhook | REST | **Crítica** | {{Nome}} | {{Fornecedor}} | {{link}} |
| I-03 | {{Serviço E-mail}} | Saída | API | Média | {{Nome}} | {{Fornecedor}} | {{link}} |
| I-04 | {{Data Warehouse}} | Saída | SFTP batch | Baixa | {{Nome}} | {{Equipa BI}} | {{link}} |

---

## 2. Ficha por integração

### I-01 — {{ERP}}

| Campo | Valor |
|---|---|
| **Objetivo** | {{Sincronizar clientes e artigos; enviar encomendas aprovadas}} |
| **Sentido** | Bidirecional |
| **Protocolo / formato** | REST, JSON, TLS 1.2+ |
| **Autenticação** | {{OAuth2 client credentials; segredo em {{cofre}}, rotação {{90 dias}}}} |
| **Ambientes** | Prod: `{{url}}` · Staging: `{{url}}` · Sandbox: `{{url}}` |
| **Frequência** | {{Encomendas: tempo real · Clientes/artigos: sincronização a cada 15 min}} |
| **Volume esperado** | {{500 chamadas/dia; pico 50/min}} |
| **Limites impostos** | {{100 pedidos/min; 1 MB por payload}} |
| **SLA do fornecedor** | {{99,5%; resposta p95 ≤ 2 s}} |
| **Janela de manutenção** | {{Domingos 02:00–04:00 UTC}} |
| **Contacto de suporte** | {{email / canal / n.º de contrato}} |

**Operações usadas**
| Operação | Endpoint | Método | Idempotente | Timeout | Retentativas |
|---|---|---|---|---|---|
| Obter clientes alterados | `/api/customers?since=` | GET | Sim | 10 s | 3, backoff exp. |
| Enviar encomenda | `/api/orders` | POST | Sim (`externalRef`) | 15 s | 3, backoff exp. + jitter |

**Mapeamento de dados**
| Campo nosso | Campo do ERP | Transformação | Notas |
|---|---|---|---|
| `cliente.nif` | `customer.taxId` | Remover prefixo `PT` | Chave de correspondência |
| `encomenda.total_cents` | `order.totalAmount` | Dividir por 100 | ERP usa decimal |
| `encomenda.estado` | `order.status` | Ver tabela abaixo | |

| Estado nosso | Estado ERP |
|---|---|
| APROVADA | `CONFIRMED` |
| CANCELADA | `VOID` |

**Tratamento de falhas**
| Falha | Deteção | Resposta do sistema | Impacto no utilizador |
|---|---|---|---|
| Timeout | > 15 s | Retry ×3, depois fila de reprocessamento | Encomenda fica "a sincronizar" |
| 401/403 | Código HTTP | Alerta imediato; não repetir | Bloqueia novas encomendas |
| 5xx | Código HTTP | Circuit breaker abre após 5 falhas/60 s | Modo degradado |
| Payload inválido (4xx) | Código HTTP | Não repetir; DLQ + alerta | Encomenda marcada para revisão manual |
| Indisponibilidade prolongada | Circuit breaker aberto > 10 min | Fila persistente; sincroniza ao recuperar | Aviso no painel |

**Modo degradado:** {{Encomendas continuam a ser aceites e ficam em fila; consulta de stock usa a última cópia conhecida com aviso de "dados de há X minutos".}}

**Reconciliação:** {{Job diário às 03:00 compara encomendas dos últimos 7 dias entre os dois sistemas e reporta divergências.}}

**Observabilidade**
| Métrica | Alerta |
|---|---|
| `erp_requests_total{status}` | Taxa de erro > 5% em 5 min |
| `erp_request_duration_seconds` | p95 > 5 s em 10 min |
| `erp_outbox_pending` | > 100 pendentes durante 15 min |
| `erp_circuit_state` | Aberto > 5 min |

**Ambiente de testes:** {{Sandbox disponível / mock local em `docker-compose`}}
**Dados de teste:** {{Conta `TESTE001`, artigo `SKU-TEST`}}

---

### I-02 — {{Gateway de Pagamento}}
{{Repetir a ficha}}

---

## 3. Matriz de dependências e impacto

| Se falhar… | Funcionalidades afetadas | Degradação possível? | Tempo tolerável |
|---|---|---|---|
| {{ERP}} | Criar encomenda, consultar stock | Sim, parcial | {{30 min}} |
| {{Pagamento}} | Concluir encomenda paga | Não | {{5 min}} |
| {{E-mail}} | Notificações | Sim (fila) | {{4 h}} |
| {{DW}} | Relatórios do dia seguinte | Sim | {{24 h}} |

---

## 4. Contratos e testes

- [ ] Contrato documentado e versionado para cada integração
- [ ] Testes de contrato no CI (ex.: Pact) para integrações críticas
- [ ] Mocks/stubs disponíveis para desenvolvimento local
- [ ] Cenários de falha testados (timeout, 5xx, payload inválido)
- [ ] Rotação de credenciais documentada e testada
- [ ] Processo de notificação de alterações do lado do fornecedor acordado
