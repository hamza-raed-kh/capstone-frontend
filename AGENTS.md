# capstone-frontend

## Quick start

```sh
pnpm install
pnpm dev           # Vite dev server
pnpm build         # production build to dist/
pnpm lint          # ESLint (flat config)
pnpm storybook     # Storybook dev on :6006
pnpm preview       # serve production build from dist/ locally
pnpm vitest        # storybook+vitetest browser tests (requires Playwright browsers)
```

No `test` script in package.json — run `pnpm vitest` directly.

## Architecture

- **Framework:** React 19, JSX (no TypeScript), Vite 8, pnpm
- **Routing:** `react-router-dom` v7 with `createBrowserRouter` — all routes defined in `src/App.jsx`
- **State:** Redux Toolkit (`src/store/index.js`): slices for `api`, `layout`, `filters`, `user`, `toast`, `competition`
- **API layer:** RTK Query (`src/features/api/apiSlice.js`) — base URL hardcoded to `http://localhost:8000/api/`
- **Styling:** Tailwind v4 (`@import "tailwindcss"` in `src/index.css`) + CSS Modules (`*.module.css`) + global CSS custom properties
- **UI primitives:** Radix UI (Checkbox, Dialog, Popover, RadioGroup, Select), Iconify for icons
- **Notable deps:** `date-fns` (dates), `react-day-picker` (date picker), `prop-types` (runtime validation, no TypeScript)
- **Theme:** `data-theme` attribute on `<html>`, system preference detection in `App.jsx`, CSS variables in `src/index.css`

## Onboarding

- Onboarding page after signup fetches topics from `GET /api/topics/` and lets user pick interests
- On "Next", calls `PUT /api/users/me/interests/` with `{topic_ids: [...]}`
- On "Skip", navigates to `/explore` without saving
- Backend endpoint must exist — see backend AGENTS.md for API details

## Testing

- **Stack:** Vitest + Playwright browser runner + `@storybook/addon-vitest`
- All tests are story-based — write `.stories.jsx` files, they double as tests
- Run: `pnpm vitest`
- **Note:** requires Playwright browsers installed (`pnpm exec playwright install chromium`)
- A11y checks set to `"todo"` in `.storybook/preview.js` — not blocking

## Storybook

- Stories live at `src/**/*.stories.@(js|jsx|mjs|ts|tsx)` — `@chromatic-com/storybook` addon active
- Dev: `pnpm storybook`
- Build: `pnpm build-storybook`

## Routing / Auth redirects

- `/admin` → redirects to `/admin/dashboard` (logged in) or `/admin/login` (not logged in)
- Admin login → `/admin/dashboard` (not `/admin/draft-submissions`)
- Signup → `/onboarding` (not `/explore`)
- Logout: admin → `/admin/login`, regular → `/login`

## Conventions

- One directory per component/page, colocated with story file and CSS module
- Layouts in `src/layouts/` use CSS Modules (`*.module.css`)
- All input components under `src/components/inputs/`
- No TypeScript — pure JSX
