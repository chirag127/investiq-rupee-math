# Fact Verification Backlog & Unverified Assertions

This ledger records unresolved financial claims, pending data checks, and areas where empirical retail investor outcomes differ from official regulatory guidelines.

## 1. Verified Core Assumptions
- [x] **Finance Act (No. 2) 2024 LTCG Rate:** Listed equity capital gains tax is 12.5% on aggregate LTCG exceeding ₹1.25 Lakh per financial year (effective 23 July 2024).
- [x] **Finance Act (No. 2) 2024 STCG Rate:** Listed equity short term capital gains tax is 20% (increased from 15%, effective 23 July 2024).
- [x] **Debt Mutual Funds Taxation (Section 50AA):** Specified Mutual Funds (holding <= 35% in domestic equities acquired on/after 1 April 2023) are taxed as short-term capital gains at marginal slab rates, without indexation.
- [x] **RBI Inflation Target:** Target headline CPI is 4.0% with a tolerance band of +/- 2% (2% to 6%).

## 2. Unverified or High-Variance Retail Assumptions
The following claims are often cited in Indian personal finance literature but are subject to wide individual dispersion. They are treated with sensitivity ranges in our tools rather than deterministic single values:
1. **Urban Private Lifestyle Inflation (Education & Healthcare):**
   - *Claim:* Private school tuition and tertiary medical care inflation in Tier 1 Indian cities runs at 10% to 12% annually.
   - *Status:* Empirically observed in private consumer basket studies, but not officially isolated as an aggregated sub-index in MoSPI CPI headline metrics. Our calculators allow user-configurable inflation rates from 2% to 18% with default 6% (macro) and 10% (lifestyle).
2. **Equity Risk Premium (ERP) for Indian Equities:**
   - *Claim:* Long-term nominal Nifty 50 TRI expected return is deterministic at 12-14%.
   - *Status:* Historical 20-year rolling returns show averages around 12-13%, but rolling 5-year periods have yielded between -2% and +28%. Articles must stress volatility drag and sequence of returns risk rather than promising a static 12%.
3. **Safe Withdrawal Rate (SWR) in India:**
   - *Claim:* The US Trinity Study "4% Rule" applies identically to India.
   - *Status:* Debunked by Indian quantitative research due to higher historical domestic inflation and lower real yield spreads. Empirically sustainable domestic SWR ranges between 2.75% and 3.5% depending on equity glide paths.
