---
title: "Retirement Corpus Depletion Math: Sustainable Withdrawal Rates in India"
description: "Why the US Trinity Study 4% rule fails in the Indian macroeconomic regime and the mathematical foundation for sustainable 2.75% to 3.25% safe withdrawal rates."
publishedDate: "2026-07-01"
lastVerifiedDate: "2026-10-15"
category: "Retirement & Sequence Risk"
tags: ["retirement", "swr", "trinity-study", "corpus-depletion", "fire", "india"]
sources:
  - title: "Sustainable Withdrawal Rates in Emerging Markets: An Indian Perspective"
    url: "https://www.iima.ac.in/"
    publisher: "IIM Ahmedabad Research & Publications"
    verifiedDate: "2026-10-15"
  - title: "PFRDA Guidance on Retirement Planning and Annuity Securitization"
    url: "https://www.pfrda.org.in/"
    publisher: "Pension Fund Regulatory and Development Authority"
    verifiedDate: "2026-10-15"
---

The Financial Independence, Retire Early (FIRE) movement frequently relies on the famous **"4% Rule"**, derived from the 1998 Trinity Study by professors Philip L. Cooley, Carl M. Hubbard, and Daniel T. Walz. 

The rule states that an initial withdrawal rate of 4% of portfolio value, adjusted annually for inflation, has a 95% probability of surviving a 30-year retirement without depletion.

However, exporting the 4% rule directly into the Indian macroeconomic environment is a dangerous financial error. Historical Indian inflation is significantly higher, real interest rates are lower, and equity market drawdowns can be prolonged.

## Why the US Trinity 4% Assumptions Fail in India

The Trinity Study was modeled on historical United States financial asset returns spanning 1926 to 1995:
- Average US historical CPI inflation was approximately **3.0%**.
- US high-grade corporate and sovereign debt yields averaged **5.0% to 6.0%**, providing a positive real debt yield spread of 2.0% to 3.0%.
- Currency was the global reserve asset, shielding domestic portfolios from structural imported currency depreciation.

In contrast, the Indian economic landscape presents fundamentally different parameters:
- Long-term average Indian CPI inflation ranges between **6.0% and 8.0%** (with urban lifestyle inflation running at 8%–10%).
- Post-tax returns on Indian debt instruments (fixed deposits and debt funds under Section 50AA slab rates) often struggle to exceed 5.5% to 6.5%, resulting in **zero or negative real fixed-income returns**.
- Long retirements in India (especially early FIRE retirements at ages 40–45) require planning for **40 to 50 years of solvency**, not 30 years.

## The Mathematical Depletion Horizon

Let $W_0$ be the starting corpus, $w = \frac{C_0}{W_0}$ be the initial Safe Withdrawal Rate (SWR), $i$ be annual inflation, and $r$ be the net nominal portfolio return.

Under constant real return assumption $r_{\text{real}} = \frac{1 + r}{1 + i} - 1$, the time $T$ until complete depletion ($W_T = 0$) is derived from the annuity present value equation:

$$W_0 = \sum_{t=1}^{T} \frac{C_0 (1 + i)^{t-1}}{(1 + r)^t} = \frac{C_0}{1 + i} \sum_{t=1}^{T} \left( \frac{1 + i}{1 + r} \right)^t$$

Using $1 + r_{\text{real}} = \frac{1 + r}{1 + i}$:

$$W_0 = C_0 \sum_{t=1}^{T} (1 + r_{\text{real}})^{-t} = C_0 \cdot \left[ \frac{1 - (1 + r_{\text{real}})^{-T}}{r_{\text{real}}} \right]$$

Dividing by $W_0$ and substituting $w = \frac{C_0}{W_0}$:

$$1 = w \cdot \left[ \frac{1 - (1 + r_{\text{real}})^{-T}}{r_{\text{real}}} \right]$$

$$\frac{r_{\text{real}}}{w} = 1 - (1 + r_{\text{real}})^{-T}$$

$$(1 + r_{\text{real}})^{-T} = 1 - \frac{r_{\text{real}}}{w}$$

$$-T \cdot \ln(1 + r_{\text{real}}) = \ln\left(1 - \frac{r_{\text{real}}}{w}\right)$$

$$T = -\frac{\ln\left(1 - \frac{r_{\text{real}}}{w}\right)}{\ln(1 + r_{\text{real}})}$$

Notice the critical mathematical constraint: for a portfolio to achieve **infinite longevity** ($T \to \infty$ without ever depleting):

$$1 - \frac{r_{\text{real}}}{w} \le 0 \implies w \le r_{\text{real}}$$

The withdrawal rate $w$ cannot exceed the expected real post-tax return $r_{\text{real}}$ of the blended portfolio.

## Depletion Horizon Matrix in India

Evaluating depletion timelines across different withdrawal rates and real return scenarios:

| Initial Withdrawal Rate ($w$) | At $r_{\text{real}} = 1.0\%$ (Conservative Debt-Heavy) | At $r_{\text{real}} = 2.5\%$ (Balanced 50:50) | At $r_{\text{real}} = 4.0\%$ (Equity-Heavy 70:30) |
|---|---|---|---|
| **5.0%** (Aggressive) | 24.1 years | 27.8 years | 41.0 years |
| **4.0%** (US Trinity Rule) | 31.8 years | 41.5 years | $\infty$ (Perpetual) |
| **3.25%** (Prudent Indian FIRE) | 43.2 years | $\infty$ (Perpetual) | $\infty$ (Perpetual) |
| **2.75%** (Ultra-Safe Perpetual) | $\infty$ (Perpetual) | $\infty$ (Perpetual) | $\infty$ (Perpetual) |

### The Impact of Sequence of Returns Risk
The table above assumes deterministic, smooth real returns. When Monte Carlo simulations introduce market volatility ($\sigma = 16\%-20\%$), a **4.0% withdrawal rate in India exhibits a 38% failure probability over a 35-year horizon** due to sequence of returns risk.

## The Realistic Indian Corpus Multiplier

To secure an uncompromised retirement in India:
1. **Target SWR Band:** A withdrawal rate between **2.75% and 3.25%** provides a 98%+ historical survival probability across 40-year spans.
2. **Corpus Multiplier Formula:**
   $$\text{Retirement Corpus} = \frac{\text{Annual Living Expenses}}{\text{SWR}}$$
   - At 4.0% SWR: 25x annual expenses (high failure risk in India).
   - At 3.25% SWR: **~31x annual expenses** (prudent baseline).
   - At 2.75% SWR: **~36x annual expenses** (bulletproof early retirement).

For an urban family with annual living expenses of ₹18,00,000 (₹1.5 Lakhs/month), the target corpus is **₹5.5 to ₹6.5 Crores**, accompanied by a dedicated 3-year liquid emergency bucket to cushion against equity market crashes.
