const Storage = (() => {
  const KEYS = {
    BEST_SCORE:     'mr_best_score',
    TOTAL_COINS:    'mr_total_coins',
    TOTAL_RUNS:     'mr_total_runs',
    BEST_COMBO:     'mr_best_combo',
    BEST_DRIFT:     'mr_best_drift',
    BEST_ZONE:      'mr_best_zone',
    LEADERBOARD:    'mr_leaderboard',
    SETTINGS:       'mr_settings',
    TOTAL_DODGES:   'mr_total_dodges',
    NEAR_MISSES:    'mr_near_misses',
    GHOST_RUN:      'mr_ghost_run',
    BEST_SLIPSTREAM:'mr_best_slipstream',
    TOTAL_PLAYTIME: 'mr_total_playtime',
    UNLOCKS:        'mr_unlocks',
    HEAT_RECORD:    'mr_heat_record',
    ACHIEVEMENTS:   'mr_achievements',
    TOTAL_BOSSES:   'mr_total_bosses',
    TOTAL_WARPS:    'mr_total_warps',
  };

  function get(key, fallback = 0) {
    try {
      const v = localStorage.getItem(key);
      return v !== null ? JSON.parse(v) : fallback;
    } catch { return fallback; }
  }

  function set(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
  }

  function getBestScore()      { return get(KEYS.BEST_SCORE, 0); }
  function getTotalCoins()     { return get(KEYS.TOTAL_COINS, 0); }
  function getTotalRuns()      { return get(KEYS.TOTAL_RUNS, 0); }
  function getBestCombo()      { return get(KEYS.BEST_COMBO, 0); }
  function getBestDrift()      { return get(KEYS.BEST_DRIFT, 0); }
  function getBestZone()       { return get(KEYS.BEST_ZONE, 1); }
  function getTotalDodges()    { return get(KEYS.TOTAL_DODGES, 0); }
  function getNearMisses()     { return get(KEYS.NEAR_MISSES, 0); }
  function getBestSlipstream() { return get(KEYS.BEST_SLIPSTREAM, 0); }
  function getTotalPlaytime()  { return get(KEYS.TOTAL_PLAYTIME, 0); }
  function getHeatRecord()     { return get(KEYS.HEAT_RECORD, 0); }
  function getLeaderboard()    { return get(KEYS.LEADERBOARD, []); }
  function getUnlocks()        { return get(KEYS.UNLOCKS, { trailColors: ['default'], bikeVariants: ['default'] }); }
  function getAchievements()   { return get(KEYS.ACHIEVEMENTS, []); }
  function getTotalBosses()    { return get(KEYS.TOTAL_BOSSES, 0); }
  function getTotalWarps()     { return get(KEYS.TOTAL_WARPS, 0); }

  function getGhostRun()    { return get(KEYS.GHOST_RUN, null); }

  function saveGhostRun(frames) {
    try {
      const slim = frames.filter((_, i) => i % 2 === 0).slice(0, 1200);
      set(KEYS.GHOST_RUN, slim);
    } catch {}
  }

  function unlockAchievement(id) {
    const list = getAchievements();
    if (list.includes(id)) return false;
    list.push(id);
    set(KEYS.ACHIEVEMENTS, list);
    return true;
  }

  function hasAchievement(id) {
    return getAchievements().includes(id);
  }

  function saveRun(runData) {
    const { score, coins, combo, drift, zone, nearMisses, dodges, playtime, slipstream, maxHeat, ghostFrames, bossesDefeated, warpsUsed } = runData;
    const newRecords = {};

    if (score > getBestScore()) { set(KEYS.BEST_SCORE, score); newRecords.bestScore = true; }
    if (combo > getBestCombo()) { set(KEYS.BEST_COMBO, combo); newRecords.bestCombo = true; }
    if (drift > getBestDrift()) { set(KEYS.BEST_DRIFT, drift); newRecords.bestDrift = true; }
    if (zone  > getBestZone())  { set(KEYS.BEST_ZONE, zone); }
    if (slipstream > getBestSlipstream()) { set(KEYS.BEST_SLIPSTREAM, slipstream); newRecords.bestSlipstream = true; }
    if (maxHeat > getHeatRecord()) { set(KEYS.HEAT_RECORD, maxHeat); newRecords.heatRecord = true; }

    set(KEYS.TOTAL_COINS,    getTotalCoins()   + coins);
    set(KEYS.TOTAL_RUNS,     getTotalRuns()    + 1);
    set(KEYS.TOTAL_DODGES,   getTotalDodges()  + (dodges || 0));
    set(KEYS.NEAR_MISSES,    getNearMisses()   + (nearMisses || 0));
    set(KEYS.TOTAL_PLAYTIME, getTotalPlaytime() + (playtime || 0));
    set(KEYS.TOTAL_BOSSES,   getTotalBosses()  + (bossesDefeated || 0));
    set(KEYS.TOTAL_WARPS,    getTotalWarps()   + (warpsUsed || 0));

    if (ghostFrames && newRecords.bestScore) saveGhostRun(ghostFrames);

    const lb = getLeaderboard();
    lb.push({ score, coins, combo, drift, zone, date: Date.now(), slipstream: slipstream || 0 });
    lb.sort((a, b) => b.score - a.score);
    const top10 = lb.slice(0, 10);
    set(KEYS.LEADERBOARD, top10);

    checkUnlocks(score, combo, drift, zone);

    return { newRecords, leaderboard: top10 };
  }

  function checkUnlocks(score, combo, drift, zone) {
    const u = getUnlocks();
    let changed = false;
    if (score >= 100 && !u.trailColors.includes('gold'))     { u.trailColors.push('gold'); changed = true; }
    if (score >= 200 && !u.trailColors.includes('plasma'))   { u.trailColors.push('plasma'); changed = true; }
    if (zone  >= 5   && !u.bikeVariants.includes('stealth')) { u.bikeVariants.push('stealth'); changed = true; }
    if (zone  >= 8   && !u.bikeVariants.includes('void'))    { u.bikeVariants.push('void'); changed = true; }
    if (combo >= 20  && !u.trailColors.includes('rainbow'))  { u.trailColors.push('rainbow'); changed = true; }
    if (changed) set(KEYS.UNLOCKS, u);
    return changed ? u : null;
  }

  function getRank(score) {
    const lb = getLeaderboard();
    const idx = lb.findIndex(e => e.score === score);
    return idx === -1 ? lb.length + 1 : idx + 1;
  }

  function getSettings() {
    return get(KEYS.SETTINGS, { sfx: true, screenshake: true, trailColor: 'default', bikeVariant: 'default', theme: 'dark' });
  }

  function saveSetting(key, value) {
    const s = getSettings();
    s[key] = value;
    set(KEYS.SETTINGS, s);
  }

  function resetAll() {
    Object.values(KEYS).forEach(k => localStorage.removeItem(k));
  }

  return {
    getBestScore, getTotalCoins, getTotalRuns, getBestCombo,
    getBestDrift, getBestZone, getLeaderboard, saveRun, getRank,
    getTotalDodges, getNearMisses, getBestSlipstream, getTotalPlaytime,
    getGhostRun, saveGhostRun, getHeatRecord, getUnlocks,
    getSettings, saveSetting, resetAll,
    getAchievements, unlockAchievement, hasAchievement,
    getTotalBosses, getTotalWarps,
  };
})();