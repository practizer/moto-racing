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
