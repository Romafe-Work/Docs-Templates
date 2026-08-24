# Manual do Utilizador — {{PRODUTO}}

**Versão do produto:** {{1.0}} · **Atualizado em:** {{AAAA-MM-DD}}

> **Como está organizado este manual** — segue o modelo [Diátaxis](https://diataxis.fr/):
> - **Tutoriais** (§2) — aprender fazendo, do zero
> - **Guias práticos** (§3) — resolver um problema concreto
> - **Referência** (§4) — consultar detalhes
> - **Explicações** (§5) — compreender conceitos
>
> Não mistures os quatro: um tutorial que explica teoria a meio perde o aluno; uma referência com narrativa não se consulta.

---

## 1. Antes de começar

### O que é o {{produto}}
{{2-3 frases em linguagem simples, sem jargão.}}

### Requisitos
| Requisito | Detalhe |
|---|---|
| Browser | {{Chrome, Firefox, Safari ou Edge — últimas 2 versões}} |
| Ligação | {{...}} |
| Conta | {{Fornecida pelo administrador da tua organização}} |

### Primeiro acesso
1. {{...}}
2. {{...}}

---

## 2. Tutoriais (aprender fazendo)

### Tutorial 1 — {{Criar a tua primeira encomenda}}

> **Vais aprender:** a criar, submeter e acompanhar uma encomenda.
> **Tempo:** {{10 minutos}}
> **Precisas de:** uma conta com o papel {{Cliente}}.

#### Passo 1 — Aceder à área de encomendas
{{Instrução clara, uma ação por passo.}}

![{{Descrição da imagem para leitores de ecrã}}]({{caminho}})

> ✅ **Deves ver:** {{descrição do que confirma que o passo correu bem}}

#### Passo 2 — {{...}}

> ⚠️ **Atenção:** {{erro comum neste ponto e como o evitar}}

#### Passo 3 — {{...}}

#### O que aprendeste
- {{...}}

#### A seguir
- [Tutorial 2 — {{...}}](#tutorial-2--)
- [Como cancelar uma encomenda](#como-cancelar-uma-encomenda)

---

## 3. Guias práticos (resolver um problema)

> Formato: título começa por "Como…", pressupõe que já sabes o básico, vai direto ao assunto.

### Como cancelar uma encomenda
**Podes cancelar** enquanto a encomenda não tiver sido expedida.

1. {{...}}
2. {{...}}

**Se a encomenda já foi expedida:** {{contactar o apoio ao cliente através de {{...}}}}

### Como exportar encomendas para Excel
1. {{...}}

**Limite:** {{a exportação inclui no máximo 10 000 linhas; para mais, filtra por período}}

### Como {{...}}

---

## 4. Referência

### 4.1 Estados de uma encomenda

| Estado | O que significa | O que podes fazer |
|---|---|---|
| **Rascunho** | Ainda não foi submetida; só tu a vês | Editar, submeter, eliminar |
| **Submetida** | Enviada, a ser validada automaticamente | Aguardar |
| **Aguarda aprovação** | Valor acima de {{5 000 €}}; precisa de aprovação do gestor | Aguardar ou cancelar |
| **Aprovada** | Confirmada; stock reservado | Cancelar (até à expedição) |
| **Em preparação** | A ser preparada no armazém | Cancelar (até à expedição) |
| **Expedida** | A caminho | Acompanhar entrega |
| **Entregue** | Concluída | Consultar, devolver |
| **Cancelada** | Anulada a pedido | Consultar |
| **Rejeitada** | Não aprovada ou expirou o prazo | Consultar motivo, criar nova |

### 4.2 Papéis e permissões

| Ação | Cliente | Gestor | Administrador |
|---|---|---|---|
| Criar encomenda | ✓ | ✓ | ✓ |
| Ver encomendas próprias | ✓ | ✓ | ✓ |
| Ver encomendas de todos | — | ✓ | ✓ |
| Aprovar até {{25 000 €}} | — | ✓ | ✓ |
| Aprovar acima de {{25 000 €}} | — | — | ✓ |
| Gerir utilizadores | — | — | ✓ |

### 4.3 Campos de uma encomenda

| Campo | Obrigatório | Formato | Notas |
|---|---|---|---|
| Cliente | Sim | Seleção | Só clientes ativos |
| Referência interna | Não | Texto até 50 caracteres | Aparece na fatura |
| Data de entrega pretendida | Sim | Data | Mínimo {{2 dias úteis}} |

### 4.4 Atalhos de teclado

| Atalho | Ação |
|---|---|
| {{`n`}} | Nova encomenda |
| {{`/`}} | Focar na pesquisa |
| {{`Esc`}} | Fechar janela |
| {{`?`}} | Ver todos os atalhos |

### 4.5 Limites

| Limite | Valor |
|---|---|
| Linhas por encomenda | {{500}} |
| Tamanho de anexo | {{10 MB}} |
| Exportação | {{10 000 linhas}} |

---

## 5. Explicações (compreender)

### Porque é que algumas encomendas precisam de aprovação
{{Explica a política de negócio em linguagem simples: acima de certo valor, a organização exige uma segunda pessoa a confirmar. Não é desconfiança — é controlo de risco financeiro. Ver a tabela de limites em §4.2.}}

### Como funciona a reserva de stock
{{Explica que a reserva acontece na aprovação, não na submissão, e o que isso significa na prática: entre submeter e aprovar, o stock pode esgotar.}}

---

## 6. Resolução de problemas

| Problema | Causa provável | Solução |
|---|---|---|
| Não consigo entrar | Palavra-passe errada ou conta bloqueada | Aguarda 15 min ou usa "Recuperar palavra-passe" |
| "Stock insuficiente" mas o site mostrava disponível | Outra pessoa reservou entretanto | Reduz a quantidade ou escolhe outra data |
| A encomenda está "Aguarda aprovação" há muito tempo | O gestor ainda não a viu | Contacta o gestor; expira em {{48 h}} |
| Não recebi o e-mail de confirmação | Filtro de spam ou e-mail incorreto | Verifica o spam; confirma o e-mail no perfil |
| A página não carrega | Cache do browser ou manutenção | {{Ctrl+Shift+R}}; consulta {{página de estado}} |

**Ainda com problemas?** {{Contacto de suporte}} — inclui: o que estavas a fazer, o que esperavas, o que aconteceu, e uma captura de ecrã.

---

## 7. Acessibilidade

Este produto foi desenhado para cumprir {{WCAG 2.2 nível AA}}.

- Navegação completa por teclado (`Tab`, `Shift+Tab`, `Enter`, `Esc`)
- Compatível com leitores de ecrã ({{NVDA, JAWS, VoiceOver}})
- Contraste adequado; funciona com zoom até 200%
- {{Modo de contraste elevado disponível em Definições}}

**Encontraste uma barreira de acessibilidade?** {{contacto}} — tratamos estes reportes com prioridade.

---

## 8. Glossário

| Termo | Significado |
|---|---|
| {{Encomenda}} | {{Pedido de fornecimento com preço e prazo acordados}} |
| {{Reserva}} | {{Stock separado para a tua encomenda; não pode ser vendido a outros}} |
