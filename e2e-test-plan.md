# E2E Test Plan — Playwright

A practical, beginner-friendly plan for end-to-end testing this Next.js real-estate app. Each scope is split into ~1-hour daily chunks so you can progress steadily. Focus on **what users actually do** — avoid over-testing internal implementation details.

---

## Guiding principles (read once before starting)

- **Test behavior, not implementation.** Verify what the user sees and can do, not internal state.
- **Happy path first**, then 1–2 critical edge cases per flow. Skip exhaustive permutations.
- **One assertion focus per test.** A test should fail for one clear reason.
- **Shared setup over repeated UI steps.** Once login works, reuse an authenticated session for dashboard tests instead of logging in every test.
- **Don't test the framework.** Trust Next.js, next-intl, Radix, etc. — test *your* logic.
- **Stable selectors.** Prefer accessible roles/labels/text over CSS classes or DOM structure.
- **Independent tests.** Each test must run alone and in any order. No leftover state.
- **Cleanup created data.** Every create test should clean up (or use unique names + a teardown step).

---

## Pre-work (Day 0 — setup, ~1h)

Before writing any test:

1. Decide a test environment: a dedicated test backend / test database, or an isolated user account on staging. **Never run e2e against production data you can't clean up.**
2. Create seed accounts for each role: `admin`, `manager`, `content`, `view_only`. Save credentials in `.env.test` (gitignored).
3. Decide locale strategy: most tests run on default (`ar`). Add an `en` smoke pass at the end of each scope.
4. Install Playwright, run the codegen tool once on the home page just to see how it works — don't keep that code.
5. Read the Playwright docs sections on: locators, auto-waiting, `expect`, fixtures, and storage state. That's enough to start.

---

# Scope 1 — Authentication & Login

The gate to everything else. Get this rock-solid first; the rest depends on it.

### Chunk 1.1 — Login page renders (Day 1, ~1h)
- Navigate to `/login` (and `/ar/login`, `/en/login`) and verify the form is visible: email field, password field, submit button.
- Verify page title / main heading is correct in both locales.
- Verify the form is keyboard-accessible: tab order, enter key submits.

### Chunk 1.2 — Login validation (Day 2, ~1h)
- Submit empty form → expect required-field errors.
- Submit invalid email format → expect format error.
- Submit wrong password (valid email) → expect API error message displayed.
- Submit unknown email → expect API error message displayed.
- Confirm the user stays on `/login` for all failures.

### Chunk 1.3 — Successful login per role (Day 3, ~1h)
- Log in as `admin` → redirects into the dashboard, user identity visible in nav.
- Repeat for `manager`, `content`, `view_only` — each lands in dashboard.
- Verify the auth cookie (`TOKEN`) is set after login (read via Playwright's storage state).

### Chunk 1.4 — Persisted session & logout (Day 4, ~1h)
- After login, reload the page → still authenticated.
- Open a new tab/context with the same storage state → still authenticated.
- Click logout → redirects to public area, session cookie cleared.
- After logout, navigating to `/dashboard` redirects to `/login`.

### Chunk 1.5 — Save reusable auth states (Day 5, ~1h)
- Create one Playwright "global setup" run per role that performs login and saves the storage state to a file.
- Confirm subsequent tests can start already authenticated by loading that storage state.
- This is your foundation — every dashboard test will reuse it.

---

# Scope 2 — Route protection & permissions

`proxy.ts` gates `/dashboard/**` by token + role. Test the *rules*, not every page.

### Chunk 2.1 — Unauthenticated redirects (Day 6, ~1h)
- Without any session, visit `/dashboard`, `/dashboard/users`, `/dashboard/properties`, `/dashboard/blog-posts`, `/dashboard/site-info` → each redirects to `/login`.
- Verify locale is preserved across the redirect for `ar` and `en`.

### Chunk 2.2 — Role-based access matrix (Day 7, ~1h)
Pick ONE representative URL per permission and verify allowed vs blocked. Don't enumerate every page.

- `admin` can reach every dashboard section.
- `view_only` is blocked from `/dashboard/users` (no `user.read`) and redirected.
- `view_only` is blocked from any `*/create` and `*/update/...` route.
- `content` is blocked from `/dashboard/users`.
- `manager` can reach users list but block the appropriate write/update routes the role lacks (check `constants/permissions.ts` for the source of truth).

### Chunk 2.3 — UI reflects permissions (Day 8, ~1h)
- For `view_only`, list pages render but Create/Edit/Delete buttons are hidden or disabled.
- For `content`, the Users nav item is hidden.
- Verify there's no way to *trigger* a forbidden action from the UI for the wrong role.

---

# Scope 3 — Public client site

Pages an unauthenticated visitor can reach. Smoke-test rendering and key user journeys.

### Chunk 3.1 — Home page (Day 9, ~1h)
- Loads at `/` (default `ar`) and `/en`.
- Hero, services, FAQ, footer sections are visible.
- Primary CTAs link to the correct routes.
- No console errors, no broken images in the viewport.

### Chunk 3.2 — Navigation & footer (Day 10, ~1h)
- Top nav links route correctly: properties, blog posts, about, contact, login.
- Logo links home.
- Footer links work; social/contact links have correct `href`.
- Mobile nav: open hamburger, links visible, close behavior works.

### Chunk 3.3 — About & Contact pages (Day 11, ~1h)
- About page renders all expected sections.
- Contact page renders the form and contact info.
- Contact form: empty submit shows validation; valid submit shows the success state. (One success path is enough.)

### Chunk 3.4 — Locale switching (Day 12, ~1h)
- Switch from `ar` to `en` from any page → URL updates, content language flips, layout direction (RTL/LTR) flips.
- Switch back. Verify locale persists across navigation within the session.
- Confirm `as-needed` prefix behavior: default `ar` has no prefix, `en` has `/en`.

---

# Scope 4 — Properties (public)

The most important read-side flow. Test what a buyer would do.

### Chunk 4.1 — Properties listing (Day 13, ~1h)
- `/properties` renders a list/grid of property cards.
- Each card shows: image, title, price, location, key specs.
- Empty state renders correctly when there are no results (use a filter that returns nothing if filters exist).

### Chunk 4.2 — Pagination (Day 14, ~1h)
- Page 1 shows the configured page size.
- Going to page 2 loads new items; URL reflects the page.
- Reloading on page 2 keeps you on page 2.
- Last page renders without error; "next" is disabled at the boundary.

### Chunk 4.3 — Property detail page (Day 15, ~1h)
- Clicking a card navigates to `/properties/[slug]`.
- Detail page shows: gallery, title, price, full description, specs, contact CTA.
- Image gallery interactions (next/prev, thumbnails) work.
- Direct deep-link to a known slug renders the same content.
- Unknown slug → 404 / not-found UI.

### Chunk 4.4 — Filters / search (if present) (Day 16, ~1h)
Skip if filters don't exist. Otherwise:
- Apply one filter → list updates, URL reflects the filter.
- Combine two filters → results match.
- Clear filters → full list returns.

---

# Scope 5 — Blog posts (public)

Mirrors properties — keep tests lean since the patterns repeat.

### Chunk 5.1 — Blog listing (Day 17, ~1h)
- `/blog-posts` renders posts with title, excerpt, cover image, date.
- Pagination works (one happy path is enough — you already validated the pattern in 4.2).

### Chunk 5.2 — Blog post detail (Day 18, ~1h)
- Click a post → `/blog-posts/[slug]` renders title, hero image, rich-text body, publish date.
- Rich text formatting renders correctly: headings, bold/italic, links, images, lists, embeds (YouTube, etc.).
- Unknown slug → 404.
- Internal links inside post content navigate correctly.

---

# Scope 6 — Site info (public surface)

Site info drives footer/nav/contact data. Test the *visible effect*, not the API.

### Chunk 6.1 — Site info reflected on the public site (Day 19, ~1h)
- Footer phone, email, address, social links match the configured site info.
- Logo / site name visible in nav.
- (Skip dashboard-side editing here — that's Scope 10.)

---

# Scope 7 — Dashboard: Users CRUD

Use the `admin` storage state. One full lifecycle, plus key edge cases.

### Chunk 7.1 — Users list (Day 20, ~1h)
- `/dashboard/users` renders a table with users.
- Columns show expected fields (name, email, role, …).
- Pagination/sort works if present.
- Search/filter works if present (one happy path).

### Chunk 7.2 — Create user — happy path (Day 21, ~1h)
- Open create form. Fill all required fields with a unique email.
- Submit → success toast/redirect, new user visible in the list.
- Track the created ID/email so you can clean up.

### Chunk 7.3 — Create user — validation (Day 22, ~1h)
- Empty submit → required errors on all required fields.
- Invalid email format → email error.
- Duplicate email (use the one from 7.2) → backend error surfaced in UI.
- Password rules (length, complexity) if enforced.
- Confirm form does not navigate away on validation failure.

### Chunk 7.4 — Update user (Day 23, ~1h)
- From the list, open update for the user created in 7.2.
- Form is prefilled with current values.
- Change a field, save → success, list reflects the change, page survives reload.
- Cancel/back without saving → no change.

### Chunk 7.5 — Delete user (Day 24, ~1h)
- Trigger delete → confirmation dialog appears.
- Cancel → user still present.
- Confirm → success toast, user gone from the list, gone after reload.
- This also serves as cleanup for the user created in 7.2.

---

# Scope 8 — Dashboard: Properties CRUD

Heaviest form in the app — images, rich text, many fields. Spread across more chunks.

### Chunk 8.1 — Properties list (Day 25, ~1h)
- `/dashboard/properties` table renders, columns correct.
- Row actions visible (edit, delete) per role.
- Pagination/search work if present (one happy path).

### Chunk 8.2 — Create property — text fields (Day 26, ~1h)
- Open create form. Fill only text/select/number fields with valid values.
- Don't submit yet — verify each field accepts input and shows no error.
- Submit empty form first to confirm required-field validation works.

### Chunk 8.3 — Create property — image upload (Day 27, ~1h)
- Upload one valid image → preview appears.
- Upload too-large file → friendly error, not a crash.
- Upload wrong file type → rejected with a clear message.
- Remove an uploaded image → preview gone.
- (Server Actions accept up to 20 MB — pick a test file just under and just over.)

### Chunk 8.4 — Create property — rich text description (Day 28, ~1h)
- Type plain text → renders.
- Apply bold, italic, headings, lists → toolbar reflects state, output renders.
- Insert a link → link appears, opens correctly in preview.
- Insert image / YouTube embed → renders.
- (One pass is enough — don't test every Tiptap extension.)

### Chunk 8.5 — Create property — full happy path (Day 29, ~1h)
- Fill the entire form end-to-end with a unique title.
- Submit → success, new property visible in dashboard list and on public `/properties`.
- Open the public detail page for it → all data shows correctly.

### Chunk 8.6 — Update property (Day 30, ~1h)
- Open update for the property from 8.5; form is prefilled.
- Change title and one numeric field → save → reflected in dashboard list and on the public detail page after revalidation.
- Replace one image → old image gone, new image visible.

### Chunk 8.7 — Delete property (Day 31, ~1h)
- Confirmation dialog: cancel keeps it, confirm deletes it.
- After delete: gone from dashboard list, public detail page returns 404, public list no longer shows it.
- This cleans up data from 8.5/8.6.

---

# Scope 9 — Dashboard: Blog posts CRUD

Same shape as properties. Reuse patterns; keep it lean.

### Chunk 9.1 — Blog list + create happy path (Day 32, ~1h)
- List page renders.
- Create form: fill required fields including cover image and a short rich-text body → submit → success, post appears in list and on public `/blog-posts`.

### Chunk 9.2 — Blog rich-text + slug behavior (Day 33, ~1h)
- Verify slug is generated (or editable) and unique constraint is enforced (try creating a duplicate title/slug).
- Rich text: one focused test — headings, link, image, list — rendering correctly on the public detail page.

### Chunk 9.3 — Blog update + delete (Day 34, ~1h)
- Update title and body → reflected on public detail page.
- Delete → gone from list, public detail page 404.

---

# Scope 10 — Dashboard: Site info

Single-record edit. One chunk is enough.

### Chunk 10.1 — Edit site info (Day 35, ~1h)
- `/dashboard/site-info` loads with current values prefilled.
- Edit phone, email, one social link, save → success.
- Reload → values persisted.
- Visit public footer → values reflect the change (revalidation works).
- Restore original values at the end (this scope has no "delete" — manual cleanup matters).

---

# Scope 11 — Cross-cutting concerns

These don't belong to a feature but matter for confidence.

### Chunk 11.1 — Locale parity smoke (Day 36, ~1h)
Re-run a tiny subset in `en`:
- Login, dashboard home, one list page, one detail page, public home.
- Goal: catch missing translations or RTL/LTR layout breaks. Don't duplicate full suites per locale.

### Chunk 11.2 — Caching & revalidation (Day 37, ~1h)
- Create a property in the dashboard → visible on public list within an acceptable window (and definitely after a reload).
- Update site info → footer reflects change after navigation.
- Delete a blog post → public detail returns 404.
- These confirm `updateTag` is wired correctly without testing the cache mechanism itself.

### Chunk 11.3 — Error & empty states (Day 38, ~1h)
- 404 page renders for unknown public route.
- Network failure during a list fetch → friendly error, not a blank page. (Use Playwright route interception to simulate.)
- Empty list states render correctly where applicable.

### Chunk 11.4 — Accessibility quick pass (Day 39, ~1h)
Pick 4 key pages: home, properties detail, login, dashboard properties create.
- Tab through — focus order is logical, focus is visible.
- Forms have labels associated with inputs.
- Images have alt text (or are decorative).
- No critical violations under an a11y scan (Playwright + axe). Don't chase every minor warning.

### Chunk 11.5 — Mobile viewport smoke (Day 40, ~1h)
At a phone viewport size:
- Home, properties list, property detail, login, dashboard list page render without overflow.
- Mobile nav opens/closes.
- Forms are usable (no off-screen buttons).

---

# Scope 12 — Stabilize & maintain

After all scopes are written, spend a chunk hardening the suite.

### Chunk 12.1 — Flake hunt (Day 41, ~1h)
- Run the full suite 3 times in a row. Any test that fails inconsistently goes on a flake list.
- Most flakes come from: hard-coded waits, racing on network, or assuming order. Replace with Playwright's auto-waiting locators and `expect` polling.

### Chunk 12.2 — Speed & parallelism (Day 42, ~1h)
- Identify the slowest 5 tests. Decide: keep, simplify, or move to a slower nightly lane.
- Ensure tests are independent enough to run in parallel.
- Consider sharding if total runtime > ~10 min locally.

### Chunk 12.3 — CI integration (Day 43, ~1h)
- Wire the suite into CI (or a manual GitHub Action you can trigger).
- Configure a smoke subset (~2 min) to run on every PR; full suite on nightly or on-demand.
- Decide artifact policy: traces and videos on failure only.

---

## What NOT to test (avoid over-testing)

- Internal Next.js behavior (locale negotiation logic, ISR cache internals, server action plumbing).
- Every Radix primitive's behavior — trust the library; test only your composed usage.
- Every Tiptap extension. One rich-text smoke per form is enough.
- Every permission × every page combination. Spot-check the matrix.
- Every locale × every test. One smoke pass per locale.
- Visual pixel-perfect matching unless you're explicitly doing visual regression.
- Backend logic — that belongs in the backend's own test suite. You only verify the UI consumes it correctly.

---

## Suggested cadence

- **Week 1 (Days 1–7):** Scopes 1–2 — auth and permissions. Foundation.
- **Week 2 (Days 8–14):** Scopes 3–4 — public site and properties read paths.
- **Week 3 (Days 15–21):** Scopes 5–7 — blogs read, site-info read, users CRUD.
- **Week 4 (Days 22–28):** Scope 8 — properties CRUD (the heaviest).
- **Week 5 (Days 29–35):** Scopes 9–10 — blogs CRUD, site info edit.
- **Week 6 (Days 36–43):** Scope 11–12 — cross-cutting and stabilization.

If you skip a day, just resume — chunks are independent. If a chunk takes 90 minutes, that's fine; don't rush. If it takes 30 minutes, move on; don't pad.
