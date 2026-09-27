# INE Product Price Tracker

## Overview

This repository contains the INE Product Price Tracker project as a monorepo. The actual app lives under the `INE/` folder and consists of a React frontend, an Express backend, and a Playwright scraper that monitors the INE mock store for product price and stock changes.

The implementation matches the assignment requirements for product browsing, tracking, scheduled scraping, attempt logging, and CSV export. The backend is configured for Render, the frontend is intended for Vercel, and the database is PostgreSQL managed through Supabase.

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

