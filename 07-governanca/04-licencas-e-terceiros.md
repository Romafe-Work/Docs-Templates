# Licenças e Componentes de Terceiros — {{PROJETO}}

> **Data:** {{AAAA-MM-DD}} · **Dono:** {{nome}} · **Revisão:** {{trimestral}}

---

## 1. Licença do próprio projeto

| | |
|---|---|
| Licença | {{MIT / Apache-2.0 / proprietária}} |
| Titular dos direitos | {{...}} |
| Ficheiro | {{`LICENSE`}} |
| Cabeçalho nos ficheiros | {{Sim/Não}} |

---

## 2. Porque isto importa

Uma dependência com licença copyleft forte dentro de um produto distribuído
pode obrigar a publicar o código todo. Não é uma questão teórica: descobre-se
tipicamente na véspera de uma entrega, quando já não há tempo para substituir.

**Regra:** a licença verifica-se **quando a dependência entra**, não antes de
entregar.

---

## 3. Licenças — o que se pode e não se pode

| Licença | Uso interno | Distribuição | Obriga a publicar código | Decisão |
|---|---|---|---|---|
| MIT, BSD, ISC, Apache-2.0 | ✔ | ✔ | Não | **Livre** |
| MPL-2.0, LGPL | ✔ | ✔ | Só os ficheiros alterados | **Com cuidado** |
| GPL-2.0, GPL-3.0 | ✔ | ⚠ | Sim, se distribuído | **Aprovação necessária** |
| AGPL-3.0 | ⚠ | ⚠ | Sim, **mesmo em SaaS** | **Aprovação necessária** |
| Sem licença | ✘ | ✘ | — | **Proibido** — sem licença não há permissão |
| Comercial | Conforme contrato | Conforme contrato | — | Verificar termos |

> "Está no GitHub" não é uma licença. Código sem licença é código sem permissão
> de uso, por omissão da lei de direitos de autor.

---

## 4. Inventário de dependências (SBOM)

Gerado automaticamente. **Não manter à mão** — desactualiza-se numa semana.

| Ecossistema | Comando | Ficheiro |
|---|---|---|
| {{Python}} | `{{pip-licenses --format=csv}}` | {{...}} |
| {{Node}} | `{{npx license-checker --csv}}` | {{...}} |
| {{.NET}} | `{{...}}` | {{...}} |

| Componente | Versão | Licença | Direta? | Uso | Estado |
|---|---|---|---|---|---|
| {{django}} | {{6.0}} | BSD-3 | Sim | {{Framework}} | ✔ |
| {{...}} | {{...}} | {{...}} | {{...}} | {{...}} | {{...}} |

**Resumo**

| Licença | Nº de componentes |
|---|---|
| Permissivas | {{...}} |
| Copyleft fraco | {{...}} |
| Copyleft forte | {{...}} |
| Desconhecida | {{0 — qualquer valor > 0 é um bloqueio}} |

---

## 5. Obrigações de atribuição

Componentes que exigem incluir aviso de copyright no produto distribuído.

| Componente | Licença | Texto incluído em |
|---|---|---|
| {{...}} | {{MIT}} | {{ecrã "Sobre" / ficheiro `TERCEIROS.txt`}} |

---

## 6. Vulnerabilidades conhecidas

| Ferramenta | Onde corre | Frequência |
|---|---|---|
| {{Dependabot / pip-audit / npm audit}} | {{CI}} | {{Cada PR + semanal}} |

| Componente | Versão | CVE | Gravidade | Estado | Prazo |
|---|---|---|---|---|---|
| {{...}} | {{...}} | {{...}} | {{Alta}} | {{Em correção}} | {{...}} |

**Prazos de correção:** crítica {{7 dias}} · alta {{30 dias}} · média {{90 dias}}.

---

## 7. Componentes com risco de abandono

| Componente | Último lançamento | Manutenção | Risco | Alternativa |
|---|---|---|---|---|
| {{...}} | {{há 3 anos}} | {{1 pessoa}} | {{Alto}} | {{...}} |

---

## 8. Processo para acrescentar uma dependência

- [ ] Existe já algo no projeto que resolve isto?
- [ ] Licença verificada e na lista de permitidas
- [ ] Manutenção ativa ({{lançamento nos últimos 12 meses}})
- [ ] Sem vulnerabilidades críticas abertas
- [ ] Dimensão e dependências transitivas aceitáveis
- [ ] Registada no inventário
- [ ] Se copyleft forte: aprovada por {{...}}
