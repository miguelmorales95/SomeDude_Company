# Company Roadmap, Launch & Monetization Plan

**Owner:** Miguel Morales · **As of:** 2026-10-24 · **Status:** working draft (v1.5)

> **Money and timing:** see [Revenue Timeline & Path to Self-Sustainability](./Company-Revenue-Timeline.md)
> for when each app is likely to earn, how long until the business can pay a salary, and which levers
> change that.

> Working company name: **SomeDude** (verify domain and trademark before public launch). This plan covers your first three apps — **NoBucks**, **Kinmap**, and **Afoot** — under one parent brand and a gradually shared data/auth foundation, with a cost-minimizing path to launch and monetize them.

---

## 1. TL;DR — the recommendation

**Do not launch all three at once.** Launch in sequence, cheapest-and-closest first, so each app funds (or de-risks) the next and your monthly burn stays near zero until something is making money.

**Recommended order:**

1. **Afoot first** — it's the closest to done, the cheapest to run, and it needs no login to go live. Fastest path to a real audience and real learning. *(Launch window: ~2–4 weeks.)*
2. **Build the shared account + database layer next** — introduce shared Supabase foundations without moving or breaking existing app data. *(~2–4 weeks, overlaps with Afoot being live.)*
3. **Kinmap second** — the clearest willingness-to-pay of the three (genealogy is a proven paid market). Put it on the shared layer, add auth + a real DB + media storage + billing, and **charge from day one**. *(~6–10 weeks after the shared layer.)*
4. **NoBucks last, as a mission / grant / B2B play** — the hardest to monetize directly (it's intentionally a non-cash mutual-aid economy). Pursue it through grants (via a fiscal sponsor or nonprofit partner), local-business "village shops", and selling pilots to nonprofits/cities — not consumer ads or fees. *(Pilot-ready in ~2–4 weeks; funding cycle 3–9 months.)*

**Why this order:** Afoot is inexpensive to operate and already has a GitHub repository; it can find an audience without burning cash. Kinmap is the first subscription candidate, but its production auth, database, and protected media still need to be implemented. NoBucks is the slowest to pay for itself, so it rides on grants and partnerships rather than your personal runway.

**Bottom line on burn:** you can keep total infrastructure cost **under ~$50/month** until Afoot has traction, and **under ~$200/month** even with Kinmap live and paying — see [Section 6](#6-cost-plan-minimize-burn).

---

## 2. The three apps at a glance

| App | What it is | Stack | Maturity | Live backend? | Pushed to GitHub? |
|---|---|---|---|---|---|
| **Afoot** | "Craigslist for events" — aggregates small, hard-to-find local events (karaoke, open mics, trivia) via AI ingestion; no login required, sponsor-supported | Next.js 15, React 19, Supabase (`afoot` schema), Claude Haiku ingestion, Vercel | **Advanced MVP / private beta on Vercel** (161 researched events; flags, tips and checks live) | **Yes:** Supabase `afoot` schema since 2026-10-23 | **Yes** (repo renamed `Afoot`) |
| **Kinmap** | Collaborative AI family tree — narrate relatives in plain speech → AI proposes reviewable "pull requests" to the tree | Expo/React Native (iOS+Android+web), Express, Supabase (Postgres, Auth, Storage); AI via Claude Haiku 5.5 or a free local model (Ollama) | **Early MVP (~50%)**; Android development build with live voice dictation in testing since 2026-10-23 | **Yes, in development:** its own Supabase project (`puskxnikpiusgvtzhire`) for data, email sign-in and private media since 2026-10-23; no real families yet | **Yes** |
| **NoBucks** | Hyperlocal, cashless mutual-aid — neighbors trade skills/goods/time for "sprouts," growing a cozy Animal-Crossing-style village | React + TS + Vite, Express + Prisma + Postgres (Supabase), Claude (optional) | **Advanced prototype / MVP** (web app still runs on an in-memory store; the API is separate). Renamed from Clover 2026-10-23 | API tables in Supabase `public` (a few test rows) | **Yes** (repo renamed `NoBucks`) |

**The through-line:** all three are *AI-assisted tools for real life* — local events, family history, neighborhood mutual aid. They share three reusable primitives: **identity/people**, **location (lat/lng)**, and a **Claude extraction/parsing pipeline**. That overlap is exactly what justifies one company and one database.

---

## 3. Per-app viability, monetization & timeline (the breakdown you asked for)

Scoring is my honest read, 1–5 (5 = best). "Monetization viability" = how realistically *this specific app* can make money in its current form and market.

| App | Monetization viability | Time-to-launch | Time-to-first-revenue | Cost to run | Best first revenue model |
|---|---|---|---|---|---|
| **Afoot** | ★★★☆☆ (3) | ★★★★★ (fast) | ★★★☆☆ | Very low | Sponsorships + paid venue placement |
| **Kinmap** | ★★★★★ (5) | ★★★☆☆ | ★★★★☆ (can charge at launch) | Medium (AI + media) | Freemium family subscription |
| **NoBucks** | ★★☆☆☆ (2 consumer / 4 as B2B-grant) | ★★★★☆ | ★★☆☆☆ (grant cycles) | Low–medium | Grants + nonprofit/city/org licensing |

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

### 3c. NoBucks — the most meaningful, the hardest to monetize directly

- **Why it's special:** it's the most polished and most fully built (verified end-to-end backend, rich village/game layer, moderation, events, admin tooling). It's mission-driven: neighbors helping neighbors without money.
- **The catch — and it's structural:** NoBucks is **intentionally a non-cash economy** (sprouts, anti-hoarding caps, a community pot). Taking a cut of trades or charging neighbors to participate would fight the entire ethos. So the usual consumer models (transaction fees, consumer subscriptions, targeted ads) are off the table or actively harmful.
- **How it actually makes money — B2B / mission, not B2C:**
  1. **Grants** — community-building, mutual-aid, mental-health, and civic-tech grants. Many funders only pay registered nonprofits, so as a private founder you would apply through a **fiscal sponsor** (a nonprofit that receives the grant for the project, usually for a 5–10% fee) or with a nonprofit partner. Some civic-tech and innovation funds do accept individuals or small companies.
  2. **Nonprofit / city / HOA / university licensing** — sell NoBucks as white-labelable "community infrastructure" to organizations that want a local time-bank/mutual-aid network (precedents: Ithaca HOURS, time-credit programs, "BOOK IT!"-style org rewards — already noted in your NoBucks design doc).
  3. **Sponsored community pot / local-business goodwill** — a business funds the pot or sponsors a neighborhood (brand-safe, non-extractive).
  4. **Optional cosmetic premium** — purely decorative village/card extras, if ever, and only if it never gates mutual aid.
- **Realistic timeline:** a **pilot-ready build in 2–4 weeks** (it's close; it mainly needs the push unblocked and a pilot scope). But *monetization* runs on **grant and partnership cycles of 3–9 months**, not a consumer launch.
- **Realistic revenue:** low and slow as a consumer app; potentially solid as grant-funded or sold-to-orgs. **Run it as a mission/pilot funded by grants and partnerships, not from your personal runway.**

---

## 4. Unified architecture — one account, one database

> **Superseded 2026-10-23:** each app now gets its own Supabase and Vercel project (see Phase 2). The shared `core` schema and single sign-on below are no longer the plan; keep reading for the shared *code and patterns* (LLM budgets, media access control, the change-request engine).

The single most valuable unification decision: **one identity, one Postgres, shared services.** Here's the concrete shape.

### 4.1 One database, schema-per-app + a shared core

Use **one Supabase project** (you already run two of the three on Supabase). Inside it:

- **`core` schema (shared by all apps):**
  - `users` / `profiles` — the unified account (display name, avatar, phone, preferences). *This is the keystone.* Afoot already has Supabase Auth profiles; NoBucks's current auth is separate, and Kinmap still uses demo identity, so neither is unified yet.
  - `media` — one blob/asset registry for Kinmap photos/videos, NoBucks listing photos, and Afoot images. Access-controlled.
  - `places` — shared lat/lng + geocode cache + the haversine "nearby" pattern Afoot already uses; NoBucks's neighborhoods and Kinmap's person-places can reuse it.
  - `moderation` — `reports` + `blocks` (both NoBucks and Afoot already implement this; generalize once).
  - `notifications` — one in-app + push notification spine.
- **`clover` schema** — listings, threads/escrow/ledger, village, pacts, events, gratitudes, stickers, cards (your existing Prisma schema, namespaced).
- **`afoot` schema** — venues, events, event_occurrences, submissions, candidate_venues, newsletters, rsvps, contact_requests, messages (move from `public` only after a tested migration).
- **`kinmap` schema** — trees, memberships, invites, persons (+ child tables for fun_facts / timeline / places / media, migrated out of the current embedded JSON arrays), relationships, change_requests + operations.

**Benefits:** one login across all apps ("sign in once"), shared profile/avatar/media, data isolation per app via Postgres schemas + Row-Level Security, and one bill. **Risk to manage:** blast radius — a shared DB means one outage/mistake can touch all three. Mitigate with per-schema RLS, separate DB roles per app, nightly backups (Supabase Pro), and staging before prod.

### 4.2 Shared identity & auth

- Pick **one** auth provider and use it everywhere. **Supabase Auth** is the path of least resistance (Afoot already uses it; Kinmap can adopt it; NoBucks needs a deliberate migration). Alternatives (Clerk, Cognito) add cost/complexity for a solo founder.
- Kinmap's dev-only `x-user-id` header is replaced by real sessions; its `Membership.personId` self-link survives unchanged.

### 4.3 Shared services (write once, reuse)

- **`llm` service** — one Claude integration with per-app budget caps and model choice (Afoot uses Haiku for cheap extraction; Kinmap uses Sonnet for parsing). One API key, metered per app.
- **`media` service** — one private storage strategy + access control; do not expose family media through public URLs. NoBucks's existing S3 approach and Afoot's current images need review before standardization.
- **`geo` service** — Nominatim/OSM geocoding + the haversine nearby query (free, no key).
- **`moderation` service** — reports/blocks UI + queue.
- **Reusable IP worth generalizing:** Kinmap's **change-request / approval engine** ("propose → review → apply") is a generic, valuable pattern you could reuse (e.g., community edits in NoBucks, venue corrections in Afoot).

### 4.4 Repo & deploy topology

- **Git:** all three projects have GitHub remotes; the Afoot repository was renamed from `whatsup` to `Afoot` on 2026-10-23.
- **Monorepo vs. multi-repo:** a light **monorepo** (or an npm workspace) for the shared `core`/`llm`/`media`/`geo`/`auth` packages, with each app consuming them, will save the most duplicated effort. If that's too heavy solo, start with a shared **`@company/shared` package** published privately and imported by all three.
- **Hosting:** Afoot on Vercel (hobby→Pro). NoBucks web on Vercel or S3+CloudFront; NoBucks API on a small container (App Runner/Fly/Render). Kinmap via Expo/EAS to the app stores + web. One Supabase project only after app-by-app isolation and backups are verified.

---

## 5. Launch & monetization roadmap (phased)

Timeboxes assume solo, part-time-to-full-time effort. Adjust to your real hours.

### Phase 0 — Foundations (Weeks 0–2) · cost ~$0–50/mo
- [x] Buy the company domain: **`somedude.app`** on Cloudflare (2026-10-23), with Cloudflare Email Routing for incoming mail and `kinmap.somedude.app` / `afoot.somedude.app` subdomains set up. Trademark clearance for the app names is still open (see §9).
- [x] Kinmap and NoBucks repositories are on GitHub and in sync (verified 2026-10-23). A GitHub org is still optional.
- [x] Stand up Supabase. *Superseded by the per-app decision in Phase 2: the `core` schema was never applied.*
- [x] Set a Claude spend cap and one API key with per-app budgets. *Founder-reported.*

### Phase 1 — Ship Afoot (Weeks 2–5) · cost ~$25–75/mo
- [x] Deploy Afoot to Vercel (2026-10-23), reading from Supabase. *Still private behind Vercel Deployment Protection; point a domain at it once purchased.* **The Hobby plan is non-commercial:** move to Pro ($20/mo) before any sponsor or paid placement goes live.
- [x] Test with real local events: 161 researched, source-linked events (LA-wide plus South Bay / Long Beach, Oct 23–Nov 1) imported into the `afoot` schema; every venue pin checked against its ZIP.
- [x] Accuracy loop: Craigslist-style ⚑ reports, after-event "heads up" tips, one-tap checks on uncertain details, and a flagged-events queue in `/admin`. No login; hashed device ids, no IPs.
- [x] Maps without API keys (2026-10-23, Afoot `ddaf70d`): CARTO's tiles started requiring a key, so map mode moved to **OpenFreeMap** (free, no key, commercial use allowed). Each event card now shows the start time over a small street map (main roads, freeway badges, up to three named streets nearest the venue, a pin; Afoot `7a9696f`) drawn on Afoot's own server and cached, so the list contacts no third party. The map route only serves Southern California.
- [x] **Public at https://afoot.somedude.app** (2026-10-23): A record `afoot → 76.76.21.21` in Cloudflare (grey cloud; an A record because Email Routing's MX records sit on the same name). Preview deployments stay behind Vercel Deployment Protection. Admin routes refuse the public until `ADMIN_TOKEN` is set (verified: 401).
- [ ] Refresh events weekly until automatic ingestion covers the best sources (Arts Council for Long Beach, Downtown Long Beach, Harvelle's, torranceca.gov, Palos Verdes Magazine, LAPL, indie bookstores).
- [ ] AI clean-up job a few times a day: re-check uncertain events against their source pages with Haiku 5.5 (about 2–5¢ per run). Needs Vercel Pro, GitHub Actions, or a local machine to schedule more than once a day.
- [x] Rename the app from "WhatsUp LA" to Afoot in the code, site title, and GitHub repository (2026-10-23). The contact email waits for a domain.
- [ ] Run discovery + ingest to seed ~30–50 real LA venues; spot-check recurrence. **Venues done
      (2026-10-27, after a backup):** 32 new venues from `data/la-venues.csv` (Afoot `f4eff2e`) promoted and
      geocoded; 205 venues in all. **Events not yet:** the local model (Ollama, no GPU) takes over 5 minutes
      a page, so ingest runs on Vercel with Haiku once `CRON_SECRET` is set: daily, longest-waiting venues
      first, 4 minutes a run (Afoot `60ad0a3`), so all 32 take about 2–3 days. Many venue pages load their
      calendar with scripts (The Baked Potato, The World Stage): those need the headless fallback or a
      different events URL; check `/admin` and the cron results after the first runs. The 173 older
      venues are `source = 'manual'` and are never re-ingested.
- [x] **Venue check (2026-10-29, after a backup):** of the 32 seeded venues, 9 read fine, 4 need the headless
      browser (`render` on: Catalina, Flappers, The Mint, The Virgil), McCabe's and the Townhouse got their
      real calendar links (`/concerts-landing/`, the Townhouse's DICE venue page), Saint Rocke closed (Dec
      2025), and 15 whose pages show no dates are paused (`active = false`; see the list in Afoot's
      venues). Those need a newsletter source, a different page, or a venue to send events.
- [x] **Daily ingest moved to GitHub Actions** (Afoot `7e77646`): `.github/workflows/ingest.yml`, 9:00 UTC, with a
      real browser and up to an hour (Vercel can't run the browser and stops at 5 minutes). Needs three
      repository secrets (see Afoot README). The Vercel cron is removed; `CRON_SECRET` is only needed for a
      manual run on Vercel.
- [x] **Ingest keeps RSVPs and chat** (Afoot `9059030`): a date the venue drops is deleted only if nobody
      RSVP'd or wrote in its chat; otherwise it's marked cancelled. Dates still listed keep their id. The
      cron route now refuses to run without `CRON_SECRET` (it used to run for anyone).
- [ ] Sponsors: follow the [Afoot Sponsorship Playbook](./Afoot-Sponsorship-Playbook.md) (what to sell, finding and signing sponsors, ad design, privacy-safe counting, Stripe, sponsor reports). Campaigns, privacy-safe view/click counting, the /admin Sponsors section and monthly reports are built (Afoot `112efeb`, 2026-10-23); sponsor tables applied and tested end to end on the live database, `ADMIN_TOKEN` set in Vercel. Next: sign 3–5 founding sponsors (free first month).
- [ ] Soft-launch in 1–2 LA neighborhoods; gather usage + venue feedback.
- **Milestone:** a live, public product with real local events and first sponsor conversations.

### Phase 2 — Separate data per app (decided 2026-10-23) · cost $0 now, ~$45/mo when all three are on Pro
- **Decision:** each app gets its own Supabase project and its own Vercel project, so a mistake, leaked key, or bad migration in one app can't reach another's data. This replaces the shared `core` schema and single sign-on plan; each app runs its own Supabase Auth with the same "Sign in with Google/Apple" buttons.
- [x] Afoot: Supabase project `xpqzvmggzhsaggrebxxv`, schema `afoot`; Vercel project `some-dude1/afoot`. Weekly local backup.
- [x] Kinmap: own Supabase project `puskxnikpiusgvtzhire` + Vercel project `some-dude1/kinmap` (2026-10-23). First migration `kinmap/supabase/migrations/20261023120000_kinmap_init.sql` applied through the SQL editor: 12 tables, members-only read access (RLS), server-only writes, private `media` bucket. Verified from outside: signed-out requests are refused. Connected to the server and app the same day (see Phase 3).
- [ ] NoBucks: its own Supabase project when a pilot starts (a third project needs the Pro plan: $25/mo + ~$10 per extra project). Until then its test tables stay in `public` of Afoot's project.
- [ ] Afoot sign-in: enable Google in Afoot's Supabase project (needs the domain for redirect URLs).

### Phase 3 — Monetize Kinmap (Weeks 8–18) · cost ~$75–200/mo
- [x] Android development build (EAS) with live, voice-first dictation; transcript highlights names, places and dates, learns family spellings, and edits in place (2026-10-23).
- [x] AI cost control: Claude Haiku 5.5 by default (about $0.001 per request, logged per call) or a free local model through Ollama; AI output is cleaned up before review.
- [x] Kinmap database schema in its own Supabase project (2026-10-23; see Phase 2).
- [x] Kinmap server reads and writes those tables; each change request applies in one transaction, and a failed one is kept with its reason (2026-10-23, Kinmap commit `eb8c7df`). The JSON demo trees were not carried over.
- [x] Real sign-in: emailed one-time code through Supabase Auth replaces the dev `x-user-id` switcher; the server verifies tokens with the project's public keys. Google/Apple sign-in waits for the domain.
- [x] Media in the private Supabase `media` bucket: members-only, links expire after an hour, 50 MB per file on the free plan. The server uses each user's own token, so it holds no Supabase secret key.
- [x] **First real sign-in on a phone (2026-10-23):** emailed code via Resend, new Android development build (EAS `0f85ab9a`), a tree created and a spoken family story turned into a 17-step change. That test found a bug: leaving out one proposed person failed the whole change. Fixed the same day (Kinmap `99b6433`).
- [x] Sending domain: `somedude.app` added to Resend (US East) and its DNS auto-configured in Cloudflare (2026-10-23): DKIM on `resend._domainkey`, CNAMEs on `send` and `rsend`. All three resolve publicly; Cloudflare's DMARC record (`p=none`, reports to Cloudflare) was already in place. Email Routing still handles incoming mail.
- [x] Supabase custom SMTP through Resend (sending-only key, sender `kinmap@somedude.app`), with the sign-in code in the Magic Link template (2026-10-23). Supabase allows 30 auth emails/hour with custom SMTP; Resend's free tier is 100/day, 3,000/month.
- [x] Replies to `kinmap@somedude.app` forward to the founder (Cloudflare Email Routing rule), and sign-in emails show the code (2026-10-23).
- [x] Speed (2026-10-23, Kinmap `a470dbb`): connections stay open instead of reconnecting (~0.8 s each), names are cached, and a tree loads in one query. Measured against the live database: role check ~95 ms, whole tree ~120 ms, applying the 17-step test change ~0.6 s (was ~5 s).
- [x] **Claude for voice updates (2026-10-24):** `ANTHROPIC_API_KEY` set in Vercel; `/health` reports `claude-haiku-5-5` ($0.10 / $0.50 per million tokens, about $0.001 per story). Re-record the family story in the app; discard the empty draft and the old failed change first.
- [x] **AI spending guardrails (Kinmap `ecda0c6`):** every model call is logged in `ai_usage` with tokens and cost. Before each voice update the API checks each tree's monthly allowance (`AI_TREE_MONTHLY_USD`, default $1 ≈ 1,000 stories) and each person's daily calls (`AI_USER_DAILY_CALLS`, default 40), and refuses transcripts over 8,000 characters. Manual edits are never limited. The Anthropic console's spend limit is the backstop.
- [x] **Hosting (2026-10-23):** the Kinmap API runs on Vercel (`kinmap-flax.vercel.app`, `iad1`), redeploying on every push to `main`. `/health` reports `db: true` through Supabase's IPv4 pooler, and photos upload straight to Storage. Live at **https://api.kinmap.somedude.app** (CNAME in Cloudflare, proxy off; verified `db: true`).
- [x] The dev app points at the hosted API (`EXPO_PUBLIC_API_URL` in `mobile/.env`). A standalone **Kinmap (Preview)** Android build (`com.somedude.kinmap.preview`, EAS `d43e324d`, with native photo uploads) bundles its code and uses the hosted API, so it works on any network without the founder's PC.
- [x] **Preview app tested (2026-10-24):** installed on the founder's phone; sign-in and a photo upload work through the hosted API. Photo uploads first failed with "Unsupported FormDataPart implementation" (this Expo version's fetch can't send React Native file parts); fixed by streaming the file natively with expo-file-system's `UploadTask` to the Storage signed-upload URL (Kinmap `9e0f7b2`). Voice waits on the Claude key above.
- [x] **Answer the AI's questions by voice or typing (2026-10-25, Kinmap `d062bbd`)** and a **language switcher**
  at the top right of every screen: English, Español, 普通话 (Simplified), 廣東話 (Traditional) (`0309f22`,
  `65d9927`). **Links & favorites** on each person (`6200b17`), **personal boards** with pins and 41
  stickers (`de8bf09`), **slideshows** for reunions (`d62926e`), and **printable PDFs**: binder pages and
  a wall poster (`073b893`), and **photo calendars** with a collage editor and a blank print-and-paste
  option (`0bad6fe`). **Live since 2026-10-25:** database backed up, five migrations applied, API pushed and
  deployed on Vercel (`/health` ok), new Android preview build started on EAS. Not built: ordering prints
  (waits on a partner).
- [x] **Deploy (2026-10-25):** backed up (`npm run backup:db` in `kinmap/server` →
      `~/Backups/supabase-puskxnikpiusgvtzhire/`), applied the five `20261025*` migrations with
      `npm run migrate`, pushed Kinmap `main`; Vercel deployed it. New preview APK built on EAS
      (build `a5b4b608`).
- [ ] **Launch-gap sprint (pulled forward 2026-10-25, now that the features are live).** Ordered; the
      code items are about a day or two each.
  - **A. Before relatives use it**
    - [ ] Founder: install the new preview APK and test every new feature on a phone, including on cellular
          data and with a second account invited as an editor. Check board/calendar dragging feels smooth,
          Cantonese dictation (`yue-Hant-HK` on Android, `zh-HK` on iPhone) and the slideshow staying awake.
    - [x] **Over-the-air updates** (Kinmap `5954821`, 2026-10-25): `expo-updates`, fingerprint runtime
          policy, channels per build profile. After this build, JS-only fixes ship with
          `npm run update:preview` in `kinmap/mobile`; anything that adds a native module still needs a build.
    - [x] **Keepsakes** (`5954821`): owners/admins save one unencrypted ZIP (whole tree as `kinmap.json`,
          every photo and video, stories in people's own words, an `index.html` that opens in any
          browser), built on the phone and shared with the share sheet. "Open a keepsake file" shows one in
          the app, signed in or not.
    - [x] **Delete account / tree** (`5954821`): Account & keepsakes → give each owned tree to a member or
          delete it (with its photos and videos), then delete the account (typing your email). Web page:
          kinmap.somedude.app/delete-account (for Google Play). Contributions to others' trees stay as
          "Former member". Migration `20261025050000_owner_media_delete.sql` applied after a backup.
    - [x] **Server error messages in the app's language** (`5954821`, `server/src/messages.js`).
    - [ ] **Sign-in email in the person's language:** the app now saves the language on the account; the
          founder pastes `kinmap/supabase/templates/sign-in-code.html` into Supabase → Authentication →
          Email Templates ("Magic Link" and "Confirm signup") and sends a test code.
    - [x] **Invite language** (`5954821`): a language choice on the invite card.
    - [ ] Backups: Supabase Pro ($25/mo, daily) before real families' data, or run `npm run backup:db`
          weekly until then. Photo files aren't in that backup.
    - [ ] Relatives who are native speakers read the Spanish, Mandarin and Cantonese text.
    - [x] **Phone feedback, round 1** (Kinmap `99a6d5d`, shipped as an over-the-air update 2026-10-25):
          pinch to zoom on the tree (no +/- buttons), one-row bar (Talk, Updates, More), "how they're related
          to you" on every page (English, Spanish, Mandarin and Cantonese kinship words), slideshow story
          excerpts and fun facts, board scrolling fixed and cork only, nicknames on the tree and easy to add.
    - [x] **Phone feedback, round 2** (Kinmap `8df86cb`, `0505be5`, over the air 2026-10-27): boards open
          again on the web, slideshows show a few photos of each person with their facts (plus full screen on
          the web), long-press a person then tap another to link them (long-press a link to change it),
          invites by phone number (pick someone on the tree or a new name, a role, many numbers at once).
    - [x] **Duplicate people** (2026-10-27): a re-approved failed change had re-added 9 people. Cleaned the
          founder's tree after a backup (`server/scripts/merge-duplicates.js`: 8 merges, 20 → 12 people).
          New changes now reuse a same-name person instead of adding a copy; Updates lists likely duplicates
          with a one-tap Merge and "Check my tree with AI".
  - **Kinmap on computers (Phase 1, started 2026-10-25)**
    - [x] The web app builds from the same code (`kinmap/mobile/vercel.json`): installable (manifest, icons,
          service worker that never caches family data), tree and person side by side on wide screens,
          drag-and-drop photos, keyboard shortcuts, mouse/trackpad zoom, keepsakes in the browser.
    - [x] "Sign in" on kinmap.somedude.app → `https://app.kinmap.somedude.app`.
    - [x] **Live (2026-10-25):** https://app.kinmap.somedude.app (Vercel project `kinmap-app`, Root
          Directory `mobile`; `mobile/vercel.json` pins framework to none, since the project inherited the
          API's Express preset). CNAME in Cloudflare, DNS only: Cloudflare's free certificate doesn't cover
          two-level names like `app.kinmap`, so proxying breaks HTTPS.
    - [ ] Then: check it in Chrome/Edge (sign in, install), and package it for the Microsoft Store with
          PWABuilder (Microsoft developer account: one-time fee for individuals).
    - [ ] Phase 2 (only if families ask): "Use AI on this computer" with a user-installed Ollama.
  - **B. Before a Google Play listing**
    - [ ] Privacy policy (`kinmap.somedude.app/privacy`, drafted from the code): have it reviewed and add
          Supabase's data region.
    - [ ] Stripe billing, the family plan and AI credit caps. **Code done (Kinmap `5853e19`, 2026-10-27),
          switched off:** `tree_plans` table applied after a backup; plan limits for storage, AI and members
          (enforced only with `BILLING_ENABLED=true`); Stripe Checkout, Customer Portal and a signed webhook;
          a "Plan & storage" screen under More (upgrade buttons on the web only). Founder steps and the plan
          details are in [Kinmap-Monetization.md](./Kinmap-Monetization.md).
    - [ ] "SomeDude" is public on somedude.app: finish the trademark check (§9).
    - [x] **Per-member limits** (Kinmap `09c7615`, live on the web 2026-10-29; phones with the next build).
    - [x] **Photo manager** (Kinmap `2d2546f`, live 2026-10-28), **Google sign-in** on the web (`3d3cfd5`,
          appears once Google is switched on in Supabase) and **push notifications** plus Google sign-in
          on phones (`13d7922`, deployed; reaches phones with the next native build after Firebase is set
          up). Steps: [Kinmap-Monetization.md](./Kinmap-Monetization.md) sections 6 and 7.
  - **C. Later polish** (fine for a beta)
    - Slideshows: landscape when casting (`app.json` change + build), a laptop web player, music inside
      the app.
    - Link thumbnails copied into private storage (they load from YouTube/Spotify, which see viewers'
      IP addresses); sites that block bots show only their name.
    - PDFs: vendor the Chinese fonts (now fetched from GitHub on first use), scheduled cleanup of exports,
      very large trees may hit Vercel's 60 s limit, branch/story pages, fan/botanical posters, map inset,
      calendar anniversaries.
    - Boards: a handwriting font. Taiwan (Traditional Mandarin). Name/place highlighting in Chinese
      transcripts. A "translate" button for stories told in another language. Hand-edit summaries saved
      in the editor's language. Accented names in the no-AI fallback parser.
    - Ordering prints through Kinmap: needs a partner whose terms require deleting files and addresses
      after shipping, confirmed in writing, plus Stripe.
- [x] **Features from the [Kinmap Feature Specs](./Kinmap-Feature-Specs.md)** (2026-10-25): answering the AI's questions by voice, the language switcher, links & favorites, boards, slideshows, and printable binder pages, wall poster and photo calendar. Ordering prints through Kinmap waits on a partner.
- [ ] Add **Stripe billing** + the freemium tiers + AI credit caps (code done and off; see sprint B and [Kinmap-Monetization.md](./Kinmap-Monetization.md)).
- [ ] Ship EAS builds to the App Store + Google Play (Apple $99/yr, Google $25 once).
- [ ] Launch with a paywall from day one; invite beta families.
- **Milestone:** first paying customers. This is your first real revenue line.

### Phase 4 — NoBucks pilot & funding (parallel, Weeks 2–30) · cost low, grant-funded
- [x] Rename to **NoBucks** (2026-10-23): code, docs, and GitHub repository.
- [x] **Security fixes done (NoBucks `5c7d077`, 2026-10-29; schema not applied anywhere yet):** appointed,
      neighborhood-scoped leaders; in-person verification by a leader; required `JWT_SECRET`; revocable
      sessions; deletion, export, sign-out, password reset (needs Resend); 18+ check; private photos with EXIF
      stripped; rough locations; title-only phone notices; events per neighborhood. Smoke-tested against a
      throwaway database. Still open: neighborhood assignment beyond leader verification, the pilot's own
      database (Prisma migrations from scratch there), and a review by the host organization.
- [ ] ~~Fix before any pilot~~ (list kept for reference; done above) (found 2026-10-27 while writing its privacy policy): anyone can make
      themselves admin (`POST /admin/claim`); admin tools aren't scoped to a community; `JWT_SECRET` falls
      back to a default; no account deletion, export, sign-out or password reset; no age check; photo URLs
      may be public and EXIF (location) isn't stripped; distances could reveal homes; a mock ID check is
      presented as real; push notifications include message text; events show service-wide.
- [ ] Scope a single-neighborhood or single-org **pilot** (a neighborhood council, library branch, faith community, or local nonprofit willing to host it).
- [ ] Find a fiscal sponsor or nonprofit partner for grant applications.
- [ ] Write 2–3 grant applications (mutual-aid / civic-tech / mental-health).
- [ ] Draft a 1-page "NoBucks for organizations" offer (license/white-label).
- **Milestone:** a funded pilot or first org license — *not* a mass consumer launch.

### Phase 5 — Company layer (ongoing)
- [x] **Websites live (2026-10-25):** `somedude.app` (company page, this repo's `site/`, Vercel project
      `somedude-site`; the bare domain forwards to `www`), `kinmap.somedude.app` (landing + privacy policy,
      Kinmap's `website/`, Vercel project `kinmap-website`), and `afoot.somedude.app` (the Afoot app).
      DNS in Cloudflare, all "DNS only".
  - [x] Cloudflare Email Routing rule for `hello@somedude.app` (the company page's contact address).
  - [x] Privacy pages (2026-10-27): somedude.app/privacy (company site, links to each app's),
        afoot.somedude.app/privacy (Afoot `8c65e89`, written from the schema), kinmap.somedude.app/privacy,
        and a draft in the NoBucks app (`87d551c`, for pilot review). Keep `NEXT_PUBLIC_AD_PROVIDER` off
        `adsense`: the company site promises no tracking ads. Have them reviewed before wide launch.
- [ ] Shared brand, shared analytics.
- [ ] Decide app #4 only after one of the three is paying.

---

## 6. Cost plan (minimize burn)

Everything here favors free tiers and shared infrastructure. One Supabase, one S3, one Claude key.

| Item | Phase 0–1 | With Kinmap live | Notes |
|---|---|---|---|
| Supabase | $0 (free) | $25/mo (Pro) | Pro when you need backups/more rows; shared by all 3 |
| Vercel | $0 (hobby) | $20/mo | Afoot; Hobby is non-commercial, so Pro before any sponsor/ad revenue |
| Claude API | $1–10/mo (capped) | $15–60/mo | Haiku 5.5 ($0.10/$0.50 per M tokens) for Afoot ingest; Sonnet 5.5 ($2/$10) for Kinmap; **set hard caps** |
| S3 media | ~$1–10/mo | $5–25/mo | Pay per GB; mostly Kinmap photos/videos |
| Domains | ~$12/yr each | — | Company + 3 app domains |
| App stores | — | $99/yr (Apple) + $25 once (Google) | Only when Kinmap ships native |
| NoBucks API host | $0–7/mo | $7–15/mo | Small container (Fly/Render/App Runner free-ish tiers) |
| **Rough total** | **~$0–50/mo** | **~$75–200/mo** | Kinmap revenue should cover this quickly |

**Cost discipline rules:** (1) one shared Supabase + one S3 + one Claude key, never per-app duplicates; (2) hard budget caps on Claude; (3) don't pay for a tier until a free tier actually breaks; (4) don't ship native (app-store fees) until Kinmap is ready to charge; (5) NoBucks's costs should be covered by grants, not you.

---

## 6b. Company monetization model

Each app earns in a way true to its users; the company is the portfolio that balances them.

- **Kinmap = the cash engine.** Recurring family subscriptions + storage tiers + high-margin printed keepsakes. This is what pays the bills and funds everything else.
- **Afoot = the audience engine.** Sponsorships + paid venue placement; low revenue per user but cheap to run, and top-of-funnel for the brand and the shared account.
- **NoBucks = the mission engine.** Grants + nonprofit/city/org licensing; it earns through funders and partners, not consumers, and gives the company credibility and purpose.

**What the shared company layer adds:**
- **One account, cross-sell.** A single sign-in across all three means an Afoot user can be nudged into Kinmap, and so on. Later, a bundled company **"Pro"** (premium across apps for one price) becomes possible.
- **Shared infrastructure = better margins.** One Supabase, one S3, one budget-capped Claude key spread across three products lowers the unit cost of each.
- **Reusable IP as leverage.** The Claude extraction pipeline, the change-request/approval engine, and the design system are built once and amortized across apps (and future app #4).
- **Portfolio risk balance.** Fast-but-small (Afoot), slow-but-lucrative (Kinmap), and mission/grant (NoBucks) don't rise and fall together.

**Guardrail:** never bolt an extractive model onto an app whose trust *is* the product — no tracking ads on Kinmap or NoBucks, no fees on NoBucks's mutual aid. Monetize each app only in its own grain.

---

## 7. Why not launch all three at once

- **Focus:** solo founders ship one thing well, not three things half-way. Three simultaneous launches = three half-launches.
- **Cost:** staggering keeps you on free tiers longest and spreads the only real variable cost (Claude + media) over time.
- **Dependency order:** Kinmap needs production auth and a database; build that safely alongside Afoot's existing audience work.
- **Learning compounds:** what you learn shipping Afoot (deploy, SEO/local growth, sponsor sales) makes the Kinmap and NoBucks launches better and cheaper.
- **Different clocks:** Afoot = audience play, Kinmap = revenue play, NoBucks = grant/mission play. They shouldn't share a launch date because they don't share a success metric.

---

## 8. Risks & open decisions

- **Shared-DB blast radius** — one DB touching all three apps concentrates risk. Mitigate with per-schema RLS, per-app DB roles, backups, staging.
- **Kinmap backups** — the free Supabase plan keeps no backups and pauses after a week idle; upgrade to Pro (or run a backup script like Afoot's) before real families use it. The old `core`/`kinmap` migration on the Windows machine is superseded; don't apply it.
- **Claude spend** — uncapped AI usage is the one line that can surprise you; cap it per app.
- **Privacy posture** — Afoot's no-tracking stance and NoBucks's mutual-aid ethos both limit ad models; lean on sponsorship/B2B/subscription instead.
- **Your time** — three apps + a day job is a lot. The sequence above is designed so you're only ever actively launching one.

---

## 9. Naming & brand

The working umbrella name is **SomeDude**; check domain and trademark availability before public use. *2026-10-23: `somedude.app` bought on Cloudflare Registrar; one domain can serve every app through subdomains (`kinmap.somedude.app`, `afoot.somedude.app`). USPTO search shows no "SomeDude" but many "Some Dude" records; spacing doesn't distinguish marks, so review live ones in classes 9, 35 and 42. Kinmap, Afoot and NoBucks need their own clearance before launch.* The three apps share a theme: **AI-assisted tools for real-life community, place, and relationships.**

- Keep each app's own name and personality; SomeDude is the quiet parent brand.
- **NoBucks** (renamed from Clover, 2026-10-23): the name says it plainly, no money changes hands. Keep the cute animal/people villagers, keep **sprouts** as the currency, and include **no deer** characters ("no bucks"). Check trademark and app-store availability before public launch.
- Founder storytelling can be personal and honest without making private family details part of the product or marketing.

See the companion **[Company Design System](./Company-Design-System.md)** for the shared visual language and how each app expresses it.

---

## 10. Immediate next steps (as of 2026-10-27)

Nothing has to run on the founder's computer: Kinmap's API is on Vercel (`api.kinmap.somedude.app`),
Afoot is on Vercel (`afoot.somedude.app`), the websites are on Vercel, and the Kinmap (Preview) app is
standalone. To develop locally, run `npm run server` / `npm run app` in `kinmap/` and `npm run dev` in
`Afoot/`.

1. **Founder, this week:** trademark check for "SomeDude" (§9). Set `CRON_SECRET` in Vercel for Afoot
   (then check the first cron results). Test the latest Kinmap update on the phone: Plan & storage under
   More, long-press linking, the new invite flow, the slideshow. Paste the sign-in email template into
   Supabase.
2. **Kinmap, founder:** Google OAuth client + Supabase provider, and Firebase for Android notifications
   ([Kinmap-Monetization.md](./Kinmap-Monetization.md) sections 6–7); then a new preview build.
   **Code next:** muting and grouping of repeated requests (by voice), member limits, editors suggesting
   photo removals; then billing in Stripe test mode.
3. **Kinmap:** Supabase Pro ($25/mo) for backups (or weekly `npm run backup:db`), then invite one or two
   relatives, ideally ones who can check the Spanish or Chinese.
4. **Afoot:** after the first ingests, fix venues whose calendars don't come through; accountant check,
   Stripe account and advertising terms, then visit 10–15 venues in one area for founding sponsors
   ([playbook](./Afoot-Sponsorship-Playbook.md) sections 3–4). Vercel Pro before the first paid placement.
5. **NoBucks:** the security fixes in Phase 4 before showing it to any pilot partner.
6. **Housekeeping:** move `resend_key.txt`, `supabase_kinmap_key.txt` and `vercel_ADMIN_TOKEN.txt` (no
   longer valid) into a password manager and delete them.
7. Read the [Company Design System](./Company-Design-System.md) and apply the shared tokens as you touch
   each app.
