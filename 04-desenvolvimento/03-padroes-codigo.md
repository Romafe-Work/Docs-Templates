# Padrões de Código — {{PROJETO}}

> A formatação é resolvida por ferramentas ({{formatter}} + {{linter}}), não em revisão de código. Este documento cobre o que as ferramentas **não** conseguem verificar.

---

## 1. Ferramentas (automáticas, não negociáveis)

| Aspeto | Ferramenta | Configuração | Falha o CI? |
|---|---|---|---|
| Formatação | {{...}} | `{{ficheiro}}` | Sim |
| Análise estática | {{...}} | `{{ficheiro}}` | Sim |
| Tipos | {{...}} | modo estrito | Sim |
| Segurança de dependências | {{...}} | | Sim (crítico/alto) |
| Complexidade | {{...}} | máx. {{15}} | Aviso |

---

## 2. Nomenclatura

| Elemento | Convenção | Exemplo |
|---|---|---|
| Ficheiros | {{kebab-case}} | `calculador-precos.ts` |
| Classes / tipos | `PascalCase` | `Encomenda`, `EstadoEncomenda` |
| Funções / variáveis | `camelCase` | `calcularTotal` |
| Constantes | `SCREAMING_SNAKE_CASE` | `LIMITE_APROVACAO_CENTS` |
| Booleanos | prefixo `e`/`tem`/`pode` | `estaAprovada`, `podeCancelar` |
| Funções | verbo + objeto | `calcularTotal`, `validarNif` |

**Regras**
- Usa a linguagem do [Glossário](../01-requisitos/06-glossario.md). Se o negócio diz "Encomenda", a classe é `Encomenda` — não `Order`, não `Pedido`.
- Nomes revelam intenção: `d` ✗ · `dias` ~ · `diasAteExpirar` ✓
- Evita abreviaturas exceto as universais (`id`, `url`, `http`).
- Sem números mágicos: `if (total > 500000)` ✗ · `if (total > LIMITE_APROVACAO_CENTS)` ✓

---

## 3. Estrutura

### 3.1 Camadas e dependências
```
apresentacao  →  aplicacao  →  dominio  ←  infraestrutura
```
- O **domínio** não importa nada de fora: sem framework, sem ORM, sem HTTP.
- A infraestrutura implementa interfaces **definidas** no domínio (inversão de dependências).
- Um teste de arquitetura no CI garante isto.

### 3.2 Tamanho
| Elemento | Alvo | Máximo |
|---|---|---|
| Função | ≤ 20 linhas | 50 |
| Ficheiro | ≤ 200 linhas | 500 |
| Parâmetros | ≤ 3 | 5 (acima disso, objeto) |
| Aninhamento | ≤ 2 níveis | 3 |

> São sinais, não leis. Uma função de 60 linhas que é uma máquina de estados legível é melhor que seis funções que obrigam a saltar de ficheiro em ficheiro.

### 3.3 Retorno antecipado
```js
// Evitar
function processar(e) {
  if (e) { if (e.valido) { if (e.estado === 'ATIVO') { /* ... */ } } }
}

// Preferir
function processar(e) {
  if (!e) return erro('encomenda em falta')
  if (!e.valido) return erro('encomenda invalida')
  if (e.estado !== 'ATIVO') return erro('estado incorreto')
  // caminho principal sem aninhamento
}
```

---

## 4. Tratamento de erros

| Regra | Detalhe |
|---|---|
| Distinguir erros | Erro de **domínio** (esperado: stock insuficiente) ≠ erro **técnico** (inesperado: BD em baixo) |
| Nunca engolir | `catch {}` vazio é proibido; se é seguro ignorar, comenta porquê |
| Contexto | Mensagens incluem o suficiente para diagnosticar, sem dados pessoais |
| Fronteiras | Converter erros técnicos em erros de aplicação na fronteira da camada |
| Não usar exceções para fluxo normal | Um resultado esperado não é uma exceção |

```js
// Erro de dominio: parte do contrato
class StockInsuficiente extends ErroDominio {
  constructor(sku, pedido, disponivel) {
    super(`Stock insuficiente para ${sku}: pedido ${pedido}, disponível ${disponivel}`)
    this.codigo = 'STOCK_INSUFICIENTE'
    this.dados = { sku, pedido, disponivel }
  }
}
```

---

## 5. Comentários

**Comenta o *porquê*, nunca o *quê*.**

```js
// Mau — repete o código
// incrementa o contador
contador++

// Bom — explica uma decisão não óbvia
// O ERP rejeita silenciosamente lotes > 100; dividimos para garantir
// que nenhuma encomenda se perde (ver incidente INC-2026-014).
const LOTE_MAX = 100
```

| Marcador | Uso |
|---|---|
| `TODO(#1234):` | Trabalho pendente **com issue associada** |
| `FIXME(#1234):` | Problema conhecido a corrigir |
| `HACK(#1234):` | Solução deliberadamente imperfeita, com justificação |
| `NOTE:` | Contexto importante para quem ler a seguir |

`TODO` sem número de issue é rejeitado pelo linter.

---

## 6. Segurança no código

- [ ] Toda a entrada externa é validada na fronteira, com esquema explícito
- [ ] Consultas parametrizadas — **nunca** concatenar SQL
- [ ] Autorização verificada no servidor, em cada operação (nunca só na interface)
- [ ] Segredos vêm de variáveis de ambiente/cofre; nunca no código nem em logs
- [ ] Saída escapada conforme o contexto (HTML, atributo, URL, SQL)
- [ ] Dados pessoais nunca em logs, mensagens de erro ou URLs
- [ ] Dependências novas justificadas (peso, manutenção, licença, transitivas)
- [ ] Aleatoriedade criptográfica onde há impacto de segurança
- [ ] Comparação de segredos em tempo constante

---

## 7. Assíncrono e concorrência

- Timeout explícito em **todas** as chamadas de rede — sem exceção.
- Retentativas apenas em operações idempotentes, com backoff exponencial **e jitter**.
- Sem `await` dentro de ciclos quando as operações são independentes — paralelizar com limite de concorrência.
- Cancelamento propagado (`AbortSignal` ou equivalente).
- Escritas concorrentes protegidas por bloqueio otimista (coluna `versao`) ou transação adequada.

---

## 8. Testes

| Regra | Detalhe |
|---|---|
| Nome | Descreve o comportamento: `deve rejeitar encomenda sem linhas` |
| Estrutura | Arrange · Act · Assert, separados |
| Independência | Sem ordem entre testes; sem estado partilhado |
| Determinismo | Sem `now()` real, sem aleatoriedade, sem rede — injetar relógio e dependências |
| Foco | Testar comportamento observável, não a implementação |
| Duplicados | Um teste por comportamento; não repetir o mesmo caso em vários níveis |

> Ver [Plano de Testes](../05-qualidade/01-plano-testes.md)

---

## 9. Registo (logging)

```json
{"nivel":"info","ts":"2026-08-20T14:30:00Z","trace_id":"4bf92f...","evento":"encomenda_aprovada","encomenda_id":"018f2b...","total_cents":750000,"duracao_ms":142}
```

| Nível | Quando | Exemplo |
|---|---|---|
| `error` | Falha que exige intervenção | BD inacessível |
| `warn` | Anomalia recuperada | Retentativa bem-sucedida |
| `info` | Evento de negócio relevante | Encomenda aprovada |
| `debug` | Diagnóstico (não em produção por omissão) | Payload de pedido |

**Nunca registar:** palavras-passe, tokens, números de cartão, dados pessoais em claro, payloads completos com dados de clientes.

---

## 10. Desempenho

- Medir antes de otimizar; incluir o número na descrição do PR.
- Evitar N+1 — carregar em lote.
- Paginar sempre listagens; nunca devolver coleções sem limite.
- Cache com invalidação pensada **antes** de a introduzir; caso contrário não a introduzas.
- Ficheiros grandes em streaming, nunca inteiros em memória.
