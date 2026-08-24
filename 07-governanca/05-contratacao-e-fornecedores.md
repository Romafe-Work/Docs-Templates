# Contratação e Fornecedores — {{PROJETO}}

> **Data:** {{AAAA-MM-DD}} · **Dono:** {{nome}}

---

## 1. Caderno de encargos — estrutura

> Usar quando se contrata desenvolvimento, integração ou serviço a terceiros.

### 1.1 Contexto e objetivo
{{O problema de negócio. O que existe hoje. O que tem de existir no fim.}}

### 1.2 Âmbito

| Dentro | Fora |
|---|---|
| {{...}} | {{...}} |

### 1.3 Requisitos

Referenciar, não repetir: [Requisitos Funcionais](../01-requisitos/02-requisitos-funcionais.md)
e [Não Funcionais](../01-requisitos/03-requisitos-nao-funcionais.md).

| # | Requisito | Obrigatório / Desejável |
|---|---|---|
| {{RF-01}} | {{...}} | Obrigatório |

### 1.4 Restrições impostas

| # | Restrição | Porquê |
|---|---|---|
| 1 | {{Corre na infraestrutura interna}} | {{Política de dados}} |
| 2 | {{Base de dados PostgreSQL já existente}} | {{Partilhada com outros sistemas}} |

### 1.5 Entregas exigidas

| # | Entrega | Formato | Quando |
|---|---|---|---|
| 1 | Código-fonte | {{Repositório}} | Contínuo |
| 2 | Documentação de arquitetura | {{Markdown}} | {{Com cada versão}} |
| 3 | Testes automáticos | {{Executáveis pelo cliente}} | Contínuo |
| 4 | Manual de operação | {{...}} | {{Antes da entrada em serviço}} |
| 5 | Formação | {{N sessões}} | {{...}} |

> **A entrega 3 é a mais esquecida e a mais cara de omitir.** Sem testes que o
> cliente possa correr, não há forma de verificar uma correção futura.

### 1.6 Propriedade e acesso

| Item | Fica com |
|---|---|
| Código-fonte | {{Cliente}} |
| Direitos de uso e alteração | {{Cliente}} |
| Dados | **Cliente, sempre** |
| Acesso ao repositório durante o contrato | {{Ambos}} |
| Componentes de terceiros | Ver [Licenças](04-licencas-e-terceiros.md) |

### 1.7 Critérios de avaliação de propostas

| Critério | Peso |
|---|---|
| {{Adequação técnica}} | {{40%}} |
| {{Experiência comprovada em contexto semelhante}} | {{25%}} |
| {{Preço}} | {{20%}} |
| {{Prazo}} | {{15%}} |

### 1.8 Aceitação e pagamento

| Marco | Entrega | % do valor | Critério de aceitação |
|---|---|---|---|
| {{M1}} | {{...}} | {{20%}} | {{verificável, não subjetivo}} |

---

## 2. Registo de fornecedores

| # | Fornecedor | Serviço | Contrato até | Criticidade | Contacto |
|---|---|---|---|---|---|
| 1 | {{...}} | {{Alojamento}} | {{...}} | **Alta** | {{...}} |
| 2 | {{...}} | {{Envio de e-mail}} | {{...}} | Média | {{...}} |

**Criticidade alta** = o serviço para se este fornecedor parar.

---

## 3. Avaliação de risco por fornecedor

| Pergunta | {{Fornecedor A}} |
|---|---|
| Onde ficam os dados (país)? | {{...}} |
| É subcontratante RGPD? Há contrato assinado? | {{...}} |
| Que SLA oferece? | {{...}} |
| Que acontece se encerrar? | {{...}} |
| Os dados podem ser exportados? Em que formato? | {{...}} |
| Quanto custa sair? | {{...}} |

---

## 4. Dependência e saída

| Fornecedor | Nível de dependência | Alternativa | Esforço para mudar | Plano de saída |
|---|---|---|---|---|
| {{...}} | {{Alto}} | {{...}} | {{...}} | {{...}} |

> A pergunta a fazer antes de assinar, não depois: **como é que saio daqui?**
> Se a resposta for "não sei", o preço da entrada não é o preço real.
