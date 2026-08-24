# Changelog

Todas as alterações relevantes deste projeto são registadas aqui.

O formato segue [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/) e o versionamento segue [Semantic Versioning](https://semver.org/lang/pt-BR/).

> **Escrito para quem usa, não para quem desenvolve.** "Corrige o cálculo do total quando há desconto" é útil; "refactor do PricingService" não diz nada a ninguém de fora.

---

## [Não lançado]

### Adicionado
- {{...}}

### Alterado
- {{...}}

---

## [1.5.0] — {{2026-08-20}}

### Adicionado
- Filtros combináveis por estado e prazo na lista de encomendas ([#1234](link))
- Exportação de encomendas para CSV, até 10 000 linhas ([#1240](link))

### Alterado
- A lista de encomendas passa a mostrar 50 resultados por página (antes 25)
- Mensagens de erro de validação passam a indicar o campo em causa

### Corrigido
- O total da encomenda apresentava divergência de 1 cêntimo face ao ERP quando havia desconto ([#1250](link))
- A sessão expirava sem aviso durante o preenchimento de encomendas longas ([#1255](link))

### Segurança
- Atualizada a dependência {{X}} para {{versão}} ({{CVE-2026-xxxxx}})

---

## [1.4.0] — {{2026-07-15}}

### Adicionado
- {{...}}

### Depreciado
- O endpoint `GET /v1/pedidos` está depreciado; usa `GET /v1/encomendas`. Fim de vida: **{{2027-07-15}}**.

### Removido
- {{Funcionalidade X, depreciada desde 1.1.0}}

---

## [1.0.0] — {{2026-01-10}}

Primeira versão estável.

### Adicionado
- {{...}}

---

## Categorias

| Categoria | Uso |
|---|---|
| **Adicionado** | Funcionalidades novas |
| **Alterado** | Alterações a funcionalidades existentes |
| **Depreciado** | A remover numa versão futura — indicar sempre a data de fim de vida |
| **Removido** | Funcionalidades removidas |
| **Corrigido** | Correções de defeitos |
| **Segurança** | Vulnerabilidades corrigidas |

## Regras de versionamento

| Incremento | Quando |
|---|---|
| **MAJOR** (`2.0.0`) | Alteração incompatível — o utilizador tem de agir |
| **MINOR** (`1.6.0`) | Funcionalidade nova, compatível |
| **PATCH** (`1.5.1`) | Correção compatível |

**Alterações incompatíveis** exigem sempre: aviso na secção `### ⚠️ Alterações incompatíveis`, guia de migração e período de deprecação de {{12 meses}}.

---

[Não lançado]: {{link de comparação}}
[1.5.0]: {{link}}
[1.4.0]: {{link}}
[1.0.0]: {{link}}
