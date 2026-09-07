from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
text = (ROOT / "js" / "content.js").read_text(encoding="utf-8")
ids = re.findall(r'id:\s*"([a-z0-9-]+)"', text)
print("ids", ids)
imgs = re.findall(r"(images/[A-Za-z0-9./_-]+)", text)
missing = [i for i in imgs if not (ROOT / i).exists()]
print("image refs", len(set(imgs)), "missing", missing)
narr = re.findall(r'narration:\s*"([^"]+)"', text)
print("narration screens", len(narr))
print("index", (ROOT / "index.html").exists())
if missing:
    raise SystemExit(1)
