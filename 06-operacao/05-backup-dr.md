# Backup e Recuperação de Desastre (DR)

> **Um backup que nunca foi restaurado não é um backup — é uma esperança.**

**Última revisão:** {{AAAA-MM-DD}} · **Último teste de restauro:** {{data}} · **Responsável:** {{Nome}}

---

## 1. Objetivos

| Métrica | Definição | Objetivo | Verificado |
|---|---|---|---|
| **RPO** (Recovery Point Objective) | Perda máxima de dados aceitável | {{15 min}} | {{data}} |
| **RTO** (Recovery Time Objective) | Tempo máximo até reposição do serviço | {{4 h}} | {{data}} |
| **RTO de degradação** | Tempo até serviço parcial | {{30 min}} | {{data}} |

**Justificação:** {{RPO de 15 min porque perder mais de 15 min de encomendas exige reconciliação manual com o ERP, que custa ~4 h de trabalho.}}

---

## 2. O que é protegido

| Ativo | Método | Frequência | Retenção | Localização | Cifrado | Testado |
|---|---|---|---|---|---|---|
| Base de dados principal | {{Snapshot + WAL contínuo}} | {{Snapshot diário 02:00; WAL contínuo}} | {{Diários 30 d · semanais 12 sem · mensais 12 m}} | {{Região secundária}} | Sim | {{data}} |
| Object storage (anexos) | {{Versionamento + replicação}} | Contínua | {{90 dias de versões}} | {{Região secundária}} | Sim | {{data}} |
| Segredos e credenciais | {{Backup do cofre}} | {{Diário}} | {{30 dias}} | {{Offline}} | Sim | {{data}} |
| Configuração / IaC | Git | Cada commit | Ilimitada | {{Repositório + espelho}} | — | — |
| Logs de auditoria | {{Armazenamento imutável WORM}} | Contínua | {{7 anos}} | {{...}} | Sim | {{data}} |

**Não protegido (deliberadamente):** {{cache Redis — reconstruída automaticamente; ambientes efémeros}}

---

## 3. Regra 3-2-1

- **3** cópias dos dados (produção + 2 backups)
- **2** suportes/serviços diferentes
- **1** cópia fora da região principal, **isolada** (imutável, credenciais distintas)

> A cópia isolada protege contra o cenário que mais destrói empresas: ransomware ou um erro operacional que apaga os backups juntamente com os dados. Se as mesmas credenciais que gerem produção podem apagar os backups, não tens backup.

| Requisito | Estado |
|---|---|
| Backups imutáveis (WORM / object lock) | {{Sim, 30 dias}} |
| Credenciais de backup separadas das de produção | {{Sim}} |
| Eliminação de backups requer aprovação dupla | {{Sim}} |
| Alerta se um backup não ocorrer em 26 h | {{Sim}} |

---

## 4. Cenários de desastre

| # | Cenário | Probabilidade | Impacto | Estratégia | RTO |
|---|---|---|---|---|---|
| D1 | Eliminação acidental de dados | Média | Alto | Restauro point-in-time | {{1 h}} |
| D2 | Corrupção da base de dados | Baixa | Crítico | Restauro do último snapshot íntegro | {{2 h}} |
| D3 | Perda de uma zona de disponibilidade | Média | Médio | Failover automático | {{5 min}} |
| D4 | Perda da região inteira | Muito baixa | Crítico | Restauro na região secundária | {{4 h}} |
| D5 | Ransomware / comprometimento | Baixa | Crítico | Restauro de cópia isolada; reconstruir infra | {{8 h}} |
| D6 | Fornecedor cloud indisponível | Muito baixa | Crítico | {{Aceite — sem multi-cloud}} | {{Depende do fornecedor}} |
| D7 | Erro humano em migração | Média | Alto | Rollback + restauro parcial | {{2 h}} |

---

## 5. Procedimentos de restauro

### 5.1 Restauro point-in-time (D1, D7)

**Quando:** dados apagados ou corrompidos por erro, com momento conhecido.

```bash
# 1. PARAR escritas na base afetada (evitar agravar)
{{comando}}

# 2. Identificar o momento exato imediatamente ANTES do erro
{{comando para consultar logs/auditoria}}

# 3. Restaurar para uma instância NOVA (nunca por cima da original)
{{comando}}

# 4. Verificar a integridade na instância restaurada
{{comandos de verificação: contagens, invariantes, últimos registos}}

# 5. Extrair apenas os dados necessários OU promover a instância
{{comando}}

# 6. Retomar escritas
{{comando}}
```

**Regra crítica:** nunca restaurar por cima da base original antes de confirmar que o restauro está bom. A original é a última evidência do que aconteceu.

### 5.2 Restauro total noutra região (D4, D5)

```bash
# 1. Declarar incidente P1 e nomear IC
# 2. Provisionar infraestrutura na região secundária
{{comando IaC}}
# 3. Restaurar base de dados a partir do backup replicado
{{comando}}
# 4. Restaurar segredos
{{comando}}
# 5. Implantar a aplicação (versão em produção antes do desastre)
{{comando}}
# 6. Verificar (checklist §6)
# 7. Redirecionar DNS / tráfego
{{comando}}
# 8. Comunicar
```

**Nota de DNS:** com TTL de {{300 s}}, contar {{5–10 min}} até a propagação. Reduzir o TTL **antes** de uma janela de risco conhecida.

### 5.3 Verificação pós-restauro

- [ ] Endpoint de saúde responde 200
- [ ] Contagem de registos nas tabelas principais dentro do esperado
- [ ] Último registo tem timestamp compatível com o RPO
- [ ] Invariantes de negócio verificadas ({{totais de encomendas coerentes com as linhas}})
- [ ] Autenticação funciona
- [ ] Percurso crítico executado manualmente ponta a ponta
- [ ] Integrações externas a responder
- [ ] Filas a ser consumidas
- [ ] **RPO real medido:** {{perdemos X minutos de dados}}
- [ ] **RTO real medido:** {{Y minutos até reposição}}

---

## 6. Testes de recuperação

| Teste | Frequência | Última execução | RTO obtido | Resultado |
|---|---|---|---|---|
| Restauro para instância isolada | {{Mensal, automático}} | {{data}} | {{38 min}} | ✓ |
| Verificação de integridade do backup | {{Diária, automática}} | {{data}} | — | ✓ |
| Exercício de DR completo (região secundária) | {{Semestral}} | {{data}} | {{3h40}} | ✓ RTO cumprido |
| Simulação de ransomware (restauro de cópia isolada) | {{Anual}} | {{data}} | {{...}} | {{...}} |

### Guião do exercício de DR
1. Anunciar a janela (é um exercício, não um incidente real).
2. Nomear IC e escriba.
3. Executar §5.2 **usando apenas a documentação** — se for preciso perguntar a alguém, é uma falha da documentação a corrigir.
4. Cronometrar cada fase.
5. Registar tudo o que não estava documentado ou estava errado.
6. Post-mortem do exercício com ações e donos.

---

## 7. Contactos e dependências

| Recurso | Detalhe |
|---|---|
| Fornecedor cloud — suporte | {{n.º de contrato, telefone, nível de suporte}} |
| Registador de DNS | {{acesso, quem tem credenciais}} |
| Autoridade de certificação | {{...}} |
| Responsável por declarar DR | {{Nome + substituto}} |
| Comunicação com clientes | {{Responsável + canal}} |

**Cuidado:** se a documentação de DR estiver alojada apenas no sistema que caiu, não existe. Manter cópia {{offline / noutro fornecedor}}: {{localização}}.

---

## 8. Retenção e eliminação

| Dado | Retenção legal | Retenção técnica | Eliminação |
|---|---|---|---|
| Encomendas e faturas | {{10 anos (fiscal)}} | {{10 anos}} | {{Automática}} |
| Dados pessoais de clientes inativos | {{—}} | {{3 anos após última atividade}} | {{Anonimização automática}} |
| Logs de aplicação | — | {{30 dias}} | Automática |
| Logs de auditoria | {{7 anos}} | {{7 anos}} | Automática |
| Backups | — | {{conforme §2}} | Automática |

> A eliminação tem de alcançar **também os backups**. Um pedido de apagamento ao abrigo do RGPD que deixa os dados nos backups não está cumprido — documenta a abordagem: {{eliminação no restauro (backup expira naturalmente e a lista de apagamento é reaplicada após qualquer restauro)}}.
