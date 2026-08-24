# Critérios de Aceitação e UAT

---

## 1. Como escrever bons critérios

### Formato Gherkin
```gherkin
Funcionalidade: {{Nome}}
  Como {{persona}}
  Quero {{capacidade}}
  Para {{benefício}}

  Contexto:
    Dado {{estado comum a todos os cenários}}

  Cenário: {{Nome descritivo do comportamento}}
    Dado {{pré-condição}}
    Quando {{ação}}
    Então {{resultado observável}}
    E {{resultado adicional}}

  Esquema do Cenário: {{Nome}}
    Quando introduzo <valor>
    Então vejo <resultado>
    Exemplos:
      | valor | resultado |
      | 1000  | aprovado  |
      | 5001  | pendente  |
```

### Regras
| Faz | Não faças |
|---|---|
| Descreve comportamento observável | Descrever implementação ("grava na tabela X") |
| Um cenário = um comportamento | Encadear 15 passos num cenário |
| Usa a linguagem do negócio | Usar jargão técnico |
| Inclui o caminho de erro | Cobrir só o caminho feliz |
| Torna verificável sem ambiguidade | "Deve funcionar bem" |

### Cobertura mínima por funcionalidade
- [ ] Caminho feliz
- [ ] Pelo menos um caminho de erro
- [ ] Valores-limite
- [ ] Estado vazio
- [ ] Permissões insuficientes
- [ ] Concorrência, quando aplicável

---

## 2. Exemplo completo

```gherkin
Funcionalidade: Aprovação de encomendas por valor
  Como gestor de encomendas
  Quero que encomendas acima de 5000 € exijam a minha aprovação
  Para controlar o risco financeiro

  Contexto:
    Dado que existe o cliente "Construções Silva" sem faturas vencidas
    E existe stock suficiente para todos os artigos

  Cenário: Encomenda abaixo do limite é aprovada automaticamente
    Dado uma encomenda no valor de 4999,99 €
    Quando o cliente submete a encomenda
    Então o estado passa a "Aprovada"
    E o stock é reservado
    E o cliente recebe um e-mail de confirmação
    E nenhuma notificação é enviada ao gestor

  Cenário: Encomenda acima do limite aguarda aprovação
    Dado uma encomenda no valor de 5000,01 €
    Quando o cliente submete a encomenda
    Então o estado passa a "Aguarda aprovação"
    E o gestor recebe uma notificação
    E o cliente vê "A aguardar aprovação"
    E o stock fica pré-reservado durante 48 horas

  Cenário: Gestor aprova encomenda pendente
    Dado uma encomenda de 7500 € em "Aguarda aprovação"
    Quando o gestor "Maria" a aprova
    Então o estado passa a "Aprovada"
    E o registo de auditoria indica que "Maria" aprovou
    E o cliente é notificado

  Cenário: Encomenda pendente expira após 48 horas
    Dado uma encomenda de 7500 € em "Aguarda aprovação" há 48 horas
    Quando o processo de expiração é executado
    Então o estado passa a "Rejeitada"
    E o stock pré-reservado é libertado
    E o cliente é notificado do motivo

  Cenário: Cliente sem permissão não pode aprovar
    Dado uma encomenda de 7500 € em "Aguarda aprovação"
    Quando o cliente tenta aprová-la
    Então a operação é recusada com erro de permissão
    E o estado não muda

  Esquema do Cenário: Limites de aprovação por papel
    Dado uma encomenda no valor de <valor> €
    Quando um utilizador com papel "<papel>" tenta aprovar
    Então o resultado é "<resultado>"

    Exemplos:
      | valor  | papel   | resultado |
      | 3000   | Gestor  | aprovado  |
      | 25000  | Gestor  | aprovado  |
      | 25001  | Gestor  | recusado  |
      | 25001  | Diretor | aprovado  |
```

---

## 3. Teste de Aceitação do Utilizador (UAT)

### 3.1 Planeamento
| Campo | Valor |
|---|---|
| Período | {{data}} – {{data}} |
| Ambiente | {{Staging com dados anonimizados}} |
| Participantes | {{5 utilizadores reais: 2 gestores, 3 clientes}} |
| Coordenador | {{Nome}} |
| Formação prévia | {{Sessão de 30 min + guia}} |

### 3.2 Cenários de UAT

#### UAT-01 — {{Criar e acompanhar uma encomenda}}
| | |
|---|---|
| **Persona** | {{Gestor}} |
| **Objetivo do participante** | {{"Encomenda 5 sacos de cimento para a obra da Rua X e confirma quando chegam."}} |
| **Sem instruções passo a passo** | O objetivo é observar se consegue sozinho |
| **Critério de sucesso** | Conclui em ≤ {{5 min}} sem ajuda |

**Grelha de observação**
| Aspeto | Registo |
|---|---|
| Concluiu? | Sim / Não / Com ajuda |
| Tempo | {{...}} |
| Onde hesitou | {{...}} |
| Erros cometidos | {{...}} |
| Comentários espontâneos | {{"..."}}  |
| Satisfação (1-5) | {{...}} |

### 3.3 Registo de resultados
| Cenário | Participante | Resultado | Tempo | Problemas | Gravidade |
|---|---|---|---|---|---|
| UAT-01 | P1 | Concluído | 3m20 | {{Procurou "Novo" no sítio errado}} | Baixa |
| UAT-01 | P2 | Com ajuda | 8m | {{Não percebeu o estado "Pendente"}} | **Alta** |

### 3.4 Decisão de aceitação
| Critério | Estado |
|---|---|
| ≥ 80% dos participantes concluem sem ajuda | {{4/5 = 80%}} ✓ |
| Sem problemas de gravidade Alta por resolver | {{1 por resolver}} ✗ |
| Satisfação média ≥ 4/5 | {{4,2}} ✓ |

**Decisão:** {{Aceite condicionalmente — resolver o problema de clareza do estado "Pendente" antes do GA.}}

| Nome | Papel | Decisão | Data | Assinatura |
|---|---|---|---|---|
| {{...}} | Product Owner | | | |
| {{...}} | Sponsor | | | |
