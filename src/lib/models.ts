export function projectOilPrice(params: {
  hormuzFlowPct: number;
  opecExtraSupply: number;
  ieaReleaseTotal: number;
  warWeeks: number;
  powerPlantStrikes: boolean;
  khargSeized: boolean;
  ceasefire: boolean;
}): number {
  const oilLoss = 20 * (1 - params.hormuzFlowPct / 100);
  const ieaDailyContrib = params.ieaReleaseTotal / (params.warWeeks * 7) / 1000;
  const netLoss = Math.max(0, oilLoss - params.opecExtraSupply - ieaDailyContrib);
  let multiplier = 1 + (netLoss / 105.17) * 8;
  if (params.powerPlantStrikes) multiplier *= 1.15;
  if (params.khargSeized) multiplier *= 1.08;
  if (params.ceasefire) multiplier *= 0.6;
  return Math.round(71 * multiplier);
}

export function calculateGDPImpact(oilPrice: number, warWeeks: number, country: string): number {
  const priceDelta = oilPrice - 71;
  const elasticities: Record<string, number> = {
    global: 0.015, US: 0.003, China: 0.006, India: 0.01,
    Japan: 0.008, EU: 0.005, Qatar: 0.05, UAE: 0.035,
    Kuwait: 0.038, Saudi: 0.025, Russia: -0.01,
  };
  const e = elasticities[country] || 0.015;
  return -(priceDelta / 10) * e * Math.sqrt(warWeeks / 4);
}

export function reserveRunway(totalReserves: number, dailyImports: number, hormuzFlowPct: number): number {
  const dailyShortfall = dailyImports * (1 - hormuzFlowPct / 100);
  return dailyShortfall > 0 ? Math.round(totalReserves / dailyShortfall) : 999;
}

export function regimeChangeProbability(params: {
  basijDegradedPct: number;
  internetRestored: boolean;
  powerPlantStrikes: boolean;
  warWeeks: number;
  economicCollapse: number;
  irgcFractures: boolean;
}) {
  let collapse = 5 + params.basijDegradedPct * 0.15 + (params.internetRestored ? 8 : 0) - (params.powerPlantStrikes ? 5 : 0);
  let uprising = 25 + params.basijDegradedPct * 0.25 + (params.internetRestored ? 12 : 0) - (params.powerPlantStrikes ? 20 : 0);
  let decay = 30 - params.basijDegradedPct * 0.05;
  let negotiate = 10 + (params.irgcFractures ? 15 : 0);
  let northKorea = 15 + (params.powerPlantStrikes ? 15 : 0) - params.basijDegradedPct * 0.1;
  const total = collapse + uprising + decay + negotiate + northKorea;
  return {
    collapse: Math.round((collapse / total) * 100),
    uprising: Math.round((uprising / total) * 100),
    decay: Math.round((decay / total) * 100),
    negotiate: Math.round((negotiate / total) * 100),
    northKorea: Math.round((northKorea / total) * 100),
  };
}

export function foodInflationProjection(hormuzFlowPct: number, oilPrice: number, warWeeks: number) {
  const fertLoss = (1 - hormuzFlowPct / 100) * 50;
  const foodInf = fertLoss * 0.4 + (oilPrice - 71) * 0.08;
  const famine = fertLoss > 60 && warWeeks > 8 ? 'CRITICAL' : fertLoss > 40 ? 'HIGH' : fertLoss > 20 ? 'MEDIUM' : 'LOW';
  return { fertilizerShortage: fertLoss, foodInflation: foodInf, famineRisk: famine };
}

export function usConsumerImpact(oilPrice: number) {
  const gasIncrease = (oilPrice - 71) * 0.025;
  const gasPrice = 3.18 + gasIncrease;
  const caGasPrice = gasPrice * 1.35;
  const dieselPrice = gasPrice * 1.25;
  const monthlyIncrease = Math.round(gasIncrease * 120);
  return {
    gasPrice: +gasPrice.toFixed(2),
    caGasPrice: +caGasPrice.toFixed(2),
    dieselPrice: +dieselPrice.toFixed(2),
    monthlyIncrease,
    annualIncrease: monthlyIncrease * 12,
  };
}
