# 🏍 MotoRush — Street Legend Edition

A fast-paced, feature-rich browser-based motorcycle dodging game with combos, power-ups, boss fights, rival ghosts, weather systems, and 8 unique zones.

---

## 🎮 Gameplay

Ride through 8 increasingly dangerous zones, dodging traffic, collecting coins, chaining combos, and surviving boss encounters. Speed climbs as your score grows — how far can you go?

### Core Mechanics

- **Dodge** obstacles to score points and build combo chains
- **Near Miss** — pass within inches of an obstacle for bonus points and nitro charge
- **Slipstream** — tail an obstacle closely to build the slipstream meter, then burst ahead
- **Overclock** — fill the HEAT bar to trigger a temporary rampage mode
- **Nitro** — charge and release for a high-speed boost that smashes obstacles
- **Boss Fights** — starting from Zone 4, bosses spawn and must be rammed in their lane to defeat
- **Rival Ghost** — race against a ghost replay of your best run

---

## 🕹️ Controls

| Action | Keyboard | Mobile |
|---|---|---|
| Move left (1 lane) | `←` or `A` | Tap `◀` button or swipe left |
| Move right (1 lane) | `→` or `D` | Tap `▶` button or swipe right |
| Move left (2 lanes / drift) | `Shift + ←` | Tap `◀◀` button |
| Move right (2 lanes / drift) | `Shift + →` | Tap `▶▶` button |
| Activate Nitro | `Space` | Tap NITRO button |
| Pause / Resume | `P` | Tap ⏸ button |

---

## ⚡ Power-ups

| Icon | Name | Effect |
|---|---|---|
| 🛡️ | Shield | Absorbs one hit |
| ⚡ | Boost | Temporarily slows obstacles and widens spawn intervals |
| 💜 | Extra Life | Restores one life (max 3) |
| 🧲 | Magnet | Pulls coins toward the bike |
| 💣 | Nuke | Clears all obstacles on screen |
| 💨 | Nitro Pack | Adds +50 to the nitro bar |
| 👻 | Ghost | Brief invincibility — pass through obstacles |
| 🔴 | Overclock | Instantly fills the HEAT bar and triggers Overclock mode |
| 📡 | EMP Field | Clears all obstacles and disables enemy EMP traps |

---

## 🛢 Hazards

| Icon | Type | Effect |
|---|---|---|
| 🛢 | Oil Slick | Forces a lane-spinning wipeout |
| ▬ | Speed Bump | Temporarily halves your speed |
| 📡 | EMP | Drains nitro and disables active power-ups |
| 🔥 | Fire | Instant damage |

---

## 🌊 Zones

Each zone has a unique visual theme, color palette, weather condition, and fog intensity. Speed and obstacle density increase with every zone.

| Zone | Name | Sub-title | Weather |
|---|---|---|---|
| 1 | CITY | Neon Streets | Clear |
| 2 | DESERT | Heat Mirage | Sandstorm |
| 3 | STORM | Thunder Road | Rain + Lightning |
| 4 | NEON | Electric Drift | Clear |
| 5 | ARCTIC | Black Ice | Snow |
| 6 | VOLCANIC | Magma Burn | Ash |
| 7 | CYBER | Data Stream | Clear |
| 8 | VOID | No Return | Void Rain |

Zones advance every 25 points. Bosses begin spawning from Zone 4 onwards.

---

## 🔥 Scoring System

| Event | Points |
|---|---|
| Dodge obstacle | +1 (×score multiplier) |
| Near Miss | +1 |
| Drift (2+ lanes) | +1–3 depending on drift combo |
| Combo ×5 milestone | +2 bonus |
| Fever Mode dodge | ×2 bonus per dodge |
| Overclock Mode dodge | ×2 bonus per dodge |
| Collect coin | +1–5 depending on active mode |
| Defeat boss | +20 |
| Boss escapes | +10 |

### Score Multipliers (activate at combo thresholds)

- **Combo ×15** → `x2` score multiplier for 8 seconds  
- **Combo ×30** → `x3` score multiplier for 8 seconds  
- **Combo ×50** → `x5` score multiplier for 8 seconds

---

## 🏆 Records & Leaderboard

The game tracks the following personal records using `localStorage`:

- Best Score
- Best Combo
- Best Drift Count
- Best Zone Reached
- Best Slipstream Activations
- Total Coins, Runs, Dodges, Near Misses, Playtime

A top-5 local leaderboard is shown on the Game Over screen. New records are highlighted immediately after a run.

---

## 🔓 Unlockables

| Condition | Unlock |
|---|---|
| Score ≥ 100 | Gold trail color |
| Score ≥ 200 | Plasma trail color |
| Combo ≥ 20 | Rainbow trail color |
| Reach Zone 5 | Stealth bike variant |
| Reach Zone 8 | Void bike variant |

---

## 🌙 Themes

Toggle between **Dark** and **Light** themes using the ☀️ button on the start screen. Both themes have fully adapted road palettes, UI colors, and fog styles for each zone.

---

## 🗂️ Project Structure

```
/
├── index.html
└── assets/
    ├── css/
    │   └── styles.css
    └── js/
        ├── storage.js          # localStorage persistence layer
        └── game/
            ├── dom-elements.js # DOM reference declarations
            ├── constants.js    # Game constants and zone/power-up configs
            ├── state.js        # Runtime state variables
            └── core.js         # Main game loop and all game logic
```

---

## 🚀 Running Locally

No build tools required. Just serve the files over HTTP:

```bash
# Using Python
python -m http.server 8080

# Using Node.js
npx serve .
```

Then open `http://localhost:8080` in your browser.

> Opening `index.html` directly as a `file://` URL may work for most features, but serving via HTTP is recommended for consistent behavior.

---

## 🛠️ Tech Stack

- Vanilla JavaScript (ES6+)
- HTML5 Canvas (road rendering, effects, rain, logo animation)
- CSS animations and transitions
- `localStorage` for persistence
- No frameworks, no dependencies, no build step

---

## 📄 License

MIT — feel free to fork, modify, and build on it.
