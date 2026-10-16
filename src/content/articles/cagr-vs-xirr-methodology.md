---
title: "CAGR vs XIRR Methodology: Resolving Cash Flow Distortion in Indian Portfolios"
description: "A comprehensive mathematical comparison of point-to-point Compound Annual Growth Rate and internal rate of return for Systematic Investment Plans and arbitrary cash flows."
publishedDate: "2026-03-20"
lastVerifiedDate: "2026-10-15"
category: "Cash Flow Analytics"
tags: ["cagr", "xirr", "irr", "sip", "performance-measurement", "sebi"]
sources:
  - title: "SEBI Master Circular for Mutual Funds: Performance Advertising Guidelines"
    url: "https://www.sebi.gov.in/legal/master-circulars/jun-2023/master-circular-for-mutual-funds_73236.html"
    publisher: "Securities and Exchange Board of India"
    verifiedDate: "2026-10-15"
  - title: "ISO 31-11: Quantities and Units in Mathematical Finance"
    url: "https://www.iso.org/"
    publisher: "International Organization for Standardization"
    verifiedDate: "2026-10-15"
---

When Indian asset management companies advertise mutual fund returns, SEBI mandates specific metrics based on the nature of capital deployment:
- **CAGR (Compound Annual Growth Rate)** is mandatory for lump-sum investments spanning greater than one year.
- **XIRR (Extended Internal Rate of Return)** is mandatory for all Systematic Investment Plan (SIP) illustrations and multi-tranche cash flows.

Conflating these two distinct metrics is one of the most persistent sources of performance confusion among retail investors.

## Mathematical Formulation of CAGR

CAGR represents the constant annual geometric rate of return required for an initial lump-sum capital $V_0$ to grow to terminal value $V_T$ over $T$ continuous years:

$$\text{CAGR} = \left(\frac{V_T}{V_0}\right)^{\frac{1}{T}} - 1$$

### Assumptions of CAGR
1. **Single Outflow:** Entire capital is committed at time $t = 0$.
2. **Zero Interim Additions or Redemptions:** No capital is deposited or withdrawn between $t=0$ and $t=T$.
3. **Smooth Path Equivalence:** CAGR ignores intermediate volatility and path dependency; a portfolio that stays flat for 4 years and doubles in year 5 has the identical CAGR as a portfolio that compounds smoothly at 14.87% annually.

## Mathematical Formulation of XIRR

In real-world Indian portfolio management, investors rarely deploy all capital in a single instantaneous event. Monthly SIPs, employee provident fund contributions, semi-annual bonus deployments, and emergency partial redemptions produce an irregular time-series of cash flows $(C_0, C_1, C_2, \dots, C_n)$ occurring at discrete calendar dates $(d_0, d_1, d_2, \dots, d_n)$.

XIRR is defined as the discount rate $r$ that forces the Net Present Value (NPV) of all historic cash flows to exactly equal zero:

$$\text{NPV}(r) = \sum_{i=0}^{n} \frac{C_i}{(1 + r)^{\frac{d_i - d_0}{365}}} = 0$$

Where:
- $C_i < 0$ for cash outflows (investments made by the investor).
- $C_n > 0$ for terminal portfolio valuation or redemption inflows.
- $d_i - d_0$ is the actual calendar day difference between transaction date $i$ and the baseline date $d_0$.

## Why XIRR Cannot Be Solved Algebraically

Unlike CAGR, which is a closed-form algebraic formula, the XIRR equation is a higher-degree polynomial. When an investor runs a 10-year monthly SIP, there are 120 separate cash flows, resulting in a 120th-degree polynomial. 

Solving for $r$ requires iterative numerical methods, typically the **Newton-Raphson method**:

$$r_{k+1} = r_k - \frac{f(r_k)}{f'(r_k)}$$

Where $f'(r)$ is the first derivative of the NPV equation with respect to $r$:

$$f'(r) = -\sum_{i=0}^{n} \left(\frac{d_i - d_0}{365}\right) \frac{C_i}{(1 + r)^{\frac{d_i - d_0}{365} + 1}}$$

## Worked Comparison: The "Why is My Return Lower?" Paradox

A common paradox occurs when an investor reviews a fund's published 5-year CAGR (e.g., 18.0%) versus their personal 5-year SIP XIRR (e.g., 13.5%). Investors frequently suspect missing units or excessive expense ratios.

The divergence is a mathematical artifact of money-weighted timing:
- In a bull market, earlier SIP installments (invested at lower index levels) compound over 4–5 years and experience significant appreciation.
- However, the recent installments (invested in years 4 and 5 at much higher valuations) have had only months to compound, pulling down the overall money-weighted XIRR.
- Conversely, in a recovering bear market, a fresh SIP often delivers an XIRR significantly higher than the 5-year point-to-point CAGR because heavy capital was deployed during bottoming phases.
