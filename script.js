const bikeEl             = document.getElementById('bike');
const scoreEl            = document.getElementById('score');
const bestEl             = document.getElementById('best');
const speedEl            = document.getElementById('speedDisplay');
const livesEl            = document.getElementById('livesDisplay');
const zoneEl             = document.getElementById('zoneDisplay');
const startScreen        = document.getElementById('startScreen');
const gameOverScreen     = document.getElementById('gameOverScreen');
const pauseScreen        = document.getElementById('pauseScreen');
const goScoreEl          = document.getElementById('goScore');
const goBestEl           = document.getElementById('goBest');
const goComboEl          = document.getElementById('goCombo');
const goCoinsEl          = document.getElementById('goCoins');
const goDriftEl          = document.getElementById('goDrift');
const goZoneEl           = document.getElementById('goZone');
const goRecordsEl        = document.getElementById('goRecords');
const recBestEl          = document.getElementById('recBest');
const recComboEl         = document.getElementById('recCombo');
const recDriftEl         = document.getElementById('recDrift');
const recSlipEl          = document.getElementById('recSlip');
const lbListEl           = document.getElementById('lbList');
const obstaclesLayer     = document.getElementById('obstaclesLayer');
const powerupLayer       = document.getElementById('powerupLayer');
const coinLayer          = document.getElementById('coinLayer');
const particleLayer      = document.getElementById('particleLayer');
const floatingTextLayer  = document.getElementById('floatingTextLayer');
const trailLayer         = document.getElementById('trailLayer');
const markerLayer        = document.getElementById('markerLayer');
const hazardLayer        = document.getElementById('hazardLayer');
const ghostLayer         = document.getElementById('ghostLayer');
const bossLayer          = document.getElementById('bossLayer');
const gameEl             = document.getElementById('game');
const shieldBubble       = document.getElementById('shieldBubble');
const magnetField        = document.getElementById('magnetField');
const comboWrap          = document.getElementById('comboWrap');
const comboFill          = document.getElementById('comboFill');
const comboCount         = document.getElementById('comboCount');
const feverWrap          = document.getElementById('feverWrap');
const feverFill          = document.getElementById('feverFill');
const nitroFill          = document.getElementById('nitroFill');
const nitroMini          = document.getElementById('nitroMini');
const nitroLabel         = document.getElementById('nitroLabel');
const nitroWrap          = document.getElementById('nitroWrap');
const coinCountEl        = document.getElementById('coinCount');
const zoneAnnounce       = document.getElementById('zoneAnnounce');
const zoneNumber         = document.getElementById('zoneNumber');
const zoneName           = document.getElementById('zoneName');
const zoneSub            = document.getElementById('zoneSub');
const startBestVal       = document.getElementById('startBestVal');
const startTotalCoins    = document.getElementById('startTotalCoins');
const startTotalRuns     = document.getElementById('startTotalRuns');
const startBestDrift     = document.getElementById('startBestDrift');
const rainCanvas         = document.getElementById('rainCanvas');
const roadCanvas         = document.getElementById('roadCanvas');
const effectCanvas       = document.getElementById('effectCanvas');
const damageFlash        = document.getElementById('damageFlash');
const speedLines         = document.getElementById('speedLines');
const nitroLines         = document.getElementById('nitroLines');
const nitroAnnounce      = document.getElementById('nitroAnnounce');
const driftAnnounce      = document.getElementById('driftAnnounce');
const ghostAnnounce      = document.getElementById('ghostAnnounce');
const multiplierAnnounce = document.getElementById('multiplierAnnounce');
const scoreMultiplierEl  = document.getElementById('scoreMultiplier');
const pauseScore         = document.getElementById('pauseScore');
const pauseZone          = document.getElementById('pauseZone');
const pauseCombo         = document.getElementById('pauseCombo');
const heatEl             = document.getElementById('heatDisplay');
const heatFill           = document.getElementById('heatFill');
const heatWrap           = document.getElementById('heatWrap');
const slipstreamEl       = document.getElementById('slipstreamDisplay');
const slipstreamBar      = document.getElementById('slipstreamBar');
const weatherOverlay     = document.getElementById('weatherOverlay');
const bossAnnounce       = document.getElementById('bossAnnounce');
const wantedDisplay      = document.getElementById('wantedDisplay');

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
const GHOST_DURATION = 4500;
const NEAR_MISS_DIST = 14;
const HEAT_MAX      = 100;
const HEAT_DECAY    = 0.08;
const SLIPSTREAM_DIST = 55;
const SLIPSTREAM_MAX  = 100;
const BOSS_SPAWN_ZONE = 4;

const ZONE_THEMES = [
  { name: 'CITY',     sub: 'NEON STREETS',   color: '#00e5ff', bg: '#0a0c12', road1: '#0a0c12', road2: '#0d1020', curb1: '#cc2000', curb2: '#ddd',    weather: 'clear',    fog: 0 },
  { name: 'DESERT',   sub: 'HEAT MIRAGE',    color: '#ffd700', bg: '#150d00', road1: '#1a1000', road2: '#1e1400', curb1: '#c84800', curb2: '#eedd88', weather: 'sand',     fog: 0.25 },
  { name: 'STORM',    sub: 'THUNDER ROAD',   color: '#bf5fff', bg: '#08001a', road1: '#09001c', road2: '#0c0022', curb1: '#6600cc', curb2: '#ccaaff', weather: 'rain',     fog: 0.1 },
  { name: 'NEON',     sub: 'ELECTRIC DRIFT', color: '#ff3399', bg: '#090012', road1: '#0a0018', road2: '#0d001e', curb1: '#cc0066', curb2: '#ff88cc', weather: 'clear',    fog: 0 },
  { name: 'ARCTIC',   sub: 'BLACK ICE',      color: '#88ccff', bg: '#00080f', road1: '#000c16', road2: '#00101c', curb1: '#004477', curb2: '#aaddff', weather: 'snow',     fog: 0.2 },
  { name: 'VOLCANIC', sub: 'MAGMA BURN',     color: '#ff4500', bg: '#110000', road1: '#150000', road2: '#190000', curb1: '#ff2200', curb2: '#ff8800', weather: 'ash',      fog: 0.3 },
  { name: 'CYBER',    sub: 'DATA STREAM',    color: '#39ff14', bg: '#000f00', road1: '#001200', road2: '#001500', curb1: '#00aa00', curb2: '#88ff88', weather: 'clear',    fog: 0 },
  { name: 'VOID',     sub: 'NO RETURN',      color: '#ff69b4', bg: '#0a000a', road1: '#0d000d', road2: '#100010', curb1: '#880044', curb2: '#ffaacc', weather: 'void',     fog: 0.4 },
];

const POWERUP_TYPES = [
  { type: 'shield',    icon: '🛡️', chance: 0.20 },
  { type: 'boost',     icon: '⚡',  chance: 0.18 },
  { type: 'life',      icon: '💜', chance: 0.14 },
  { type: 'magnet',    icon: '🧲', chance: 0.13 },
  { type: 'nuke',      icon: '💣', chance: 0.11 },
  { type: 'nitropack', icon: '💨', chance: 0.08 },
  { type: 'ghost',     icon: '👻', chance: 0.08 },
  { type: 'overclock', icon: '🔴', chance: 0.05 },
  { type: 'emp',       icon: '⚡', chance: 0.03 },
];

const HAZARD_TYPES = [
  { type: 'oil',    icon: '🛢',  color: '#222244', effect: 'spin',   duration: 2200 },
  { type: 'bump',   icon: '▬',   color: '#885500', effect: 'slow',   duration: 1200 },
  { type: 'emp',    icon: '📡',  color: '#00ff88', effect: 'emp',    duration: 3000 },
  { type: 'fire',   icon: '🔥',  color: '#ff4400', effect: 'damage', duration: 0 },
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

let currentLane       = 2;
let gameRunning       = false;
let gamePaused        = false;
let score             = 0;
let speed             = BASE_SPD;
let frameId           = null;
let obstacles         = [];
let powerups          = [];
let coins             = [];
let hazards           = [];
let spawnTimer        = 0;
let powerupTimer      = 0;
let coinTimer         = 0;
let hazardTimer       = 0;
let spawnInterval     = 90;
let powerupInterval   = 200;
let coinInterval      = 50;
let hazardInterval    = 180;
let leanTimer         = null;
let lives             = MAX_LIVES;
let shieldActive      = false;
let shieldTimer       = null;
let magnetActive      = false;
let magnetTimer       = null;
let ghostActive       = false;
let ghostTimer        = null;
let invulnerable      = false;
let invulnTimer       = null;
let combo             = 0;
let bestCombo         = 0;
let markerY           = -40;
let sessionCoins      = 0;
let zone              = 1;
let feverCombo        = 0;
let feverActive       = false;
let trailTickCount    = 0;
let rainDrops         = [];
let weatherParticles  = [];
let rainCtx           = null;
let roadCtx           = null;
let effectCtx         = null;
let roadOffset        = 0;
let screenShakeActive = false;
let bgCtx             = null;
let logoCtx           = null;
let logoAngle         = 0;
let nitroCharge       = 0;
let nitroActive       = false;
let nitroTimer        = null;
let nitroKeyHeld      = false;
let driftCount        = 0;
let lastLane          = 2;
let driftCombo        = 0;
let driftTimer        = null;
let scoreMultiplier   = 1;
let multiplierTimer   = null;
let nearMissCount     = 0;
let lightningTimer    = 0;
let dodgeCount        = 0;

let heatLevel         = 0;
let maxHeatReached    = 0;
let heatActive        = false;
let overclockActive   = false;
let overclockTimer    = null;

let slipstreamCharge  = 0;
let slipstreamActive  = false;
let slipstreamTimer   = null;
let bestSlipstream    = 0;
let slipstreamTarget  = null;

let bossActive        = false;
let bossEl            = null;
let bossLane          = 3;
let bossY             = -200;
let bossHp            = 5;
let bossSpawnTimer    = 0;
let bossPhase         = 0;
let bossDefeated      = false;

let ghostFrames       = [];
let ghostPlayback     = [];
let ghostEl           = null;
let ghostPlaybackIdx  = 0;
let ghostPlaybackActive = false;

let spinActive        = false;
let spinTimer         = null;
let spinDirection     = 1;

let empActive         = false;
let empTimer          = null;

let weatherType       = 'clear';
let fogIntensity      = 0;
let targetFogIntensity = 0;

let gameStartTime     = 0;
let sessionPlaytime   = 0;

let adRivalTimer      = 0;
let rivalLane         = -1;
let rivalY            = -120;
let rivalActive       = false;
let rivalEl           = null;
let rivalSpeed        = 0;

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
    c.beginPath(); c.arc(x, y, 6, 0, Math.PI * 2); c.fillStyle = grad; c.fill();
  }
  c.beginPath(); c.arc(cx, cy, 24, 0, Math.PI * 2);
  c.strokeStyle = `rgba(0,229,255,${0.08 + Math.sin(logoAngle * 3) * 0.04})`;
  c.lineWidth = 1; c.stroke();
  c.beginPath(); c.arc(cx, cy, 18, logoAngle, logoAngle + Math.PI * 1.4);
  c.strokeStyle = 'rgba(255,69,0,0.35)'; c.lineWidth = 2; c.stroke();
  requestAnimationFrame(animateLogo);
}

function initRoadCanvas() {
  roadCtx   = roadCanvas.getContext('2d');
  effectCtx = effectCanvas.getContext('2d');
}

function drawRoad() {
  if (!roadCtx) return;
  const theme = ZONE_THEMES[zone - 1] || ZONE_THEMES[0];
  const w = GAME_W, h = GAME_H;
  const ctx = roadCtx;
  ctx.clearRect(0, 0, w, h);

  const stripeH = 44;
  const offset  = roadOffset % stripeH;
  for (let y = -stripeH + offset; y < h + stripeH; y += stripeH) {
    const grad = ctx.createLinearGradient(0, y, 0, y + stripeH);
    grad.addColorStop(0, theme.road1);
    grad.addColorStop(1, theme.road2);
    ctx.fillStyle = grad;
    ctx.fillRect(0, y, w, stripeH);
  }

  const fogTop = ctx.createLinearGradient(0, 0, 0, 50);
  fogTop.addColorStop(0, 'rgba(0,0,0,0.55)'); fogTop.addColorStop(1, 'transparent');
  ctx.fillStyle = fogTop; ctx.fillRect(0, 0, w, 50);

  const fogBot = ctx.createLinearGradient(0, h - 50, 0, h);
  fogBot.addColorStop(0, 'transparent'); fogBot.addColorStop(1, 'rgba(0,0,0,0.55)');
  ctx.fillStyle = fogBot; ctx.fillRect(0, h - 50, w, 50);

  if (fogIntensity > 0) {
    const zoneColor = theme.color;
    const r2 = parseInt(zoneColor.slice(1,3),16);
    const g2 = parseInt(zoneColor.slice(3,5),16);
    const b2 = parseInt(zoneColor.slice(5,7),16);
    const fogMid = ctx.createLinearGradient(0, 0, 0, h * 0.7);
    fogMid.addColorStop(0, `rgba(${r2},${g2},${b2},${fogIntensity * 0.18})`);
    fogMid.addColorStop(0.4, `rgba(0,0,0,${fogIntensity * 0.55})`);
    fogMid.addColorStop(1, 'transparent');
    ctx.fillStyle = fogMid; ctx.fillRect(0, 0, w, h);
  }

  ctx.strokeStyle = 'rgba(255,255,255,0.055)';
  ctx.setLineDash([22, 22]);
  ctx.lineDashOffset = -roadOffset;
  ctx.lineWidth = 1.5;
  for (let i = 1; i < NUM_LANES; i++) {
    const x = i * LANE_W;
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
  }
  ctx.setLineDash([]);

  const curbW = 8, dashH = 14;
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
  sideGlow.addColorStop(0, `rgba(${r},${g},${b},0.08)`); sideGlow.addColorStop(1, 'transparent');
  ctx.fillStyle = sideGlow; ctx.fillRect(0, 0, 40, h);

  const sideGlowR = ctx.createLinearGradient(w - 40, 0, w, 0);
  sideGlowR.addColorStop(0, 'transparent'); sideGlowR.addColorStop(1, `rgba(${r},${g},${b},0.08)`);
  ctx.fillStyle = sideGlowR; ctx.fillRect(w - 40, 0, 40, h);

  if (nitroActive) {
    const nGrad = ctx.createLinearGradient(0, h * 0.3, 0, h);
    nGrad.addColorStop(0, 'transparent'); nGrad.addColorStop(1, 'rgba(0,229,255,0.06)');
    ctx.fillStyle = nGrad; ctx.fillRect(0, 0, w, h);
  }

  if (overclockActive) {
    const oGrad = ctx.createLinearGradient(0, 0, 0, h);
    oGrad.addColorStop(0, 'rgba(255,0,0,0.04)'); oGrad.addColorStop(1, 'rgba(255,100,0,0.08)');
    ctx.fillStyle = oGrad; ctx.fillRect(0, 0, w, h);
  }

  if (slipstreamActive) {
    const slipGrad = ctx.createLinearGradient(0, 0, 0, h * 0.5);
    slipGrad.addColorStop(0, 'rgba(0,229,255,0.12)'); slipGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = slipGrad;
    ctx.fillRect(LANES[currentLane] - 5, 0, BIKE_W + 10, h * 0.5);
  }

  if (zone === 3) {
    lightningTimer++;
    if (lightningTimer > 0 && lightningTimer < 4) {
      ctx.strokeStyle = `rgba(191,95,255,${0.3 * (4 - lightningTimer) / 3})`;
      ctx.lineWidth = 2; ctx.setLineDash([3, 5]);
      const lx = Math.random() * w;
      ctx.beginPath(); ctx.moveTo(lx, 0); ctx.lineTo(lx + (Math.random()-0.5)*30, h); ctx.stroke();
      ctx.setLineDash([]);
    }
    if (lightningTimer > 140 + Math.random() * 60) lightningTimer = -4;
  }
}

function drawEffects() {
  if (!effectCtx) return;
  effectCtx.clearRect(0, 0, GAME_W, GAME_H);

  if (ghostActive) {
    const bikeX = LANES[currentLane] + BIKE_W / 2;
    const bikeY = GAME_H - 22 - BIKE_H / 2;
    const grad = effectCtx.createRadialGradient(bikeX, bikeY, 0, bikeX, bikeY, 90);
    grad.addColorStop(0, 'rgba(170,170,255,0.06)'); grad.addColorStop(1, 'transparent');
    effectCtx.fillStyle = grad; effectCtx.fillRect(0, 0, GAME_W, GAME_H);
  }

  if (slipstreamActive && slipstreamTarget) {
    const sx = LANES[slipstreamTarget.lane] + OBS_W / 2;
    const sy = slipstreamTarget.top + OBS_H;
    const bikeX = LANES[currentLane] + BIKE_W / 2;
    const bikeY = GAME_H - 22 - BIKE_H;
    effectCtx.strokeStyle = 'rgba(0,229,255,0.35)';
    effectCtx.lineWidth = 2;
    effectCtx.setLineDash([4, 6]);
    effectCtx.beginPath(); effectCtx.moveTo(bikeX, bikeY); effectCtx.lineTo(sx, sy); effectCtx.stroke();
    effectCtx.setLineDash([]);
  }

  if (bossActive && bossEl) {
    const bx = LANES[bossLane] + OBS_W / 2;
    const grad = effectCtx.createRadialGradient(bx, bossY + 50, 0, bx, bossY + 50, 80);
    grad.addColorStop(0, 'rgba(255,0,0,0.08)'); grad.addColorStop(1, 'transparent');
    effectCtx.fillStyle = grad; effectCtx.fillRect(0, 0, GAME_W, GAME_H);
  }

  if (empActive) {
    effectCtx.strokeStyle = 'rgba(0,255,136,0.4)';
    effectCtx.lineWidth = 1;
    for (let i = 0; i < 3; i++) {
      const r = 60 + i * 30 + (Date.now() % 800) / 800 * 20;
      const bikeX = LANES[currentLane] + BIKE_W / 2;
      const bikeY = GAME_H - 22 - BIKE_H / 2;
      effectCtx.beginPath(); effectCtx.arc(bikeX, bikeY, r, 0, Math.PI * 2); effectCtx.stroke();
    }
  }

  if (scoreMultiplier > 1) {
    effectCtx.font = `bold 11px 'Share Tech Mono'`;
    effectCtx.fillStyle = 'rgba(255,215,0,0.18)';
    effectCtx.textAlign = 'center';
    effectCtx.fillText(`SCORE x${scoreMultiplier}`, GAME_W / 2, 30);
  }
}

function initWeatherParticles() {
  weatherParticles = [];
  for (let i = 0; i < 150; i++) {
    weatherParticles.push({
      x: Math.random() * GAME_W,
      y: Math.random() * GAME_H,
      size: 1 + Math.random() * 3,
      spd: 2 + Math.random() * 5,
      op: 0.1 + Math.random() * 0.4,
      drift: (Math.random() - 0.5) * 1.5,
    });
  }
}

function initRain() {
  rainCanvas.width  = window.innerWidth;
  rainCanvas.height = window.innerHeight;
  rainCanvas.style.cssText = 'position:fixed;inset:0;z-index:0;pointer-events:none;opacity:0;transition:opacity 0.5s;';
  rainCtx = rainCanvas.getContext('2d');
  for (let i = 0; i < 200; i++) {
    rainDrops.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      len: 10 + Math.random() * 18,
      spd: 14 + Math.random() * 22,
      op: 0.08 + Math.random() * 0.25,
    });
  }
  initWeatherParticles();
}

function drawWeatherInGame() {
  const theme = ZONE_THEMES[zone - 1] || ZONE_THEMES[0];
  const wtype = theme.weather;

  if (weatherOverlay) {
    weatherOverlay.classList.remove('weather-rain','weather-snow','weather-sand','weather-ash','weather-void');
    if (wtype !== 'clear') weatherOverlay.classList.add('weather-' + wtype);
  }

  targetFogIntensity = theme.fog;
  if (fogIntensity < targetFogIntensity) fogIntensity = Math.min(fogIntensity + 0.005, targetFogIntensity);
  else fogIntensity = Math.max(fogIntensity - 0.005, targetFogIntensity);

  if (wtype === 'rain' || wtype === 'void') {
    rainCanvas.style.opacity = '1';
    if (rainCtx) {
      rainCtx.clearRect(0, 0, rainCanvas.width, rainCanvas.height);
      const col = wtype === 'void' ? '#ff88cc' : '#99aaff';
      rainCtx.strokeStyle = col; rainCtx.lineWidth = 1.2;
      for (const d of rainDrops) {
        rainCtx.globalAlpha = d.op;
        rainCtx.beginPath(); rainCtx.moveTo(d.x, d.y); rainCtx.lineTo(d.x + 3, d.y + d.len); rainCtx.stroke();
        d.y += d.spd;
        if (d.y > window.innerHeight) { d.y = -d.len; d.x = Math.random() * window.innerWidth; }
      }
      rainCtx.globalAlpha = 1;
    }
  } else {
    rainCanvas.style.opacity = '0';
  }
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

function makeBossSVG() {
  return `<svg viewBox="0 0 56 100" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="14" cy="88" rx="11" ry="8" fill="#0a0000"/>
    <ellipse cx="42" cy="88" rx="11" ry="8" fill="#0a0000"/>
    <ellipse cx="14" cy="12" rx="10" ry="7" fill="#0a0000"/>
    <ellipse cx="42" cy="12" rx="10" ry="7" fill="#0a0000"/>
    <rect x="8" y="20" width="40" height="56" rx="6" fill="#cc0000"/>
    <rect x="12" y="10" width="32" height="20" rx="5" fill="#cc0000"/>
    <rect x="15" y="12" width="26" height="14" rx="3" fill="#110000" opacity="0.9"/>
    <rect x="17" y="13" width="9"  height="11" rx="2" fill="#ff4400" opacity="0.5"/>
    <rect x="30" y="13" width="9"  height="11" rx="2" fill="#ff4400" opacity="0.5"/>
    <rect x="8"  y="36" width="6"  height="18" rx="3" fill="#880000"/>
    <rect x="42" y="36" width="6"  height="18" rx="3" fill="#880000"/>
    <rect x="14" y="48" width="28" height="16" rx="2" fill="#110000" opacity="0.55"/>
    <rect x="18" y="68" width="20" height="4"  rx="1" fill="#ff1111" opacity="0.9"/>
    <rect x="20" y="24" width="16" height="3"  rx="1" fill="#ff6600" opacity="0.7"/>
    <ellipse cx="28" cy="50" rx="6" ry="4" fill="#ff0000" opacity="0.5"/>
    <rect x="5" y="30" width="3" height="8" rx="1" fill="#ff4400" opacity="0.8"/>
    <rect x="48" y="30" width="3" height="8" rx="1" fill="#ff4400" opacity="0.8"/>
  </svg>`;
}

function makeRivalSVG() {
  return `<svg viewBox="0 0 40 72" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="20" cy="62" rx="11" ry="7" fill="#1a1a1a"/>
    <ellipse cx="20" cy="62" rx="7"  ry="4.5" fill="#2d2d2d"/>
    <ellipse cx="20" cy="11" rx="9"  ry="6.5" fill="#1a1a1a"/>
    <ellipse cx="20" cy="11" rx="6"  ry="4" fill="#2d2d2d"/>
    <rect x="15" y="30" width="10" height="22" rx="2" fill="#003388"/>
    <rect x="14" y="29" width="12" height="4"  rx="1" fill="#0055ff"/>
    <polygon points="20,3 11,20 29,20" fill="#0044cc"/>
    <polygon points="20,7 14,20 26,20" fill="#88aaff" opacity="0.55"/>
    <rect x="16" y="36" width="8"  height="12" rx="1" fill="#002266"/>
    <rect x="9"  y="32" width="5"  height="8"  rx="2" fill="#003388" opacity="0.7"/>
    <rect x="26" y="32" width="5"  height="8"  rx="2" fill="#003388" opacity="0.7"/>
    <rect x="14" y="47" width="12" height="3"  rx="1" fill="#ff4444" opacity="0.95"/>
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

    const isBurning = zone >= 6 && Math.random() < 0.3;
    if (isBurning) el.classList.add('burning');

    const isTanker  = zone >= 3 && Math.random() < 0.12;
    if (isTanker)  { el.classList.add('tanker'); el.dataset.hp = '2'; }

    el.innerHTML = makeObstacleSVG(palette);
    el.style.left = LANES[lane] + 'px';
    el.style.top  = -OBS_H + 'px';

    const zColor = (ZONE_THEMES[zone - 1] || ZONE_THEMES[0]).color;
    el.style.filter = `drop-shadow(0 0 8px ${zColor}88)`;

    obstaclesLayer.appendChild(el);
    obstacles.push({
      el, top: -OBS_H, lane, burning: isBurning,
      passed: false, hp: isTanker ? 2 : 1,
      slipstreamed: false,
    });
  }
}

function spawnPowerup() {
  if (powerups.length > 0) return;
  const roll = Math.random();
  let cum = 0, chosen = POWERUP_TYPES[0];
  for (const p of POWERUP_TYPES) { cum += p.chance; if (roll < cum) { chosen = p; break; } }
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

function spawnHazard() {
  if (Math.random() < 0.4) return;
  const type = HAZARD_TYPES[Math.floor(Math.random() * HAZARD_TYPES.length)];
  const lane = Math.floor(Math.random() * NUM_LANES);
  const el = document.createElement('div');
  el.className = 'lane-hazard';
  el.textContent = type.icon;
  el.style.left = (LANES[lane] + 5) + 'px';
  el.style.top  = -30 + 'px';
  el.style.color = type.color;
  hazardLayer.appendChild(el);
  hazards.push({ el, top: -30, lane, type: type.type, effect: type.effect, duration: type.duration });
}

function spawnCoin() {
  const count = Math.random() < 0.3 ? 3 : Math.random() < 0.5 ? 2 : 1;
  const usedLanes = [];
  for (let i = 0; i < count; i++) {
    let lane, attempts = 0;
    do { lane = Math.floor(Math.random() * NUM_LANES); attempts++; } while (usedLanes.includes(lane) && attempts < 10);
    usedLanes.push(lane);
    const el = document.createElement('div');
    el.className = 'coin';
    el.textContent = '🪙';
    el.style.left = (LANES[lane] + (OBS_W - 26) / 2) + 'px';
    el.style.top  = -28 + 'px';
    coinLayer.appendChild(el);
    coins.push({ el, top: -28, lane });
  }
}

function spawnTrail() {
  const x = LANES[currentLane] + BIKE_W / 2;
  const y = GAME_H - 22;
  const settings = Storage.getSettings();
  const colorScheme = settings.trailColor || 'default';

  let colors, count;
  if (ghostActive) { colors = ['#aaaaff','#ccccff','#ffffff','#8888ff']; count = 5; }
  else if (nitroActive) { colors = ['#00e5ff','#66eeff','#ffffff','#aaeeff']; count = 6; }
  else if (overclockActive) { colors = ['#ff0000','#ff6600','#ff4400','#ff9900']; count = 7; }
  else if (slipstreamActive) { colors = ['#00e5ff','#88ffee','#ffffff','#00ddff']; count = 5; }
  else if (feverActive) { colors = ['#ff4500','#ff7700','#ffd700','#ff2200']; count = 4; }
  else {
    if (colorScheme === 'gold')    colors = ['rgba(255,215,0,0.6)', 'rgba(255,180,0,0.4)', 'rgba(255,255,100,0.3)'];
    else if (colorScheme === 'plasma') colors = ['rgba(200,0,255,0.6)', 'rgba(255,0,200,0.4)', 'rgba(100,0,255,0.3)'];
    else if (colorScheme === 'rainbow') {
      const hue = (Date.now() / 10) % 360;
      colors = [`hsla(${hue},100%,60%,0.6)`, `hsla(${(hue+60)%360},100%,60%,0.4)`, `hsla(${(hue+120)%360},100%,60%,0.3)`];
    }
    else colors = ['rgba(0,229,255,0.5)', 'rgba(255,69,0,0.35)', 'rgba(255,215,0,0.25)'];
    count = 2;
  }

  for (let i = 0; i < count; i++) {
    const t = document.createElement('div');
    t.className = 'trail-dot';
    const size = (ghostActive || nitroActive || overclockActive) ? 7 + Math.random() * 6 : feverActive ? 6 + Math.random() * 5 : 4 + Math.random() * 3;
    t.style.width  = size + 'px';
    t.style.height = size + 'px';
    t.style.left   = (x + (Math.random() - 0.5) * (slipstreamActive ? 24 : 18)) + 'px';
    t.style.top    = y + 'px';
    t.style.background = colors[Math.floor(Math.random() * colors.length)];
    if (nitroActive || slipstreamActive) t.style.boxShadow = `0 0 10px #00e5ff, 0 0 20px #00e5ff66`;
    else if (overclockActive) t.style.boxShadow = `0 0 10px #ff4400, 0 0 20px #ff440066`;
    else if (ghostActive) t.style.boxShadow = `0 0 8px #aaaaff88`;
    else if (feverActive) t.style.boxShadow = `0 0 8px #ff4500`;
    trailLayer.appendChild(t);
    setTimeout(() => t.remove(), (ghostActive || nitroActive || overclockActive) ? 600 : 400);
  }
}

function checkNearMiss() {
  const bikeLeft = LANES[currentLane];
  const bikeTop  = GAME_H - 22 - BIKE_H;
  for (const obs of obstacles) {
    if (obs.passed) continue;
    const obsLeft = LANES[obs.lane];
    const hDist = Math.abs((bikeLeft + BIKE_W / 2) - (obsLeft + OBS_W / 2));
    const vOverlap = obs.top + OBS_H > bikeTop && obs.top < bikeTop + BIKE_H;
    if (vOverlap && hDist > BIKE_W + 2 && hDist < BIKE_W + NEAR_MISS_DIST + OBS_W / 2) {
      obs.passed = true;
      nearMissCount++;
      nitroCharge = Math.min(nitroCharge + 6, NITRO_MAX);
      heatLevel = Math.min(heatLevel + 8, HEAT_MAX);
      updateNitroBar();
      spawnFloatingText(currentLane, '🔥 NEAR MISS! +1', '#ff7700');
      score += scoreMultiplier;
      scoreEl.textContent = score;
    }
  }
}

function checkSlipstream() {
  const bikeTop  = GAME_H - 22 - BIKE_H;
  const bikeCenter = LANES[currentLane] + BIKE_W / 2;
  slipstreamTarget = null;

  for (const obs of obstacles) {
    const obsCenter = LANES[obs.lane] + OBS_W / 2;
    const vertDist  = obs.top + OBS_H - bikeTop;
    const horizDist = Math.abs(bikeCenter - obsCenter);

    if (vertDist > 0 && vertDist < SLIPSTREAM_DIST && horizDist < OBS_W / 2 + 4) {
      slipstreamTarget = obs;
      if (!slipstreamActive) {
        slipstreamCharge = Math.min(slipstreamCharge + 3.5, SLIPSTREAM_MAX);
      }
      break;
    }
  }

  if (!slipstreamTarget) {
    slipstreamCharge = Math.max(0, slipstreamCharge - 2);
  }

  if (slipstreamCharge >= SLIPSTREAM_MAX && !slipstreamActive) activateSlipstream();
  if (slipstreamActive && !slipstreamTarget) deactivateSlipstream();

  updateSlipstreamBar();
}

function activateSlipstream() {
  slipstreamActive = true;
  slipstreamCharge = SLIPSTREAM_MAX;
  bestSlipstream++;
  spawnFloatingText(currentLane, '💨 SLIPSTREAM!', '#00e5ff');
  flashDamage('rgba(0,229,255,0.1)');
  clearTimeout(slipstreamTimer);
  slipstreamTimer = setTimeout(() => {
    if (slipstreamActive) deactivateSlipstream();
  }, 3500);
  refreshBikeFilter();
}

function deactivateSlipstream() {
  slipstreamActive = false;
  slipstreamCharge = 0;
  clearTimeout(slipstreamTimer);
  refreshBikeFilter();
}

function updateSlipstreamBar() {
  if (!slipstreamEl || !slipstreamBar) return;
  const pct = (slipstreamCharge / SLIPSTREAM_MAX) * 100;
  slipstreamBar.style.width = pct + '%';
  const wrap = document.getElementById('slipstreamWrap');
  if (wrap) {
    wrap.style.opacity = slipstreamCharge > 5 ? '1' : '0.25';
    if (slipstreamActive) wrap.classList.add('active');
    else wrap.classList.remove('active');
  }
}

function updateHeat() {
  if (!gameRunning) return;
  if (heatLevel > 0 && !overclockActive) heatLevel = Math.max(0, heatLevel - HEAT_DECAY);
  if (heatLevel > maxHeatReached) maxHeatReached = heatLevel;

  const pct = (heatLevel / HEAT_MAX) * 100;
  if (heatFill) heatFill.style.width = pct + '%';
  if (heatEl) heatEl.textContent = Math.floor(heatLevel);

  if (heatLevel >= HEAT_MAX && !overclockActive) triggerOverclock();

  if (heatWrap) {
    heatWrap.style.opacity = heatLevel > 10 ? '1' : '0.3';
    if (overclockActive) heatWrap.classList.add('overclock');
    else heatWrap.classList.remove('overclock');
  }
}

function triggerOverclock() {
  overclockActive = true;
  heatLevel = HEAT_MAX;
  spawnFloatingText(currentLane, '🔴 OVERCLOCK!', '#ff0000');
  flashDamage('rgba(255,0,0,0.2)');
  triggerScreenShake();
  gameEl.classList.add('overclock-mode');
  clearTimeout(overclockTimer);
  overclockTimer = setTimeout(() => {
    overclockActive = false;
    heatLevel = 0;
    gameEl.classList.remove('overclock-mode');
    refreshBikeFilter();
  }, 5000);
  refreshBikeFilter();
}

function updateBoss() {
  if (!bossActive || !bossEl) return;

  bossY += speed * 0.85;
  bossEl.style.top = bossY + 'px';

  bossPhase = (bossPhase + 1) % 240;

  if (bossPhase % 80 === 0) {
    const targetLane = Math.max(0, Math.min(NUM_LANES - 1, currentLane + Math.floor((Math.random() - 0.5) * 3)));
    bossLane = targetLane;
    bossEl.style.left = LANES[bossLane] + 'px';
    bossEl.style.transition = 'left 0.3s ease';
  }

  if (bossPhase % 120 === 0 && bossLane === currentLane) {
    spawnBossProjectile();
  }

  if (bossY > GAME_H + 50) {
    bossEl.remove(); bossEl = null; bossActive = false;
    score += 10 * scoreMultiplier; scoreEl.textContent = score;
    spawnFloatingText(3, '🏆 BOSS ESCAPED! +10', '#ffd700');
  }

  const bikeLeft = LANES[currentLane];
  const bikeTop  = GAME_H - 22 - BIKE_H;
  const bossLeft = LANES[bossLane];
  const pad = 8;
  if (!invulnerable && !ghostActive &&
    bikeLeft + pad < bossLeft + 56 - pad &&
    bikeLeft + BIKE_W - pad > bossLeft + pad &&
    bikeTop + pad < bossY + 100 - pad &&
    bikeTop + BIKE_H - pad > bossY + pad
  ) {
    handleCrash(null);
  }
}

function spawnBossProjectile() {
  const proj = document.createElement('div');
  proj.className = 'boss-projectile';
  proj.textContent = '🔴';
  proj.style.left = (LANES[bossLane] + OBS_W / 2 - 10) + 'px';
  proj.style.top  = (bossY + 80) + 'px';
  bossLayer.appendChild(proj);

  let projY = bossY + 80;
  const projLane = bossLane;
  const tick = () => {
    projY += 8;
    proj.style.top = projY + 'px';
    if (projY > GAME_H) { proj.remove(); return; }

    const bikeLeft = LANES[currentLane];
    const bikeTop  = GAME_H - 22 - BIKE_H;
    const projLeft = LANES[projLane] + OBS_W / 2 - 10;
    if (!invulnerable && !ghostActive &&
      bikeLeft < projLeft + 20 && bikeLeft + BIKE_W > projLeft &&
      bikeTop < projY + 20 && bikeTop + BIKE_H > projY
    ) {
      proj.remove();
      handleCrash(null);
      return;
    }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

function spawnBoss() {
  if (bossActive) return;
  bossActive = true;
  bossHp     = 5 + (zone - BOSS_SPAWN_ZONE) * 2;
  bossY      = -120;
  bossLane   = Math.floor(NUM_LANES / 2);
  bossPhase  = 0;

  bossEl = document.createElement('div');
  bossEl.className = 'boss-vehicle';
  bossEl.innerHTML = makeBossSVG();
  bossEl.style.left = LANES[bossLane] + 'px';
  bossEl.style.top  = bossY + 'px';
  bossLayer.appendChild(bossEl);

  if (bossAnnounce) {
    bossAnnounce.classList.remove('hidden');
    bossAnnounce.classList.add('boss-pop');
    setTimeout(() => { bossAnnounce.classList.add('hidden'); bossAnnounce.classList.remove('boss-pop'); }, 2000);
  }
  flashDamage('rgba(255,0,0,0.25)');
  triggerScreenShake();
}

function hitBoss() {
  if (!bossActive || !bossEl) return false;
  bossHp--;
  bossEl.classList.remove('boss-hit');
  void bossEl.offsetWidth;
  bossEl.classList.add('boss-hit');
  spawnCrashParticles(LANES[bossLane] + 28, bossY + 50, ['#ff4500','#ff7700','#fff']);

  if (bossHp <= 0) {
    spawnCrashParticles(LANES[bossLane] + 28, bossY + 50, ['#ff0000','#ff7700','#ffd700','#ffffff']);
    spawnCrashParticles(LANES[bossLane] + 28, bossY + 50, ['#ff0000','#ff7700','#ffd700','#ffffff']);
    bossEl.remove(); bossEl = null; bossActive = false;
    bossDefeated = true;
    score += 20 * scoreMultiplier; scoreEl.textContent = score;
    combo += 5; updateComboBar();
    nitroCharge = NITRO_MAX; updateNitroBar();
    heatLevel = HEAT_MAX * 0.8;
    spawnFloatingText(3, '💥 BOSS DESTROYED! +20', '#ff4500');
    flashDamage('rgba(255,100,0,0.35)');
    triggerScreenShake();
    return true;
  }
  return false;
}

function spawnRival() {
  if (rivalActive) return;
  const savedRun = Storage.getGhostRun();
  if (!savedRun || savedRun.length === 0) return;

  rivalActive = true;
  rivalLane   = 0;
  rivalY      = -80;
  rivalSpeed  = speed * 0.95;

  rivalEl = document.createElement('div');
  rivalEl.className = 'rival-bike';
  rivalEl.innerHTML = makeRivalSVG();
  rivalEl.style.left = LANES[rivalLane] + 'px';
  rivalEl.style.top  = rivalY + 'px';
  rivalEl.style.opacity = '0.6';
  ghostLayer.appendChild(rivalEl);

  ghostPlayback    = savedRun;
  ghostPlaybackIdx = 0;
  ghostPlaybackActive = true;
}

function updateRival() {
  if (!rivalActive || !rivalEl) return;

  if (ghostPlaybackActive && ghostPlayback.length > 0) {
    const frame = ghostPlayback[ghostPlaybackIdx % ghostPlayback.length];
    if (frame) {
      rivalLane = Math.max(0, Math.min(NUM_LANES - 1, frame.lane));
      rivalEl.style.left = LANES[rivalLane] + 'px';
      rivalEl.style.transition = 'left 0.1s ease';
    }
    ghostPlaybackIdx++;
  }

  rivalY += speed * 0.6;
  rivalEl.style.top = rivalY + 'px';

  if (rivalY > GAME_H + 100) {
    rivalEl.remove(); rivalEl = null; rivalActive = false;
    ghostPlaybackActive = false;
  }
}

function recordGhostFrame() {
  ghostFrames.push({ lane: currentLane, y: GAME_H - 22 - BIKE_H, t: Date.now() });
  if (ghostFrames.length > 3000) ghostFrames.shift();
}

function updateObstacles() {
  const moveSpd = nitroActive ? speed * 1.8 : overclockActive ? speed * 2.2 : feverActive ? speed * 1.55 : slipstreamActive ? speed * 1.4 : speed;
  for (let i = obstacles.length - 1; i >= 0; i--) {
    const obs = obstacles[i];
    obs.top += moveSpd;
    obs.el.style.top = obs.top + 'px';

    if (obs.top > GAME_H) { obs.el.remove(); obstacles.splice(i, 1); addScore(obs); continue; }

    if (!invulnerable && !ghostActive && checkCollision(obs, OBS_W, OBS_H)) {
      if (nitroActive || overclockActive) {
        if (obs.hp > 1) {
          obs.hp--; obs.el.classList.remove('boss-hit'); void obs.el.offsetWidth; obs.el.classList.add('boss-hit');
          spawnCrashParticles(LANES[obs.lane] + OBS_W / 2, obs.top + OBS_H / 2, ['#ff7700','#fff']);
          spawnFloatingText(obs.lane, '💥 CRACKED!', '#ff7700');
        } else {
          obs.el.remove(); obstacles.splice(i, 1);
          score += scoreMultiplier; scoreEl.textContent = score;
          heatLevel = Math.min(heatLevel + 12, HEAT_MAX);
          spawnCrashParticles(LANES[obs.lane] + OBS_W / 2, obs.top + OBS_H / 2, ['#00e5ff','#66eeff','#fff']);
          spawnFloatingText(obs.lane, nitroActive ? '💨 NITRO SMASH!' : '🔴 OVERCLOCK SMASH!', '#ff4400');
        }
        continue;
      }
      handleCrash(obs); return;
    }

    if (ghostActive && checkCollision(obs, OBS_W, OBS_H)) {
      spawnFloatingText(obs.lane, '👻 GHOST!', '#aaaaff');
    }
  }
  checkNearMiss();
  checkSlipstream();
}

function updateHazards() {
  for (let i = hazards.length - 1; i >= 0; i--) {
    const hz = hazards[i];
    hz.top += speed;
    hz.el.style.top = hz.top + 'px';

    if (hz.top > GAME_H) { hz.el.remove(); hazards.splice(i, 1); continue; }

    const bikeLeft = LANES[currentLane];
    const bikeTop  = GAME_H - 22 - BIKE_H;
    const hazLeft  = LANES[hz.lane] + 5;
    const pad = 6;
    if (!invulnerable && !ghostActive &&
      bikeLeft + pad < hazLeft + 30 &&
      bikeLeft + BIKE_W - pad > hazLeft &&
      bikeTop + pad < hz.top + 30 &&
      bikeTop + BIKE_H - pad > hz.top
    ) {
      hz.el.remove(); hazards.splice(i, 1);
      applyHazardEffect(hz);
    }
  }
}

function applyHazardEffect(hz) {
  switch (hz.effect) {
    case 'spin':
      if (!spinActive) {
        spinActive = true;
        gameEl.classList.add('spin-mode');
        spawnFloatingText(currentLane, '🛢 OIL SPIN!', '#6666ff');
        flashDamage('rgba(100,100,200,0.2)');
        let spinCount = 0;
        const spinInterval = setInterval(() => {
          spinCount++;
          moveLane(spinCount % 2 === 0 ? 1 : -1);
          if (spinCount >= 6) {
            clearInterval(spinInterval);
            spinActive = false;
            gameEl.classList.remove('spin-mode');
          }
        }, 180);
      }
      break;
    case 'slow':
      const prevSpeed = speed;
      speed = Math.max(speed * 0.5, BASE_SPD);
      spawnFloatingText(currentLane, '▬ SPEED BUMP!', '#cc8800');
      flashDamage('rgba(200,100,0,0.15)');
      setTimeout(() => { speed = prevSpeed; }, 1500);
      break;
    case 'emp':
      empActive = true;
      if (nitroActive) deactivateNitro();
      if (feverActive) deactivateFever();
      nitroCharge = Math.max(0, nitroCharge - 40);
      updateNitroBar();
      spawnFloatingText(currentLane, '📡 EMP BLAST!', '#00ff88');
      flashDamage('rgba(0,255,136,0.2)');
      clearTimeout(empTimer);
      empTimer = setTimeout(() => { empActive = false; }, hz.duration);
      break;
    case 'damage':
      handleCrash(null);
      break;
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
    if (bikeLeft + pad < coinX + 26 - pad && bikeLeft + BIKE_W - pad > coinX + pad &&
        bikeTop + pad < c.top + 26 - pad && bikeTop + BIKE_H - pad > c.top + pad) {
      collectCoin(c, i);
    }
  }
}

function collectCoin(c, idx) {
  c.el.remove(); coins.splice(idx, 1);
  const bonus = overclockActive ? 5 : nitroActive ? 4 : ghostActive ? 3 : feverActive ? 3 : scoreMultiplier;
  sessionCoins += bonus;
  coinCountEl.textContent = sessionCoins;
  popEl(coinCountEl.parentElement);
  heatLevel = Math.min(heatLevel + 2, HEAT_MAX);
  const label = overclockActive ? `🪙x${bonus} OVERCLOCK!` : nitroActive ? `🪙x${bonus} NITRO!` : ghostActive ? `🪙x${bonus} GHOST!` : feverActive ? `🪙x${bonus} FEVER!` : bonus > 1 ? `🪙 x${bonus}!` : '🪙+1';
  const color = overclockActive ? '#ff4400' : nitroActive ? '#00e5ff' : ghostActive ? '#aaaaff' : '#ffd700';
  spawnFloatingText(c.lane, label, color);
  spawnCoinBurst(LANES[c.lane] + 13, c.top);
  nitroCharge = Math.min(nitroCharge + 2, NITRO_MAX);
  updateNitroBar();
}

function spawnCoinBurst(x, y) {
  for (let i = 0; i < 8; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const angle = (i / 8) * Math.PI * 2;
    const dist  = 18 + Math.random() * 16;
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
  if (!gameRunning || gamePaused || empActive) return;
  if (nitroCharge < NITRO_MIN_USE || nitroActive) return;
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
  refreshBikeFilter();
  updateNitroBar();
}

function refreshBikeFilter() {
  bikeEl.classList.remove('ghost-mode-bike');
  if (ghostActive) {
    bikeEl.classList.add('ghost-mode-bike');
    bikeEl.style.filter = '';
  } else if (overclockActive) {
    bikeEl.style.filter = 'drop-shadow(0 0 22px #ff4400) drop-shadow(0 0 44px #ff000088) saturate(1.5)';
  } else if (nitroActive) {
    bikeEl.style.filter = 'drop-shadow(0 0 18px #00e5ff) drop-shadow(0 0 35px #00e5ff88)';
  } else if (slipstreamActive) {
    bikeEl.style.filter = 'drop-shadow(0 0 16px #00e5ff) drop-shadow(0 0 28px rgba(0,229,255,0.5)) brightness(1.2)';
  } else if (feverActive) {
    bikeEl.style.filter = 'drop-shadow(0 0 20px #ff4500) drop-shadow(0 0 40px #ffd700)';
  } else {
    bikeEl.style.filter = '';
  }
}

function updateNitro() {
  if (empActive) return;
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
    score += bonus * scoreMultiplier; scoreEl.textContent = score;
    heatLevel = Math.min(heatLevel + 10, HEAT_MAX);
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
  refreshBikeFilter();
  spawnFloatingText(currentLane, '🔥 FEVER MODE!', '#ff4500');
  flashDamage('rgba(255,150,0,0.15)');
}

function deactivateFever() {
  feverActive = false;
  feverWrap.classList.add('hidden');
  gameEl.classList.remove('fever-mode');
  speedLines.classList.remove('active');
  refreshBikeFilter();
  combo = 0; updateComboBar();
}

function activateGhost() {
  ghostActive = true;
  gameEl.classList.add('ghost-mode');
  refreshBikeFilter();
  clearTimeout(ghostTimer);
  ghostAnnounce.classList.remove('hidden');
  ghostAnnounce.classList.add('ghost-pop');
  setTimeout(() => { ghostAnnounce.classList.add('hidden'); ghostAnnounce.classList.remove('ghost-pop'); }, 1100);
  flashDamage('rgba(170,170,255,0.08)');
  ghostTimer = setTimeout(() => {
    ghostActive = false;
    gameEl.classList.remove('ghost-mode');
    refreshBikeFilter();
  }, GHOST_DURATION);
}

function activateScoreMultiplier(amount) {
  scoreMultiplier = amount;
  scoreMultiplierEl.textContent = `x${amount}`;
  scoreMultiplierEl.classList.remove('hidden');
  multiplierAnnounce.textContent = `x${amount} SCORE!`;
  multiplierAnnounce.classList.remove('hidden');
  multiplierAnnounce.classList.add('mult-pop');
  setTimeout(() => { multiplierAnnounce.classList.add('hidden'); multiplierAnnounce.classList.remove('mult-pop'); }, 900);
  clearTimeout(multiplierTimer);
  multiplierTimer = setTimeout(() => { scoreMultiplier = 1; scoreMultiplierEl.classList.add('hidden'); }, 8000);
}

function checkCollision(obj, w, h) {
  const bikeLeft = LANES[currentLane];
  const bikeTop  = GAME_H - 22 - BIKE_H;
  const objLeft  = LANES[obj.lane] + (OBS_W - w) / 2;
  const pad = 9;
  return (
    bikeLeft + pad < objLeft + w - pad &&
    bikeLeft + BIKE_W - pad > objLeft + pad &&
    bikeTop  + pad < obj.top + h - pad &&
    bikeTop  + BIKE_H - pad > obj.top + pad
  );
}

function addScore(obs) {
  const gained = scoreMultiplier;
  score += gained;
  combo++;
  dodgeCount++;
  feverCombo = Math.min(feverCombo + 1, FEVER_MAX);
  nitroCharge = Math.min(nitroCharge + NITRO_CHARGE, NITRO_MAX);
  heatLevel = Math.min(heatLevel + 1.5, HEAT_MAX);
  if (combo > bestCombo) bestCombo = combo;
  scoreEl.textContent = score;
  popEl(scoreEl);
  spawnScoreRing(obs);

  if (feverActive) {
    if (score % 3 === 0) { score += 2 * scoreMultiplier; scoreEl.textContent = score; }
    spawnFloatingText(obs.lane, gained > 1 ? `+${gained * 2} FEVER!` : '+2 FEVER', '#ffd700');
  } else if (overclockActive) {
    score += scoreMultiplier; scoreEl.textContent = score;
    spawnFloatingText(obs.lane, `+${gained * 2} OC!`, '#ff4400');
  } else {
    spawnFloatingText(obs.lane, gained > 1 ? `+${gained}!` : '+1', '#00e5ff');
  }

  updateComboBar();
  if (!feverActive && feverCombo >= FEVER_MAX) activateFever();

  if (combo > 0 && combo % 5 === 0) {
    score += 2 * scoreMultiplier; scoreEl.textContent = score;
    spawnFloatingText(obs.lane, `COMBO x${combo}! +${2 * scoreMultiplier}`, '#ffd700');
    flashDamage('rgba(255,215,0,0.08)');
    nitroCharge = Math.min(nitroCharge + 10, NITRO_MAX);
    if (combo === 15) activateScoreMultiplier(2);
    if (combo === 30) activateScoreMultiplier(3);
    if (combo === 50) activateScoreMultiplier(5);
  }

  if (zone >= BOSS_SPAWN_ZONE && !bossActive && !bossDefeated && score % 40 === 0) {
    setTimeout(spawnBoss, 500);
  }

  if (score > 0 && score % 60 === 0 && !rivalActive) {
    setTimeout(spawnRival, 1000);
  }

  const newZone = Math.min(Math.floor(score / 25) + 1, ZONE_THEMES.length);
  if (newZone !== zone) { zone = newZone; bossDefeated = false; triggerZoneChange(); }

  if (score % 5 === 0) {
    speed = Math.min(BASE_SPD + Math.floor(score / 5) * 1.0, 18);
    spawnInterval = Math.max(38, 90 - score * 1.4);
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
  weatherType = theme.weather;

  zoneNumber.textContent = `ZONE ${zone}`;
  zoneName.textContent   = theme.name;
  zoneSub.textContent    = theme.sub || '';
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
  if (combo >= 5) { comboFill.classList.add('hot'); comboWrap.classList.add('active'); }
  else if (combo > 0) { comboFill.classList.remove('hot'); comboWrap.classList.add('active'); }
  else { comboFill.classList.remove('hot'); comboWrap.classList.remove('active'); }
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
    case 'shield':    activateShield();          spawnFloatingText(pu.lane, '🛡️ SHIELD!',    '#00e5ff'); break;
    case 'boost':     activateBoost();           spawnFloatingText(pu.lane, '⚡ BOOST!',      '#ffd700'); break;
    case 'life':      gainLife();                spawnFloatingText(pu.lane, '💜 +1 LIFE',    '#ff80aa'); break;
    case 'magnet':    activateMagnet();          spawnFloatingText(pu.lane, '🧲 MAGNET!',    '#bf5fff'); break;
    case 'nuke':      activateNuke();            spawnFloatingText(pu.lane, '💣 NUKE!',      '#ff4500'); break;
    case 'nitropack': collectNitroPack();        spawnFloatingText(pu.lane, '💨 NITRO +50!', '#00e5ff'); break;
    case 'ghost':     activateGhost();           spawnFloatingText(pu.lane, '👻 GHOST!',     '#aaaaff'); break;
    case 'overclock': if (!overclockActive) { heatLevel = HEAT_MAX; triggerOverclock(); } spawnFloatingText(pu.lane, '🔴 OVERCLOCK!', '#ff0000'); break;
    case 'emp':       activateNukeEMP();         spawnFloatingText(pu.lane, '📡 EMP FIELD!', '#00ff88'); break;
  }
}

function activateNukeEMP() {
  obstacles.forEach(o => {
    o.el.style.filter = 'brightness(3) saturate(0)';
    setTimeout(() => o.el.remove(), 400);
    spawnCrashParticles(LANES[o.lane] + OBS_W / 2, o.top + OBS_H / 2, ['#00ff88','#88ffcc','#fff']);
  });
  obstacles = [];
  score += 5 * scoreMultiplier; scoreEl.textContent = score;
  flashDamage('rgba(0,255,136,0.2)');
  triggerScreenShake();
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
    ghost:     ['#aaaaff','#ffffff','#8888ff'],
    overclock: ['#ff0000','#ff6600','#ff4400'],
    emp:       ['#00ff88','#88ffcc','#ffffff'],
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
    score += count * scoreMultiplier; scoreEl.textContent = score;
    spawnFloatingText(currentLane, `💣 x${count} CLEARED! +${count * scoreMultiplier}`, '#ff4500');
    popEl(scoreEl);
  }
  if (bossActive && bossEl) { hitBoss(); hitBoss(); }
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
  heatLevel   = Math.max(0, heatLevel - 30);
  scoreMultiplier = 1;
  scoreMultiplierEl.classList.add('hidden');
  clearTimeout(multiplierTimer);
  if (nitroActive) deactivateNitro();
  if (overclockActive) { overclockActive = false; gameEl.classList.remove('overclock-mode'); clearTimeout(overclockTimer); }
  if (slipstreamActive) deactivateSlipstream();
  updateNitroBar();
  if (lives <= 0) triggerGameOver();
  else {
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
  const settings = Storage.getSettings();
  if (!settings.screenshake) return;
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
  if (overclockActive) ring.style.borderColor = '#ff4400';
  else if (nitroActive) ring.style.borderColor = '#00e5ff';
  else if (ghostActive) ring.style.borderColor = '#aaaaff';
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
  el.style.top   = (GAME_H - 130 - Math.random() * 30) + 'px';
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

function togglePause() {
  if (!gameRunning) return;
  if (gamePaused) resumeGame();
  else pauseGame();
}

function pauseGame() {
  if (!gameRunning || gamePaused) return;
  gamePaused = true;
  cancelAnimationFrame(frameId);
  sessionPlaytime += (Date.now() - gameStartTime) / 1000;
  pauseScore.textContent = score;
  pauseZone.textContent  = zone;
  pauseCombo.textContent = 'x' + combo;
  pauseScreen.classList.remove('hidden');
}

function resumeGame() {
  if (!gamePaused) return;
  gamePaused = false;
  gameStartTime = Date.now();
  pauseScreen.classList.add('hidden');
  frameId = requestAnimationFrame(gameLoop);
}

function gameLoop() {
  if (!gameRunning || gamePaused) return;

  const effectiveSpeed = nitroActive ? speed * 1.8 : overclockActive ? speed * 2.2 : feverActive ? speed * 1.55 : slipstreamActive ? speed * 1.4 : speed;
  roadOffset += effectiveSpeed;
  drawRoad();
  drawEffects();

  spawnTimer++;
  if (spawnTimer >= spawnInterval && obstacles.length < MAX_OBS) { spawnTimer = 0; spawnObstacle(); }
  powerupTimer++;
  if (powerupTimer >= powerupInterval) { powerupTimer = 0; spawnPowerup(); }
  coinTimer++;
  if (coinTimer >= coinInterval) { coinTimer = 0; spawnCoin(); }
  hazardTimer++;
  if (hazardTimer >= hazardInterval) { hazardTimer = 0; spawnHazard(); }
  trailTickCount++;
  if (trailTickCount % 3 === 0) spawnTrail();
  if (trailTickCount % 2 === 0) recordGhostFrame();

  updateObstacles();
  updatePowerups();
  updateCoins();
  updateHazards();
  updateFever();
  updateNitro();
  updateHeat();
  updateBoss();
  updateRival();
  updateMarkers();
  syncShieldPosition();
  syncMagnetPosition();
  drawWeatherInGame();

  frameId = requestAnimationFrame(gameLoop);
}

function moveLane(dir) {
  if (!gameRunning || gamePaused) return;
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

  if (bossActive && bossLane === currentLane) hitBoss();
}

function tapLane(dir) { moveLane(dir); }

function popEl(el) {
  el.classList.remove('pop');
  void el.offsetWidth;
  el.classList.add('pop');
  setTimeout(() => el.classList.remove('pop'), 320);
}

function loadStartScreenStats() {
  startBestVal.textContent    = Storage.getBestScore();
  startTotalCoins.textContent = Storage.getTotalCoins();
  startTotalRuns.textContent  = Storage.getTotalRuns();
  startBestDrift.textContent  = Storage.getBestDrift();
  bestEl.textContent          = Storage.getBestScore();
}

function startGame() {
  if (gameRunning) return;
  obstacles.forEach(o => o.el.remove());
  powerups.forEach(p => p.el.remove());
  coins.forEach(c => c.el.remove());
  hazards.forEach(h => h.el.remove());
  obstacles = []; powerups = []; coins = []; hazards = [];
  if (rivalEl) { rivalEl.remove(); rivalEl = null; }
  if (bossEl)  { bossEl.remove();  bossEl  = null; }

  score = 0; speed = BASE_SPD;
  spawnTimer = 0; powerupTimer = 0; coinTimer = 0; hazardTimer = 0;
  spawnInterval = 90; currentLane = 2; lives = MAX_LIVES;
  combo = 0; bestCombo = 0; zone = 1;
  feverCombo = 0; feverActive = false;
  shieldActive = false; magnetActive = false;
  ghostActive = false; invulnerable = false;
  markerY = -40; sessionCoins = 0; trailTickCount = 0; roadOffset = 0;
  nitroCharge = 0; nitroActive = false; driftCount = 0; driftCombo = 0;
  lastLane = 2; nearMissCount = 0; scoreMultiplier = 1;
  gamePaused = false; lightningTimer = 0; dodgeCount = 0;
  heatLevel = 0; maxHeatReached = 0; overclockActive = false;
  slipstreamCharge = 0; slipstreamActive = false; bestSlipstream = 0;
  bossActive = false; bossHp = 5; bossDefeated = false; bossPhase = 0;
  rivalActive = false; ghostPlaybackActive = false; ghostPlaybackIdx = 0;
  ghostFrames = []; spinActive = false; empActive = false;
  fogIntensity = 0; targetFogIntensity = 0; weatherType = 'clear';
  sessionPlaytime = 0; gameStartTime = Date.now();

  bikeEl.style.opacity = '1';
  bikeEl.style.filter  = '';
  bikeEl.classList.remove('ghost-mode-bike');
  gameEl.style.filter  = '';
  gameEl.style.background = ZONE_THEMES[0].bg;
  gameEl.classList.remove('fever-mode', 'ghost-mode', 'overclock-mode', 'spin-mode');
  speedLines.classList.remove('active');
  nitroLines.classList.remove('active');
  shieldBubble.classList.add('hidden');
  magnetField.classList.add('hidden');
  feverWrap.classList.add('hidden');
  scoreMultiplierEl.classList.add('hidden');
  pauseScreen.classList.add('hidden');
  markerLayer.innerHTML = '';
  particleLayer.innerHTML = '';
  floatingTextLayer.innerHTML = '';
  trailLayer.innerHTML = '';
  ghostLayer.innerHTML = '';
  bossLayer.innerHTML  = '';
  hazardLayer.innerHTML = '';
  zoneAnnounce.classList.add('hidden');
  damageFlash.style.opacity = '0';
  if (bossAnnounce) bossAnnounce.classList.add('hidden');

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
  updateSlipstreamBar();
  if (heatFill) heatFill.style.width = '0%';
  if (heatWrap) { heatWrap.style.opacity = '0.3'; heatWrap.classList.remove('overclock'); }

  startScreen.classList.add('hidden');
  gameOverScreen.classList.add('hidden');

  gameRunning = true;
  frameId = requestAnimationFrame(gameLoop);
}

function restartGame() {
  gameRunning = false; gamePaused = false;
  cancelAnimationFrame(frameId);
  clearTimeout(shieldTimer); clearTimeout(magnetTimer); clearTimeout(invulnTimer);
  clearTimeout(driftTimer);  clearTimeout(ghostTimer);  clearTimeout(multiplierTimer);
  clearTimeout(overclockTimer); clearTimeout(slipstreamTimer); clearTimeout(empTimer);
  startGame();
}

function goToMenu() {
  gameRunning = false; gamePaused = false;
  cancelAnimationFrame(frameId);
  clearTimeout(shieldTimer); clearTimeout(magnetTimer); clearTimeout(invulnTimer);
  clearTimeout(driftTimer);  clearTimeout(ghostTimer);  clearTimeout(multiplierTimer);
  clearTimeout(overclockTimer); clearTimeout(slipstreamTimer); clearTimeout(empTimer);
  obstacles.forEach(o => o.el.remove()); powerups.forEach(p => p.el.remove());
  coins.forEach(c => c.el.remove()); hazards.forEach(h => h.el.remove());
  obstacles = []; powerups = []; coins = []; hazards = [];
  if (rivalEl) { rivalEl.remove(); rivalEl = null; }
  if (bossEl)  { bossEl.remove();  bossEl  = null; }
  ghostLayer.innerHTML = ''; bossLayer.innerHTML = ''; hazardLayer.innerHTML = '';
  gameOverScreen.classList.add('hidden');
  pauseScreen.classList.add('hidden');
  loadStartScreenStats();
  startScreen.classList.remove('hidden');
}

function renderLeaderboard(lb, currentScore) {
  lbListEl.innerHTML = '';
  if (!lb || lb.length === 0) {
    lbListEl.innerHTML = '<div style="text-align:center;font-size:8px;color:rgba(255,255,255,0.2);padding:4px">NO RUNS YET</div>';
    return;
  }
  lb.slice(0, 5).forEach((entry, idx) => {
    const div = document.createElement('div');
    div.className = 'lb-entry';
    const rankClasses = ['gold', 'silver', 'bronze'];
    const rankSymbols = ['🥇', '🥈', '🥉'];
    const rankClass = rankClasses[idx] || '';
    const rankSymbol = rankSymbols[idx] || `#${idx + 1}`;
    const isCurrent = entry.score === currentScore && idx === lb.findIndex(e => e.score === currentScore);
    const date = new Date(entry.date);
    const dateStr = `${date.getMonth()+1}/${date.getDate()}`;
    div.innerHTML = `
      <span class="lb-rank ${rankClass}">${rankSymbol}</span>
      <span class="lb-score ${isCurrent ? 'current' : ''}">${entry.score}</span>
      <span class="lb-meta">Z${entry.zone} C${entry.combo}x</span>
      <span class="lb-zone">${dateStr}</span>
    `;
    lbListEl.appendChild(div);
  });
}

function triggerGameOver() {
  gameRunning = false; gamePaused = false;
  cancelAnimationFrame(frameId);
  clearTimeout(shieldTimer); clearTimeout(magnetTimer); clearTimeout(invulnTimer);
  clearTimeout(driftTimer);  clearTimeout(ghostTimer);  clearTimeout(multiplierTimer);
  clearTimeout(overclockTimer); clearTimeout(slipstreamTimer); clearTimeout(empTimer);

  speedLines.classList.remove('active');
  nitroLines.classList.remove('active');
  spawnCrashParticles(LANES[currentLane] + BIKE_W / 2, GAME_H - 22 - BIKE_H / 2, null);
  flashDamage('rgba(255,0,0,0.5)');

  sessionPlaytime += (Date.now() - gameStartTime) / 1000;

  const { newRecords, leaderboard } = Storage.saveRun({
    score,
    coins:       sessionCoins,
    combo:       bestCombo,
    drift:       driftCount,
    zone,
    nearMisses:  nearMissCount,
    dodges:      dodgeCount,
    playtime:    sessionPlaytime,
    slipstream:  bestSlipstream,
    maxHeat:     maxHeatReached,
    ghostFrames: ghostFrames,
  });

  const savedBest = Storage.getBestScore();
  bestEl.textContent    = savedBest;
  goScoreEl.textContent = score;
  goBestEl.textContent  = savedBest;
  goComboEl.textContent = bestCombo + 'x';
  goCoinsEl.textContent = sessionCoins;
  goDriftEl.textContent = driftCount;
  goZoneEl.textContent  = zone;

  let anyRecord = false;
  recBestEl.classList.add('hidden');
  recComboEl.classList.add('hidden');
  recDriftEl.classList.add('hidden');
  if (recSlipEl) recSlipEl.classList.add('hidden');

  if (newRecords.bestScore)     { recBestEl.classList.remove('hidden');  anyRecord = true; }
  if (newRecords.bestCombo)     { recComboEl.classList.remove('hidden'); anyRecord = true; }
  if (newRecords.bestDrift)     { recDriftEl.classList.remove('hidden'); anyRecord = true; }
  if (newRecords.bestSlipstream && recSlipEl) { recSlipEl.classList.remove('hidden'); anyRecord = true; }

  if (anyRecord) goRecordsEl.classList.remove('hidden');
  else goRecordsEl.classList.add('hidden');

  renderLeaderboard(leaderboard, score);

  gameOverScreen.classList.remove('hidden', 'crash-flash');
  void gameOverScreen.offsetWidth;
  gameOverScreen.classList.add('crash-flash');
}

document.getElementById('pauseBtn').addEventListener('click', togglePause);
document.getElementById('btnStart').addEventListener('click', startGame);
document.getElementById('btnRetry').addEventListener('click', restartGame);
document.getElementById('btnMenu').addEventListener('click', goToMenu);
document.getElementById('btnResume').addEventListener('click', resumeGame);
document.getElementById('btnQuit').addEventListener('click', goToMenu);
document.getElementById('tapLeft').addEventListener('touchstart', () => tapLane(-2), { passive: true });
document.getElementById('tapLeft').addEventListener('mousedown', () => tapLane(-2));
document.getElementById('tapLeftOne').addEventListener('touchstart', () => tapLane(-1), { passive: true });
document.getElementById('tapLeftOne').addEventListener('mousedown', () => tapLane(-1));
document.getElementById('tapRightOne').addEventListener('touchstart', () => tapLane(1), { passive: true });
document.getElementById('tapRightOne').addEventListener('mousedown', () => tapLane(1));
document.getElementById('tapRight').addEventListener('touchstart', () => tapLane(2), { passive: true });
document.getElementById('tapRight').addEventListener('mousedown', () => tapLane(2));
document.getElementById('nitroBtn').addEventListener('touchstart', activateNitro, { passive: true });
document.getElementById('nitroBtn').addEventListener('mousedown', activateNitro);

document.addEventListener('keydown', e => {
  if (!gameRunning || gamePaused) {
    if (e.key === 'Enter' || e.key === ' ') {
      if (!startScreen.classList.contains('hidden'))         startGame();
      else if (!gameOverScreen.classList.contains('hidden')) restartGame();
      else if (!pauseScreen.classList.contains('hidden'))    resumeGame();
    }
    if (e.key === 'p' || e.key === 'P') { if (!pauseScreen.classList.contains('hidden')) resumeGame(); }
    return;
  }
  if (e.key === 'ArrowLeft'  || e.key === 'a' || e.key === 'A') { moveLane(e.shiftKey ? -2 : -1); e.preventDefault(); }
  if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') { moveLane(e.shiftKey ? 2 : 1);  e.preventDefault(); }
  if (e.key === ' ' && !nitroKeyHeld) { activateNitro(); e.preventDefault(); }
  if (e.key === 'p' || e.key === 'P') { togglePause(); e.preventDefault(); }
});

document.addEventListener('keyup', e => { if (e.key === ' ') { nitroKeyHeld = false; } });

let touchStartX = 0, touchStartY = 0, touchStartTime = 0;
document.addEventListener('touchstart', e => {
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
  touchStartTime = Date.now();
}, { passive: true });

document.addEventListener('touchend', e => {
  if (!gameRunning || gamePaused) return;
  const dx = e.changedTouches[0].clientX - touchStartX;
  const dy = e.changedTouches[0].clientY - touchStartY;
  const dt = Date.now() - touchStartTime;
  if (Math.abs(dx) < 28 || Math.abs(dy) > Math.abs(dx)) return;
  const fast = dt < 150;
  const laneMove = (Math.abs(dx) > 120 || fast) ? (dx < 0 ? -2 : 2) : (dx < 0 ? -1 : 1);
  moveLane(laneMove);
}, { passive: true });

function getCurrentTheme() {
  const settings = Storage.getSettings();
  return settings.theme || 'dark';
}

function setTheme(theme) {
  Storage.saveSetting('theme', theme);
  const body = document.body;
  const themeToggle = document.getElementById('themeToggle');
  if (theme === 'light') {
    body.classList.add('light-theme');
    if (themeToggle) themeToggle.querySelector('.theme-icon').textContent = '🌙';
  } else {
    body.classList.remove('light-theme');
    if (themeToggle) themeToggle.querySelector('.theme-icon').textContent = '☀️';
  }
}

function toggleTheme() {
  const current = getCurrentTheme();
  const newTheme = current === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
}

// Initialize theme on load
const initialTheme = getCurrentTheme();
setTheme(initialTheme);
document.getElementById('themeToggle').addEventListener('click', toggleTheme);

// Initialize bike position
bikeEl.style.left = LANES[2] + 'px';

// Load initial UI
loadStartScreenStats();
updateLivesDisplay();
updateComboBar();
updateNitroBar();

// Initialize visual components
initRain();
initRoadCanvas();
initBgCanvas();
initLogoCanvas();
drawRoad();