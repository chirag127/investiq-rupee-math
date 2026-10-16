---
title: "Effective Annual Rate (EAR): Deciphering Stated vs True Compounding in Indian Banking"
description: "Dissecting APR vs APY, quarterly compounding conventions in Indian commercial banks, and monthly payout marketing tricks in corporate deposits."
publishedDate: "2026-05-20"
lastVerifiedDate: "2026-10-15"
category: "Compounding Physics"
tags: ["ear", "apr", "fixed-deposits", "banking", "rbi", "compounding-frequency"]
sources:
  - title: "RBI Master Direction – Interest Rate on Deposits (DBR.No.Dir.BC.10/13.03.00/2015-16)"
    url: "https://www.rbi.org.in/"
    publisher: "Reserve Bank of India"
    verifiedDate: "2026-10-15"
  - title: "Handbook of Banking Mathematics & Interest Calculation Conventions"
    url: "https://www.iibf.org.in/"
    publisher: "Indian Institute of Banking and Finance"
    verifiedDate: "2026-10-15"
---

When browsing interest rate schedules at Indian commercial banks (e.g., SBI, HDFC Bank, ICICI Bank) or Non-Banking Financial Companies (NBFCs), consumers encounter phrases like:
- *"Interest compounded quarterly"*
- *"Annualized yield of 8.24% on a 400-day deposit at 8.00% nominal"*
- *"Monthly payout option at 7.75%"*

Understanding the exact mathematical relationship between the stated nominal rate (often called Annual Percentage Rate or APR) and the **Effective Annual Rate (EAR)** is essential to avoid mispricing debt and fixed-income products.

## The Mathematical Definition of Effective Annual Rate

The Effective Annual Rate (EAR) standardizes interest rates by expressing the total compounding growth as if it were paid once per year:

$$\text{EAR} = \left( 1 + \frac{r_{\text{nom}}}{m} \right)^m - 1$$

Where:
- $r_{\text{nom}}$ is the nominal stated annual rate (APR).
- $m$ is the number of compounding periods per financial year.

### Continuous Compounding Limit
As compounding frequency becomes continuous ($m \to \infty$):

$$\text{EAR}_{\infty} = \lim_{m \to \infty} \left( 1 + \frac{r_{\text{nom}}}{m} \right)^m - 1 = e^{r_{\text{nom}}} - 1$$

## The Indian Banking Standard: Quarterly Compounding

Under Reserve Bank of India (RBI) directives, interest on domestic term deposits (Fixed Deposits) for tenors exceeding 180 days is conventionally calculated and compounded on a **quarterly basis** ($m = 4$).

Let us calculate the true Effective Annual Rate across standard deposit rates:

| Stated Nominal APR ($r_{\text{nom}}$) | Semi-Annual ($m=2$) | Quarterly RBI Standard ($m=4$) | Monthly Compounding ($m=12$) | Extra Yield From Quarterly Compounding |
|---|---|---|---|---|
| **6.50%** | 6.61% | **6.66%** | 6.70% | +16 bps |
| **7.00%** | 7.12% | **7.19%** | 7.23% | +19 bps |
| **7.50%** | 7.64% | **7.71%** | 7.76% | +21 bps |
| **8.00%** | 8.16% | **8.24%** | 8.30% | +24 bps |
| **8.50%** | 8.68% | **8.77%** | 8.84% | +27 bps |
| **9.00%** | 9.20% | **9.31%** | 9.38% | +31 bps |

## The "Monthly Payout" Discounting Formula

Many senior citizens prefer receiving monthly interest payouts rather than cumulative growth. However, banks cannot pay $\frac{r_{\text{nom}}}{12}$ every month if the agreed yield is based on quarterly compounding; doing so would overpay interest because the bank loses reinvestment float.

To ensure mathematical equivalence to a quarterly compounding FD, RBI directives require banks to discount monthly payouts:

$$\text{Monthly Rate} = m \cdot \left[ \left(1 + \frac{r_{\text{nom}}}{4}\right)^{\frac{1}{3}} - 1 \right]$$

For an 8.00% nominal deposit:
- Cumulative reinvestment yields **8.24% EAR**.
- If taken monthly, the bank pays approximately **7.947%**, or ₹662.25 per month per ₹1,00,000 deposit, rather than ₹666.67. 

Understanding this distinction clarifies why monthly payout schemes yield lower gross interest than cumulative reinvestment options over multi-year horizons.
