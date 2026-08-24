# Casos de Teste — {{PROJETO / MÓDULO}}

**Versão:** {{0.1}} · **Autor:** {{Nome}} · **Última execução:** {{AAAA-MM-DD}}

---

## Sumário de execução

| Total | Passou | Falhou | Bloqueado | Não executado | Taxa de sucesso |
|---|---|---|---|---|---|
| {{45}} | {{40}} | {{2}} | {{1}} | {{2}} | {{89%}} |

| Prioridade | Total | Executados | Passou |
|---|---|---|---|
| Crítica | {{12}} | {{12}} | {{12}} |
| Alta | {{18}} | {{18}} | {{16}} |
| Média | {{15}} | {{12}} | {{12}} |

---

## Índice

| ID | Título | Requisito | Prioridade | Tipo | Automatizado | Estado |
|---|---|---|---|---|---|---|
| TC-001 | Autenticação com credenciais válidas | RF-01 | Crítica | Funcional | Sim | Passou |
| TC-002 | Autenticação com palavra-passe errada | RF-01 | Crítica | Funcional | Sim | Passou |
| TC-003 | Bloqueio após 5 tentativas | RF-01, RN-01 | Crítica | Segurança | Sim | Passou |
| TC-012 | Aprovação acima de 5000 € | RF-09, RN-02 | Crítica | Funcional | Não | Falhou |

---

## Especificações

### TC-001 — Autenticação com credenciais válidas

| Campo | Valor |
|---|---|
| **Requisito** | RF-01 |
| **Caso de uso** | UC-01, fluxo principal |
| **Prioridade** | Crítica |
| **Tipo** | Funcional |
| **Automatizado** | Sim — `tests/e2e/auth.spec.ts:12` |
| **Duração estimada** | {{30 s}} |

**Pré-condições**
1. Existe o utilizador `cliente@exemplo.test` ativo, com palavra-passe `Dev12345678!`.
2. O utilizador não tem sessão iniciada.

**Passos**
| # | Ação | Resultado esperado |
|---|---|---|
| 1 | Aceder a `/login` | Formulário visível com campos de e-mail e palavra-passe |
| 2 | Introduzir `cliente@exemplo.test` | Campo aceita o valor; sem erro de validação |
| 3 | Introduzir `Dev12345678!` | Caracteres mascarados |
| 4 | Clicar em "Entrar" | Indicador de carregamento; botão desativado |
| 5 | Aguardar redireção | URL passa a `/dashboard` em ≤ 2 s; nome do utilizador visível no cabeçalho |

**Pós-condições**
- Cookie de sessão presente com `HttpOnly`, `Secure`, `SameSite=Lax`.
- Registo de auditoria criado com tipo `LOGIN_SUCESSO`.

**Resultado da última execução**
| Data | Versão | Ambiente | Executado por | Resultado | Notas |
|---|---|---|---|---|---|
| {{data}} | {{v1.4.2}} | staging | {{CI}} | Passou | — |

---

### TC-003 — Bloqueio após tentativas falhadas

| Campo | Valor |
|---|---|
| **Requisito** | RF-01, RN-01 |
| **Caso de uso** | UC-01, exceção E2 |
| **Prioridade** | Crítica |
| **Tipo** | Segurança |

**Pré-condições:** utilizador ativo sem tentativas falhadas recentes; contador reposto.

**Passos**
| # | Ação | Resultado esperado |
|---|---|---|
| 1–5 | Tentar autenticar 5 vezes com palavra-passe errada | Cada tentativa: "Credenciais inválidas"; mensagem idêntica em todas |
| 6 | Tentar com a palavra-passe **correta** | Acesso recusado; mensagem indica bloqueio temporário |
| 7 | Verificar o e-mail do utilizador | Notificação de bloqueio recebida |
| 8 | Aguardar 15 min e repetir com a palavra-passe correta | Autenticação bem-sucedida |

**Pós-condições:** evento `CONTA_BLOQUEADA` no registo de auditoria.

---

### TC-012 — {{...}}

---

## Testes de dados / tabelas de decisão

### TC-020 — Validação de NIF (RN-{{nn}})

| # | Entrada | Válido? | Mensagem esperada |
|---|---|---|---|
| 1 | `501442600` | Sim | — |
| 2 | `501442601` | Não | "NIF inválido" (dígito de controlo) |
| 3 | `12345678` | Não | "NIF deve ter 9 dígitos" |
| 4 | `1234567890` | Não | "NIF deve ter 9 dígitos" |
| 5 | `ABC123456` | Não | "NIF só pode conter dígitos" |
| 6 | ` 501442600 ` | Sim | — (espaços removidos) |
| 7 | *(vazio)* | Não | "NIF é obrigatório" |
| 8 | `000000000` | Não | "NIF inválido" |

### TC-021 — Limites de aprovação (RN-02)

| # | Valor (€) | Cliente em risco | Papel | Resultado esperado |
|---|---|---|---|---|
| 1 | 999,99 | Não | Cliente | Aprovação automática |
| 2 | 1000,00 | Não | Cliente | Aprovação automática (limite inclusivo) |
| 3 | 5000,00 | Não | Cliente | Aprovação automática |
| 4 | 5000,01 | Não | Cliente | Envia para aprovação de Gestor |
| 5 | 5000,01 | Não | Gestor | Aprovação permitida |
| 6 | 25000,01 | Não | Gestor | **Recusa** — exige Diretor |
| 7 | 500,00 | **Sim** | Cliente | Envia para aprovação de Gestor |

> **Técnica:** valores-limite (n−1, n, n+1) em torno de cada fronteira. É onde os defeitos vivem.

---

## Percursos críticos E2E

### E2E-01 — {{Do login à encomenda entregue}}
```gherkin
Cenário: Percurso completo de encomenda
  Dado que sou um cliente autenticado
  Quando crio uma encomenda de 3 artigos com stock disponível
  E submeto a encomenda no valor de 250 €
  Então a encomenda é aprovada automaticamente
  E recebo um e-mail de confirmação
  E o stock dos 3 artigos é reduzido
  E a encomenda aparece na minha lista com estado "Aprovada"
```

---

## Testes exploratórios (charters)

### CHT-01 — {{Explorar o fluxo de criação de encomenda em condições adversas}}
| | |
|---|---|
| **Missão** | Descobrir falhas de robustez que os casos scriptados não cobrem |
| **Áreas** | Rede lenta/intermitente, duplo clique, voltar atrás no browser, sessão a expirar a meio, múltiplos separadores |
| **Timebox** | {{90 min}} |
| **Testador** | {{Nome}} |
| **Notas / achados** | {{...}} |
| **Defeitos abertos** | {{BUG-034, BUG-035}} |
