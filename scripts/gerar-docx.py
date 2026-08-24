#!/usr/bin/env python3
"""
Converte os templates Markdown desta pasta em documentos .docx.

  - Diagramas Mermaid sao renderizados como imagens PNG e embebidos no documento.
  - Estilos, pagina A4, rodape com numeracao: recursos/referencia.docx
  - Saida: o .docx fica ao lado do .md, na mesma pasta + 00-COLETANEA-COMPLETA.docx na raiz

Uso:
    python3 scripts/gerar-docx.py              # tudo
    python3 scripts/gerar-docx.py 02-analise   # so uma pasta ou ficheiro
    python3 scripts/gerar-docx.py --sem-coletanea

Requisitos:
    pandoc >= 3.0        https://pandoc.org/installing.html
    node   >= 18         (para @mermaid-js/mermaid-cli, instalado via npx)

Nota (Linux/WSL): o Chromium usado pelo mermaid-cli precisa de bibliotecas do sistema.
Se falhar com "libasound.so.2: cannot open shared object file", instala:
    sudo apt-get install -y libasound2t64 libnss3 libatk-bridge2.0-0 libgbm1 libxkbcommon0
"""
import os, re, shutil, struct, subprocess, sys, glob

ROOT  = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
WORK  = os.path.join(ROOT, ".build")
DEST  = ROOT  # os .docx ficam ao lado dos .md, na mesma pasta
REF   = os.path.join(ROOT, "recursos", "referencia.docx")
CONF  = os.path.join(ROOT, "recursos", "mermaid.json")
PCONF = os.path.join(ROOT, "recursos", "puppeteer.json")
REALCE = os.path.join(ROOT, "recursos", "realce.theme")  # cores do manual de UI/UX

# Mancha util de uma pagina A4 com as margens definidas em referencia.docx
MAX_W_CM, MAX_H_CM = 17.2, 22.0

# O chrome-headless-shell usado pelo mermaid-cli liga-se a libasound.so.2 mesmo
# sem tocar em audio. Sem permissoes para instalar o pacote no sistema, basta uma
# copia da biblioteca em ~/.local/lib — e e isso que esta linha aproveita.
_LIB = os.path.expanduser("~/.local/lib")
if os.path.isdir(_LIB):
    os.environ["LD_LIBRARY_PATH"] = _LIB + os.pathsep + os.environ.get("LD_LIBRARY_PATH", "")

PANDOC_FROM = "markdown+pipe_tables+task_lists+link_attributes-raw_html"
MERMAID_PKG = "@mermaid-js/mermaid-cli@11"


def mmdc_cmd():
    """Devolve o comando para invocar o mermaid-cli."""
    local = shutil.which("mmdc")
    if local:
        return [local]
    cached = glob.glob(os.path.expanduser("~/.npm/_npx/*/node_modules/.bin/mmdc"))
    if cached:
        return [cached[0]]
    return ["npx", "-y", "-p", MERMAID_PKG, "mmdc"]


def png_size(path):
    with open(path, "rb") as f:
        return struct.unpack(">II", f.read(33)[16:24])


def fit(w, h):
    """Largura em cm que faz a imagem caber na mancha da pagina."""
    w_cm = MAX_W_CM
    if w_cm * h / w > MAX_H_CM:
        w_cm = MAX_H_CM * w / h
    return round(w_cm, 2)


def build_one(md_path, mmdc):
    rel  = os.path.relpath(md_path, ROOT)
    wdir = os.path.join(WORK, os.path.splitext(rel)[0])
    shutil.rmtree(wdir, ignore_errors=True)
    os.makedirs(wdir, exist_ok=True)

    text   = open(md_path, encoding="utf-8").read()
    src_md = os.path.join(wdir, "in.md")
    open(src_md, "w", encoding="utf-8").write(text)

    n_diag, cur = text.count("```mermaid"), src_md
    if n_diag:
        out_md = os.path.join(wdir, "out.md")
        r = subprocess.run(mmdc + ["-i", src_md, "-o", out_md, "-e", "png",
                                   "-c", CONF, "-p", PCONF, "-b", "white", "-s", "2.5"],
                           cwd=wdir, capture_output=True, text=True, timeout=900)
        if r.returncode == 0 and os.path.exists(out_md):
            cur = out_md
        else:
            print("  !! Mermaid falhou em %s:\n     %s" % (rel, r.stderr.strip()[:300]))

    body = open(cur, encoding="utf-8").read()

    def size_img(m):
        fn = m.group(1).lstrip("./")
        p  = os.path.join(wdir, fn)
        if not os.path.exists(p):
            return m.group(0)
        w, h = png_size(p)
        return "![](%s){width=%scm}" % (fn, fit(w, h))
    body = re.sub(r"!\[[^\]]*\]\((\./[^)]+\.png)\)", size_img, body)

    # O primeiro H1 passa a metadata -> usa o estilo "Title" do Word
    title = os.path.splitext(os.path.basename(rel))[0]
    m = re.search(r"^# (.+)$", body, re.M)
    if m:
        title = m.group(1).strip()
        body  = body[:m.start()] + body[m.end():].lstrip("\n")

    final_md = os.path.join(wdir, "final.md")
    open(final_md, "w", encoding="utf-8").write(body)

    dest = os.path.join(DEST, os.path.splitext(rel)[0] + ".docx")
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    r = subprocess.run(["pandoc", final_md, "-o", dest, "--reference-doc", REF, "--highlight-style", REALCE,
                        "--from", PANDOC_FROM, "--toc", "--toc-depth=3",
                        "--resource-path", wdir, "--dpi", "192",
                        "-M", "title=" + title, "-M", "lang=pt-PT"],
                       capture_output=True, text=True)
    if r.returncode:
        print("  !! pandoc falhou em %s:\n     %s" % (rel, r.stderr.strip()[:300]))
        return None
    return dest, n_diag


PAGEBREAK = '\n\n```{=openxml}\n<w:p><w:r><w:br w:type="page"/></w:r></w:p>\n```\n\n'


def build_coletanea(ordem):
    out = os.path.join(WORK, "_coletanea")
    shutil.rmtree(out, ignore_errors=True); os.makedirs(out)
    parts = []
    for idx, rel in enumerate(ordem):
        wdir = os.path.join(WORK, os.path.splitext(rel)[0])
        md   = os.path.join(wdir, "final.md")
        if not os.path.exists(md):
            continue
        body = open(md, encoding="utf-8").read()
        orig = open(os.path.join(ROOT, rel), encoding="utf-8").read()
        m = re.search(r"^# (.+)$", orig, re.M)
        titulo = m.group(1).strip() if m else os.path.basename(rel)

        def mv(mm, idx=idx, wdir=wdir):
            novo = "d%02d-%s" % (idx, mm.group(1))
            src  = os.path.join(wdir, mm.group(1))
            if os.path.exists(src):
                shutil.copy(src, os.path.join(out, novo))
            return "![](%s){width=%s}" % (novo, mm.group(2))
        body = re.sub(r"!\[\]\((out-\d+\.png)\)\{width=([\d.]+cm)\}", mv, body)
        parts.append("# %s\n\n*(ficheiro: `%s`)*\n\n" % (titulo, rel) + body)

    final = os.path.join(out, "tudo.md")
    open(final, "w", encoding="utf-8").write(PAGEBREAK.join(parts))
    dest = os.path.join(DEST, "COLETANEA-COMPLETA.docx")
    r = subprocess.run(["pandoc", final, "-o", dest, "--reference-doc", REF, "--highlight-style", REALCE,
                        "--from", PANDOC_FROM + "+raw_attribute",
                        "--toc", "--toc-depth=2", "--resource-path", out, "--dpi", "192",
                        "-M", "title=Templates de Documentação de Software",
                        "-M", "subtitle=Coletânea completa — do levantamento de requisitos à operação",
                        "-M", "lang=pt-PT"], capture_output=True, text=True)
    return dest if r.returncode == 0 else None


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    coletanea = "--sem-coletanea" not in sys.argv

    for exe in ("pandoc", "node"):
        if not shutil.which(exe):
            sys.exit("ERRO: '%s' nao encontrado no PATH." % exe)
    if not os.path.exists(REF):
        sys.exit("ERRO: recursos/referencia.docx em falta.")

    todos = sorted(os.path.relpath(p, ROOT)
                   for p in glob.glob(os.path.join(ROOT, "**", "*.md"), recursive=True)
                   if "/docx/" not in p and "/.build/" not in p)
    alvos = [f for f in todos if any(f.startswith(a.rstrip("/")) for a in args)] if args else todos
    if not alvos:
        sys.exit("Nada a converter para: %s" % args)

    # README primeiro, depois por pasta
    ordem = ([f for f in alvos if f == "LEIA-ME.md"] +
             [f for f in alvos if f != "LEIA-ME.md"])

    mmdc = mmdc_cmd()
    print("mermaid-cli: %s" % " ".join(mmdc))
    total = 0
    for i, rel in enumerate(ordem, 1):
        res = build_one(os.path.join(ROOT, rel), mmdc)
        if res:
            dest, nd = res
            total += nd
            print("[%2d/%d] %-52s -> %5d KB  (%d diagramas)"
                  % (i, len(ordem), rel, os.path.getsize(dest) // 1024, nd))

    print("\n%d documentos, %d diagramas renderizados." % (len(ordem), total))
    if coletanea and not args:
        d = build_coletanea(ordem)
        print("Coletânea: %s (%d KB)" % (d, os.path.getsize(d) // 1024) if d else "Coletânea falhou.")


if __name__ == "__main__":
    main()
