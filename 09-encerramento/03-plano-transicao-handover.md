# Plano de Transição e Entrega — {{PROJETO}}

> **De:** {{equipa de projeto}} **para:** {{equipa de manutenção}}
> **Data alvo:** {{AAAA-MM-DD}} · **Dono:** {{nome}}

---

## 1. O que se transfere

| Item | De | Para | Data | Estado |
|---|---|---|---|---|
| {{Código e repositório}} | {{...}} | {{...}} | {{...}} | {{...}} |
| {{Ambientes e acessos}} | {{...}} | {{...}} | {{...}} | {{...}} |
| {{Piquete e resposta a incidentes}} | {{...}} | {{...}} | {{...}} | {{...}} |
| {{Relação com fornecedores}} | {{...}} | {{...}} | {{...}} | {{...}} |
| {{Backlog e dívida técnica}} | {{...}} | {{...}} | {{...}} | {{...}} |

---

## 2. Documentação a entregar

| Documento | Onde | Verificado por quem recebe | ☐ |
|---|---|---|---|
| Arquitetura | [03-arquitetura](../03-arquitetura/01-documento-arquitetura.md) | {{...}} | ☐ |
| Decisões (ADR) | {{...}} | {{...}} | ☐ |
| Modelo de dados | {{...}} | {{...}} | ☐ |
| Setup do ambiente | [04-desenvolvimento](../04-desenvolvimento/01-setup-ambiente.md) | {{...}} | ☐ |
| Runbook | [06-operacao](../06-operacao/02-runbook.md) | {{...}} | ☐ |
| Backup e restauro | {{...}} | {{...}} | ☐ |
| Configuração e segredos | [Ambientes](../06-operacao/08-gestao-ambientes-configuracao.md) | {{...}} | ☐ |
| Guia de administração | [08-utilizador](../08-utilizador/04-guia-administracao.md) | {{...}} | ☐ |

**"Verificado por quem recebe" significa que essa pessoa seguiu o documento e
conseguiu.** Um documento entregue e não verificado é um documento que se
descobre estar errado no primeiro incidente, às 3 da manhã.

---

## 3. Verificação prática — as provas de transição

Cada uma feita **por quem recebe**, sozinho, com quem entrega apenas a observar.

| # | Prova | Critério | Feita | Por | Data |
|---|---|---|---|---|---|
| P1 | Montar o ambiente de raiz, só com a documentação | {{< 1 h, sem perguntar}} | ☐ | | |
| P2 | Publicar uma alteração trivial em produção | {{Do commit ao ar}} | ☐ | | |
| P3 | Restaurar a base de dados de uma cópia | {{Dentro do RTO}} | ☐ | | |
| P4 | Reverter uma publicação | {{...}} | ☐ | | |
| P5 | Responder a um alerta simulado usando o runbook | {{Sem escalar}} | ☐ | | |
| P6 | Criar uma conta e atribuir permissões | {{...}} | ☐ | | |
| P7 | Encontrar a causa de um erro em produção pelos registos | {{...}} | ☐ | | |

> **P1, P3 e P5 são as que apanham problemas.** As restantes costumam correr bem.

---

## 4. Conhecimento que não está escrito

O que vive na cabeça de quem construiu e desaparece quando essa pessoa sai.

| # | Assunto | Quem sabe | Como se transfere | Feito |
|---|---|---|---|---|
| 1 | {{Porque é que o módulo X é assim}} | {{...}} | {{ADR retroativo}} | ☐ |
| 2 | {{O truque para diagnosticar Y}} | {{...}} | {{Acrescentar ao runbook}} | ☐ |
| 3 | {{Quem contactar do lado do fornecedor}} | {{...}} | {{Registo de contactos}} | ☐ |

**Como se descobre o que falta:** quem recebe passa {{uma semana}} a resolver
casos reais e anota **cada vez que teve de perguntar**. Cada pergunta é uma
linha em falta na documentação.

---

## 5. Período de acompanhamento

| Fase | Duração | Quem entrega | Quem recebe |
|---|---|---|---|
| {{Sombra}} | {{2 semanas}} | Faz, explicando | Observa e pergunta |
| {{Sombra invertida}} | {{2 semanas}} | Observa | **Faz**, com apoio |
| {{Autonomia com apoio}} | {{4 semanas}} | Disponível a pedido | Faz sozinho |
| {{Autonomia}} | — | — | Faz sozinho |

**A segunda fase é a que conta.** Ver alguém fazer não ensina a fazer.

---

## 6. Contactos e responsabilidades depois da transição

| Assunto | Antes | Depois | A partir de |
|---|---|---|---|
| {{Incidentes}} | {{...}} | {{...}} | {{...}} |
| {{Alterações}} | {{...}} | {{...}} | {{...}} |
| {{Fornecedores}} | {{...}} | {{...}} | {{...}} |

**Período de contacto residual:** quem entrega continua contactável até
{{data}}, **só para o que não estiver documentado** — e cada contacto gera uma
correção na documentação, senão a dependência nunca acaba.

---

## 7. Critérios para dar a transição por concluída

- [ ] Todas as provas do §3 feitas por quem recebe
- [ ] Toda a documentação do §2 verificada
- [ ] Sem contactos a quem entrega há {{2 semanas}}
- [ ] Um incidente real resolvido sem escalar
- [ ] Uma publicação em produção feita sozinho
- [ ] Acessos de quem entrega revogados
- [ ] Piquete formalmente transferido

**Transição concluída em:** {{...}} · **Confirmado por:** {{quem recebe}}
