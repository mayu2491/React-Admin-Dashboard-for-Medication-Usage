# Medication Usage Dashboard

A React 18 + Vite dashboard for tracking medication usage across shifts and care locations. The interface combines shadcn/ui, Tailwind CSS, and Recharts to deliver a responsive, role-aware experience backed by MSW-powered mock APIs and sample data.

> **Note:** Screenshot assets are not stored in the repository. Capture fresh images of the overview, patients, and medications pages and place them in `docs/screenshots/` when preparing external documentation.

## Features

- **Routing**: `/login`, `/overview`, `/patients`, and `/medications` via React Router.
- **Role-based auth**: Fake JWT authentication against MSW handlers (with static fallbacks) for `admin`, `clinician`, and `viewer` personas.
- **UI kit**: shadcn/ui-inspired components built on Tailwind CSS, including responsive cards, tables, badges, and theming.
- **Tables**: Pagination, column-level filtering, and CSV export powered by TanStack Table and PapaParse.
- **Charts**: Recharts bar and line charts that visualize normalized medication usage by medication, shift, and location.
- **Mock APIs**: MSW handlers served in tests and development, backed by rich sample datasets.
- **Testing**: Vitest + React Testing Library with automated accessibility assertions (axe).
- **Tooling**: Dockerfile with nginx for static hosting and a GitHub Pages workflow for CI deployments.

## Getting started

```bash
npm install
npm run dev
```

The app boots on [http://localhost:5173](http://localhost:5173). Service worker mocks are started automatically in development. If you regenerate dependencies, you can refresh the worker script with:

```bash
npx msw init public/ --save
```

### Mock credentials

| Role      | Email                  | Password     |
|-----------|------------------------|--------------|
| Admin     | `admin@clinic.test`    | `password123`|
| Clinician | `clinician@clinic.test`| `password123`|
| Viewer    | `viewer@clinic.test`   | `password123`|

### Available scripts

| Command          | Description                                   |
|------------------|-----------------------------------------------|
| `npm run dev`    | Start the Vite development server.            |
| `npm run build`  | Create a production build in `dist/`.         |
| `npm run preview`| Preview the production build locally.         |
| `npm test`       | Execute Vitest unit and accessibility tests.  |
| `npm run lint`   | Lint the project with ESLint.                 |

## Docker

Build and run a production image served by nginx:

```bash
docker build -t medication-usage-dashboard .
docker run -p 8080:80 medication-usage-dashboard
```

Navigate to [http://localhost:8080](http://localhost:8080) to view the bundled dashboard.

## GitHub Pages workflow

The included workflow (`.github/workflows/deploy.yml`) builds the static bundle and publishes it to GitHub Pages on every push to `main` or manual dispatch.

## Loom walkthrough script

Use these bullet points when recording a Loom demo:

- Introduce the medication usage dashboard purpose and highlight the mock authentication flow with the available roles.
- Demonstrate logging in as each role to showcase the role-based navigation menu and access control.
- Walk through the overview page, calling out the KPI cards, medication bar chart, shift line chart, and location comparisons.
- Explore the patients table filters, pagination, and CSV export, emphasizing accessibility and responsiveness.
- Review the medications table to explain adherence badges and how the filters surface outliers.
- Close by mentioning the testing setup (Vitest + axe), Docker/nginx distribution, and GitHub Pages automation.

## Project structure

```
├── src
│   ├── components      # UI primitives and layout utilities
│   ├── data            # Static sample datasets
│   ├── features        # Auth context and utilities
│   ├── mocks           # MSW handlers, users, and server/browser setup
│   ├── pages           # Route components for login + dashboard views
│   └── lib             # Data loader helpers and utilities
├── public              # Static assets (including mock service worker placeholder)
├── docs/screenshots    # Placeholder screenshots for documentation
├── Dockerfile          # Multi-stage build targeting nginx
└── .github/workflows   # GitHub Pages deployment workflow
```

## Accessibility & testing

- Login and overview flows are covered by React Testing Library tests with `vitest-axe` accessibility assertions.
- Tailwind theming supports both light and dark modes via a toggleable theme context.
- Tables and interactive controls include accessible labels and keyboard-friendly behaviors.

Enjoy exploring and extending the medication usage dashboard!
