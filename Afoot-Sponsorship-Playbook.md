# Afoot Sponsorship Playbook

**Owner:** Miguel Morales · **As of:** 2026-10-23 · **Status:** working plan (v1). Prices and response
rates below are estimates to test, not measured results.

How Afoot makes money from local businesses without tracking anyone: what to sell, when to start, how
to find and sign sponsors, who makes the ad, how to count results, how to get paid, and what to build.
Prices come from the [Revenue Timeline](./Company-Revenue-Timeline.md#4-afoot-the-audience-engine). The
venue pitch draft is in Claude Docs: https://claude.ai/artifact/QnVAntPLVBczUXCfWFBX9V

---

## 1. The short version

1. **Don't sell until you can show traffic.** Get Afoot public on `afoot.somedude.app`, count visits and
   clicks (section 6), and run free "founding sponsor" placements for 3–5 friendly venues while traffic
   grows.
2. **Sell in person first, then by phone and email.** Small venues buy from people they've met. A
   one-page offer, a 2-minute pitch, and a follow-up email are enough; no ad agency, no long contract.
3. **The ad is a text card you write for them.** Title, one line, a link, an emoji or logo. Five minutes
   of work, approved by the sponsor by email.
4. **Get paid with Stripe Payment Links** (no code), then build self-serve checkout once a few sponsors
   are paying.
5. **Report results with counts, not tracking:** how many times the card was shown and clicked, per
   week, emailed monthly; later a small sponsor dashboard.

---

## 2. What you're selling

Start with two products, add the rest only when someone asks for them.

| Product | What the business gets | Price to test | Start when |
|---|---|---|---|
| **Featured event** | Their event pinned near the top of results in its area for 7 days, labeled "Featured" | $10–25 per event-week | You have a few hundred visitors a month in that area |
| **Neighborhood sponsor** | The sponsor card in the side rail (desktop) and between list items (phone) for one area, e.g. "Torrance & South Bay" | $100–300 per month per area | ~1,000+ monthly visitors in that area |
| Venue Pro *(later)* | Claim and edit their listing, recurring-series editor, a monthly views/clicks report | $15–30 per month | 10+ venues asking to update their own listings |
| Newsletter sponsor *(later)* | One line in the weekly "this weekend near you" email | $25–50 per 1,000 sends | A few thousand subscribers in an area |

**Why flat-rate:** the site already promises "Simple, flat-rate, no tracking." Flat prices are easy for a
bar owner to say yes to, and you don't need ad-network technology to sell them. Revisit per-view pricing
only if large advertisers show up.

**Founding sponsor offer (first 3–5 businesses):** first month free, then 50% off for 3 months, in
exchange for honest feedback and permission to name them as an early supporter. It gets the card filled
(an empty "Your spot here" looks like nobody uses the site) and gives you real numbers for the next pitch.

---

## 3. Before the first paid sponsor (checklist)

- [ ] **Public site** on `afoot.somedude.app` (Deployment Protection off).
- [ ] **Vercel Pro ($20/month).** The free Hobby plan is non-commercial only.
- [ ] **Counting** of card views and clicks, and site visits per area (section 6).
- [ ] **Pages:** Privacy policy, Advertising terms (section 5), and an "Advertise" page with the offer and
      prices. Each "Sponsored" card links to "Why am I seeing this?" ("Because Afoot shows the same
      sponsor to everyone in this area. We don't track you.")
- [ ] **Business basics.** Confirm with an accountant before the first invoice:
  - Selling as yourself (sole proprietor) is the simplest start. Using the name "Afoot" or "SomeDude"
    means filing a Fictitious Business Name (DBA) with LA County.
  - An LLC separates personal liability but costs at least $800/year in California franchise tax. It's
    usually worth it once revenue is steady, not before.
  - Get a free EIN from the IRS (so you don't hand out your Social Security number) and open a separate
    business bank account. Stripe pays into that account.
  - Advertising services are generally not subject to California sales tax, but income is subject to
    income and self-employment tax: set aside ~25–30% until an accountant says otherwise.
- [ ] **Stripe account** in the business's name (section 7).

---

## 4. Finding and signing sponsors

### Who to approach first

Businesses that already run the small events Afoot lists, and that want more locals through the door:

1. **Venues already on Afoot** (breweries, bars with trivia or karaoke, comedy rooms, bookstores, cafés
   with open mics). They see their own events on the site, which makes the pitch concrete.
2. **Business improvement districts, main-street associations and chambers of commerce** (Downtown Long
   Beach, Old Torrance, Highland Park's York Blvd businesses). One deal covers many businesses, and they
   have marketing budgets.
3. **Neighborhood services that want locals:** climbing gyms, record stores, yoga studios, restaurants
   near venues.

Skip for now: national brands, political ads, anything that conflicts with the privacy promise.

### How: in person first, then phone and email

- **Walk in** at a slow hour (weekday 2–4 pm for bars and cafés; never during an event). Ask for the
  owner or whoever books events. Bring a phone with their event already on Afoot, plus a printed one-page
  offer.
- **The 2-minute pitch:** "I run Afoot, a free site that lists small local events the big ticket sites
  miss. Your trivia night is already on it [show it]. I'm signing a few founding sponsors in [area]: your
  card shows to everyone browsing events nearby, no tracking, and I send you the numbers every month.
  First month's free. Can I send you the details?"
- **Same-day follow-up email:** a screenshot of their listing, the offer and price, a mock-up of their card,
  and a link to the Advertising terms. Ask one question: "Want me to set it up for [date]?"
- **Phone and email** work better with businesses that have a marketing person (districts, chains of 2–5
  locations). Their newsletters and Instagram DMs are also good first contacts.
- **Expect** maybe 1 yes per 10–20 conversations at first (an estimate; track it). Budget 3–5 hours a week
  for sales, and keep a simple sheet: business, contact, date, outcome, next step.

### The contract

Most small advertisers expect a short **insertion order (IO)**, not a long contract:

- **One-page IO per deal:** sponsor's legal name and contact, product (e.g. "Neighborhood sponsor, South
  Bay"), start and end dates, price and billing (monthly, in advance), the ad text and link, and a line
  that they accept the Advertising terms.
- **Advertising terms**, published once on the site:
  - Afoot can decline or remove ads that break its rules.
  - The sponsor confirms they have the right to use their text, logo and link, and that the claims are
    true.
  - Placement, not results, is guaranteed. Results reports are counts, with no personal data.
  - Make-goods: if the card is down for more than a day, the sponsor gets the days added back.
  - Either side can cancel monthly placements with 14 days' notice. There are no refunds for days
    already shown.
  - Liability is limited to the amount paid.
- **Accepting by checkout or email is enough** for small deals: the Stripe payment page or a reply
  "approved" referencing the IO. Have a California business lawyer review the terms once (typically a
  few hundred dollars) before the first paid deal.

---

## 5. Who designs the ads

**You do, in minutes, because the format is fixed.** Afoot's ad is a native text card (already built in
`components/AdUnit.tsx`):

| Field | Limit | Example |
|---|---|---|
| Badge | 1 emoji or a small logo | 🍺 |
| Title | ~30 characters | Smog City Brewing |
| Line | ~90 characters | Trivia Tuesdays and live music Fridays in Old Torrance |
| Button | ~20 characters | See what's on → |
| Link | their site, event page or Instagram | — |

- **Workflow:** write it from what's on their website, send a screenshot mock-up, and get "approved" by
  email. Two rounds of edits are included; a business that wants a custom image provides its own.
- **Label:** every paid card says **"Sponsored"** (the FTC requires clear disclosure, and it matches
  Afoot's honesty).
- **Ad rules:** truthful claims only. Alcohol ads are fine for licensed venues, with no promotions aimed
  at under-21s. No political, gambling, adult, crypto/MLM, or medical-claims ads. Afoot keeps the right
  to decline anything.

---

## 6. Measuring performance without tracking people

What sponsors care about is "did people see it, and did they come?" Answer that with **counts**:

| Number | How it's counted | Privacy |
|---|---|---|
| **Views** (impressions) | The card reports once when at least half of it is on screen, batched per page | No cookies, IPs or device ids: just +1 for (campaign, day) |
| **Clicks** | The card links through `afoot.somedude.app/go/<campaign>`, which adds +1 and redirects | Same: no personal data |
| **Click rate** | clicks ÷ views | Native cards like this often get ~0.5–2% (an industry rule of thumb; Afoot's real rate is unknown) |
| **Area traffic** | Visits and searches per area, from cookieless analytics (Vercel Web Analytics or Plausible, ~$9/month) | Aggregate only |

**Proving people came through the door** (the number owners care about most), still without tracking:

- **UTM tags on the sponsor's link** (`?utm_source=afoot&utm_medium=sponsor&utm_campaign=southbay`): the
  visits then show up in the sponsor's own analytics. Afoot itself collects nothing extra.
- **A promo code or phrase** ("Say AFOOT for $1 off your first pint"): the venue counts redemptions at the
  bar. This is the most convincing number for small venues.
- **Ask the owner** at the monthly check-in: "Did anyone mention Afoot?" Write it down. Quotes become the
  next pitch.

Bots and crawlers are excluded by filtering known bot user-agents and by counting only views reported
from a real browser.

---

## 7. Getting paid

| Stage | How | Cost |
|---|---|---|
| **First 1–10 sponsors** | **Stripe Payment Links:** create a "South Bay sponsor, $150/month" subscription link and a "Featured event, $15" one-time link in the Stripe dashboard. Send the link with the IO. Stripe charges monthly and emails receipts. | Card processing ~2.9% + 30¢ per payment; no code |
| Businesses that want invoices | **Stripe Invoicing** (net-15 terms, pay by card or bank transfer) | A small per-invoice fee on top |
| **Self-serve (later)** | An "Advertise" page where a venue picks a product and area, writes its card, and pays with Stripe Checkout. A Stripe webhook turns the campaign on and off when payment starts or stops. | Same card fees; ~1–2 weeks to build |

- **Never take card numbers yourself.** Stripe holds them; Afoot stores only the Stripe customer and
  subscription ids.
- When a payment fails, Stripe retries it and emails the business. Pause the card after the final retry
  fails.

---

## 8. Analytics for sponsors

| Phase | What they get | Build effort |
|---|---|---|
| **1. Monthly email report** | Views, clicks, click rate per week, plus their promo-code tally if they share it, and a screenshot of the card. | A script that reads the counts and writes the email (~1 day) |
| **2. Sponsor dashboard** | Sign in with an email code (Afoot already has Supabase Auth). See the campaign's views and clicks by day, edit the card text for re-approval, manage billing through the Stripe customer portal. | ~1–2 weeks |
| **3. Venue Pro** | The same login also lets them edit their listing and recurring events, and shows views and clicks for each event. | Builds on phase 2 |

---

## 9. What to build in Afoot (in order)

**Status (2026-10-23, Afoot `112efeb`):** steps 1–4 are live. The sponsor tables were applied
2026-10-23 after a backup. An end-to-end test on the live database (since deleted) showed:
- the campaign was served for its area;
- a click redirected with UTM tags and a view was recorded (1 each);
- bot traffic and junk ids were ignored.

`ADMIN_TOKEN` is set in Vercel, so /admin on afoot.somedude.app needs the token. Stripe (step 5) and
the sponsor dashboard (step 6) are not built.
Known limits:
- Featured events only pin in list view. The live site reads events from Supabase (checked 2026-10-24),
  so they work there.
- Visit counts: Vercel Web Analytics is in the code (Afoot `47d7e11`); turn it on in the Vercel project's
  Analytics tab.
- A sponsor card loads a moment after the page.
- Counts can be inflated by someone deliberately reloading or clicking. No tracking is added to
  prevent that.

1. **Campaigns in the database:**
   - `sponsors`: business name, contact email, Stripe customer id.
   - `campaigns`: sponsor, product, area, start and end dates, card fields, status
     (draft / approved / live / paused / ended).
   - `campaign_daily`: campaign, day, views, clicks.

   `AdUnit` then reads the live campaigns for the visitor's area instead of the code list.
2. **Counting:** `/go/<campaign>` (count + redirect) and a small `/api/ads/seen` endpoint that takes a
   batch of campaign ids on page hide. Both only increment counters.
3. **Admin page:** add a sponsor and campaign, paste the approved card text, set dates, and see counts.
4. **Monthly report script**, which emails each sponsor their numbers.
5. **Stripe:** start with Payment Links (no code). Later, Checkout plus a webhook that sets campaign
   status from the subscription.
6. **Sponsor dashboard and Venue Pro**, once there are a handful of paying sponsors.

Steps 1–4 are about a week of work and are worth doing before the first conversation, because "here are
last month's numbers" is the whole pitch.

---

## 10. Next 30 days

| Week | Do |
|---|---|
| 1 | Put Afoot on `afoot.somedude.app` publicly; add cookieless analytics; build campaigns + counting (section 9, steps 1–3) |
| 2 | Write the Advertising terms, Privacy policy and Advertise page; one-page offer and IO template; Stripe account; accountant check (section 3) |
| 3 | Visit 10–15 venues already on Afoot in one area (South Bay or Silver Lake / Echo Park); sign 3–5 founding sponsors (free first month) |
| 4 | Send the first monthly reports; ask for feedback and quotes; set the first paid prices from what you learned |
