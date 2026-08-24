# Conteúdo e Microcopy — {{PROJETO}}

> **Data:** {{AAAA-MM-DD}} · **Dono:** {{nome}}

---

## 1. Tom de voz

| Somos | Não somos |
|---|---|
| {{Diretos}} | {{Secos}} |
| {{Claros}} | {{Condescendentes}} |
| {{Úteis quando algo corre mal}} | {{Alegres quando algo corre mal}} |

**Tratamento:** {{"você" implícito — "Guarde as alterações"}} ·
**Pessoa:** {{a aplicação não fala de si na primeira pessoa}}

---

## 2. Regras de escrita de interface

| Regra | Mau | Bom |
|---|---|---|
| O botão diz a ação, não confirma | `OK` | `Abater viatura` |
| Sem jargão técnico | `Erro 500 no endpoint` | `Não foi possível guardar. Tente outra vez.` |
| Sem culpar quem usa | `Introduziu um valor inválido` | `A matrícula tem o formato AA-00-AA.` |
| Diz o que fazer a seguir | `Falhou` | `Sem ligação. As alterações ficam guardadas e são enviadas quando houver rede.` |
| Nomeia o objeto | `Item apagado` | `Viatura AA-00-AA abatida.` |
| Números concretos | `O ficheiro é demasiado grande` | `O ficheiro tem 12 MB; o limite é 5 MB.` |

---

## 3. Catálogo de mensagens

### 3.1 Erros

| Código | Situação | Mensagem | Ação oferecida |
|---|---|---|---|
| {{E-01}} | {{Sem ligação}} | {{"Sem ligação à rede. O que escreveu está guardado."}} | {{Repetir}} |
| {{E-02}} | {{Sessão expirada}} | {{"A sessão terminou por inactividade. Entre outra vez para continuar."}} | {{Entrar}} |
| {{E-03}} | {{Sem permissão}} | {{"Não tem permissão para {{ação}}. Peça a um gestor."}} | — |
| {{E-04}} | {{Duplicado}} | {{"Já existe uma viatura com a matrícula {{valor}}."}} | {{Ver a existente}} |
| {{E-05}} | {{Erro do servidor}} | {{"Algo correu mal do nosso lado. Já fomos avisados."}} | {{Repetir}} |

### 3.2 Estados vazios

| Ecrã | Mensagem | Ação |
|---|---|---|
| {{Lista de viaturas}} | {{"Ainda não há viaturas registadas."}} | {{"Registar a primeira"}} |
| {{Pesquisa sem resultados}} | {{"Nada encontrado para «{{termo}}»."}} | {{"Limpar pesquisa"}} |

> Um estado vazio é uma oportunidade de ensinar. Uma lista vazia sem explicação
> parece uma avaria.

### 3.3 Confirmações

| Ação | Pergunta | Botão que confirma | Botão que cancela |
|---|---|---|---|
| {{Abater viatura}} | {{"Abater a viatura {{matrícula}}? O histórico mantém-se, mas deixa de poder ser atribuída."}} | {{"Abater"}} | {{"Cancelar"}} |

### 3.4 Sucesso

| Ação | Mensagem | Duração |
|---|---|---|
| {{Guardar}} | {{"Alterações guardadas."}} | {{3 s}} |

---

## 4. Terminologia — uma palavra por conceito

| Conceito | Usamos | Nunca usamos | Porquê |
|---|---|---|---|
| {{Veículo da frota}} | {{Viatura}} | {{Carro, veículo, unidade}} | {{É o termo do negócio}} |
| {{Pessoa que conduz}} | {{Condutor}} | {{Motorista, utilizador}} | {{...}} |

Alinhado com o [Glossário](../01-requisitos/06-glossario.md). **Se aqui e lá
divergirem, o glossário ganha** — e este documento atualiza-se.

---

## 5. Idiomas

| Idioma | Estado | Responsável |
|---|---|---|
| {{Português (PT)}} | {{Base}} | {{...}} |
| {{Inglês}} | {{...}} | {{...}} |

| Regra | |
|---|---|
| Chaves de tradução | {{`ecra.accao.elemento`}} — nunca o texto como chave |
| Plurais | Tratados pelo mecanismo de plurais, não por `if` |
| Datas, números, moeda | Formatados pela localidade, nunca concatenados à mão |
| Espaço | Alemão e finlandês crescem ~{{30%}}; o desenho tem de aguentar |
| Valores em base de dados | Guardados em {{inglês}}; só as etiquetas se traduzem |
