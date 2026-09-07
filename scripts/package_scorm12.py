"""Build a SCORM 1.2 zip for CRM Module 3."""

from __future__ import annotations

import zipfile
from pathlib import Path
from xml.sax.saxutils import escape

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "CRM-Module-3-SCORM12.zip"

SKIP_DIRS = {".git", "__pycache__", "_extract", "_verify", "scripts"}
SKIP_SUFFIXES = {".pptx", ".pyc", ".py", ".zip"}
SKIP_NAMES = {
    "Crm-module-3.pptx",
    "CRM-Module-3-SCORM12.zip",
    ".gitignore",
    "README.md",
}


def package_files() -> list[Path]:
    files = []
    for path in ROOT.rglob("*"):
        if not path.is_file():
            continue
        rel_parts = path.relative_to(ROOT).parts
        if any(part in SKIP_DIRS for part in rel_parts):
            continue
        if path.name in SKIP_NAMES or path.suffix.lower() in SKIP_SUFFIXES:
            continue
        files.append(path)
    return sorted(files)


def href(path: Path) -> str:
    return path.relative_to(ROOT).as_posix()


def write_manifest(files: list[Path]) -> str:
    file_tags = "\n".join(f'      <file href="{escape(href(p))}"/>' for p in files)
    return f"""<?xml version="1.0" encoding="UTF-8"?>
<manifest identifier="com.globalairtraining.crm.module3" version="1.2"
  xmlns="http://www.imsproject.org/xsd/imscp_rootv1p1p2"
  xmlns:adlcp="http://www.adlnet.org/xsd/adlcp_rootv1p2"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.imsproject.org/xsd/imscp_rootv1p1p2 imscp_rootv1p1p2.xsd
                      http://www.imsglobal.org/xsd/imsmd_rootv1p2p1 imsmd_rootv1p2p1.xsd
                      http://www.adlnet.org/xsd/adlcp_rootv1p2 adlcp_rootv1p2.xsd">
  <metadata>
    <schema>ADL SCORM</schema>
    <schemaversion>1.2</schemaversion>
    <lom xmlns="http://www.imsglobal.org/xsd/imsmd_rootv1p2p1">
      <general>
        <title>
          <langstring xml:lang="en-GB">CRM - Human Error and Reliability</langstring>
        </title>
        <description>
          <langstring xml:lang="en-GB">GLOBAL Air Training Crew Resource Management: Human Error and Reliability.</langstring>
        </description>
      </general>
    </lom>
  </metadata>
  <organizations default="ORG-CRM-MOD3">
    <organization identifier="ORG-CRM-MOD3">
      <title>CRM - Human Error and Reliability</title>
      <item identifier="ITEM-SCO-1" identifierref="RES-SCO-1" isvisible="true">
        <title>Human Error and Reliability</title>
        <adlcp:masteryscore>80</adlcp:masteryscore>
      </item>
    </organization>
  </organizations>
  <resources>
    <resource identifier="RES-SCO-1" type="webcontent" adlcp:scormtype="sco" href="index.html">
{file_tags}
    </resource>
  </resources>
</manifest>
"""


def main() -> None:
    files = [p for p in package_files() if p.name != "imsmanifest.xml"]
    manifest = ROOT / "imsmanifest.xml"
    manifest.write_text(write_manifest(files + [manifest]), encoding="utf-8")
    with zipfile.ZipFile(OUT, "w", zipfile.ZIP_DEFLATED) as zf:
        for path in files + [manifest]:
            zf.write(path, href(path))
    print(f"Wrote {OUT} ({OUT.stat().st_size} bytes, {len(files) + 1} files)")


if __name__ == "__main__":
    main()
