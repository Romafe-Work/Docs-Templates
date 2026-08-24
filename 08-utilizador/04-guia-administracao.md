# Guia de Administração — {{PRODUTO}}

> **Audiência:** quem administra a aplicação, não quem a usa.
> **Data:** {{AAAA-MM-DD}} · **Dono:** {{nome}}

---

## 1. Para quem é este guia

Este documento é para o **administrador funcional** — a pessoa que cria contas,
define permissões e mantém as tabelas de referência. Não é para o utilizador
final ([Manual do Utilizador](02-manual-utilizador.md)) nem para quem mantém os
servidores ([Runbook](../06-operacao/02-runbook.md)).

Se estiver a perguntar-se "sou eu?": se lhe pedem para dar acesso a alguém, é.

---

## 2. Papéis e o que cada um pode

| Papel | Pode | Não pode |
|---|---|---|
| {{Administrador}} | {{Tudo, incluindo gerir contas}} | — |
| {{Gestor}} | {{...}} | {{Criar contas}} |
| {{Utilizador}} | {{...}} | {{Ver dados de outros}} |

**Princípio:** dar o papel mais baixo que permita fazer o trabalho. Subir é
fácil e deixa registo; descobrir que alguém teve acesso a mais do que devia
durante meses, não.

---

## 3. Contas

### 3.1 Criar

| Passo | Ação | Nota |
|---|---|---|
| 1 | {{...}} | |
| 2 | {{Definir papel}} | {{Ver §2}} |
| 3 | {{Comunicar}} | {{Nunca enviar a password pelo mesmo canal que o utilizador}} |

### 3.2 Desactivar — nunca apagar

> **Desactivar, não apagar.** Apagar uma conta leva consigo o histórico de quem
> fez o quê, e é isso que permite responder a perguntas seis meses depois.

| Situação | Ação | Prazo |
|---|---|---|
| {{Colaborador saiu}} | {{Desactivar}} | **{{No próprio dia}}** |
| {{Ausência prolongada}} | {{Desactivar temporariamente}} | {{...}} |
| {{Mudança de funções}} | {{Alterar papel}} | {{...}} |

### 3.3 Reposição de password

{{Procedimento. Incluir como se confirma a identidade de quem pede — é o passo
que se salta e o que torna todo o resto inútil.}}

---

## 4. Tabelas de referência

Listas que alimentam as escolhas na aplicação.

| Tabela | O que contém | Quem mantém | Frequência |
|---|---|---|---|
| {{Marcas}} | {{...}} | {{Administrador}} | {{Quando entra uma nova}} |
| {{Centros de custo}} | {{...}} | {{...}} | {{...}} |

**Regras:**

| Regra | Porquê |
|---|---|
| **Desactivar, não apagar** — se estiver em uso | Apagar quebra o histórico |
| Verificar antes de criar | {{"VW" e "Volkswagen" ficam a contar como duas marcas}} |
| Renomear leva tudo atrás | Corrigir uma grafia corrige-a em todo o lado |

---

## 5. Tarefas periódicas

| Tarefa | Frequência | Como | Se não se fizer |
|---|---|---|---|
| {{Rever contas ativas}} | {{Trimestral}} | {{§3.2 + [Auditoria](../07-governanca/06-plano-auditoria.md)}} | {{Ex-colaboradores com acesso}} |
| {{Limpar duplicados nas listas}} | {{Mensal}} | {{...}} | {{Relatórios errados}} |
| {{Verificar avisos automáticos}} | {{Mensal}} | {{...}} | {{Prazos passam sem ninguém saber}} |

---

## 6. Problemas frequentes

| Sintoma | Causa provável | O que fazer | Quando escalar |
|---|---|---|---|
| {{"Não consigo entrar"}} | {{Conta desactivada / password}} | {{Ver §3}} | {{Se a conta está ativa e continua a falhar}} |
| {{"Não vejo a viatura X"}} | {{Papel ou atribuição}} | {{Verificar §2}} | {{...}} |
| {{"O relatório está errado"}} | {{Duplicados nas listas}} | {{Ver §4}} | {{Se os dados estiverem certos}} |

**Escalar para:** {{contacto}} · **Antes de escalar, reunir:** {{quem, quando,
o que estava a fazer, mensagem exacta, captura de ecrã}}.

---

## 7. O que **não** fazer

| Nunca | Porquê |
|---|---|
| Partilhar uma conta entre pessoas | O registo deixa de dizer quem fez o quê |
| Apagar registos para "limpar" | Perde-se o histórico e os relatórios anteriores mudam |
| Dar papel de administrador "temporariamente" | Temporário nunca acaba, e ninguém se lembra de reverter |
| Alterar dados diretamente na base de dados | Salta validações e registo de auditoria |
