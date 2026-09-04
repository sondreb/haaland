/**
 * "Beat the keeper" — a tiny canvas penalty shoot-out.
 * Click inside the goal to shoot; the keeper guesses a zone, biased toward
 * your recent shot placement so spamming one corner stops working.
 */
export function initGame() {
  const canvas = document.getElementById('game-canvas') as HTMLCanvasElement | null;
  const goalsEl = document.getElementById('game-goals');
  const shotsEl = document.getElementById('game-shots');
  const msgEl = document.getElementById('game-msg');
  const resetBtn = document.getElementById('game-reset');
  if (!canvas || !goalsEl || !shotsEl || !msgEl || !resetBtn) return;
  const ctx = canvas.getContext('2d')!;

  const W = canvas.width;
  const H = canvas.height;
  const MAX_SHOTS = 10;

  // Goal geometry (in canvas units)
  const goal = { x: 150, y: 110, w: 600, h: 250 };
  const ballStart = { x: W / 2, y: H - 60 };

  type Zone = 0 | 1 | 2 | 3 | 4 | 5; // 3 columns x 2 rows
  const zoneOf = (px: number, py: number): Zone => {
    const col = Math.min(2, Math.max(0, Math.floor(((px - goal.x) / goal.w) * 3)));
    const row = py < goal.y + goal.h / 2 ? 0 : 1;
    return (row * 3 + col) as Zone;
  };
  const zoneCenter = (z: Zone) => ({
    x: goal.x + (goal.w / 3) * ((z % 3) + 0.5),
    y: goal.y + (goal.h / 2) * (Math.floor(z / 3) + 0.5),
  });

  let goals = 0;
  let shots = 0;
  let history: Zone[] = [];
  let animating = false;
  let ball = { ...ballStart, r: 14 };
  let keeper = { x: W / 2, y: goal.y + goal.h - 60, dive: 0, targetX: W / 2, targetY: goal.y + goal.h - 60 };
  let flash: { text: string; colour: string; t: number } | null = null;

  const messages = {
    goal: ['GOOOAL! Meditation time. 🧘', 'Top bins. Erling nods approvingly.', 'Buried. That’s the Bryne way.', 'Keeper never had a chance.', 'Ice cold. Just like the ice bath.'],
    save: ['Saved! Even Haaland missed vs England.', 'Read like a book. Vary your corners.', 'Denied. Pep is shaking his head.', 'The keeper guessed right this time.'],
    miss: ['Off target! Hit the frame — shoot inside the goal.', 'Row Z. Try clicking inside the posts.'],
  };
  const pick = (a: string[]) => a[Math.floor(Math.random() * a.length)];

  function drawScene() {
    // Grass
    const g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, '#0f5a30');
    g.addColorStop(1, '#0a3d1f');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
    for (let i = 0; i < 8; i++) {
      ctx.fillStyle = i % 2 ? 'rgba(255,255,255,0.03)' : 'transparent';
      ctx.fillRect(0, i * (H / 8), W, H / 8);
    }
    // Crowd band
    ctx.fillStyle = '#0c1226';
    ctx.fillRect(0, 0, W, 95);
    for (let i = 0; i < 160; i++) {
      ctx.fillStyle = `hsla(${200 + Math.sin(i) * 40}, 60%, ${45 + ((i * 7) % 30)}%, 0.55)`;
      ctx.beginPath();
      ctx.arc((i * 37) % W + 5, 30 + ((i * 13) % 55), 4, 0, Math.PI * 2);
      ctx.fill();
    }
    // Net
    ctx.save();
    ctx.beginPath();
    ctx.rect(goal.x, goal.y, goal.w, goal.h);
    ctx.clip();
    ctx.fillStyle = 'rgba(255,255,255,0.05)';
    ctx.fillRect(goal.x, goal.y, goal.w, goal.h);
    ctx.strokeStyle = 'rgba(255,255,255,0.18)';
    ctx.lineWidth = 1;
    for (let x = goal.x; x <= goal.x + goal.w; x += 22) {
      ctx.beginPath(); ctx.moveTo(x, goal.y); ctx.lineTo(x, goal.y + goal.h); ctx.stroke();
    }
    for (let y = goal.y; y <= goal.y + goal.h; y += 22) {
      ctx.beginPath(); ctx.moveTo(goal.x, y); ctx.lineTo(goal.x + goal.w, y); ctx.stroke();
    }
    ctx.restore();
    // Posts
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(goal.x, goal.y + goal.h);
    ctx.lineTo(goal.x, goal.y);
    ctx.lineTo(goal.x + goal.w, goal.y);
    ctx.lineTo(goal.x + goal.w, goal.y + goal.h);
    ctx.stroke();
    // Goal line & penalty spot
    ctx.strokeStyle = 'rgba(255,255,255,0.7)';
    ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(40, goal.y + goal.h + 4); ctx.lineTo(W - 40, goal.y + goal.h + 4); ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.beginPath(); ctx.arc(ballStart.x, ballStart.y, 4, 0, Math.PI * 2); ctx.fill();
  }

  function drawKeeper() {
    const { x, y, dive } = keeper;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(dive);
    // body
    ctx.fillStyle = '#ffd400';
    roundRect(-22, -40, 44, 70, 12);
    // head
    ctx.fillStyle = '#f1c9a5';
    ctx.beginPath(); ctx.arc(0, -58, 16, 0, Math.PI * 2); ctx.fill();
    // arms
    ctx.strokeStyle = '#ffd400';
    ctx.lineWidth = 12;
    ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(-22, -30); ctx.lineTo(-58, -60 + dive * 30); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(22, -30); ctx.lineTo(58, -60 - dive * 30); ctx.stroke();
    // gloves
    ctx.fillStyle = '#fff';
    ctx.beginPath(); ctx.arc(-58, -60 + dive * 30, 9, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(58, -60 - dive * 30, 9, 0, Math.PI * 2); ctx.fill();
    // legs
    ctx.strokeStyle = '#0c1226';
    ctx.beginPath(); ctx.moveTo(-12, 30); ctx.lineTo(-16, 62); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(12, 30); ctx.lineTo(16, 62); ctx.stroke();
    ctx.restore();
  }

  function roundRect(x: number, y: number, w: number, h: number, r: number) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
    ctx.fill();
  }

  function drawBall() {
    ctx.save();
    ctx.shadowColor = 'rgba(0,0,0,0.4)';
    ctx.shadowBlur = 12;
    ctx.shadowOffsetY = 6;
    ctx.fillStyle = '#fff';
    ctx.beginPath(); ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
    ctx.fillStyle = '#111';
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2 + ball.x * 0.02;
      ctx.beginPath();
      ctx.arc(ball.x + Math.cos(a) * ball.r * 0.55, ball.y + Math.sin(a) * ball.r * 0.55, ball.r * 0.22, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function drawFlash() {
    if (!flash) return;
    const alpha = Math.min(1, flash.t);
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = flash.colour;
    ctx.font = 'bold 72px Anton, Impact, sans-serif';
    ctx.textAlign = 'center';
    ctx.shadowColor = 'rgba(0,0,0,0.6)';
    ctx.shadowBlur = 20;
    ctx.fillText(flash.text, W / 2, H / 2 + 20);
    ctx.restore();
  }

  function render() {
    drawScene();
    drawKeeper();
    drawBall();
    drawFlash();
  }

  function keeperGuess(target: Zone): Zone {
    // Weighted guess: 45% pure random, 55% biased to the player's most-used zones.
    const weights = new Array<number>(6).fill(1);
    for (const z of history.slice(-4)) weights[z] += 2.2;
    const total = weights.reduce((a, b) => a + b, 0);
    let r = Math.random() * total;
    let guess: Zone = 0;
    for (let i = 0; i < 6; i++) {
      r -= weights[i];
      if (r <= 0) { guess = i as Zone; break; }
    }
    // Small chance the keeper just reads the strike perfectly.
    if (Math.random() < 0.12) return target;
    return guess;
  }

  function shoot(px: number, py: number) {
    if (animating || shots >= MAX_SHOTS) return;
    animating = true;
    shots++;
    shotsEl!.textContent = String(shots);

    const inside = px > goal.x && px < goal.x + goal.w && py > goal.y && py < goal.y + goal.h;
    const target: Zone = zoneOf(px, py);
    const guess = inside ? keeperGuess(target) : zoneOf(W / 2, goal.y + goal.h - 1);
    const gc = zoneCenter(guess);
    keeper.targetX = gc.x;
    keeper.targetY = Math.min(goal.y + goal.h - 60, gc.y + 30);
    const dir = Math.sign(gc.x - W / 2);
    const diveAngle = dir * (guess < 3 ? 0.9 : 0.45);

    const saved = inside && guess === target;
    const start = performance.now();
    const dur = 520;
    const from = { ...ballStart };
    const kFrom = { x: keeper.x, y: keeper.y };
    if (history.length > 8) history = history.slice(-8);
    if (inside) history.push(target);

    function step(now: number) {
      const t = Math.min(1, (now - start) / dur);
      const e = 1 - Math.pow(1 - t, 3);
      ball.x = from.x + (px - from.x) * e;
      ball.y = from.y + (py - from.y) * e - Math.sin(t * Math.PI) * 40;
      ball.r = 14 - 6 * e;
      keeper.x = kFrom.x + (keeper.targetX - kFrom.x) * e;
      keeper.y = kFrom.y + (keeper.targetY - kFrom.y) * e;
      keeper.dive = diveAngle * e;
      render();
      if (t < 1) {
        requestAnimationFrame(step);
      } else {
        resolve();
      }
    }

    function resolve() {
      let outcome: 'goal' | 'save' | 'miss';
      if (!inside) outcome = 'miss';
      else if (saved) outcome = 'save';
      else outcome = 'goal';

      if (outcome === 'goal') {
        goals++;
        goalsEl!.textContent = String(goals);
        flash = { text: 'GOAL!', colour: '#6cabdd', t: 1 };
      } else if (outcome === 'save') {
        flash = { text: 'SAVED', colour: '#ff4d6d', t: 1 };
      } else {
        flash = { text: 'MISS', colour: '#a3a8b8', t: 1 };
      }
      msgEl!.textContent = pick(messages[outcome]);
      render();

      setTimeout(() => {
        flash = null;
        ball = { ...ballStart, r: 14 };
        keeper = { x: W / 2, y: goal.y + goal.h - 60, dive: 0, targetX: W / 2, targetY: goal.y + goal.h - 60 };
        animating = false;
        render();
        if (shots >= MAX_SHOTS) finish();
      }, 900);
    }

    requestAnimationFrame(step);
  }

  function finish() {
    const verdicts: [number, string][] = [
      [10, 'PERFECT. 10/10 — you are Erling Haaland. Go meditate.'],
      [8, 'Elite. Haaland-tier finishing. Pep wants a word.'],
      [6, 'Solid. A Golden Boot contender in a weak year.'],
      [4, 'Decent. Bryne 2 in the fourth tier would take you.'],
      [0, 'Rough. Even Erling had a goalless first season at Bryne. Restart.'],
    ];
    const v = verdicts.find(([min]) => goals >= min)?.[1] ?? '';
    msgEl!.textContent = `${goals}/${MAX_SHOTS}. ${v}`;
  }

  function reset() {
    goals = 0;
    shots = 0;
    history = [];
    goalsEl!.textContent = '0';
    shotsEl!.textContent = '0';
    msgEl!.textContent = 'Click in the goal to shoot.';
    flash = null;
    animating = false;
    ball = { ...ballStart, r: 14 };
    keeper = { x: W / 2, y: goal.y + goal.h - 60, dive: 0, targetX: W / 2, targetY: goal.y + goal.h - 60 };
    render();
  }

  canvas.addEventListener('pointerdown', (e) => {
    const rect = canvas.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * W;
    const py = ((e.clientY - rect.top) / rect.height) * H;
    if (shots >= MAX_SHOTS) {
      reset();
      return;
    }
    shoot(px, py);
  });
  resetBtn.addEventListener('click', reset);

  render();
}
