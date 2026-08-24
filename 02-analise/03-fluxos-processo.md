# Fluxos e Processos — Catálogo de Diagramas

> Todos os diagramas em **Mermaid** para viverem no controlo de versões e serem revistos em PR. Renderizam no GitHub, GitLab e na maioria dos wikis.

**Convenções**
- Um diagrama por processo; se não cabe num ecrã, decompõe-se.
- Losango = decisão · Retângulo = atividade · Estádio `([ ])` = início/fim · Paralelogramo = dados
- Caminhos de erro assinalados a vermelho.
- Cada diagrama indica: âmbito, atores, gatilho e resultado.

---

## 1. Fluxograma de processo (as-is / to-be)

### 1.1 Processo atual (AS-IS) — {{Aprovação de encomenda}}

**Gatilho:** {{Cliente submete encomenda}} · **Resultado:** {{Encomenda aprovada ou rejeitada}}
**Tempo médio atual:** {{4 h}} · **Pontos de dor:** {{passos 3 e 5 são manuais}}

```mermaid
flowchart TD
    A([Encomenda submetida]) --> B[Rececionista imprime pedido]
    B --> C[Coloca no cacifo do gestor]
    C --> D{Gestor disponivel?}
    D -->|Nao| E[Aguarda ate ao dia seguinte]
    E --> D
    D -->|Sim| F[Gestor verifica stock no Excel]
    F --> G{Stock suficiente?}
    G -->|Nao| H[Telefona ao cliente]
    H --> I([Rejeitada])
    G -->|Sim| J[Assina e devolve]
    J --> K[Rececionista introduz no ERP]
    K --> L([Aprovada])

    style E fill:#ffe0e0,stroke:#c00
    style F fill:#ffe0e0,stroke:#c00
    style K fill:#ffe0e0,stroke:#c00
```

### 1.2 Processo futuro (TO-BE)

**Tempo-alvo:** {{5 min}} · **Ganho esperado:** {{eliminação de 3 passos manuais}}

```mermaid
flowchart TD
    A([Encomenda submetida]) --> B[Sistema valida dados]
    B --> C{Dados validos?}
    C -->|Nao| D[Devolve erros ao cliente]
    D --> A
    C -->|Sim| E[Consulta stock em tempo real]
    E --> F{Stock suficiente?}
    F -->|Nao| G[Sugere alternativas ou data futura]
    G --> H{Cliente aceita?}
    H -->|Nao| I([Cancelada])
    H -->|Sim| J
    F -->|Sim| J{Valor > 5000 EUR?}
    J -->|Nao| K[Aprovacao automatica]
    J -->|Sim| L[Envia para aprovacao do gestor]
    L --> M{Gestor aprova?}
    M -->|Nao| N([Rejeitada])
    M -->|Sim| K
    K --> O[Reserva stock]
    O --> P[Notifica cliente]
    P --> Q([Aprovada])

    style D fill:#ffe0e0,stroke:#c00
    style I fill:#ffe0e0,stroke:#c00
    style N fill:#ffe0e0,stroke:#c00
    style Q fill:#e0f7e0,stroke:#0a0
```

### 1.3 Comparação as-is / to-be
| Aspeto | AS-IS | TO-BE | Ganho |
|---|---|---|---|
| Passos manuais | {{5}} | {{1}} | {{−80%}} |
| Tempo médio | {{4 h}} | {{5 min}} | {{−98%}} |
| Taxa de erro | {{8%}} | {{<1%}} | |

---

## 2. Fluxo com raias (swimlanes) — responsabilidades

> Usa quando importa **quem** faz o quê. Cada raia é um ator, papel ou sistema.

```mermaid
flowchart TD
    subgraph Cliente
        A([Inicia pedido]) --> B[Preenche formulario]
        B --> C[Submete]
        J[Recebe confirmacao] --> K([Fim])
    end

    subgraph Sistema
        C --> D[Valida dados]
        D --> E{Requer aprovacao?}
        E -->|Nao| H[Regista encomenda]
        G --> H
        H --> I[Envia confirmacao]
        I --> J
    end

    subgraph Gestor
        E -->|Sim| F[Revê pedido]
        F --> G{Aprova?}
        G -->|Nao| L([Notifica rejeicao])
    end

    subgraph ERP_Externo
        H --> M[Sincroniza encomenda]
    end
```

---

## 3. Diagrama de sequência — interação entre componentes

> Mostra **ordem temporal** de mensagens. Ideal para APIs, integrações e fluxos assíncronos.

```mermaid
sequenceDiagram
    autonumber
    actor C as Cliente
    participant W as Web App
    participant A as API Gateway
    participant S as Servico Encomendas
    participant I as Servico Inventario
    participant P as Gateway Pagamento
    participant Q as Fila de Eventos

    C->>W: Submete encomenda
    W->>A: POST /encomendas
    A->>A: Valida token JWT
    A->>S: criarEncomenda(dados)

    S->>I: GET /stock?skus=...
    alt Stock disponivel
        I-->>S: 200 {disponivel: true}
        S->>I: POST /reservas
        I-->>S: 201 {reservaId}
    else Stock insuficiente
        I-->>S: 200 {disponivel: false}
        S-->>A: 409 Conflict
        A-->>W: 409 + alternativas
        W-->>C: "Sem stock. Ver alternativas?"
    end

    S->>P: Autoriza pagamento
    P-->>S: 200 {autorizacaoId}

    S->>S: Persiste encomenda (estado=Aprovada)
    S->>Q: Publica EncomendaCriada
    S-->>A: 201 {encomendaId}
    A-->>W: 201
    W-->>C: Confirmacao

    Note over Q: Processamento assincrono
    Q->>Q: Consumidor de notificacoes
    Q-->>C: E-mail de confirmacao
```

### 3.1 Sequência de erro / compensação (saga)

```mermaid
sequenceDiagram
    autonumber
    participant S as Servico Encomendas
    participant I as Inventario
    participant P as Pagamento

    S->>I: Reserva stock
    I-->>S: OK (reservaId)
    S->>P: Captura pagamento
    P--xS: 402 Recusado

    rect rgb(255, 235, 235)
        Note over S,I: Compensacao
        S->>I: Liberta reserva (reservaId)
        I-->>S: OK
        S->>S: Estado = Falha de pagamento
    end
```

---

## 4. Diagrama de estados — ciclo de vida de uma entidade

> Responde a: em que estados pode estar? que transições são legítimas? quem as pode fazer?

```mermaid
stateDiagram-v2
    [*] --> Rascunho: cliente inicia

    Rascunho --> Submetida: submeter()
    Rascunho --> [*]: eliminar()

    Submetida --> EmValidacao: automatico
    EmValidacao --> Aprovada: validacao OK e valor <= 5000
    EmValidacao --> AguardaAprovacao: valor > 5000
    EmValidacao --> Rejeitada: validacao falha

    AguardaAprovacao --> Aprovada: gestor aprova
    AguardaAprovacao --> Rejeitada: gestor rejeita
    AguardaAprovacao --> Rejeitada: timeout 48h

    Aprovada --> EmPreparacao: armazem inicia
    EmPreparacao --> Expedida: transportadora recolhe
    Expedida --> Entregue: confirmacao de entrega
    Expedida --> Devolvida: cliente devolve

    Aprovada --> Cancelada: cancelar() [antes de expedir]
    EmPreparacao --> Cancelada: cancelar() [antes de expedir]

    Entregue --> [*]
    Rejeitada --> [*]
    Cancelada --> [*]
    Devolvida --> [*]

    note right of AguardaAprovacao
        RN-02: acima de 5000 EUR
        exige aprovacao humana
    end note
```

### 4.1 Tabela de transições

| Estado origem | Evento | Guarda | Estado destino | Quem pode | Efeito colateral |
|---|---|---|---|---|---|
| Rascunho | submeter | linhas ≥ 1 | Submetida | Cliente | — |
| EmValidacao | — | valor ≤ 5000 | Aprovada | Sistema | Reserva stock; e-mail |
| AguardaAprovacao | aprovar | — | Aprovada | Gestor | Reserva stock; e-mail; auditoria |
| AguardaAprovacao | timeout | 48 h | Rejeitada | Sistema | E-mail; liberta pré-reserva |
| Aprovada | cancelar | ainda não expedida | Cancelada | Cliente, Gestor | Liberta stock; estorna pagamento |

### 4.2 Transições proibidas (testar explicitamente)
| Tentativa | Resultado esperado |
|---|---|
| Expedida → Rascunho | Erro `TRANSICAO_INVALIDA` |
| Cancelada → qualquer | Erro `ESTADO_TERMINAL` |

---

## 5. Diagrama de atividade com decisões paralelas

```mermaid
flowchart TD
    A([Encomenda aprovada]) --> F1{{Fork}}
    F1 --> B[Reservar stock]
    F1 --> C[Emitir fatura]
    F1 --> D[Agendar transporte]
    B --> J1{{Join}}
    C --> J1
    D --> J1
    J1 --> E[Marcar como pronta a expedir]
    E --> G([Fim])
```

---

## 6. Fluxo de dados (DFD nível 1)

```mermaid
flowchart LR
    C(("Cliente")) -->|dados da encomenda| P1["1.0<br/>Rececionar<br/>encomenda"]
    P1 -->|encomenda validada| D1[("D1 Encomendas")]
    P1 -->|consulta SKU| D2[("D2 Catalogo")]
    D1 -->|encomenda pendente| P2["2.0<br/>Aprovar<br/>encomenda"]
    G(("Gestor")) -->|decisao| P2
    P2 -->|encomenda aprovada| D1
    P2 -->|pedido de reserva| E1(("Sistema<br/>Inventario"))
    D1 -->|dados de expedicao| P3["3.0<br/>Expedir"]
    P3 -->|guia| E2(("Transportadora"))
    P3 -->|notificacao| C
```

---

## 7. Fluxo de navegação / ecrãs (UI flow)

```mermaid
flowchart TD
    L["/login"] --> D["/dashboard"]
    D --> LE["/encomendas"]
    LE --> DE["/encomendas/:id"]
    LE --> NE["/encomendas/nova"]
    NE --> S1["Passo 1<br/>Cliente"]
    S1 --> S2["Passo 2<br/>Linhas"]
    S2 --> S3["Passo 3<br/>Entrega"]
    S3 --> S4["Revisao"]
    S4 -->|confirmar| DE
    S4 -->|voltar| S3
    DE --> A["Modal:<br/>Cancelar"]
    L -.esqueceu palavra-passe.-> R["/recuperar"]
```

**Estados por ecrã a especificar:** vazio · a carregar · com dados · erro · sem permissão · offline

---

## 8. Mapa de integrações

```mermaid
flowchart TB
    subgraph Nosso["Nosso sistema"]
        API[API Gateway]
        SVC[Servicos de dominio]
        DB[(Base de dados)]
    end

    ERP[["ERP {{X}}<br/>REST, sincrono"]] <-->|encomendas, clientes| SVC
    PAY[["Gateway Pagamento<br/>REST + webhook"]] <-->|autorizacao| SVC
    MAIL[["Servico E-mail<br/>SMTP/API"]] <---|notificacoes| SVC
    IDP[["Fornecedor Identidade<br/>OIDC"]] <-->|autenticacao| API
    BI[["Data Warehouse<br/>batch noturno"]] <---|export CSV| DB
```

| Sistema | Direção | Protocolo | Frequência | Volume | Dono | Falha tolerada? |
|---|---|---|---|---|---|---|
| {{ERP}} | Bidirecional | REST/JSON | Tempo real | {{500/dia}} | {{Equipa X}} | Não — bloqueia criação |
| {{Pagamento}} | Saída + webhook | REST | Tempo real | {{300/dia}} | {{Fornecedor}} | Não |
| {{E-mail}} | Saída | API | Assíncrono | {{2000/dia}} | {{Fornecedor}} | Sim — fila com retry |
| {{DW}} | Saída | SFTP | Diário 02:00 | {{~1 GB}} | {{Equipa BI}} | Sim — recupera no dia seguinte |
