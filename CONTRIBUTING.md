# Contributing to TradeDiary

Thank you for taking the time to contribute! TradeDiary is a community-driven project and every contribution matters, whether it's a bug report, a documentation fix, a new feature, or a code review.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Branching Strategy](#branching-strategy)
- [Commit Messages](#commit-messages)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)

---

## Code of Conduct

By participating in this project you agree to treat all contributors with respect and maintain a welcoming environment. Harassment, discrimination, and disrespectful behavior will not be tolerated.

---

## How Can I Contribute?

| Type | Where to start |
|------|---------------|
| Bug fix | [Open an issue](https://github.com/gabremoku/tradediary/issues/new?template=bug_report.md) first, then submit a PR |
| Feature request | [Open a feature request](https://github.com/gabremoku/tradediary/issues/new?template=feature_request.md) or [Discussion](https://github.com/gabremoku/tradediary/discussions) |
| Documentation | Edit files in `docs/` or update `README.md` and open a PR |
| Tests | Add or improve tests in `tests/` |
| Translations | Open an issue to coordinate |

---

## Development Setup

```bash
# Fork and clone
git clone https://github.com/<your-username>/tradediary.git
cd tradediary

# Install dependencies
npm install

# Copy env template
cp config/.env.example .env

# Run migrations
npm run db:migrate

# Start dev server
npm run dev
```

Run the test suite before opening a PR:

```bash
npm test
npm run lint
```

---

## Branching Strategy

| Branch | Purpose |
|--------|---------|
| `main` | Stable, production-ready code |
| `feature/<name>` | New features |
| `fix/<name>` | Bug fixes |
| `docs/<name>` | Documentation-only changes |
| `chore/<name>` | Build tooling, dependency updates |

Always branch off `main` and open your PR back against `main`.

---

## Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <short summary>

[optional body]

[optional footer]
```

**Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

**Examples:**
```
feat(analytics): add equity curve chart
fix(import): handle empty CSV rows gracefully
docs(readme): update installation steps
```

---

## Pull Request Process

1. Ensure your branch is up to date with `main`.
2. Make sure all tests pass (`npm test`) and lint is clean (`npm run lint`).
3. Fill out the pull request template completely.
4. Reference any related issues using `Closes #<issue-number>`.
5. Request a review from at least one maintainer.
6. Address all review comments before merge.

PRs that break existing tests, skip linting, or lack a description will not be merged.

---

## Coding Standards

- **Language:** TypeScript (strict mode)
- **Linter:** ESLint with project config
- **Formatter:** Prettier with project config
- **Tests:** Every new feature or bug fix should include a test
- **No commented-out code** in merged PRs
- **Descriptive names** over abbreviations

---

## Reporting Bugs

Use the [bug report template](.github/ISSUE_TEMPLATE/bug_report.md). Include:

- Steps to reproduce
- Expected behavior
- Actual behavior
- Environment (OS, Node version, browser)
- Screenshots or logs if applicable

---

## Suggesting Features

Use the [feature request template](.github/ISSUE_TEMPLATE/feature_request.md). Include:

- The problem you're trying to solve
- Your proposed solution
- Any alternatives you've considered

---

Thank you for helping make TradeDiary better!
