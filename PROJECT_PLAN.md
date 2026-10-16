# Project Plan: RupeeMath (investiq-rupee-math)

## 1. Executive Summary
- **Site Name:** RupeeMath
- **Public Title:** RupeeMath — Compounding Physics, Real Returns & Indian Inflation Drag
- **Repository:** `investiq-rupee-math`
- **Owner:** `chirag127`
- **Canonical Content Focus:** Compounding mathematics, nominal vs real returns, CPI & Indian lifestyle inflation drag, SIP cash flows & timing, CAGR vs XIRR, sequence of returns risk (SRR), and uncertainty in multi-decade return assumptions.
- **Base Stack:** Astro (Static Output), TypeScript, Tailwind/Vanilla CSS design tokens, Pagefind search, GitHub Actions workflow.
- **Privacy First:** 100% client-side computing, zero telemetry, no tracking cookies, local privacy scanner script.

## 2. Interactive First-Class Tools (Client-Side)
1. **Real Post-Tax Return Solver:**
   - Inputs: Nominal asset return (%), Inflation rate (CPI/custom %), Tax regime / asset class (Equity LTCG 12.5% above ₹1.25L, STCG 20%, Debt slab rate / nominal indexation nuance, FD slab rate 30%+cess), Holding period.
   - Calculates: Nominal post-tax yield, Fisher equation exact real return $((1+r_{net})/(1+i) - 1)$, purchasing power erosion, rule-of-thumb approximation comparison.
2. **Irregular Cash Flow XIRR Engine:**
   - Inputs: Dynamic cash flow table (dates and amounts: negative for investments, positive for withdrawals/current portfolio value).
   - Calculates: Newton-Raphson solved internal rate of return (XIRR), simple CAGR, absolute return, comparison between periodic SIP vs lump-sum timing.
3. **Rule of 72 / 114 / 144 Interactive Visualizer:**
   - Compounding doubling (72), tripling (114), and quadrupling (144) time horizons.
   - Exact mathematical log calculation vs heuristic formula difference across 1% to 30% yield curves.
   - Purchasing power halving calculation (Inflation Rule of 70/72).

## 3. Article Roadmap (Minimum 15 Deep-Dive Articles)
1. `physics-of-compounding-time-vs-rate`: Why compounding is back-heavy and the exponential growth function in Indian equities.
2. `cagr-vs-xirr-methodology`: The definitive guide to measuring periodic cash flows versus point-to-point gains.
3. `fisher-equation-real-returns`: Nominal vs real return math under Indian CPI inflation.
4. `lifestyle-inflation-the-silent-killer`: Why official CPI (4-6%) understates urban education, healthcare, and discretionary inflation (8-11%).
5. `sequence-of-returns-risk-srr`: Why the order of market returns matters crucially in decumulation and early retirement.
6. `sip-timing-and-cash-flow-drag`: Does daily, weekly, or monthly SIP timing alter long-term corpus trajectory?
7. `drawdown-recovery-asymmetry`: The mathematical mechanics of why a 50% crash requires a 100% gain to break even.
8. `post-tax-compounding-drag`: How annual tax drag (FDs/debt) destroys compounding compared to deferred capital gains.
9. `rupee-cost-averaging-limits`: Mathematical conditions where lump sum beats SIP and vice versa.
10. `effective-annual-rate-ear`: Stated APR vs compounding frequency (monthly, quarterly, daily NBFC/banking products).
11. `uncertainty-and-variance-drag`: Volatility drag: why arithmetic mean return is always higher than geometric return $(CAGR \approx \mu - \sigma^2/2)$.
12. `inflation-baskets-india`: Dissecting the Indian CPI basket: food weightage (45.86%), housing, fuel, health, and urban-rural divide.
13. `step-up-sip-mechanics`: Mathematical multiplier of annual 5-10% SIP escalations against inflation.
14. `rule-of-72-114-144-limits`: Mathematical precision and breakdown of doubling rules under high-inflation/high-yield regimes.
15. `retirement-corpus-depletion-math`: Safe withdrawal rates, inflation-adjusted annuities, and portfolio survival probabilities in India.

## 4. Architecture & Quality
- `src/lib/finance-math.ts`: Pure TypeScript library with 100% test coverage via Vitest.
- Accessibility: Semantic HTML, WCAG 2.1 AA compliant contrast, aria attributes, keyboard navigation.
- Privacy & Local-first: Zero external analytics or CDNs; client-side Pagefind search.
- CI/CD: Automated GitHub Actions deploy to GitHub Pages at `https://chirag127.github.io/investiq-rupee-math/`.
