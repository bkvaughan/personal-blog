# Torchlit Chronicles

Session logs from my Shadowdark RPG campaigns, as a grimdark, read-only static site.

**Live:** https://bkvaughan.github.io/personal-blog/

Built with [Astro](https://astro.build/) and deployed to GitHub Pages by GitHub Actions on every push to `main`. No database, logins, or comments: every page is generated from Markdown files in this repo.

## Quick start

```sh
npm install
npm run dev      # preview at http://localhost:4321 (shows drafts); stop with: npx astro dev stop
npm run build    # production build; also validates every log
```

Requires Node 22.23.4 or later (the deploy uses Node 24).

## Adding a session

Create `src/content/sessions/<campaign>/<NNN>-<title>.md`:

```markdown
---
campaign: the-gloaming-deep
session: 3
title: The Salt Pans
date: 2026-11-01
ingameDate: Day 47          # optional
summary: One sentence shown on the campaign page and in RSS.
characters: [Maren Holt, Quill]
fallen: [Quill]             # optional: PCs who died this session
draft: false                # optional: true hides it from the live site
---

Open with a prose paragraph (its first letter becomes a drop cap). Use `##` for scenes.
```

Run `npm run build` before pushing. The build fails with a clear error if a field is missing or misspelled, the campaign doesn't exist, or a session number is duplicated.

## Adding a campaign

Add an entry to `src/content/campaigns.yaml`, then create its folder under `src/content/sessions/`:

```yaml
frozen-pass:
  name: The Frozen Pass
  tagline: Nothing that crosses the mountain in winter comes back whole.
  status: active            # active | hiatus | complete
  theme:
    accent: "#9fc3d1"       # torchlight and highlight colour
    mist: "#22343d"         # fog and background tint
    effect: snow            # embers | ash | snow | spores | none
```

## Project layout

| Path | Purpose |
| --- | --- |
| `src/content/` | Campaigns (`campaigns.yaml`) and session logs |
| `src/content.config.ts` | Rules for valid campaigns and logs |
| `src/pages/` | Home, campaign, session, RSS and 404 pages |
| `src/layouts/Base.astro` | Shared page shell and background layers |
| `src/styles/global.css` | Palette, fonts, layout and animation |
| `src/scripts/atmosphere.ts` | Torchlight and particle effects |
| `.github/workflows/deploy.yml` | Build and deploy to GitHub Pages |
| `CLAUDE.md` | Instructions for Claude when writing logs |

## Updating with Claude

Open Claude Code in this folder, paste raw session notes, and name the campaign. Claude writes the next numbered log following `CLAUDE.md`, builds it to validate, and commits when asked.

---

Independent fan chronicle; not affiliated with The Arcane Library.
