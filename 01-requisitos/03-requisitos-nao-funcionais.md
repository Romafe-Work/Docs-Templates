# Requisitos Não Funcionais (Atributos de Qualidade)

> Um RNF só é útil se for **mensurável**. "Deve ser rápido" não é requisito; "p95 ≤ 300 ms com 500 utilizadores concorrentes" é.

**Versão:** {{0.1}} · **Data:** {{AAAA-MM-DD}}

---

## Formato de cenário de qualidade

| Elemento | Descrição |
|---|---|
| **Fonte** | Quem/o que gera o estímulo |
| **Estímulo** | O evento |
| **Ambiente** | Condições (carga normal, pico, degradado) |
| **Artefacto** | Parte do sistema afetada |
| **Resposta** | O que o sistema faz |
| **Medida** | Valor objetivo verificável |

---

## 1. Desempenho

| ID | Requisito | Medida | Condições | Verificação |
|---|---|---|---|---|
| RNF-01 | Tempo de resposta da API de leitura | p50 ≤ 100 ms · p95 ≤ 300 ms · p99 ≤ 800 ms | 500 pedidos/s sustentados | Teste de carga k6 em pré-produção |
| RNF-02 | Carregamento inicial da aplicação web | LCP ≤ 2,5 s · INP ≤ 200 ms · CLS ≤ 0,1 | 4G, dispositivo médio | Lighthouse CI + RUM |
| RNF-03 | Processamento em lote {{X}} | {{100 000 registos em ≤ 30 min}} | {{noturno}} | Medição em produção |

## 2. Escalabilidade e capacidade

| ID | Requisito | Medida | Verificação |
|---|---|---|---|
| RNF-04 | Utilizadores concorrentes suportados | {{2 000}} sem degradar RNF-01 | Teste de carga |
| RNF-05 | Crescimento de dados | {{+40% ao ano durante 3 anos}} | Projeção + teste de volume |
| RNF-06 | Escalamento horizontal | Adicionar instâncias sem alterar código nem parar serviço | Teste em staging |

## 3. Disponibilidade e fiabilidade

| ID | Requisito | Medida | Notas |
|---|---|---|---|
| RNF-07 | Disponibilidade mensal (SLO) | {{99,9%}} (≈43 min/mês de indisponibilidade) | Excluindo manutenção anunciada |
| RNF-08 | RPO — perda máxima de dados | {{15 min}} | Ver [Backup e DR](../06-operacao/05-backup-dr.md) |
| RNF-09 | RTO — tempo máximo de reposição | {{4 h}} | Testado {{semestralmente}} |
| RNF-10 | Degradação graciosa | Com {{serviço externo X}} em baixo, funcionalidades {{A,B}} mantêm-se | Teste de caos |

## 4. Segurança

| ID | Requisito | Medida / Norma |
|---|---|---|
| RNF-11 | Dados em trânsito cifrados | TLS 1.3 (mínimo 1.2); HSTS ativo |
| RNF-12 | Dados sensíveis em repouso cifrados | AES-256; chaves geridas em {{KMS}} |
| RNF-13 | Palavras-passe | Argon2id; nunca em logs |
| RNF-14 | Autorização | RBAC; negação por omissão; verificada no servidor |
| RNF-15 | Registo de auditoria | Ações sensíveis registadas, imutáveis, retidas {{n}} anos |
| RNF-16 | Gestão de vulnerabilidades | Críticas corrigidas em ≤ {{7}} dias; SCA no CI |
| RNF-17 | Sessões | Expiram em {{8 h}}; invalidação global no logout |

> Detalhe em [SECURITY](../07-governanca/01-security.md)

## 5. Privacidade e conformidade

| ID | Requisito |
|---|---|
| RNF-18 | Minimização: recolher apenas dados com finalidade documentada |
| RNF-19 | Direitos do titular (acesso, retificação, apagamento, portabilidade) atendidos em ≤ 30 dias |
| RNF-20 | Retenção: {{tipo de dado}} eliminado após {{prazo}} automaticamente |
| RNF-21 | Dados alojados em {{UE}} |

> Detalhe em [Privacidade / RGPD](../07-governanca/02-privacidade-rgpd.md)

## 6. Usabilidade e acessibilidade

| ID | Requisito | Medida |
|---|---|---|
| RNF-22 | Conformidade WCAG | 2.2 nível AA |
| RNF-23 | Navegação completa por teclado | Todas as funcionalidades; foco sempre visível |
| RNF-24 | Contraste | ≥ 4,5:1 texto normal · ≥ 3:1 texto grande e componentes |
| RNF-25 | Curva de aprendizagem | Utilizador novo conclui {{tarefa X}} em ≤ {{5 min}} sem ajuda (teste com 5 utilizadores) |
| RNF-26 | Mensagens de erro | Explicam a causa e a ação seguinte; sem códigos técnicos ao utilizador |

## 7. Compatibilidade

| ID | Requisito |
|---|---|
| RNF-27 | Browsers: últimas 2 versões de Chrome, Firefox, Safari, Edge |
| RNF-28 | Responsivo entre {{320 px}} e {{2560 px}} |
| RNF-29 | Sistemas móveis: iOS {{16+}}, Android {{11+}} |
| RNF-30 | Compatibilidade retroativa da API mantida durante {{12 meses}} após deprecação |

## 8. Manutenibilidade e evolução

| ID | Requisito | Medida |
|---|---|---|
| RNF-31 | Cobertura de testes | ≥ {{80%}} nas camadas de domínio |
| RNF-32 | Tempo de build + testes no CI | ≤ {{10 min}} |
| RNF-33 | Ambiente de desenvolvimento operacional | ≤ {{30 min}} a partir do repositório limpo |
| RNF-34 | Dívida técnica | {{Nenhum ficheiro > 500 linhas; complexidade ciclomática ≤ 15}} |

## 9. Observabilidade

| ID | Requisito |
|---|---|
| RNF-35 | Logs estruturados (JSON) com `trace_id` correlacionável |
| RNF-36 | Métricas RED (Rate, Errors, Duration) por endpoint |
| RNF-37 | Tracing distribuído em {{100%}} dos pedidos de escrita |
| RNF-38 | Alertas baseados em sintoma (SLO burn rate), não em causa |

> Detalhe em [Monitorização](../06-operacao/04-monitorizacao.md)

## 10. Internacionalização

| ID | Requisito |
|---|---|
| RNF-39 | Idiomas suportados: {{pt-PT, en-GB}} |
| RNF-40 | Datas, números e moeda formatados segundo a locale |
| RNF-41 | Todos os textos externalizados; sem strings no código |
| RNF-42 | Timestamps armazenados em UTC |

## 11. Portabilidade e operação

| ID | Requisito |
|---|---|
| RNF-43 | Aplicação containerizada; sem estado em disco local |
| RNF-44 | Configuração exclusivamente por variáveis de ambiente |
| RNF-45 | Deploy sem indisponibilidade (rolling / blue-green) |

## 12. Custo

| ID | Requisito |
|---|---|
| RNF-46 | Custo de infraestrutura ≤ {{X €}}/mês a {{N}} utilizadores ativos |

---

## Trade-offs assumidos
| Atributos em tensão | Decisão | ADR |
|---|---|---|
| Consistência vs Disponibilidade | {{Consistência eventual em leituras de relatório}} | [ADR-003](../03-arquitetura/02-adr-template.md) |
| Segurança vs Usabilidade | {{MFA obrigatório apenas para papéis administrativos}} | {{ADR-005}} |
