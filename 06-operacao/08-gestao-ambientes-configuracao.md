# Gestão de Ambientes e Configuração — {{PROJETO}}

> **Data:** {{AAAA-MM-DD}} · **Dono:** {{nome}}

---

## 1. Ambientes

| Ambiente | Para quê | Dados | Quem acede | Como se publica | URL |
|---|---|---|---|---|---|
| **Local** | Desenvolvimento | {{Fictícios}} | {{Programadores}} | — | {{localhost}} |
| **Testes** | Verificação e UAT | {{Cópia anonimizada}} | {{Equipa + PO}} | {{Automático de `main`}} | {{...}} |
| **Pré-produção** | Ensaio final | {{Cópia de produção}} | {{Equipa}} | {{Manual}} | {{...}} |
| **Produção** | Uso real | {{Reais}} | {{Utilizadores}} | {{Manual, com aprovação}} | {{...}} |

**Regras:**

| Regra | Porquê |
|---|---|
| Nenhum ambiente escreve na base de dados de outro | Uma linha de configuração errada apaga produção |
| Dados de produção só saem anonimizados | [RGPD](../07-governanca/02-privacidade-rgpd.md) |
| Produção não recebe nada que não tenha passado por testes | — |
| Pré-produção é igual a produção na configuração, não só no código | A diferença é onde os problemas se escondem |

---

## 2. Configuração

### 2.1 Princípios

| # | Princípio |
|---|---|
| 1 | **A configuração vive no ambiente, não no código** — o mesmo artefacto corre em todos os ambientes |
| 2 | **Nenhum segredo no repositório**, nem no histórico |
| 3 | **Falta de configuração falha ao arrancar**, com mensagem clara — nunca silenciosamente com um valor por omissão perigoso |
| 4 | **Existe um exemplar completo versionado** (`.env.example`), sem valores reais |

### 2.2 Inventário

| Variável | Obrigatória | Segredo | Local | Testes | Produção | Efeito se errada |
|---|---|---|---|---|---|---|
| `{{DATABASE_URL}}` | Sim | **Sim** | {{sqlite}} | {{...}} | {{...}} | {{Não arranca}} |
| `{{DB_SCHEMA}}` | Não | Não | {{vazio}} | {{...}} | {{...}} | {{Tabelas no esquema errado}} |
| `{{DEBUG}}` | Sim | Não | `true` | `false` | `false` | **{{Expõe dados internos}}** |
| `{{SECRET_KEY}}` | Sim | **Sim** | {{...}} | {{...}} | {{...}} | {{Sessões inválidas}} |

### 2.3 Armadilhas conhecidas

| Armadilha | Sintoma | Prevenção |
|---|---|---|
| Password com `#`, `@`, `/` ou `?` num URL | O URL é mal interpretado e o servidor lido é outro | Codificar em percentagem (`%23`) |
| Dois ficheiros de configuração, um lido e outro não | Alterações sem efeito nenhum | Documentar **qual** é lido e por quem |
| Porta errada herdada de um exemplo | "Sem rota" que na verdade é porta fechada | Testar a porta antes de culpar a rede |
| Valor por omissão que funciona em local | Passa despercebido até produção | Obrigatório sem omissão |

---

## 3. Segredos

| Segredo | Onde vive | Quem acede | Rotação | Última rotação |
|---|---|---|---|---|
| {{Password da base de dados}} | {{cofre/variáveis do fornecedor}} | {{...}} | {{Anual}} | {{...}} |
| {{Chaves de API}} | {{...}} | {{...}} | {{...}} | {{...}} |

**Se um segredo for exposto:** {{revogar → rodar → verificar acessos → registar
como incidente}}. Apagar o commit não chega — está no histórico e em cada clone.

---

## 4. Paridade entre ambientes

| Aspeto | Igual em todos? | Diferença aceite |
|---|---|---|
| Versão da linguagem | Sim | — |
| Versão da base de dados | Sim | — |
| Sistema operativo | {{...}} | {{...}} |
| Volume de dados | Não | {{Testes tem {{10%}}}} |
| Recursos | Não | {{Testes é menor}} |

> Cada diferença é um sítio onde um problema se pode esconder até produção.
> As que existem devem ser deliberadas e estar nesta tabela.

---

## 5. Criar um ambiente de raiz

| Passo | Comando / ação | Verificação |
|---|---|---|
| 1 | {{...}} | {{...}} |
| 2 | {{...}} | {{...}} |

**Tempo alvo:** {{< 1 hora}} · **Última vez que foi feito de raiz:** {{data}}

> Se ninguém sabe quando foi a última vez, o procedimento provavelmente já não
> funciona. Vale a pena fazê-lo uma vez por ano, mesmo sem necessidade.
