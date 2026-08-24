# Acessibilidade — {{PROJETO}}

> **Norma alvo:** {{WCAG 2.2 nível AA}} · **Data:** {{AAAA-MM-DD}} · **Dono:** {{nome}}
> **Obrigação legal:** {{DL 83/2018 — organismos públicos | EAA 2025 | interna}}

---

## 1. Porque isto não é opcional

Além da obrigação legal onde ela existe, quase tudo o que torna uma aplicação
acessível torna-a melhor para toda a gente: contraste suficiente serve quem usa
o telemóvel ao sol; navegação por teclado serve quem trabalha depressa; texto
que cresce serve quem esqueceu os óculos.

**O caso que decide:** um operador com uma mão ocupada, num armazém mal
iluminado, com luvas. Não tem deficiência nenhuma e precisa exactamente das
mesmas coisas.

---

## 2. Critérios aplicáveis — lista verificável

### 2.1 Percetível

| Critério | O que exige | Como se verifica | ☐ |
|---|---|---|---|
| Texto alternativo | Toda a imagem informativa tem alternativa; decorativa tem `alt=""` | Inspeção | ☐ |
| Contraste (mínimo) | Texto ≥ 4,5:1; texto grande ≥ 3:1 | {{ferramenta}} | ☐ |
| Contraste não-textual | Ícones, bordas de campos, gráficos ≥ 3:1 | {{ferramenta}} | ☐ |
| A cor não é o único meio | Todo o estado tem texto ou forma além da cor | Ver a ecrã em tons de cinzento | ☐ |
| Redimensionar texto | Até 200% sem perder conteúdo nem função | Zoom do browser | ☐ |
| Refluxo | 320 px de largura sem deslizamento horizontal | Redimensionar | ☐ |
| Espaçamento de texto | Suporta ajuste de linha/letra/parágrafo | {{bookmarklet}} | ☐ |

### 2.2 Operável

| Critério | O que exige | Como se verifica | ☐ |
|---|---|---|---|
| Só teclado | Tudo o que se faz com rato faz-se com teclado | Desligar o rato e usar a aplicação | ☐ |
| Sem armadilha de foco | O foco entra e sai de qualquer componente | Tab e Shift+Tab | ☐ |
| Foco visível | O elemento com foco vê-se sempre, com ≥ 3:1 | Percorrer com Tab | ☐ |
| Saltar para o conteúdo | Existe forma de saltar a navegação repetida | Primeiro Tab da página | ☐ |
| Títulos e etiquetas | Descrevem o conteúdo ou o objetivo | Inspeção | ☐ |
| Alvo mínimo | {{24 × 24}} px (AA) — {{44 × 44}} recomendado | Medição | ☐ |
| Tempo suficiente | Sessões avisam antes de expirar e deixam prolongar | Teste | ☐ |
| Sem convulsões | Nada pisca mais de 3× por segundo | Inspeção | ☐ |

### 2.3 Compreensível

| Critério | O que exige | Como se verifica | ☐ |
|---|---|---|---|
| Idioma da página | `lang="pt-PT"` declarado | Código | ☐ |
| Sem mudanças de contexto inesperadas | Focar ou alterar um campo não navega sozinho | Teste | ☐ |
| Identificação de erros | O erro é descrito em texto e associado ao campo | Submeter formulário inválido | ☐ |
| Sugestão de correção | Quando é conhecida, diz-se qual | Inspeção | ☐ |
| Prevenção de erros | Ações irreversíveis são reversíveis, verificadas ou confirmadas | Inspeção | ☐ |
| Ajuda consistente | O mesmo mecanismo de ajuda no mesmo sítio | Inspeção | ☐ |

### 2.4 Robusto

| Critério | O que exige | Como se verifica | ☐ |
|---|---|---|---|
| Nome, função, valor | Todo o controlo é anunciado corretamente | Leitor de ecrã | ☐ |
| Mensagens de estado | Erros e confirmações são anunciados sem mover o foco | Leitor de ecrã | ☐ |
| HTML válido | Sem `id` duplicados, aninhamento correto | {{validador}} | ☐ |

---

## 3. Como testar

| Camada | Ferramenta | Apanha | Frequência |
|---|---|---|---|
| Automática | {{axe / Lighthouse / pa11y}} | ~{{30%}} dos problemas | Cada PR, no CI |
| Teclado | Só o teclado, 10 minutos | Armadilhas de foco, ordem errada | Cada funcionalidade |
| Leitor de ecrã | {{NVDA no Windows / VoiceOver}} | Etiquetas erradas, anúncios em falta | Cada incremento |
| Zoom e refluxo | Browser a 200% e 320 px | Layouts que partem | Cada incremento |
| Com utilizadores | {{...}} | Tudo o resto | {{Por release}} |

> **Nenhuma ferramenta automática chega a 100%.** Uma pontuação de 100 no
> Lighthouse é o ponto de partida do teste manual, não a conclusão dele.

---

## 4. Estado atual

| Critério | Estado | Problema | Ação | Prazo |
|---|---|---|---|---|
| {{Contraste}} | {{✔ Conforme}} | — | — | — |
| {{Foco visível}} | {{✘ Falha}} | {{Removido no botão principal}} | {{Repor contorno}} | {{data}} |

**Declaração de acessibilidade:** {{obrigatória para organismos públicos —
publicar em /acessibilidade com estado de conformidade, conteúdo não acessível
e mecanismo de contacto}}.

---

## 5. Erros mais comuns, e a correção

| Erro | Porque acontece | Correção |
|---|---|---|
| `outline: none` no foco | Acha-se feio | Estilizar o foco, nunca removê-lo |
| Etiqueta só como *placeholder* | Parece mais limpo | Etiqueta visível, sempre |
| `div` com `onclick` | Mais rápido de escrever | Usar `button` |
| Ícone sem texto | Espaço | Etiqueta acessível obrigatória |
| Erro só a vermelho | Basta ver | Texto + ícone além da cor |
| Imagem com `alt` a repetir a legenda | Preencher por preencher | `alt=""` se é decorativa |
