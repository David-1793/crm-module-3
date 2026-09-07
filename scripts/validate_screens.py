from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
text = (ROOT / "js" / "content.js").read_text(encoding="utf-8")

# Pull each screen block roughly by type/id
screen_ids = re.findall(r'\n    \{\n      id: "([a-z0-9-]+)"', text)
print(f"{len(screen_ids)} screens")
if len(screen_ids) != 21:
    raise SystemExit(f"expected 21 screens, got {len(screen_ids)}")

required = {
    "hero": ["title", "narration", "objectives", "host"],
    "acknowledge": ["items", "require", "narration"],
    "timeline": ["items", "definition", "narration"],
    "tiles": ["items", "narration"],
    "cards": ["items", "narration"],
    "stat": ["stat", "caption", "img", "narration"],
    "compare": ["good", "bad", "narration"],
    "split": ["img", "tile", "chips", "points", "narration"],
    "quiz": ["questions", "narration"],
    "complete": ["narration"],
}

types = re.findall(r'type: "([a-z]+)"', text)
print("types", types)
if len(types) != 21:
    raise SystemExit(f"expected 21 types, got {len(types)}")

for sid, typ in zip(screen_ids, types):
    if typ not in required:
        raise SystemExit(f"{sid} has unknown type {typ}")

assets = [
    "index.html",
    "css/module.css",
    "js/player.js",
    "js/content.js",
    "js/scorm12.js",
    "imsmanifest.xml",
]
missing = [a for a in assets if not (ROOT / a).exists()]
if missing:
    raise SystemExit(f"missing {missing}")
print("core files ok")
