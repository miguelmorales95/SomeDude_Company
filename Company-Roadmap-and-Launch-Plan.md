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
- [ ] Run discovery + ingest to seed ~30–50 real LA venues; spot-check recurrence.
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
- [ ] **Launch gaps found while building these (2026-10-25)**. Fix before beta families unless noted:
  - [x] **Deploy (2026-10-25):** backed up (`npm run backup:db` in `kinmap/server` →
        `~/Backups/supabase-puskxnikpiusgvtzhire/`), applied the five `20261025*` migrations with
        `npm run migrate`, pushed Kinmap `main`; Vercel deployed it. New preview APK built on EAS.
  - [ ] Install the new preview APK and test every new feature on a phone (the old preview build has the
        old screens; the app has no over-the-air updates, so each change needs a new build or `expo-updates`).
  - [ ] No in-app account deletion yet; the privacy policy offers deletion by email. Google Play requires an
        in-app or web deletion path before listing.
  - [ ] Privacy policy (`kinmap.somedude.app/privacy`) was drafted from the code; have it reviewed, and fill
        in Supabase's data region.
  - [ ] Boards: drag/pinch/rotate uses built-in touch handling (no new build); check it feels smooth. No
        handwriting font yet.
  - [ ] Slideshows: music only from another app; casting shows portrait (landscape needs an `app.json`
        change and a new build); no hosted web player for a laptop yet.
  - [ ] PDFs: only owners/admins export. Chinese fonts download from GitHub on first use (vendor them if
        that's ever unreliable). Old exports are deleted when the next one is made, not on a schedule.
        Very large trees with many photos could hit Vercel's 60 s limit. Calendar, branch and story pages,
        fan/botanical poster layouts and the map inset aren't built. A "download PDF" subscription perk
        needs billing first.
  - [ ] Ordering prints through Kinmap: not built. Needs a partner (Prodigi, Printful, Gelato; Lulu or
        Blurb for books) whose terms require deleting files and addresses after shipping, confirmed in
        writing, plus Stripe.
  - [ ] Link thumbnails load from YouTube's/Spotify's image servers, which see viewers' IP addresses (no
        cookies). Copy them into private storage later. Sites that block bots show only their name.
  - [ ] **Server error messages are English only** (AI limits, permissions, "Tree not found"). Plan: answer
        in the app's language, which every request already sends (`accept-language`); no need to ask.
  - [ ] **Sign-in email is English only.** Plan: the app saves the chosen language to the account
        (`user_metadata.lang`, when signing in and whenever it's switched), and the Supabase email template
        picks its wording with `{{ if eq .Data.lang "es" }}…`. Fallback: one short email whose code is
        readable in every language.
  - [ ] **Invite language.** Plan: a language choice on the invite card (defaults to the inviter's) for the
        shared invite message, so a grandparent who reads Cantonese gets the invite in Cantonese. The invitee's
        app still starts in their phone's language, and the globe button is one tap away.
  - [ ] Spanish, Mandarin and Cantonese text written by Claude; needs a read by native speakers (relatives).
  - [ ] Cantonese dictation language codes (`yue-Hant-HK` on Android, `zh-HK` on iPhone) unverified on a device.
  - [ ] Taiwan (Mandarin in Traditional characters) not covered; those phones get Simplified. Later.
  - [ ] The transcript highlighter marks names, places and dates only in alphabetic scripts, not Chinese. Later.
  - [ ] Stories and facts stay in the language they were told in, by design; relatives who read another
        language see them untranslated. A "translate" button could come later (counts against AI budgets).
  - [ ] Summaries of hand edits ("Edited Rosa") are saved in the editor's language at the time; others see
        them in that language. Minor.
  - [ ] The no-AI fallback parser doesn't recognize accented names ("Tomás"). Only matters without an AI key.
- [ ] Full test on cellular data away from home Wi-Fi, including inviting a second account as an editor.
- [ ] Calendar: holidays are U.S. plus Lunar New Year, Mid-Autumn (2025–2035) and Día de Muertos;
      wedding anniversaries aren't marked (no wedding dates are stored yet).
- [ ] Supabase Pro ($25/mo) for daily backups before any real family's data goes in.
- [ ] **Next features** ([Kinmap Feature Specs](./Kinmap-Feature-Specs.md)): answer the AI's questions by voice, links & favorites on each person (songs, videos, articles), a personal board with pins and stickers, a slideshow mode with custom slides (reunion schedules), and prints ordered through Kinmap (wall poster, family book and binder pages, photo calendar) with privacy-safe defaults for living people. Physical keepsakes are an early revenue line beside the subscription. The founder's cellular test on 2026-10-24 worked (sign-in, voice with Claude, photos).
- [ ] Add **Stripe billing** + the freemium tiers + AI credit caps.
- [ ] Ship EAS builds to the App Store + Google Play (Apple $99/yr, Google $25 once).
- [ ] Launch with a paywall from day one; invite beta families.
- **Milestone:** first paying customers. This is your first real revenue line.

### Phase 4 — NoBucks pilot & funding (parallel, Weeks 2–30) · cost low, grant-funded
- [x] Rename to **NoBucks** (2026-10-23): code, docs, and GitHub repository.
- [ ] Scope a single-neighborhood or single-org **pilot** (a neighborhood council, library branch, faith community, or local nonprofit willing to host it).
- [ ] Find a fiscal sponsor or nonprofit partner for grant applications.
- [ ] Write 2–3 grant applications (mutual-aid / civic-tech / mental-health).
- [ ] Draft a 1-page "NoBucks for organizations" offer (license/white-label).
- **Milestone:** a funded pilot or first org license — *not* a mass consumer launch.

### Phase 5 — Company layer (ongoing)
- [ ] **Websites (built 2026-10-25, domains not yet connected):**
  - [ ] `somedude.app`: company page in the new local repo `~/SomeDude_Site` (static HTML). Create the
        GitHub repo (private), import it in Vercel, add `somedude.app` + `www`, and point Cloudflare DNS at
        Vercel. Add a Cloudflare Email Routing rule for `hello@somedude.app` (the page uses it).
  - [ ] `kinmap.somedude.app`: landing page + privacy policy in Kinmap's `website/` folder (pushed). Import
        the Kinmap repo in Vercel again as a second project with Root Directory `website`, add the domain,
        CNAME in Cloudflare.
  - [x] `afoot.somedude.app`: already live (the Afoot app is its site).
  - [ ] Afoot privacy page: it has accounts, RSVPs, contact requests and messages, so write it from the
        schema. Keep `NEXT_PUBLIC_AD_PROVIDER` off `adsense`: the company site promises no tracking ads.
  - [ ] "SomeDude" is now public on the site: finish the trademark check (classes 9, 35, 42; see §9).
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

## 10. Immediate next steps (as of 2026-10-25)

Nothing has to run on the founder's computer: Kinmap's API is on Vercel (`api.kinmap.somedude.app`),
Afoot is on Vercel (`afoot.somedude.app`), and the Kinmap (Preview) app is standalone. Local dev servers
were stopped on 2026-10-24; to develop again, run `npm run server` / `npm run app` in `kinmap/` and
`npm run dev` in `Afoot/`. The Kinmap (Dev) app only works while `npm run app` is running.

1. **Kinmap:** install the new preview APK and test the new features together on a phone (answering
   questions, languages, links, boards, slideshows, PDFs, calendars); fix the launch gaps listed in Phase 3.
   Test on cellular data and invite a second account. Run `npm run backup:db` in `kinmap/server` weekly.
2. **Websites:** connect `somedude.app` and `kinmap.somedude.app` (Phase 5).
3. **Kinmap:** Supabase Pro ($25/mo) for backups, then invite one or two relatives to the Preview app.
3. **Afoot:** accountant check, Stripe account and advertising terms, then visit 10–15 venues in one area
   for founding sponsors ([playbook](./Afoot-Sponsorship-Playbook.md) sections 3–4). Vercel Pro before
   the first paid placement. Turn on Vercel **Analytics** for the afoot project (the cookieless visit
   counter is already in the code, Afoot `47d7e11`). Write a plain-language privacy page (none exists yet).
5. **Housekeeping:** move `resend_key.txt`, `supabase_kinmap_key.txt` and `vercel_ADMIN_TOKEN.txt` (no
   longer valid) into a password manager and delete them; create a new Vercel token if deploys from
   this machine are wanted.
6. Read the [Company Design System](./Company-Design-System.md) and apply the shared tokens as you touch
   each app.
