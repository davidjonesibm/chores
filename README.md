# Chores

Playwright automation for submitting a weekly IBM time card.

## What it does

The single test navigates to a time tracking URL, authenticates via IBM Verify (MFA), copies the previous week's entries, fills in 8 hours for each weekday (Mon–Fri), and submits.

## Setup

**1. Install dependencies**

```bash
npm run setup
```

**2. Create a `.env` file** in the project root (never commit this):

```
TIME_URL=https://<your-timecard-url>
```

## Usage

```bash
npm run timecard        # Run in headed/debug mode (recommended for MFA)
npx playwright show-report  # View the last HTML report + traces
```

## How the test works

1. Navigate to `TIME_URL`
2. Click the **IBM Verify** sign-in button
3. Wait for IBM Verify push notification approval (manual step — no timeout)
4. Click **Copy from a previous week** → confirm with **Ok**
5. Fill Mon–Fri cells with `8` hours in the main task row
6. Click **Submit** and assert the API returns HTTP 200

> MFA may already be satisfied from a prior session, in which case step 3 is skipped automatically.

## Project structure

```
tests/chores.spec.ts   # The time card test
playwright.config.ts   # Chromium-only, traces always on, HTML reporter
package.json           # npm scripts
.env                   # Your secrets — never commit
```

## Notes

- Only Chromium is used; Firefox and WebKit are disabled in the config.
- Traces are always recorded. Run `npx playwright show-report` to inspect them after any run.
