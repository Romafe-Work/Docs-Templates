# Requisitos Funcionais — {{PROJETO}}

**Versão:** {{0.1}} · **Data:** {{AAAA-MM-DD}} · **Estado:** {{Rascunho}}

## Convenções

- **ID:** `RF-nn` (nunca reutilizar um ID; requisitos removidos ficam com estado `Removido`)
- **Redação:** `O sistema DEVE <ação> <objeto> <condição/qualificação>.`
  - `DEVE` = obrigatório · `DEVERIA` = recomendado · `PODE` = opcional
- **Prioridade:** Must / Should / Could / Won't
- **Estado:** Proposto → Aprovado → Em desenvolvimento → Implementado → Verificado / Removido

---

## Índice por módulo
| Módulo | Requisitos |
|---|---|
| [Autenticação e acessos](#1-autenticação-e-acessos) | RF-01 … RF-05 |
| [{{Módulo B}}](#2-módulo-b) | RF-06 … |

---

## 1. Autenticação e acessos

### RF-01 — {{Autenticação de utilizador}}

| | |
|---|---|
| **Prioridade** | Must |
| **Estado** | Proposto |
| **Origem** | {{Entrevista {{Nome}}, {{data}} / B-01}} |
| **Persona** | {{Todas}} |
| **Caso de uso** | [UC-01](../02-analise/01-use-cases.md#uc-01) |
| **Regras de negócio** | [RN-01](../02-analise/05-regras-negocio.md) |
| **Depende de** | — |
| **Versão-alvo** | {{1.0}} |

**Descrição**
O sistema DEVE permitir que um utilizador registado se autentique através de e-mail e palavra-passe.

**Critérios de aceitação**
```gherkin
Cenário: Autenticação com credenciais válidas
  Dado que existe um utilizador ativo com o e-mail "ana@exemplo.pt"
  Quando submete a palavra-passe correta
  Então é redirecionado para o painel principal
  E é criada uma sessão válida por 8 horas

Cenário: Credenciais inválidas
  Dado que existe um utilizador ativo
  Quando submete uma palavra-passe incorreta
  Então vê a mensagem "Credenciais inválidas"
  E a mensagem não revela se o e-mail existe

Cenário: Bloqueio por tentativas falhadas
  Dado que ocorreram 5 tentativas falhadas em 15 minutos
  Quando tenta autenticar-se novamente
  Então o acesso é bloqueado durante 15 minutos
  E é registado um evento de segurança
```

**Fluxos alternativos e exceções**
| Situação | Comportamento esperado |
|---|---|
| Conta desativada | Mensagem genérica; sem indicação do motivo |
| Serviço de identidade indisponível | Erro 503 com mensagem "Serviço temporariamente indisponível" |

**Fora do âmbito deste requisito:** recuperação de palavra-passe (→ RF-02), SSO (→ RF-05)

**Notas de implementação:** {{...}}

---

### RF-02 — {{...}}
{{Repetir a estrutura}}

---

## 2. {{Módulo B}}

---

## Requisitos removidos
| ID | Requisito | Removido em | Motivo |
|---|---|---|---|
| RF-99 | {{...}} | {{data}} | {{Substituído por RF-14}} |
