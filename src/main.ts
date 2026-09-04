import './style.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { startAurora } from './aurora';
import { initIntlChart, initPitch, initSeasonChart } from './charts';
import { careerTotals, profile, stints } from './data';
import { initGame } from './game';
import { renderAll } from './render';

gsap.registerPlugin(ScrollTrigger);

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const BASE_BG = '#07090f';
const BASE_ACCENT = '#6cabdd';

/* ------------------------------------------------------------------ hero */
function initHero() {
  const canvas = document.getElementById('aurora') as HTMLCanvasElement | null;
  if (canvas) startAurora(canvas);

  const letters = document.querySelectorAll('.hero__letters span');
  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
  tl.to(letters, { opacity: 1, y: 0, rotateX: 0, duration: 1.4, stagger: 0.07, delay: 0.2 });
  tl.add(() => document.querySelectorAll('.hero .reveal').forEach((el, i) => setTimeout(() => el.classList.add('is-in'), i * 120)), '-=0.9');

  // Subtle parallax on the title
  if (!reduced) {
    gsap.to('.hero__inner', {
      yPercent: -18,
      opacity: 0.2,
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
    });
  }

  // Count-up tickers
  const goalsEl = document.getElementById('tick-goals');
  const intlEl = document.getElementById('tick-intl');
  const countTo = (el: HTMLElement | null, target: number) => {
    if (!el) return;
    const obj = { v: 0 };
    gsap.to(obj, {
      v: target,
      duration: reduced ? 0 : 2.2,
      delay: 0.9,
      ease: 'power3.out',
      onUpdate: () => (el.textContent = Math.round(obj.v).toString()),
    });
  };
  countTo(goalsEl, careerTotals.clubGoals);
  countTo(intlEl, careerTotals.intlGoals);

  // Live age clock
  const ageEl = document.getElementById('tick-age');
  const tickAge = () => {
    if (!ageEl) return;
    const now = new Date();
    let years = now.getFullYear() - profile.born.getFullYear();
    const thisYearsBirthday = new Date(now.getFullYear(), profile.born.getMonth(), profile.born.getDate());
    if (now < thisYearsBirthday) years--;
    const lastBirthday = new Date(now.getFullYear() - (now < thisYearsBirthday ? 1 : 0), profile.born.getMonth(), profile.born.getDate());
    const ms = now.getTime() - lastBirthday.getTime();
    const days = Math.floor(ms / 86_400_000);
    const h = Math.floor((ms % 86_400_000) / 3_600_000);
    const m = Math.floor((ms % 3_600_000) / 60_000);
    const s = Math.floor((ms % 60_000) / 1000);
    const pad = (n: number) => n.toString().padStart(2, '0');
    ageEl.textContent = `${years}y ${days}d ${pad(h)}:${pad(m)}:${pad(s)}`;
  };
  tickAge();
  setInterval(tickAge, 1000);
}

/* ------------------------------------------------------------------ nav + progress */
function initNav() {
  const nav = document.getElementById('nav');
  const bar = document.getElementById('progress-bar');
  const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('.nav__links a'));
  let lastY = window.scrollY;

  const onScroll = () => {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (bar) bar.style.width = `${Math.min(100, (y / Math.max(1, max)) * 100)}%`;
    if (nav) nav.classList.toggle('is-hidden', y > lastY && y > 300);
    lastY = y;
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  // Active section highlighting
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        const id = (e.target as HTMLElement).id;
        links.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === `#${id}`));
      }
    },
    { rootMargin: '-40% 0px -55% 0px' },
  );
  links.forEach((a) => {
    const target = document.querySelector(a.getAttribute('href') || '');
    if (target) io.observe(target);
  });
}

/* ------------------------------------------------------------------ scroll reveals + counters */
function initReveals() {
  // Section titles and grids slide in
  gsap.utils.toArray<HTMLElement>('.section__eyebrow, .section__title, .section__lead, .sub--big').forEach((el) => {
    gsap.from(el, {
      y: 30,
      opacity: 0,
      duration: reduced ? 0 : 1,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    });
  });

  gsap.utils.toArray<HTMLElement>(
    '.stat, .record, .wc, .team-cab, .honour, .curio, .social, .trait, .fact, .links li',
  ).forEach((el, i) => {
    gsap.from(el, {
      y: 26,
      opacity: 0,
      duration: reduced ? 0 : 0.8,
      delay: (i % 6) * 0.05,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 92%', once: true },
    });
  });

  // Generic count-up for any .count element with data-target
  gsap.utils.toArray<HTMLElement>('.count').forEach((el) => {
    const raw = el.dataset.raw === '1';
    const target = Number(el.dataset.target);
    if (raw || Number.isNaN(target)) return;
    const obj = { v: 0 };
    ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      once: true,
      onEnter: () =>
        gsap.to(obj, {
          v: target,
          duration: reduced ? 0 : 1.8,
          ease: 'power3.out',
          onUpdate: () => (el.textContent = Math.round(obj.v).toString()),
        }),
    });
  });
}

/* ------------------------------------------------------------------ journey theme morph */
function initJourney() {
  const root = document.documentElement;
  let current = '';
  const setTheme = (id: string, bg: string, accent: string) => {
    if (id === current) return;
    current = id;
    gsap.to('body', { backgroundColor: bg, duration: 0.9, ease: 'power2.out', overwrite: 'auto' });
    root.style.setProperty('--accent', accent);
  };

  const stintEls = Array.from(document.querySelectorAll<HTMLElement>('.stint'));

  // Resolve the theme purely from geometry: whichever chapter contains the
  // viewport's focal line wins; otherwise fall back to the base palette.
  // This stays correct even after anchor jumps or instant scrolls.
  const resolve = () => {
    const focal = window.innerHeight * 0.55;
    for (const el of stintEls) {
      const r = el.getBoundingClientRect();
      if (r.top <= focal && r.bottom >= focal) {
        const s = stints.find((x) => x.id === el.dataset.stint);
        if (s) setTheme(s.id, s.theme.bg, s.theme.accent);
        return;
      }
    }
    setTheme('base', BASE_BG, BASE_ACCENT);
  };
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      resolve();
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  resolve();

  stintEls.forEach((el) => {
    if (!reduced) {
      gsap.from(el.querySelector('.stint__year'), {
        xPercent: -10,
        opacity: 0,
        scrollTrigger: { trigger: el, start: 'top 75%', end: 'top 25%', scrub: 1 },
      });
      gsap.from(el.querySelector('.stint__text'), {
        y: 60,
        opacity: 0,
        scrollTrigger: { trigger: el, start: 'top 70%', end: 'top 35%', scrub: 1 },
      });
    }
  });
}

/* ------------------------------------------------------------------ meditation mode */
function initZen() {
  const zen = document.getElementById('zen');
  const text = document.getElementById('zen-text');
  const open = document.getElementById('zen-toggle');
  const close = document.getElementById('zen-close');
  if (!zen || !text || !open || !close) return;
  let timer: number | undefined;
  const phases = ['Breathe in', 'Hold', 'Breathe out', 'Hold'];

  const show = () => {
    zen.classList.add('is-on');
    zen.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    let i = 0;
    text.textContent = phases[0];
    timer = window.setInterval(() => {
      i = (i + 1) % phases.length;
      text.textContent = phases[i];
    }, 2000);
    close.focus();
  };
  const hide = () => {
    zen.classList.remove('is-on');
    zen.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    window.clearInterval(timer);
    open.focus();
  };

  open.addEventListener('click', show);
  close.addEventListener('click', hide);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && zen.classList.contains('is-on')) hide();
  });
}

/* ------------------------------------------------------------------ easter egg: type "9" three times */
function initEasterEgg() {
  let buf = '';
  document.addEventListener('keydown', (e) => {
    if ((e.target as HTMLElement).tagName === 'INPUT') return;
    buf = (buf + e.key).slice(-3);
    if (buf === '999') {
      buf = '';
      confetti();
    }
  });
}

function confetti() {
  const n = 80;
  const frag = document.createDocumentFragment();
  const pieces: HTMLElement[] = [];
  for (let i = 0; i < n; i++) {
    const el = document.createElement('span');
    el.textContent = i % 3 === 0 ? '⚽' : i % 3 === 1 ? '9' : '🧘';
    el.style.cssText = `position:fixed;left:${Math.random() * 100}vw;top:-5vh;font:700 ${16 + Math.random() * 22}px Anton,Impact,sans-serif;color:${['#6cabdd', '#ba0c2f', '#fde100', '#fff'][i % 4]};z-index:200;pointer-events:none;`;
    frag.appendChild(el);
    pieces.push(el);
  }
  document.body.appendChild(frag);
  gsap.to(pieces, {
    y: '110vh',
    rotation: () => gsap.utils.random(-540, 540),
    x: () => gsap.utils.random(-120, 120),
    duration: () => gsap.utils.random(2, 3.6),
    ease: 'power1.in',
    stagger: 0.01,
    onComplete: () => pieces.forEach((p) => p.remove()),
  });
}

/* ------------------------------------------------------------------ boot */
document.addEventListener('DOMContentLoaded', () => {
  renderAll();
  initHero();
  initNav();
  initSeasonChart();
  initIntlChart();
  initPitch();
  initGame();
  initReveals();
  initJourney();
  initZen();
  initEasterEgg();
  // Web fonts and dynamic content shift layout after triggers are measured.
  // Refresh whenever the document's height actually changes.
  let lastHeight = document.body.scrollHeight;
  let refreshTimer: number | undefined;
  const ro = new ResizeObserver(() => {
    if (document.body.scrollHeight === lastHeight) return;
    lastHeight = document.body.scrollHeight;
    window.clearTimeout(refreshTimer);
    refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 120);
  });
  ro.observe(document.body);
  window.addEventListener('load', () => ScrollTrigger.refresh());
  document.fonts?.addEventListener('loadingdone', () => ScrollTrigger.refresh());
});
