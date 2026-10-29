# SomeDude — Claude Code project briefing

Read this file first, then read [Company-Roadmap-and-Launch-Plan.md](./Company-Roadmap-and-Launch-Plan.md)
and [Company-Design-System.md](./Company-Design-System.md). The roadmap is a working strategy document,
not a source of verified runtime status: inspect the app repositories before making implementation
or launch claims.

## Company and founder context

- **Working parent-company name:** SomeDude. Confirm domain, legal, and trademark availability before
  using it publicly.
- **Founder:** Miguel Morales, a solo developer. The long-term goal is to make sustainable income to
  support his family. Any founder story should be truthful and optional; do not invent personal
  details or make family hardship a marketing gimmick. He is building these as a private individual,
  not affiliated with any employer or nonprofit; don't present the apps as connected to one.
- **Portfolio:** Kinmap (family history), Afoot (local events), NoBucks (neighborhood mutual aid).
  These are separate apps with distinct identities and separate GitHub repositories, not a monorepo.
- Be practical about solo-founder time and cash. Prefer a reliable, maintainable next step over
  speculative shared infrastructure or launching all products at once.

## Product and business direction

### Kinmap — first subscription candidate

Kinmap lets families build a shared family tree by describing facts in plain language. AI proposes
reviewable edits; family members can collaborate with role-based approvals. The important product
promise is a warm, trustworthy family keepsake, not simply another genealogy database.

- Candidate revenue: family subscription, optional extra media storage/AI usage, and printed books or
  posters. Do not use targeted ads or sell family data.
- One premium sale has been reported by the founder. Treat it as an early signal, not proof of
  product-market fit or evidence by itself that the price is too low.
- A prior discussion proposed testing a family plan around **$8.99/month or $79.99/year**. These
  are hypotheses to test with families, not finalized prices. Measure conversion, retention, usage,
  support burden, and per-family cost before changing price.
- Do not promise unlimited AI or storage without measured unit economics and enforceable budgets.
- Family-tree and media data are sensitive. Privacy, secure authentication, authorization, backups,
  export, and protected media access are launch requirements, not optional premium features.

### Afoot — audience and local sponsorship

Afoot discovers small local events that are hard to find on major event platforms. Its current
revenue direction is privacy-respecting local sponsorships and paid venue/event placement, with
possible newsletters or ticketing referrals later ([Afoot-Sponsorship-Playbook.md](./Afoot-Sponsorship-Playbook.md)
has the sales, contract, ad-format, measurement and billing plan). Avoid behavioral tracking unless the founder
explicitly revisits the product's privacy promise.

### NoBucks — mission and organization funding

NoBucks is a cashless neighborhood mutual-aid/time-bank product using “sprouts.” Keep participation
and help central; do not take a cut of trades or charge users in a way that undermines mutual aid.
Explore grants, nonprofit/city/organization pilots or licensing, and optional nonessential cosmetics.

## Shared technology direction

**Decision (2026-10-23): separate data per app.** Each app has its own Supabase project (database +
auth) and its own Vercel project; there is no shared database or shared sign-in. Share code and
patterns (design system, AI cost controls, trust UI), not data. Use careful row-level security,
protected media, and budget-capped AI in each. Do not move existing production data or change app schemas in place
without a reviewed migration, backup, and verification plan.

**Supabase project `xpqzvmggzhsaggrebxxv` layout as of 2026-10-23 (inspected directly):**
- `public`: NoBucks' Prisma tables (`User`, `Event`, `Listing`, …; a handful of test rows). Prisma's
  migration tooling may offer to reset a schema with unknown tables, so no other app goes in `public`.
- `afoot`: Afoot's tables, created from `Afoot/supabase/schema.sql` and exposed in Data API settings;
  267 events as of 2026-10-23; the live site reads events from Supabase (not the CSV). Sponsor tables (`sponsors`, `campaigns`, `campaign_daily`, `bump_campaign`)
  were added 2026-10-23 after a backup (`npm run backup:db` in Afoot → `~/Backups/supabase-xpqzvmggzhsaggrebxxv/`).
  Afoot is public at https://afoot.somedude.app; /admin needs `ADMIN_TOKEN`. 2026-10-27 (after a backup): 32
  seeded LA venues promoted and geocoded (205 venues). Ingest no longer deletes dates with RSVPs or chat
  (marks them cancelled), and the daily cron needs `CRON_SECRET` (it refuses without one) and rotates
  venues in 4-minute runs. Local Ollama ingest is too slow on this GPU-less machine for bulk runs. Since 2026-10-29 the
  daily ingest runs on GitHub Actions (`Afoot/.github/workflows/ingest.yml`, needs repo secrets), not Vercel cron; 15
  seeded venues with unreadable calendars are paused (`active = false`) and Saint Rocke (closed) too. Don't scrape
  Facebook or aggregators whose terms forbid it (Songkick, etc.). Event links (any site, via /submit, reviewed in
  /admin) and Eventbrite/Ticketmaster feeds (official APIs, `npm run feeds`) arrived 2026-10-29 (Afoot `3e887bc`);
  Afoot now has `npm run migrate -- <file>` (after `npm run backup:db`). `Afoot/SC_2_Afoot/` turns screenshots into
  queued events with a local Ollama vision model (`npm run screenshots`); screenshots are git-ignored.
- No `core` or `kinmap` schema exists yet, and none should be added here: Kinmap gets its own Supabase
  project. NoBucks moves to its own project when its pilot starts. No Supabase Auth users yet.

**Current Kinmap Supabase status as of 2026-10-23 (late):** Kinmap has its own Supabase project
`puskxnikpiusgvtzhire` (https://puskxnikpiusgvtzhire.supabase.co). Both migrations in
`kinmap/supabase/migrations/` are applied: `20261023120000_kinmap_init.sql` (Kinmap-only tables in
`public`, member read-only RLS, server-only writes, private `media` bucket) and
`20261024000000_media_uploads.sql` (editors may upload to their tree's folder). The older
`20261023000000_somedude_core_kinmap.sql` on the Windows machine (shared `core` schema) is superseded and
must not be applied.

The Kinmap server (commit `eb8c7df`) now reads and writes this database, verifies Supabase Auth tokens
(ES256, public JWKS), applies change requests in one transaction, and stores media privately, using the
user's own token for Storage (no secret key on the server). The app signs in with an emailed one-time
code; the `x-user-id` switcher and JSON store are gone. Verified: 16 server tests against the real
migrations in PGlite, app typecheck and production bundle, live server refuses missing/forged tokens.
**Verified end to end on a phone (2026-10-23):** the founder signed in with an emailed code on the new
Android development build (EAS `0f85ab9a`), created a tree and recorded a family story. Email: `somedude.app`
(Cloudflare Registrar, Email Routing for incoming mail) is verified in Resend, and Supabase sends auth
email through Resend SMTP as `kinmap@somedude.app`. The Resend key is in the ignored `resend_key.txt`
here; move it to a password manager. The API keeps database connections open and batches writes (Kinmap `a470dbb`): ~0.1 s per read, ~0.6 s to apply a 17-step change. It is hosted on Vercel at https://api.kinmap.somedude.app (auto-deploys from `main`, Root Directory `server`); `/health` shows database reachability. EAS profiles: `development` (code from the PC's dev server) and `preview` (standalone, hosted API; installed
and tested 2026-10-24: sign-in and native photo uploads work). Voice uses Claude Haiku 5.5 online (key set
in Vercel 2026-10-24), with per-tree monthly and per-person daily AI limits logged in `ai_usage`. No local
servers need to run. Planned features are specified in [Kinmap-Feature-Specs.md](./Kinmap-Feature-Specs.md);
answering the AI's questions (`d062bbd`) the language switcher (English, Español, 普通话, 廣東話), links & favorites, boards, slideshows,
printable PDFs and photo calendars went live on 2026-10-25: database backed up (`npm run backup:db` in
`kinmap/server`), the five `20261025*` migrations applied (`npm run migrate -- <files>`), API pushed and
deployed. Since build `4ba46f83` the app takes over-the-air updates (`expo-updates`, fingerprint
policy): JS-only changes ship with `npm run update:preview` in `kinmap/mobile`; changes that add native
modules need a new EAS build. The fingerprint also covers `package.json` scripts and `app.json`: changing
them blocks updates to installed builds, so check with `APP_VARIANT=preview npx eas-cli fingerprint:compare
--build-id <id>` first. The web app (https://app.kinmap.somedude.app, live since 2026-10-25) builds from `kinmap/mobile` via its
`vercel.json` (`node scripts/build-web.mjs`). The Vercel CLI is signed in on this machine (`npx vercel
inspect <deployment> --logs` reads build logs). Before any migration: `npm run backup:db` then `npm run migrate -- <file>` in
`kinmap/server`. Websites are live (2026-10-25): somedude.app (this repo's `site/`, Vercel project
`somedude-site`), kinmap.somedude.app (`kinmap/website/`, Vercel project `kinmap-website`, with the privacy
policy at /privacy) and afoot.somedude.app. Next is the launch-gap sprint in the roadmap's Phase 3. Plans and Stripe billing are built and switched off
(Kinmap `5853e19`, `tree_plans` applied 2026-10-27; `BILLING_ENABLED=true` plus Stripe keys in Vercel turn them on); plan
limits, the photo manager and sign-in plans are in [Kinmap-Monetization.md](./Kinmap-Monetization.md). 2026-10-28: the photo
manager is live (`2d2546f`); Google sign-in works on the web once enabled in Supabase (`3d3cfd5`); push notifications and
phone Google sign-in (`13d7922`, expo-notifications + expo-web-browser) changed the native fingerprint, so they reach phones
only with a new EAS build, and build `4ba46f83` no longer receives OTA updates. Migrations through `20261029020000_member_notifications` applied (Kinmap `dff0d19`: Apple sign-in, per-tree
notification settings; new native modules expo-apple-authentication and expo-crypto). **Current preview build
(2026-10-28): EAS `979ccd6b-9469-44ae-8389-93b8a241f355`** with Firebase (EAS secret file `GOOGLE_SERVICES_JSON`; FCM V1
key uploaded by the founder); `mobile/fingerprint.config.js` ignores EAS secret files so local and EAS fingerprints match.
Check OTA compatibility against this build id from now on. Sample families: `npm run seed:samples` in `kinmap/server`
(fictional, public-domain stand-in photos; demo account `kinmap-samples@somedude.app`, password only in the ignored
`server/.env`); sample trees end in "(sample)". Family-written text is translated for readers by the API (`server/src/translate.js`,
`GET /trees/:id/translations`, cached in `content_translations`); the app overlays it (`mobile/src/lib/translations.ts`). somedude.app/privacy
covers the company site. The free plan has no backups: no real family data before Pro
or a backup script. The direct DB host is IPv6-only; a Vercel-hosted API needs the pooler string.

The database password lives in the git-ignored `kinmap/server/.env` (`DATABASE_URL`) and in
`supabase_kinmap_key.txt` here, which `.gitignore` now excludes (`*key*`); move it to a password manager.

The Supabase database URL shared in chat had a `[YOUR-PASSWORD]` placeholder. Never guess it or put
database passwords, service-role keys, AI keys, or other secrets in this repository, a client app,
logs, or chat. The publishable/anon key is not a database password. Load secrets from ignored local
environment files or a managed secret store; enforce authorization on the server/database.

## Repository map

| Project | GitHub repository | Local folder in the original workspace | Notes |
|---|---|---|---|
| Kinmap | [miguelmorales95/Kinmap](https://github.com/miguelmorales95/Kinmap) | `kinmap/` | Expo/React Native mobile app; Node/Express server |
| Afoot | [miguelmorales95/Afoot](https://github.com/miguelmorales95/Afoot) | `Afoot/` | Renamed from `whatsup` on 2026-10-23; GitHub redirects the old URL |
| NoBucks (formerly Clover) | [miguelmorales95/NoBucks](https://github.com/miguelmorales95/NoBucks) | `NoBucks/` | React/Vite frontend; Node/Express/Prisma backend. Renamed from `MyCommunity` on 2026-10-23 |
| Company docs | [miguelmorales95/SomeDude_Company](https://github.com/miguelmorales95/SomeDude_Company) | `MASTER/` | This repository holds company planning and design docs, not the app source |

These repositories live beside `MASTER` in the original Windows workspace. The table documents the
known layout; a new machine may use a different parent directory. Locate the checked-out repositories
before running commands. Do not assume this company-docs repo contains app code.

## Useful app commands

Run commands from each repository root (or use the corresponding package manager's prefix option).

- Kinmap: `npm test` runs server tests and the mobile TypeScript check. `npm run server` starts the
  API; `npm run app` starts Expo. Node.js 22.9 or newer is declared for the server.
- Afoot: `npm run dev` starts the Next.js app; `npm run build` checks a production build. Its
  Supabase schema is under `supabase/`.
- NoBucks: follow its root and `server/README.md`; frontend commands and backend commands run in their
  respective package roots. It uses React/Vite and a Prisma/Postgres API.
- Do not start long-running dev servers as part of an ordinary verification run unless asked.

## Working with this repository

- Keep this repo focused on company context and decisions, plus the static company site in `site/`
  (somedude.app). App implementation belongs in its own repository.
- Read the relevant app code and current Git state before acting; update documentation when decisions
  change. Call out assumptions and distinguish estimates from observed metrics.
- Preserve each app's personality while following the shared design system: warm, human, clear,
  trustworthy, accessible, and privacy-respecting.
- Do not commit local data, credentials, service-role keys, `.env` files, generated dependencies,
  temporary builds, or private family information.
- Before pushing, inspect `git status`, the remote, and the staged diff. Never force-push or overwrite
  remote work to resolve an authentication or history problem.

## Previously discussed planning estimates (not forecasts)

A prior Kinmap scenario modeled approximately $7.50/month blended revenue per paying family, 15%
payment/platform fees, $1.50/month variable cost per family, and $150/month fixed operating costs.
Under those assumptions it estimated roughly 30–40 paying families to cover app costs and about
850–1,100 to support a modest $4,000/month developer income. The earlier cash planning range was
$3,000–$7,000 for a lean beta/runway excluding founder salary, or roughly $53,000–$60,000 for a
12-month plan including a $4,000/month draw. These rough calculations omit important unknowns such as
taxes, actual channel fees, support, marketing, legal/accounting, churn, acquisition cost, and actual
AI/media usage. Recalculate from measured data before using them for fundraising or public claims.
