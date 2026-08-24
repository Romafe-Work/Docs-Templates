#!/usr/bin/env bash
# Regenera todos os .docx a partir dos ficheiros Markdown.
set -euo pipefail
cd "$(dirname "$0")"
exec python3 scripts/gerar-docx.py "$@"
