import {
  DATA_AS_OF,
  careerLinks,
  careerTotals,
  curiosities,
  individualHonours,
  intlByYear,
  quotes,
  records,
  socials,
  stints,
  teamHonours,
  worldCup2026,
  type RecordTag,
} from './data';

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string);

const $ = <T extends HTMLElement = HTMLElement>(id: string) => document.getElementById(id) as T | null;

/* ---------------------------------------------------------------- numbers */
export function renderStats() {
  const el = $('stat-grid');
  if (!el) return;
  const c = careerTotals;
  const ratio = (g: number, a: number) => (g / a).toFixed(2);
  // Rough minutes-per-goal, assuming ~82 minutes per appearance (he is often subbed late).
  const minsPerGoal = Math.round((c.clubApps * 82) / c.clubGoals);

  const stats = [
    { value: c.clubGoals, sub: `in ${c.clubApps} club appearances`, label: 'Career club goals', hero: true },
    { value: c.intlGoals, sub: `in ${c.intlCaps} caps — Norway’s all-time record`, label: 'Goals for Norway' },
    { value: c.cityGoals, sub: `in ${c.cityApps} games since 2022`, label: 'Manchester City goals' },
    { value: c.plGoals, sub: `in ${c.plApps} Premier League games`, label: 'Premier League goals' },
    { value: c.uclGoals, sub: `in ${c.uclApps} Champions League games`, label: 'Champions League goals' },
    { value: ratio(c.clubGoals, c.clubApps), sub: 'club goals per appearance, whole career', label: 'Goals per game', raw: true },
    { value: minsPerGoal, sub: 'a goal roughly every hour and a half on the pitch', label: 'Minutes per goal (≈)', unit: 'min' },
    { value: 3, sub: '2022–23 · 2023–24 · 2025–26', label: 'Premier League Golden Boots' },
    { value: 1.95, sub: 'metres. And he still wins the ball on the floor.', label: 'Height', raw: true, unit: 'm' },
  ];

  el.innerHTML = stats
    .map(
      (s) => `
      <div class="stat${s.hero ? ' stat--hero' : ''}">
        <div class="stat__value"><span class="count" data-target="${s.value}" data-raw="${s.raw ? '1' : ''}">${s.raw ? s.value : 0}</span>${s.unit ? `<small>${s.unit}</small>` : ''}</div>
        <div class="stat__label">${esc(s.label)}</div>
        <div class="stat__sub">${esc(s.sub)}</div>
      </div>`,
    )
    .join('');

  const note = $('data-as-of');
  if (note) note.textContent = `Club data as of ${DATA_AS_OF}. International data as of the 2026 World Cup quarter-final (11 July 2026).`;
  const fd = $('footer-date');
  if (fd) fd.textContent = DATA_AS_OF;
}

/* ---------------------------------------------------------------- journey */
export function renderJourney() {
  const el = $('journey-track');
  if (!el) return;
  el.innerHTML = stints
    .map(
      (s) => `
      <article class="stint" data-stint="${s.id}" style="--stint-accent:${s.theme.accent}">
        <span class="stint__dot" aria-hidden="true"></span>
        <div class="stint__inner">
          <div class="stint__visual">
            <div class="stint__year">${s.from}</div>
            <div class="stint__club">${esc(s.club)}</div>
            <div class="stint__years">${esc(s.years)} · ${esc(s.country)}</div>
            <div class="stint__stats">
              <div><b class="count" data-target="${s.apps}">0</b><span>apps</span></div>
              <div><b class="count" data-target="${s.goals}">0</b><span>goals</span></div>
            </div>
          </div>
          <div class="stint__text">
            <span class="stint__badge"><i></i>${esc(s.short)}</span>
            <h3 class="stint__headline">${esc(s.headline)}</h3>
            <p class="stint__story">${esc(s.story)}</p>
            <ul class="stint__moments">${s.moments.map((m) => `<li>${esc(m)}</li>`).join('')}</ul>
          </div>
        </div>
      </article>`,
    )
    .join('');
}

/* ---------------------------------------------------------------- records */
export function renderRecords() {
  const grid = $('record-grid');
  const filters = $('record-filters');
  if (!grid || !filters) return;

  const tags: ('All' | RecordTag)[] = ['All', 'Premier League', 'Champions League', 'Norway', 'Bundesliga', 'World'];
  filters.innerHTML = tags
    .map((t, i) => `<button class="chip${i === 0 ? ' is-active' : ''}" type="button" data-tag="${esc(t)}">${esc(t)}</button>`)
    .join('');

  grid.innerHTML = records
    .map(
      (r) => `
      <div class="record" data-tag="${esc(r.tag)}" tabindex="0" role="button" aria-label="${esc(r.label)}: ${esc(r.detail)}">
        <div class="record__inner">
          <div class="record__face record__face--front">
            <div>
              <div class="record__tag">${esc(r.tag)}</div>
              <div class="record__value">${esc(r.value)}</div>
            </div>
            <div>
              <div class="record__label">${esc(r.label)}</div>
              <div class="record__hint">hover / tap to flip</div>
            </div>
          </div>
          <div class="record__face record__face--back">
            <div class="record__tag">${esc(r.tag)}</div>
            <p class="record__detail">${esc(r.detail)}</p>
            <div class="record__hint">${esc(r.value)} · ${esc(r.label)}</div>
          </div>
        </div>
      </div>`,
    )
    .join('');

  filters.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('button[data-tag]');
    if (!btn) return;
    filters.querySelectorAll('.chip').forEach((c) => c.classList.toggle('is-active', c === btn));
    const tag = btn.dataset.tag;
    grid.querySelectorAll<HTMLElement>('.record').forEach((card) => {
      card.classList.toggle('is-hidden', tag !== 'All' && card.dataset.tag !== tag);
    });
  });

  grid.addEventListener('click', (e) => {
    const card = (e.target as HTMLElement).closest('.record');
    card?.classList.toggle('is-flipped');
  });
  grid.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const card = (e.target as HTMLElement).closest('.record');
    if (card) {
      e.preventDefault();
      card.classList.toggle('is-flipped');
    }
  });
}

/* ---------------------------------------------------------------- norway */
export function renderNorway() {
  const facts = $('norway-facts');
  if (facts) {
    const totalGoals = intlByYear.reduce((a, y) => a + y.goals, 0);
    const totalApps = intlByYear.reduce((a, y) => a + y.apps, 0);
    const items = [
      { b: `${totalGoals}`, s: `goals in ${totalApps} caps — ${(totalGoals / totalApps).toFixed(2)} per game` },
      { b: '1937', s: 'the year Jørgen Juve set the Norway record Haaland broke at 24' },
      { b: '17', s: 'goals in 2025 alone — his most prolific international year' },
      { b: '14', s: 'consecutive competitive internationals with a goal' },
      { b: '7', s: 'World Cup goals in 5 games — Norway’s all-time tournament record' },
      { b: 'QF', s: 'Norway’s best-ever World Cup finish, 2026' },
    ];
    facts.innerHTML = items.map((i) => `<div class="fact"><b>${esc(i.b)}</b><span>${esc(i.s)}</span></div>`).join('');
  }

  const run = $('wc-run');
  if (run) {
    run.innerHTML = worldCup2026
      .map(
        (m) => `
        <article class="wc wc--${m.result}">
          <div class="wc__stage">${esc(m.stage)} · ${esc(m.date)}</div>
          <div class="wc__opp"><span class="wc__code" aria-hidden="true">${esc(m.flag)}</span>${esc(m.opponent)}</div>
          <div class="wc__score">${esc(m.score)}</div>
          <div class="wc__goals" aria-label="${m.goals} goals">${'⚽'.repeat(m.goals) || '<span style="color:var(--muted);font-size:.8rem">no goal</span>'}</div>
          ${m.potm ? '<div class="wc__potm">★ Player of the match</div>' : ''}
          <p class="wc__note">${esc(m.note)}</p>
        </article>`,
      )
      .join('');
  }
}

/* ---------------------------------------------------------------- trophies */
export function renderTrophies() {
  const teams = $('trophy-teams');
  if (teams) {
    const colour: Record<string, string> = { 'Red Bull Salzburg': '#ff2e2e', 'Borussia Dortmund': '#fde100', 'Manchester City': '#6cabdd' };
    teams.innerHTML = teamHonours
      .map(
        (t) => `
        <div class="team-cab">
          <h3><i style="background:${colour[t.club] ?? 'var(--accent)'}"></i>${esc(t.club)}</h3>
          <ul>${t.items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>
        </div>`,
      )
      .join('');
  }
  const hon = $('honours');
  if (hon) {
    hon.innerHTML = individualHonours.map((h) => `<div class="honour"><b>${esc(h.title)}</b><span>${esc(h.when)}</span></div>`).join('');
  }
}

/* ---------------------------------------------------------------- anatomy */
export function renderTraits() {
  const el = $('traits');
  if (!el) return;
  const traits = [
    { icon: '📏', b: '1.95 m of frame', s: 'Holds play up, protects the ball, wins headers, shrugs off centre-backs — and still finishes like a poacher.' },
    { icon: '⚡', b: 'Pace that shouldn’t exist at that size', s: 'Runs in behind, changes the line of his run and accelerates into the gap. Defenders can’t read him.' },
    { icon: '🦶', b: 'Both feet, and the head', s: 'Left-foot dominant, right-foot lethal, aerially dominant. Every kind of goal.' },
    { icon: '🧠', b: 'Barely ever offside', s: '“He knows always where the decisive gaps are” — Klopp. Tiny, sharp movements inside the box.' },
    { icon: '🧘', b: 'Calm', s: 'Meditation off the pitch, ice-cold on it. The celebration is a mindset.' },
    { icon: '🎯', b: 'Idols', s: 'Zlatan Ibrahimović and Cristiano Ronaldo — plus Michu, Vardy, Agüero and Van Persie. Toughest opponents: Van Dijk and Ramos.' },
  ];
  el.innerHTML = traits
    .map((t) => `<div class="trait"><div class="trait__icon">${t.icon}</div><div><b>${esc(t.b)}</b><span>${esc(t.s)}</span></div></div>`)
    .join('');
}

/* ---------------------------------------------------------------- curiosities */
export function renderCurios() {
  const el = $('curio-grid');
  if (!el) return;
  el.innerHTML = curiosities
    .map((c) => `<article class="curio"><span class="curio__emoji" aria-hidden="true">${c.emoji}</span><h3>${esc(c.title)}</h3><p>${esc(c.text)}</p></article>`)
    .join('');
}

/* ---------------------------------------------------------------- quotes */
export function renderQuotes() {
  const el = $('quotes-track');
  if (!el) return;
  const card = (q: (typeof quotes)[number]) =>
    `<blockquote class="quote"><p>${esc(q.text)}</p><footer><b>${esc(q.who)}</b> — ${esc(q.role)}</footer></blockquote>`;
  // Duplicate for a seamless marquee loop.
  el.innerHTML = [...quotes, ...quotes].map(card).join('');
}

/* ---------------------------------------------------------------- follow */
export function renderFollow() {
  const grid = $('social-grid');
  if (grid) {
    const brand: Record<string, { bg: string; mark: string }> = {
      instagram: { bg: '#e1306c', mark: 'IG' },
      x: { bg: '#3a3f4b', mark: '𝕏' },
      tiktok: { bg: '#25f4ee', mark: '♪' },
      youtube: { bg: '#ff0000', mark: '▶' },
      facebook: { bg: '#1877f2', mark: 'f' },
      snapchat: { bg: '#fffc00', mark: '👻' },
    };
    grid.innerHTML = socials
      .map((s) => {
        const b = brand[s.icon] ?? { bg: '#6cabdd', mark: '•' };
        return `
        <a class="social" href="${esc(s.url)}" target="_blank" rel="noopener noreferrer" style="--brand:${b.bg}">
          <span class="social__mark" style="${s.icon === 'snapchat' || s.icon === 'tiktok' ? 'color:#04070c' : ''}">${b.mark}</span>
          <span class="social__name">${esc(s.name)}</span>
          <span class="social__handle">${esc(s.handle)}</span>
          ${s.followers ? `<span class="social__followers">${esc(s.followers)}</span>` : ''}
        </a>`;
      })
      .join('');
  }
  const links = $('career-links');
  if (links) {
    links.innerHTML = careerLinks
      .map((l) => `<li><a href="${esc(l.url)}" target="_blank" rel="noopener noreferrer">${esc(l.name)}</a></li>`)
      .join('');
  }
}

export function renderAll() {
  renderStats();
  renderJourney();
  renderRecords();
  renderNorway();
  renderTrophies();
  renderTraits();
  renderCurios();
  renderQuotes();
  renderFollow();
}
