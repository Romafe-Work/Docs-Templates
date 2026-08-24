# Sistema de Design (Design System) — {{PROJETO}}

> **Versão:** {{1.0}} · **Data:** {{AAAA-MM-DD}} · **Dono:** {{nome}}

---

## 1. Princípios

| # | Princípio | O que implica na prática |
|---|---|---|
| 1 | {{A informação antes da decoração}} | {{Nada de animação no caminho crítico}} |
| 2 | {{A cor reforça, nunca informa sozinha}} | {{Todo o estado tem texto ou ícone além da cor}} |
| 3 | {{Consistência acima de originalidade}} | {{Um padrão repetido vale mais que um melhor a cada ecrã}} |
| 4 | {{Legível de pé, com luvas, com má luz}} | {{Aplicável se houver uso no terreno}} |

---

## 2. Tokens

### 2.1 Cor

| Token | Valor | Uso | Contraste sobre fundo |
|---|---|---|---|
| `cor-texto` | {{#111111}} | Texto principal | {{16,1:1}} ✔ AAA |
| `cor-texto-fraco` | {{#6B6B6B}} | Texto secundário | {{5,3:1}} ✔ AA |
| `cor-fundo` | {{#FFFFFF}} | Fundo | — |
| `cor-primaria` | {{#...}} | Ação principal | {{...}} |
| `cor-erro` | {{#...}} | Erro | {{...}} |
| `cor-aviso` | {{#...}} | Aviso | {{...}} |
| `cor-sucesso` | {{#...}} | Confirmação | {{...}} |

**Mínimos obrigatórios:** texto normal ≥ 4,5:1 · texto grande (≥ 24 px ou 19 px
a negrito) ≥ 3:1 · elementos de interface ≥ 3:1.

### 2.2 Tipografia

| Token | Família | Tamanho | Peso | Altura de linha | Uso |
|---|---|---|---|---|---|
| `titulo-1` | {{...}} | {{28 px}} | {{700}} | {{1,2}} | Título de ecrã |
| `titulo-2` | {{...}} | {{20 px}} | {{700}} | {{1,3}} | Secção |
| `corpo` | {{...}} | {{16 px}} | {{400}} | {{1,5}} | Texto |
| `corpo-pequeno` | {{...}} | {{14 px}} | {{400}} | {{1,5}} | Legendas |
| `mono` | {{...}} | {{14 px}} | {{400}} | {{1,4}} | Códigos, matrículas |

**Nunca abaixo de 14 px** em texto que alguém tenha de ler. **16 px** é o mínimo
em telemóvel — abaixo disso o iOS amplia o ecrã sozinho ao focar um campo.

### 2.3 Espaçamento

Escala de {{4}} px: `{{4, 8, 12, 16, 24, 32, 48, 64}}`.
Não existem valores fora da escala. Se for preciso um, a escala é que está errada.

### 2.4 Outros

| Token | Valor |
|---|---|
| `raio-canto` | {{4 px}} |
| `sombra-1` | {{...}} |
| `largura-maxima-texto` | {{72 caracteres}} |
| `duracao-transicao` | {{150 ms}} |

---

## 3. Componentes

> Ficha por componente. Um componente sem estados especificados não está pronto.

### {{Botão}}

| Variante | Uso | Quantos por ecrã |
|---|---|---|
| Principal | Ação que o ecrã existe para fazer | **Um** |
| Secundário | Alternativa razoável | Vários |
| Destrutivo | Apaga ou é irreversível | Raro, sempre com confirmação |
| Texto | Ação terciária | Vários |

| Estado | Aspeto | Nota |
|---|---|---|
| Normal | {{...}} | |
| Sobrevoo | {{...}} | |
| **Foco por teclado** | {{contorno de 2 px, visível}} | **Nunca remover** |
| Pressionado | {{...}} | |
| Desativado | {{...}} | Contraste pode ser menor; explicar porquê está desativado |
| A processar | {{...}} | Impede duplo envio |

**Área tocável mínima:** {{44 × 44}} px. Em terminais industriais com luvas,
{{56 × 56}} px.

### {{Campo de texto}}

| Aspeto | Especificação |
|---|---|
| Etiqueta | Sempre visível; nunca só *placeholder* — desaparece ao escrever |
| Ajuda | Abaixo do campo, antes de haver erro |
| Erro | Abaixo, com ícone e texto, associado ao campo por `aria-describedby` |
| Obrigatório | Marcado no texto, não só com asterisco |

### {{Tabela}}

| Aspeto | Especificação |
|---|---|
| Cabeçalho | Fixo ao deslizar |
| Ordenação | Indicada visualmente e anunciada |
| Ecrã pequeno | {{Vira cartões}} ou {{desliza horizontalmente com a primeira coluna fixa}} |
| Vazia | Mensagem explicativa, não uma tabela sem linhas |

---

## 4. Padrões de interação

| Padrão | Regra |
|---|---|
| Guardar | {{Explícito, com botão}} ou {{automático com indicação visível}} — nunca ambíguo |
| Confirmação destrutiva | Nomeia o que vai ser apagado; botão diz a ação ("Abater viatura"), não "OK" |
| Feedback de sucesso | Visível ≥ {{3 s}}, sem tapar a ação seguinte |
| Erro de rede | Mantém o que o utilizador escreveu. **Perder o formulário é o pior erro possível** |
| Listas longas | Paginação de {{25}} ou deslizamento infinito com contagem visível |

---

## 5. Ícones e escrita

| Regra | |
|---|---|
| Ícone sozinho | Só com etiqueta acessível; e só se o significado for universal |
| Maiúsculas | {{Só a primeira letra}}, em botões e títulos |
| Números | Separador de milhares {{espaço}}; decimal {{vírgula}}; moeda {{1 234,56 €}} |
| Datas | {{DD/MM/AAAA}} no ecrã; ISO nos ficheiros e na API |

---

## 6. Onde vive a implementação

| Camada | Local |
|---|---|
| Tokens | {{ficheiro/variáveis CSS}} |
| Componentes | {{pasta}} |
| Exemplos vivos | {{Storybook / página de demonstração}} |

**Um design system que não está no código é um PDF.** Cada token desta página
tem de existir como variável, ou diverge na primeira semana.
