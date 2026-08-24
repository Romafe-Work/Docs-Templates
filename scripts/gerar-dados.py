#!/usr/bin/env python3
"""
Gera o dados.js que alimenta o site (index.html).

Lê os títulos dos ficheiros Markdown e as descrições da tabela de índice do
LEIA-ME.md. Precisa, por isso, dos .md presentes — tal como o gerar-docx.py.

Uso:
    python3 scripts/gerar-dados.py
"""
import glob, json, os, re

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

FASES = [
    ("00-produto",        "Produto",            "Porquê e para quem",         "Negócio, PO, partes interessadas", "Antes de tudo"),
    ("01-gestao-projeto", "Gestão de projeto",  "Como se conduz",             "Gestor, patrocinador",             "Ao arrancar"),
    ("01-requisitos",     "Requisitos",         "O quê",                      "Analistas, PO, equipa",            "Primeira fase"),
    ("02-analise",        "Análise",            "Como funciona o negócio",    "Analistas, equipa, UX",            "Antes de desenhar"),
    ("02-design",         "Design",             "Como se apresenta",          "UX, equipa",                       "Antes de construir"),
    ("03-arquitetura",    "Arquitetura",        "Como está construído",       "Equipa técnica",                   "Antes da primeira linha"),
    ("04-desenvolvimento","Desenvolvimento",    "Como se trabalha",           "Programadores",                    "Antes de entrar a 2.ª pessoa"),
    ("05-qualidade",      "Qualidade",          "Como se verifica",           "QA, equipa, PO",                   "Durante a construção"),
    ("06-operacao",       "Operação",           "Como se mantém a correr",    "SRE, piquete",                     "Antes de entrar em produção"),
    ("07-governanca",     "Governança",         "Conformidade e risco",       "Segurança, DPO, gestão",           "Antes do primeiro dado real"),
    ("08-utilizador",     "Utilizador",         "Como se usa",                "Utilizadores finais, integradores","Antes da formação"),
    ("09-encerramento",   "Encerramento",       "Como se fecha e se entrega", "Gestor, equipa que recebe",        "No fecho"),
]


EXTRA = {
    "03-arquitetura/decisoes/0001-exemplo.md":
        "Exemplo preenchido de registo de decisão de arquitetura: monólito modular em vez de microsserviços.",
}


def descricoes():
    """Descrições vindas da tabela de índice do LEIA-ME, mais as manuais."""
    d = dict(EXTRA)
    caminho = os.path.join(RAIZ, "LEIA-ME.md")
    if not os.path.exists(caminho):
        return d
    for linha in open(caminho, encoding="utf-8"):
        m = re.match(r"\| \[(.+?)\]\(([^)]+\.md)\) \| (.+?) \|\s*$", linha)
        if m:
            d[m.group(2)] = re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", m.group(3))
    return d


def titulo(md):
    t = open(md, encoding="utf-8").readline().lstrip("# ").strip()
    t = re.sub(r"\s*—\s*\{\{.*?\}\}\s*$", "", t)
    t = re.sub(r"\s+—\s+(guião.*|modelo.*)$", "", t)
    return t


def main():
    desc = descricoes()
    dados = []
    for pasta, nome, fase, audiencia, quando in FASES:
        docs = []
        for md in sorted(glob.glob(os.path.join(RAIZ, pasta, "**", "*.md"), recursive=True)):
            rel = os.path.relpath(md, RAIZ)
            docs.append({
                "titulo": titulo(md),
                "desc": desc.get(rel, "Modelo pronto a preencher."),
                "docx": rel[:-3] + ".docx",
            })
        if docs:
            dados.append({"pasta": pasta, "nome": nome, "fase": fase,
                          "audiencia": audiencia, "quando": quando, "documentos": docs})

    saida = os.path.join(RAIZ, "dados.js")
    with open(saida, "w", encoding="utf-8") as f:
        f.write("const FASES = " + json.dumps(dados, ensure_ascii=False, indent=1) + ";\n")
    print("dados.js: %d fases, %d documentos" % (len(dados), sum(len(f["documentos"]) for f in dados)))


if __name__ == "__main__":
    main()
