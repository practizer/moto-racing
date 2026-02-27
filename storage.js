const Storage = (() => {
  const KEYS = {
    BEST_SCORE:   'mr_best_score',
    TOTAL_COINS:  'mr_total_coins',
    TOTAL_RUNS:   'mr_total_runs',
    BEST_COMBO:   'mr_best_combo',
    BEST_DRIFT:   'mr_best_drift',
    BEST_ZONE:    'mr_best_zone',
    LEADERBOARD:  'mr_leaderboard',
    SETTINGS:     'mr_settings',
    TOTAL_DODGES: 'mr_total_dodges',
    NEAR_MISSES:  'mr_near_misses',
  };

  function get(key, fallback = 0) {
    try {
      const v = localStorage.getItem(key);
      return v !== null ? JSON.parse(v) : fallback;
    } catch {
      return fallback;
    }
  }

  function set(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
  }

  function getBestScore()   { return get(KEYS.BEST_SCORE, 0); }
  function getTotalCoins()  { return get(KEYS.TOTAL_COINS, 0); }
  function getTotalRuns()   { return get(KEYS.TOTAL_RUNS, 0); }
  function getBestCombo()   { return get(KEYS.BEST_COMBO, 0); }
  function getBestDrift()   { return get(KEYS.BEST_DRIFT, 0); }
  function getBestZone()    { return get(KEYS.BEST_ZONE, 1); }
  function getTotalDodges() { return get(KEYS.TOTAL_DODGES, 0); }
  function getNearMisses()  { return get(KEYS.NEAR_MISSES, 0); }

  function getLeaderboard() { return get(KEYS.LEADERBOARD, []); }

  function saveRun(runData) {
    const { score, coins, combo, drift, zone, nearMisses, dodges } = runData;
    let newRecords = {};

    if (score > getBestScore()) {
      set(KEYS.BEST_SCORE, score);
      newRecords.bestScore = true;
    }
    if (combo > getBestCombo()) {
      set(KEYS.BEST_COMBO, combo);
      newRecords.bestCombo = true;
    }
    if (drift > getBestDrift()) {
      set(KEYS.BEST_DRIFT, drift);
      newRecords.bestDrift = true;
    }
    if (zone > getBestZone()) {
      set(KEYS.BEST_ZONE, zone);
    }

    set(KEYS.TOTAL_COINS, getTotalCoins() + coins);
    set(KEYS.TOTAL_RUNS, getTotalRuns() + 1);
    set(KEYS.TOTAL_DODGES, getTotalDodges() + (dodges || 0));
    set(KEYS.NEAR_MISSES, getNearMisses() + (nearMisses || 0));

    const lb = getLeaderboard();
    lb.push({ score, coins, combo, drift, zone, date: Date.now() });
    lb.sort((a, b) => b.score - a.score);
    const top10 = lb.slice(0, 10);
    set(KEYS.LEADERBOARD, top10);

    return { newRecords, leaderboard: top10 };
  }

  function getRank(score) {
    const lb = getLeaderboard();
    const idx = lb.findIndex(e => e.score === score);
    return idx === -1 ? lb.length + 1 : idx + 1;
  }

  function resetAll() {
    Object.values(KEYS).forEach(k => localStorage.removeItem(k));
  }

  return {
    getBestScore, getTotalCoins, getTotalRuns, getBestCombo,
    getBestDrift, getBestZone, getLeaderboard, saveRun, getRank,
    getTotalDodges, getNearMisses, resetAll,
  };
})();