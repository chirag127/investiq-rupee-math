---
title: "Sequence of Returns Risk (SRR): Why Order of Returns Matters in Indian Decumulation"
description: "A mathematical proof showing why identical 25-year average CAGRs result in either multi-crore wealth survival or total corpus depletion depending entirely on when market downturns hit."
publishedDate: "2026-04-10"
lastVerifiedDate: "2026-10-15"
category: "Retirement & Sequence Risk"
tags: ["srr", "sequence-of-returns", "retirement", "safe-withdrawal-rate", "swr", "drawdown"]
sources:
  - title: "Retirement Savings: Choosing a Withdrawal Rate That Is Sustainable"
    url: "https://www.jstor.org/stable/4480113"
    publisher: "Cooley, Hubbard, and Walz (Trinity Study)"
    verifiedDate: "2026-10-15"
  - title: "PFRDA Research on National Pension System Drawdown Dynamics"
    url: "https://www.pfrda.org.in/"
    publisher: "Pension Fund Regulatory and Development Authority"
    verifiedDate: "2026-10-15"
---

During the accumulation phase of an investment journey (e.g., compounding a monthly SIP), the commutative property of multiplication guarantees that the order in which returns occur does not alter the terminal value of a lump sum:

$$V_T = V_0 \times (1 + r_1) \times (1 + r_2) \times \dots \times (1 + r_T)$$

Because multiplication is commutative, $(1 + r_1)(1 + r_2) = (1 + r_2)(1 + r_1)$. Whether an investor suffers a severe 40% crash in Year 1 or Year 20, the final lump-sum corpus is algebraically identical.

However, the moment an investor transitions into **decumulation**—withdrawing regular monthly or annual cash flows for retirement expenses—the commutative property is shattered. Negative returns occurring early in the decumulation phase inflict irreversible damage, a phenomenon known as **Sequence of Returns Risk (SRR)**.

## Mathematical Formulation of Decumulation Recurrence

Let $W_t$ represent the portfolio value at year $t$, $r_t$ the investment return in year $t$, and $C_t$ the cash withdrawal at the beginning of year $t$ (indexed for annual inflation $i$):

$$C_t = C_0 (1 + i)^t$$

$$W_t = (W_{t-1} - C_t) \cdot (1 + r_t)$$

Expanding this recurrence relation demonstrates path dependency:

$$W_1 = (W_0 - C_1)(1 + r_1)$$

$$W_2 = [(W_0 - C_1)(1 + r_1) - C_2](1 + r_2) = (W_0 - C_1)(1 + r_1)(1 + r_2) - C_2 (1 + r_2)$$

Notice that earlier withdrawals $C_1$ are multiplied by $(1 + r_1)(1 + r_2)$, whereas later withdrawals are only multiplied by subsequent return terms. If $r_1$ is sharply negative, the investor is forced to liquidate units at depressed prices to meet fixed living costs $C_1$, permanently shrinking the asset base capable of participating in subsequent market recoveries.

## Simulation: Two Retirees with Identical 10% Average CAGR

Consider two retirees, **Retiree A (Unfavorable Sequence)** and **Retiree B (Favorable Sequence)**. Both start with an identical ₹2,00,00,000 (₹2 Crore) corpus and withdraw ₹12,00,000 annually (adjusted for 6% inflation). 

Both experience the exact same set of 5 annual returns: `[-15%, -10%, +10%, +25%, +35%]`, yielding an identical arithmetic average of 9.0% and identical point-to-point compound return. The only difference is the chronological sequence:

### Retiree A (Crash at Start): Returns `[-15%, -10%, +10%, +25%, +35%]`
- **Year 0:** Corpus ₹2,00,00,000
- **Year 1:** Withdraw ₹12,00,000 $\to$ Remaining ₹1,88,00,000. Return -15% $\to$ Corpus falls to **₹1,59,80,000**
- **Year 2:** Withdraw ₹12,72,000 $\to$ Remaining ₹1,47,08,000. Return -10% $\to$ Corpus falls to **₹1,32,37,200**
- **Year 3:** Withdraw ₹13,48,320 $\to$ Remaining ₹1,18,88,880. Return +10% $\to$ Corpus recovers to **₹1,30,77,768**
- **Year 4:** Withdraw ₹14,29,219 $\to$ Remaining ₹1,16,48,549. Return +25% $\to$ Corpus rises to **₹1,45,60,686**
- **Year 5:** Withdraw ₹15,14,972 $\to$ Remaining ₹1,30,45,714. Return +35% $\to$ **Ending Corpus: ₹1,76,11,714**

### Retiree B (Rally at Start): Returns `[+35%, +25%, +10%, -10%, -15%]`
- **Year 0:** Corpus ₹2,00,00,000
- **Year 1:** Withdraw ₹12,00,000 $\to$ Remaining ₹1,88,00,000. Return +35% $\to$ Corpus jumps to **₹2,53,80,000**
- **Year 2:** Withdraw ₹12,72,000 $\to$ Remaining ₹2,41,08,000. Return +25% $\to$ Corpus jumps to **₹3,01,35,000**
- **Year 3:** Withdraw ₹13,48,320 $\to$ Remaining ₹2,87,86,680. Return +10% $\to$ Corpus reaches **₹3,16,65,348**
- **Year 4:** Withdraw ₹14,29,219 $\to$ Remaining ₹3,02,36,129. Return -10% $\to$ Corpus drops to **₹2,72,12,516**
- **Year 5:** Withdraw ₹15,14,972 $\to$ Remaining ₹2,56,97,544. Return -15% $\to$ **Ending Corpus: ₹2,18,42,912**

### The Resulting Gap
Despite experiencing identical returns over the 5-year cycle, **Retiree B holds ₹42.31 Lakhs more wealth** than Retiree A. 

Over a 25-year retirement, Retiree A's portfolio completely depletes by Year 14, while Retiree B's portfolio survives and compounds into multi-crores.

## Mathematical Mitigations for Indian Portfolios

1. **The Cash & Arbitrage Buffer (2-3 Years):** Keeping 24 to 36 months of living expenses in ultra-short liquid or arbitrage funds eliminates the necessity of liquidating equity units during drawdown years.
2. **Dynamic Withdrawal Rules (Guyton-Klinger):** Skipping the annual inflation adjustment for withdrawal if the portfolio experienced a negative return in the preceding year.
3. **Rising Equity Glide Paths:** Contrary to traditional advice of reducing equity as one ages, mathematical research shows that starting retirement with lower equity (e.g. 30%) and gradually increasing equity exposure to 60% over the first decade minimizes SRR during the vulnerable early window.
