# Kinmap monetization

**Owner:** Miguel Morales · **As of:** 2026-10-27 · **Status:** working plan. Prices and limits are
hypotheses to test with families, not decisions. Billing code is built and switched off (see "What's built").

Kinmap is a family keepsake that families pay for. It never shows ads, never sells or shares family
data, and never promises "unlimited" anything it can't afford. Limits exist so the service stays
sustainable and honest, and they're enforced in code, not just in the terms.

---

## 1. Plans (hypotheses to test)

| | **Free** | **Family** |
|---|---|---|
| Price | $0 | **$8.99 / month or $79.99 / year** per tree (paid by the tree's owner) |
| People in the tree | No limit | No limit |
| Members (relatives invited) | Up to 10 | No set limit (fair use) |
| Photo and video storage | 1 GB | 50 GB |
| AI (talking to the tree, answers, "Check my tree") | About 30 a month | About 500 a month |
| Boards, slideshows, links | Yes | Yes |
| Printable PDFs (binder, poster, calendar) | 1 a month | No set limit |
| Keepsake file (full export) | Yes, always | Yes, always |

Notes:
- **Export is never a paid feature.** The keepsake file is how a family takes its data anywhere; holding
  it hostage would break the promise.
- **People in the tree aren't limited.** Limits fall on what costs money (storage and AI), not on the
  family's history.
- AI limits are counted in dollars behind the scenes (`ai_usage.cost_usd`), so a Family tree's cap is
  about **$0.50 a month** at Haiku 5.5 prices (~$0.001 per story). The per-person daily limit stays as a
  second guard.
- **Prints** (posters, books, calendars ordered through Kinmap) are priced per order with their own
  margin, available on both plans once a print partner is confirmed (see Kinmap-Feature-Specs.md).

### Rough unit economics per Family tree (estimates, recheck with real usage)

| | Monthly plan | Yearly plan (per month) |
|---|---|---|
| Revenue | $8.99 | $6.67 |
| Card fees (Stripe, 2.9% + $0.30) | −$0.56 | −$0.22 |
| Storage, worst case 50 GB (Supabase Storage ~$0.021/GB) | −$1.05 | −$1.05 |
| AI, at the cap | −$0.50 | −$0.50 |
| Email, hosting share | −$0.10 | −$0.10 |
| **Left, at the limits** | **~$6.78** | **~$4.80** |

Most families will use far less than the caps, so real margins should be higher. Measure before changing
prices: conversion from free, monthly vs. yearly mix, storage per family, AI per family, support time.

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
   (1 GB, about 30 AI stories a month, 10 members).
