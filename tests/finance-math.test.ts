import { describe, it, expect } from 'vitest';
import {
  calculateRealReturn,
  calculateApproxRealReturn,
  solvePostTaxRealReturn,
  calculateCAGR,
  calculateEAR,
  evaluateCompoundingRules,
  calculateXIRR,
  calculateVolatilityDrag,
  calculateSIPFutureValue,
  calculateDrawdownRecovery,
} from '../src/lib/finance-math';

describe('Finance Math: Exact Fisher Equation & Real Returns', () => {
  it('correctly calculates exact real return (12% nominal, 6% inflation)', () => {
    // (1 + 0.12) / (1 + 0.06) - 1 = 1.12 / 1.06 - 1 = 0.05660377... (~5.66%)
    const realReturn = calculateRealReturn(0.12, 0.06);
    expect(realReturn).toBeCloseTo(0.0566038, 5);
  });

  it('contrasts exact real return with approximate heuristic', () => {
    const nominal = 0.15;
    const inflation = 0.08;
    const exact = calculateRealReturn(nominal, inflation); // 1.15 / 1.08 - 1 = 6.4815%
    const approx = calculateApproxRealReturn(nominal, inflation); // 7.0%
    expect(exact).toBeCloseTo(0.064815, 5);
    expect(approx).toBeCloseTo(0.07, 5);
    expect(approx).toBeGreaterThan(exact); // Approximation always overstates real return in positive inflation
  });

  it('handles negative real returns (FD at 7%, inflation at 8%)', () => {
    const realReturn = calculateRealReturn(0.07, 0.08); // 1.07 / 1.08 - 1 = -0.009259 (-0.93%)
    expect(realReturn).toBeLessThan(0);
    expect(realReturn).toBeCloseTo(-0.009259, 5);
  });

  it('throws on invalid hyper-deflation inflation <= -100%', () => {
    expect(() => calculateRealReturn(0.10, -1.0)).toThrow();
  });
});

describe('Finance Math: Post-Tax Real Return Solver', () => {
  it('calculates Equity LTCG (12.5% tax) post-tax real return', () => {
    // 12% nominal, 12.5% tax => 12 * (1 - 0.125) = 10.5% post tax
    // Inflation 6%: 1.105 / 1.06 - 1 = 4.245%
    const res = solvePostTaxRealReturn(0.12, 0.06, 'equity_ltcg');
    expect(res.taxRateApplied).toBe(0.125);
    expect(res.nominalPostTax).toBeCloseTo(0.105, 4);
    expect(res.exactRealReturn).toBeCloseTo(0.042453, 4);
    expect(res.purchasingPowerMultiplier10y).toBeGreaterThan(1.5);
  });

  it('calculates Fixed Deposit under 31.2% tax slab', () => {
    // 7.5% nominal pre-tax, 31.2% slab tax => 7.5 * (1 - 0.312) = 5.16%
    // Inflation 6%: 1.0516 / 1.06 - 1 = -0.00792 (-0.79% negative real yield)
    const res = solvePostTaxRealReturn(0.075, 0.06, 'fixed_deposit', 0.312);
    expect(res.nominalPostTax).toBeCloseTo(0.0516, 4);
    expect(res.exactRealReturn).toBeLessThan(0);
    expect(res.purchasingPowerMultiplier10y).toBeLessThan(1.0); // Real wealth destroyed over 10 years
  });
});

describe('Finance Math: Compounding Rules (72, 114, 144)', () => {
  it('evaluates Rule of 72 vs exact log formula for 12% return', () => {
    const res = evaluateCompoundingRules(12);
    // Rule 72: 72 / 12 = 6.0 years
    // Exact: ln(2) / ln(1.12) = 0.693147 / 0.1133287 = 6.116 years
    expect(res.doubling.rule72Years).toBe(6.0);
    expect(res.doubling.exactYears).toBeCloseTo(6.12, 1);
  });

  it('evaluates Rule of 114 (Tripling) and Rule of 144 (Quadrupling)', () => {
    const res = evaluateCompoundingRules(10);
    // Rule 114 for 10% = 11.4 years; Exact: ln(3)/ln(1.10) = 11.53 years
    expect(res.tripling.rule114Years).toBe(11.4);
    expect(res.tripling.exactYears).toBeCloseTo(11.53, 1);

    // Rule 144 for 10% = 14.4 years; Exact: ln(4)/ln(1.10) = 14.55 years
    expect(res.quadrupling.rule144Years).toBe(14.4);
    expect(res.quadrupling.exactYears).toBeCloseTo(14.55, 1);
  });

  it('throws on zero or negative rates', () => {
    expect(() => evaluateCompoundingRules(0)).toThrow();
    expect(() => evaluateCompoundingRules(-5)).toThrow();
  });
});

describe('Finance Math: Irregular Cash Flow XIRR Engine', () => {
  it('accurately calculates XIRR for simple 1-year annual return', () => {
    const flows = [
      { date: '2023-01-01', amount: -100000 },
      { date: '2024-01-01', amount: 112000 },
    ];
    const xirr = calculateXIRR(flows);
    expect(xirr).toBeCloseTo(0.12, 2); // 12% return exactly in 1 year (365 days)
  });

  it('calculates irregular date cash flows with multiple installments and redemption', () => {
    const flows = [
      { date: '2023-01-01', amount: -10000 },
      { date: '2023-04-15', amount: -10000 },
      { date: '2023-08-20', amount: -15000 },
      { date: '2024-01-01', amount: 40000 },
    ];
    const xirr = calculateXIRR(flows);
    expect(xirr).toBeGreaterThan(0.10);
    expect(xirr).toBeLessThan(0.35);
  });

  it('throws error when no negative outflow or no positive inflow is provided', () => {
    const allPositive = [
      { date: '2023-01-01', amount: 10000 },
      { date: '2024-01-01', amount: 12000 },
    ];
    expect(() => calculateXIRR(allPositive)).toThrow();

    const allNegative = [
      { date: '2023-01-01', amount: -10000 },
      { date: '2024-01-01', amount: -12000 },
    ];
    expect(() => calculateXIRR(allNegative)).toThrow();
  });
});

describe('Finance Math: Volatility Drag & Variance Mathematics', () => {
  it('demonstrates variance drag reduces compound geometric return below arithmetic mean', () => {
    // Volatility 20% (0.20), Arithmetic Mean 15% (0.15)
    // Drag = 0.5 * (0.20^2) = 0.5 * 0.04 = 0.02 (2.0%)
    // Geometric mean ~ 13.0%
    const res = calculateVolatilityDrag(0.15, 0.20);
    expect(res.varianceDrag).toBeCloseTo(0.02, 4);
    expect(res.geometricMeanEstimate).toBeCloseTo(0.13, 4);
  });
});

describe('Finance Math: Drawdown and Asymmetric Recovery Math', () => {
  it('proves a 50% crash requires a 100% gain to break even', () => {
    const recovery = calculateDrawdownRecovery(50);
    expect(recovery.requiredGainPercent).toBe(100);
    expect(recovery.multiplierRequired).toBe(2);
  });

  it('proves a 30% crash requires a ~42.86% gain to break even', () => {
    const recovery = calculateDrawdownRecovery(30);
    expect(recovery.requiredGainPercent).toBeCloseTo(42.86, 2);
  });

  it('proves a 80% catastrophic crash requires a 400% gain (5x)', () => {
    const recovery = calculateDrawdownRecovery(80);
    expect(recovery.requiredGainPercent).toBe(400);
    expect(recovery.multiplierRequired).toBe(5);
  });
});

describe('Finance Math: SIP Future Value & EAR', () => {
  it('calculates 10-year ₹10,000 monthly SIP at 12% p.a.', () => {
    // 10 years, 120 months, ₹10k/month
    const res = calculateSIPFutureValue(10000, 0.12, 10);
    expect(res.totalInvested).toBe(1200000); // ₹12 Lakhs
    expect(res.futureValue).toBeGreaterThan(2300000); // ~₹23.23 Lakhs
    expect(res.totalGains).toBeGreaterThan(1100000);
  });

  it('calculates Effective Annual Rate for quarterly compounding', () => {
    // 8% nominal compounded quarterly (n=4): (1 + 0.08/4)^4 - 1 = (1.02)^4 - 1 = 8.243%
    const ear = calculateEAR(0.08, 4);
    expect(ear).toBeCloseTo(0.082432, 5);
  });
});
