# Plano de Auditoria e Conformidade — {{PROJETO}}

> **Data:** {{AAAA-MM-DD}} · **Dono:** {{nome}} · **Revisão:** {{anual}}

---

## 1. Obrigações aplicáveis

| Norma / obrigação | Aplica-se porquê | Quem verifica | Frequência |
|---|---|---|---|
| {{RGPD}} | {{Trata dados pessoais}} | {{DPO}} | {{Anual}} |
| {{Acessibilidade — DL 83/2018}} | {{Serviço público}} | {{...}} | {{Anual}} |
| {{Política interna de segurança}} | {{...}} | {{...}} | {{Semestral}} |
| {{ISO 27001 / SOC 2}} | {{...}} | {{Auditor externo}} | {{...}} |

---

## 2. Registo de auditoria (audit log) da aplicação

### 2.1 O que se regista

| Evento | Registado | Retenção | Porquê |
|---|---|---|---|
| Entrada e saída de sessão | Sim | {{1 ano}} | {{Segurança}} |
| Tentativa de entrada falhada | Sim | {{1 ano}} | {{Deteção de ataque}} |
| Alteração de dados pessoais | Sim | {{5 anos}} | {{RGPD}} |
| Alteração de permissões | Sim | {{5 anos}} | {{...}} |
| Consulta de dados sensíveis | {{...}} | {{...}} | {{...}} |
| Exportação de dados | Sim | {{5 anos}} | {{...}} |
| Eliminação de registos | Sim | {{5 anos}} | {{...}} |

### 2.2 O que cada entrada contém

| Campo | Exemplo | Obrigatório |
|---|---|---|
| Quando | {{ISO 8601 com fuso}} | Sim |
| Quem | {{id do utilizador — não o nome, que muda}} | Sim |
| O quê | {{ação}} | Sim |
| Sobre o quê | {{tipo + id do objeto}} | Sim |
| Valor antes | {{...}} | {{Sim para alterações}} |
| Valor depois | {{...}} | {{Sim para alterações}} |
| De onde | {{IP, aplicação}} | {{...}} |

### 2.3 Regras

| Regra | Porquê |
|---|---|
| **Imutável** — só se acrescenta, nunca se altera nem se apaga | Um registo alterável não prova nada |
| Quem é auditado não pode apagar o seu registo | Separação de funções |
| Nunca contém passwords, tokens ou dados sensíveis em claro | O próprio registo passaria a ser um risco |
| Falha de escrita do registo é um incidente | Silêncio não é conformidade |

---

## 3. Calendário

| # | Verificação | Quando | Quem | Evidência produzida |
|---|---|---|---|---|
| A1 | Revisão de acessos e permissões | {{Trimestral}} | {{...}} | {{Lista revista e assinada}} |
| A2 | Teste de restauro de cópias de segurança | {{Trimestral}} | {{...}} | {{Relatório de exercício}} |
| A3 | Análise de vulnerabilidades | {{Mensal}} | {{...}} | {{Relatório}} |
| A4 | Revisão do registo de tratamentos RGPD | {{Anual}} | {{DPO}} | {{Registo atualizado}} |
| A5 | Verificação de acessibilidade | {{Anual}} | {{...}} | {{Declaração}} |
| A6 | Revisão de licenças de terceiros | {{Trimestral}} | {{...}} | {{SBOM}} |
| A7 | Teste de intrusão | {{Anual}} | {{Externo}} | {{Relatório}} |

---

## 4. Revisão de acessos

O controlo com melhor relação entre esforço e risco evitado.

| Passo | Ação |
|---|---|
| 1 | Extrair a lista de contas ativas e respetivos papéis |
| 2 | Cruzar com a lista de pessoas ao serviço |
| 3 | Desactivar contas de quem saiu — **verificar a data de saída** |
| 4 | Confirmar que ninguém tem mais permissões do que o papel exige |
| 5 | Registar quem reviu e quando |

```sql
-- Contas ativas sem entrada há mais de 90 dias
SELECT username, last_login, role
  FROM {{accounts_user}}
 WHERE is_active
   AND (last_login IS NULL OR last_login < now() - interval '90 days')
 ORDER BY last_login NULLS FIRST;
```

---

## 5. Registo de conclusões

| # | Data | Verificação | Conclusão | Gravidade | Ação | Prazo | Estado |
|---|---|---|---|---|---|---|---|
| C-01 | {{...}} | {{A1}} | {{3 contas de ex-colaboradores ativas}} | Alta | {{Desactivar + rever processo de saída}} | {{...}} | {{...}} |

---

## 6. Preparação para auditoria externa

| Documento a ter pronto | Onde |
|---|---|
| Registo de tratamentos | [RGPD](02-privacidade-rgpd.md) |
| Modelo de ameaças e controlos | [Segurança](01-security.md) |
| Matriz de riscos | [Riscos](03-matriz-riscos.md) |
| Inventário de terceiros e SBOM | [Licenças](04-licencas-e-terceiros.md) |
| Evidências das verificações da §3 | {{...}} |
| Registo de incidentes | [Incidentes](../06-operacao/03-incidentes-postmortem.md) |
| Comprovativo de restauro testado | [Backup e DR](../06-operacao/05-backup-dr.md) |
