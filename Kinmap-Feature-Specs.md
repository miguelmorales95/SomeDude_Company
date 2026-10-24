# Kinmap Feature Specs: answering questions, links, personal boards

**Owner:** Miguel Morales · **As of:** 2026-10-24 · **Status:** drafts to build next. None of these exist
in the code yet (checked 2026-10-24).

Kinmap is a warm family keepsake, so all three features follow the same rules as the rest of the app:
- Family-tree changes go through change requests: owners and admins apply instantly; editors' changes
  wait for approval.
- Nothing is public, and media links are signed.
- AI use counts against the existing budgets (`ai_usage`, per-tree monthly and per-person daily limits).

---

## 1. Answer the AI's questions by voice

**Today:** after you talk, the review screen lists "Open questions" (e.g. "How are the siblings related to
Miguel's parents?") as plain text. There's no way to answer, so the questions are a dead end.

**What it should feel like:** each question has its own **🎤 Answer** button, and a text box for typing.
You say "Carolina and Estela are my mom's sisters." The draft updates in place: new links appear, and
anything you'd already switched off or edited stays the way you left it. The question disappears once
it's answered.

**How it works:**
1. Each question becomes an object, `{ id, text, answer? }`, instead of a string. Old change requests keep
   working; strings are read as unanswered questions.
2. A new endpoint: `POST /trees/:id/changes/:cr/answers { questionId, answer }`. It's allowed for the
   author while the change is a draft, or an approver while it's pending, the same rule as editing
   operations.
3. The server sends Claude:
   - the original transcript;
   - the current draft's operations (with what you switched off or edited marked as fixed);
   - the question and your answer;
   - the tree context.

   Claude returns **added or changed operations only**. They're merged into the same change request and
   tagged `source: "answer"`, so the review shows "from your answer".
4. **Budget:** an answer counts as one AI call (checked before, logged after). Answers are capped at
   2,000 characters.
5. **App:** reuse the voice recorder from the Talk screen (`lib/speech.ts`, learned spellings, transcript
   highlighting) as a small `<AnswerMic>` under each question, on both the Talk result and the change
   review screen.

**Edge cases:**
- An answer that contradicts a switched-off item: the switched-off item stays off, and Claude may ask a
  follow-up question.
- "I don't know": the question is marked answered with no changes.

**Effort:** about 1–2 days.

---

## 2. Links and favorites on each person

Songs they loved, a YouTube clip of their band, a blog or obituary, a recipe page.

**What it should feel like:** a **"Links & favorites"** section on the person page, next to Photos and
videos. Tap **Add**, paste a link (or share one from YouTube or Spotify into Kinmap, later), and add an
optional note ("Abuela's favorite bolero"). Each link shows as a card with:
- a title and thumbnail;
- a small badge: Video, Song, Article or Link.

Tapping it opens the link in the phone's app or browser.

**How it works:**
- **Table** `person_links`: `id, tree_id, person_id, url, kind (video|song|article|other), title,
  thumbnail_url, note, added_by, created_at`. Same composite foreign keys and members-only read rules
  as the other per-person lists.
- **New operation** `add_link { personId, url, note }`, plus `remove_item { list: "links" }`. Links go
  through change requests like everything else, so an editor's link waits for approval.
- **Title and thumbnail:** when the link is added, the server looks them up through the services' public
  oEmbed endpoints (YouTube, Spotify, Vimeo, SoundCloud) or the page's own `og:title` / `og:image`.
  Rules:
  - The server only calls the service once, at the moment the link is added.
  - Links are http(s) only, with a short timeout.
  - The server never fetches private network addresses.
- **Privacy:** no embedded players load automatically, because embeds let YouTube or Spotify track
  viewers. Show the saved thumbnail; the video or song opens only when someone taps it.
- **Voice:** spoken stories can mention songs ("her favorite song was Bésame Mucho"). The AI can propose
  a **song note** without a URL (`add_fun_fact` today). Optionally add a "find a link" button later.
- **Effort:** about 1–2 days.

---

## 3. A personal board with pins and stickers

A corner of the app that shows each person's personality, like a corkboard or scrapbook page.

**Open question for Miguel:** whose board is it?
- **(a) Every person in the tree** has a board on their page: grandma's board holds her recipes, songs
  and photos, decorated by the family.
- **(b) Only signed-in members** get a board on their own profile ("my corner"), linked to the person
  they marked as "This is me".

**Suggestion:** start with **(b)** and let owners/admins also decorate boards for relatives who
aren't on the app (that's (a), later).

**What it should feel like:** a **Board** tab on the person page.
- A warm paper or cork background, chosen from a few textures in the design system.
- Drag items around, pinch to resize, twist to rotate.
- **Pins** hold content:
  - a photo from their media;
  - a link card;
  - a quote or fun fact;
  - a place;
  - a date ("Married 1958");
  - a short handwritten-style note.
- **Stickers** are decoration: hearts, stars, flowers, washi tape, flags, food, music notes, pets, and
  milestone badges ("Abuelo", "First grandchild").
- An **Edit** toggle, so the board can't be messed up by accident.
- A **List view** for screen readers that reads the pins in order.

**Who can change it:**
- **Your own board:** you edit it directly, without approval. It's your space, and the tree's facts
  aren't changing.
- **Someone else's board:** owners and admins edit it directly. Editors can **suggest** a pin, which
  goes through a change request like other edits.
- Pins **point to** existing tree content (a photo, fact or link). Deleting a fact doesn't break the
  board; that pin shows "removed".

**How it works:**
- **Tables:**
  - `boards (id, tree_id, person_id, owner_user_id null, background, updated_at)`
  - `board_items (id, board_id, kind (pin|sticker|note), ref_type, ref_id, sticker_id, text, x, y,
    scale, rotation, z, created_by, created_at)`

  Positions are stored as fractions of the board (0–1) so the board looks the same on any screen.
- **Endpoints:**
  - `GET /trees/:id/people/:pid/board`
  - `PUT /trees/:id/people/:pid/board/items`, which saves the whole layout in one transaction
    (last save wins, with a version number to warn about conflicts).
- **Stickers:**
  - A built-in set of original SVG stickers in the design system's palette. Hand-drawn feel, warm, not
    clip-art. No copyrighted characters.
  - About 40 to start, stored in the app bundle so they work offline.
- **App:** a canvas built with `react-native-gesture-handler` and `react-native-reanimated` for drag,
  pinch and rotate (both are Expo-supported but native, so a new development and preview build is
  needed).
- **Money (optional, later):** extra sticker packs and board backgrounds could be a small part of the
  family subscription, fitting "optional extra" revenue. Never put ads or tracking on boards.
- **Effort:** about 4–6 days (canvas and gestures are most of it). Ship read-only boards plus a simple
  "add pin / add sticker" first, then free-form dragging.

---

## Suggested order

1. **Answering questions** (small, and it fixes a dead end in the core flow).
2. **Links & favorites** (small, and boards can pin them).
3. **Personal boards**, starting with members' own boards and a basic layout, then drag/resize/rotate.

Each step: a migration in `kinmap/supabase/migrations/`, tests against PGlite, then a new preview build
when native modules change.
