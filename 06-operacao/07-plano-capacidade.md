# Plano de Capacidade — {{PROJETO}}

> **Data:** {{AAAA-MM-DD}} · **Dono:** {{nome}} · **Revisão:** {{trimestral}}

---

## 1. Para que serve

Responder a duas perguntas antes de elas serem urgentes: **quando é que isto
deixa de chegar?** e **o que se faz nessa altura?**

Um sistema que fica sem espaço em disco às 3 da manhã de um domingo custa muito
mais do que o disco que faltou.

---

## 2. Situação atual

| Recurso | Capacidade | Uso atual | % | Limite de alerta | Margem |
|---|---|---|---|---|---|
| CPU | {{2 vCPU}} | {{0,6}} | {{30%}} | {{70%}} | {{OK}} |
| Memória | {{4 GB}} | {{2,4 GB}} | {{60%}} | {{80%}} | {{OK}} |
| Disco — dados | {{50 GB}} | {{18 GB}} | {{36%}} | {{75%}} | {{OK}} |
| Disco — ficheiros | {{100 GB}} | {{62 GB}} | {{62%}} | {{75%}} | **{{Atenção}}** |
| Ligações à BD | {{20}} | {{14 pico}} | {{70%}} | {{80%}} | **{{Atenção}}** |
| {{Envios de e-mail/mês}} | {{10 000}} | {{3 200}} | {{32%}} | — | OK |

---

## 3. Crescimento observado

| Métrica | Há 6 meses | Hoje | Crescimento | Base |
|---|---|---|---|---|
| Utilizadores ativos | {{40}} | {{62}} | {{+55%}} | Medido |
| Registos na tabela {{maior}} | {{120 k}} | {{310 k}} | {{+158%}} | Medido |
| Ficheiros armazenados | {{8 GB}} | {{62 GB}} | {{+675%}} | Medido |
| Pedidos/dia | {{12 k}} | {{19 k}} | {{+58%}} | Medido |

> **O que cresce mais depressa raramente é o que se esperava.** Aqui são os
> ficheiros, não os utilizadores — e é o armazenamento que esgota primeiro.

---

## 4. Projeção

| Recurso | Hoje | +6 meses | +12 meses | +24 meses | Esgota em |
|---|---|---|---|---|---|
| Disco — ficheiros | {{62 GB}} | {{95 GB}} | {{145 GB}} | {{280 GB}} | **{{~7 meses}}** |
| Disco — dados | {{18 GB}} | {{26 GB}} | {{37 GB}} | {{60 GB}} | {{~20 meses}} |
| Ligações à BD | {{14}} | {{18}} | {{23}} | {{...}} | **{{~9 meses}}** |

**Pressupostos:** {{crescimento linear com base nos últimos 6 meses; sem novos
módulos; sem alteração da política de retenção}}.

---

## 5. Ações planeadas

| # | Recurso | Ação | Quando | Custo | Dono |
|---|---|---|---|---|---|
| 1 | Ficheiros | {{Política de retenção: comprimir e arquivar > 2 anos}} | {{Antes de {{data}}}} | {{0}} | {{...}} |
| 2 | Ficheiros | {{Passar para armazenamento de objetos}} | {{Se a ação 1 não chegar}} | {{€/mês}} | {{...}} |
| 3 | Ligações à BD | {{Reduzir `CONN_MAX_AGE` / usar pool}} | {{...}} | {{0}} | {{...}} |

**Ordem de preferência:** apagar o que não é preciso → arrumar melhor →
comprar mais. Comprar primeiro adia o problema e aumenta a conta permanentemente.

---

## 6. Limites que não se veem no painel

Os que costumam apanhar de surpresa.

| Limite | Valor | Uso | Se atingir |
|---|---|---|---|
| {{Ficheiros por diretório}} | {{...}} | {{...}} | {{...}} |
| {{Tamanho máximo de pedido}} | {{...}} | {{...}} | {{Uploads grandes falham}} |
| {{Quota do plano de alojamento}} | {{...}} | {{...}} | {{Serviço suspenso}} |
| {{IDs sequenciais (int4)}} | {{2,1 mil M}} | {{...}} | {{Escritas param}} |
| {{Limite de envio do fornecedor de e-mail}} | {{...}} | {{...}} | {{Avisos não saem}} |

---

## 7. Picos previsíveis

| Evento | Quando | Multiplicador | Preparação |
|---|---|---|---|
| {{Fecho do mês}} | {{Últimos 2 dias}} | {{3×}} | {{...}} |
| {{Início de turno}} | {{08:00 diário}} | {{5×}} | {{...}} |
| {{Inventário anual}} | {{Dezembro}} | {{10×}} | {{Aumentar temporariamente}} |

---

## 8. Gatilhos de revisão

Rever este plano **antes** do prazo se:

- [ ] Qualquer recurso passar {{70%}}
- [ ] O crescimento mensal exceder {{o dobro}} da projeção
- [ ] Entrar um módulo novo ou uma integração
- [ ] O número de utilizadores aumentar mais de {{30%}} de uma vez
