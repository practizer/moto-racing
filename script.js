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
const goDriftEl         = document.getElementById('goDrift');
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
const shieldBubble      = document.getElementById('shieldBubble');
const magnetField       = document.getElementById('magnetField');
const comboWrap         = document.getElementById('comboWrap');
const comboFill         = document.getElementById('comboFill');
const comboCount        = document.getElementById('comboCount');
const feverWrap         = document.getElementById('feverWrap');
const feverFill         = document.getElementById('feverFill');
const nitroFill         = document.getElementById('nitroFill');
const nitroMini         = document.getElementById('nitroMini');
const nitroLabel        = document.getElementById('nitroLabel');
const nitroWrap         = document.getElementById('nitroWrap');
const coinCountEl       = document.getElementById('coinCount');
const zoneAnnounce      = document.getElementById('zoneAnnounce');
const zoneNumber        = document.getElementById('zoneNumber');
const zoneName          = document.getElementById('zoneName');
const startBestVal      = document.getElementById('startBestVal');
const rainCanvas        = document.getElementById('rainCanvas');
const roadCanvas        = document.getElementById('roadCanvas');
const damageFlash       = document.getElementById('damageFlash');
const speedLines        = document.getElementById('speedLines');
const nitroLines        = document.getElementById('nitroLines');
const nitroAnnounce     = document.getElementById('nitroAnnounce');
const driftAnnounce     = document.getElementById('driftAnnounce');

const GAME_W        = 420;
const GAME_H        = 540;
const NUM_LANES     = 6;
const LANE_W        = GAME_W / NUM_LANES;
const LANES         = Array.from({length: NUM_LANES}, (_, i) => Math.round(i * LANE_W + (LANE_W / 2) - 20));
const BIKE_W        = 40;
const BIKE_H        = 72;
const OBS_W         = 40;
const OBS_H         = 68;
const BASE_SPD      = 4;
const MAX_OBS       = 4;
const MAX_LIVES     = 3;
const COMBO_MAX     = 10;
const INVULN_MS     = 1400;
const FEVER_MAX     = 20;
const FEVER_DRAIN   = 0.014;
const NITRO_MAX     = 100;
const NITRO_DRAIN   = 1.1;
const NITRO_CHARGE  = 0.35;
const NITRO_MIN_USE = 25;

const ZONE_THEMES = [
  { name: 'CITY',     color: '#00e5ff', bg: '#0a0c12', road1: '#0a0c12', road2: '#0d1020', curb1: '#cc2000', curb2: '#ddd' },
  { name: 'DESERT',   color: '#ffd700', bg: '#150d00', road1: '#1a1000', road2: '#1e1400', curb1: '#c84800', curb2: '#eedd88' },
  { name: 'STORM',    color: '#bf5fff', bg: '#08001a', road1: '#09001c', road2: '#0c0022', curb1: '#6600cc', curb2: '#ccaaff' },
  { name: 'NEON',     color: '#ff3399', bg: '#090012', road1: '#0a0018', road2: '#0d001e', curb1: '#cc0066', curb2: '#ff88cc' },
  { name: 'ARCTIC',   color: '#88ccff', bg: '#00080f', road1: '#000c16', road2: '#00101c', curb1: '#004477', curb2: '#aaddff' },
  { name: 'VOLCANIC', color: '#ff4500', bg: '#110000', road1: '#150000', road2: '#190000', curb1: '#ff2200', curb2: '#ff8800' },
];

const POWERUP_TYPES = [
  { type: 'shield', icon: '🛡️', chance: 0.26 },
  { type: 'boost',  icon: '⚡',  chance: 0.22 },
  { type: 'life',   icon: '💜', chance: 0.18 },
  { type: 'magnet', icon: '🧲', chance: 0.14 },
  { type: 'nuke',   icon: '💣', chance: 0.12 },
  { type: 'nitropack', icon: '💨', chance: 0.08 },
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

let currentLane      = 2;
let gameRunning      = false;
let score            = 0;
let bestScore        = parseInt(localStorage.getItem('motorush_best') || '0');
let speed            = BASE_SPD;
let frameId          = null;
let obstacles        = [];
let powerups         = [];
let coins            = [];
let spawnTimer       = 0;
let powerupTimer     = 0;
let coinTimer        = 0;
let spawnInterval    = 90;
let powerupInterval  = 200;
let coinInterval     = 50;
let leanTimer        = null;
let lives            = MAX_LIVES;
let shieldActive     = false;
let shieldTimer      = null;
let magnetActive     = false;
let magnetTimer      = null;
let invulnerable     = false;
let invulnTimer      = null;
let combo            = 0;
let bestCombo        = 0;
let markerY          = -40;
let totalCoins       = 0;
let sessionCoins     = 0;
let zone             = 1;
let feverCombo       = 0;
let feverActive      = false;
let trailTickCount   = 0;
let rainDrops        = [];
let rainCtx          = null;
let roadCtx          = null;
let roadOffset       = 0;
let screenShakeActive = false;
let bgCtx            = null;
let logoCtx          = null;
let logoAngle        = 0;
let nitroCharge      = 0;
let nitroActive      = false;
let nitroTimer       = null;
let nitroKeyHeld     = false;
let driftCount       = 0;
let lastLane         = 2;
let driftCombo       = 0;
let driftTimer       = null;
let laneHistory      = [];

function initBgCanvas() {
  const bgCanvas = document.getElementById('bgCanvas');
  bgCanvas.width  = window.innerWidth;
  bgCanvas.height = window.innerHeight;
  bgCtx = bgCanvas.getContext('2d');
  drawBgParticles();
}

function drawBgParticles() {
  if (!bgCtx) return;
  bgCtx.clearRect(0, 0, bgCtx.canvas.width, bgCtx.canvas.height);
  for (let i = 0; i < 60; i++) {
    const x = Math.random() * bgCtx.canvas.width;
    const y = Math.random() * bgCtx.canvas.height;
    const r = Math.random() * 1.5;
    bgCtx.beginPath();
    bgCtx.arc(x, y, r, 0, Math.PI * 2);
    bgCtx.fillStyle = `rgba(0,229,255,${Math.random() * 0.12})`;
    bgCtx.fill();
  }
  requestAnimationFrame(drawBgParticles);
}

function initLogoCanvas() {
  const canvas = document.getElementById('logoCanvas');
  if (!canvas) return;
  logoCtx = canvas.getContext('2d');
  animateLogo();
}

function animateLogo() {
  if (!logoCtx) return;
  const c = logoCtx;
  const w = 56, h = 56, cx = 28, cy = 28;
  c.clearRect(0, 0, w, h);
  logoAngle += 0.025;

  for (let i = 0; i < 3; i++) {
    const angle = logoAngle + (i * Math.PI * 2) / 3;
    const x = cx + Math.cos(angle) * 22;
    const y = cy + Math.sin(angle) * 22;
    const grad = c.createRadialGradient(x, y, 0, x, y, 6);
    const colors = ['rgba(255,69,0,', 'rgba(0,229,255,', 'rgba(255,215,0,'];
    grad.addColorStop(0, colors[i] + '0.9)');
    grad.addColorStop(1, colors[i] + '0)');
    c.beginPath();
    c.arc(x, y, 6, 0, Math.PI * 2);
    c.fillStyle = grad;
    c.fill();
  }

  c.beginPath();
  c.arc(cx, cy, 24, 0, Math.PI * 2);
  c.strokeStyle = `rgba(0,229,255,${0.08 + Math.sin(logoAngle * 3) * 0.04})`;
  c.lineWidth = 1;
  c.stroke();

  c.beginPath();
  c.arc(cx, cy, 18, logoAngle, logoAngle + Math.PI * 1.4);
  c.strokeStyle = 'rgba(255,69,0,0.35)';
  c.lineWidth = 2;
  c.stroke();

  requestAnimationFrame(animateLogo);
}

function initRoadCanvas() {
  roadCtx = roadCanvas.getContext('2d');
}

function drawRoad() {
  if (!roadCtx) return;
  const theme = ZONE_THEMES[zone - 1] || ZONE_THEMES[0];
  const w = GAME_W, h = GAME_H;
  const ctx = roadCtx;

  ctx.clearRect(0, 0, w, h);

  const stripeH = 44;
  const offset = roadOffset % stripeH;
  for (let y = -stripeH + offset; y < h + stripeH; y += stripeH) {
    const grad = ctx.createLinearGradient(0, y, 0, y + stripeH);
    grad.addColorStop(0, theme.road1);
    grad.addColorStop(1, theme.road2);
    ctx.fillStyle = grad;
    ctx.fillRect(0, y, w, stripeH);
  }

  const fogTop = ctx.createLinearGradient(0, 0, 0, 50);
  fogTop.addColorStop(0, 'rgba(0,0,0,0.55)');
  fogTop.addColorStop(1, 'transparent');
  ctx.fillStyle = fogTop;
  ctx.fillRect(0, 0, w, 50);

  const fogBot = ctx.createLinearGradient(0, h - 50, 0, h);
  fogBot.addColorStop(0, 'transparent');
  fogBot.addColorStop(1, 'rgba(0,0,0,0.55)');
  ctx.fillStyle = fogBot;
  ctx.fillRect(0, h - 50, w, 50);

  ctx.strokeStyle = 'rgba(255,255,255,0.055)';
  ctx.setLineDash([22, 22]);
  ctx.lineDashOffset = -roadOffset;
  ctx.lineWidth = 1.5;
  for (let i = 1; i < NUM_LANES; i++) {
    const x = i * LANE_W;
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
  }
  ctx.setLineDash([]);

  const curbW = 8;
  const dashH = 14;
  const curbOffset = roadOffset % (dashH * 2);
  for (let y = -dashH * 2 + curbOffset; y < h + dashH; y += dashH * 2) {
    ctx.fillStyle = theme.curb1;
    ctx.fillRect(0, y, curbW, dashH);
    ctx.fillStyle = theme.curb2;
    ctx.fillRect(0, y + dashH, curbW, dashH);
    ctx.fillStyle = theme.curb1;
    ctx.fillRect(w - curbW, y, curbW, dashH);
    ctx.fillStyle = theme.curb2;
    ctx.fillRect(w - curbW, y + dashH, curbW, dashH);
  }

  const zoneColor = theme.color;
  const r = parseInt(zoneColor.slice(1,3),16);
  const g = parseInt(zoneColor.slice(3,5),16);
  const b = parseInt(zoneColor.slice(5,7),16);

  const sideGlow = ctx.createLinearGradient(0, 0, 40, 0);
  sideGlow.addColorStop(0, `rgba(${r},${g},${b},0.08)`);
  sideGlow.addColorStop(1, 'transparent');
  ctx.fillStyle = sideGlow;
  ctx.fillRect(0, 0, 40, h);

  const sideGlowR = ctx.createLinearGradient(w - 40, 0, w, 0);
  sideGlowR.addColorStop(0, 'transparent');
  sideGlowR.addColorStop(1, `rgba(${r},${g},${b},0.08)`);
  ctx.fillStyle = sideGlowR;
  ctx.fillRect(w - 40, 0, 40, h);

  if (nitroActive) {
    const nitroGrad = ctx.createLinearGradient(0, h * 0.3, 0, h);
    nitroGrad.addColorStop(0, 'transparent');
    nitroGrad.addColorStop(1, 'rgba(0,229,255,0.06)');
    ctx.fillStyle = nitroGrad;
    ctx.fillRect(0, 0, w, h);
  }
}

function initRain() {
  rainCanvas.width  = window.innerWidth;
  rainCanvas.height = window.innerHeight;
  rainCanvas.style.cssText = 'position:fixed;inset:0;z-index:0;pointer-events:none;opacity:0;transition:opacity 0.5s;';
  rainCtx = rainCanvas.getContext('2d');
  for (let i = 0; i < 200; i++) {
    rainDrops.push({
      x:   Math.random() * window.innerWidth,
      y:   Math.random() * window.innerHeight,
      len: 10 + Math.random() * 18,
      spd: 14 + Math.random() * 22,
      op:  0.08 + Math.random() * 0.25,
    });
  }
}

function drawRain(zoneIdx) {
  if (!rainCtx) return;
  const isStorm = zoneIdx === 2;
  rainCanvas.style.opacity = isStorm ? '1' : '0';
  if (!isStorm) return;
  rainCtx.clearRect(0, 0, rainCanvas.width, rainCanvas.height);
  rainCtx.strokeStyle = '#99aaff';
  rainCtx.lineWidth = 1.2;
  for (const d of rainDrops) {
    rainCtx.globalAlpha = d.op;
    rainCtx.beginPath();
    rainCtx.moveTo(d.x, d.y);
    rainCtx.lineTo(d.x + 3, d.y + d.len);
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
  const occupied = obstacles.filter(o => o.top < 140).map(o => o.lane);
  const free = Array.from({length: NUM_LANES}, (_, i) => i).filter(l => !occupied.includes(l));
  if (!free.length) return;

  const numToSpawn = Math.random() < 0.22 ? Math.min(2, free.length) : 1;
  const shuffled = free.sort(() => Math.random() - 0.5);

  for (let s = 0; s < numToSpawn; s++) {
    const lane    = shuffled[s];
    const palette = OBS_PALETTES[Math.floor(Math.random() * OBS_PALETTES.length)];
    const el      = document.createElement('div');
    el.className  = 'obstacle';
    el.innerHTML  = makeObstacleSVG(palette);
    el.style.left = LANES[lane] + 'px';
    el.style.top  = -OBS_H + 'px';

    const zColor = (ZONE_THEMES[zone - 1] || ZONE_THEMES[0]).color;
    el.style.filter = `drop-shadow(0 0 8px ${zColor}88)`;

    obstaclesLayer.appendChild(el);
    obstacles.push({ el, top: -OBS_H, lane });
  }
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
  const lane = Math.floor(Math.random() * NUM_LANES);
  const el   = document.createElement('div');
  el.className = `powerup ${chosen.type}`;
  el.textContent = chosen.icon;
  el.style.left  = (LANES[lane] + (OBS_W - 34) / 2) + 'px';
  el.style.top   = -36 + 'px';
  powerupLayer.appendChild(el);
  powerups.push({ el, top: -36, lane, type: chosen.type });
}

function spawnCoin() {
  const count = Math.random() < 0.3 ? 2 : 1;
  const usedLanes = [];
  for (let i = 0; i < count; i++) {
    let lane;
    do { lane = Math.floor(Math.random() * NUM_LANES); } while (usedLanes.includes(lane));
    usedLanes.push(lane);
    const el   = document.createElement('div');
    el.className   = 'coin';
    el.textContent = '🪙';
    el.style.left  = (LANES[lane] + (OBS_W - 26) / 2) + 'px';
    el.style.top   = -28 + 'px';
    coinLayer.appendChild(el);
    coins.push({ el, top: -28, lane });
  }
}

function spawnTrail() {
  const x = LANES[currentLane] + BIKE_W / 2;
  const y = GAME_H - 22;
  const nitroColors = ['#00e5ff','#66eeff','#ffffff','#aaeeff'];
  const feverColors = ['#ff4500','#ff7700','#ffd700','#ff2200'];
  const normalColors = ['rgba(0,229,255,0.5)', 'rgba(255,69,0,0.35)', 'rgba(255,215,0,0.25)'];
  let colors, count;
  if (nitroActive) { colors = nitroColors; count = 6; }
  else if (feverActive) { colors = feverColors; count = 4; }
  else { colors = normalColors; count = 2; }

  for (let i = 0; i < count; i++) {
    const t = document.createElement('div');
    t.className = 'trail-dot';
    const size = nitroActive ? 7 + Math.random() * 6 : feverActive ? 6 + Math.random() * 5 : 4 + Math.random() * 3;
    t.style.width    = size + 'px';
    t.style.height   = size + 'px';
    t.style.left     = (x + (Math.random() - 0.5) * 18) + 'px';
    t.style.top      = y + 'px';
    t.style.background = colors[Math.floor(Math.random() * colors.length)];
    if (nitroActive) t.style.boxShadow = `0 0 10px #00e5ff, 0 0 20px #00e5ff66`;
    else if (feverActive) t.style.boxShadow = `0 0 8px ${feverColors[0]}`;
    trailLayer.appendChild(t);
    setTimeout(() => t.remove(), nitroActive ? 600 : 400);
  }
}

function updateObstacles() {
  const moveSpd = nitroActive ? speed * 1.8 : feverActive ? speed * 1.55 : speed;
  for (let i = obstacles.length - 1; i >= 0; i--) {
    const obs = obstacles[i];
    obs.top += moveSpd;
    obs.el.style.top = obs.top + 'px';
    if (obs.top > GAME_H) {
      obs.el.remove(); obstacles.splice(i, 1); addScore(obs); continue;
    }
    if (!invulnerable && checkCollision(obs, OBS_W, OBS_H)) {
      if (nitroActive) {
        obs.el.remove(); obstacles.splice(i, 1);
        score++; scoreEl.textContent = score;
        spawnCrashParticles(LANES[obs.lane] + OBS_W / 2, obs.top + OBS_H / 2, ['#00e5ff','#66eeff','#fff']);
        spawnFloatingText(obs.lane, '💨 NITRO SMASH!', '#00e5ff');
        continue;
      }
      handleCrash(obs); return;
    }
  }
}

function updatePowerups() {
  for (let i = powerups.length - 1; i >= 0; i--) {
    const pu = powerups[i];
    pu.top += speed;
    pu.el.style.top = pu.top + 'px';
    if (pu.top > GAME_H) { pu.el.remove(); powerups.splice(i, 1); continue; }
    if (checkCollision(pu, 34, 34)) collectPowerup(pu, i);
  }
}

function updateCoins() {
  const bikeLeft = LANES[currentLane];
  const bikeTop  = GAME_H - 22 - BIKE_H;
  for (let i = coins.length - 1; i >= 0; i--) {
    const c = coins[i];
    c.top += speed;
    if (magnetActive) {
      const coinCenter = LANES[c.lane] + 13;
      const bikeCenter = LANES[currentLane] + BIKE_W / 2;
      const dist = Math.abs(coinCenter - bikeCenter);
      if (dist < 150) {
        const pull = (1 - dist / 150) * 10;
        const dir  = bikeCenter > coinCenter ? 1 : -1;
        c.magnetX  = (c.magnetX || 0) + dir * pull;
        c.el.style.left = (LANES[c.lane] + (OBS_W - 26) / 2 + c.magnetX) + 'px';
      }
    }
    c.el.style.top = c.top + 'px';
    if (c.top > GAME_H) { c.el.remove(); coins.splice(i, 1); continue; }
    const coinX = LANES[c.lane] + (OBS_W - 26) / 2 + (c.magnetX || 0);
    const pad = 4;
    if (
      bikeLeft + pad < coinX + 26 - pad &&
      bikeLeft + BIKE_W - pad > coinX + pad &&
      bikeTop  + pad < c.top + 26 - pad &&
      bikeTop  + BIKE_H - pad > c.top + pad
    ) collectCoin(c, i);
  }
}

function collectCoin(c, idx) {
  c.el.remove(); coins.splice(idx, 1);
  const bonus = nitroActive ? 4 : feverActive ? 3 : 1;
  sessionCoins += bonus; totalCoins += bonus;
  coinCountEl.textContent = sessionCoins;
  popEl(coinCountEl.parentElement);
  const label = nitroActive ? `🪙x${bonus} NITRO!` : feverActive ? `🪙x${bonus} FEVER!` : '🪙+1';
  const color = nitroActive ? '#00e5ff' : '#ffd700';
  spawnFloatingText(c.lane, label, color);
  spawnCoinBurst(LANES[c.lane] + 13, c.top);
  nitroCharge = Math.min(nitroCharge + 2, NITRO_MAX);
  updateNitroBar();
}

function spawnCoinBurst(x, y) {
  for (let i = 0; i < 8; i++) {
    const p      = document.createElement('div');
    p.className  = 'particle';
    const angle  = (i / 8) * Math.PI * 2;
    const dist   = 18 + Math.random() * 16;
    p.style.left = x + 'px'; p.style.top = y + 'px';
    p.style.width = p.style.height = (2 + Math.random() * 3) + 'px';
    p.style.background = i % 2 === 0 ? '#ffd700' : '#ffaa00';
    p.style.boxShadow = '0 0 4px #ffd700';
    p.style.setProperty('--dx', Math.cos(angle) * dist + 'px');
    p.style.setProperty('--dy', Math.sin(angle) * dist + 'px');
    p.style.animationDuration = '0.45s';
    particleLayer.appendChild(p);
    setTimeout(() => p.remove(), 550);
  }
}

function updateNitroBar() {
  const pct = (nitroCharge / NITRO_MAX) * 100;
  nitroFill.style.width = pct + '%';
  nitroMini.style.width = pct + '%';
  if (nitroActive) {
    nitroLabel.textContent = 'ACTIVE';
    nitroWrap.classList.add('active');
  } else if (nitroCharge >= NITRO_MIN_USE) {
    nitroLabel.textContent = 'READY';
    nitroWrap.classList.add('charged');
    nitroWrap.classList.remove('active');
  } else {
    nitroLabel.textContent = Math.floor(pct) + '%';
    nitroWrap.classList.remove('active', 'charged');
  }
}

function activateNitro() {
  if (!gameRunning) return;
  if (nitroCharge < NITRO_MIN_USE) return;
  if (nitroActive) return;
  nitroActive = true;
  nitroKeyHeld = true;
  nitroLines.classList.add('active');
  bikeEl.style.filter = 'drop-shadow(0 0 18px #00e5ff) drop-shadow(0 0 35px #00e5ff88) drop-shadow(0 0 60px rgba(0,229,255,0.4))';
  nitroAnnounce.classList.remove('hidden');
  nitroAnnounce.classList.add('nitro-pop');
  setTimeout(() => { nitroAnnounce.classList.add('hidden'); nitroAnnounce.classList.remove('nitro-pop'); }, 900);
  flashDamage('rgba(0,229,255,0.12)');
  updateNitroBar();
}

function deactivateNitro() {
  nitroActive = false;
  nitroKeyHeld = false;
  nitroLines.classList.remove('active');
  if (!feverActive) bikeEl.style.filter = '';
  else bikeEl.style.filter = 'drop-shadow(0 0 20px #ff4500) drop-shadow(0 0 40px #ffd700) drop-shadow(0 0 70px rgba(255,69,0,0.5))';
  updateNitroBar();
}

function updateNitro() {
  if (nitroActive) {
    nitroCharge -= NITRO_DRAIN;
    if (nitroCharge <= 0) { nitroCharge = 0; deactivateNitro(); }
  } else {
    nitroCharge = Math.min(nitroCharge + NITRO_CHARGE, NITRO_MAX);
  }
  updateNitroBar();
}

function checkDrift() {
  const laneDiff = Math.abs(currentLane - lastLane);
  if (laneDiff >= 2) {
    driftCount++;
    driftCombo++;
    clearTimeout(driftTimer);
    driftTimer = setTimeout(() => { driftCombo = 0; }, 2500);
    const bonus = driftCombo >= 3 ? 3 : driftCombo >= 2 ? 2 : 1;
    score += bonus; scoreEl.textContent = score;
    nitroCharge = Math.min(nitroCharge + 8, NITRO_MAX);
    updateNitroBar();
    spawnFloatingText(currentLane, driftCombo >= 3 ? `🌀 ULTRA DRIFT! +${bonus}` : driftCombo >= 2 ? `🌀 DRIFT x${driftCombo}! +${bonus}` : '🌀 DRIFT! +1', '#bf5fff');
    driftAnnounce.classList.remove('hidden');
    driftAnnounce.classList.add('drift-pop');
    setTimeout(() => { driftAnnounce.classList.add('hidden'); driftAnnounce.classList.remove('drift-pop'); }, 700);
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
  speedLines.classList.add('active');
  if (!nitroActive) bikeEl.style.filter = 'drop-shadow(0 0 20px #ff4500) drop-shadow(0 0 40px #ffd700) drop-shadow(0 0 70px rgba(255,69,0,0.5))';
  spawnFloatingText(currentLane, '🔥 FEVER MODE!', '#ff4500');
  flashDamage('rgba(255,150,0,0.15)');
}

function deactivateFever() {
  feverActive = false;
  feverWrap.classList.add('hidden');
  gameEl.classList.remove('fever-mode');
  speedLines.classList.remove('active');
  if (!nitroActive) bikeEl.style.filter = '';
  combo = 0; updateComboBar();
}

function checkCollision(obj, w, h) {
  const bikeLeft = LANES[currentLane];
  const bikeTop  = GAME_H - 22 - BIKE_H;
  const objLeft  = LANES[obj.lane] + (OBS_W - w) / 2;
  const pad = 9;
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
  nitroCharge = Math.min(nitroCharge + NITRO_CHARGE, NITRO_MAX);
  if (combo > bestCombo) bestCombo = combo;
  scoreEl.textContent = score;
  popEl(scoreEl);
  spawnScoreRing(obs);

  if (feverActive) {
    if (score % 3 === 0) { score += 2; scoreEl.textContent = score; }
    spawnFloatingText(obs.lane, '+2 FEVER', '#ffd700');
  } else {
    spawnFloatingText(obs.lane, '+1', '#00e5ff');
  }

  updateComboBar();
  if (!feverActive && feverCombo >= FEVER_MAX) activateFever();

  if (combo > 0 && combo % 5 === 0) {
    score += 2; scoreEl.textContent = score;
    spawnFloatingText(obs.lane, `COMBO x${combo}! +2`, '#ffd700');
    flashDamage('rgba(255,215,0,0.08)');
    nitroCharge = Math.min(nitroCharge + 10, NITRO_MAX);
  }

  const newZone = Math.min(Math.floor(score / 20) + 1, ZONE_THEMES.length);
  if (newZone !== zone) { zone = newZone; triggerZoneChange(); }

  if (score % 5 === 0) {
    speed = Math.min(BASE_SPD + Math.floor(score / 5) * 1.0, 17);
    spawnInterval = Math.max(40, 90 - score * 1.5);
    speedEl.textContent = (speed / BASE_SPD).toFixed(1) + 'x';
    popEl(speedEl);
    gameEl.classList.remove('speed-burst');
    void gameEl.offsetWidth;
    gameEl.classList.add('speed-burst');
  }
  updateNitroBar();
}

function triggerZoneChange() {
  const theme = ZONE_THEMES[zone - 1] || ZONE_THEMES[0];
  zoneEl.textContent = zone; popEl(zoneEl);
  document.documentElement.style.setProperty('--zone-accent', theme.color);
  gameEl.style.setProperty('--zone-accent', theme.color);
  gameEl.style.background = theme.bg;

  zoneNumber.textContent = `ZONE ${zone}`;
  zoneName.textContent   = theme.name;
  zoneName.style.color   = theme.color;
  zoneName.style.textShadow = `0 0 30px ${theme.color}`;
  zoneAnnounce.style.color  = theme.color;

  zoneAnnounce.classList.remove('hidden');
  zoneAnnounce.classList.add('zone-pop');
  setTimeout(() => { zoneAnnounce.classList.add('hidden'); zoneAnnounce.classList.remove('zone-pop'); }, 2400);
}

function updateComboBar() {
  const pct = Math.min((combo / COMBO_MAX) * 100, 100);
  comboFill.style.width = pct + '%';
  comboCount.textContent = 'x' + combo;
  if (combo >= 5) {
    comboFill.classList.add('hot'); comboWrap.classList.add('active');
  } else if (combo > 0) {
    comboFill.classList.remove('hot'); comboWrap.classList.add('active');
  } else {
    comboFill.classList.remove('hot'); comboWrap.classList.remove('active');
  }
}

function resetCombo() {
  combo = 0; feverCombo = 0;
  if (feverActive) deactivateFever();
  updateComboBar();
}

function collectPowerup(pu, idx) {
  pu.el.remove(); powerups.splice(idx, 1);
  spawnCollectBurst(LANES[pu.lane] + OBS_W / 2, pu.top + 17, pu.type);
  switch (pu.type) {
    case 'shield':    activateShield();   spawnFloatingText(pu.lane, '🛡️ SHIELD!',   '#00e5ff'); break;
    case 'boost':     activateBoost();    spawnFloatingText(pu.lane, '⚡ BOOST!',     '#ffd700'); break;
    case 'life':      gainLife();         spawnFloatingText(pu.lane, '💜 +1 LIFE',   '#ff80aa'); break;
    case 'magnet':    activateMagnet();   spawnFloatingText(pu.lane, '🧲 MAGNET!',   '#bf5fff'); break;
    case 'nuke':      activateNuke();     spawnFloatingText(pu.lane, '💣 NUKE!',     '#ff4500'); break;
    case 'nitropack': collectNitroPack(); spawnFloatingText(pu.lane, '💨 NITRO +50!','#00e5ff'); break;
  }
}

function collectNitroPack() {
  nitroCharge = Math.min(nitroCharge + 50, NITRO_MAX);
  updateNitroBar();
  flashDamage('rgba(0,229,255,0.1)');
}

function spawnCollectBurst(x, y, type) {
  const colorMap = {
    shield:    ['#00e5ff','#66eeff','#ffffff'],
    boost:     ['#ffd700','#ffaa00','#fff8aa'],
    life:      ['#ff80aa','#ff3399','#ff80ff'],
    magnet:    ['#bf5fff','#9933ff','#ddaaff'],
    nuke:      ['#ff4500','#ff7700','#ffd700'],
    nitropack: ['#00e5ff','#ffffff','#aaeeff'],
  };
  const colors = colorMap[type] || ['#ffffff'];
  for (let i = 0; i < 14; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const angle = (i / 14) * Math.PI * 2;
    const dist  = 20 + Math.random() * 30;
    p.style.left = x + 'px'; p.style.top = y + 'px';
    p.style.width = p.style.height = (2 + Math.random() * 4) + 'px';
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    p.style.setProperty('--dx', Math.cos(angle) * dist + 'px');
    p.style.setProperty('--dy', Math.sin(angle) * dist + 'px');
    p.style.animationDuration = (0.38 + Math.random() * 0.28) + 's';
    particleLayer.appendChild(p);
    setTimeout(() => p.remove(), 700);
  }
}

function activateShield() {
  shieldActive = true;
  shieldBubble.classList.remove('hidden');
  syncShieldPosition();
  clearTimeout(shieldTimer);
  shieldTimer = setTimeout(() => { shieldActive = false; shieldBubble.classList.add('hidden'); }, 5500);
}

function activateMagnet() {
  magnetActive = true;
  magnetField.classList.remove('hidden');
  syncMagnetPosition();
  clearTimeout(magnetTimer);
  magnetTimer = setTimeout(() => { magnetActive = false; magnetField.classList.add('hidden'); }, 7500);
}

function activateNuke() {
  const count = obstacles.length;
  obstacles.forEach(o => {
    spawnCrashParticles(LANES[o.lane] + OBS_W / 2, o.top + OBS_H / 2, ['#ff4500','#ffd700','#fff','#ff7700']);
    o.el.remove();
  });
  obstacles = [];
  if (count > 0) {
    score += count; scoreEl.textContent = score;
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
  speed = Math.max(speed * 0.58, BASE_SPD);
  spawnInterval = Math.max(spawnInterval * 1.45, 90);
  gameEl.style.filter = 'brightness(1.22) saturate(1.45)';
  flashDamage('rgba(255,215,0,0.08)');
  setTimeout(() => { speed = prevSpeed; spawnInterval = prevInterval; gameEl.style.filter = ''; }, 3200);
}

function gainLife() {
  if (lives < MAX_LIVES) { lives++; updateLivesDisplay(); popEl(livesEl); }
}

function syncShieldPosition() {
  if (!shieldActive) return;
  shieldBubble.style.left = (LANES[currentLane] - 12) + 'px';
}

function syncMagnetPosition() {
  if (!magnetActive) return;
  magnetField.style.left = (LANES[currentLane] - 25) + 'px';
}

function handleCrash(obs) {
  if (shieldActive) {
    shieldActive = false;
    clearTimeout(shieldTimer);
    shieldBubble.classList.remove('shield-hit');
    void shieldBubble.offsetWidth;
    shieldBubble.classList.add('shield-hit');
    setTimeout(() => { shieldBubble.classList.add('hidden'); }, 400);
    setInvulnerable(); resetCombo(); return;
  }
  lives--;
  updateLivesDisplay();
  livesEl.classList.remove('lives-flash');
  void livesEl.offsetWidth;
  livesEl.classList.add('lives-flash');
  spawnCrashParticles(LANES[currentLane] + BIKE_W / 2, GAME_H - 22 - BIKE_H / 2, null);
  flashDamage('rgba(255,0,0,0.35)');
  triggerScreenShake();
  resetCombo();
  nitroCharge = Math.max(0, nitroCharge - 20);
  if (nitroActive) deactivateNitro();
  updateNitroBar();
  if (lives <= 0) {
    triggerGameOver();
  } else {
    setInvulnerable();
    gameEl.classList.remove('crash-flash');
    void gameEl.offsetWidth;
    gameEl.classList.add('crash-flash');
  }
}

function flashDamage(color) {
  damageFlash.style.background = color;
  damageFlash.style.opacity = '1';
  damageFlash.style.transition = 'none';
  requestAnimationFrame(() => {
    damageFlash.style.transition = 'opacity 0.4s ease-out';
    damageFlash.style.opacity = '0';
  });
}

function triggerScreenShake() {
  if (screenShakeActive) return;
  screenShakeActive = true;
  gameEl.classList.add('screen-shake');
  setTimeout(() => { gameEl.classList.remove('screen-shake'); screenShakeActive = false; }, 450);
}

function setInvulnerable() {
  invulnerable = true;
  bikeEl.style.opacity = '0.35';
  clearTimeout(invulnTimer);
  invulnTimer = setTimeout(() => { invulnerable = false; bikeEl.style.opacity = '1'; }, INVULN_MS);
}

function updateLivesDisplay() {
  const hearts = ['', '❤️', '❤️❤️', '❤️❤️❤️'];
  livesEl.textContent = hearts[Math.max(0, lives)];
}

function spawnScoreRing(obs) {
  const ring = document.createElement('div');
  ring.className = 'score-ring';
  const x = LANES[obs.lane] + OBS_W / 2;
  const y = GAME_H - 80;
  ring.style.left = x + 'px'; ring.style.top = y + 'px';
  ring.style.transform = 'translate(-50%, -50%)';
  if (nitroActive) ring.style.borderColor = '#00e5ff';
  else if (feverActive) ring.style.borderColor = '#ffd700';
  particleLayer.appendChild(ring);
  setTimeout(() => ring.remove(), 560);
}

function spawnFloatingText(lane, text, color) {
  const el = document.createElement('div');
  el.className   = 'floating-text';
  el.textContent = text;
  el.style.color = color;
  el.style.textShadow = `0 0 14px ${color}, 0 0 28px ${color}66`;
  el.style.left  = (LANES[lane] + OBS_W / 2) + 'px';
  el.style.top   = (GAME_H - 130) + 'px';
  floatingTextLayer.appendChild(el);
  setTimeout(() => el.remove(), 950);
}

function spawnCrashParticles(x, y, customColors) {
  const colors = customColors || ['#ff4500','#ff7700','#ffd700','#ffffff','#ff2200','#ff8800'];
  for (let i = 0; i < 26; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const angle = (i / 26) * Math.PI * 2;
    const dist  = 28 + Math.random() * 65;
    p.style.left = x + 'px'; p.style.top = y + 'px';
    p.style.width = p.style.height = (2 + Math.random() * 5) + 'px';
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    p.style.setProperty('--dx', Math.cos(angle) * dist + 'px');
    p.style.setProperty('--dy', Math.sin(angle) * dist + 'px');
    p.style.animationDuration = (0.38 + Math.random() * 0.35) + 's';
    particleLayer.appendChild(p);
    setTimeout(() => p.remove(), 850);
  }
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

  const effectiveSpeed = nitroActive ? speed * 1.8 : feverActive ? speed * 1.55 : speed;
  roadOffset += effectiveSpeed;
  drawRoad();

  spawnTimer++;
  if (spawnTimer >= spawnInterval && obstacles.length < MAX_OBS) { spawnTimer = 0; spawnObstacle(); }
  powerupTimer++;
  if (powerupTimer >= powerupInterval) { powerupTimer = 0; spawnPowerup(); }
  coinTimer++;
  if (coinTimer >= coinInterval) { coinTimer = 0; spawnCoin(); }
  trailTickCount++;
  if (trailTickCount % 3 === 0) spawnTrail();

  updateObstacles();
  updatePowerups();
  updateCoins();
  updateFever();
  updateNitro();
  updateMarkers();
  syncShieldPosition();
  syncMagnetPosition();
  drawRain(zone - 1);

  frameId = requestAnimationFrame(gameLoop);
}

function moveLane(dir) {
  if (!gameRunning) return;
  const next = currentLane + dir;
  if (next < 0 || next > NUM_LANES - 1) {
    bikeEl.classList.remove('lean-left', 'lean-right');
    void bikeEl.offsetWidth;
    bikeEl.classList.add(dir < 0 ? 'lean-left' : 'lean-right');
    clearTimeout(leanTimer);
    leanTimer = setTimeout(() => bikeEl.classList.remove('lean-left', 'lean-right'), 100);
    return;
  }
  lastLane = currentLane;
  currentLane = next;
  bikeEl.style.left = LANES[currentLane] + 'px';
  bikeEl.classList.remove('lean-left', 'lean-right');
  void bikeEl.offsetWidth;
  bikeEl.classList.add(dir < 0 ? 'lean-left' : 'lean-right');
  clearTimeout(leanTimer);
  leanTimer = setTimeout(() => bikeEl.classList.remove('lean-left', 'lean-right'), 175);
  checkDrift();
}

function tapLane(dir) { moveLane(dir); }

function popEl(el) {
  el.classList.remove('pop');
  void el.offsetWidth;
  el.classList.add('pop');
  setTimeout(() => el.classList.remove('pop'), 320);
}

function startGame() {
  if (gameRunning) return;
  obstacles.forEach(o => o.el.remove());
  powerups.forEach(p => p.el.remove());
  coins.forEach(c => c.el.remove());
  obstacles = []; powerups = []; coins = [];
  score = 0; speed = BASE_SPD;
  spawnTimer = 0; powerupTimer = 0; coinTimer = 0;
  spawnInterval = 90; currentLane = 2; lives = MAX_LIVES;
  combo = 0; bestCombo = 0; zone = 1;
  feverCombo = 0; feverActive = false;
  shieldActive = false; magnetActive = false; invulnerable = false;
  markerY = -40; sessionCoins = 0; trailTickCount = 0; roadOffset = 0;
  nitroCharge = 0; nitroActive = false; driftCount = 0; driftCombo = 0;
  lastLane = 2;

  bikeEl.style.opacity = '1';
  bikeEl.style.filter  = '';
  gameEl.style.filter  = '';
  gameEl.style.background = ZONE_THEMES[0].bg;
  gameEl.classList.remove('fever-mode');
  speedLines.classList.remove('active');
  nitroLines.classList.remove('active');
  shieldBubble.classList.add('hidden');
  magnetField.classList.add('hidden');
  feverWrap.classList.add('hidden');
  markerLayer.innerHTML = '';
  particleLayer.innerHTML = '';
  floatingTextLayer.innerHTML = '';
  trailLayer.innerHTML = '';
  newBestMsg.classList.add('hidden');
  zoneAnnounce.classList.add('hidden');
  damageFlash.style.opacity = '0';

  scoreEl.textContent     = '0';
  speedEl.textContent     = '1.0x';
  zoneEl.textContent      = '1';
  coinCountEl.textContent = '0';
  bikeEl.style.left       = LANES[2] + 'px';
  bikeEl.classList.remove('lean-left', 'lean-right');
  document.documentElement.style.setProperty('--zone-accent', '#00e5ff');
  updateLivesDisplay();
  updateComboBar();
  updateNitroBar();

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
  clearTimeout(driftTimer);
  startGame();
}

function triggerGameOver() {
  gameRunning = false;
  cancelAnimationFrame(frameId);
  clearTimeout(shieldTimer);
  clearTimeout(magnetTimer);
  clearTimeout(invulnTimer);
  clearTimeout(driftTimer);

  speedLines.classList.remove('active');
  nitroLines.classList.remove('active');
  spawnCrashParticles(LANES[currentLane] + BIKE_W / 2, GAME_H - 22 - BIKE_H / 2, null);
  flashDamage('rgba(255,0,0,0.5)');

  const isNewBest = score > bestScore;
  if (isNewBest) { bestScore = score; localStorage.setItem('motorush_best', bestScore); }

  bestEl.textContent       = bestScore;
  startBestVal.textContent = bestScore;
  goScoreEl.textContent    = score;
  goBestEl.textContent     = bestScore;
  goComboEl.textContent    = bestCombo + 'x';
  goCoinsEl.textContent    = sessionCoins;
  goDriftEl.textContent    = driftCount;
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
  if (e.key === ' ' && !nitroKeyHeld) { activateNitro(); e.preventDefault(); }
  if ((e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') && e.shiftKey) { moveLane(-2); e.preventDefault(); }
  if ((e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') && e.shiftKey) { moveLane(2); e.preventDefault(); }
});

document.addEventListener('keyup', e => {
  if (e.key === ' ') { nitroKeyHeld = false; }
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
  const laneMove = Math.abs(dx) > 120 ? (dx < 0 ? -2 : 2) : (dx < 0 ? -1 : 1);
  moveLane(laneMove);
}, { passive: true });

bikeEl.style.left       = LANES[2] + 'px';
bestEl.textContent      = bestScore;
startBestVal.textContent = bestScore;
updateLivesDisplay();
updateComboBar();
updateNitroBar();
initRain();
initRoadCanvas();
initBgCanvas();
initLogoCanvas();
drawRoad();