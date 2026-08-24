# Desenho e Contrato de API — {{PROJETO}}

**Versão da API:** `v1` · **Base URL:** `https://api.{{dominio}}/v1` · **Formato:** JSON

---

## 1. Princípios

| # | Princípio |
|---|---|
| 1 | **Contrato primeiro** — OpenAPI escrito e revisto antes da implementação |
| 2 | Recursos são substantivos no plural; ações são verbos HTTP |
| 3 | Alterações compatíveis não criam nova versão; incompatíveis criam `/v2` |
| 4 | Erros seguem [RFC 9457 Problem Details](https://www.rfc-editor.org/rfc/rfc9457) |
| 5 | Toda a escrita crítica aceita `Idempotency-Key` |
| 6 | Paginação por cursor, nunca por offset em coleções grandes |

---

## 2. Convenções

### 2.1 URLs
```
GET    /v1/encomendas                 lista
POST   /v1/encomendas                 cria
GET    /v1/encomendas/{id}            obtém
PATCH  /v1/encomendas/{id}            atualiza parcialmente
DELETE /v1/encomendas/{id}            elimina
GET    /v1/encomendas/{id}/linhas     sub-recurso
POST   /v1/encomendas/{id}/aprovacao  ação como sub-recurso
```
- `kebab-case` nas rotas, `snake_case` **ou** `camelCase` no corpo — escolher um e nunca misturar. *(Este projeto usa: `{{snake_case}}`.)*
- Sem verbos nas rotas (`/encomendas/criar` ✗). Ações que não encaixam em CRUD tornam-se sub-recursos (`/aprovacao`, `/cancelamento`).

### 2.2 Códigos de estado
| Código | Uso |
|---|---|
| 200 | Sucesso com corpo |
| 201 | Criado (+ cabeçalho `Location`) |
| 202 | Aceite para processamento assíncrono |
| 204 | Sucesso sem corpo |
| 400 | Pedido malformado |
| 401 | Não autenticado |
| 403 | Autenticado mas sem permissão |
| 404 | Recurso inexistente (ou existente mas sem visibilidade) |
| 409 | Conflito de estado (ex.: transição inválida) |
| 422 | Sintaticamente válido, semanticamente inválido |
| 429 | Limite de pedidos excedido (+ `Retry-After`) |
| 500 | Erro interno (nunca expor detalhes) |
| 503 | Dependência indisponível (+ `Retry-After`) |

### 2.3 Formato de erro
```json
{
  "type": "https://api.exemplo.pt/erros/stock-insuficiente",
  "title": "Stock insuficiente",
  "status": 409,
  "detail": "Não há stock para 2 das 5 linhas da encomenda.",
  "instance": "/v1/encomendas/018f2c...",
  "trace_id": "4bf92f3577b34da6a3ce929d0e0e4736",
  "errors": [
    { "campo": "linhas[2].quantidade", "codigo": "STOCK_INSUFICIENTE", "disponivel": 3, "pedido": 10 }
  ]
}
```
**Regra:** `type` e `codigo` são estáveis e destinam-se a máquinas; `title` e `detail` a pessoas. Nunca incluir *stack traces*, SQL ou dados de outros utilizadores.

### 2.4 Paginação (cursor)
```
GET /v1/encomendas?limite=50&cursor=eyJpZCI6...
```
```json
{
  "dados": [ ... ],
  "paginacao": { "proximo_cursor": "eyJpZCI6...", "tem_mais": true }
}
```
| Parâmetro | Omissão | Máximo |
|---|---|---|
| `limite` | 25 | 100 |

### 2.5 Filtragem, ordenação e campos
```
GET /v1/encomendas?estado=APROVADA&criado_apos=2026-01-01&ordenar=-criado_em&campos=id,numero,total
```

### 2.6 Cabeçalhos
| Cabeçalho | Direção | Uso |
|---|---|---|
| `Authorization: Bearer <token>` | pedido | Autenticação |
| `Idempotency-Key: <uuid>` | pedido | POST/PATCH críticos |
| `If-Match: <etag>` | pedido | Atualização com controlo de concorrência |
| `X-Request-Id` | ambos | Correlação |
| `ETag` | resposta | Versão do recurso |
| `RateLimit-Limit / -Remaining / -Reset` | resposta | Quotas |
| `Retry-After` | resposta | Em 429 e 503 |

### 2.7 Datas e números
- Datas/horas: **ISO 8601 em UTC** — `2026-08-20T14:30:00Z`
- Dinheiro: objeto explícito — `{"montante_cents": 12345, "moeda": "EUR"}`, nunca `float`
- Booleanos: `true`/`false`, nunca `"sim"`/`0`

---

## 3. Autenticação e autorização

| Aspeto | Decisão |
|---|---|
| Esquema | {{Bearer JWT (OIDC)}} |
| Validade do access token | {{15 min}} |
| Renovação | {{Refresh token rotativo, apenas no servidor}} |
| Scopes | `encomendas:ler`, `encomendas:escrever`, `encomendas:aprovar` |
| Máquina-a-máquina | {{Client Credentials}} |

| Endpoint | Scope necessário | Regra adicional |
|---|---|---|
| `GET /encomendas` | `encomendas:ler` | Só do próprio tenant |
| `POST /encomendas/{id}/aprovacao` | `encomendas:aprovar` | RN-02 (limite por valor) |

---

## 4. Limites de utilização (rate limiting)

| Plano | Limite | Janela | Excesso |
|---|---|---|---|
| Anónimo | 20 | minuto | 429 |
| Autenticado | 600 | minuto | 429 |
| Máquina-a-máquina | 6000 | minuto | 429 |

---

## 5. Versionamento e deprecação

| Regra | Detalhe |
|---|---|
| Compatível (sem nova versão) | Adicionar campo opcional na resposta; adicionar endpoint; adicionar valor de enum **documentado como extensível** |
| Incompatível (nova versão) | Remover/renomear campo; alterar tipo; tornar campo obrigatório; alterar semântica |
| Período de deprecação | {{12 meses}} |
| Sinalização | Cabeçalho `Deprecation: true` + `Sunset: <data>` + `Link: <doc>` |

**Registo de deprecações**
| Elemento | Depreciado em | Fim de vida | Substituto |
|---|---|---|---|
| {{`GET /v1/pedidos`}} | {{data}} | {{data}} | {{`GET /v1/encomendas`}} |

---

## 6. Webhooks

| Aspeto | Decisão |
|---|---|
| Eventos | `encomenda.aprovada`, `encomenda.cancelada`, `encomenda.expedida` |
| Assinatura | HMAC-SHA256 no cabeçalho `X-Signature`, com timestamp para evitar replay |
| Retentativas | {{5 tentativas com backoff exponencial até 24 h}} |
| Garantia | **Pelo menos uma vez** — o recetor deve ser idempotente por `event_id` |
| Timeout esperado do recetor | {{5 s}} |

```json
{
  "event_id": "018f2c...",
  "tipo": "encomenda.aprovada",
  "ocorrido_em": "2026-08-20T14:30:00Z",
  "dados": { "encomenda_id": "018f2b...", "total_cents": 750000, "moeda": "EUR" }
}
```

---

## 7. Especificação OpenAPI

Ficheiro-fonte: `openapi.yaml` (fonte de verdade; a documentação é gerada a partir dele).

```yaml
openapi: 3.1.0
info:
  title: {{API de Encomendas}}
  version: 1.0.0
  description: {{...}}
servers:
  - url: https://api.{{dominio}}/v1
    description: Producao
  - url: https://api.staging.{{dominio}}/v1
    description: Staging
paths:
  /encomendas:
    get:
      summary: Lista encomendas
      operationId: listarEncomendas
      tags: [Encomendas]
      security: [{ bearerAuth: [encomendas:ler] }]
      parameters:
        - { name: estado, in: query, schema: { type: string, enum: [RASCUNHO, APROVADA, CANCELADA] } }
        - { name: limite, in: query, schema: { type: integer, default: 25, maximum: 100 } }
        - { name: cursor, in: query, schema: { type: string } }
      responses:
        '200':
          description: Lista paginada
          content:
            application/json:
              schema: { $ref: '#/components/schemas/ListaEncomendas' }
        '401': { $ref: '#/components/responses/NaoAutenticado' }
components:
  securitySchemes:
    bearerAuth: { type: http, scheme: bearer, bearerFormat: JWT }
  schemas:
    Dinheiro:
      type: object
      required: [montante_cents, moeda]
      properties:
        montante_cents: { type: integer, format: int64, example: 750000 }
        moeda: { type: string, pattern: '^[A-Z]{3}$', example: EUR }
  responses:
    NaoAutenticado:
      description: Token ausente ou inválido
      content:
        application/problem+json:
          schema: { $ref: '#/components/schemas/Problema' }
```

**Verificações no CI**
- [ ] `openapi.yaml` valida contra o esquema OpenAPI 3.1
- [ ] Testes de contrato entre cliente e servidor
- [ ] Deteção de alterações incompatíveis face à versão publicada
- [ ] Todos os endpoints têm exemplos e descrição
