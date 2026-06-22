import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const DB_DIR = path.join(process.cwd(), 'data');
const DB_PATH = path.join(DB_DIR, 'tradediary.sqlite');

if (!fs.existsSync(DB_DIR)) fs.mkdirSync(DB_DIR, { recursive: true });

export const db = new Database(DB_PATH);

// Enable WAL for better concurrent read performance
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

db.exec(`
  CREATE TABLE IF NOT EXISTS trades (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    symbol       TEXT    NOT NULL,
    direction    TEXT    NOT NULL CHECK(direction IN ('long','short')),
    status       TEXT    NOT NULL DEFAULT 'open' CHECK(status IN ('open','closed')),
    entry_price  REAL    NOT NULL,
    exit_price   REAL,
    quantity     REAL    NOT NULL,
    entry_date   TEXT    NOT NULL,
    exit_date    TEXT,
    stop_loss    REAL,
    take_profit  REAL,
    strategy     TEXT,
    tags         TEXT,
    notes        TEXT,
    pnl          REAL,
    outcome      TEXT    CHECK(outcome IN ('win','loss','breakeven')),
    created_at   TEXT    NOT NULL DEFAULT (datetime('now')),
    updated_at   TEXT    NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS settings (
    key   TEXT PRIMARY KEY,
    value TEXT NOT NULL
  );
`);
