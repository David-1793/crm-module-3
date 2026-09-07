# CRM · Human Error and Reliability

GLOBAL Air Training HTML5 e-learning module converted from `Crm-module-3.pptx`. Same player pattern as Modules 1 and 2: interactive screens, Leo narration (or browser speech fallback), SCORM 1.2 tracking, pass mark 80%.

## Open locally

Serve the folder (do not open `index.html` as a file if you want audio and SCORM paths to resolve cleanly):

```bash
python -m http.server 4173
```

Then open http://localhost:4173/

## Narration

Leo MP3s are optional. If they are missing, the player uses the browser voice.

```bash
set XAI_API_KEY=your_key
python scripts/generate_narration.py
```

## SCORM 1.2 package

```bash
python scripts/package_scorm12.py
```

This writes `imsmanifest.xml` and `CRM-Module-3-SCORM12.zip`.
