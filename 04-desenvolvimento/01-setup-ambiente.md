# Ambiente de Desenvolvimento — {{PROJETO}}

> **Objetivo:** de repositório clonado a aplicação a correr em **≤ 30 minutos** (RNF-33). Se demorar mais, é um bug — abre uma issue.

---

## 1. Pré-requisitos

| Ferramenta | Versão | Como instalar | Verificar |
|---|---|---|---|
| {{Node.js}} | {{22.x}} | {{`nvm install`}} | `node -v` |
| {{Docker}} | {{≥ 24}} | {{...}} | `docker --version` |
| {{Docker Compose}} | {{v2}} | incluído | `docker compose version` |
| Git | ≥ 2.40 | | `git --version` |
| {{make}} | — | | `make --version` |

**Sistemas suportados:** {{macOS 14+, Ubuntu 22.04+, Windows 11 via WSL2}}
**Recursos mínimos:** {{8 GB RAM, 20 GB disco livre}}

---

## 2. Arranque rápido

```bash
git clone {{url-do-repositorio}}
cd {{projeto}}

cp .env.example .env      # preencher os segredos assinalados

make setup                # instala dependências e prepara ferramentas
make up                   # arranca serviços de apoio (BD, cache, fila)
make migrate              # aplica migrações
make seed                 # dados de exemplo
make dev                  # arranca a aplicação em modo de desenvolvimento
```

Aplicação em {{http://localhost:3000}} · API em {{http://localhost:8080}}

### Verificar que está tudo bem
```bash
make doctor    # verifica versões, portas livres, serviços acessíveis
make test      # a suite deve passar num ambiente limpo
```

---

## 3. Variáveis de ambiente

| Variável | Obrigatória | Omissão | Descrição | Onde obter |
|---|---|---|---|---|
| `DATABASE_URL` | Sim | `postgres://dev:dev@localhost:5432/{{app}}` | Ligação à BD | Local |
| `REDIS_URL` | Sim | `redis://localhost:6379` | Cache/sessões | Local |
| `JWT_SECRET` | Sim | — | Assinatura de tokens (dev) | Gerar: `openssl rand -hex 32` |
| `ERP_CLIENT_ID` | Não | — | Integração ERP | {{Cofre / pedir a {{Nome}}}} |
| `LOG_LEVEL` | Não | `debug` | `debug\|info\|warn\|error` | — |
| `FEATURE_{{X}}` | Não | `false` | Feature flag | — |

> **Nunca** commitar `.env`. Segredos reais vivem em {{cofre de segredos}}. `.env.example` contém apenas valores fictícios.

---

## 4. Serviços locais (`docker compose`)

| Serviço | Porta | Credenciais dev | Interface |
|---|---|---|---|
| PostgreSQL | 5432 | `dev` / `dev` | — |
| Redis | 6379 | — | — |
| {{MailHog}} | 8025 | — | {{http://localhost:8025}} |
| {{MinIO}} | 9000/9001 | `minioadmin` | {{http://localhost:9001}} |
| {{Mock ERP}} | 8090 | — | {{http://localhost:8090/docs}} |

```bash
make up          # arranca
make down        # para
make reset       # apaga volumes e recomeça do zero
make logs s={{servico}}
```

---

## 5. Comandos do dia a dia

| Comando | O que faz |
|---|---|
| `make dev` | Aplicação com recarregamento automático |
| `make test` | Testes unitários |
| `make test-watch` | Testes em modo contínuo |
| `make test-e2e` | Testes ponta a ponta |
| `make lint` / `make format` | Análise estática / formatação |
| `make typecheck` | Verificação de tipos |
| `make migrate` / `make migrate-new n={{nome}}` | Migrações |
| `make seed` | Dados de exemplo |
| `make check` | Tudo o que o CI corre (correr antes de abrir PR) |

---

## 6. Configuração do editor

**Extensões recomendadas** ({{`.vscode/extensions.json`}} já no repositório): {{...}}
**Formatação automática ao gravar:** ativada por `.editorconfig` + configuração do repositório.
**Ganchos de git:** instalados por `make setup` — formatação e lint em `pre-commit`, validação da mensagem em `commit-msg`.

---

## 7. Dados de teste

| Conta | Papel | Credenciais |
|---|---|---|
| `admin@exemplo.test` | Administrador | `Dev12345678!` |
| `gestor@exemplo.test` | Gestor | `Dev12345678!` |
| `cliente@exemplo.test` | Cliente | `Dev12345678!` |

`make seed` cria {{20 clientes, 100 produtos, 50 encomendas em vários estados}}.

---

## 8. Resolução de problemas

| Sintoma | Causa provável | Solução |
|---|---|---|
| `port 5432 already in use` | Postgres local a correr | `sudo lsof -i :5432` e parar, ou mudar a porta em `.env` |
| Migrações falham | BD em estado antigo | `make reset && make migrate` |
| `EACCES` em ficheiros do Docker | Permissões no Linux | `sudo chown -R $USER:$USER .` |
| Testes passam localmente e falham no CI | Diferença de fuso ou de ordem | Fixar `TZ=UTC`; não depender de ordem de resultados |
| Aplicação lenta no macOS | I/O de volumes Docker | Ativar VirtioFS nas definições do Docker |

**Ainda bloqueado?** {{canal #{{equipa}}-dev}} — e depois **atualiza esta tabela**.

---

## 9. Estrutura do repositório

```
{{projeto}}/
├── apps/
│   ├── api/            # serviço backend
│   └── web/            # aplicação frontend
├── packages/
│   ├── dominio/        # entidades e regras (sem dependências de infra)
│   └── contratos/      # tipos e esquemas partilhados
├── db/
│   └── migrations/
├── docs/               # esta documentação
├── infra/              # IaC, docker-compose, manifests
├── scripts/
└── Makefile
```
