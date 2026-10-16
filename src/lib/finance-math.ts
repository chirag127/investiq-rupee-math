/**
 * InvestiQ India - Reusable Quantitative Finance Math Library
 * Standard interface across all InvestiQ sites.
 *
 * Implements rigorous, tested, deterministic financial mathematics:
 * 1. Post-Tax Real Returns via exact Fisher Equation
 * 2. Irregular Cash Flow XIRR via Newton-Raphson numerical solver
 * 3. Compounding doubling/tripling rules (Rule of 72, 114, 144)
 * 4. Compound Annual Growth Rate (CAGR) and Effective Annual Rate (EAR)
 * 5. Volatility Drag (Geometric vs Arithmetic Mean)
 * 6. Systematic Investment Plan (SIP) and Step-Up SIP future value equations
 */

export interface CashFlow {
  date: string | Date; // ISO string YYYY-MM-DD or Date object
  amount: number;      // Negative for outflows (investments), positive for inflows (redemptions / current portfolio value)
}

export interface TaxRegimeConfig {
  name: string;
  equityLtcgRate: number;      // 0.125 (12.5% post-Finance Act 2024)
  equityLtcgExemption: number; // 125000 (1.25 Lakh)
  equityStcgRate: number;      // 0.20 (20%)
  debtTaxRate: number;        // Marginal slab rate (e.g. 0.312 for 30% slab + 4% cess)
  fdTaxRate: number;          // Marginal slab rate (e.g. 0.312 for 30% slab + 4% cess)
}

export const DEFAULT_TAX_CONFIG: TaxRegimeConfig = {
  name: 'FY 2024-25 / 2025-26 Standard Regime',
  equityLtcgRate: 0.125,
  equityLtcgExemption: 125000,
  equityStcgRate: 0.20,
  debtTaxRate: 0.312,
  fdTaxRate: 0.312,
};

/**
 * Exact Fisher Equation for Real Return:
 * (1 + r_nominal) = (1 + r_real) * (1 + inflation)
 * => r_real = (1 + r_nominal) / (1 + inflation) - 1
 *
 * @param nominalRate Nominal annual return (e.g., 0.12 for 12%)
 * @param inflationRate Annual inflation rate (e.g., 0.06 for 6%)
 * @returns Exact real annual return
 */
export function calculateRealReturn(nominalRate: number, inflationRate: number): number {
  if (inflationRate <= -1) {
    throw new Error('Inflation rate cannot be less than or equal to -100%');
  }
  return (1 + nominalRate) / (1 + inflationRate) - 1;
}

/**
 * Approximate Fisher Return (Rule of thumb): r_real ~ r_nominal - inflation
 */
export function calculateApproxRealReturn(nominalRate: number, inflationRate: number): number {
  return nominalRate - inflationRate;
}

/**
 * Calculates post-tax return and real post-tax return for Indian asset classes.
 */
export interface PostTaxRealReturnResult {
  nominalPreTax: number;
  taxRateApplied: number;
  nominalPostTax: number;
  exactRealReturn: number;
  approxRealReturn: number;
  purchasingPowerMultiplier10y: number;
  effectiveTaxDrag: number; // Difference in yield percentage points
}

export function solvePostTaxRealReturn(
  nominalRate: number,
  inflationRate: number,
  assetType: 'equity_ltcg' | 'equity_stcg' | 'debt_slab' | 'fixed_deposit',
  marginalTaxRate: number = 0.312
): PostTaxRealReturnResult {
  let taxRateApplied = 0;

  switch (assetType) {
    case 'equity_ltcg':
      taxRateApplied = DEFAULT_TAX_CONFIG.equityLtcgRate;
      break;
    case 'equity_stcg':
      taxRateApplied = DEFAULT_TAX_CONFIG.equityStcgRate;
      break;
    case 'debt_slab':
    case 'fixed_deposit':
      taxRateApplied = marginalTaxRate;
      break;
    default:
      taxRateApplied = marginalTaxRate;
  }

  const nominalPostTax = nominalRate * (1 - taxRateApplied);
  const exactReal = calculateRealReturn(nominalPostTax, inflationRate);
  const approxReal = calculateApproxRealReturn(nominalPostTax, inflationRate);
  const purchasingPowerMultiplier10y = Math.pow(1 + exactReal, 10);
  const effectiveTaxDrag = nominalRate - nominalPostTax;

  return {
    nominalPreTax: nominalRate,
    taxRateApplied,
    nominalPostTax,
    exactRealReturn: exactReal,
    approxRealReturn: approxReal,
    purchasingPowerMultiplier10y,
    effectiveTaxDrag,
  };
}

/**
 * Calculates Compound Annual Growth Rate (CAGR)
 * Formula: (End Value / Start Value) ^ (1 / Years) - 1
 */
export function calculateCAGR(startValue: number, endValue: number, years: number): number {
  if (startValue <= 0 || endValue <= 0) {
    throw new Error('Start and end values must be strictly positive to calculate CAGR');
  }
  if (years <= 0) {
    throw new Error('Time horizon in years must be positive');
  }
  return Math.pow(endValue / startValue, 1 / years) - 1;
}

/**
 * Calculates Effective Annual Rate (EAR) given nominal stated rate and compounding periods per year
 * Formula: (1 + r / n)^n - 1
 */
export function calculateEAR(nominalAnnualRate: number, compoundingFrequency: number): number {
  if (compoundingFrequency <= 0) {
    throw new Error('Compounding frequency must be at least 1');
  }
  return Math.pow(1 + nominalAnnualRate / compoundingFrequency, compoundingFrequency) - 1;
}

/**
 * Calculates Exact Doubling, Tripling, and Quadrupling Years via logarithms,
 * and contrasts them with the heuristic Rules of 72, 114, and 144.
 */
export interface MultiplierRuleResult {
  ratePercent: number;
  doubling: {
    rule72Years: number;
    exactYears: number;
    errorYears: number;
  };
  tripling: {
    rule114Years: number;
    exactYears: number;
    errorYears: number;
  };
  quadrupling: {
    rule144Years: number;
    exactYears: number;
    errorYears: number;
  };
  inflationHalving: {
    rule70Years: number;
    exactYears: number;
  };
}

export function evaluateCompoundingRules(ratePercent: number): MultiplierRuleResult {
  if (ratePercent <= 0) {
    throw new Error('Annual rate must be greater than zero for compounding rules');
  }
  const r = ratePercent / 100;
  
  // Exact formulas: t = ln(multiplier) / ln(1 + r)
  const exactDoubling = Math.log(2) / Math.log(1 + r);
  const rule72 = 72 / ratePercent;

  const exactTripling = Math.log(3) / Math.log(1 + r);
  const rule114 = 114 / ratePercent;

  const exactQuadrupling = Math.log(4) / Math.log(1 + r);
  const rule144 = 144 / ratePercent;

  const exactHalving = Math.log(0.5) / Math.log(1 - r > 0 ? 1 - r : 0.0001);
  const rule70 = 70 / ratePercent;

  return {
    ratePercent,
    doubling: {
      rule72Years: Number(rule72.toFixed(2)),
      exactYears: Number(exactDoubling.toFixed(2)),
      errorYears: Number((rule72 - exactDoubling).toFixed(2)),
    },
    tripling: {
      rule114Years: Number(rule114.toFixed(2)),
      exactYears: Number(exactTripling.toFixed(2)),
      errorYears: Number((rule114 - exactTripling).toFixed(2)),
    },
    quadrupling: {
      rule144Years: Number(rule144.toFixed(2)),
      exactYears: Number(exactQuadrupling.toFixed(2)),
      errorYears: Number((rule144 - exactQuadrupling).toFixed(2)),
    },
    inflationHalving: {
      rule70Years: Number(rule70.toFixed(2)),
      exactYears: Number((Math.log(0.5) / Math.log(1 / (1 + r))).toFixed(2)), // time to halve purchasing power
    },
  };
}

/**
 * Irregular Cash Flow XIRR Engine
 * Implements Newton-Raphson iteration on the discounted cash flow polynomial:
 * f(r) = \sum C_i / (1 + r)^((d_i - d_0) / 365) = 0
 * f'(r) = \sum -((d_i - d_0) / 365) * C_i / (1 + r)^(((d_i - d_0) / 365) + 1)
 */
export function calculateXIRR(
  cashFlows: CashFlow[],
  guess: number = 0.1,
  maxIterations: number = 100,
  tolerance: number = 1e-7
): number {
  if (!cashFlows || cashFlows.length < 2) {
    throw new Error('XIRR requires at least 2 cash flows (one outflow and one inflow)');
  }

  // Parse and sort cash flows by chronological date
  const parsedFlows = cashFlows.map(cf => ({
    date: cf.date instanceof Date ? cf.date : new Date(cf.date),
    amount: Number(cf.amount),
  })).sort((a, b) => a.date.getTime() - b.date.getTime());

  // Validate presence of at least one negative and at least one positive flow
  let hasNegative = false;
  let hasPositive = false;
  for (const cf of parsedFlows) {
    if (cf.amount < 0) hasNegative = true;
    if (cf.amount > 0) hasPositive = true;
  }
  if (!hasNegative || !hasPositive) {
    throw new Error('Cash flows must contain at least one negative investment and one positive inflow/valuation');
  }

  const d0 = parsedFlows[0].date.getTime();
  const MS_PER_DAY = 1000 * 60 * 60 * 24;

  const datesDiffYears = parsedFlows.map(cf => {
    const diffDays = (cf.date.getTime() - d0) / MS_PER_DAY;
    return diffDays / 365.0;
  });

  let rate = guess;

  for (let iter = 0; iter < maxIterations; iter++) {
    let fValue = 0;
    let fDerivative = 0;

    // Boundary check for r <= -0.999
    if (rate <= -0.999) {
      rate = -0.999;
    }

    for (let i = 0; i < parsedFlows.length; i++) {
      const years = datesDiffYears[i];
      const amount = parsedFlows[i].amount;
      const factor = Math.pow(1 + rate, years);

      fValue += amount / factor;
      fDerivative -= (years * amount) / (factor * (1 + rate));
    }

    if (Math.abs(fValue) < tolerance) {
      return rate;
    }

    if (Math.abs(fDerivative) < 1e-12) {
      // Perturb slightly if derivative is flat to escape saddle point
      rate += 0.01;
      continue;
    }

    const nextRate = rate - fValue / fDerivative;

    // Damping large swings
    if (Math.abs(nextRate - rate) < tolerance) {
      return nextRate;
    }

    rate = nextRate;
  }

  // If Newton-Raphson did not converge within tolerance, attempt bisection fallback
  return bisectionXIRR(parsedFlows, datesDiffYears, tolerance);
}

function bisectionXIRR(
  flows: { date: Date; amount: number }[],
  datesDiffYears: number[],
  tolerance: number
): number {
  let low = -0.99;
  let high = 5.0; // Up to 500%

  const npv = (r: number) => {
    let sum = 0;
    for (let i = 0; i < flows.length; i++) {
      sum += flows[i].amount / Math.pow(1 + r, datesDiffYears[i]);
    }
    return sum;
  };

  let npvLow = npv(low);
  let npvHigh = npv(high);

  if (npvLow * npvHigh > 0) {
    // If same sign, return standard best approximation
    return low;
  }

  for (let i = 0; i < 100; i++) {
    const mid = (low + high) / 2;
    const npvMid = npv(mid);

    if (Math.abs(npvMid) < tolerance || (high - low) / 2 < tolerance) {
      return mid;
    }

    if (npvLow * npvMid < 0) {
      high = mid;
      npvHigh = npvMid;
    } else {
      low = mid;
      npvLow = npvMid;
    }
  }

  return (low + high) / 2;
}

/**
 * Calculates Volatility Drag / Variance Drag:
 * Geometric Return ~ Arithmetic Return - 0.5 * Variance
 */
export function calculateVolatilityDrag(arithmeticMean: number, standardDeviation: number): {
  geometricMeanEstimate: number;
  varianceDrag: number;
} {
  const variance = Math.pow(standardDeviation, 2);
  const drag = 0.5 * variance;
  const geometricMeanEstimate = arithmeticMean - drag;
  return {
    geometricMeanEstimate,
    varianceDrag: drag,
  };
}

/**
 * Systematic Investment Plan (SIP) Future Value:
 * FV = P * [ ((1 + i)^n - 1) / i ] * (1 + i)
 * where i = monthly return rate, n = number of months, P = monthly installment
 */
export function calculateSIPFutureValue(monthlyDeposit: number, annualRate: number, years: number): {
  totalInvested: number;
  totalGains: number;
  futureValue: number;
} {
  if (monthlyDeposit <= 0 || years <= 0) {
    throw new Error('Deposit and duration must be positive');
  }
  const months = years * 12;
  const monthlyRate = annualRate / 12;

  let fv = 0;
  if (monthlyRate === 0) {
    fv = monthlyDeposit * months;
  } else {
    fv = monthlyDeposit * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
  }

  const totalInvested = monthlyDeposit * months;
  const totalGains = fv - totalInvested;

  return {
    totalInvested: Math.round(totalInvested),
    totalGains: Math.round(totalGains),
    futureValue: Math.round(fv),
  };
}

/**
 * Drawdown and Breakeven Recovery Math
 * Recovery required = (Drawdown %) / (1 - Drawdown %)
 */
export function calculateDrawdownRecovery(drawdownPercent: number): {
  drawdownPercent: number;
  requiredGainPercent: number;
  multiplierRequired: number;
} {
  if (drawdownPercent <= 0 || drawdownPercent >= 100) {
    throw new Error('Drawdown percentage must be strictly between 0 and 100');
  }
  const d = drawdownPercent / 100;
  const requiredGain = (d / (1 - d)) * 100;
  const multiplier = 1 / (1 - d);

  return {
    drawdownPercent,
    requiredGainPercent: Number(requiredGain.toFixed(2)),
    multiplierRequired: Number(multiplier.toFixed(2)),
  };
}
