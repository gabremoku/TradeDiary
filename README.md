# TradeDiary

> A free, open source trading journal for tracking, analyzing, and improving your trading performance.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![GitHub Issues](https://img.shields.io/github/issues/gabremoku/tradediary)](https://github.com/gabremoku/tradediary/issues)

---

## What is TradeDiary?

TradeDiary is an open source trading journal application designed to help traders of all levels document their trades, analyze patterns in their decision-making, and continuously improve their strategy. Whether you trade stocks, forex, crypto, or futures, TradeDiary gives you a structured way to record entries, exits, and the reasoning behind every trade — then surfaces the data you need to grow.

---

## Key Features

- **Trade Logging** — Record entries, exits, position size, instrument, and personal notes for every trade.
- **Performance Analytics** — Visualize win rate, profit factor, average R:R, drawdown, and equity curves over time.
- **Tag & Strategy Tracking** — Label trades by strategy, session, or market condition and filter analytics by tag.
- **Risk Management Tools** — Track risk per trade, daily loss limits, and portfolio exposure at a glance.
- **Trade Review Workflow** — Attach screenshots and post-trade notes to build a structured review habit.
- **Import / Export** — Import trades from broker CSV exports; export your journal data at any time.
- **No Lock-in** — Your data stays yours. SQLite by default; configurable for other databases.

---

## Tech Stack

> _To be finalized as the project evolves. Suggestions welcome via [Discussions](https://github.com/gabremoku/tradediary/discussions)._

- **Frontend:** React / TypeScript
- **Backend:** Node.js / Express (or equivalent REST/GraphQL API)
- **Database:** SQLite (default), PostgreSQL (optional)
- **Testing:** Vitest / Jest, Playwright

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) >= 18
- [npm](https://www.npmjs.com/) >= 9 (or equivalent package manager)
- Git

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/gabremoku/tradediary.git
cd tradediary

# 2. Install dependencies
npm install

# 3. Copy environment config and adjust as needed
cp config/.env.example .env

# 4. Run database migrations
npm run db:migrate

# 5. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Running Tests

```bash
# Unit and integration tests
npm test

# End-to-end tests
npm run test:e2e
```

---

## Project Structure

```
tradediary/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Application pages / views
│   ├── services/       # API clients and business logic
│   ├── hooks/          # Custom React hooks
│   ├── types/          # TypeScript type definitions
│   └── utils/          # Shared utility functions
├── tests/
│   ├── unit/           # Unit tests
│   ├── integration/    # Integration tests
│   └── e2e/            # End-to-end tests
├── docs/               # Additional documentation
├── config/             # Configuration templates
└── .github/            # CI workflows, issue & PR templates
```

---

## Contributing

We welcome contributions of all kinds — bug reports, feature requests, documentation improvements, and code.

Please read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request.

**Quick steps:**
1. Fork this repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes with clear messages
4. Open a pull request against `main`

---

## Roadmap

- [ ] Core trade logging UI
- [ ] Analytics dashboard
- [ ] Broker CSV import (Interactive Brokers, TD Ameritrade, Binance)
- [ ] Mobile-responsive layout
- [ ] REST API with OpenAPI spec
- [ ] Docker / self-hosted deployment guide
- [ ] Plugin / extension system

See the [open issues](https://github.com/gabremoku/tradediary/issues) for the full list.

---

## License

Distributed under the [MIT License](LICENSE). Free to use, modify, and distribute.

---

## Community

- [Open an Issue](https://github.com/gabremoku/tradediary/issues/new/choose)
- [Start a Discussion](https://github.com/gabremoku/tradediary/discussions)
- [Submit a Pull Request](https://github.com/gabremoku/tradediary/pulls)
