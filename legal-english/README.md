# Legal English: Reading, Writing & Translation · Interactive Study Guides

A static collection (no build step, no server). Open `index.html`; it links to each unit.

| File | What it is |
|---|---|
| `index.html` | Collection index with a card for each unit |
| `unit1.html`, `unit2.html`, `unit4.html`, `unit5.html`, `unit6.html` | One study guide per unit (Text A, Text B) |
| `glossary.html` | Searchable glossary of all key terms with audio |
| `assets/` | Shared style and script |
| `data/` | The content of each unit (`unitN.js`) and the index (`collection.js`) |

Unit 3 is shown on the index as "not added yet". To add it, add `data/unit3.js` and a `unit3.html` copied from another unit page.

## Publish on GitHub Pages
1. Create a repository and upload the contents of this folder (including `.nojekyll`) to the root.
2. Settings → Pages → Deploy from a branch → `main` / `(root)` → Save.
3. The collection is live at `https://<user>.github.io/<repo>/`.

## Audio
Uses the browser's built-in speech voices (no audio files). Best in Chrome, Edge or Safari. Chinese terms need a Chinese voice on the device.

## Copyright
Full text is published only where it is in the public domain or a classroom summary (Unit 1 Text B, Unit 4 Texts A and B, Unit 5 Text B). The other texts come from sources that may still be in copyright, so the pages show the handout paragraph number, a plain-English version and notes in new words, and students can paste the handout paragraph to hear it (it never leaves their browser). If you hold the rights to publish the rest, ask for a build that includes them.
