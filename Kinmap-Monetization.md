# Kinmap monetization

**Owner:** Miguel Morales · **As of:** 2026-11-01 · **Status:** working plan. Prices are hypotheses to
test with families. Decisions and results are logged in [Kinmap-Decisions-Journal.md](./Kinmap-Decisions-Journal.md).

Kinmap is a family keepsake that families pay for. It never shows ads, never sells or shares family
data, and never promises "unlimited" anything it can't afford. Limits exist so the service stays
sustainable and honest, and they're enforced in code, not just in the terms.

**The offer (decided 2026-11-01), two ways to buy:**
1. **A Family Project** (also sold as a gift): a building period paid monthly, then the tree is kept
   for good, read-only, with a credit toward something printed.
2. **Printed keepsakes**, which anyone can order at any time, including Free families.

---

## 1. Plans and products

### Family Projects

| | **Free** | **6-Month Family Project** | **Year Family Project** |
|---|---|---|---|
| Price | $0 | **$14.99 a month for 6 months** ($89.94), or $84 paid once | **$12.99 a month for 12 months** ($155.88), or $139 paid once |
| Building (AI, uploads, editing, invites) | Free limits (§11) | 6 months | 12 months |
| Afterwards | stays on Free | **Keep forever** (read-only for good, §8.3) | **Keep forever** |
| Print credit | — | **$15** | **$30** |
| AI while building | ~30 uses a month | ~500 a month | ~500 a month |
| Photo and video storage | 1 GB | 50 GB | 50 GB |
| People in the tree | No limit | No limit | No limit |
| Keepsake file (full export) | Yes, always | Yes, always | Yes, always |

- **Advertised as the monthly price** ("$12.99 a month for a year"). It's a fixed plan, not an open-ended
  subscription: Stripe charges 6 or 12 times and then stops (the same `cancel_at` pattern as Afoot's
  sponsor billing). **Keep forever starts once the plan is paid in full.** If payments stop, building
  pauses and the tree stays on Free limits; nothing is deleted.
- **Gifts are paid once** ($84 or $139): the giver buys, the recipient gets a code.
- **Reopen editing** any time after: **$9.99 a month**, stop whenever. **Keep forever alone** (for Free
  families who are done building): **$59** once.
- **Founding families** (the pre-sale, §12): **$9.99 a month** for the Year Project ($119.88, or $109 once)
  and **$11.99 a month** for 6 months ($71.94, or $69 once), for the first 100 families.

Rough profit per sale (estimates; replace with real numbers):

| | Year | 6-Month | Year, founding |
|---|---|---|---|
| Paid | $155.88 | $89.94 | $119.88 |
| Card fees (2.9% + $0.30 on each payment) | −$8.12 | −$4.41 | −$7.08 |
| AI and storage while building | −$6 | −$3 | −$6 |
| Keep-forever reserve (decades of read-only storage) | −$20 | −$20 | −$20 |
| Print credit, at our cost (~half its face value) | −$14 | −$7 | −$14 |
| **Left** | **~$108** | **~$55** | **~$73** |

### Printed keepsakes (anyone, any time; shipping included in the US)

| Product | Price | Made by (for now) | Our cost (estimate) | Profit (estimate) |
|---|---|---|---|---|
| **Hardcover family book**, up to 40 pages | **$59** | **RPI Print** (published wholesale prices, free API) | $23–29 (print ~$16–22 + shipping $6.99) | ~$28–34 |
| **Wall calendar** | **$35** | Lulu (wire-o calendars) | $18–24 (quote needed) | ~$10–15 |
| **Family binder** (coil-bound) | **$29** | Lulu (coil) → in house later | $16–20 (quote needed) | ~$8–12 |
| **Tree poster** 18×24 | **$39** | Printful or Prodigi → in house later | $20–26 (quote needed) | ~$12–18 |

Only RPI publishes wholesale prices; the other costs are estimates until the free partner accounts are
opened (§10). **In house later:** posters and coil binders move in house only when **both** are true:
(1) the business can pay for the machines out of its own profit (~$4,700: a 24-in printer ~$3,400 and a
coil binder ~$1,300, plus supplies), and (2) there's steady volume (about 25–30 posters or binders a
month). Books always stay with a partner.

**The earlier subscription plan** ($8.99/month or $79.99/year) is replaced by the Family Projects. The
billing code built for it (Kinmap `5853e19`, switched off) needs changing to fixed 6- and 12-payment
plans, Keep forever, gift codes and print credits before launch.

### Rough unit economics while building (per family, estimates)

AI is about $0.001 per story on Haiku 5.5 and is capped (about $0.50 a month at the limit); storage is
~$0.021/GB a month. A family that builds hard for a year costs ~$6–12 in AI and storage, well inside
either project's price. Measure: conversion from Free, Year vs 6-Month mix, gifts, storage per family,
AI per family, print orders per family, support time.

---

## 2. Where people pay

- **On the web (app.kinmap.somedude.app), with Stripe:** Stripe Checkout for the subscription and the
  Stripe Customer Portal to change card, switch monthly/yearly or cancel. This is where upgrades happen.
- **In the Android app:** Google Play's rules require Google Play Billing for digital subscriptions bought
  inside an app, with exceptions in some places (in the US, court-ordered changes have opened links to
  outside payment; check Google's current policy before launch). Until that's decided, the app shows the
  plan and usage, and says plans are managed on the web, without a buy button.
- **iPhone (later):** the same question with Apple's rules. Decide before an App Store release.
- **Physical prints** may be paid with Stripe inside the apps: app-store rules don't cover physical goods.

What happens at a limit:
- At 80%: a gentle note on the plan screen.
- At 100%: new uploads (or AI requests) are refused with a plain message and a link to the **photo
  manager** and the plan. Nothing is ever deleted because of a limit or a downgrade; a tree over its limit
  just can't add more until there's room.

---

## 3. Photo manager

If someone can hit a storage limit, they need a way to make room. One screen for the whole tree:

- **Tabs per person** (plus "Not on anyone": photos uploaded for calendars and slides), each showing that
  person's photos and videos in a grid with their size.
- **Sort by size or date**, and a running total ("2.3 GB of 50 GB").
- **Select many and delete.** Owners and admins delete directly; editors can suggest removals, which go
  through approval like other changes. Deleting removes the file from storage, so it frees space.
- **Possible duplicates** (the same photo uploaded twice) flagged for a quick cleanup, later, by comparing
  file sizes and image fingerprints.

---

## 4. Limits for members (set by owners and admins)

Admins may want to limit one enthusiastic relative without limiting everyone:
- Per member: uploads per month, AI requests per day, and "changes always need approval" (even for an admin).
- Defaults come from the plan; an owner can lower (not raise past the plan) for a member.
- Shown on the Members screen next to each person, so it's never hidden.

---

## 5. Muting, and the same request over and over

A family member may send many similar requests, especially after one is declined. Instead of a dashboard
of filters, **use the app's own strength: talk to it.**

- **Repeated requests:** when a new change is nearly the same as one that was declined (same kinds of
  changes about the same people), it's marked "Similar to one you declined" and grouped with it, so an
  approver can decline both at once. After a few declines of the same thing, the author sees a kind note
  instead of sending it again.
- **Muting by voice or text:** on the Updates screen, "Tell Kinmap what to quiet". For example:
  - "Mute photo requests from Javier for a week."
  - "Only tell me about new people, not facts."
  - "Stop alerts from the Morales side until Sunday."

  The AI turns that into a rule (who, which kinds of changes, until when), shown as a chip ("Javier's
  photos, muted until Nov 3") that can be removed with one tap. Muted changes still arrive in Updates
  under "Muted"; nothing is lost or auto-declined.
- **Needs first:** push notifications. Today the app shows a waiting count; alerts (and therefore muting
  alerts) need push notifications added in a native build.

---

## 6. Easy sign-in (Google, Facebook, Apple)

**Built (2026-10-28):** Google sign-in on the web (Kinmap `3d3cfd5`) and on phones (`13d7922`, in the
next native build). The button appears by itself once a provider is switched on in Supabase (the app
reads Supabase's public settings), so nothing breaks before then. Sign-in uses PKCE and returns people
to where they were, such as an invite link. Someone who signed in by email before and then uses Google
with the same address gets the same account (Supabase links verified emails). Email codes stay as the
fallback.

Founder steps for Google:
1. Google Cloud Console → APIs & Services → OAuth consent screen: app name Kinmap, support email,
   `somedude.app` as the authorized domain, privacy policy `https://kinmap.somedude.app/privacy`.
   Scopes: email, profile, openid only. Publish it ("In production"); these basic scopes need no review.
2. Credentials → Create OAuth client ID → **Web application**. Authorized redirect URI:
   `https://puskxnikpiusgvtzhire.supabase.co/auth/v1/callback`. (Phones sign in through the same web
   client, in a sign-in browser, so no Android client is needed.)
3. Supabase → Authentication → Sign In / Providers → Google: turn on, paste the client ID and secret.
4. Supabase → Authentication → URL Configuration → Redirect URLs: add
   `https://app.kinmap.somedude.app/**` and `kinmap://**`.
5. Open app.kinmap.somedude.app signed out: "Continue with Google" appears. Try it.

**Apple (built 2026-10-29, Kinmap `dff0d19`):** on iPhone, Apple's own sign-in sheet
(`expo-apple-authentication`, with a nonce); on Android and the web, Supabase's browser sign-in. The
name Apple shares the first time becomes the Kinmap name. It appears once Apple is switched on in Supabase.
Founder steps (needs the Apple Developer Program, $99/yr; enrollment can take a day or two):
1. developer.apple.com → Certificates, Identifiers & Profiles → **Identifiers → App IDs**: register
   `com.somedude.kinmap` (and `com.somedude.kinmap.preview`) with **Sign In with Apple** ticked.
2. **Identifiers → Services IDs**: add one, e.g. `app.somedude.kinmap.web`, tick Sign In with Apple →
   Configure: primary App ID `com.somedude.kinmap`, domain `puskxnikpiusgvtzhire.supabase.co`, return URL
   `https://puskxnikpiusgvtzhire.supabase.co/auth/v1/callback`.
3. **Keys**: create one with Sign In with Apple; download the `.p8` file (once only) and note the Key ID and
   your Team ID (top right of the developer site). Keep the `.p8` in a password manager.
4. Supabase → Authentication → Sign In / Providers → **Apple**: turn on; Client IDs
   `app.somedude.kinmap.web,com.somedude.kinmap,com.somedude.kinmap.preview`; Secret Key: the client secret
   made from the `.p8` (Supabase's Apple page links a generator). **It expires every 6 months**: put a
   reminder in the calendar to make a new one.
5. People who choose "Hide my email" get an `@privaterelay.appleid.com` address. For Kinmap's emails to reach
   them, register `somedude.app` (and `kinmap@somedude.app`) under **Services → Sign in with Apple for Email
   Communication**.

Facebook later: an app at developers.facebook.com with Facebook Login, the privacy policy URL and the
data-deletion URL (kinmap.somedude.app/delete-account), then Supabase → Providers → Facebook. Facebook
reviews the app before the public can use it. Apple: required by Apple for any iPhone app that offers
Google or Facebook sign-in; needs the Apple Developer account ($99/yr). The code already handles both.

Afoot already has Google and Facebook sign-in through its own Supabase project.

## 7. What's built, and what's next

- [ ] **Family Projects billing, live demo, four-language site, updated terms and privacy (2026-11-01,
      Kinmap branch `release-projects-demo-site`, 106 tests pass, not on `main` yet):** fixed 12- and
      6-payment projects with `cancel_at`, pay once, gifts (`KIN-XXXX-XXXX-XXXX`), print-credit ledger,
      read-only Keep forever (`requireEditing`), reopen at $9.99/month, founding prices for the first 100
      (`FOUNDING_FAMILIES`); `app.kinmap.somedude.app/demo` (read-only sample families via a `kinmap_demo`
      database role and a public `samples` bucket); the site in English, Español, 普通话 and 廣東話, a /demo
      page, and draft terms and privacy for review. Migrations `20261102000000_family_projects` and
      `20261102010000_demo`. Not built yet: print ordering, the founding-price lock on reopening, and a
      3-month reopen option. Billing stays off until `BILLING_ENABLED=true`.
- [x] AI spending caps per tree and per person (`ai_usage`, `budget.js`).
- [x] Keepsake export and account deletion (free, always).
- [x] **Plans and Stripe (Kinmap `5853e19`, live but off, 2026-10-27):** `tree_plans` table (applied after a
      backup); limits by plan for storage (checked before each upload), AI (monthly dollars) and members
      (checked when inviting), set in `server/src/plans.js` or by env (`FREE_STORAGE_GB`,
      `FAMILY_AI_MONTHLY_USD`, ...). Stripe Checkout, Customer Portal and a signed webhook
      (`/stripe/webhook`) on the API; deleting a tree cancels its subscription. "Plan & storage" under More
      shows usage bars; upgrade buttons appear only on the web, for the owner. Until `BILLING_ENABLED=true`,
      nothing is limited by plan and the screen says plans aren't available yet. 8 tests.
- [x] **Photo manager (section 3; Kinmap `2d2546f`, live 2026-10-28):** More → Photos & videos. Tabs for
      All, each person, "Not on anyone" and "Maybe repeats" (same kind and exact size), sort by newest or
      largest, select many (or press and hold) and delete for good after a confirmation. Deleting removes
      the file itself, so it frees space; pins to a deleted photo go too. Owners and admins delete (Storage
      policy `20261028000000` lets admins delete files); editors and viewers can look. Editors suggesting
      removals through approval: built (`2f403de`): editors select photos and "Suggest deleting"; approving
      deletes the files. Also linked from Plan & storage.
- [x] **Member limits (section 4; Kinmap `09c7615`, live on the web 2026-10-29):** on the Members screen the
      owner (or an admin, for editors and viewers) sets uploads a month, AI requests a day, and "changes
      always need approval" (an admin set this way can't approve their own). Everyone sees the limits and
      this month's use on the member's card. The owner can't be limited; a new owner's limits are cleared.
      Limits here are per member and come on top of the plan's; "can't raise past the plan" applies to AI
      (the general daily cap still holds).
- [x] **Push notifications (Kinmap `13d7922`, in the next native build):** owners and admins hear when an
      update waits for review; authors hear when theirs is approved or declined; in each phone's language,
      with only who and which tree on the lock screen; tapping opens the update. Tokens in `push_tokens`
      (migration applied), removed on sign-out or when Expo reports the phone gone. Android needs
      Firebase (below) before notices arrive.
- [x] **Similar requests and quiet rules (section 5; Kinmap `ff1f112`, web live 2026-10-29):** a waiting update
      that repeats one declined in the last 90 days (same author, mostly the same kinds of change about the same
      people) is marked "Similar to one declined", approvers can "Decline all like this", and after two declines
      the author sees a kind note. Owners and admins type or say what to quiet on Updates ("Mute photo requests
      from Javier for a week"); the AI (or a keyword parser) makes a rule shown as a removable chip; muted
      updates sit under "Muted" and send no notifications.
- [x] Google sign-in (section 6): web live, phones in the next native build. Apple: built (`dff0d19`), founder
      setup in section 6. Facebook: founder setup only.
- [x] **Per-tree notification settings** (`dff0d19`): More → Notifications: "updates waiting for my review"
      (owners and admins) and "when my updates are approved or declined", per tree. Quiet rules stay on Updates.
- [ ] Founder: switch billing on (below); an accountant's check on sales tax for digital subscriptions
      (Stripe Tax can collect it).

### Turning on Android notifications (founder, before the next build)

1. console.firebase.google.com → Add project ("Kinmap"; Analytics off).
2. Add an Android app with package `com.somedude.kinmap.preview` (and later the store package), download
   `google-services.json`. It holds public identifiers, but keep it out of the repo anyway.
3. In `kinmap/mobile`: `npx eas-cli env:create --name GOOGLE_SERVICES_JSON --type file --value
   <path to google-services.json> --environment preview --visibility secret`.
4. Firebase → Project settings → Service accounts → Generate new private key (a JSON file). This one is a
   real secret: upload it to EAS with `npx eas-cli credentials` → Android → preview → Google Service
   Account → "Push Notifications (FCM V1)", then delete the downloaded file.
5. Then a new preview build (`npx eas-cli build --profile preview --platform android`), which also
   brings Google sign-in to the phone. Installed builds keep working, but stop getting over-the-air
   updates until the new build is installed.

### Switching billing on (founder)

1. Create a Stripe account (business details, bank account). Work in **test mode** first.
2. Products → add "Kinmap Family" with two recurring prices: $8.99 monthly and $79.99 yearly. Copy both
   price ids (`price_...`).
3. Settings → Billing → Customer portal: allow cancelling, switching between the two prices and updating
   the card. Save.
4. Developers → Webhooks → add endpoint `https://api.kinmap.somedude.app/stripe/webhook` with the events
   `checkout.session.completed`, `customer.subscription.created`, `customer.subscription.updated` and
   `customer.subscription.deleted`. Copy its signing secret (`whsec_...`).
5. In Vercel → project `kinmap` → Settings → Environment Variables, add `STRIPE_SECRET_KEY`,
   `STRIPE_WEBHOOK_SECRET`, `STRIPE_PRICE_FAMILY_MONTHLY`, `STRIPE_PRICE_FAMILY_YEARLY` and
   `BILLING_ENABLED=true`, then redeploy. (Keys go only in Vercel, never in a repo or chat.)
6. On app.kinmap.somedude.app, open a test tree → More → Plan & storage → Family yearly, pay with Stripe's
   test card `4242 4242 4242 4242`, and check the screen shows Family. Then repeat in live mode with live
   keys.
7. Before turning it on for real families: tell existing testers, since Free limits start applying
   (1 GB, about 30 AI stories a month, 5 members).

---

## 8. Ideas explored (2026-11-01; the decisions are in §1)

The founder's idea: lead with **things we make and mail to you** (books, posters, binders,
calendars) as the reason to pay, and turn the subscription into a **project you finish**: pay while the
family is building the tree, then keep it readable for good for a one-time fee, and reopen editing later
when someone (a grown grandchild) picks it up again. This section tests how realistic that is.

### 8.1 Printing as the headline, not as a replacement for export

**Keep the keepsake export.** Printing should be the thing families are proud to buy; export stays free
and always on (§1). Three reasons:
- "We care about your data" only holds if families can take it with them. Removing export would be the
  opposite: data that can only leave as something we sell.
- Privacy laws give people a right to a copy of their data (California's applies once a business is big
  enough; Europe's applies to any EU user). Building around it now is cheaper than adding it back later.
- Export costs almost nothing (the app builds the file on the phone). Removing it saves no money.

The message can still be: *"Your family's story belongs to you. Download it any time, free. Or let us
make it into a book and mail it to you."*

### 8.2 Making prints in house: what's realistic

| Product | In house? | Equipment (one-time) | Cost per piece | Time per order | Verdict |
|---|---|---|---|---|---|
| **Wall poster** (18×24 in, the tree) | **Yes** | 24-in photo inkjet $1,500–3,500 (13-in desktop $900 covers 13×19 only) | ink + paper $3–6, tube + postage $8–12 | 15–20 min | Good first in-house product: easy, high perceived value, already built (`/prints` poster PDF). |
| **Family binder** (coil-bound, 20–60 pages) | **Yes** | color laser $500–900 + coil binder $150–300 | $5–10 (paper, toner, covers, coil), Media Mail $4–6 | 20–30 min | Realistic. The binder PDF already exists. Feels homemade in a good way. |
| **Wall calendar** | **Yes** | same as the binder | $6–10 + postage $4–6 | 20–30 min | Realistic; very strong in Nov–Dec. Already built. |
| **Hardcover photo book** | **No** | case binding, laminating, trimming: thousands of dollars and real skill | — | 1–2 h | Use a print-on-demand partner (Lulu, Peecho, Prodigi, Gelato and similar print and ship under your name). Typical 8×8 hardcover, 40 pages: $18–30 + $6–9 shipping. |

**The real limit is your time, not equipment.** With a regular job, 20–30 minutes an order is ~10–15
orders a week before evenings and weekends are gone. The base case reaches ~100 print orders a month
around month 24 (~300 in December). So:
1. **Start with a print-on-demand partner for everything** (no equipment, no inventory, it ships for you).
   Price so each order earns $12–20.
2. **Bring posters, binders and calendars in house** once there are ~30–50 orders a month and you've seen
   which sell. The equipment pays for itself after ~100–200 orders.
3. **Keep hardcover books with a partner** indefinitely.

In-house saves roughly $5–15 per poster or binder compared with a partner. That's real at volume, but not
worth the time before then.

**Pricing to reach everyone:** a **$19 binder** and **$25 poster** (shipped) stay affordable and still
earn $8–15 in house. A **$49–59 hardcover book** through a partner earns $15–25. A free-tier family can buy
prints too: prints are the friendliest way to convert people who'll never pay monthly.

### 8.3 "Keep forever" (read-only for good, one-time)

The idea: the subscription pays for **building** (AI, uploads, editing). When the family is done, they pay
once to keep the tree **readable** for the long term. AI and editing are off; viewing, slideshows,
keepsakes and ordering prints stay on.

| | Estimate |
|---|---|
| Storage for a typical finished tree (2–5 GB) | $0.04–0.10 a month today (Supabase Storage ~$0.021/GB) plus a little bandwidth |
| 30 years of that, at today's prices | ~$15–35 (storage prices have fallen over time; don't count on it) |
| **Price idea** | **$59–79 one-time**, with ~$15–20 per family set aside in a reserve |

**What can honestly be promised** ("for your grandkids" is decades, longer than most companies last):
- *"Your tree stays online, read-only, for as long as Kinmap runs, with no more payments."*
- *"If Kinmap ever shuts down, every Keep-forever family gets at least 6 months' notice, their full keepsake
  file, and a printed index of their tree."* That is the real guarantee, and another reason export stays.
- Don't use "guaranteed forever" or "lifetime" without that wording; have the terms reviewed.

**Reopening editing later:** a grandchild (or anyone) pays to switch building back on: **$9.99 a month**
or **$29 for 3 months**, with AI limits as usual. The tree, its history and its members are all still there.

**Passing the tree on:** owners name **future admins** ("heirs"). An heir gets owner rights when the owner
hands over the tree, or after the owner has been inactive for, say, 12 months and doesn't answer
reminders. Children can be named by email for later; accounts for under-13s stay off (COPPA). The app
already lets an owner give a tree to a member (Account & keepsakes), so this builds on existing code.

**Effect on money:** it turns "cancel" into "graduate": a family that would have churned to $0 pays
$59–79 once and can come back. Recurring revenue stops sooner for some families, but they never fully
leave, and the "it's safe for decades" promise should help families commit in the first place.

### 8.4 The Family History Project (a bundle with a start and an end)

Sell Kinmap as a **months-long project with a finished product**, not an open-ended subscription:

| | **Family History Project** |
|---|---|
| Price idea | **$149** (one-time) |
| Includes | 12 months of building (AI, uploads, editing), **Keep forever** afterwards, a **hardcover book** of the tree and stories, and a **wall poster** |
| Product cost | book $25–35 shipped (partner) + poster $10–15 in house, or $18–25 via partner, + card fees ~$5 + a year of AI and storage ~$5–10 |
| Profit | **~$75–90** up front, vs ~$60–70 for a plain $79.99 year |
| Story | Month 1: record the elders. Months 2–6: everyone adds photos and memories. Month 9 or so: we make the book and mail it. Then it's kept for good. |

Also possible: a **$79 starter** (6 months + Keep forever + a binder). Bundles are also natural **gifts**
("give Grandma her story").

### 8.5 Other ways to earn sooner

Roughly fastest first:
1. **Founding-family pre-sale (this holiday season):** sell the Family History Project at a founder price
   ($99–119) now with a clear delivery date for the book (say, by Mother's Day 2027). A Stripe payment link
   is enough; billing in the app can wait. Gives cash and real demand data before the March launch. The
   FTC's mail-order rule requires shipping by the promised date (or offering a refund), so give a date you
   can keep.
2. **Gift cards and gift bundles** for Christmas, Mother's and Father's Day, and Grandparents Day (Sept).
3. **Holiday calendars:** the photo calendar is built; sell it in November and December, even to free
   families.
4. **"We'll interview Grandma" add-on ($99–199):** a 60-minute guided call recorded into the tree. High
   price, but it uses your hours, so cap it at a few a month or train a helper.
5. **Reunion and memorial packages:** slideshow + posters + binders for an event, ordered by one organizer.
6. **A custom family-tree poster on Etsy:** buyers come for the poster and discover the app. Etsy takes
   ~10%, but it's free traffic.
7. **Referral credit:** "invite a family, both get $10 off a print".
8. **Group plans** for genealogy societies, churches and family associations (one invoice, many trees).

### 8.6 What to test first

1. Put the binder and poster prices on the "Plan & storage" screen as a **pre-order** and count clicks
   before buying anything.
2. Run the founding pre-sale with 20–50 families; see what share choose the bundle over a plain year.
3. Ask early families whether "Keep forever" would make them more likely to start.
4. Track print orders per paying family per month: the revenue model (Company-Revenue-Timeline.md §3b)
   assumes 10%, which is the least certain number in it.

---

## 9. Project pricing: pay for a building season, keep it forever (2026-11-01)

> **Superseded on prices by §1:** the Summer/Year figures below ($99/$149 up front) became the 6-Month and
> Year Family Projects paid monthly ($14.99 × 6, $12.99 × 12). The reasoning still holds.

Instead of an open-ended subscription, families buy a **project**: a building season (AI, uploads,
editing, inviting) followed by **Keep forever** (read-only for good, §8.3). Editing can be reopened any
time. Prints are always extra, ordered in the app.

| | **Free** | **Summer Project** | **Year Project** | **Reopen editing** | **Keep forever only** |
|---|---|---|---|---|---|
| Price idea | $0 | **$99** once | **$149** once | **$29** for 3 months (or $9.99/mo) | **$59** once |
| Building | small tree, ~30 AI uses a month, 1 GB | 3 months (e.g. Memorial Day → Labor Day) | 12 months | 3 months at a time | — |
| After building | stays as is (Free limits) | Keep forever | Keep forever | back to Keep forever | Keep forever |
| AI | ~30 a month | ~500 a month while building | ~500 a month while building | ~500 a month | none |
| Storage | 1 GB | 50 GB | 50 GB | 50 GB | what's there, read-only |
| Good for | trying it | a summer family-reunion push | a year of gathering, ending with a book | a grandchild picking it up later | free families who finished |

Rough profit per sale (estimates): Summer ~$75 and Year ~$115 after card fees (~3%), AI and storage
while building (~$1–10) and a **$15–20 reserve** per family for long-term read-only storage. A plain
$79.99 year earns ~$70 and then usually lapses.

**Why it may sell better than a subscription:**
- It matches how families actually work: an intense season of gathering, then years of looking.
- "Pay once, it's kept for your grandkids" is easier to say yes to than "$8.99 a month forever," and it's a
  natural **gift** (Mother's Day, Christmas, a grandparent's birthday).
- Nobody "cancels": finished families stay in the app, can order prints any time, and can reopen.

**Risks and how to handle them:**
- **Fewer people pay $99–149 up front than $8.99 a month.** The model (Company-Revenue-Timeline.md §3c)
  is still ahead of the subscription with half as many buyers, but test both: offer the Year Project and a
  monthly plan side by side to the first 50–100 families.
- **No recurring base:** income depends on steady new sales; it flattens when growth does. Prints,
  reopenings and gifts are the repeat revenue.
- **Storage piles up:** every finished family costs ~$0.04–0.10 a month forever. The reserve covers
  decades at today's prices; keep reserves in a separate account and re-check yearly.
- **App stores:** a one-time digital purchase inside the Android or iPhone app goes through the stores
  (15% at the small-business rate). Selling on the web avoids it; check each store's current rules first.

### 9.1 Should printable PDFs go away?

First, a correction to the premise: **Kinmap doesn't keep the family's data on the phone.** The app stores
only the sign-in; the tree, stories and photos live on Kinmap's servers. If Kinmap disappeared, a phone
would have nothing. So two different things need separating:

| | What it is | Recommendation |
|---|---|---|
| **Keepsake file** (ZIP: the whole tree as data, every photo and video, a page that opens in any browser) | The family's own data | **Keep, free, always.** It's the real backup and the honest version of "we care about your data". It isn't a print file, so it doesn't give away print sales. |
| **Print-ready PDFs** (poster, binder, calendar) | A product made from the data | **Can stop being free downloads.** Families order the print instead; Kinmap sends the file straight to the printer (in house or a partner's API), so the family never needs a PDF. |

Suggested change:
- **Poster, calendar, book:** order only, with an on-screen preview. No downloadable print file.
- **Binder:** keep a **print-at-home** version for families who can't pay for shipped prints (plain letter
  paper, smaller photos), included with a Project (or $5 for Free families). It keeps "everyone can have
  access" true and hardly competes with a bound book.
- The founder's point stands: a downloaded PDF tends to be kept and printed elsewhere. Moving print files
  behind an order is reasonable because they're a **product**; the **data** stays free to take.

Nothing has changed in the app yet; this needs the founder's decision (and the print partner chosen in
§10) first.

---

## 10. Print partners and the in-house split (2026-11-01)

Full research: [research/kinmap-print-partners-la.md](./research/kinmap-print-partners-la.md) (12 LA-area
shops, 7 online print APIs, equipment and shipping costs). **No LA shop publishes book or poster prices:
every LA figure needs a quote.**

### Who to meet first (LA)

1. **Harman Press / A&I** (North Hollywood): HP Indigo presses, a bindery for hard- and soft-cover digital
   books, and wide-format fine-art printing. Could do books and posters in one place. The source is
   older: call to confirm.
2. **Axiom Designs & Printing** (Glendale): case-bound hardcover with no stated minimum, ~10–12 days.
3. **Kater-Crafts Bookbinders** (Pico Rivera): a bindery since 1948, for binding small lots of
   digitally printed pages.
4. **Typecraft** (Pasadena): a fourth option.

**What to ask each:** price for 1, 10 and 50 copies of an 8×8 hardcover (20 and 40 pages) and an 18×24
poster; whether they'll **drop-ship to families under Kinmap's name** (blind shipping); file specs (PDF/X,
bleed); how orders arrive (email, FTP, an API); turnaround; and a test copy.

**Online baseline, to compare quotes against and to start with:** **RPI Print** (the network behind Blurb)
publishes wholesale prices with a free self-service API: 5×8 hardcover from **$9.70**, extra pages
$0.02–0.34, shipping from **$6.99**. **Lulu** covers hardcover, coil and calendars (prices not published,
no API fee). **Prodigi** does books and posters (wholesale prices not published). An API partner prints and
ships every order without the founder touching it.

### What to do in house, what to hand off (at 5–50 orders a month)

| Product | Who | Why |
|---|---|---|
| **Hardcover book** | **Partner, always** | Case binding isn't a home job. |
| **Poster** | **Partner at first; in house past ~25–30 a month** | A 24-in printer is ~$3,000–3,800 plus ink. Shipping a tube costs ~$14 (18×24) to ~$20 (24×36) by USPS, so price posters at **~$35–45 shipped**, not $25. Local pickup (South Bay) saves the shipping. |
| **Coil binder** | **In house possible** (binder $900–2,000 with a color laser) **or partner** (Lulu coil) | Flat Media Mail (~$5 for 2 lb) keeps it cheap: a **$19–25 binder** still earns ~$8–12. |
| **Calendar** | **Partner** | Seasonal; a partner absorbs the December spike. |

Corrections to §8.2: poster shipping is higher than first estimated ($14–20, not $8–12), and a
professional 24-in printer costs more ($3,000–3,800). The plan is the same: start with partners, bring in
house only what sells steadily, and never books.

### Effect on the plan

- **Prices** (set in §1, to confirm with real quotes): binder $29, calendar $35, poster $39, hardcover
  book $59, shipping included. Each should earn ~$10–34.
- **The Year Project ($149, §9)** can include a print credit (say $25) instead of a specific product, so
  it doesn't depend on one partner's pricing.
- **Order flow:** the app sends the print file straight to the partner's API (or to the founder's queue
  for in-house items); the family pays with Stripe in the app or on the web (physical goods aren't bound by
  the app stores' billing rules). No print file is ever downloaded (§9.1).
- **Next step:** call the top three LA shops for quotes and a sample, and open a free RPI or Lulu account
  to order one test book of a sample family.


---

## 11. The Free tier

**Purpose:** let a family try Kinmap for real, invite relatives, and fall in love with it, so they buy a
Family Project or a printed keepsake. Free should be generous where it's cheap and limited where it costs
money.

| | Free | Why |
|---|---|---|
| People in the tree | **No limit** | A person is a few hundred bytes of text: 10,000 people cost less than one photo. Limiting the family history itself would feel petty and saves nothing. |
| Members (relatives invited) | **Up to 5** (decided 2026-11-01) | Enough to try it with close family; a Project removes the limit. |
| Photo and video storage | **1 GB** (~300–500 photos) | Storage is the main ongoing cost (~$0.02 a GB a month, plus bandwidth). |
| AI (talking, answers, "Check my tree") | **~30 uses a month** | ~$0.03 a month at Haiku prices; the cap protects against abuse. |
| Typing and editing by hand | No limit | Free to run. |
| Boards, slideshows, links | Yes | Cheap, and they make the tree worth sharing. |
| Keepsake file | Yes, always | The family's own data (§9.1). |
| Printed keepsakes | Can buy any time | Prints are the friendliest first purchase. |
| How long it stays | **1 year after the last activity** (decided 2026-11-01) | A Free tree that nobody opens or changes for 12 months is deleted, after the owner and admins are warned at least 30 days ahead (opening it once keeps it). Projects and kept-forever trees are never deleted for inactivity. Shown in bold on the pricing page. |

**Cost of Free at scale (estimate):** 1,000 Free trees at ~0.5 GB each and light AI ≈ **$15–30 a month**.
That's affordable as marketing, as long as conversion to Projects or prints is measured (journal).

**Should people be unlimited "because the data is on the phone"?** People should be unlimited either
way; see §13 on whether to move the tree onto phones.

---

## 12. Founding-family pre-sale (holiday 2026)

**What:** the first 100 families can reserve a Family Project at the founding price (§1): $9.99 a month
for the Year Project, $11.99 for 6 months, or a one-time payment for gifts.

**Timing, without promising a date we can't keep:** building starts **the day the family joins** (the app
works today, in beta); the print credit can be used **whenever their tree is ready**, any time during
their project or within a year after. No book is promised for a fixed holiday, so no family is rushed and
the mail-order rule's shipping promise only starts when they actually order a print.

**How it sells:**
- A page at **kinmap.somedude.app/founding** with both packages and the products; until Stripe payment
  links exist, "Reserve" sends an email and the founder replies with the link.
- **Gift angle for December:** "Give your family a year of gathering their story": the giver pays once,
  the recipient gets a printable gift card with a code.
- Founding families get the founding price locked for any later reopening, and their name in the app's
  credits if they want it.

**What it needs before taking money:** Stripe payment links (or the fixed-plan checkout), a refund rule
(full refund within 30 days, no questions), the terms updated for projects, Keep forever and prints
(what "forever" means: §8.3), and a simple way to record who bought what (the journal, then the app).

---

## 13. Keeping the family's data on their phones (question, 2026-11-01)

**The idea:** the tree lives in an encrypted file on each member's phone; the app is a reader of that
file. Kinmap's server keeps no family data, or only an encrypted copy it can't read, with the key held on
admins' phones. When someone joins, the file is copied to their phone.

**Can we? Yes.** This is called *local-first, end-to-end encrypted* sync. Signal, 1Password and
Standard Notes work this way: each tree has a key; the key is shared with each member's device
(encrypted with that device's own key); the server stores and relays only encrypted data it can't read.
The founder's "the server holds a key and a copy, but not matching ones" is exactly this: the server
holds the encrypted copy, the devices hold the keys.

**Should we, now? Not before launch.** Reasons, in order of weight:
1. **The server copy can't simply be deleted.** Phones are rarely online at the same time, so edits have
   to wait somewhere until each member's phone picks them up. In practice the server keeps an encrypted
   copy permanently. That's fine (it can't read it), but the cost saving disappears.
2. **There's almost no cost to save.** The family's text (people, dates, stories) is tiny: a 500-person
   tree is about 1 MB. The costs are **photos, video and AI**, and moving text to phones changes neither.
3. **Lost phones lose families' history.** If every admin loses their phone or forgets a recovery code,
   an end-to-end encrypted tree is gone for good, the opposite of "for your grandkids". Recovery needs
   printed recovery codes, several admin devices, and careful design.
4. **Features that read the data would need rebuilding:** the AI (it reads the tree to understand "my
   grandma"), translations, print files, the web app, slideshows on other screens, duplicate checks, and
   the role rules (editors propose, owners approve) that the server enforces today.
5. **It's months of work for one person,** and every bug risks data loss. Security reviews of homemade
   encryption are expensive.

**What to do instead (cheaper, most of the benefit):**
- **Now:** keep data encrypted at rest (Supabase does this), private by default, never sold, and always
  exportable (keepsake file). Say this plainly on the site.
- **Next:** an **encrypted copy of the tree on each phone** for offline viewing and speed, plus an
  **automatic keepsake backup** to the family's own device or cloud drive each month. Families then
  literally hold a copy, which is most of what this idea is for.
- **Later, if families ask:** end-to-end encryption for the most private parts (stories, private notes)
  first, with a printed recovery code, as a Keep-forever option ("our server can't read your stories").
