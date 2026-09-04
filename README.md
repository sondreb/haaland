# HAALAND — a tribute to Erling Braut Haaland

An interactive, fully static web experience celebrating Erling Braut Haaland: the journey from Bryne to Manchester, the records, the trophies, Norway's 2026 World Cup run, the man behind the meditation celebration — and a penalty shoot-out you will lose.

**Live:** https://haaland.brainbox.no/

## What's inside

- **Aurora hero** — a Northern Lights canvas animation under giant typography and a World Cup portrait, with live counters and an age clock ticking to the second.
- **The numbers** — animated career stats that count up as you scroll.
- **The journey** — five chapters (Bryne, Molde, Salzburg, Dortmund, City), each with a photo from that era. The whole page re-colours itself to each club's palette as you scroll.
- **Season chart** — goals per season across all competitions, league-only, or appearances. Hover for detail.
- **The record book** — 20 flip-cards of records, filterable by competition.
- **Braut Haaland** — international goals by year and the 2026 World Cup run, match by match.
- **The cabinet** — team honours and 20 individual awards.
- **Anatomy of a striker** — pitch heat zones and what makes him unstoppable.
- **Beat the keeper** — a canvas penalty mini-game. The keeper learns your favourite corner.
- **Off the pitch** — Flow Kingz, the 1594 Viking chronicle, cows, cowboy hats, 91 Peruvian babies.
- **Meditation mode** — press the 🧘 in the nav. Breathe.
- **Follow** — links to every official channel and stats page.
- Type `999` anywhere for a small surprise.

## Tech

- [Vite](https://vitejs.dev) + TypeScript, no framework
- [GSAP](https://gsap.com) + ScrollTrigger for scroll choreography
- Hand-rolled SVG charts and 2D canvas — zero server
- Eleven Creative Commons photographs from Wikimedia Commons (see below)
- Deployed to GitHub Pages via GitHub Actions on every push to `main`

## Develop

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # type-check + production build into dist/
npm run preview   # serve the production build locally
```

The site is served from the root of the custom domain `haaland.brainbox.no` (`public/CNAME`), so the base path is `/`. To deploy as a GitHub project page instead, build with `VITE_BASE=/haaland/ npm run build` and remove the CNAME file.

## Data

All facts live in [`src/data.ts`](src/data.ts). Club stats are current to 28 August 2026; international stats to the 2026 World Cup quarter-final (11 July 2026). Sources: Wikipedia, Premier League, UEFA, NBC Sports. To update after a match, edit the numbers there — everything else re-renders.

## Photos

Every photograph is from [Wikimedia Commons](https://commons.wikimedia.org/) under a Creative Commons licence (CC BY 4.0, CC BY-SA 4.0 or CC BY-SA 3.0) and is credited in place and in the footer. The manifest — file, author, licence, source URL and alt text — lives in [`src/photos.ts`](src/photos.ts); the files live in [`public/img`](public/img). To swap or add a photo, add an entry there and drop the file in `public/img`.

Photographers: Bryan Berlin, Jacek Stanislawek, Werner100359, Vyacheslav Evdokimov (fc-zenit.ru), MichaelEmilio, Hameltion and Jarvin. Thank you.

## Disclaimer

An unofficial fan tribute. Not affiliated with Erling Haaland, Manchester City, the Norwegian FA or any commercial partner.

## License

Code and text: public domain ([Unlicense](LICENSE)). Photographs remain under their respective Creative Commons licences as listed in [`src/photos.ts`](src/photos.ts) — reuse them with attribution.
