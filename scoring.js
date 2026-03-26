// scoring.js — GeoWire Recession Probability Model v1
// Simple weighted composite. Upgrade to Bayesian in v2.

const RecessionModel = (() => {

  function calcProbability(factorScores) {
    let weighted = 0;
    let totalWeight = 0;
    const contributions = [];

    for (const [key, factor] of Object.entries(factorScores)) {
      const contribution = factor.score * factor.weight;
      weighted += contribution;
      totalWeight += factor.weight;
      contributions.push({ factor: key, contribution, score: factor.score, weight: factor.weight });
    }

    // Normalize if weights don't sum to 1
    const probability = totalWeight > 0 ? Math.round(weighted / totalWeight) : 50;

    // Top 3 drivers by weighted contribution
    contributions.sort((a, b) => b.contribution - a.contribution);
    const topDrivers = contributions.slice(0, 3).map(c => c.factor);

    return { probability, topDrivers, contributions };
  }

  function getMomentum(currentProb, previousProb) {
    if (previousProb === null || previousProb === undefined) return 'STABLE';
    const delta = currentProb - previousProb;
    if (delta >= 2) return 'RISING';
    if (delta <= -2) return 'FALLING';
    return 'STABLE';
  }

  function getConfidence(factorScores) {
    const statuses = Object.values(factorScores).map(f => f.status);
    const deteriorating = statuses.filter(s => s === 'DETERIORATING' || s === 'STRESS').length;
    const improving = statuses.filter(s => s === 'IMPROVING').length;

    if (deteriorating >= 7 || improving >= 7) return 'HIGH';
    if (deteriorating >= 5 || improving >= 5) return 'MEDIUM';
    return 'LOW';
  }

  function getStatusColor(status) {
    const colors = {
      'IMPROVING':     '#2D6A4F',
      'STABLE':        '#F59E0B',
      'ELEVATED':      '#EA580C',
      'DETERIORATING': '#EA580C',
      'STRESS':        '#E63946',
    };
    return colors[status] || '#94A3B8';
  }

  function getStatusClass(status) {
    const classes = {
      'IMPROVING':     'status-improving',
      'STABLE':        'status-stable',
      'ELEVATED':      'status-elevated',
      'DETERIORATING': 'status-deteriorating',
      'STRESS':        'status-stress',
    };
    return classes[status] || 'status-stable';
  }

  function formatFactorName(key) {
    const names = {
      ratesLiquidity:   'Rates & Liquidity',
      inflation:        'Inflation',
      laborMarket:      'Labor Market',
      consumerHealth:   'Consumer Health',
      corporateCredit:  'Corporate & Credit',
      housing:          'Housing',
      supplyLogistics:  'Supply & Logistics',
      globalSpillovers: 'Global Spillovers',
      marketSignals:    'Market Signals',
      outsideBox:       'Alternative Signals',
    };
    return names[key] || key;
  }

  return { calcProbability, getMomentum, getConfidence, getStatusColor, getStatusClass, formatFactorName };
})();

if (typeof window !== 'undefined') window.RecessionModel = RecessionModel;
if (typeof module !== 'undefined') module.exports = RecessionModel;
