# INE Dashboard

INE Dashboard is a price and stock monitoring app for the INE mock storefront. It lets users browse the catalog, track products, watch price changes, review scrape history, and monitor system health from a single dashboard.

## What this app does

- Searches the product catalog and shows live product details
- Tracks products and options with price and stock monitoring
- Shows a dashboard with recent KPI summaries and price-change trends
- Lists tracked products in a table with status, stock, and last scrape data
- Displays price history for individual tracked options
- Shows analytics for stock, price movement, and scrape reliability
- Keeps a scrape log for every attempt and supports CSV export
- Surfaces backend health and settings information

## Repository structure

```text
.
├── INE/
│   ├── apps/
│   │   ├── frontend/      # React + Vite dashboard
│   │   └── server/        # Express API + scraping + scheduling
│   ├── docs/
│   │   └── AI_LOG.md      # development notes and issue log
│   ├── packages/
│   │   └── shared/
│   ├── README.md
│   └── package.json
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── vercel.json
└── README.md              # this file
```

## App features

### Dashboard
- KPI cards for tracked products, recent scraping activity, and recent price movement
- Summary cards that surface the latest stock and change data
- Overview of the current tracked state in the app

### All Products
- Product catalog browsing from the INE store
- Search by product name with a debounced filter
- Pagination across catalogue pages
- Product cards with store metadata and option count
- Option-level tracking flow

### Tracked Products
- Track/untrack products and option variants
- Manage tracked items from a table view
- See current price, stock, status, price change, and last scrape time
- Refresh prices manually and open product detail pages

### Product details and price history
- Option selection for a store product
- Live product data plus tracked fallback data
- Historical price/stock observations for a selected option
- Change comparisons over time

### Analytics
- Price movement metrics
- Scrape reliability summaries
- Stock availability breakdown
- Time-based attempt and outcome analysis

### Scrape Logs
- Detailed attempt history across tracked items
- Outcome and error information for each run
- Filtered log views and per-option drill-down
- CSV export of scrape history

### Settings
- System health checks against the backend
- Database and uptime information
- Scraping metadata and app details
- Notifications and system status overview

## Tech stack

### Frontend
- React 19
- Vite
- TypeScript
- Material UI
- React Query
- Axios

### Backend
- Express.js
- PostgreSQL
- Playwright
- cron-style scheduling
- Docker-ready server setup

## Local development

From the workspace root:

```bash
pnpm install
```

Then run the app parts separately:

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

The frontend runs on the Vite dev server and calls the backend API. The server exposes the API on the configured port and performs scraping and scheduling tasks.

## Environment variables

### Frontend
Create an environment file in the frontend app if needed:

```bash
cd INE/apps/frontend
cp .env.example .env
```

Example:

```env
VITE_API_URL=http://localhost:3000/api
```

### Backend
The server expects database and runtime configuration in its environment. See the server README for the full configuration list.

## Build and verification

```bash
cd INE/apps/frontend
pnpm build
```

```bash
cd INE/apps/server
pnpm test
```

## Documentation and project notes

This repo includes the relevant docs and implementation notes:

- INE/README.md — monorepo overview and app-level setup
- INE/apps/frontend/README.md — frontend architecture and UI flow
- INE/apps/server/README.md — API, scraper, and scheduling details
- INE/docs/AI_LOG.md — recorded implementation notes, debugging history, and project learnings

## Notes

This README intentionally includes only features and modules that exist in the current app. It avoids documenting unrelated features or placeholder functionality that is not implemented in this repository.

