const bikeEl         = document.getElementById('bike');
const scoreEl        = document.getElementById('score');
const bestEl         = document.getElementById('best');
const speedEl        = document.getElementById('speedDisplay');
const startScreen    = document.getElementById('startScreen');
const gameOverScreen = document.getElementById('gameOverScreen');
const goScoreEl      = document.getElementById('goScore');
const goBestEl       = document.getElementById('goBest');
const newBestMsg     = document.getElementById('newBestMsg');
const obstaclesLayer = document.getElementById('obstaclesLayer');
const particleLayer  = document.getElementById('particleLayer');
const gameEl         = document.getElementById('game');
const roadBg         = document.getElementById('roadBg');
const roadSurface    = document.getElementById('roadSurface');

const GAME_H      = 510;
const LANES       = [28, 130, 232];
const BIKE_W      = 40;
const BIKE_H      = 72;
const OBS_W       = 40;
const OBS_H       = 68;
const BASE_SPD    = 4;
const MAX_OBS     = 2;

let currentLane   = 1;
let prevLane      = 1;
let gameRunning   = false;
let score         = 0;
let bestScore     = 0;
let speed         = BASE_SPD;
let frameId       = null;
let obstacles     = [];
let spawnTimer    = 0;
let spawnInterval = 90;
let leanTimer     = null;

const OBS_PALETTES = [
  { body: '#ff4444', tint: '#ff8888', dark: '#200000' },
  { body: '#ffd700', tint: '#ffe566', dark: '#201a00' },
  { body: '#00bfff', tint: '#66ddff', dark: '#001520' },
  { body: '#ff69b4', tint: '#ffaacc', dark: '#200010' },
  { body: '#39ff14', tint: '#88ff66', dark: '#001500' },
  { body: '#ff8c00', tint: '#ffb040', dark: '#1e0d00' },
];

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

    if (checkCollision(obs)) {
      triggerCrash();
      return;
    }
  }
}

function checkCollision(obs) {
  const bikeLeft = LANES[currentLane];
  const bikeTop  = GAME_H - 22 - BIKE_H;
  const pad = 8;

  return (
    bikeLeft + pad          < LANES[obs.lane] + OBS_W - pad &&
    bikeLeft + BIKE_W - pad > LANES[obs.lane] + pad &&
    bikeTop  + pad          < obs.top + OBS_H - pad &&
    bikeTop  + BIKE_H - pad > obs.top + pad
  );
}

function addScore(obs) {
  score++;
  scoreEl.textContent = score;

  scoreEl.classList.remove('pop');
  void scoreEl.offsetWidth;
  scoreEl.classList.add('pop');
  setTimeout(() => scoreEl.classList.remove('pop'), 300);

  spawnScoreRing(obs);

  if (score % 5 === 0) {
    speed = Math.min(BASE_SPD + Math.floor(score / 5) * 1.1, 18);
    spawnInterval = Math.max(38, 90 - score * 1.8);
    speedEl.textContent = (speed / BASE_SPD).toFixed(1) + 'x';

    speedEl.classList.remove('pop');
    void speedEl.offsetWidth;
    speedEl.classList.add('pop');
    setTimeout(() => speedEl.classList.remove('pop'), 400);

    gameEl.classList.remove('speed-burst');
    void gameEl.offsetWidth;
    gameEl.classList.add('speed-burst');
  }
}

function spawnScoreRing(obs) {
  const ring = document.createElement('div');
  ring.className = 'score-ring';
  const x = LANES[obs.lane] + OBS_W / 2;
  const y = GAME_H - 80;
  ring.style.left = x + 'px';
  ring.style.top  = y + 'px';
  particleLayer.appendChild(ring);
  setTimeout(() => ring.remove(), 520);
}

function spawnCrashParticles() {
  const x = LANES[currentLane] + BIKE_W / 2;
  const y = GAME_H - 22 - BIKE_H / 2;
  const colors = ['#ff4500', '#ff7700', '#ffd700', '#ffffff', '#ff2200'];

  for (let i = 0; i < 18; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const angle  = (i / 18) * Math.PI * 2;
    const dist   = 30 + Math.random() * 50;
    const dx     = Math.cos(angle) * dist;
    const dy     = Math.sin(angle) * dist;
    p.style.left = x + 'px';
    p.style.top  = y + 'px';
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    p.style.setProperty('--dx', dx + 'px');
    p.style.setProperty('--dy', dy + 'px');
    p.style.animationDuration = (0.4 + Math.random() * 0.3) + 's';
    particleLayer.appendChild(p);
    setTimeout(() => p.remove(), 800);
  }
}

function syncRoadSpeed() {
  const dur = Math.max(0.07, 0.32 - (speed - BASE_SPD) * 0.014);
  const durStr = dur + 's';
  roadBg.style.animationDuration = durStr;
  roadSurface.querySelectorAll('.lane-line, .curb').forEach(el => {
    el.style.animationDuration = durStr;
  });
}

function gameLoop() {
  if (!gameRunning) return;

  spawnTimer++;
  if (spawnTimer >= spawnInterval && obstacles.length < MAX_OBS) {
    spawnTimer = 0;
    spawnObstacle();
  }

  updateObstacles();
  syncRoadSpeed();
  frameId = requestAnimationFrame(gameLoop);
}

function moveLane(dir) {
  if (!gameRunning) return;
  const next = currentLane + dir;
  if (next < 0 || next > 2) return;

  prevLane    = currentLane;
  currentLane = next;
  bikeEl.style.left = LANES[currentLane] + 'px';

  bikeEl.classList.remove('lean-left', 'lean-right');
  void bikeEl.offsetWidth;
  bikeEl.classList.add(dir < 0 ? 'lean-left' : 'lean-right');

  clearTimeout(leanTimer);
  leanTimer = setTimeout(() => bikeEl.classList.remove('lean-left', 'lean-right'), 180);
}

function tapLane(dir) {
  moveLane(dir);
}

function startGame() {
  if (gameRunning) return;

  obstacles.forEach(o => o.el.remove());
  obstacles     = [];
  score         = 0;
  speed         = BASE_SPD;
  spawnTimer    = 0;
  spawnInterval = 90;
  currentLane   = 1;
  prevLane      = 1;

  scoreEl.textContent = '0';
  speedEl.textContent = '1.0x';
  bikeEl.style.left   = LANES[currentLane] + 'px';
  bikeEl.classList.remove('lean-left', 'lean-right');
  particleLayer.innerHTML = '';
  newBestMsg.classList.add('hidden');

  startScreen.classList.add('hidden');
  gameOverScreen.classList.add('hidden');

  gameRunning = true;
  frameId = requestAnimationFrame(gameLoop);
}

function restartGame() {
  gameRunning = false;
  cancelAnimationFrame(frameId);
  startGame();
}

function triggerCrash() {
  gameRunning = false;
  cancelAnimationFrame(frameId);

  spawnCrashParticles();

  const isNewBest = score > bestScore;
  if (isNewBest) bestScore = score;

  bestEl.textContent  = bestScore;
  goScoreEl.textContent = score;
  goBestEl.textContent  = bestScore;

  if (isNewBest) {
    newBestMsg.classList.remove('hidden');
  }

  gameOverScreen.classList.remove('hidden', 'crash-flash');
  void gameOverScreen.offsetWidth;
  gameOverScreen.classList.add('crash-flash');
}

document.addEventListener('keydown', (e) => {
  if (!gameRunning) {
    if (e.key === 'Enter' || e.key === ' ') {
      if (!startScreen.classList.contains('hidden')) startGame();
      else if (!gameOverScreen.classList.contains('hidden')) restartGame();
    }
    return;
  }
  if (e.key === 'ArrowLeft'  || e.key === 'a' || e.key === 'A') { moveLane(-1); e.preventDefault(); }
  if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') { moveLane(1);  e.preventDefault(); }
});

let touchStartX = 0;
let touchStartY = 0;

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

bikeEl.style.left = LANES[currentLane] + 'px';
bestEl.textContent = '0';