# Chores — Copilot Instructions

## Project Purpose

Playwright automation for submitting a weekly IBM time card. The single test navigates to a time tracking URL, authenticates via IBM Verify (MFA), copies the previous week, fills in 8 hours for each weekday (Mon–Fri), and submits.

## Commands

| Command                      | What it does                                                             |
| ---------------------------- | ------------------------------------------------------------------------ |
| `npm run timecard`           | Run the time card test in headed debug mode (interactive, opens browser) |
| `npm run setup`              | Install Playwright + browser dependencies (run once after cloning)       |
| `npx playwright show-report` | Open the last HTML test report                                           |

## Environment Setup

Create a `.env` file in the project root (never commit it):

```
TIME_URL=https://<your-timecard-url>
```

`TIME_URL` is required — the test throws immediately if it is missing.

## Architecture

```
tests/chores.spec.ts   # The single "time card" test
playwright.config.ts   # Chromium-only, traces always on, HTML reporter
package.json           # scripts: timecard, setup
```

- Only Chromium is active; Firefox and WebKit configs are commented out.
- Traces are always captured (`trace: 'on'`) — view them via `npx playwright show-report`.
- The test uses `timeout: 0` on the MFA step because IBM Verify approval is manual.

## Test Flow

1. Navigate to `TIME_URL`.
2. Click **IBM Verify** sign-in button.
3. Wait indefinitely for either the Verify App approval button or the "Copy from a previous week" link (MFA may already be satisfied).
4. If the approval button is visible, click it to trigger the push notification.
5. Click **Copy from a previous week** → confirm with **Ok**.
6. In row index 3 (the main task row), fill cells 1–5 (Mon–Fri) with `"8"`.
7. Click **Submit** and assert the `submitLabor` API response returns HTTP 200.

## Conventions

- Use `getByRole` locators — the existing test is the canonical example.
- Row/cell indices are 0-based (`nth(3)`, `nth(1)`–`nth(5)`).
- Each cell requires two interactions: click the `.border` div first, then fill the revealed `<input>`.
- New tests go in `tests/` and should match the `*spec.ts` glob.
