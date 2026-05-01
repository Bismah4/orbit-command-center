# Orbit — Functional Prototype Plan

Goal: turn the existing static Orbit UI into a fully clickable prototype using mock state. Keep the dark theme, cards, spacing, typography, and bottom nav exactly as-is.

## 1. Auth & entry flow

Wire Splash → Onboarding → Login/Signup → `/app`.

- Polish `Splash.tsx` with auto-advance (1.5s) to `/onboarding`.
- Rebuild `Onboarding.tsx` as a premium 3-slide carousel: "Capture anything", "AI understands it", "Only what matters". Dots, Skip, Next/Get Started.
- Keep `Login.tsx`. Add `Signup.tsx` and `ForgotPassword.tsx` with matching styling and Apple/Google buttons.
- Routes added: `/signup`, `/forgot-password`.

## 2. Bottom nav + routing

Bottom tabs already route correctly. Add detail routes:

- `/app/notifications` (exists — link bell icon)
- `/app/daily-pulse` — Daily Pulse detail
- `/app/feed/:id` — Feed item detail
- `/app/memory/:id` — Memory item detail
- `/app/task/:id` — generic task/smart-action detail
- Profile sub-routes: `/app/profile/personal`, `/connected`, `/security`, `/support`, `/privacy`, `/terms`

## 3. Shared mock store

Create `src/lib/orbit-store.ts` — a tiny Zustand-free context (React context + useReducer) holding:

- `feedItems` (seeded from current Feed mock)
- `memoryItems`
- `notifications`
- `preferences` (pulse time, reminder style)
- actions: `addItem`, `markDone`, `discardItem`, `addReminder`, `filterFeed`

This lets Capture → Feed → Memory feel connected.

## 4. Orbit Home (Dashboard)

- Bell icon → `/app/notifications`.
- Daily Pulse "Review Today" → `/app/daily-pulse`.
- Each Smart Action card → `/app/task/:id`.
- "View all" → `/app/feed`.
- Can-Wait rows → `/app/task/:id`.

## 5. Capture

Each of the 6 tools opens its own modal (shadcn Dialog):

- Upload Screenshot — file input preview
- Scan Document — camera-frame mock with "Capture" button
- Record Voice — mic button with animated pulsing waveform + timer
- Paste Text — textarea + submit
- Manual Task — title, category select, priority, due-date (shadcn date picker)
- Connect Email — provider list (Gmail/Outlook/iCloud)

On submit → existing processing animation runs → result card appears → Add pushes item to store and navigates to `/app/feed` with a success toast.

## 6. Feed

- Filter chips actually filter the visible items by `tag`/`priority` (Urgent maps to high).
- Mark Done → marks item completed, fades out, toast "Moved to Memory", item appears in Memory.
- Remind → opens AddReminderDialog (time picker).
- Open / chevron → `/app/feed/:id` detail screen with full info + Mark Done / Snooze / Discard.

## 7. Memory

- Search input filters by title/tag (controlled state).
- Tag chips filter list.
- Row click → `/app/memory/:id` detail screen.

## 8. Profile

Every row becomes a `<Link>` or modal trigger:

- Personal info, Connected accounts, Security, Support, Privacy, Terms → simple sub-pages with back button + placeholder content styled to match.
- Daily Pulse time → time picker dialog (writes to preferences).
- Reminder style → radio dialog (Gentle / Standard / Insistent).
- Sign out → confirmation AlertDialog → navigates to `/login`.
- Subscription row already routes to `/subscription`.

## 9. Shared modal/dialog set

New file `src/components/orbit/CaptureDialogs.tsx` and additions to `OrbitDialogs.tsx`:

- UploadScreenshotDialog, ScanDocumentDialog, RecordVoiceDialog, PasteTextDialog, ManualTaskDialog, ConnectEmailDialog
- AddReminderDialog, EditDetectedDialog, DiscardConfirmDialog, SignOutConfirmDialog, TimePickerDialog, ReminderStyleDialog

All built with existing `Dialog` / `AlertDialog` shadcn primitives — same dark card styling.

## 10. Polish

- Use `sonner` toasts for all success/discard/mark-done events (Toaster already mounted).
- Animate list removals with Tailwind `animate-fade-out`.
- Empty states already exist in `EmptyStates.tsx` — reuse component when filtered list is empty.

## Technical notes

- No backend, no Lovable Cloud — all state lives in the OrbitStore context, seeded from current mock arrays. Resets on refresh (acceptable for a prototype).
- Stays on React Router DOM (already in use inside `/app`). No TanStack route changes beyond the existing splat.
- No design tokens or color values change. All new screens reuse `orbit-card`, `pill`, `bg-gradient-primary`, `glow-primary` utility classes already in `src/styles.css`.
- Date picker uses existing shadcn `Calendar` inside a `Popover` per project convention.

## Out of scope

- Real auth, real file upload, real voice recording, real email integration — all mocked visually.
- No new design system tokens, no restyling of existing screens.
