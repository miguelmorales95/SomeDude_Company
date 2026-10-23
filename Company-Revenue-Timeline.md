# Revenue Timeline & Path to Self-Sustainability

**Owner:** Miguel Morales · **As of:** 2026-10-23 (evening) · **Status:** planning model (v1.1), not a forecast

> Every number here is an **assumption to be replaced by measured data**. No app is earning money yet
> (Kinmap has one reported early sale). Use this to choose what to measure and which levers to pull,
> not for fundraising or public claims. Companion to the
> [Company Roadmap](./Company-Roadmap-and-Launch-Plan.md).

---

## What changed in v1.1 (2026-10-23)

- **Kinmap's AI is cheaper than v1 assumed.** It now defaults to Claude Haiku 5.5 at about **$0.001 per
  request** (logged per call), or a free local model through Ollama. At 30–100 requests a month, that's
  **$0.03–0.10 per family**, not $0.30–1.50. Contribution rises from ~$5.75 to ~**$6.40** per family, so
  **~$4,000/month take-home needs ~840 families instead of ~930**: about 1–2 months sooner in each
  scenario. The scenario tables below still use the v1 inputs; re-run `models/kinmap-model.mjs` with
  `VAR = 0.60` once real usage is logged.
- **Afoot is deployed** (private beta on Vercel, reading Supabase) with 161 real events and a
  user-feedback loop (reports, tips, checks). Its running cost is still about $0 until sponsors appear,
  when Vercel Pro ($20/month) becomes required.
- **NoBucks** (renamed from Clover) needs a **fiscal sponsor** for most grants, since the founder is
  building privately rather than through a nonprofit; budget a 5–10% sponsor fee on grant income.

---

## 1. The short answer

| Question | Answer (base case) |
|---|---|
| Which app pays the bills? | **Kinmap.** Afoot and NoBucks help, but neither is likely to fund a salary on its own within two years. |
| When can Kinmap go on sale? | About **March 2027** (it still needs real sign-in, a database, private media, billing, and store builds). The months below count from that launch date. |
| When do the apps cover their own running costs? | **1–5 months after Kinmap's paid launch** (~30–40 paying families). Low risk: running costs are ~$100–200/month. |
| When can the business pay you ~$4,000/month take-home? | **~24 months after launch (≈ spring 2029)** in the base case. **15 months** if growth is strong, **3+ years** if it's slow. Needs **~950–1,000 paying families**. |
| How much cash does the business itself need? | **~$3,000–8,000 over the first two years** for tools, fees, store accounts, a small ad test, and legal/accounting. This excludes your living costs. |
| How much cash do *you* need? | That's the real constraint. At a $4,000/month draw, waiting 24 months is roughly **$96,000** of personal runway. **Keep your income source** until the business clears about **$2,500/month profit**, then step down gradually. |

The single biggest unknown is **how many families find Kinmap each month without paid ads.** The second is
**how many of them stay.** Everything else matters less.

---

## 2. Shared assumptions

### Costs (per month)

| Item | Now | With Kinmap live | Notes |
|---|---|---|---|
| Supabase | $0 | $25 | Free tier pauses after a week of inactivity and has no backups. Pro is required before real family data. |
| Vercel | $0 | $20 | **The Hobby plan is non-commercial only.** Move Afoot to Pro before showing any sponsor or paid placement. |
| Claude API | $1–5 | $5–30 | Haiku 5.5 ($0.10/$0.50 per million tokens in/out) is the default for Kinmap and Afoot; Sonnet 5.5 ($2/$10) only where quality needs it; batch requests are half price. A local Ollama model costs $0 for development. |
| Media storage + bandwidth | $0 | $5–25 | Mostly Kinmap photos and video. |
| Expo EAS | $0 | $0–19 | The free plan has limited monthly builds. Pay only if you rebuild often. |
| Domains | ~$4 | ~$4 | ~$12/year each, after the availability check. |
| Apple developer / Google Play | — | ~$8 | $99/year and $25 one-time. |
| Accounting, legal, privacy policy | — | $25–75 | Averaged over the year; front-loaded at launch. |
| **Total** | **~$5–10** | **~$100–250** | The model below uses $150/month fixed. |

### Kinmap unit economics (per paying family per month)

| | Value | How it's derived |
|---|---|---|
| List price | $8.99/month or $79.99/year | Prior hypothesis; still to be tested |
| Net after fees | **~$7.00 blended** | Web (Stripe ~3%) and app stores (15% small-business rate) on a mix of monthly and annual plans |
| AI cost | ~$0.03–0.10 *(v1: $0.30–1.50)* | 30–100 "talk" requests at ~2–4K input / 0.5–1.5K output tokens on **Haiku 5.5** is about $0.001 each. (On Sonnet 5.5 it would be $0.70–2.30.) Voice-to-text runs on the phone, so it's free. |
| Storage + bandwidth | ~$0.10–0.50 | A few GB per family, depending on video |
| Support + misc | ~$0.25 | |
| **Contribution** | **~$6.40** *(v1 model: $5.75)* | $7.00 − ~$0.60 (scenarios below still use $1.25) |

**Taxes:** to take home about $4,000/month as a sole proprietor, plan on about **$5,200/month pre-tax
profit** (15.3% self-employment tax plus income tax). Confirm with an accountant.

---

## 3. Kinmap: the cash engine

### Scenarios (months after paid launch)

The model ([`models/kinmap-model.mjs`](./models/kinmap-model.mjs)) adds new paying families each month, removes a
share to churn (cancellations), and subtracts costs and ad spend.

| Scenario | New paying families / month | Monthly churn | Ads | Covers costs | $1k/mo profit | ~$4k take-home | Families at 24 mo |
|---|---|---|---|---|---|---|---|
| **Conservative** | 8, growing 8%/mo, caps at 90 | 7% | none | month 4 | month 19 | **month 41** | ~330 |
| **Base** | 15, growing 10%/mo, caps at 150 | 5% | none | month 2 | month 11 | **month 24** | ~960 |
| **Base + small ads** | same + $500/mo at $60 cost to acquire a paying family (CAC) | 5% | $500/mo | month 5 | month 11 | **month 24** | ~1,070 |
| **Strong** | 30, growing 12%/mo, caps at 300 | 4% | $1,000/mo at $45 CAC | month 4 | month 7 | **month 15** | ~2,930 |

In no scenario does cumulative cash go more than ~$1,600 negative. **Kinmap's risk is your time, not
the infrastructure bill.**

**Ceiling to watch:** paying families level off at about *(new families per month) ÷ (monthly churn)*.
At 150 new a month and 5% churn, that's ~3,000 families. To grow past the ceiling, cut churn or raise the
monthly inflow.

### Revenue lines, in order

1. **Family subscription:** a free tier (one tree, capped AI "talk" uses, limited storage) and a paid
   family plan. Push the **annual plan**: it cuts churn sharply.
2. **Printed keepsakes:** tree posters and photo books, printed on demand. Typical margins are $20–40 per
   order, and **gift timing** matters (Mother's/Father's Day, Thanksgiving, December). This is lumpy but
   high-margin. Each $40-margin book adds the profit of about 7 family-months.
3. **Gift subscriptions:** "give Grandma a year of Kinmap". Buyers are often not the end users.
4. **Extra storage tiers** for video-heavy families.
5. **Lifetime / "preserve forever" plan:** good for cash flow, but only after you know storage costs.

### Data rules

Kinmap collects **the most sensitive data in the portfolio** (living people's names, birth dates,
relationships, photos, sometimes minors).

- **Never sell or share it,** including for ads, "anonymized" insights, or AI training. The Anthropic API
  doesn't train on API data by default; keep it that way contractually.
- **Shared SomeDude login:** sharing an account across your own apps is fine, but disclose it in the
  privacy policy and never pass family data across apps.
- **What you *may* collect:** first-party product analytics (sign-ups, activation, "talk" usage, upgrade
  and cancel events). You need these to measure conversion and churn. Keep them in your own database
  rather than a third-party tracker.
- **Minimize:** don't require birth dates for living people; let families mark people as private. Don't
  build features for children under 13 as account holders without COPPA review.

---

## 4. Afoot: the audience engine

Afoot earns from **businesses wanting to reach people**, never from users. As with Craigslist, users get
everything free and a few listing types are paid.

### Revenue lines, in order

| Line | Price idea | What it needs |
|---|---|---|
| **Featured event** (boost in rankings for a week) | $10–25 / event | Enough traffic that venues notice a difference |
| **Venue Pro** (own your listing, recurring-series editor, a views/clicks report) | $15–30 / month | Aggregate, cookieless analytics |
| **Neighborhood sponsor** (side-rail house ad, already built) | $100–300 / month per area | A traffic number to show sponsors |
| **Newsletter sponsor** ("this weekend near you") | $25–50 per 1,000 sends | A few thousand subscribers per area |
| Ticketing referrals | a few % per ticket | Partner programs; small |

### Rough timeline

| When | Milestone | Revenue |
|---|---|---|
| Nov–Dec 2026 | **Live on Vercel (private beta since Oct 23)** with 161 real LA / South Bay events and feedback; open to testers, then 1–2 areas; weekend-events focus | $0 |
| Q1 2027 | First 3–5 venues on a free Venue Pro trial; first sponsor conversations | $0–200 / mo |
| Q2–Q4 2027 | 5–10 areas; weekly newsletter; paid features on | $200–1,000 / mo |
| 2028 | 10–20k monthly visitors in LA | $1,000–3,000 / mo |

**Afoot's costs are tiny.** Ingesting 500–2,000 venues with Haiku 5.5 costs about **$5–30/month** if pages
are re-read only when they change, and batched. A small VM for JavaScript-heavy sites adds about $5–10.
The real cost is **your time selling to venues.**

### "Capture everything," applied to events, not people

The strategy is to **capture every small event** (calendars, newsletters, submissions, Instagram later),
not to capture user data:

- **Allowed:** aggregate, cookieless counts (searches per area, clicks per event). These become the venue
  reports and sponsor pitch. Vercel Analytics or Plausible (~$9/month) does this without cookies.
- **The lever you're choosing not to pull:** behavioral ad tracking would raise ad rates perhaps 2–3×. It
  would also break Afoot's privacy promise. And under California's privacy law (CCPA/CPRA) it brings
  cookie-consent banners and "Do Not Sell" obligations. Not worth it at this scale.
- **Accounts stay optional** (needed only for RSVP and chat). The fewer personal details stored, the
  lower the risk.

---

## 5. NoBucks (formerly Clover): the mission engine

NoBucks doesn't charge neighbors and doesn't take a cut of trades. It earns from **funders, organizations,
and local businesses**.

| Line | Range | Timing |
|---|---|---|
| **Community / civic-tech / mutual-aid grants** | $5k–50k each; plan on ~1 in 5–10 applications succeeding. Most require a nonprofit, so apply through a fiscal sponsor (5–10% fee) or partner | 3–9 months from application to money |
| **Organization pilots** (nonprofit, city program, university, HOA) | $2k–15k per pilot, or $100–500 / month license | after one working neighborhood |
| **Local business "village shops"** (see below) | $25–75 / month per business per neighborhood | after a pilot neighborhood has active users |
| Optional cosmetics | small | only if it never gates help |

### Local businesses: a natural fit with care

A local business could have a **shop building in the neighborhood village**. It could post offers ("10%
off for NoBucks neighbors"), host swap meets or skill shares, and sponsor the community pot with *goods or
space*. That's cute, local, and on-theme.

**The guardrail:** businesses buy **visibility, not the currency.** Never let a business buy, earn, or
redeem the in-app currency for money or goods. Once businesses trade it, NoBucks starts to look like a
commercial **barter exchange**, which brings IRS reporting duties (Form 1099-B). Time banks have avoided
that by keeping exchanges hour-for-hour between individuals. Confirm with an accountant before launching
any business feature.

### Rough timeline

| When | Milestone |
|---|---|
| Nov 2026 – Jan 2027 | Name chosen (NoBucks); find a pilot host (neighborhood council, library, faith community, or local nonprofit) and a fiscal sponsor; draft the one-page "for organizations" offer |
| Q1 2027 | Submit 2–3 grant applications |
| Q2–Q3 2027 | Pilot runs (with funding if a grant lands) |
| Q4 2027+ | First organization license or second pilot; village shops tested in the pilot neighborhood |

**Rule:** NoBucks should not draw on your personal runway beyond hosting (~$0–15/month). If no grant or
pilot is funded by the end of 2027, keep it running small and revisit.

---

## 6. Company calendar (base case)

| Quarter | Afoot | Kinmap | NoBucks | Company profit / month* |
|---|---|---|---|---|
| **Q4 2026** | ✅ Deployed (private) with real events + feedback; open to testers, soft launch | ✅ Android dev build + voice dictation; next: Supabase auth + data; free **Thanksgiving story-capture beta** | ✅ Renamed NoBucks; pilot host + fiscal sponsor | −$10 to −$50 |
| **Q1 2027** | Venue Pro trials, first sponsor talks | Private media, Stripe/store billing, **paid launch ~March** | Grant applications | −$50 to +$100 |
| **Q2 2027** | Newsletter; more areas | ~50–100 families | Pilot (if funded) | $100–500 |
| **Q3–Q4 2027** | $200–1,000/mo | ~150–260 families; **holiday keepsakes and gift subscriptions** | Org license / shops test | $700–2,000 |
| **2028** | $1,000–3,000/mo | ~260 → ~700 families | Grant-funded | $2,000–5,000 |
| **Spring 2029** | | **~950+ families** | | **~$5,200+ (≈ $4k take-home)** |

\*Base case, before your own pay. Afoot and NoBucks revenue is shown on top of Kinmap's.

Combined, Afoot and grant or pilot income could pull the $4k take-home point **3–6 months earlier**
than Kinmap alone. Don't count on it.

---

## 7. Levers you control

Ranked by how much each moves the date you can pay yourself.

| Lever | Effect | Notes |
|---|---|---|
| **Organic inflow** (families finding Kinmap free) | Largest. Doubling 15 → 30 per month moves $4k take-home from ~24 to ~15 months. | Genealogy and family-history groups, short videos of "talk to your tree", a referral credit, Thanksgiving and holiday family moments, invites inside each tree |
| **Churn** | 5% → 3% raises the ceiling from ~3,000 to ~5,000 families. | Annual plans, a monthly "memory prompt" email, collaborators who keep the tree alive |
| **Install-to-paid conversion** | Decides whether paid ads work at all (next row). | Free-tier limits, a clear moment when free runs out, paywall copy, trial length |
| **Ad spend** | Pays off only if the cost to acquire a paying family is under about **$60**. | Lifetime value of a family is ~$115 at 5% churn (~$190 at 3%). At $3 per install that needs ≥5% install-to-paid; at 2% it costs $150 per family and loses money. **Test with $300–500 only after you've measured conversion.** |
| **Price** | +$1/month adds ~14% profit per family if conversion holds. | Test $7.99 / $8.99 / $9.99 only once traffic is meaningful (hundreds of visitors per variant) |
| **Annual-plan share** | Less churn, cash up front, slightly lower monthly revenue. | Default to annual at checkout, with monthly as the option |
| **Keepsakes and gifts** | Lumpy, high-margin; big in Nov–Dec. | Build before holiday 2027 |
| **AI cost controls** | Small now (~$0.10/family on Haiku) but protects margin. | Haiku by default (done), per-request cost logging (done), local model for development (done), free-tier credit caps |
| **Your hours** | Everything above runs on them. | One launch at a time; Afoot sales and NoBucks grants in fixed weekly blocks |
| **Data collection** | Kinmap: none beyond your own analytics. Afoot: aggregate counts only. NoBucks: minimal verification data. | More data mostly means more risk here, not more revenue. Aggregate venue reports are Afoot's one safe data product. |

---

## 8. What to measure from day one

Replace the assumptions above with these numbers as soon as they exist:

1. **Kinmap:** visitors → sign-ups → families who complete a first "talk" → paid (each step's rate);
   monthly/annual mix; monthly churn; AI and storage cost per family (log token usage per request).
2. **Afoot:** weekly visitors per area, searches, outbound clicks per event, newsletter subscribers,
   venues contacted → venues paying.
3. **NoBucks:** active neighbors per pilot, completed exchanges per week, grant applications and outcomes.
4. **Company:** monthly costs by line; hours spent per app per week.

Re-run the model each quarter with real inputs.

---

## Appendix: the model

The scenarios in §3 come from [`models/kinmap-model.mjs`](./models/kinmap-model.mjs). Run
`node models/kinmap-model.mjs` after editing its inputs. Each month: `families = families × (1 − churn) + new organic + ad spend ÷ CAC`; organic inflow grows by the
growth rate up to its cap; profit = `families × ($7.00 − $1.25) − $150 − ad spend`. It ignores taxes on
the business side, refunds, seasonality, and the founder's time cost.
