# INE Product Price Tracker

## Overview

This repository contains the INE Product Price Tracker project as a monorepo. The actual app lives under the `INE/` folder and consists of a React frontend, an Express backend, and a Playwright scraper that monitors the INE mock store for product price and stock changes.

The implementation matches the assignment requirements for product browsing, tracking, scheduled scraping, attempt logging, and CSV export. The backend is configured for Render, the frontend is intended for Vercel, and the database is PostgreSQL managed through Supabase.

## Live deployment links

- Frontend: https://frontend-ine.vercel.app/
- Backend health: https://ine-price-tracker-98l2.onrender.com/api/health

## Setup instructions

### 1) Install dependencies

```bash
cd "c:\Users\jaina\Desktop\ine-price-tracker"
pnpm install
```

### 2) Run the frontend

```bash
cd INE/apps/frontend
pnpm install --frozen-lockfile
pnpm dev
```

The frontend runs on the Vite dev server, typically at http://localhost:5173.

### 3) Run the backend

```bash
cd INE/apps/server
pnpm install --frozen-lockfile
pnpm dev
```

The backend API listens on the configured port (default is http://localhost:3000).

### 4) Optional local DB setup

```bash
docker run -d --name pricepulse-pg \
  -e POSTGRES_USER=pricepulse \
  -e POSTGRES_PASSWORD=your_password \
  -e POSTGRES_DB=pricepulse_dev \
  -p 55432:5432 postgres:17-alpine
```

Then create the test database if needed:

```bash
docker exec pricepulse-pg createdb -U pricepulse pricepulse_test
```

## Scraping schedule

The default tracked-item interval is 120 minutes and is aligned to UTC slot boundaries. In practice, that means scraping happens on even UTC hours, such as 00:00, 02:00, 04:00, and so on.

The server schedule uses:

- `DEFAULT_INTERVAL = 120` minutes
- a 5-minute tolerance window for early cron calls
- `nextAligned()` logic so the schedule does not drift over time
- one active run at a time, with the next scrape time recalculated after each served slot

In production, the app expects an external cron service such as cron-job.org to trigger a scrape. The documented pattern is:

- `POST /api/scrape/run` with `Authorization: Bearer <CRON_SECRET>` at the top of the hour
- `GET /api/health` at minute 50 and 55 to wake a sleeping Render instance
- `Accept: application/json` on all cron requests so Render does not return its HTML loading page instead of the API response

## Required environment variables

### Frontend

```env
VITE_API_URL=http://localhost:3000/api
```

### Backend

At minimum, the server expects the following environment variables to be configured:

```env
DATABASE_URL=postgresql://user:password@host:5432/dbname?sslmode=verify-full&sslrootcert=certs/supabase-prod-ca-2021.crt
STORE_BASE_URL=https://demo.inelabteamdev.com
CORS_ORIGINS=http://localhost:5173,https://frontend-ine.vercel.app
CRON_SECRET=your_shared_secret
```

Additional optional runtime settings supported by the server config are:

```env
SCRAPER_HEADLESS=true
SCRAPER_BROWSER_CHANNEL=chrome
SCRAPER_MAX_TRIES=3
SCRAPER_RETRY_BASE_DELAY_MS=5000
SCRAPER_TRY_TIMEOUT_MS=120000
SCRAPER_NAV_TIMEOUT_MS=30000
SCRAPER_QUOTE_TIMEOUT_MS=60000
SCRAPER_PENDING_RECHECKS=3
SCHEDULER_TOLERANCE_MINUTES=5
STALE_RUN_MINUTES=15
RUNNER_PRODUCT_GAP_MS=4000
MANUAL_SCRAPE_COOLDOWN_MINUTES=10
MAX_TRACKED=12
STORE_REQUEST_GAP_MS=1100
STORE_TIMEOUT_MS=10000
STORE_MAX_TRIES=3
STORE_RETRY_BASE_DELAY_MS=1000
```

Note: `STORE_BASE_URL` is restricted to the INE mock store host or localhost/127.0.0.1, and the backend refuses other hosts for security.

## Repository layout

```text
.
├── INE/
│   ├── apps/
│   │   ├── frontend/      # React + Vite dashboard
│   │   └── server/        # Express API + scraper + scheduler + DB logic
│   ├── docs/
│   │   └── AI_LOG.md      # repo history and correction notes
│   ├── packages/
│   │   └── shared/
│   ├── README.md          # app-level project documentation
│   ├── package.json
│   ├── pnpm-lock.yaml
│   ├── pnpm-workspace.yaml
│   ├── turbo.json
│   └── vercel.json
├── README.md              # repo-level overview
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
└── vercel.json
```

## Actual implemented features

- Product catalog browsing and search by partial/full product name
- Product detail flow with specific option selection
- Persistence of tracked products and option selections in PostgreSQL
- Scheduled scraping with a default 120-minute interval aligned to UTC slots
- Price and stock history per tracked option
- Attempt logging for every scrape, including success, retried, and failed outcomes
- Honest failed-attempt handling, without storing successful price or stock values on failed rows
- CSV export for scrape attempts with the required fields and empty values for failed rows
- Dashboard analytics and status views for tracked products
- System health, logs, and settings screens in the frontend

## Tech stack

### Frontend
- React + Vite + TypeScript
- Material UI
- React Query
- Axios

### Backend
- Express.js
- PostgreSQL
- Playwright
- Node-based scheduler and run manager
- Docker-ready server configuration

## Documentation included in the repo

- `INE/README.md` — high-level monorepo overview
- `INE/apps/frontend/README.md` — frontend documentation
- `INE/apps/server/README.md` — backend, scheduler, scraper, and API documentation
- `INE/apps/server/docs/deployment-notes.md` — Render, Supabase, cron, and cold-start notes
- `INE/apps/server/docs/store-notes.md` — mock-store behavior and scraper contract notes
- `INE/docs/AI_LOG.md` — implementation and debugging history

## Environment and deployment notes

The repository contains actual deployment and environment information, including:

- frontend intended for Vercel
- backend intended for Render
- PostgreSQL data store via Supabase
- external cron scheduling for the scraper trigger
- strict store host validation to the INE mock store or localhost

This is reflected in the repo’s configuration and deployment notes, not in invented assumptions.

## Local development

From the repo root:

```bash
pnpm install
```

Then run the workspace app pieces separately:

```bash
cd INE/apps/frontend
pnpm install --frozen-lockfile
pnpm dev
```

```bash
cd INE/apps/server
pnpm install --frozen-lockfile
pnpm dev
```

## Verification note

This README reflects only the repository as it currently exists: the actual app structure, documented architecture, and implemented feature set. It intentionally excludes unsupported or placeholder functionality not found in the codebase or project docs.

