# Runbook Operacional — {{SERVIÇO}}

> Escrito para ser seguido às **3 da manhã**, por alguém que não construiu o sistema. Comandos completos, copiáveis, sem pressupostos.

| Campo | Valor |
|---|---|
| Serviço | {{...}} |
| Equipa responsável | {{...}} |
| Canal de suporte | {{#...}} |
| Escalonamento | {{PagerDuty / rotação}} |
| Última revisão | {{AAAA-MM-DD}} |
| Testado em exercício | {{data}} |

---

## 1. Visão geral

**O que este serviço faz:** {{1-2 linhas em linguagem simples}}
**O que acontece se estiver em baixo:** {{Clientes não conseguem criar encomendas. Impacto de receita: ~{{X €}}/hora.}}

**Dependências**
| Dependência | Crítica? | O que falha sem ela |
|---|---|---|
| PostgreSQL | Sim | Tudo |
| Redis | Não | Sessões perdem-se; utilizadores voltam a autenticar-se |
| {{ERP}} | Parcial | Criação de encomendas fica em fila |

---

## 2. Acessos e ligações rápidas

| Recurso | Ligação | Notas |
|---|---|---|
| Painel principal | {{url}} | |
| Logs | {{url}} | |
| Traces | {{url}} | |
| Alertas | {{url}} | |
| Consola cloud | {{url}} | {{Requer MFA}} |
| Estado das dependências | {{url}} | |

```bash
# Contexto e acesso
{{comando de autenticação}}
{{comando para selecionar ambiente}}

# Estado dos serviços
{{comando}}

# Logs em tempo real
{{comando}}

# Aceder a um container
{{comando}}
```

---

## 3. Verificações de saúde

| Verificação | Comando | Resposta esperada |
|---|---|---|
| Saúde da aplicação | `curl -s {{url}}/health` | `{"status":"ok"}` |
| Prontidão | `curl -s {{url}}/ready` | 200 |
| Base de dados | `{{comando}}` | Ligação OK, latência < 10 ms |
| Fila | `{{comando}}` | Pendentes < 100 |
| Certificado TLS | `echo \| openssl s_client -connect {{host}}:443 2>/dev/null \| openssl x509 -noout -dates` | Validade > 30 dias |

---

## 4. Procedimentos operacionais

### 4.1 Reiniciar o serviço
**Quando:** {{fuga de memória confirmada; serviço não responde mas a infraestrutura está saudável}}
**Impacto:** {{nenhum se rolling; pedidos em curso terminam graciosamente (30 s)}}
```bash
{{comando}}
# Verificar
{{comando}}
```

### 4.2 Escalar
**Quando:** {{CPU > 70% sustentado; latência a subir com tráfego}}
```bash
{{comando de escalamento}}
```
**Limites:** mínimo {{3}}, máximo {{20}} instâncias. Acima disso, o estrangulamento é provavelmente a base de dados — ver 4.6.

### 4.3 Ativar modo degradado
**Quando:** {{dependência externa em baixo}}
```bash
{{comando para ativar flag}}
```
**Efeito:** {{Encomendas aceites e enfileiradas; stock mostra dados em cache com aviso.}}
**Reverter:** {{comando}}

### 4.4 Limpar a cache
**Quando:** {{dados obsoletos confirmados após correção de bug}}
**Cuidado:** {{limpar tudo causa pico de carga na BD — preferir invalidação por chave}}
```bash
# Preferido: por padrão
{{comando}}
# Último recurso: tudo
{{comando}}
```

### 4.5 Reprocessar mensagens da fila morta (DLQ)
```bash
# 1. Ver o que está lá e porquê
{{comando}}
# 2. Corrigir a causa (não reprocessar antes disto)
# 3. Reprocessar em lotes pequenos
{{comando}}
# 4. Confirmar
{{comando}}
```

### 4.6 Diagnosticar base de dados lenta
```bash
# Consultas ativas há mais de 30 s
{{comando}}
# Bloqueios
{{comando}}
# Terminar uma consulta (identificar antes!)
{{comando}}
```

### 4.7 Rodar credenciais
{{Passos}}

---

## 5. Alertas — o que fazer

### `ALTA_TAXA_ERRO_5XX`
| | |
|---|---|
| **Significado** | Mais de {{2%}} dos pedidos devolvem 5xx durante 5 min |
| **Impacto** | Utilizadores veem erros |
| **Gravidade** | {{P1}} |

**Diagnóstico**
1. `{{comando para ver erros recentes agrupados}}`
2. É um endpoint específico ou transversal?
3. Coincide com um deploy? → `{{comando para ver últimos deploys}}`
4. Alguma dependência em baixo? → verificar painel de dependências

**Ação**
| Causa identificada | Ação |
|---|---|
| Deploy recente | **Rollback** (§5 do [guia de deployment](01-deployment.md)) |
| Dependência externa | Ativar modo degradado (4.3) |
| Exaustão de recursos | Escalar (4.2) |
| Causa desconhecida após 15 min | Escalar para {{...}} |

---

### `LATENCIA_ALTA`
**Significado:** p95 > {{1 s}} durante 10 min
**Diagnóstico:** 1. Traces lentos · 2. Consultas lentas na BD · 3. Saturação de CPU/memória · 4. Latência de dependências
**Ação:** {{...}}

---

### `FILA_ACUMULADA`
**Significado:** > {{1000}} mensagens pendentes durante 15 min
**Diagnóstico:** workers vivos? erros no consumo? mensagem "venenosa" a bloquear?
**Ação:** {{escalar workers; isolar mensagem problemática para DLQ}}

---

### `ESPACO_DISCO_BAIXO`
**Significado:** < {{15%}} livre
**Ação:** 1. Identificar o que cresce · 2. Rodar/limpar logs antigos · 3. Se for a BD, verificar tabelas de eventos e `VACUUM` · 4. Aumentar volume

---

### `CERTIFICADO_A_EXPIRAR`
**Ação:** {{renovação automática deveria ter ocorrido — verificar {{cert-manager}} e forçar renovação}}

---

## 6. Tarefas de manutenção

| Tarefa | Frequência | Procedimento | Responsável |
|---|---|---|---|
| Verificar restauro de backup | {{Trimestral}} | [Backup e DR](05-backup-dr.md) | {{SRE}} |
| Rodar credenciais | {{90 dias}} | 4.7 | {{SRE}} |
| Atualizar dependências | {{Mensal}} | {{...}} | {{Equipa}} |
| Arquivar dados antigos | {{Mensal}} | {{...}} | {{Automático}} |
| Rever alertas ruidosos | {{Mensal}} | {{...}} | {{On-call}} |
| Exercício de DR | {{Semestral}} | [Backup e DR](05-backup-dr.md) | {{SRE}} |

---

## 7. Escalonamento

| Nível | Quem | Quando | Contacto |
|---|---|---|---|
| L1 | On-call | Todos os alertas | {{...}} |
| L2 | {{Equipa do serviço}} | Não resolvido em 30 min | {{...}} |
| L3 | {{Arquiteto / responsável técnico}} | Não resolvido em 1 h, ou P1 com impacto de dados | {{...}} |
| Gestão | {{...}} | P1 > 1 h, ou impacto em clientes externos | {{...}} |
| Fornecedor | {{...}} | Causa confirmada em sistema externo | {{n.º de contrato}} |

---

## 8. O que **não** fazer

- ❌ Executar `UPDATE`/`DELETE` em produção sem `WHERE` verificado num `SELECT` primeiro
- ❌ Reiniciar a base de dados para "ver se resolve"
- ❌ Aplicar um fix diretamente em produção sem passar pelo pipeline
- ❌ Limpar toda a cache em hora de pico
- ❌ Reprocessar a DLQ antes de corrigir a causa
- ❌ Silenciar um alerta sem abrir issue
- ❌ Investigar sozinho um P1 durante mais de 30 min — escala
