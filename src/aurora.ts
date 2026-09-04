/**
 * Northern-lights canvas background for the hero.
 * Layered sine-wave "curtains" with additive blending — no images, no shaders.
 */
export function startAurora(canvas: HTMLCanvasElement): () => void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return () => {};

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let width = 0;
  let height = 0;
  let dpr = 1;
  let raf = 0;
  let running = true;

  const curtains = [
    { hue: 150, sat: 80, light: 55, amp: 0.16, freq: 1.3, speed: 0.00018, y: 0.42, thick: 0.28, alpha: 0.55 },
    { hue: 190, sat: 85, light: 60, amp: 0.12, freq: 2.1, speed: 0.00026, y: 0.36, thick: 0.22, alpha: 0.45 },
    { hue: 275, sat: 70, light: 62, amp: 0.2, freq: 0.9, speed: 0.00014, y: 0.5, thick: 0.34, alpha: 0.35 },
    { hue: 345, sat: 75, light: 60, amp: 0.1, freq: 1.7, speed: 0.00022, y: 0.3, thick: 0.18, alpha: 0.3 },
  ];

  const stars: { x: number; y: number; r: number; tw: number }[] = [];

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    stars.length = 0;
    const n = Math.floor((width * height) / 9000);
    for (let i = 0; i < n; i++) {
      stars.push({ x: Math.random() * width, y: Math.random() * height * 0.8, r: Math.random() * 1.2 + 0.2, tw: Math.random() * Math.PI * 2 });
    }
  }

  function draw(t: number) {
    const c = ctx!;
    c.clearRect(0, 0, width, height);

    // Night sky base
    const sky = c.createLinearGradient(0, 0, 0, height);
    sky.addColorStop(0, '#05070d');
    sky.addColorStop(0.6, '#0a1020');
    sky.addColorStop(1, '#07090f');
    c.fillStyle = sky;
    c.fillRect(0, 0, width, height);

    // Stars
    for (const s of stars) {
      const a = 0.35 + 0.65 * Math.abs(Math.sin(t * 0.0012 + s.tw));
      c.globalAlpha = a * 0.8;
      c.fillStyle = '#e8f1ff';
      c.beginPath();
      c.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      c.fill();
    }
    c.globalAlpha = 1;

    // Aurora curtains — drawn as vertical gradient strips whose top edge follows a wave.
    c.globalCompositeOperation = 'lighter';
    const step = Math.max(6, Math.floor(width / 140));
    for (const k of curtains) {
      for (let x = -step; x <= width + step; x += step) {
        const nx = x / width;
        const wave =
          Math.sin(nx * k.freq * Math.PI * 2 + t * k.speed) * 0.6 +
          Math.sin(nx * k.freq * 4.3 + t * k.speed * 1.9 + 1.7) * 0.25 +
          Math.sin(nx * k.freq * 9.1 - t * k.speed * 2.7) * 0.15;
        const top = height * (k.y + wave * k.amp);
        const len = height * k.thick * (0.8 + 0.2 * Math.sin(nx * 7 + t * k.speed * 3));
        const flicker = 0.75 + 0.25 * Math.sin(nx * 23 + t * 0.0021 + k.hue);
        const g = c.createLinearGradient(0, top, 0, top + len);
        g.addColorStop(0, `hsla(${k.hue}, ${k.sat}%, ${k.light}%, 0)`);
        g.addColorStop(0.25, `hsla(${k.hue}, ${k.sat}%, ${k.light}%, ${k.alpha * flicker})`);
        g.addColorStop(1, `hsla(${k.hue + 20}, ${k.sat}%, ${k.light - 10}%, 0)`);
        c.fillStyle = g;
        c.fillRect(x, top, step + 1, len);
      }
    }
    c.globalCompositeOperation = 'source-over';

    // Vignette + ground haze to blend into the page
    const haze = c.createLinearGradient(0, height * 0.55, 0, height);
    haze.addColorStop(0, 'rgba(7,9,15,0)');
    haze.addColorStop(1, 'rgba(7,9,15,1)');
    c.fillStyle = haze;
    c.fillRect(0, 0, width, height);
  }

  function loop(t: number) {
    if (!running) return;
    draw(t);
    if (!reduced) raf = requestAnimationFrame(loop);
  }

  resize();
  window.addEventListener('resize', resize);
  raf = requestAnimationFrame(loop);

  // Pause when the hero is off-screen to save battery.
  const io = new IntersectionObserver(([e]) => {
    if (e.isIntersecting && !running) {
      running = true;
      raf = requestAnimationFrame(loop);
    } else if (!e.isIntersecting) {
      running = false;
      cancelAnimationFrame(raf);
    }
  });
  io.observe(canvas);

  return () => {
    running = false;
    cancelAnimationFrame(raf);
    window.removeEventListener('resize', resize);
    io.disconnect();
  };
}
