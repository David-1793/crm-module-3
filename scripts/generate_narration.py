"""Generate Grok TTS Leo narration MP3s for CRM Module 3."""

from __future__ import annotations

import json
import os
import re
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CONTENT = ROOT / "js" / "content.js"
AUDIO = ROOT / "audio"
ENDPOINT = "https://api.x.ai/v1/tts"


def load_scripts() -> list[dict]:
    text = CONTENT.read_text(encoding="utf-8")
    blocks = re.findall(
        r'id:\s*"([a-z0-9-]+)"\s*,\s*menu:[\s\S]*?narration:\s*"([^"]+)"',
        text,
    )
    if not blocks:
        raise SystemExit("No screen narration blocks found in js/content.js")
    return [{"id": i, "text": t.strip()} for i, t in blocks]


def synthesize(api_key: str, text: str) -> bytes:
    payload = {
        "text": text,
        "voice_id": "leo",
        "language": "en",
        "text_normalization": True,
        "speed": 0.98,
        "output_format": {"codec": "mp3", "sample_rate": 44100, "bit_rate": 192000},
        "replace": {
            "CRM": "C R M",
            "TEM": "T E M",
            "LOSA": "low-sa",
            "SOPs": "S O Pees",
            "SOP": "S O P",
            "LMS": "L M S",
            "IOSH": "I O S H",
            "NASA": "NASA",
        },
    }
    req = urllib.request.Request(
        ENDPOINT,
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        },
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=120) as resp:
        return resp.read()


def main() -> int:
    api_key = os.environ.get("XAI_API_KEY") or os.environ.get("GROK_API_KEY")
    if not api_key:
        print("Set XAI_API_KEY (or GROK_API_KEY) to generate Leo narration.")
        return 1

    AUDIO.mkdir(exist_ok=True)
    scripts = load_scripts()
    print(f"Generating {len(scripts)} Leo clips…")
    for item in scripts:
        dest = AUDIO / f"{item['id']}.mp3"
        if dest.exists() and dest.stat().st_size > 1000 and "--force" not in sys.argv:
            print(f"  skip {dest.name}")
            continue
        for attempt in range(3):
            try:
                dest.write_bytes(synthesize(api_key, item["text"]))
                print(f"  wrote {dest.name} ({dest.stat().st_size} bytes)")
                break
            except urllib.error.HTTPError as exc:
                body = exc.read().decode("utf-8", errors="replace")
                print(f"  HTTP {exc.code} on {item['id']} (attempt {attempt + 1}): {body[:240]}")
                time.sleep(2 ** attempt)
            except Exception as exc:
                print(f"  error on {item['id']} (attempt {attempt + 1}): {exc}")
                time.sleep(2 ** attempt)
        else:
            print(f"  FAILED {item['id']}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
