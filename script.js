const bikeEl            = document.getElementById('bike');
const scoreEl           = document.getElementById('score');
const bestEl            = document.getElementById('best');
const speedEl           = document.getElementById('speedDisplay');
const livesEl           = document.getElementById('livesDisplay');
const zoneEl            = document.getElementById('zoneDisplay');
const startScreen       = document.getElementById('startScreen');
const gameOverScreen    = document.getElementById('gameOverScreen');
const goScoreEl         = document.getElementById('goScore');
const goBestEl          = document.getElementById('goBest');
const goComboEl         = document.getElementById('goCombo');
const goCoinsEl         = document.getElementById('goCoins');
const goZoneEl          = document.getElementById('goZone');
const newBestMsg        = document.getElementById('newBestMsg');
const obstaclesLayer    = document.getElementById('obstaclesLayer');
const powerupLayer      = document.getElementById('powerupLayer');
const coinLayer         = document.getElementById('coinLayer');
const particleLayer     = document.getElementById('particleLayer');
const floatingTextLayer = document.getElementById('floatingTextLayer');
const trailLayer        = document.getElementById('trailLayer');
const markerLayer       = document.getElementById('markerLayer');
const gameEl            = document.getElementById('game');
const roadBg            = document.getElementById('roadBg');
const roadSurface       = document.getElementById('roadSurface');
const shieldBubble      = document.getElementById('shieldBubble');
const magnetField       = document.getElementById('magnetField');
const comboWrap         = document.getElementById('comboWrap');
const comboFill         = document.getElementById('comboFill');
const comboCount        = document.getElementById('comboCount');
const feverWrap         = document.getElementById('feverWrap');
const feverFill         = document.getElementById('feverFill');
const coinCountEl       = document.getElementById('coinCount');
const zoneAnnounce      = document.getElementById('zoneAnnounce');
const startBestVal      = document.getElementById('startBestVal');
const rainCanvas        = document.getElementById('rainCanvas');

const GAME_W       = 300;
const GAME_H       = 510;
const LANES        = [28, 130, 232];
const BIKE_W       = 40;
const BIKE_H       = 72;
const OBS_W        = 40;
const OBS_H        = 68;
const BASE_SPD     = 4;
const MAX_OBS      = 2;
const MAX_LIVES    = 3;
const COMBO_MAX    = 10;
const INVULN_MS    = 1400;
const FEVER_MAX    = 20;
const FEVER_DRAIN  = 0.015;

const ZONE_THEMES = [
  { name: 'CITY',     color: '#00e5ff', bg: '#0c0e14', road: '#0f111a' },
  { name: 'DESERT',   color: '#ffd700', bg: '#1a0e00', road: '#1e1200' },
  { name: 'STORM',    color: '#bf5fff', bg: '#0a0014', road: '#0e0018' },
  { name: 'NEON',     color: '#ff3399', bg: '#0a0010', road: '#120018' },
  { name: 'ARCTIC',   color: '#88ccff', bg: '#000a14', road: '#000e1a' },
  { name: 'VOLCANIC', color: '#ff4500', bg: '#140000', road: '#1a0000' },
];

const POWERUP_TYPES = [
  { type: 'shield', icon: '🛡️', chance: 0.28 },
  { type: 'boost',  icon: '⚡',  chance: 0.25 },
  { type: 'life',   icon: '💜', chance: 0.20 },
  { type: 'magnet', icon: '🧲', chance: 0.15 },
  { type: 'nuke',   icon: '💣', chance: 0.12 },
];

const OBS_PALETTES = [
  { body: '#ff4444', tint: '#ff8888', dark: '#200000' },
  { body: '#ffd700', tint: '#ffe566', dark: '#201a00' },
  { body: '#00bfff', tint: '#66ddff', dark: '#001520' },
  { body: '#ff69b4', tint: '#ffaacc', dark: '#200010' },
  { body: '#39ff14', tint: '#88ff66', dark: '#001500' },
  { body: '#ff8c00', tint: '#ffb040', dark: '#1e0d00' },
  { body: '#bf5fff', tint: '#ddaaff', dark: '#10001a' },
  { body: '#00ffcc', tint: '#88ffee', dark: '#001a12' },
];

let currentLane    = 1;
let gameRunning    = false;
let score          = 0;
let bestScore      = parseInt(localStorage.getItem('motorush_best') || '0');
let speed          = BASE_SPD;
let frameId        = null;
let obstacles      = [];
let powerups       = [];
let coins          = [];
let spawnTimer     = 0;
let powerupTimer   = 0;
let coinTimer      = 0;
let spawnInterval  = 90;
let powerupInterval= 220;
let coinInterval   = 60;
let leanTimer      = null;
let lives          = MAX_LIVES;
let shieldActive   = false;
let shieldTimer    = null;
let magnetActive   = false;
let magnetTimer    = null;
let invulnerable   = false;
let invulnTimer    = null;
let combo          = 0;
let bestCombo      = 0;
let markerY        = -40;
let totalCoins     = 0;
let sessionCoins   = 0;
let zone           = 1;
let feverCombo     = 0;
let feverActive    = false;
let feverTimer     = null;
let trailTickCount = 0;
let rainDrops      = [];
let rainCtx        = null;
let screenShakeActive = false;

function initRain() {
  rainCanvas.width  = window.innerWidth;
  rainCanvas.height = window.innerHeight;
  rainCanvas.style.cssText = 'position:fixed;inset:0;z-index:0;pointer-events:none;opacity:0;';
  rainCtx = rainCanvas.getContext('2d');
  for (let i = 0; i < 140; i++) {
    rainDrops.push({
      x:   Math.random() * window.innerWidth,
      y:   Math.random() * window.innerHeight,
      len: 8  + Math.random() * 14,
      spd: 12 + Math.random() * 18,
      op:  0.1 + Math.random() * 0.3,
    });
  }
}

function drawRain(zoneIdx) {
  if (!rainCtx) return;
  const stormZone = zoneIdx === 2;
  rainCanvas.style.opacity = stormZone ? '1' : '0';
  if (!stormZone) return;
  rainCtx.clearRect(0, 0, rainCanvas.width, rainCanvas.height);
  rainCtx.strokeStyle = '#88aaff';
  rainCtx.lineWidth   = 1;
  for (const d of rainDrops) {
    rainCtx.globalAlpha = d.op;
    rainCtx.beginPath();
    rainCtx.moveTo(d.x, d.y);
    rainCtx.lineTo(d.x + 2, d.y + d.len);
    rainCtx.stroke();
    d.y += d.spd;
    if (d.y > window.innerHeight) { d.y = -d.len; d.x = Math.random() * window.innerWidth; }
  }
  rainCtx.globalAlpha = 1;
}

function makeObstacleSVG(p) {
  const { body, tint, dark } = p;
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
  const occupied = obstacles.filter(o => o.top < 130).map(o => o.lane);
  const free = [0, 1, 2].filter(l => !occupied.includes(l));
  if (!free.length) return;

  const lane    = free[Math.floor(Math.random() * free.length)];
  const palette = OBS_PALETTES[Math.floor(Math.random() * OBS_PALETTES.length)];
  const el = document.createElement('div');
  el.className = 'obstacle';
  el.innerHTML = makeObstacleSVG(palette);
  el.style.left = LANES[lane] + 'px';
  el.style.top  = -OBS_H + 'px';

  if (zone >= 3) {
    const zColor = ZONE_THEMES[zone - 1]?.color || '#fff';
    el.style.filter = `drop-shadow(0 0 9px ${zColor})`;
  }

  obstaclesLayer.appendChild(el);
  obstacles.push({ el, top: -OBS_H, lane });
}

function spawnPowerup() {
  if (powerups.length > 0) return;

  const roll = Math.random();
  let cum = 0, chosen = POWERUP_TYPES[0];
  for (const p of POWERUP_TYPES) {
    cum += p.chance;
    if (roll < cum) { chosen = p; break; }
  }

  if (chosen.type === 'life' && lives >= MAX_LIVES) return;

  const lane = Math.floor(Math.random() * 3);
  const el = document.createElement('div');
  el.className = `powerup ${chosen.type}`;
  el.textContent = chosen.icon;
  el.style.left = (LANES[lane] + (OBS_W - 32) / 2) + 'px';
  el.style.top  = -36 + 'px';
  powerupLayer.appendChild(el);
  powerups.push({ el, top: -36, lane, type: chosen.type });
}

function spawnCoin() {
  const lane = Math.floor(Math.random() * 3);
  const el = document.createElement('div');
  el.className = 'coin';
  el.textContent = '🪙';
  el.style.left = (LANES[lane] + (OBS_W - 24) / 2) + 'px';
  el.style.top  = -28 + 'px';
  coinLayer.appendChild(el);
  coins.push({ el, top: -28, lane });
}

function spawnTrail() {
  const x = LANES[currentLane] + BIKE_W / 2;
  const y = GAME_H - 22;
  const colors = feverActive
    ? ['#ff4500', '#ff7700', '#ffd700']
    : ['rgba(0,229,255,0.4)', 'rgba(255,69,0,0.3)'];
  for (let i = 0; i < 2; i++) {
    const t = document.createElement('div');
    t.className = 'trail-dot';
    t.style.left = (x + (Math.random() - 0.5) * 10) + 'px';
    t.style.top  = y + 'px';
    t.style.background = colors[Math.floor(Math.random() * colors.length)];
    if (feverActive) t.style.boxShadow = `0 0 7px ${colors[0]}`;
    trailLayer.appendChild(t);
    setTimeout(() => t.remove(), 350);
  }
}

function updateObstacles() {
  const moveSpd = feverActive ? speed * 1.5 : speed;
  for (let i = obstacles.length - 1; i >= 0; i--) {
    const obs = obstacles[i];
    obs.top += moveSpd;
    obs.el.style.top = obs.top + 'px';

    if (obs.top > GAME_H) {
      obs.el.remove();
      obstacles.splice(i, 1);
      addScore(obs);
      continue;
    }

    if (!invulnerable && checkCollision(obs, OBS_W, OBS_H)) {
      handleCrash(obs);
      return;
    }
  }
}

function updatePowerups() {
  for (let i = powerups.length - 1; i >= 0; i--) {
    const pu = powerups[i];
    pu.top += speed;
    pu.el.style.top = pu.top + 'px';
    if (pu.top > GAME_H) { pu.el.remove(); powerups.splice(i, 1); continue; }
    if (checkCollision(pu, 32, 32)) collectPowerup(pu, i);
  }
}

function updateCoins() {
  const bikeLeft = LANES[currentLane];
  const bikeTop  = GAME_H - 22 - BIKE_H;

  for (let i = coins.length - 1; i >= 0; i--) {
    const c = coins[i];
    c.top += speed;

    if (magnetActive) {
      const coinCenter = LANES[c.lane] + 12;
      const bikeCenter = LANES[currentLane] + BIKE_W / 2;
      const dist = Math.abs(coinCenter - bikeCenter);
      if (dist < 100) {
        const pull = (1 - dist / 100) * 8;
        const dir  = bikeCenter > coinCenter ? 1 : -1;
        c.magnetX  = (c.magnetX || 0) + dir * pull;
        c.el.style.left = (LANES[c.lane] + (OBS_W - 24) / 2 + c.magnetX) + 'px';
      }
    }

    c.el.style.top = c.top + 'px';
    if (c.top > GAME_H) { c.el.remove(); coins.splice(i, 1); continue; }

    const coinX = LANES[c.lane] + (OBS_W - 24) / 2 + (c.magnetX || 0);
    const pad = 4;
    if (
      bikeLeft + pad < coinX + 24 - pad &&
      bikeLeft + BIKE_W - pad > coinX + pad &&
      bikeTop  + pad < c.top + 24 - pad &&
      bikeTop  + BIKE_H - pad > c.top + pad
    ) collectCoin(c, i);
  }
}

function collectCoin(c, idx) {
  c.el.remove();
  coins.splice(idx, 1);
  const bonus = feverActive ? 3 : 1;
  sessionCoins += bonus;
  totalCoins   += bonus;
  coinCountEl.textContent = sessionCoins;
  popEl(coinCountEl.parentElement);
  spawnFloatingText(c.lane, feverActive ? `🪙x${bonus} FEVER!` : '🪙+1', '#ffd700');
  spawnCoinBurst(LANES[c.lane] + 12, c.top);
}

function spawnCoinBurst(x, y) {
  for (let i = 0; i < 6; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const angle = (i / 6) * Math.PI * 2;
    p.style.left       = x + 'px';
    p.style.top        = y + 'px';
    p.style.background = '#ffd700';
    p.style.setProperty('--dx', Math.cos(angle) * 22 + 'px');
    p.style.setProperty('--dy', Math.sin(angle) * 22 + 'px');
    p.style.animationDuration = '0.4s';
    particleLayer.appendChild(p);
    setTimeout(() => p.remove(), 500);
  }
}

function updateFever() {
  if (!feverActive) return;
  feverCombo -= FEVER_DRAIN;
  const pct = Math.max(0, (feverCombo / FEVER_MAX) * 100);
  feverFill.style.width = pct + '%';
  if (feverCombo <= 0) { feverCombo = 0; deactivateFever(); }
}

function activateFever() {
  feverActive = true;
  feverWrap.classList.remove('hidden');
  gameEl.classList.add('fever-mode');
  bikeEl.style.filter = 'drop-shadow(0 0 18px #ff4500) drop-shadow(0 0 36px #ffd700)';
  spawnFloatingText(currentLane, '🔥 FEVER MODE!', '#ff4500');
}

function deactivateFever() {
  feverActive = false;
  feverWrap.classList.add('hidden');
  gameEl.classList.remove('fever-mode');
  bikeEl.style.filter = '';
  combo = 0;
  updateComboBar();
}

function checkCollision(obj, w, h) {
  const bikeLeft = LANES[currentLane];
  const bikeTop  = GAME_H - 22 - BIKE_H;
  const objLeft  = LANES[obj.lane] + (OBS_W - w) / 2;
  const pad = 8;
  return (
    bikeLeft + pad          < objLeft + w - pad &&
    bikeLeft + BIKE_W - pad > objLeft + pad     &&
    bikeTop  + pad          < obj.top + h - pad &&
    bikeTop  + BIKE_H - pad > obj.top + pad
  );
}

function addScore(obs) {
  score++;
  combo++;
  feverCombo = Math.min(feverCombo + 1, FEVER_MAX);
  if (combo > bestCombo) bestCombo = combo;
  scoreEl.textContent = score;
  popEl(scoreEl);
  spawnScoreRing(obs);

  const lbl = feverActive ? `+${score % 3 === 0 ? 3 : 2}` : '+1';
  spawnFloatingText(obs.lane, lbl, feverActive ? '#ffd700' : '#00e5ff');

  if (feverActive && score % 3 === 0) { score += 2; scoreEl.textContent = score; }
  updateComboBar();

  if (!feverActive && feverCombo >= FEVER_MAX) activateFever();

  if (combo > 0 && combo % 5 === 0) {
    score += 2;
    scoreEl.textContent = score;
    spawnFloatingText(obs.lane, `COMBO x${combo}! +2`, '#ffd700');
  }

  const newZone = Math.floor(score / 20) + 1;
  if (newZone !== zone && newZone <= ZONE_THEMES.length) {
    zone = newZone;
    triggerZoneChange();
  }

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

function triggerZoneChange() {
  const theme = ZONE_THEMES[zone - 1] || ZONE_THEMES[0];
  zoneEl.textContent = zone;
  popEl(zoneEl);

  document.documentElement.style.setProperty('--zone-accent', theme.color);
  gameEl.style.setProperty('--zone-accent', theme.color);

  zoneAnnounce.textContent  = `ZONE ${zone} — ${theme.name}`;
  zoneAnnounce.style.color      = theme.color;
  zoneAnnounce.style.textShadow = `0 0 26px ${theme.color}`;
  zoneAnnounce.classList.remove('hidden');
  zoneAnnounce.classList.add('zone-pop');
  setTimeout(() => {
    zoneAnnounce.classList.add('hidden');
    zoneAnnounce.classList.remove('zone-pop');
  }, 2200);
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
  combo = 0; feverCombo = 0;
  if (feverActive) deactivateFever();
  updateComboBar();
}

function collectPowerup(pu, idx) {
  pu.el.remove();
  powerups.splice(idx, 1);
  switch (pu.type) {
    case 'shield': activateShield(); spawnFloatingText(pu.lane, '🛡️ SHIELD!', '#00e5ff'); break;
    case 'boost':  activateBoost();  spawnFloatingText(pu.lane, '⚡ BOOST!',  '#ffd700'); break;
    case 'life':   gainLife();       spawnFloatingText(pu.lane, '💜 +1 LIFE', '#ff80aa'); break;
    case 'magnet': activateMagnet(); spawnFloatingText(pu.lane, '🧲 MAGNET!', '#bf5fff'); break;
    case 'nuke':   activateNuke();   spawnFloatingText(pu.lane, '💣 NUKE!',   '#ff4500'); break;
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

function activateMagnet() {
  magnetActive = true;
  magnetField.classList.remove('hidden');
  syncMagnetPosition();
  clearTimeout(magnetTimer);
  magnetTimer = setTimeout(() => {
    magnetActive = false;
    magnetField.classList.add('hidden');
  }, 7000);
}

function activateNuke() {
  const count = obstacles.length;
  obstacles.forEach(o => {
    spawnCrashParticles(LANES[o.lane] + OBS_W / 2, o.top + OBS_H / 2, ['#ff4500','#ffd700','#fff']);
    o.el.remove();
  });
  obstacles = [];
  if (count > 0) {
    score += count;
    scoreEl.textContent = score;
    spawnFloatingText(currentLane, `💣 x${count} CLEARED! +${count}`, '#ff4500');
    popEl(scoreEl);
  }
  gameEl.classList.remove('nuke-flash');
  void gameEl.offsetWidth;
  gameEl.classList.add('nuke-flash');
  triggerScreenShake();
}

function activateBoost() {
  const prevSpeed = speed, prevInterval = spawnInterval;
  speed = Math.max(speed * 0.6, BASE_SPD);
  spawnInterval = Math.max(spawnInterval * 1.4, 90);
  gameEl.style.filter = 'brightness(1.18) saturate(1.35)';
  setTimeout(() => {
    speed = prevSpeed;
    spawnInterval = prevInterval;
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

function syncShieldPosition() {
  if (!shieldActive) return;
  shieldBubble.style.left = (LANES[currentLane] - 10) + 'px';
}

function syncMagnetPosition() {
  if (!magnetActive) return;
  magnetField.style.left = (LANES[currentLane] - 21) + 'px';
}

function handleCrash(obs) {
  if (shieldActive) {
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
  spawnCrashParticles(LANES[currentLane] + BIKE_W / 2, GAME_H - 22 - BIKE_H / 2, null);
  triggerScreenShake();
  resetCombo();

  if (lives <= 0) {
    triggerGameOver();
  } else {
    setInvulnerable();
    gameEl.classList.remove('crash-flash');
    void gameEl.offsetWidth;
    gameEl.classList.add('crash-flash');
  }
}

function triggerScreenShake() {
  if (screenShakeActive) return;
  screenShakeActive = true;
  gameEl.classList.add('screen-shake');
  setTimeout(() => { gameEl.classList.remove('screen-shake'); screenShakeActive = false; }, 400);
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

function spawnScoreRing(obs) {
  const ring = document.createElement('div');
  ring.className = 'score-ring';
  ring.style.left = (LANES[obs.lane] + OBS_W / 2) + 'px';
  ring.style.top  = (GAME_H - 80) + 'px';
  if (feverActive) ring.style.borderColor = '#ffd700';
  particleLayer.appendChild(ring);
  setTimeout(() => ring.remove(), 520);
}

function spawnFloatingText(lane, text, color) {
  const el = document.createElement('div');
  el.className    = 'floating-text';
  el.textContent  = text;
  el.style.color  = color;
  el.style.textShadow = `0 0 12px ${color}`;
  el.style.left   = (LANES[lane] + OBS_W / 2) + 'px';
  el.style.top    = (GAME_H - 120) + 'px';
  floatingTextLayer.appendChild(el);
  setTimeout(() => el.remove(), 900);
}

function spawnCrashParticles(x, y, customColors) {
  const colors = customColors || ['#ff4500','#ff7700','#ffd700','#ffffff','#ff2200'];
  for (let i = 0; i < 22; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const angle = (i / 22) * Math.PI * 2;
    const dist  = 32 + Math.random() * 58;
    p.style.left       = x + 'px';
    p.style.top        = y + 'px';
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    p.style.setProperty('--dx', Math.cos(angle) * dist + 'px');
    p.style.setProperty('--dy', Math.sin(angle) * dist + 'px');
    p.style.animationDuration = (0.4 + Math.random() * 0.32) + 's';
    particleLayer.appendChild(p);
    setTimeout(() => p.remove(), 800);
  }
}

function syncRoadSpeed() {
  const dur    = Math.max(0.07, 0.32 - (speed - BASE_SPD) * 0.014);
  const durStr = dur + 's';
  roadBg.style.animationDuration = durStr;
  roadSurface.querySelectorAll('.lane-line, .curb').forEach(el => {
    el.style.animationDuration = durStr;
  });
}

function updateMarkers() {
  markerY += speed;
  if (markerY > GAME_H + 20) {
    markerY = -40;
    const m = document.createElement('div');
    m.className   = 'road-marker';
    m.textContent = `── ${score} ──`;
    m.style.top   = '-40px';
    markerLayer.appendChild(m);
    const startTime = performance.now();
    (function tick(now) {
      const y = -40 + (speed * (now - startTime) / 16.67);
      m.style.top = y + 'px';
      if (y > GAME_H + 20) { m.remove(); return; }
      requestAnimationFrame(tick);
    })(performance.now());
  }
}

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

  coinTimer++;
  if (coinTimer >= coinInterval) {
    coinTimer = 0;
    spawnCoin();
  }

  trailTickCount++;
  if (trailTickCount % 3 === 0) spawnTrail();

  updateObstacles();
  updatePowerups();
  updateCoins();
  updateFever();
  updateMarkers();
  syncRoadSpeed();
  syncShieldPosition();
  syncMagnetPosition();
  drawRain(zone - 1);

  frameId = requestAnimationFrame(gameLoop);
}

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

function popEl(el) {
  el.classList.remove('pop');
  void el.offsetWidth;
  el.classList.add('pop');
  setTimeout(() => el.classList.remove('pop'), 300);
}

function startGame() {
  if (gameRunning) return;

  obstacles.forEach(o => o.el.remove());
  powerups.forEach(p => p.el.remove());
  coins.forEach(c => c.el.remove());

  obstacles = []; powerups = []; coins = [];
  score = 0; speed = BASE_SPD;
  spawnTimer = 0; powerupTimer = 0; coinTimer = 0;
  spawnInterval = 90;
  currentLane = 1; lives = MAX_LIVES;
  combo = 0; bestCombo = 0; zone = 1;
  feverCombo = 0; feverActive = false;
  shieldActive = false; magnetActive = false; invulnerable = false;
  markerY = -40; sessionCoins = 0; trailTickCount = 0;

  bikeEl.style.opacity = '1';
  bikeEl.style.filter  = '';
  gameEl.style.filter  = '';
  gameEl.classList.remove('fever-mode');
  shieldBubble.classList.add('hidden');
  magnetField.classList.add('hidden');
  feverWrap.classList.add('hidden');
  markerLayer.innerHTML = '';
  particleLayer.innerHTML = '';
  floatingTextLayer.innerHTML = '';
  trailLayer.innerHTML = '';
  newBestMsg.classList.add('hidden');
  zoneAnnounce.classList.add('hidden');

  scoreEl.textContent     = '0';
  speedEl.textContent     = '1.0x';
  zoneEl.textContent      = '1';
  coinCountEl.textContent = '0';
  bikeEl.style.left       = LANES[1] + 'px';
  bikeEl.classList.remove('lean-left', 'lean-right');
  document.documentElement.style.setProperty('--zone-accent', '#00e5ff');
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
  clearTimeout(magnetTimer);
  clearTimeout(invulnTimer);
  startGame();
}

function triggerGameOver() {
  gameRunning = false;
  cancelAnimationFrame(frameId);
  clearTimeout(shieldTimer);
  clearTimeout(magnetTimer);
  clearTimeout(invulnTimer);

  spawnCrashParticles(LANES[currentLane] + BIKE_W / 2, GAME_H - 22 - BIKE_H / 2, null);

  const isNewBest = score > bestScore;
  if (isNewBest) {
    bestScore = score;
    localStorage.setItem('motorush_best', bestScore);
  }

  bestEl.textContent       = bestScore;
  startBestVal.textContent = bestScore;
  goScoreEl.textContent    = score;
  goBestEl.textContent     = bestScore;
  goComboEl.textContent    = bestCombo + 'x';
  goCoinsEl.textContent    = sessionCoins;
  goZoneEl.textContent     = zone;

  if (isNewBest) newBestMsg.classList.remove('hidden');

  gameOverScreen.classList.remove('hidden', 'crash-flash');
  void gameOverScreen.offsetWidth;
  gameOverScreen.classList.add('crash-flash');
}

document.addEventListener('keydown', e => {
  if (!gameRunning) {
    if (e.key === 'Enter' || e.key === ' ') {
      if (!startScreen.classList.contains('hidden'))         startGame();
      else if (!gameOverScreen.classList.contains('hidden')) restartGame();
    }
    return;
  }
  if (e.key === 'ArrowLeft'  || e.key === 'a' || e.key === 'A') { moveLane(-1); e.preventDefault(); }
  if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') { moveLane(1);  e.preventDefault(); }
});

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

bikeEl.style.left    = LANES[1] + 'px';
bestEl.textContent   = bestScore;
startBestVal.textContent = bestScore;
updateLivesDisplay();
updateComboBar();
initRain();