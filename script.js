// ── Element refs ──────────────────────────────────────────────
const bikeEl           = document.getElementById('bike');
const scoreEl          = document.getElementById('score');
const bestEl           = document.getElementById('best');
const speedEl          = document.getElementById('speedDisplay');
const livesEl          = document.getElementById('livesDisplay');
const startScreen      = document.getElementById('startScreen');
const gameOverScreen   = document.getElementById('gameOverScreen');
const goScoreEl        = document.getElementById('goScore');
const goBestEl         = document.getElementById('goBest');
const goComboEl        = document.getElementById('goCombo');
const newBestMsg       = document.getElementById('newBestMsg');
const obstaclesLayer   = document.getElementById('obstaclesLayer');
const powerupLayer     = document.getElementById('powerupLayer');
const particleLayer    = document.getElementById('particleLayer');
const floatingTextLayer= document.getElementById('floatingTextLayer');
const markerLayer      = document.getElementById('markerLayer');
const gameEl           = document.getElementById('game');
const roadBg           = document.getElementById('roadBg');
const roadSurface      = document.getElementById('roadSurface');
const shieldBubble     = document.getElementById('shieldBubble');
const comboWrap        = document.getElementById('comboWrap');
const comboFill        = document.getElementById('comboFill');
const comboCount       = document.getElementById('comboCount');

// ── Constants ──────────────────────────────────────────────────
const GAME_H      = 510;
const LANES       = [28, 130, 232];
const BIKE_W      = 40;
const BIKE_H      = 72;
const OBS_W       = 40;
const OBS_H       = 68;
const BASE_SPD    = 4;
const MAX_OBS     = 2;
const MAX_LIVES   = 3;
const COMBO_MAX   = 10;   // combos needed to fill bar
const INVULN_MS   = 1400; // invulnerability window after a hit

// Power-up definitions
const POWERUP_TYPES = [
  { type: 'shield', icon: '🛡️', chance: 0.35 },
  { type: 'boost',  icon: '⚡', chance: 0.35 },
  { type: 'life',   icon: '💜', chance: 0.30 },
];

// Obstacle colour palettes
const OBS_PALETTES = [
  { body: '#ff4444', tint: '#ff8888', dark: '#200000' },
  { body: '#ffd700', tint: '#ffe566', dark: '#201a00' },
  { body: '#00bfff', tint: '#66ddff', dark: '#001520' },
  { body: '#ff69b4', tint: '#ffaacc', dark: '#200010' },
  { body: '#39ff14', tint: '#88ff66', dark: '#001500' },
  { body: '#ff8c00', tint: '#ffb040', dark: '#1e0d00' },
];

// ── State ──────────────────────────────────────────────────────
let currentLane   = 1;
let gameRunning   = false;
let score         = 0;
let bestScore     = 0;
let speed         = BASE_SPD;
let frameId       = null;
let obstacles     = [];
let powerups      = [];
let spawnTimer    = 0;
let powerupTimer  = 0;
let spawnInterval = 90;
let powerupInterval = 220;
let leanTimer     = null;
let lives         = MAX_LIVES;
let shieldActive  = false;
let shieldTimer   = null;
let invulnerable  = false;
let invulnTimer   = null;
let combo         = 0;
let bestCombo     = 0;
let markerY       = -40;

// ── SVG builders ──────────────────────────────────────────────
function makeObstacleSVG(palette) {
  const { body, tint, dark } = palette;
  return `<svg viewBox="0 0 40 68" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="12" cy="60" rx="8" ry="6" fill="#111"/>
    <ellipse cx="28" cy="60" rx="8" ry="6" fill="#111"/>
    <ellipse cx="12" cy="8"  rx="7" ry="5" fill="#111"/>
    <ellipse cx="28" cy="8"  rx="7" ry="5" fill="#111"/>
    <rect x="7"  y="15" width="26" height="36" rx="5" fill="${body}"/>
    <rect x="11" y="7"  width="18" height="14" rx="4" fill="${body}" opacity="0.85"/>
    <rect x="13" y="9"  width="14" height="9"  rx="2" fill="${dark}" opacity="0.75"/>
    <rect x="14" y="10" width="5"  height="7"  rx="1" fill="${tint}" opacity="0.35"/>
    <rect x="21" y="10" width="5"  height="7"  rx="1" fill="${tint}" opacity="0.35"/>
    <rect x="7"  y="26" width="4"  height="10" rx="2" fill="${body}" opacity="0.5"/>
    <rect x="29" y="26" width="4"  height="10" rx="2" fill="${body}" opacity="0.5"/>
    <rect x="11" y="32" width="18" height="10" rx="2" fill="${dark}" opacity="0.4"/>
    <rect x="14" y="47" width="12" height="3"  rx="1" fill="#ff2222" opacity="0.95"/>
    <rect x="15" y="18" width="10" height="2"  rx="1" fill="${tint}" opacity="0.6"/>
  </svg>`;
}

// ── Spawners ───────────────────────────────────────────────────
function spawnObstacle() {
  const occupiedLanes = obstacles.filter(o => o.top < 130).map(o => o.lane);
  const free = [0, 1, 2].filter(l => !occupiedLanes.includes(l));
  if (!free.length) return;

  const lane    = free[Math.floor(Math.random() * free.length)];
  const palette = OBS_PALETTES[Math.floor(Math.random() * OBS_PALETTES.length)];

  const el = document.createElement('div');
  el.className = 'obstacle';
  el.innerHTML = makeObstacleSVG(palette);
  el.style.left = LANES[lane] + 'px';
  el.style.top  = -OBS_H + 'px';
  obstaclesLayer.appendChild(el);
  obstacles.push({ el, top: -OBS_H, lane });
}

function spawnPowerup() {
  // Only one powerup at a time
  if (powerups.length > 0) return;

  // Pick type by weighted random
  const roll = Math.random();
  let cumulative = 0;
  let chosen = POWERUP_TYPES[0];
  for (const p of POWERUP_TYPES) {
    cumulative += p.chance;
    if (roll < cumulative) { chosen = p; break; }
  }

  // Don't spawn a life if already full
  if (chosen.type === 'life' && lives >= MAX_LIVES) return;

  // Random free lane
  const lane = Math.floor(Math.random() * 3);

  const el = document.createElement('div');
  el.className = `powerup ${chosen.type}`;
  el.textContent = chosen.icon;
  el.style.left = (LANES[lane] + (OBS_W - 32) / 2) + 'px';
  el.style.top  = -36 + 'px';
  powerupLayer.appendChild(el);
  powerups.push({ el, top: -36, lane, type: chosen.type });
}

// ── Update loops ───────────────────────────────────────────────
function updateObstacles() {
  for (let i = obstacles.length - 1; i >= 0; i--) {
    const obs = obstacles[i];
    obs.top += speed;
    obs.el.style.top = obs.top + 'px';

    if (obs.top > GAME_H) {
      obs.el.remove();
      obstacles.splice(i, 1);
      addScore(obs);
      continue;
    }

    if (!invulnerable && checkCollision(obs, OBS_W, OBS_H)) {
      handleCrash();
      return;
    }
  }
}

function updatePowerups() {
  for (let i = powerups.length - 1; i >= 0; i--) {
    const pu = powerups[i];
    pu.top += speed;
    pu.el.style.top = pu.top + 'px';

    if (pu.top > GAME_H) {
      pu.el.remove();
      powerups.splice(i, 1);
      continue;
    }

    if (checkCollision(pu, 32, 32)) {
      collectPowerup(pu, i);
    }
  }
}

function updateMarkers() {
  markerY += speed;
  if (markerY > GAME_H + 20) {
    markerY = -40;
    const m = document.createElement('div');
    m.className = 'road-marker';
    m.textContent = `── ${score} ──`;
    m.style.top = '-40px';
    markerLayer.appendChild(m);
    // animate it down then remove
    const startTime = performance.now();
    function tick(now) {
      const elapsed = now - startTime;
      const y = -40 + (speed * elapsed / 16.67);
      m.style.top = y + 'px';
      if (y > GAME_H + 20) { m.remove(); return; }
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
}

function checkCollision(obj, w, h) {
  const bikeLeft = LANES[currentLane];
  const bikeTop  = GAME_H - 22 - BIKE_H;
  const objLeft  = LANES[obj.lane] + (OBS_W - w) / 2;
  const pad = 8;

  return (
    bikeLeft + pad          < objLeft + w - pad &&
    bikeLeft + BIKE_W - pad > objLeft + pad      &&
    bikeTop  + pad          < obj.top + h - pad  &&
    bikeTop  + BIKE_H - pad > obj.top + pad
  );
}

// ── Score & Combo ──────────────────────────────────────────────
function addScore(obs) {
  score++;
  combo++;
  if (combo > bestCombo) bestCombo = combo;
  scoreEl.textContent = score;

  popEl(scoreEl);
  spawnScoreRing(obs);
  spawnFloatingText(obs.lane, `+1`, '#00e5ff');
  updateComboBar();

  // Bonus at combo milestones
  if (combo > 0 && combo % 5 === 0) {
    score += 2;
    scoreEl.textContent = score;
    spawnFloatingText(obs.lane, `COMBO x${combo}! +2`, '#ffd700');
  }

  // Speed ramp every 5 dodges
  if (score % 5 === 0) {
    speed = Math.min(BASE_SPD + Math.floor(score / 5) * 1.1, 18);
    spawnInterval = Math.max(38, 90 - score * 1.8);
    speedEl.textContent = (speed / BASE_SPD).toFixed(1) + 'x';
    popEl(speedEl);

    gameEl.classList.remove('speed-burst');
    void gameEl.offsetWidth;
    gameEl.classList.add('speed-burst');
  }
}

function updateComboBar() {
  const pct = Math.min((combo / COMBO_MAX) * 100, 100);
  comboFill.style.width = pct + '%';
  comboCount.textContent = 'x' + combo;

  if (combo >= 5) {
    comboFill.classList.add('hot');
    comboWrap.classList.add('active');
  } else if (combo > 0) {
    comboFill.classList.remove('hot');
    comboWrap.classList.add('active');
  } else {
    comboFill.classList.remove('hot');
    comboWrap.classList.remove('active');
  }
}

function resetCombo() {
  combo = 0;
  updateComboBar();
}

// ── Power-up effects ───────────────────────────────────────────
function collectPowerup(pu, idx) {
  pu.el.remove();
  powerups.splice(idx, 1);

  switch (pu.type) {
    case 'shield':
      activateShield();
      spawnFloatingText(pu.lane, '🛡️ SHIELD!', '#00e5ff');
      break;
    case 'boost':
      activateBoost();
      spawnFloatingText(pu.lane, '⚡ BOOST!', '#ffd700');
      break;
    case 'life':
      gainLife();
      spawnFloatingText(pu.lane, '💜 +1 LIFE', '#ff80aa');
      break;
  }
}

function activateShield() {
  shieldActive = true;
  shieldBubble.classList.remove('hidden');
  syncShieldPosition();
  clearTimeout(shieldTimer);
  shieldTimer = setTimeout(() => {
    shieldActive = false;
    shieldBubble.classList.add('hidden');
  }, 5000);
}

function syncShieldPosition() {
  if (!shieldActive) return;
  const bikeLeft = parseInt(bikeEl.style.left);
  shieldBubble.style.left = (bikeLeft - 9) + 'px';
}

function activateBoost() {
  // Temp speed reduction (feels like the world slows, you speed up)
  const prevSpeed = speed;
  speed = Math.max(speed * 0.6, BASE_SPD);
  spawnInterval = Math.max(spawnInterval * 1.4, 90);
  gameEl.style.transition = 'filter 0.2s';
  gameEl.style.filter = 'brightness(1.15) saturate(1.3)';
  setTimeout(() => {
    speed = prevSpeed;
    spawnInterval = Math.max(38, 90 - score * 1.8);
    gameEl.style.filter = '';
  }, 3000);
}

function gainLife() {
  if (lives < MAX_LIVES) {
    lives++;
    updateLivesDisplay();
    popEl(livesEl);
  }
}

// ── Crash handling ─────────────────────────────────────────────
function handleCrash() {
  if (shieldActive) {
    // Shield absorbs the hit
    shieldActive = false;
    clearTimeout(shieldTimer);
    shieldBubble.classList.add('hidden');
    shieldBubble.classList.remove('shield-hit');
    void shieldBubble.offsetWidth;
    shieldBubble.classList.add('shield-hit');
    setInvulnerable();
    resetCombo();
    return;
  }

  lives--;
  updateLivesDisplay();
  livesEl.classList.remove('lives-flash');
  void livesEl.offsetWidth;
  livesEl.classList.add('lives-flash');
  spawnCrashParticles();
  resetCombo();

  if (lives <= 0) {
    triggerGameOver();
  } else {
    setInvulnerable();
    // Screen flash
    gameEl.classList.remove('crash-flash');
    void gameEl.offsetWidth;
    gameEl.classList.add('crash-flash');
  }
}

function setInvulnerable() {
  invulnerable = true;
  bikeEl.style.opacity = '0.4';
  clearTimeout(invulnTimer);
  invulnTimer = setTimeout(() => {
    invulnerable = false;
    bikeEl.style.opacity = '1';
  }, INVULN_MS);
}

function updateLivesDisplay() {
  const hearts = ['', '❤️', '❤️❤️', '❤️❤️❤️'];
  livesEl.textContent = hearts[Math.max(0, lives)];
}

// ── Particles / FX ─────────────────────────────────────────────
function spawnScoreRing(obs) {
  const ring = document.createElement('div');
  ring.className = 'score-ring';
  ring.style.left = (LANES[obs.lane] + OBS_W / 2) + 'px';
  ring.style.top  = (GAME_H - 80) + 'px';
  particleLayer.appendChild(ring);
  setTimeout(() => ring.remove(), 520);
}

function spawnFloatingText(lane, text, color) {
  const el = document.createElement('div');
  el.className = 'floating-text';
  el.textContent = text;
  el.style.color = color;
  el.style.textShadow = `0 0 10px ${color}`;
  el.style.left = (LANES[lane] + OBS_W / 2) + 'px';
  el.style.top  = (GAME_H - 120) + 'px';
  floatingTextLayer.appendChild(el);
  setTimeout(() => el.remove(), 900);
}

function spawnCrashParticles() {
  const x = LANES[currentLane] + BIKE_W / 2;
  const y = GAME_H - 22 - BIKE_H / 2;
  const colors = ['#ff4500', '#ff7700', '#ffd700', '#ffffff', '#ff2200'];

  for (let i = 0; i < 18; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const angle = (i / 18) * Math.PI * 2;
    const dist  = 30 + Math.random() * 50;
    p.style.left       = x + 'px';
    p.style.top        = y + 'px';
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    p.style.setProperty('--dx', Math.cos(angle) * dist + 'px');
    p.style.setProperty('--dy', Math.sin(angle) * dist + 'px');
    p.style.animationDuration = (0.4 + Math.random() * 0.3) + 's';
    particleLayer.appendChild(p);
    setTimeout(() => p.remove(), 800);
  }
}

// ── Road sync ──────────────────────────────────────────────────
function syncRoadSpeed() {
  const dur    = Math.max(0.07, 0.32 - (speed - BASE_SPD) * 0.014);
  const durStr = dur + 's';
  roadBg.style.animationDuration = durStr;
  roadSurface.querySelectorAll('.lane-line, .curb').forEach(el => {
    el.style.animationDuration = durStr;
  });
}

// ── Game loop ──────────────────────────────────────────────────
function gameLoop() {
  if (!gameRunning) return;

  spawnTimer++;
  if (spawnTimer >= spawnInterval && obstacles.length < MAX_OBS) {
    spawnTimer = 0;
    spawnObstacle();
  }

  powerupTimer++;
  if (powerupTimer >= powerupInterval) {
    powerupTimer = 0;
    spawnPowerup();
  }

  updateObstacles();
  updatePowerups();
  syncRoadSpeed();
  syncShieldPosition();

  frameId = requestAnimationFrame(gameLoop);
}

// ── Lane movement ──────────────────────────────────────────────
function moveLane(dir) {
  if (!gameRunning) return;
  const next = currentLane + dir;
  if (next < 0 || next > 2) return;

  currentLane = next;
  bikeEl.style.left = LANES[currentLane] + 'px';

  bikeEl.classList.remove('lean-left', 'lean-right');
  void bikeEl.offsetWidth;
  bikeEl.classList.add(dir < 0 ? 'lean-left' : 'lean-right');

  clearTimeout(leanTimer);
  leanTimer = setTimeout(() => bikeEl.classList.remove('lean-left', 'lean-right'), 180);
}

function tapLane(dir) { moveLane(dir); }

// ── Pop helper ─────────────────────────────────────────────────
function popEl(el) {
  el.classList.remove('pop');
  void el.offsetWidth;
  el.classList.add('pop');
  setTimeout(() => el.classList.remove('pop'), 300);
}

// ── Game lifecycle ─────────────────────────────────────────────
function startGame() {
  if (gameRunning) return;

  // Clean up
  obstacles.forEach(o => o.el.remove());
  powerups.forEach(p => p.el.remove());
  obstacles     = [];
  powerups      = [];
  score         = 0;
  speed         = BASE_SPD;
  spawnTimer    = 0;
  powerupTimer  = 0;
  spawnInterval = 90;
  currentLane   = 1;
  lives         = MAX_LIVES;
  combo         = 0;
  bestCombo     = 0;
  shieldActive  = false;
  invulnerable  = false;
  markerY       = -40;

  bikeEl.style.opacity = '1';
  bikeEl.style.filter  = '';
  gameEl.style.filter  = '';
  shieldBubble.classList.add('hidden');
  markerLayer.innerHTML    = '';
  particleLayer.innerHTML  = '';
  floatingTextLayer.innerHTML = '';
  newBestMsg.classList.add('hidden');

  scoreEl.textContent = '0';
  speedEl.textContent = '1.0x';
  bikeEl.style.left   = LANES[1] + 'px';
  bikeEl.classList.remove('lean-left', 'lean-right');
  updateLivesDisplay();
  updateComboBar();

  startScreen.classList.add('hidden');
  gameOverScreen.classList.add('hidden');

  gameRunning = true;
  frameId = requestAnimationFrame(gameLoop);
}

function restartGame() {
  gameRunning = false;
  cancelAnimationFrame(frameId);
  clearTimeout(shieldTimer);
  clearTimeout(invulnTimer);
  startGame();
}

function triggerGameOver() {
  gameRunning = false;
  cancelAnimationFrame(frameId);
  clearTimeout(shieldTimer);
  clearTimeout(invulnTimer);

  spawnCrashParticles();

  const isNewBest = score > bestScore;
  if (isNewBest) bestScore = score;

  bestEl.textContent    = bestScore;
  goScoreEl.textContent = score;
  goBestEl.textContent  = bestScore;
  goComboEl.textContent = bestCombo + 'x';

  if (isNewBest) newBestMsg.classList.remove('hidden');

  gameOverScreen.classList.remove('hidden', 'crash-flash');
  void gameOverScreen.offsetWidth;
  gameOverScreen.classList.add('crash-flash');
}

// ── Keyboard ───────────────────────────────────────────────────
document.addEventListener('keydown', (e) => {
  if (!gameRunning) {
    if (e.key === 'Enter' || e.key === ' ') {
      if (!startScreen.classList.contains('hidden'))    startGame();
      else if (!gameOverScreen.classList.contains('hidden')) restartGame();
    }
    return;
  }
  if (e.key === 'ArrowLeft'  || e.key === 'a' || e.key === 'A') { moveLane(-1); e.preventDefault(); }
  if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') { moveLane(1);  e.preventDefault(); }
});

// ── Touch ──────────────────────────────────────────────────────
let touchStartX = 0, touchStartY = 0;

document.addEventListener('touchstart', e => {
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
}, { passive: true });

document.addEventListener('touchend', e => {
  if (!gameRunning) return;
  const dx = e.changedTouches[0].clientX - touchStartX;
  const dy = e.changedTouches[0].clientY - touchStartY;
  if (Math.abs(dx) < 28 || Math.abs(dy) > Math.abs(dx)) return;
  moveLane(dx < 0 ? -1 : 1);
}, { passive: true });

// ── Init ───────────────────────────────────────────────────────
bikeEl.style.left  = LANES[1] + 'px';
bestEl.textContent = '0';
updateLivesDisplay();
updateComboBar();