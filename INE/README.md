# INE Dashboard

INE Dashboard is the frontend and backend workspace for the INE product monitoring application. It combines a React dashboard with a server that scrapes product data, tracks stored items, records history, and serves analytics and system status.

## Repository layout

```text
INE/
├── apps/
│   ├── frontend/   # React + Vite dashboard
│   └── server/     # Express API + scraper + scheduler
├── docs/
│   └── AI_LOG.md   # project notes and implementation log
├── packages/
│   └── shared/
├── README.md
├── package.json
├── pnpm-lock.yaml
├── turbo.json
└── pnpm-workspace.yaml
```

## What is included

### Frontend
- Product catalog browsing and search
- Tracked product management
- Product detail pages with option selection
- Price change and stock visibility in a table
- Dashboard summary cards
- Analytics pages for price movement and reliability
- Scrape logs and CSV export
- Settings and system health panels

### Backend
- Express API for catalog, tracked items, runs, and health
- Database-backed product tracking
- Scrape scheduling and run processing
- Playwright-based scraping and result parsing
- CSV export generation
- Layout and health status reporting

## Quick start

Install the monorepo dependencies:

```bash
cd INE
pnpm install
```

Run the frontend:

```bash
cd INE/apps/frontend
pnpm dev
```

Run the backend:

```bash
cd INE/apps/server
pnpm dev
```

## Environment setup

### Frontend

```bash
cd INE/apps/frontend
cp .env.example .env
```

Example:

```env
VITE_API_URL=http://localhost:3000/api
```

### Backend
Set the required environment variables for the database and scraping configuration according to the server app documentation.

## Scripts

From the monorepo root:

```bash
cd INE
pnpm build
pnpm lint
pnpm test
```

## Documentation

- INE/apps/frontend/README.md — frontend architecture and dashboard behavior
- INE/apps/server/README.md — API, scraper, scheduling, and database details
- INE/docs/AI_LOG.md — debugging history and implementation notes

## Notes

This README reflects the features that are actually present in the app at the current state of the repository. It does not list features or modules that are not implemented in this codebase.
