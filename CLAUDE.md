# Torchlit Chronicles

A read-only static blog of Shadowdark RPG session logs. Astro 7, deployed to GitHub
Pages by `.github/workflows/deploy.yml` on every push to `main`. No logins, comments,
or interactivity beyond decorative animation, and none should be added.

## Commands
- `npm run dev`: local preview at http://localhost:4321 (drafts are visible)
- `npm run build`: production build; **run this after any content change** because it
  validates every log's frontmatter and fails loudly on mistakes

## Adding a session log
1. File: `src/content/sessions/<campaign-id>/<NNN>-<kebab-title>.md`, where `NNN` is
   the zero-padded session number (`007-the-salt-pans.md`). The filename becomes the URL.
2. Next number = highest existing `session:` in that campaign folder + 1. Duplicate
   numbers fail the build.
3. Frontmatter (schema lives in `src/content.config.ts`):
   ```yaml
   campaign: the-gloaming-deep   # must match a key in src/content/campaigns.yaml
   session: 3                    # integer
   title: The Salt Pans
   date: 2026-11-01              # real-world play date, YYYY-MM-DD
   ingameDate: Day 47            # optional
   summary: One evocative sentence; shown on the campaign page and in RSS.
   characters: [Maren Holt, Quill]   # PCs present
   fallen: [Quill]               # optional; PCs who died this session
   draft: false                  # true hides it from the live site
   ```
4. Body: plain Markdown. Use `##` for scene headings (never `#`; the title is the H1).
   The first paragraph gets a drop cap, so open with a strong prose sentence, not a
   heading or a list. `>` for quoted in-character speech, `---` for a scene break, tables
   for combat rounds or loot.
5. When turning raw notes into a log: past tense, the party's point of view, terse,
   grim prose. Keep every fact the user gave; invent nothing beyond connective tissue.
   Never edit past logs unless asked.

## Adding a campaign
Add a keyed entry to `src/content/campaigns.yaml` (name, tagline, status, theme with
accent/mist hex colours and an effect: `embers | ash | snow | spores | none`), then create
the matching folder under `src/content/sessions/`.

## Design rules
- Grimdark palette: charcoal, desaturated teal, bone text; lantern-amber and ember-red
  accents. Fonts: Pirata One (display), IM Fell English SC (labels), Alegreya (body).
- Decoration lives in the background layers (`.atmo-*` in `src/styles/global.css`,
  `src/scripts/atmosphere.ts`). Body text always sits on a solid `.panel` for readability.
- All motion must stop under `prefers-reduced-motion`.
- Internal links go through `href()` in `src/lib/data.ts` so the GitHub Pages base path works.
- Don't use Shadowdark's logo, trade dress, or copied rulebook text.

## Sample content
`the-gloaming-deep` and `ashen-crown` are placeholder campaigns for demonstrating themes.
Delete them (YAML entries + session folders) once real campaigns exist.
