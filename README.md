# InvestiQ RupeeMath

> **Compounding Physics, Real Returns & Indian Inflation Drag**  
> Standalone specialist quantitative research platform & client-side calculator suite within the InvestiQ India network (Site 02 of 60).

**Live Website:** [https://chirag127.github.io/investiq-rupee-math/](https://chirag127.github.io/investiq-rupee-math/)  
**Repository:** `investiq-rupee-math`  
**GitHub Owner:** `chirag127`

---

## 1. Overview & Mathematical Core

InvestiQ RupeeMath provides deterministic, peer-reviewed financial models calibrated to Indian macroeconomic realities, Reserve Bank of India (RBI) monetary framework mandates, and the Income Tax Act, 1961 (amended by Finance Act No. 2, 2024).

### Key Features
- **100% Client-Side Privacy:** Zero telemetry, no third-party cookies, no tracking pixels, zero cloud storage of financial inputs.
- **Three First-Class Interactive Solvers:**
  1. *Real Post-Tax Return Solver:* Evaluates exact Fisher purchasing power yields across Equity LTCG (12.5% > ₹1.25L), STCG (20%), and Debt slab rates.
  2. *Irregular Cash Flow XIRR Engine:* Implements Newton-Raphson iteration with bisection fallback for irregular SIPs and redemptions.
  3. *Rule of 72 / 114 / 144 Visualizer:* Compares heuristic compounding mental math against exact logarithmic formulas.
- **15+ In-Depth Research Papers:** Comprehensive analyses on inflation baskets, volatility drag, drawdown recovery asymmetry, sequence of returns risk, and step-up SIP mechanics.
- **Static Search:** Client-side zero-leakage indexing via Pagefind.

---

## 2. Directory Structure

```text
investiq-rupee-math/
├── .github/workflows/
│   └── deploy.yml              # CI/CD automated build, test & deploy
├── content/data/
│   ├── SOURCES.md              # Official statutory citation registry
│   └── UNVERIFIED.md           # Fact-verification backlog & sensitivity ranges
├── public/
│   ├── favicon.svg             # Sovereign geometric Rupee mark
│   └── robots.txt              # Production sitemap declaration
├── src/
│   ├── components/             # Client-side interactive tools
│   │   ├── RealReturnSolver.astro
│   │   ├── XIRREngine.astro
│   │   └── RuleMultiplierVisualizer.astro
│   ├── content/
│   │   ├── articles/           # 15+ researched markdown papers
│   │   └── config.ts           # Zod schema validation
│   ├── layouts/
│   │   ├── BaseLayout.astro    # Universal high-contrast theme & nav
│   │   └── ArticleLayout.astro # Academic paper template with citations
│   ├── lib/
│   │   └── finance-math.ts     # Reusable quantitative finance library
│   ├── pages/                  # Static routes (Home, Solvers, Glossary, etc.)
│   └── styles/
│       ├── tokens.css          # Design tokens & color system
│       └── global.css          # Typography & layout primitives
├── scripts/
│   └── privacy-scanner.js      # Zero-telemetry audit script
├── tests/
│   └── finance-math.test.ts    # Vitest test suite (18 unit tests)
├── astro.config.mjs            # Static build & GitHub Pages base configuration
├── package.json
└── tsconfig.json
```

---

## 3. Local Development & Testing

```bash
# Install dependencies
npm install

# Run unit tests
npm run test

# Run privacy and telemetry scan
npm run privacy-scan

# Start local dev server
npm run dev

# Build production bundle with Pagefind search
npm run build
```

---

## 4. Verification Evidence & Quality Assurance

- **Unit Tests:** 18 passing tests covering Fisher real returns, Newton-Raphson convergence, log multipliers, variance drag, and recovery math.
- **Privacy Audit:** `scripts/privacy-scanner.js` scanned 73 build files: 0 trackers, 0 third-party cookies, 0 beacons detected.
- **Static Pages:** 29 production pages built successfully with clean relative base path `/investiq-rupee-math/`.

---

## 5. Educational Disclaimer

InvestiQ RupeeMath is published for quantitative research and mathematical education only. It does not constitute investment advice, legal advice, or financial planning under SEBI (Investment Advisers) Regulations, 2013. Consult an authorized SEBI-registered Investment Adviser (RIA) or Chartered Accountant (CA) for individualized advisory.
