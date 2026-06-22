import { db } from './database';
import type { Trade, CreateTradeInput, UpdateTradeInput } from '../types/trade';

function calcPnl(trade: Partial<Trade>): { pnl: number | null; outcome: string | null } {
  if (!trade.exit_price || !trade.entry_price || !trade.quantity) return { pnl: null, outcome: null };
  const raw =
    trade.direction === 'long'
      ? (trade.exit_price - trade.entry_price) * trade.quantity
      : (trade.entry_price - trade.exit_price) * trade.quantity;
  const pnl = Math.round(raw * 100) / 100;
  const outcome = pnl > 0 ? 'win' : pnl < 0 ? 'loss' : 'breakeven';
  return { pnl, outcome };
}

export function getAllTrades(): Trade[] {
  return db.prepare('SELECT * FROM trades ORDER BY entry_date DESC').all() as Trade[];
}

export function getTradeById(id: number): Trade | undefined {
  return db.prepare('SELECT * FROM trades WHERE id = ?').get(id) as Trade | undefined;
}

export function createTrade(input: CreateTradeInput): Trade {
  const { pnl, outcome } = calcPnl(input);
  const status = input.exit_price ? 'closed' : 'open';
  const stmt = db.prepare(`
    INSERT INTO trades (symbol, direction, status, entry_price, exit_price, quantity,
      entry_date, exit_date, stop_loss, take_profit, strategy, tags, notes, pnl, outcome)
    VALUES (@symbol, @direction, @status, @entry_price, @exit_price, @quantity,
      @entry_date, @exit_date, @stop_loss, @take_profit, @strategy, @tags, @notes, @pnl, @outcome)
  `);
  const result = stmt.run({ ...input, status, pnl, outcome });
  return getTradeById(result.lastInsertRowid as number)!;
}

export function updateTrade(id: number, input: UpdateTradeInput): Trade | undefined {
  const existing = getTradeById(id);
  if (!existing) return undefined;

  const merged = { ...existing, ...input };
  const { pnl, outcome } = calcPnl(merged);
  const status = merged.exit_price ? 'closed' : 'open';

  db.prepare(`
    UPDATE trades SET
      symbol = @symbol, direction = @direction, status = @status,
      entry_price = @entry_price, exit_price = @exit_price, quantity = @quantity,
      entry_date = @entry_date, exit_date = @exit_date, stop_loss = @stop_loss,
      take_profit = @take_profit, strategy = @strategy, tags = @tags,
      notes = @notes, pnl = @pnl, outcome = @outcome,
      updated_at = datetime('now')
    WHERE id = @id
  `).run({ ...merged, status, pnl, outcome, id });

  return getTradeById(id);
}

export function deleteTrade(id: number): boolean {
  const result = db.prepare('DELETE FROM trades WHERE id = ?').run(id);
  return result.changes > 0;
}

export function getStats() {
  const trades = db.prepare("SELECT * FROM trades WHERE status = 'closed'").all() as Trade[];
  if (trades.length === 0) return { totalTrades: 0, winRate: 0, totalPnl: 0, profitFactor: 0, avgPnl: 0 };

  const wins = trades.filter(t => t.outcome === 'win');
  const grossProfit = wins.reduce((s, t) => s + (t.pnl ?? 0), 0);
  const grossLoss = Math.abs(trades.filter(t => t.outcome === 'loss').reduce((s, t) => s + (t.pnl ?? 0), 0));
  const totalPnl = trades.reduce((s, t) => s + (t.pnl ?? 0), 0);

  return {
    totalTrades: trades.length,
    winRate: Math.round((wins.length / trades.length) * 100),
    totalPnl: Math.round(totalPnl * 100) / 100,
    profitFactor: grossLoss > 0 ? Math.round((grossProfit / grossLoss) * 100) / 100 : null,
    avgPnl: Math.round((totalPnl / trades.length) * 100) / 100,
  };
}
