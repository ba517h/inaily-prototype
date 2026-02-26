# Inaily Design System — Claude Code Instructions

## What This Is

This is the design system for **Inaily**, an event networking app. It follows **Material 3 Expressive (M3E)** — Google's style update within Material 3 announced at I/O 2025.

When asked to build a screen, component, or prototype for Inaily, **always use the tokens, components, and patterns defined here**. Never use generic Material UI, shadcn, or Tailwind defaults.

---

## M3 Expressive Principles (Follow These Always)

1. **Color with purpose** — Color communicates meaning, not just aesthetics. Recommended items use `primary-container`. Errors use `error-container`. Don't use color randomly.
2. **Shape flexibility** — Varied corner radii create personality. Cards use `--shape-lg` (16dp), featured cards use `--shape-lg-increased` (20dp), buttons use `--shape-full`. Never make everything the same radius.
3. **Size-based hierarchy** — Larger type and touch targets for key elements. Headlines are bold and big. CTAs are 56dp tall. The most important thing on screen should be the largest.
4. **Spring-based motion** — Use CSS transitions with `var(--ease-emphasized-decel)` for enters, `var(--ease-emphasized-accel)` for exits. Overshoot is good. Linear is bad.
5. **Containment** — Group related elements in containers. Every card, every list item, every section gets its own container with a distinct surface color. Flat lists are not M3E.

---

## Project Structure

```
src/
├── tokens/          # CSS custom properties — NEVER hardcode values
│   ├── colors.css   # All color tokens (light theme)
│   ├── typography.css
│   ├── shapes.css
│   ├── spacing.css
│   ├── motion.css
│   └── index.css    # Imports all token files
├── components/      # Reusable M3E components
│   ├── Button.jsx
│   ├── AttendeeCard.jsx
│   ├── ConnectionItem.jsx
│   ├── FilledInput.jsx
│   ├── IndustrySelector.jsx
│   ├── OTPInput.jsx
│   ├── ExampleCard.jsx
│   ├── StepProgress.jsx
│   ├── ProfileRow.jsx
│   ├── BottomNav.jsx
│   ├── TopAppBar.jsx
│   ├── ScreenShell.jsx
│   └── index.js     # Barrel export
├── screens/         # Full screen compositions (you build these)
└── layouts/
    └── PhoneFrame.jsx  # 390x844 mobile frame wrapper
```

---

## Token Rules

### NEVER hardcode colors, spacing, radii, or font sizes.

Always use CSS custom properties from `src/tokens/`. Examples:

```css
/* ✅ Correct */
background-color: var(--color-primary);
border-radius: var(--shape-lg);
padding: var(--spacing-lg);
font-size: var(--type-body-large-size);

/* ❌ Wrong */
background-color: #68548E;
border-radius: 16px;
padding: 16px;
font-size: 16px;
```

### Color Token Reference (Quick)

| Token | Hex | Use For |
|-------|-----|---------|
| `--color-primary` | #68548E | CTA buttons, active states, key actions |
| `--color-on-primary` | #FFFFFF | Text/icons on primary |
| `--color-primary-container` | #EBDDFF | Recommended cards, highlighted sections |
| `--color-on-primary-container` | #231047 | Text on primary-container |
| `--color-secondary` | #635B70 | Secondary actions, toggles |
| `--color-secondary-container` | #E9DEF8 | Tonal buttons, chips, nav pill |
| `--color-on-secondary-container` | #1F182B | Text on secondary-container |
| `--color-tertiary` | #7E525E | Accent badges, special tags |
| `--color-tertiary-container` | #FFD9E0 | Tertiary highlights |
| `--color-surface` | #FEF7FF | Page background |
| `--color-on-surface` | #1D1B20 | Primary text |
| `--color-on-surface-variant` | #49454E | Secondary text, icons |
| `--color-surface-container-lowest` | #FFFFFF | Lowest elevation |
| `--color-surface-container-low` | #F8F1FA | Cards at rest |
| `--color-surface-container` | #F2ECF4 | Standard containers, bottom nav |
| `--color-surface-container-high` | #EDE6EE | Elevated containers |
| `--color-surface-container-highest` | #E7E0E8 | Input backgrounds |
| `--color-outline` | #7A757F | Borders, dividers |
| `--color-outline-variant` | #CBC4CF | Subtle borders |
| `--color-error` | #BA1A1A | Error states |
| `--color-error-container` | #FFDAD6 | Error backgrounds |
| `--color-success` | #386A20 | Success states |
| `--color-success-container` | #B8F397 | Success backgrounds |
| `--color-warning` | #7C5800 | Warning states |
| `--color-warning-container` | #FFDEA6 | Warning backgrounds |

### Shape Token Reference

| Token | Value | Use For |
|-------|-------|---------|
| `--shape-none` | 0px | Sharp edges (rarely used) |
| `--shape-xs` | 4px | Filled input top corners, small tags |
| `--shape-sm` | 8px | Chips, OTP boxes, badges |
| `--shape-md` | 12px | List items, small containers |
| `--shape-lg` | 16px | Standard cards, example cards |
| `--shape-lg-increased` | 20px | ★ Featured/recommended cards, selectors |
| `--shape-xl` | 28px | Hero image containers, large cards |
| `--shape-xl-increased` | 32px | Full-width feature cards |
| `--shape-xxl` | 48px | Splash elements |
| `--shape-full` | 999px | Buttons, avatars, pills, FABs |

### Typography Token Reference

**Brand font (Bricolage Grotesque):** Display, Headline, Title Large
**Plain font (Geist):** Title Small, Label, Body

| Role | Token prefix | Size | Weight | Use For |
|------|-------------|------|--------|---------|
| Display Large | `--type-display-large-*` | 57px | 400/800 | Splash brand |
| Headline Large | `--type-headline-large-*` | 32px | 400/700 | Onboarding questions |
| Headline Medium | `--type-headline-medium-*` | 28px | 400/700 | Section headers |
| Headline Small | `--type-headline-small-*` | 24px | 400/700 | Page titles |
| Title Large | `--type-title-large-*` | 22px | 400/700 | Profile name |
| Title Medium | `--type-title-medium-*` | 16px | 500/700 | Card names, form labels |
| Title Small | `--type-title-small-*` | 14px | 500/700 | Role/subtitle |
| Body Large | `--type-body-large-*` | 16px | 400 | Bio, descriptions |
| Body Medium | `--type-body-medium-*` | 14px | 400 | Supporting text |
| Body Small | `--type-body-small-*` | 12px | 400 | Captions, helpers |
| Label Large | `--type-label-large-*` | 14px | 500/600 | Button text |
| Label Medium | `--type-label-medium-*` | 12px | 500 | Chip text, nav labels |
| Label Small | `--type-label-small-*` | 11px | 500 | Metadata |

---

## Component Usage Guide

### When building screens, use these components:

#### `<Button>` — 4 variants
```jsx
<Button variant="filled" label="Continue" fullWidth />      // Primary CTA, 1 per screen max
<Button variant="tonal" label="View" />                      // Secondary actions
<Button variant="outlined" label="View Profile" />           // Alternative actions
<Button variant="text" label="Skip" />                       // Tertiary/low-emphasis
<Button variant="filled" label="Continue" disabled fullWidth /> // Disabled state
```

#### `<AttendeeCard>` — 2 modes
```jsx
<AttendeeCard recommended name="..." role="..." company="..." bio="..." />  // primary-container bg
<AttendeeCard name="..." role="..." company="..." bio="..." />              // surface-container-low bg
```

#### `<ConnectionItem>`
```jsx
<ConnectionItem name="..." role="..." company="..." />
```

#### `<FilledInput>` — single consistent input style
```jsx
<FilledInput label="Full Name" />
<FilledInput label="Full Name" value="Mohammed" focused />
<FilledInput label="Phone Number" prefix="+91" />
<FilledInput label="Tell us about yourself..." multiline rows={4} />
```

#### `<IndustrySelector>`
```jsx
<IndustrySelector
  options={["Edutech", "Fintech", "SaaS"]}
  selected="Fintech"
  onSelect={handleSelect}
/>
```

#### `<OTPInput>`
```jsx
<OTPInput length={6} value="4444" />
```

#### `<ExampleCard>` — good/bad examples
```jsx
<ExampleCard type="good" name="Arjun" role="ML Engineer" quote="..." result="Connected with 5 engineers" />
<ExampleCard type="bad" name="Priya" role="PM" quote="..." result="Got random matches" />
```

#### `<StepProgress>` — onboarding progress
```jsx
<StepProgress current={2} total={7} />
```

#### `<ProfileRow>` — filled and empty states
```jsx
<ProfileRow icon="📍" label="Current City" value="Chennai" />
<ProfileRow icon="🔗" label="Company URL" empty />
```

#### `<BottomNav>`
```jsx
<BottomNav active="explore" />  // explore | connections | requests | profile
```

#### `<TopAppBar>`
```jsx
<TopAppBar title="Connections" showBack />
<TopAppBar title="Tech Summit 2026" subtitle="Feb 24-27, Bengaluru" avatar="N" />
```

#### `<ScreenShell>` — wraps every screen
```jsx
<ScreenShell topBar={<TopAppBar ... />} bottomNav={<BottomNav active="explore" />}>
  {/* screen content */}
</ScreenShell>
```

#### `<PhoneFrame>` — for previewing screens
```jsx
<PhoneFrame>
  <YourScreen />
</PhoneFrame>
```

---

## Screen Building Rules

When asked to build a screen, follow this pattern:

1. **Create a new file** in `src/screens/` named descriptively (e.g., `OnboardingIndustry.jsx`)
2. **Import only from** `../components` and use tokens via CSS modules or inline `var()` references
3. **Wrap in ScreenShell** with appropriate TopAppBar and BottomNav (if applicable)
4. **Use the PhoneFrame** in a preview/demo file if the user wants to see it rendered

### Screen Composition Pattern:

```jsx
import { ScreenShell, TopAppBar, BottomNav, Button, FilledInput } from '../components';
import styles from './ScreenName.module.css';

export default function ScreenName() {
  return (
    <ScreenShell
      topBar={<TopAppBar title="Page Title" showBack />}
      bottomNav={<BottomNav active="explore" />}  // omit for onboarding
    >
      <div className={styles.content}>
        {/* Screen content using components and tokens */}
      </div>
    </ScreenShell>
  );
}
```

### CSS Module Pattern:

```css
.content {
  padding: var(--spacing-2xl);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
}

.headline {
  font-family: var(--type-headline-large-family);
  font-size: var(--type-headline-large-size);
  font-weight: var(--type-headline-large-weight-emphasized);
  line-height: var(--type-headline-large-line-height);
  color: var(--color-on-surface);
}
```

---

## Inaily-Specific Design Decisions

### Onboarding Screens (Phone → OTP → Name → Company → Industry → Networking → About Me)
- NO bottom nav
- StepProgress at top (below status bar)
- Back arrow top-left
- Headline Large for the question
- Body Medium in on-surface-variant for supporting text
- Single CTA at bottom (disabled until input is valid)
- Optional edge gradient decoration (primary-container → tertiary-container) — subtle, decorative only

### Main App Screens (Feed, Connections, Requests, Profile)
- Bottom nav always visible
- TopAppBar with event name or page title
- Surface background
- Cards use surface-container-low

### Attendee Feed
- Two sections: "Recommended for You" and "All Attendees"
- Recommended cards: primary-container background, filled Connect button
- All cards: surface-container-low background, tonal Connect button
- Section headers: Label Large, on-surface-variant, uppercase, letter-spacing 1.5px

### Profile Screen (Own)
- Group details into collapsible sections
- Completion progress bar at top (linear, primary fill)
- Empty fields show "Not Added" with "Update" tonal button

### Profile Screen (Other User)
- Hero image/avatar area at top
- Info sections in surface-container-low cards with primary left-accent border
- Full-width "Connect" CTA pinned at bottom

---

## Don'ts

- ❌ Don't use Tailwind utility classes — use CSS modules with token variables
- ❌ Don't hardcode any color, spacing, radius, or font value
- ❌ Don't use outlined text fields — always use filled style
- ❌ Don't make all cards the same background — use surface hierarchy
- ❌ Don't use pink/rose for selections — use primary purple
- ❌ Don't use more than one filled button per screen section
- ❌ Don't forget the StepProgress on onboarding screens
- ❌ Don't use flat lists without containment — every item gets a container
- ❌ Don't use linear easing — use emphasized-decelerate for enters
- ❌ Don't make disabled buttons invisible — use on-surface at 12% bg, 38% text

## Do's

- ✅ Always import components from `../components`
- ✅ Always use CSS custom properties from tokens
- ✅ Use `--shape-lg-increased` (20dp) for featured/recommended elements
- ✅ Use `--shape-full` for all buttons and pills
- ✅ Make the primary CTA 56px tall
- ✅ Use semantic colors (success/error/warning) for feedback states
- ✅ Add spring-like transitions to interactive elements
- ✅ Keep text hierarchy clear: one headline, supporting body text, clear labels
