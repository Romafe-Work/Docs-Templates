# Testes de Desempenho e Carga — {{PROJETO}}

> **Data:** {{AAAA-MM-DD}} · **Dono:** {{nome}}
> **Requisitos de origem:** [RNF](../01-requisitos/03-requisitos-nao-funcionais.md)

---

## 1. Tipos de teste — e o que cada um responde

| Tipo | Pergunta | Quando |
|---|---|---|
| **Carga** | Aguenta o volume esperado? | Antes de cada entrada em serviço |
| **Stress** | Onde parte, e como parte? | Antes da primeira entrada em serviço |
| **Resistência** (*soak*) | Degrada-se ao longo de horas? Há fugas de memória? | {{Trimestral}} |
| **Pico** (*spike*) | Sobrevive a um salto súbito? | Se houver picos previsíveis |
| **Volume** | Aguenta a base de dados a crescer? | Antes de a base atingir {{X}} |
| **Escalabilidade** | Acrescentar recursos melhora? | Antes de decidir infraestrutura |

---

## 2. Objetivos — de onde vêm os números

| # | Cenário | Métrica | Objetivo | Origem |
|---|---|---|---|---|
| 1 | {{Abrir a lista de viaturas}} | {{p95 de resposta}} | {{< 800 ms}} | {{RNF-03}} |
| 2 | {{Registar leitura}} | {{p99}} | {{< 1,5 s}} | {{RNF-04}} |
| 3 | {{Sistema completo}} | {{Utilizadores em simultâneo}} | {{50}} | {{RNF-01}} |
| 4 | {{Sistema completo}} | {{Taxa de erro}} | {{< 0,1%}} | {{RNF-09}} |

> **Use p95 e p99, nunca a média.** A média esconde exactamente os utilizadores
> que estão a ter má experiência — e são esses que se queixam.

---

## 3. Perfil de carga

De onde vêm os números: {{dados reais de utilização | estimativa de {{N}}
utilizadores × {{M}} ações/hora}}.

| Ação | % do total | Por hora (normal) | Por hora (pico) | Quando é o pico |
|---|---|---|---|---|
| {{Consultar lista}} | {{60%}} | {{300}} | {{900}} | {{08:00–09:00}} |
| {{Registar leitura}} | {{25%}} | {{125}} | {{400}} | {{fim do turno}} |
| {{Lançar despesa}} | {{15%}} | {{75}} | {{200}} | {{fim do mês}} |

**Fator de crescimento a acomodar:** {{2× em 18 meses}}.

---

## 4. Ambiente

| Aspeto | Produção | Ambiente de teste | Diferença |
|---|---|---|---|
| {{CPU/memória}} | {{...}} | {{...}} | {{...}} |
| {{Volume de dados}} | {{...}} | {{...}} | {{...}} |
| {{Latência de rede}} | {{...}} | {{...}} | {{...}} |

> **Testar com uma base vazia não mede nada.** Uma consulta sem índice é
> instantânea com 100 linhas e paralisa o sistema com 100 000. Encher a base
> com volume realista é parte do teste, não preparação dele.

**Ferramenta:** {{k6 | JMeter | Locust}} · **Guiões em:** {{caminho}}

---

## 5. Resultados

### Execução {{n}} — {{data}} — versão {{x.y.z}}

| Cenário | Objetivo | p50 | p95 | p99 | Erros | Passou |
|---|---|---|---|---|---|---|
| {{1}} | {{< 800 ms}} | {{210 ms}} | {{640 ms}} | {{1,2 s}} | {{0%}} | ✔ |
| {{2}} | {{< 1,5 s}} | {{...}} | {{...}} | {{...}} | {{...}} | {{...}} |

**Recursos durante o pico**

| Recurso | Uso máximo | Limite | Margem |
|---|---|---|---|
| CPU | {{62%}} | {{80%}} | {{OK}} |
| Memória | {{...}} | | |
| Ligações à base de dados | {{18}} | {{20}} | **{{Apertado}}** |

---

## 6. Estrangulamentos encontrados

| # | Onde | Sintoma | Causa | Correção | Estado |
|---|---|---|---|---|---|
| 1 | {{Lista de viaturas}} | {{p99 sobe a 4 s com 40 utilizadores}} | {{N+1 consultas}} | {{`select_related`}} | {{Corrigido}} |
| 2 | {{...}} | {{...}} | {{...}} | {{...}} | {{...}} |

**Ordem de ataque:** a consulta mais lenta × o número de vezes que é chamada.
Otimizar o que é lento mas raro não muda nada para ninguém.

---

## 7. Ponto de rutura

| Métrica | Valor |
|---|---|
| Utilizadores em simultâneo até degradar | {{...}} |
| Utilizadores até falhar | {{...}} |
| **Como falha** | {{Recusa ligações / fica lento / perde dados}} |
| Recupera sozinho ao aliviar? | {{Sim/Não}} |

> **Como falha importa mais do que quando falha.** Um sistema que fica lento e
> recupera é aceitável; um que corrompe dados sob carga não é.

---

## 8. Conclusão

**Apto para {{N}} utilizadores:** {{Sim / Sim com reservas / Não}}
**Reservas:** {{...}}
**A repetir quando:** {{o volume duplicar | antes de cada release maior}}
