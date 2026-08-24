# Critérios de Conclusão (Definition of Done) — {{PROJETO}}

> **Data:** {{AAAA-MM-DD}} · **Acordado por:** {{equipa}} · **Revisão:** {{trimestral}}

---

## 1. Para que serve

"Pronto" significa coisas diferentes para quem escreve o código, para quem o
testa e para quem o vai usar. Esta lista existe para que passe a significar uma
só coisa — e para que ninguém tenha de perguntar.

**Regra:** a lista é acordada pela equipa, não imposta. Uma DoD que ninguém
cumpre é pior do que não haver nenhuma: ensina que as listas são decorativas.

---

## 2. Definition of Ready — antes de começar

Uma story só entra em trabalho se:

- [ ] O valor para quem a vai usar está escrito, e não é "porque foi pedido"
- [ ] Os critérios de aceitação estão escritos e são verificáveis
- [ ] As dependências estão identificadas e desbloqueadas
- [ ] O desenho de interface existe, se houver interface
- [ ] Foi estimada pela equipa que a vai fazer
- [ ] Cabe num {{incremento}} — se não cabe, divide-se primeiro

---

## 3. Definition of Done — por story

### Código
- [ ] Cumpre todos os critérios de aceitação
- [ ] Segue os [Padrões de Código](../04-desenvolvimento/03-padroes-codigo.md)
- [ ] Revisto por {{1}} pessoa que não a escreveu
- [ ] Sem `TODO`, código comentado ou de depuração
- [ ] Sem segredos no código nem no histórico

### Testes
- [ ] Testes automáticos escritos e a passar
- [ ] Cobertura do código novo ≥ {{80%}}
- [ ] Caminho de erro testado, não só o caminho feliz
- [ ] Todos os testes existentes continuam a passar

### Interface (se aplicável)
- [ ] Os cinco estados: vazio, a carregar, erro, sem permissão, parcial
- [ ] Navegável só por teclado
- [ ] Contraste verificado
- [ ] Testado em {{ecrã pequeno}} e {{grande}}

### Dados e segurança
- [ ] Migrações reversíveis e ensaiadas
- [ ] Entrada validada no servidor, e não só no cliente
- [ ] Autorização verificada — não basta esconder o botão
- [ ] Dados pessoais tratados segundo o [registo RGPD](../07-governanca/02-privacidade-rgpd.md)

### Documentação
- [ ] Documentação afetada atualizada **no mesmo PR**
- [ ] ADR escrito, se houve decisão estrutural
- [ ] Changelog atualizado

### Operação
- [ ] Regista o que é preciso para diagnosticar em produção
- [ ] Métricas e alertas, se a funcionalidade os justificar
- [ ] Comportamento definido quando a dependência externa falha

### Aceitação
- [ ] Demonstrado a {{PO}} e aceite
- [ ] A correr em {{ambiente de testes}}

---

## 4. Definition of Done — por incremento

Além de todas as stories cumprirem a lista acima:

- [ ] Testes ponta a ponta do fluxo completo a passar
- [ ] Sem defeitos de gravidade {{1 ou 2}} em aberto
- [ ] Desempenho verificado ({{ver plano de carga}})
- [ ] Notas de versão escritas
- [ ] Procedimento de reversão testado

---

## 5. Definition of Done — por entrada em serviço

- [ ] [Runbook](../06-operacao/02-runbook.md) escrito e testado por quem vai estar de piquete
- [ ] Monitorização e alertas ativos
- [ ] Cópias de segurança a correr e **restauro testado**
- [ ] Utilizadores formados
- [ ] Suporte sabe o que fazer nas primeiras {{2 semanas}}
- [ ] Plano de reversão escrito e ensaiado

---

## 6. Exceções

Uma story pode ser dada como concluída sem cumprir tudo **se**, e só se, a
exceção for registada:

| Story | Item não cumprido | Porquê | Dívida registada em | Prazo |
|---|---|---|---|---|
| {{...}} | {{...}} | {{...}} | {{...}} | {{...}} |

> Se esta tabela cresce todas as semanas, o problema não são as exceções — é a
> lista, que está desalinhada com a realidade. Reveja-se a lista.
