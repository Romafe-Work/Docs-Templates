# Guia de Diagramas UML e de Modelação

> Referência prática: **quando** usar cada diagrama, e sintaxe Mermaid pronta a copiar.

---

## Escolher o diagrama certo

| Pergunta que queres responder | Diagrama |
|---|---|
| Quem usa o sistema e para quê? | Casos de uso |
| Qual é a sequência de passos de um processo? | Fluxograma / atividade |
| Quem é responsável por cada passo? | Fluxograma com raias |
| Que mensagens trocam os componentes, e por que ordem? | Sequência |
| Em que estados pode estar esta entidade? | Estados |
| Que conceitos existem e como se relacionam? | Classes / domínio |
| Como estão os dados estruturados? | Entidade-Relação |
| Como é que o sistema está montado? | C4 / componentes / implantação |
| O que sente o utilizador ao longo do percurso? | User journey |
| Onde é que o tempo se perde? | Value stream / fluxograma anotado |

---

## 1. Casos de uso

```mermaid
flowchart LR
    A(("Ator")) --> UC1(["UC-01 Fazer algo"])
    A --> UC2(["UC-02 Fazer outra coisa"])
    UC1 -.->|include| UC3(["UC-03 Validar"])
    UC2 -.->|extend| UC4(["UC-04 Caso especial"])
```

**Regras:** o nome do caso de uso é sempre `verbo + objeto` na perspetiva do ator; evita nomes técnicos ("Gravar registo na BD" não é caso de uso).

---

## 2. Classes / modelo de domínio

```mermaid
classDiagram
    class Encomenda {
        +String numero
        +Estado estado
        +Dinheiro total
        +Data criadaEm
        +submeter()
        +cancelar(motivo)
        +adicionarLinha(sku, qtd)
    }
    class LinhaEncomenda {
        +String sku
        +int quantidade
        +Dinheiro precoUnitario
        +subtotal() Dinheiro
    }
    class Cliente {
        +String nif
        +String nome
        +limiteCredito() Dinheiro
    }
    class Morada {
        +String rua
        +String codigoPostal
    }
    class Estado {
        <<enumeration>>
        RASCUNHO
        SUBMETIDA
        APROVADA
        CANCELADA
    }

    Encomenda "1" *-- "1..*" LinhaEncomenda : contem
    Cliente "1" o-- "0..*" Encomenda : realiza
    Encomenda --> Morada : entregaEm
    Encomenda --> Estado

    note for Encomenda "Raiz de agregado.<br/>Invariante: total = soma dos subtotais"
```

**Notação de relações**
| Símbolo | Significado |
|---|---|
| `*--` | Composição — a parte não existe sem o todo |
| `o--` | Agregação — a parte existe independentemente |
| `-->` | Associação direcionada |
| `<|--` | Herança |
| `..>` | Dependência |

---

## 3. Componentes

```mermaid
flowchart TB
    subgraph Frontend
        SPA[Web SPA]
        MOB[App Movel]
    end
    subgraph Backend
        GW[API Gateway]
        AUTH[Servico Auth]
        ORD[Servico Encomendas]
        INV[Servico Inventario]
        NOT[Servico Notificacoes]
    end
    subgraph Dados
        PG[(PostgreSQL)]
        RD[(Redis)]
        MQ[[Fila de mensagens]]
    end

    SPA --> GW
    MOB --> GW
    GW --> AUTH
    GW --> ORD
    ORD --> INV
    ORD --> PG
    ORD --> MQ
    MQ --> NOT
    AUTH --> RD
```

---

## 4. Implantação (deployment)

```mermaid
flowchart TB
    subgraph Internet
        U[Utilizadores]
    end
    subgraph Cloud["{{Cloud}} — Regiao {{eu-west-1}}"]
        CDN[CDN]
        LB[Load Balancer]
        subgraph AZ1["Zona A"]
            P1[Pod api x3]
        end
        subgraph AZ2["Zona B"]
            P2[Pod api x3]
        end
        DB[(Base de dados primaria)]
        DBR[(Replica de leitura)]
        S3[(Object storage)]
    end

    U --> CDN --> LB
    LB --> P1
    LB --> P2
    P1 --> DB
    P2 --> DB
    DB -.replicacao.-> DBR
    P1 --> S3
```

---

## 5. Entidade-Relação

```mermaid
erDiagram
    CLIENTE ||--o{ ENCOMENDA : realiza
    ENCOMENDA ||--|{ LINHA_ENCOMENDA : contem
    PRODUTO ||--o{ LINHA_ENCOMENDA : referenciado_em
    CLIENTE {
        uuid id PK
        string nif UK
        string nome
        timestamp criado_em
    }
    ENCOMENDA {
        uuid id PK
        uuid cliente_id FK
        string numero UK
        string estado
        numeric total
    }
```

**Cardinalidade:** `||` exatamente um · `o|` zero ou um · `}|` um ou muitos · `o{` zero ou muitos

---

## 6. Timeline / marcos

```mermaid
timeline
    title Evolucao do sistema
    2024 : Lancamento MVP
         : 100 clientes
    2025 : Integracao ERP
         : Multi-idioma
    2026 : Migracao para microsservicos
```

---

## 7. Mapa mental (exploração inicial)

```mermaid
mindmap
  root((Sistema de<br/>Encomendas))
    Clientes
      Registo
      Perfis
      Historico
    Encomendas
      Criacao
      Aprovacao
      Cancelamento
    Inventario
      Stock
      Reservas
    Relatorios
      Operacional
      Financeiro
```

---

## 8. Dicas de manutenção

- **Diagrama desatualizado é pior que nenhum.** Se não conseguires manter, gera-o a partir do código (ex.: `openapi` → diagramas, ferramentas de introspeção de BD).
- Mantém os diagramas **junto do código** que descrevem, não num wiki separado.
- Um diagrama = uma mensagem. Se precisas de legenda de 10 linhas, divide-o.
- Evita caracteres acentuados dentro de nós Mermaid em alguns renderizadores antigos; usa aspas `["Texto com acentuação"]` quando necessário.
- Verifica a renderização no destino final antes de dar por concluído.
