# Diagramas de Sequência — Cenários Técnicos

> Complementa [Fluxos e Processos](../02-analise/03-fluxos-processo.md), que cobre a perspetiva de negócio. Aqui documenta-se a interação **técnica** entre componentes.

---

## 1. Autenticação OIDC (Authorization Code + PKCE)

```mermaid
sequenceDiagram
    autonumber
    actor U as Utilizador
    participant B as Browser (SPA)
    participant A as API
    participant I as Fornecedor Identidade

    U->>B: Clica "Entrar"
    B->>B: Gera code_verifier e code_challenge
    B->>I: Redireciona /authorize<br/>(client_id, code_challenge, state)
    I->>U: Formulario de autenticacao
    U->>I: Credenciais (+ MFA)
    I->>B: Redireciona callback?code=...&state=...
    B->>B: Valida state
    B->>A: POST /auth/token {code, code_verifier}
    A->>I: POST /token (code, code_verifier, client_secret)
    I-->>A: {id_token, access_token, refresh_token}
    A->>A: Valida assinatura, iss, aud, exp, nonce
    A->>A: Cria/atualiza utilizador local
    A-->>B: Set-Cookie: sessao (HttpOnly, Secure, SameSite=Lax)
    B-->>U: Painel principal

    Note over A,I: refresh_token guardado apenas no servidor
```

---

## 2. Renovação de token e sessão expirada

```mermaid
sequenceDiagram
    autonumber
    participant B as SPA
    participant A as API
    participant I as IdP

    B->>A: GET /encomendas (cookie de sessao)
    A->>A: access_token expirado?
    alt Ainda valido
        A-->>B: 200 dados
    else Expirado, refresh valido
        A->>I: POST /token (grant_type=refresh_token)
        I-->>A: novo access_token
        A->>A: Atualiza sessao
        A-->>B: 200 dados
    else Refresh invalido/revogado
        A-->>B: 401 {code: "SESSAO_EXPIRADA"}
        B->>B: Limpa estado local
        B-->>B: Redireciona para /login
    end
```

---

## 3. Escrita idempotente

```mermaid
sequenceDiagram
    autonumber
    participant C as Cliente
    participant A as API
    participant D as Base de Dados

    C->>A: POST /encomendas<br/>Idempotency-Key: abc-123
    A->>D: SELECT resposta FROM idempotencia WHERE chave='abc-123'
    alt Chave nao existe
        D-->>A: vazio
        A->>D: BEGIN
        A->>D: INSERT idempotencia (chave, estado=EM_CURSO)
        A->>D: INSERT encomenda
        A->>D: UPDATE idempotencia SET estado=CONCLUIDO, resposta=...
        A->>D: COMMIT
        A-->>C: 201 Created
    else Chave existe, concluida
        D-->>A: resposta guardada
        A-->>C: 201 (mesma resposta, sem duplicar)
    else Chave existe, em curso
        D-->>A: estado=EM_CURSO
        A-->>C: 409 Conflict + Retry-After
    end
```

---

## 4. Processamento assíncrono com garantia de entrega (Outbox)

```mermaid
sequenceDiagram
    autonumber
    participant A as API
    participant D as Base de Dados
    participant R as Relay (poller)
    participant Q as Broker
    participant W as Worker

    rect rgb(235, 245, 255)
        Note over A,D: Transacao unica
        A->>D: BEGIN
        A->>D: INSERT encomenda
        A->>D: INSERT outbox (evento EncomendaAprovada)
        A->>D: COMMIT
    end

    loop a cada 500 ms
        R->>D: SELECT * FROM outbox WHERE publicado=false LIMIT 100
        D-->>R: eventos
        R->>Q: publica eventos
        Q-->>R: ack
        R->>D: UPDATE outbox SET publicado=true
    end

    Q->>W: entrega evento
    W->>W: Processa (idempotente por event_id)
    alt Sucesso
        W-->>Q: ack
    else Falha transitoria
        W-->>Q: nack
        Q->>Q: Reentrega com backoff (max 5)
        Note over Q: Apos 5 tentativas -> DLQ
    end
```

**Porquê Outbox:** evita a escrita dupla (gravar na BD *e* publicar no broker sem transação comum), onde uma falha entre as duas deixa o sistema inconsistente.

---

## 5. Circuit breaker sobre dependência externa

```mermaid
sequenceDiagram
    autonumber
    participant S as Servico
    participant CB as Circuit Breaker
    participant E as ERP externo

    S->>CB: chamada
    alt Estado FECHADO
        CB->>E: pedido (timeout 3 s)
        alt Sucesso
            E-->>CB: 200
            CB-->>S: resposta
        else Falha
            E--xCB: timeout
            CB->>CB: falhas++ (se >= 5 em 60 s -> ABERTO)
            CB-->>S: erro
        end
    else Estado ABERTO
        CB-->>S: erro imediato (sem chamar E)
        Note over CB: apos 30 s -> MEIO-ABERTO
    else Estado MEIO-ABERTO
        CB->>E: 1 pedido de teste
        alt Sucesso
            CB->>CB: -> FECHADO
        else Falha
            CB->>CB: -> ABERTO (novo periodo)
        end
    end
```

---

## 6. Upload de ficheiro com URL pré-assinado

```mermaid
sequenceDiagram
    autonumber
    actor U as Utilizador
    participant B as SPA
    participant A as API
    participant S as Object Storage
    participant W as Worker

    U->>B: Seleciona ficheiro
    B->>A: POST /anexos {nome, tipo, tamanho}
    A->>A: Valida tipo e tamanho (RNF)
    A->>S: Gera URL pre-assinado (PUT, 15 min)
    A-->>B: {anexoId, uploadUrl}
    B->>S: PUT ficheiro (direto, nao passa pela API)
    S-->>B: 200
    B->>A: POST /anexos/{id}/confirmar
    A->>S: HEAD (confirma existencia e tamanho)
    A->>A: Marca anexo como disponivel
    A-->>B: 200
    A->>W: Enfileira analise antivirus
    W->>S: Descarrega e analisa
    alt Limpo
        W->>A: Marca como validado
    else Infetado
        W->>S: Elimina objeto
        W->>A: Marca como rejeitado + alerta
    end
```

---

## 7. {{Cenário próprio}}
{{Copiar a estrutura acima}}
