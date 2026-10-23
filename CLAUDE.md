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
  details or make family hardship a marketing gimmick.
- **Portfolio:** Kinmap (family history), Afoot (local events), Clover (neighborhood mutual aid).
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
possible newsletters or ticketing referrals later. Avoid behavioral tracking unless the founder
explicitly revisits the product's privacy promise.

### Clover — mission and organization funding

Clover is a cashless neighborhood mutual-aid/time-bank product using “sprouts.” Keep participation
and help central; do not take a cut of trades or charge users in a way that undermines mutual aid.
Explore grants, nonprofit/city/organization pilots or licensing, and optional nonessential cosmetics.

## Shared technology direction

The intended direction is a gradual shared foundation—Supabase Auth and Postgres, app-isolated
schemas, careful row-level security, protected media, shared identity, and budget-capped AI—only where
it reduces real duplicated work. Do not move existing production data or change app schemas in place
without a reviewed migration, backup, and verification plan.

**Current Kinmap Supabase status as of 2026-10-23:** a local SQL migration exists at
`../kinmap/supabase/migrations/20261023000000_somedude_core_kinmap.sql`. It creates additive `core`
and `kinmap` schema foundations with RLS. It has not been confirmed applied to the Supabase project,
and Kinmap's running app still uses development-only `x-user-id` authentication and local JSON-file
storage. The migration alone does not connect the app to Supabase. Do not claim live Supabase
integration until the migration, auth, API/data access, and private media path have been implemented
and tested.

The Supabase database URL shared in chat had a `[YOUR-PASSWORD]` placeholder. Never guess it or put
database passwords, service-role keys, AI keys, or other secrets in this repository, a client app,
logs, or chat. The publishable/anon key is not a database password. Load secrets from ignored local
environment files or a managed secret store; enforce authorization on the server/database.

## Repository map

| Project | GitHub repository | Local folder in the original workspace | Notes |
|---|---|---|---|
| Kinmap | [miguelmorales95/Kinmap](https://github.com/miguelmorales95/Kinmap) | `kinmap/` | Expo/React Native mobile app; Node/Express server |
| Afoot | [miguelmorales95/whatsup](https://github.com/miguelmorales95/whatsup) | `Afoot/` | Product and local folder are Afoot; remote repository is still named `whatsup` |
| Clover | [miguelmorales95/MyCommunity](https://github.com/miguelmorales95/MyCommunity) | `MyCommunity/` | React/Vite frontend; Node/Express/Prisma backend |
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
- Clover: follow its root and `server/README.md`; frontend commands and backend commands run in their
  respective package roots. It uses React/Vite and a Prisma/Postgres API.
- Do not start long-running dev servers as part of an ordinary verification run unless asked.

## Working with this repository

- Keep this repo focused on company context and decisions. App implementation belongs in its own
  repository.
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
