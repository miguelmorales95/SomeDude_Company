# Company Roadmap, Launch & Monetization Plan

**Owner:** Miguel Morales · **As of:** 2026-10-20 · **Status:** working draft (v1)

> Working company name: **SomeDude** (verify domain and trademark before public launch). This plan covers your first three apps — **Clover**, **Kinmap**, and **Afoot** — under one parent brand and a gradually shared data/auth foundation, with a cost-minimizing path to launch and monetize them.

---

## 1. TL;DR — the recommendation

**Do not launch all three at once.** Launch in sequence, cheapest-and-closest first, so each app funds (or de-risks) the next and your monthly burn stays near zero until something is making money.

**Recommended order:**

1. **Afoot first** — it's the closest to done, the cheapest to run, and it needs no login to go live. Fastest path to a real audience and real learning. *(Launch window: ~2–4 weeks.)*
2. **Build the shared account + database layer next** — introduce shared Supabase foundations without moving or breaking existing app data. *(~2–4 weeks, overlaps with Afoot being live.)*
3. **Kinmap second** — the clearest willingness-to-pay of the three (genealogy is a proven paid market). Put it on the shared layer, add auth + a real DB + media storage + billing, and **charge from day one**. *(~6–10 weeks after the shared layer.)*
4. **Clover last, as a mission / grant / B2B play** — the hardest to monetize directly (it's intentionally a non-cash mutual-aid economy). Pursue it through grants, your Project 180 LA ties, and selling pilots to nonprofits/cities — not consumer ads or fees. *(Pilot-ready in ~2–4 weeks; funding cycle 3–9 months.)*

**Why this order:** Afoot is inexpensive to operate and already has a GitHub repository; it can find an audience without burning cash. Kinmap is the first subscription candidate, but its production auth, database, and protected media still need to be implemented. Clover is the slowest to pay for itself, so it rides on grants and partnerships rather than your personal runway.

**Bottom line on burn:** you can keep total infrastructure cost **under ~$50/month** until Afoot has traction, and **under ~$200/month** even with Kinmap live and paying — see [Section 6](#6-cost-plan-minimize-burn).

---

## 2. The three apps at a glance

| App | What it is | Stack | Maturity | Live backend? | Pushed to GitHub? |
|---|---|---|---|---|---|
| **Afoot** | "Craigslist for events" — aggregates small, hard-to-find local events (karaoke, open mics, trivia) via AI ingestion; no login required, sponsor-supported | Next.js 15, React 19, Supabase (Postgres), Claude Haiku ingestion, Vercel | **Advanced MVP / near-launch** | Yes (Supabase) + full demo mode | **Yes** |
| **Kinmap** | Collaborative AI family tree — narrate relatives in plain speech → AI proposes reviewable "pull requests" to the tree | Expo/React Native (iOS+Android+web), Express, **JSON-file store (no DB)**, Claude Sonnet | **Early MVP (~40–50%)** | Partial (real API, file persistence) | **No** (not even `git init` yet) |
| **Clover** | Hyperlocal, cashless mutual-aid — neighbors trade skills/goods/time for "sprouts," growing a cozy Animal-Crossing-style village | React + TS + Vite, Express + Prisma + Postgres (Supabase), Claude (optional) | **Advanced prototype / MVP** | **Yes, verified E2E** on Supabase | Local commits only — **push pending** (auth) |

**The through-line:** all three are *AI-assisted tools for real life* — local events, family history, neighborhood mutual aid. They share three reusable primitives: **identity/people**, **location (lat/lng)**, and a **Claude extraction/parsing pipeline**. That overlap is exactly what justifies one company and one database.

---

## 3. Per-app viability, monetization & timeline (the breakdown you asked for)

Scoring is my honest read, 1–5 (5 = best). "Monetization viability" = how realistically *this specific app* can make money in its current form and market.

| App | Monetization viability | Time-to-launch | Time-to-first-revenue | Cost to run | Best first revenue model |
|---|---|---|---|---|---|
| **Afoot** | ★★★☆☆ (3) | ★★★★★ (fast) | ★★★☆☆ | Very low | Sponsorships + paid venue placement |
| **Kinmap** | ★★★★★ (5) | ★★★☆☆ | ★★★★☆ (can charge at launch) | Medium (AI + media) | Freemium family subscription |
| **Clover** | ★★☆☆☆ (2 consumer / 4 as B2B-grant) | ★★★★☆ | ★★☆☆☆ (grant cycles) | Low–medium | Grants + nonprofit/city/org licensing |

### 3a. Afoot — fastest to launch, slow-but-real to monetize

- **Why it's viable:** genuine unmet need (small venues publish only on their own sites/newsletters; big ticketing ignores free/recurring community events). It already works end-to-end in demo mode and against Supabase, has an admin review queue, a privacy-first ad system, and a social layer (private RSVP, gated chat, contact exchange). It's **the only one you could ship this month.**
- **The catch:** ad revenue is tiny until you have traffic, and the deliberate privacy stance (no tracking, originally no accounts) caps programmatic ad yield. Monetization will lag the audience by months.
- **Monetization, in order of realism:**
  1. **Local sponsorships / house ads** (already built) — sell the side-rail slot to a brewery/coffee shop/venue per neighborhood. Flat monthly rate, no ad network needed.
  2. **Paid venue/promoter placement** — "promote this event" to boost it in the `nearby_events` ranking (the ranking hook already exists). This is the highest-margin, most defensible line.
  3. **Weekly "what's on near you" newsletter** with a sponsor — the ingestion pipeline already produces the content.
  4. **Premium alerts / saved searches** (needs accounts, which now exist) — low priority.
  5. **Ticketing affiliate fees** — when events link out to paid tickets.
- **Realistic timeline:** public beta in **2–4 weeks** (deploy, seed ~30–50 LA venues via the discovery+ingest pipeline, point a domain at it). First sponsor/placement dollars **1–3 months** after you can show real local traffic.
- **Realistic revenue:** modest for a long time. Think $0 → low-hundreds/month in year one, scaling with neighborhoods covered and a sales motion to venues. **Treat it as an audience and learning engine, not your income.**

### 3b. Kinmap — the one people will actually pay for

- **Why it's viable:** genealogy is a **proven paid market** (Ancestry, FamilySearch, MyHeritage). Families pay for family history, storage, and keepsakes. Kinmap's wedge — *narrate your family in plain speech and AI drafts reviewable changes* — is a real differentiator against form-heavy incumbents, and the "pull requests for a family tree" model makes it safely collaborative. Emotional, sticky, giftable.
- **The catch:** it's the least technically finished (~40–50%). It has **no real auth** (dev header only), **no database** (a JSON file), no media access control, and **isn't in git yet**. Those are exactly the things the shared layer solves.
- **Monetization, in order of realism:**
  1. **Freemium family subscription** — Free: 1 tree, capped members/people, limited AI "talk" credits. Paid *family plan*: unlimited members, unlimited AI parsing, more storage, priority support. This is the core.
  2. **Media storage tiers** — photos/videos are your biggest cost; charge by GB (how iCloud/Google monetize families).
  3. **AI upsell** — auto-written biographies, story prompts, duplicate/conflict detection, real voice transcription.
  4. **Physical keepsakes** — printed family-tree posters and photo books generated from the data. High-margin, emotionally resonant, and a natural gift purchase.
  5. **Legacy / "preserve forever" lifetime plans** and GEDCOM import/export as a pro feature.
  - *Avoid ads* — trust and intimacy are the whole value prop.
- **AI cost is a feature, not just a cost:** because every "talk" call costs you Claude tokens, usage maps cleanly to tiered/metered pricing. Put a credit cap on free, sell more.
- **Realistic timeline:** **6–10 weeks** to a paid MVP *after* the shared auth+DB layer exists — migrate the JSON store to Postgres, wire real sign-in, move media to S3 with access control, add billing (Stripe), ship EAS builds to the app stores. **Revenue is possible at launch** because you charge from day one.
- **Realistic revenue:** the strongest of the three. Even a few hundred paying families at ~$5–10/mo is meaningful, and keepsakes add lumpy high-margin revenue.

### 3c. Clover — the most meaningful, the hardest to monetize directly

- **Why it's special:** it's the most polished and most fully built (verified end-to-end backend, rich village/game layer, moderation, events, admin tooling). It's mission-driven and aligned with your work at Project 180 LA.
- **The catch — and it's structural:** Clover is **intentionally a non-cash economy** (sprouts, anti-hoarding caps, a community pot). Taking a cut of trades or charging neighbors to participate would fight the entire ethos. So the usual consumer models (transaction fees, consumer subscriptions, targeted ads) are off the table or actively harmful.
- **How it actually makes money — B2B / mission, not B2C:**
  1. **Grants** — community-building, mutual-aid, mental-health, and civic-tech grants. Your nonprofit ties (Project 180 LA) are a real advantage here.
  2. **Nonprofit / city / HOA / university licensing** — sell Clover as white-labelable "community infrastructure" to organizations that want a local time-bank/mutual-aid network (precedents: Ithaca HOURS, time-credit programs, "BOOK IT!"-style org rewards — already noted in your Clover design doc).
  3. **Sponsored community pot / local-business goodwill** — a business funds the pot or sponsors a neighborhood (brand-safe, non-extractive).
  4. **Optional cosmetic premium** — purely decorative village/card extras, if ever, and only if it never gates mutual aid.
- **Realistic timeline:** a **pilot-ready build in 2–4 weeks** (it's close; it mainly needs the push unblocked and a pilot scope). But *monetization* runs on **grant and partnership cycles of 3–9 months**, not a consumer launch.
- **Realistic revenue:** low and slow as a consumer app; potentially solid as grant-funded or sold-to-orgs. **Run it as a mission/pilot funded by grants and partnerships, not from your personal runway.**

---

## 4. Unified architecture — one account, one database

The single most valuable unification decision: **one identity, one Postgres, shared services.** Here's the concrete shape.

### 4.1 One database, schema-per-app + a shared core

Use **one Supabase project** (you already run two of the three on Supabase). Inside it:

- **`core` schema (shared by all apps):**
  - `users` / `profiles` — the unified account (display name, avatar, phone, preferences). *This is the keystone.* Afoot already has Supabase Auth profiles; Clover's current auth is separate, and Kinmap still uses demo identity, so neither is unified yet.
  - `media` — one blob/asset registry for Kinmap photos/videos, Clover listing photos, and Afoot images. Access-controlled.
  - `places` — shared lat/lng + geocode cache + the haversine "nearby" pattern Afoot already uses; Clover's neighborhoods and Kinmap's person-places can reuse it.
  - `moderation` — `reports` + `blocks` (both Clover and Afoot already implement this; generalize once).
  - `notifications` — one in-app + push notification spine.
- **`clover` schema** — listings, threads/escrow/ledger, village, pacts, events, gratitudes, stickers, cards (your existing Prisma schema, namespaced).
- **`afoot` schema** — venues, events, event_occurrences, submissions, candidate_venues, newsletters, rsvps, contact_requests, messages (move from `public` only after a tested migration).
- **`kinmap` schema** — trees, memberships, invites, persons (+ child tables for fun_facts / timeline / places / media, migrated out of the current embedded JSON arrays), relationships, change_requests + operations.

**Benefits:** one login across all apps ("sign in once"), shared profile/avatar/media, data isolation per app via Postgres schemas + Row-Level Security, and one bill. **Risk to manage:** blast radius — a shared DB means one outage/mistake can touch all three. Mitigate with per-schema RLS, separate DB roles per app, nightly backups (Supabase Pro), and staging before prod.

### 4.2 Shared identity & auth

- Pick **one** auth provider and use it everywhere. **Supabase Auth** is the path of least resistance (Afoot already uses it; Kinmap can adopt it; Clover needs a deliberate migration). Alternatives (Clerk, Cognito) add cost/complexity for a solo founder.
- Kinmap's dev-only `x-user-id` header is replaced by real sessions; its `Membership.personId` self-link survives unchanged.

### 4.3 Shared services (write once, reuse)

- **`llm` service** — one Claude integration with per-app budget caps and model choice (Afoot uses Haiku for cheap extraction; Kinmap uses Sonnet for parsing). One API key, metered per app.
- **`media` service** — one private storage strategy + access control; do not expose family media through public URLs. Clover's existing S3 approach and Afoot's current images need review before standardization.
- **`geo` service** — Nominatim/OSM geocoding + the haversine nearby query (free, no key).
- **`moderation` service** — reports/blocks UI + queue.
- **Reusable IP worth generalizing:** Kinmap's **change-request / approval engine** ("propose → review → apply") is a generic, valuable pattern you could reuse (e.g., community edits in Clover, venue corrections in Afoot).

### 4.4 Repo & deploy topology

- **Git:** all three projects have GitHub remotes. Verify the latest changes are committed and pushed, and rename the Afoot GitHub repository from `whatsup` if you want its URL to match the local folder and product name.
- **Monorepo vs. multi-repo:** a light **monorepo** (or an npm workspace) for the shared `core`/`llm`/`media`/`geo`/`auth` packages, with each app consuming them, will save the most duplicated effort. If that's too heavy solo, start with a shared **`@company/shared` package** published privately and imported by all three.
- **Hosting:** Afoot on Vercel (hobby→Pro). Clover web on Vercel or S3+CloudFront; Clover API on a small container (App Runner/Fly/Render). Kinmap via Expo/EAS to the app stores + web. One Supabase project only after app-by-app isolation and backups are verified.

---

## 5. Launch & monetization roadmap (phased)

Timeboxes assume solo, part-time-to-full-time effort. Adjust to your real hours.

### Phase 0 — Foundations (Weeks 0–2) · cost ~$0–50/mo
- [ ] Decide the company name + buy the domains (see §9).
- [ ] Create the GitHub org; **init Kinmap's repo**; **finish Clover's push**.
- [ ] Stand up the shared Supabase project; sketch the `core` schema (users/profiles/media/places/moderation/notifications).
- [ ] Set a Claude spend cap and one API key with per-app budgets.

### Phase 1 — Ship Afoot (Weeks 2–5) · cost ~$25–75/mo
- [ ] Deploy Afoot to Vercel against Supabase; point a domain at it.
- [ ] Run discovery + ingest to seed ~30–50 real LA venues; spot-check recurrence.
- [ ] Turn on the **house ad** slot; line up 1–2 local sponsors.
- [ ] Soft-launch in 1–2 LA neighborhoods; gather usage + venue feedback.
- **Milestone:** a live, public product with real local events and first sponsor conversations.

### Phase 2 — Shared account + DB layer (Weeks 4–8, overlaps) · cost ~$25–75/mo
- [ ] Finalize `core.users/profiles` + Supabase Auth as the single sign-on.
- [ ] Stand up the shared `media` (S3) and `geo` services.
- [ ] Migrate Afoot + Clover onto `core` identity after staging and auth tests.
- **Milestone:** one login works across the apps that exist.

### Phase 3 — Monetize Kinmap (Weeks 8–18) · cost ~$75–200/mo
- [ ] Migrate Kinmap's JSON store → `kinmap` Postgres schema (persons + child tables).
- [ ] Replace dev auth with `core` sign-in; move media to S3 with access control.
- [ ] Add **Stripe billing** + the freemium tiers + AI credit caps.
- [ ] Ship EAS builds to the App Store + Google Play (Apple $99/yr, Google $25 once).
- [ ] Launch with a paywall from day one; invite beta families.
- **Milestone:** first paying customers. This is your first real revenue line.

### Phase 4 — Clover pilot & funding (parallel, Weeks 2–30) · cost low, grant-funded
- [ ] Finish the push; scope a single-neighborhood or single-org **pilot** (Project 180 LA is a natural first partner).
- [ ] Write 2–3 grant applications (mutual-aid / civic-tech / mental-health).
- [ ] Draft a 1-page "Clover for organizations" offer (license/white-label).
- **Milestone:** a funded pilot or first org license — *not* a mass consumer launch.

### Phase 5 — Company layer (ongoing)
- [ ] Shared landing site ("one company, three apps"), shared brand, shared analytics.
- [ ] Decide app #4 only after one of the three is paying.

---

## 6. Cost plan (minimize burn)

Everything here favors free tiers and shared infrastructure. One Supabase, one S3, one Claude key.

| Item | Phase 0–1 | With Kinmap live | Notes |
|---|---|---|---|
| Supabase | $0 (free) | $25/mo (Pro) | Pro when you need backups/more rows; shared by all 3 |
| Vercel | $0 (hobby) | $0–20/mo | Afoot; Pro only if limits hit |
| Claude API | $5–30/mo (capped) | $30–80/mo | Haiku for Afoot ingest; Sonnet for Kinmap; **set hard caps** |
| S3 media | ~$1–10/mo | $5–25/mo | Pay per GB; mostly Kinmap photos/videos |
| Domains | ~$12/yr each | — | Company + 3 app domains |
| App stores | — | $99/yr (Apple) + $25 once (Google) | Only when Kinmap ships native |
| Clover API host | $0–7/mo | $7–15/mo | Small container (Fly/Render/App Runner free-ish tiers) |
| **Rough total** | **~$0–50/mo** | **~$75–200/mo** | Kinmap revenue should cover this quickly |

**Cost discipline rules:** (1) one shared Supabase + one S3 + one Claude key, never per-app duplicates; (2) hard budget caps on Claude; (3) don't pay for a tier until a free tier actually breaks; (4) don't ship native (app-store fees) until Kinmap is ready to charge; (5) Clover's costs should be covered by grants, not you.

---

## 6b. Company monetization model

Each app earns in a way true to its users; the company is the portfolio that balances them.

- **Kinmap = the cash engine.** Recurring family subscriptions + storage tiers + high-margin printed keepsakes. This is what pays the bills and funds everything else.
- **Afoot = the audience engine.** Sponsorships + paid venue placement; low revenue per user but cheap to run, and top-of-funnel for the brand and the shared account.
- **Clover = the mission engine.** Grants + nonprofit/city/org licensing; it earns through funders and partners, not consumers, and gives the company credibility and purpose.

**What the shared company layer adds:**
- **One account, cross-sell.** A single sign-in across all three means an Afoot user can be nudged into Kinmap, and so on. Later, a bundled company **"Pro"** (premium across apps for one price) becomes possible.
- **Shared infrastructure = better margins.** One Supabase, one S3, one budget-capped Claude key spread across three products lowers the unit cost of each.
- **Reusable IP as leverage.** The Claude extraction pipeline, the change-request/approval engine, and the design system are built once and amortized across apps (and future app #4).
- **Portfolio risk balance.** Fast-but-small (Afoot), slow-but-lucrative (Kinmap), and mission/grant (Clover) don't rise and fall together.

**Guardrail:** never bolt an extractive model onto an app whose trust *is* the product — no tracking ads on Kinmap or Clover, no fees on Clover's mutual aid. Monetize each app only in its own grain.

---

## 7. Why not launch all three at once

- **Focus:** solo founders ship one thing well, not three things half-way. Three simultaneous launches = three half-launches.
- **Cost:** staggering keeps you on free tiers longest and spreads the only real variable cost (Claude + media) over time.
- **Dependency order:** Kinmap needs production auth and a database; build that safely alongside Afoot's existing audience work.
- **Learning compounds:** what you learn shipping Afoot (deploy, SEO/local growth, sponsor sales) makes the Kinmap and Clover launches better and cheaper.
- **Different clocks:** Afoot = audience play, Kinmap = revenue play, Clover = grant/mission play. They shouldn't share a launch date because they don't share a success metric.

---

## 8. Risks & open decisions

- **Shared-DB blast radius** — one DB touching all three apps concentrates risk. Mitigate with per-schema RLS, per-app DB roles, backups, staging.
- **Kinmap has no backup** — it's not in git; a drive failure loses it. *Init the repo this week.*
- **Clover push still blocked** — resolve the GitHub credential issue so Clover is backed up and shareable.
- **Claude spend** — uncapped AI usage is the one line that can surprise you; cap it per app.
- **Privacy posture** — Afoot's no-tracking stance and Clover's mutual-aid ethos both limit ad models; lean on sponsorship/B2B/subscription instead.
- **Your time** — three apps + a day job is a lot. The sequence above is designed so you're only ever actively launching one.

---

## 9. Naming & brand

The working umbrella name is **SomeDude**; check domain and trademark availability before public use. The three apps share a theme: **AI-assisted tools for real-life community, place, and relationships.**

- Keep each app's own name and personality; SomeDude is the quiet parent brand.
- Founder storytelling can be personal and honest without making private family details part of the product or marketing.

See the companion **[Company Design System](./Company-Design-System.md)** for the shared visual language and how each app expresses it.

---

## 10. Immediate next steps (this week)

1. Verify the SomeDude name + buy domains only after availability checks.
2. Keep all three existing GitHub repositories backed up and current.
3. Deploy Afoot to Vercel + a domain; seed LA venues.
4. Apply the first `core` + `kinmap` schema migration in Supabase after reviewing it.
5. Read the [Company Design System](./Company-Design-System.md) and apply the shared tokens as you touch each app.
