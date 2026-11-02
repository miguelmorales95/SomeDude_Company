# Kinmap decisions journal

**Owner:** Miguel Morales · **Started:** 2026-11-01

This is the place to write down what's happening with Kinmap's money and what to do about it. Add
numbers, notes and decisions here as you go. Once a month, read it top to bottom (about 30 minutes) and
answer the review questions at the end. The plan itself lives in
[Kinmap-Monetization.md](./Kinmap-Monetization.md); this file is the record of what actually happened.

Write freely: short notes, guesses and "not sure yet" are all fine. Date everything.

---

## 1. What we're selling right now

Update this whenever a price or package changes, and log the change in §5.

| What | Price | Since |
|---|---|---|
| Year Family Project | $12.99 a month × 12 ($139 paid once) · Keep forever · $30 print credit | 2026-11-01 (planned) |
| 6-Month Family Project | $14.99 a month × 6 ($84 paid once) · Keep forever · $15 print credit | 2026-11-01 (planned) |
| Founding price (first 100) | Year $9.99 × 12 ($109 once) · 6-Month $11.99 × 6 ($69 once) | 2026-11-01 (planned) |
| Reopen editing | $9.99 a month | planned |
| Keep forever alone | $59 once | planned |
| Hardcover book · calendar · binder · poster | $59 · $35 · $29 · $39, US shipping included | planned |
| Free | unlimited people, **5 members**, 1 GB, ~30 AI uses a month, **kept 1 year after the last activity** | 2026-11-01 |

Print partners: books **RPI Print**; calendars and binders **Lulu**; posters **Printful or Prodigi**.

---

## 2. Monthly scoreboard

Fill in one row per month, from the Stripe dashboard, the app's admin numbers and the partner invoices.
Leave a cell blank if you don't know it yet. Rates are worked out in §2b.

| Month | Site visitors | New Free trees | Active trees (used this month) | Year projects sold | 6-Month sold | Gifts | Founding | Stopped paying partway | Reopenings | Books | Calendars | Binders | Posters |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 2026-11 | | | | | | | | | | | | | |
| 2026-12 | | | | | | | | | | | | | |
| 2027-01 | | | | | | | | | | | | | |

| Month | Money in (Stripe, after refunds) | Card fees | Print partner costs | AI | Supabase + Vercel + other tools | **Profit** | Hours spent on Kinmap | Profit per hour |
|---|---|---|---|---|---|---|---|---|
| 2026-11 | | | | | | | | |
| 2026-12 | | | | | | | | |
| 2027-01 | | | | | | | | |

### 2b. The rates that decide things

Work these out each month from the tables above. The model's guesses are in brackets: replace them with
yours.

| Rate | How to work it out | Model guess | Actual |
|---|---|---|---|
| Visitor → Free tree | new Free trees ÷ visitors | (unknown) | |
| Free tree → Project | projects sold ÷ new Free trees (same or previous month) | (unknown) | |
| Year vs 6-Month | Year ÷ all projects | 60% | |
| Gifts | gifts ÷ all projects | (unknown) | |
| Stopped paying partway | stopped ÷ projects in progress | (unknown) | |
| Print orders | orders beyond credits ÷ all families with a project or Keep forever | 4% a month | |
| Profit per print order | (print revenue − partner cost − fees) ÷ orders | ~$18 | |
| Reopenings | reopenings ÷ finished families, per year | 15% | |
| AI + storage per building family | (AI + storage) ÷ families building | ~$0.50–1 a month | |
| Support | emails or messages per 10 families | (unknown) | |

---

## 3. Triggers: when to make a decision

Agreed ahead of time, so decisions follow the numbers, not the mood of the week.

| If… | …then consider | Status |
|---|---|---|
| Free → Project is under ~3% after 3 months with 100+ Free trees | Test a cheaper entry (6-Month at $9.99) or a monthly plan without an end; ask 10 Free families why they didn't buy | |
| More than 10% of projects stop paying partway | Shorten to the 6-Month default; make pay-once cheaper; ask why | |
| Posters + binders reach ~25–30 a month for 3 months **and** a month's profit covers the ~$4,700 of machines | Buy the poster printer and coil binder (Monetization §10) | |
| Partner cost per book rises above ~$30 | Get quotes from Axiom / Harman Press; compare | |
| AI + storage per building family goes over ~$2 a month | Lower AI caps or nudge toward the photo manager | |
| Hours on Kinmap exceed what the day job allows, or profit per hour is under ~$20 for 3 months | Cut a product, automate, or raise prices | |
| Gifts are over 30% of sales in Nov–Dec | Push gift cards harder before Mother's Day, Father's Day, Grandparents Day | |
| Founding spots sell out | Close the founding price; move to the regular price | |

---

## 4. Experiments

One row per thing you try. Keep each small and time-boxed.

| Started | What we tried | What we expected | Ends | What happened | Keep / change / drop |
|---|---|---|---|---|---|
| 2026-11 | Founding pre-sale page (kinmap.somedude.app/founding) | 10–30 families reserve before Jan 31 | 2027-01-31 | | |
| | | | | | |

---

## 5. Decision log

Newest first. Write the decision, why, and when to look at it again.

| Date | Decision | Why | Look again |
|---|---|---|---|
| 2026-11-01 | **Free: share with up to 5 relatives; a Free tree is kept 1 year after the last activity** (warned 30 days ahead; projects and kept-forever trees never deleted) | Keeps Free cheap and gives a clear reason to start a project, without surprising anyone | After 3 months: watch Free → Project and complaints |
| 2026-11-01 | **Kinmap keeps its own sign-in and data**, separate from Afoot and NoBucks | Little overlap between audiences; a problem in one app shouldn't reach family data | Only if many families ask to use the other apps |
| 2026-11-01 | Sell **Family Projects** paid monthly (Year $12.99 × 12, 6-Month $14.99 × 6), each ending in **Keep forever** with a print credit, instead of an open-ended subscription | Matches how families work (a season of gathering, then years of looking); easier to say yes to; works as a gift; model shows cash sooner (Revenue Timeline §3c) | After the first 50 projects |
| 2026-11-01 | **Printed keepsakes for anyone, any time**: book $59, calendar $35, binder $29, poster $39, shipping included | A first purchase that doesn't need a plan; strong in Nov–Dec | After 3 months of orders |
| 2026-11-01 | Use **print partners** (RPI books; Lulu calendars and binders; Printful/Prodigi posters). Posters and binders move **in house only when the business can pay for the machines and has steady volume** | No equipment risk, no shipping work with a day job | Trigger in §3 |
| 2026-11-01 | **Keep the free keepsake export**; make print files order-only (no free downloadable poster/book/calendar PDFs; a home-print binder stays included with projects) | Data belongs to families; print files are a product | Before building the order flow |
| 2026-11-01 | **No limit on people** in any tier; Free limits are on storage, AI and members | People cost almost nothing; storage and AI cost money | After 3 months |
| 2026-11-01 | **Don't move the tree onto phones (end-to-end encryption) before launch**; add an offline encrypted copy and automatic keepsake backups later | Little cost saving, risk of losing families' data, months of work (Monetization §13) | When families ask for it |
| 2026-11-01 | **Founding pre-sale** this holiday season for the first 100 families, with no fixed delivery date for prints | Cash and demand data before launch; no promise we can miss | 2027-01-31 |

---

## 6. Notes inbox

Anything: what a family said, an idea in the shower, a competitor's price, a complaint. Date it. Move it
into §4 or §5 when it turns into something.

- 2026-11-01 ·

---

## 7. Monthly review questions

Answer these in a few lines at the bottom of each month's entry.

1. What made money this month, and what took the most hours?
2. Which rate in §2b moved most, and do I believe it?
3. Did anything hit a trigger in §3?
4. What did families ask for or complain about most?
5. One thing to stop, one thing to try next month.
6. Am I still OK on time with the day job?

### Reviews

- **2026-11** ·
