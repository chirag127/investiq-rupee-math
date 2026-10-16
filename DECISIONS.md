# Architectural & Editorial Decisions: RupeeMath

## 1. Technical Decisions
- **Framework:** Astro v5 (Static Site Generation / `output: 'static'`).
- **Base Path & Site Configuration:** 
  - `site`: `https://chirag127.github.io`
  - `base`: `/investiq-rupee-math`
  This guarantees all internal links, CSS/JS bundles, images, and search indexes resolve cleanly on GitHub Pages.
- **Styling Architecture:** Pure Vanilla CSS with a centralized CSS custom property token system (`tokens.css` and `global.css`). Dark/light mode theme support with preference preservation in `localStorage` without cookies or telemetry.
- **Math Engine (`src/lib/finance-math.ts`):**
  - Isolated, pure, functional TypeScript implementations.
  - Implements high-precision Newton-Raphson solver for irregular dates (XIRR) with robust derivative fallback and bracket limiting.
  - Implements exact Fisher equation: $r_{real} = \frac{1 + r_{nominal}}{1 + i} - 1$.
  - Implements Rupee Cost Averaging, SIP compounding, geometric variance drag, and logarithmic Rule of 72/114/144 curves.
  - Full Vitest unit test suite covering normal inputs, edge cases (0% inflation, negative returns, high hyperinflation rates, same-day cash flows), and input validation.
- **Search System:** Client-side Pagefind integration generated post-build, zero server dependency, zero third-party cloud data leakage.

## 2. Regulatory & Tax Basis (India Post-Budget 2024 / FY 2024-25 & 2025-26)
- **Equity LTCG:** 12.5% on gains exceeding ₹1.25 Lakh per financial year (holding > 12 months for listed equity & equity mutual funds) without indexation.
- **Equity STCG:** 20% on short-term capital gains (holding ≤ 12 months).
- **Unlisted & Debt Funds / Fixed Income:** Taxed at applicable marginal income tax slab rates (Section 50AA for Specified Mutual Funds bought on or after 1 April 2023; unlisted LTCG at 12.5% without indexation post-Finance Act 2024).
- **Fixed Deposits:** Interest income taxed at marginal slab rates (up to 30% + 4% Health & Education cess = 31.2% base high slab, plus applicable surcharges for HNI income brackets).
- **Inflation Baseline:** Official Reserve Bank of India CPI headline inflation target band is 4% (+/- 2% tolerance band). Private urban consumption inflation (education, healthcare, housing) empirically ranges between 7% to 11%.

## 3. Privacy & Offline Guarantees
- No trackers, Google Analytics, cookies, third-party fonts (bundled locally or system fallbacks), or marketing pixels.
- All calculator evaluations occur on the client's device in JavaScript.
- `scripts/privacy-scanner.js` included to verify zero external script/asset references before builds.
