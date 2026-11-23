#!/bin/bash
cd "$(dirname "$0")"
PORT=8765
if lsof -nP -iTCP:$PORT -sTCP:LISTEN >/dev/null 2>&1; then
  open "http://127.0.0.1:$PORT/"
  exit 0
fi
python3 serve.py
