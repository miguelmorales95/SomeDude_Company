# Kinmap Feature Specs: questions, links, boards, slideshows and prints

**Owner:** Miguel Morales · **As of:** 2026-10-25 · **Status:** built and live in Kinmap (not yet tried on a
phone): answering questions (1), the language switcher (1b), links & favorites (2),
boards (3), slideshows (6), and printable PDFs: binder pages (5), the wall poster (4) and the photo
calendar (7). All went live on 2026-10-25. Not built: ordering prints through Kinmap (waits on a print
partner) and other keepsakes (8).

Kinmap is a warm family keepsake, so all three features follow the same rules as the rest of the app:
- Family-tree changes go through change requests: owners and admins apply instantly; editors' changes
  wait for approval.
- Nothing is public, and media links are signed.
- AI use counts against the existing budgets (`ai_usage`, per-tree monthly and per-person daily limits).

---

## 1. Answer the AI's questions by voice

**Status (2026-10-25): built** (Kinmap `d062bbd`), as specified below. "I don't know" (or "No sé") closes a
question without an AI call. Answered questions show under "Questions answered" on the review screen, so
approvers see them. Not yet tried on a phone.

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

## 1b. Language switcher (English, Español, 普通话, 廣東話)

**Status (2026-10-25): built** (Kinmap `0309f22`, Chinese added in `65d9927`). Not yet tried on a phone.

**Languages:** English; Spanish; Mandarin, written in Simplified characters; and Cantonese, written in
Traditional characters with Hong Kong wording. Each has matching speech recognition: `zh-CN` for Mandarin,
and `yue-Hant-HK` on Android or `zh-HK` on iPhone for Cantonese. Phones set to `zh-HK` or `zh-MO` start in
Cantonese, and other Chinese locales start in Mandarin.

**What it should feel like:** a globe button at the top right of every screen, showing the current
language. Tapping it opens a short list with each language in its own script, so anyone can find theirs.
Choosing one switches every screen at once, with no reload. The choice is saved on the device; the first
launch follows the phone's language.

**How it works:**
- All app text lives in `mobile/src/lib/strings/` (`en`, `es`, `zh`, `yue`); TypeScript flags any string a
  translation is missing. Adding a language means adding a dictionary, one row in `lib/i18n.tsx`, and its
  phrases in the server's `operations.js` and `ai.js`.
- Speech recognition (`es-US`), dates, client error messages and the transcript highlighter follow the
  language.
- The app sends `accept-language`. The server writes the short review lines ("Hijo o hija de Rosa") and
  the AI's summary and questions in that language. **Tree content stays in the language the family member
  spoke**, so a story told in Spanish isn't translated into English.
- No native modules, so it ships as a JS update without a new build.

**Not done yet** (also listed under "Launch gaps" in the roadmap's Phase 3):
- **Server error messages** (budget limits, permission errors) are still English. Use the app's language:
  every request already says which one, and the person reading the error is the one who chose it.
- **Sign-in email** is still English. Save the chosen language on the account (`user_metadata.lang`, at
  sign-in and on every switch), and let the Supabase email template choose its wording with
  `{{ if eq .Data.lang "es" }}`. The sign-in screen has the globe button too, so the language is known
  before the first email goes out.
- **Invites:** add a language choice to the invite card (defaults to the inviter's language) for the
  shared invite message. Kinmap doesn't send invites itself; the inviter shares a code through their
  phone. So this choice only changes the message's wording. The invitee's app starts in their phone's
  language either way.
- The Spanish, Mandarin and Cantonese wording needs a read by native speakers, ideally relatives.
- Check on a phone that Cantonese dictation works with these language codes; the recognizer's codes vary
  by device.
- Taiwan (Mandarin read in Traditional characters) isn't covered; it currently gets Simplified.
- The transcript highlighter only marks names and places in alphabetic scripts, not in Chinese.

---

## 2. Links and favorites on each person

**Status (2026-10-25): built** (Kinmap `6200b17`), as specified below. Needs migration
`20261025000000_person_links.sql` applied **before** the API is pushed, because loading a tree reads the
new table. Notes from building it:
- Live-checked: YouTube, Spotify and SoundCloud give titles and pictures; Wikipedia gives a title. Sites
  that block automated requests (Allrecipes answered 460) fall back to the site's name, and the note
  carries the meaning. A reviewer can fix the title before approving, but an owner's own link applies at
  once with the fallback title.
- Thumbnails load from the service's image server (`i.ytimg.com`, Spotify's CDN), which sees the viewer's
  IP address, though no cookies or account. Copying thumbnails into Kinmap's private storage would close
  that; later.
- The AI doesn't propose links (it can't know a real URL); a spoken favorite song becomes a fun fact.
- Sharing a link from YouTube or Spotify straight into Kinmap needs a native share target and a new
  build; later.

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

**Status (2026-10-25): built** (Kinmap `de8bf09`). Decisions made while building:
- **Whose board:** every person has one, and permissions cover both options below. The member linked to a
  person ("This is me") and owners/admins edit it directly; editors suggest pins, stickers and notes
  through approval. So members get "my corner", and owners/admins can decorate relatives who aren't on the
  app. The `owner_user_id` column wasn't needed.
- **Gestures** use React Native's built-in touch handling instead of `react-native-gesture-handler` and
  `react-native-reanimated`, so no new build is needed. Check smoothness on a phone; switch libraries at
  the next build if it feels slow.
- **41 stickers** (hearts, flowers, washi tape, papel picado, food incl. concha and dumpling, music, pets,
  milestone badges in the app's language). Notes use the serif italic face; a handwriting font would need
  bundling.
- Saving the whole layout uses a version number: a stale save gets "Show their version / Keep mine".
- Needs migration `20261025010000_boards.sql`.

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

## Prints and keepsakes: shared rules (features 4–7)

Prints are the most visible thing Kinmap makes, and the easiest place to leak family data. Every printed
or exported item follows these rules:

- **Kinmap renders it, on the server,** from the tree data and the creator's choices. The phone never
  sends family data to a print shop. The print partner receives only the finished, print-ready file and a
  shipping address, never tree data, logins or links back into the app.
- **Privacy by default for living people:** first names and photos only. No birth dates, no ages, no
  places, no maiden names. The creator can turn more on per person, with a clear "this will be printed"
  preview. People marked deceased can show full dates and places by default.
- **Never printed:** email addresses, phone numbers, street addresses, invite codes, private notes or
  transcripts. QR codes are allowed only if they lead to a signed-in Kinmap page, never a public one.
- **Approval:** only owners and admins can order prints of the whole tree. Anyone can make a slideshow
  (it isn't a file that leaves the app).
- **Preview first:** every product shows a full-size, zoomable proof that matches the printed file,
  approved before payment.
- **Retention:** print files are kept 30 days for reprints, then deleted. Partner contracts must require
  deleting files and addresses after shipping. Choose a partner whose terms allow that, and confirm it in
  writing before launch.
- **"Order through us":** checkout in Kinmap (Stripe, or app-store rules for digital-only items),
  fulfilment by a print-on-demand partner with an API. Candidates to evaluate: Prodigi, Printful, Gelato
  (posters and canvas), and Lulu or Blurb (books). Pick on print quality, privacy terms and US shipping
  costs. A **"download PDF"** option for printing yourself can be a subscription perk, watermarked with
  nothing personal.
- **Customization (all products):** a theme from the design system (Keepsake: warm paper; Garden:
  botanical; Midnight: dark with gold lines; Simple: clean white), a title ("The Morales–Anario Family"),
  which branch or how many generations, photo or initials medallions, and the font pair. Simple choices,
  no free-form design tool.

## 4. Wall poster of the family tree

**Status (2026-10-25): built as a downloadable PDF** (Kinmap `073b893`): classic top-down layout (the
app's own), 18×24 / 24×36 / 36×48 in with 1/8 in bleed, photo or initial medallions, title, dedication,
whole tree or one branch, warnings for small names and low-resolution photos. **Not built:** fan/radial
and botanical layouts, the map inset, framed/canvas ordering.

A big, decorative tree that fits on a wall.

- **Sizes:**
  - 18×24 in and 24×36 in posters;
  - a 36×48 in "big wall" size;
  - each as paper, framed, or canvas.
- **Layouts:**
  - classic top-down tree;
  - fan or "radial" chart, which fits many generations in a circle;
  - a botanical tree whose branches carry the names.
- **Extras:**
  - an optional "Where we're from" map inset (from places, country or region only by default);
  - a dedication line.
- **Auto-fit:** the layout scales to the number of people. The app warns when names would print smaller
  than readable and suggests a bigger size or fewer generations.
- **Rendering:** SVG on the server, turned into a print PDF at 300 dpi with bleed. Photos need enough
  resolution for the size, and the app flags blurry ones.
- **Price ideas to test (not set):** $39–59 for an 18×24 print, $79–129 for a framed 24×36, $149+ for a
  large canvas. Costs depend on the partner.

## 5. Family book and binder pages

**Status (2026-10-25): binder pages built as a downloadable PDF** (Kinmap `073b893`): cover, one page per
person (portrait, name, years, story, favorites, timeline, places) and photo sheets of 2/4/6/9 with
captions. **Not built:** branch pages, story pages, reordering pages, and the bound book (needs a partner).

- **Binder pages:** printable 8.5×11 pages, each a printable PDF on its own. The page types are:
  - a person page (photo, a short bio, their facts and timeline, their "favorites");
  - a branch page (a small tree for one household);
  - a story page (a recorded story, cleaned up as text, with the person's photo);
  - **photo sheets** (grids of 2, 4, 6 or 9 photos with optional captions).

  Users pick pages, reorder them, and download or print at home. The page design leaves room for
  three-hole punches.
- **Family book:** the same pages, bound as a hardcover or softcover photo book printed through a book
  partner. It adds a cover with the family name, a table of contents, and an index of names.
- **Customization:** theme, which people and branches, the order, cover photo, and title.
- **Updates:** the book can be re-ordered later with new people and stories ("2027 edition").

## 6. Slideshow mode

**Status (2026-10-25): built** (Kinmap `d62926e`) as specified, with these limits:
- **Music:** plays from any music app on the phone at the same time; picking a song inside Kinmap needs a
  native audio module and a new build.
- **TV:** cast the phone's screen. The app is locked to portrait, so the cast picture is portrait;
  allowing landscape is an `app.json` change plus a new build. There's no hosted web player for laptops
  yet.
- Your own slides can show at the start, the end, or every 3/5/10 people (for schedules).
- Needs migration `20261025020000_slideshows.sql`.

A full-screen show for a TV, a laptop at a reunion, or a phone.

- It cycles through family members: photo (with a slow pan), name, a line from their bio, or a fun fact.
- **Inserted slides:** the creator adds text slides between people, for example "Welcome to the Morales
  Reunion", "Lunch at 1 pm at the pavilion", "Group photo at 3 pm", "Games schedule". Each slide gets
  big text, a background from the theme, and an optional photo.
- **Settings:**
  - which people, branch or generation;
  - order (oldest to youngest, by branch, or shuffled);
  - seconds per slide;
  - optional music from the device (no streaming integration to start);
  - whether to show dates.
- **Sharing:** slideshows are saved with the tree, so any member can play them. To show on a TV, use the
  phone's screen casting or open the slideshow on a laptop through a signed-in web view. A public link
  isn't offered, because it would expose the family to anyone who gets it.
- **Privacy:** the same living-people defaults as prints, because slideshows are often shown in public
  places like parks and halls.

## 7. Photo calendar

**Status (2026-10-25): built as a downloadable PDF** (Kinmap `0bad6fe`). Each month has a collage editor:
pick tree photos or upload new ones, then drag, pinch, rotate and layer them (the same touch handling as
boards). "Print blank photo spaces", or any empty month, leaves a frame for pasting real prints. The grid
marks birthdays and "Remembering…" days for relatives who have passed, living relatives' birthdays only
when switched on, and optional holidays (U.S., Lunar New Year, Mid-Autumn, Día de Muertos). Letter
portrait, 13 pages. **Not built:** printed/folded calendars through a partner, cover photo, anniversaries.

- The family picks a photo for each month (from tree photos, or "choose for me" from photos marked as
  favorites).
- The calendar automatically marks birthdays and anniversaries of **deceased** relatives ("Remembering
  Abuelo Tomás"), and of living relatives **only if** the creator switches that on per person.
- **Customization:** theme, start month, cover photo, title, and whether to show holidays.
- **Formats:** a printable PDF, or a printed wall calendar (11×8.5 in folded, 11×17 in open) through a
  partner. It's a good gift around November–December.

## 8. Other keepsakes (ideas to test)

Ranked by how well they fit Kinmap's "warm keepsake" promise. These are ideas, not commitments; test
interest before building more than one or two.

1. **"Where we come from" map print:** a decorative map of places in the family's history (countries,
   towns), with lines for migrations. It's beautiful, and it can avoid personal details completely.
2. **Timeline poster:** a horizontal family timeline (marriages, moves, businesses opened) styled like a
   museum wall.
3. **Family cookbook:** recipes saved as stories or facts, printed as a small spiral book with the cook's
   photo and memory on each page.
4. **Story cards for gatherings:** a printed deck of conversation prompts ("Ask Grandma about the bakery
   in 1961") made from gaps in the tree. It sends people back to the app to record the answers, so it
   brings people in as well as being a keepsake.
5. **Jigsaw puzzle** of the tree poster or a favorite family photo, for game night.
6. **Photo ornament or keepsake box lid** for a person (a holiday gift, or a memorial).
7. **Quilt or throw blanket** printed with a photo grid (a premium, memorial gift).
8. **Kids' coloring book:** a simple, coloring-page version of the tree plus "draw your family" pages.

Not offering: name placards or tags for reunions.

---

## Suggested order

Miguel's order (2026-10-25): answering questions, language switcher, links, boards, slideshow, downloadable
PDFs, then ordering prints through Kinmap once a partner's privacy terms are confirmed in writing.

1. **Answering questions** (small, and it fixes a dead end in the core flow). *Built.*
   - **Language switcher** (English, Español, 普通话, 廣東話; top right). *Built.*
2. **Links & favorites** (small, and boards can pin them). *Built.*
3. **Personal boards**, starting with members' own boards and a basic layout, then drag/resize/rotate. *Built.*

4. **Slideshow** (no printing partner needed, and it's great for reunions), about 3–4 days. *Built.*
5. **Printable PDFs** first (binder pages, photo sheets, poster, calendar, as downloads), with the shared
   print rules. About 1–2 weeks for a shared renderer plus the first two products. *Binder pages and
   poster built; calendar not yet.*
6. **Ordering prints through Kinmap** once a partner is chosen and its privacy terms are confirmed:
   checkout, proofs, fulfilment and file deletion.
7. Test interest in the section 8 keepsakes with a simple "notify me" list before building any.

Each step: a migration in `kinmap/supabase/migrations/`, tests against PGlite, then a new preview build
when native modules change.
