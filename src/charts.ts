import { intlByYear, seasons, stints, type SeasonRow } from './data';

const NS = 'http://www.w3.org/2000/svg';
const clubColour = (id: string) => stints.find((s) => s.id === id)?.theme.accent ?? '#6cabdd';

type Mode = 'goals' | 'leagueGoals' | 'apps';

/** Vertical bar chart of per-season totals with a hover tooltip. */
export function initSeasonChart() {
  const host = document.getElementById('season-chart');
  const tip = document.getElementById('chart-tooltip');
  if (!host || !tip) return;

  let mode: Mode = 'goals';

  function draw() {
    host!.innerHTML = '';
    const W = 1000;
    const H = 420;
    const pad = { l: 36, r: 10, t: 30, b: 56 };
    const svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);

    const max = Math.max(...seasons.map((s) => s[mode])) * 1.12;
    const innerW = W - pad.l - pad.r;
    const innerH = H - pad.t - pad.b;
    const gap = 10;
    const bw = innerW / seasons.length - gap;

    // grid lines
    const steps = 5;
    for (let i = 0; i <= steps; i++) {
      const v = Math.round((max / steps) * i);
      const y = pad.t + innerH - (v / max) * innerH;
      const line = document.createElementNS(NS, 'line');
      line.setAttribute('x1', String(pad.l));
      line.setAttribute('x2', String(W - pad.r));
      line.setAttribute('y1', String(y));
      line.setAttribute('y2', String(y));
      line.setAttribute('class', 'grid-line');
      svg.appendChild(line);
      const lbl = document.createElementNS(NS, 'text');
      lbl.setAttribute('x', String(pad.l - 8));
      lbl.setAttribute('y', String(y + 4));
      lbl.setAttribute('text-anchor', 'end');
      lbl.setAttribute('class', 'axis');
      lbl.textContent = String(v);
      svg.appendChild(lbl);
    }

    seasons.forEach((s, i) => {
      const x = pad.l + i * (bw + gap) + gap / 2;
      const v = s[mode];
      const h = (v / max) * innerH;
      const y = pad.t + innerH - h;

      const rect = document.createElementNS(NS, 'rect');
      rect.setAttribute('x', String(x));
      rect.setAttribute('y', String(y));
      rect.setAttribute('width', String(bw));
      rect.setAttribute('height', String(Math.max(h, 2)));
      rect.setAttribute('rx', '6');
      rect.setAttribute('fill', clubColour(s.clubId));
      rect.setAttribute('class', 'bar');
      rect.dataset.i = String(i);
      rect.style.transformBox = 'fill-box';
      rect.style.transformOrigin = 'bottom';
      svg.appendChild(rect);

      if (rect.animate && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        rect.animate([{ transform: 'scaleY(0)' }, { transform: 'scaleY(1)' }], {
          duration: 700,
          delay: i * 45,
          easing: 'cubic-bezier(0.22,1,0.36,1)',
          fill: 'both',
        });
      }

      const val = document.createElementNS(NS, 'text');
      val.setAttribute('x', String(x + bw / 2));
      val.setAttribute('y', String(y - 8));
      val.setAttribute('text-anchor', 'middle');
      val.setAttribute('class', 'val');
      val.textContent = String(v);
      svg.appendChild(val);

      const lab = document.createElementNS(NS, 'text');
      lab.setAttribute('x', String(x + bw / 2));
      lab.setAttribute('y', String(H - pad.b + 20));
      lab.setAttribute('text-anchor', 'middle');
      lab.setAttribute('class', 'axis');
      lab.textContent = s.season.replace('–', '/');
      svg.appendChild(lab);

      const club = document.createElementNS(NS, 'text');
      club.setAttribute('x', String(x + bw / 2));
      club.setAttribute('y', String(H - pad.b + 36));
      club.setAttribute('text-anchor', 'middle');
      club.setAttribute('class', 'axis');
      club.setAttribute('fill', clubColour(s.clubId));
      club.textContent = s.club;
      svg.appendChild(club);
    });

    host!.appendChild(svg);

    // legend
    const legend = document.createElement('div');
    legend.className = 'chart-legend';
    legend.innerHTML = stints.map((s) => `<span><i style="background:${s.theme.accent}"></i>${s.short}</span>`).join('');
    host!.appendChild(legend);
  }

  const labelFor = (m: Mode) => (m === 'goals' ? 'goals, all competitions' : m === 'leagueGoals' ? 'league goals' : 'appearances');

  host.addEventListener('pointermove', (e) => {
    const t = e.target as SVGElement;
    if (!(t instanceof SVGRectElement) || t.dataset.i === undefined) {
      tip.classList.remove('is-on');
      return;
    }
    const s: SeasonRow = seasons[Number(t.dataset.i)];
    tip.innerHTML = `<b>${s[mode]}</b>${labelFor(mode)}<br><small>${s.season} · ${s.club} · ${s.apps} apps · ${s.goals} goals</small>`;
    tip.style.left = `${e.clientX}px`;
    tip.style.top = `${e.clientY}px`;
    tip.classList.add('is-on');
  });
  host.addEventListener('pointerleave', () => tip.classList.remove('is-on'));

  document.querySelectorAll<HTMLButtonElement>('.seasons .chip[data-mode]').forEach((btn) => {
    btn.addEventListener('click', () => {
      mode = btn.dataset.mode as Mode;
      document.querySelectorAll('.seasons .chip').forEach((c) => c.classList.toggle('is-active', c === btn));
      draw();
    });
  });

  draw();
}

/** Compact bar chart of international goals per year. */
export function initIntlChart() {
  const host = document.getElementById('intl-chart');
  if (!host) return;
  const W = 600;
  const H = 300;
  const pad = { l: 10, r: 10, t: 30, b: 34 };
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  const max = Math.max(...intlByYear.map((y) => y.goals)) * 1.15;
  const innerW = W - pad.l - pad.r;
  const innerH = H - pad.t - pad.b;
  const gap = 14;
  const bw = innerW / intlByYear.length - gap;

  intlByYear.forEach((y, i) => {
    const x = pad.l + i * (bw + gap) + gap / 2;
    const h = (y.goals / max) * innerH;
    const top = pad.t + innerH - h;

    const rect = document.createElementNS(NS, 'rect');
    rect.setAttribute('x', String(x));
    rect.setAttribute('y', String(top));
    rect.setAttribute('width', String(bw));
    rect.setAttribute('height', String(Math.max(h, 2)));
    rect.setAttribute('rx', '6');
    rect.setAttribute('fill', y.year === 2026 ? '#ff4d6d' : 'rgba(255,255,255,0.18)');
    if (y.year === 2025) rect.setAttribute('fill', '#ff4d6d');
    svg.appendChild(rect);

    const val = document.createElementNS(NS, 'text');
    val.setAttribute('x', String(x + bw / 2));
    val.setAttribute('y', String(top - 8));
    val.setAttribute('text-anchor', 'middle');
    val.setAttribute('fill', '#f4f2ec');
    val.setAttribute('font-family', 'Anton, Impact, sans-serif');
    val.setAttribute('font-size', '18');
    val.textContent = String(y.goals);
    svg.appendChild(val);

    const lab = document.createElementNS(NS, 'text');
    lab.setAttribute('x', String(x + bw / 2));
    lab.setAttribute('y', String(H - 18));
    lab.setAttribute('text-anchor', 'middle');
    lab.setAttribute('fill', '#f4f2ec');
    lab.setAttribute('font-size', '13');
    lab.setAttribute('font-weight', '600');
    lab.setAttribute('font-family', 'Inter, sans-serif');
    lab.textContent = String(y.year);
    svg.appendChild(lab);

    const caps = document.createElementNS(NS, 'text');
    caps.setAttribute('x', String(x + bw / 2));
    caps.setAttribute('y', String(H - 4));
    caps.setAttribute('text-anchor', 'middle');
    caps.setAttribute('fill', '#a3a8b8');
    caps.setAttribute('font-size', '10');
    caps.setAttribute('font-family', 'Inter, sans-serif');
    caps.textContent = `${y.apps} caps`;
    svg.appendChild(caps);
  });
  host.appendChild(svg);
}

/** Half-pitch SVG with pulsing zones showing where he does his damage. */
export function initPitch() {
  const host = document.getElementById('pitch');
  if (!host) return;
  host.innerHTML = `
  <svg viewBox="0 0 400 300" role="img" aria-label="Half a football pitch with Haaland's scoring zones highlighted inside the penalty area">
    <defs>
      <linearGradient id="grass" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#0d4a27"/><stop offset="1" stop-color="#0a3d1f"/>
      </linearGradient>
      <radialGradient id="glow"><stop offset="0" stop-color="#6cabdd" stop-opacity="0.9"/><stop offset="1" stop-color="#6cabdd" stop-opacity="0"/></radialGradient>
    </defs>
    <rect x="0" y="0" width="400" height="300" rx="14" fill="url(#grass)"/>
    ${Array.from({ length: 8 }, (_, i) => `<rect x="0" y="${i * 37.5}" width="400" height="18.75" fill="rgba(255,255,255,${i % 2 ? 0.02 : 0})"/>`).join('')}
    <g fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="2">
      <rect x="20" y="20" width="360" height="270"/>
      <rect x="80" y="20" width="240" height="100"/>
      <rect x="150" y="20" width="100" height="40"/>
      <rect x="172" y="12" width="56" height="8" fill="rgba(255,255,255,0.15)"/>
      <path d="M 145 120 A 60 60 0 0 0 255 120"/>
      <line x1="20" y1="290" x2="380" y2="290"/>
    </g>
    <rect x="20" y="196" width="360" height="94" fill="rgba(4,7,12,0.55)"/>
    <circle cx="200" cy="92" r="2.5" fill="rgba(255,255,255,0.7)"/>
    <g>
      <circle class="zone" cx="200" cy="60" r="34" fill="url(#glow)"/>
      <circle class="zone" cx="165" cy="80" r="26" fill="url(#glow)" style="animation-delay:-.8s"/>
      <circle class="zone" cx="236" cy="78" r="26" fill="url(#glow)" style="animation-delay:-1.6s"/>
      <circle class="zone" cx="200" cy="110" r="22" fill="url(#glow)" style="animation-delay:-.4s"/>
      <circle class="zone" cx="150" cy="115" r="16" fill="url(#glow)" style="animation-delay:-2s"/>
      <circle class="zone" cx="252" cy="112" r="16" fill="url(#glow)" style="animation-delay:-1.2s"/>
    </g>
    <text x="200" y="224" text-anchor="middle" fill="rgba(255,255,255,0.55)" font-family="Inter, sans-serif" font-size="10" letter-spacing="2">WHERE HE LIVES</text>
    <text x="200" y="254" text-anchor="middle" fill="#f4f2ec" font-family="Anton, Impact, sans-serif" font-size="24">INSIDE THE BOX</text>
    <text x="200" y="274" text-anchor="middle" fill="rgba(255,255,255,0.55)" font-family="Inter, sans-serif" font-size="10">Almost all of his goals come from inside 18 yards. Zones are illustrative.</text>
  </svg>`;
}
