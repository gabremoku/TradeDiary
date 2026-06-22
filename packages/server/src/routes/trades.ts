import { Router } from 'express';
import { z } from 'zod';
import * as tradesDb from '../db/trades';

export const tradesRouter = Router();

const TradeSchema = z.object({
  symbol:       z.string().min(1).toUpperCase(),
  direction:    z.enum(['long', 'short']),
  entry_price:  z.number().positive(),
  exit_price:   z.number().positive().nullable().optional(),
  quantity:     z.number().positive(),
  entry_date:   z.string().datetime({ offset: true }),
  exit_date:    z.string().datetime({ offset: true }).nullable().optional(),
  stop_loss:    z.number().positive().nullable().optional(),
  take_profit:  z.number().positive().nullable().optional(),
  strategy:     z.string().nullable().optional(),
  tags:         z.string().nullable().optional(),
  notes:        z.string().nullable().optional(),
  status:       z.enum(['open', 'closed']).optional(),
});

tradesRouter.get('/', (_req, res) => {
  res.json(tradesDb.getAllTrades());
});

tradesRouter.get('/stats', (_req, res) => {
  res.json(tradesDb.getStats());
});

tradesRouter.get('/:id', (req, res) => {
  const trade = tradesDb.getTradeById(Number(req.params.id));
  if (!trade) return res.status(404).json({ error: 'Trade not found' });
  res.json(trade);
});

tradesRouter.post('/', (req, res) => {
  const parsed = TradeSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const trade = tradesDb.createTrade(parsed.data as any);
  res.status(201).json(trade);
});

tradesRouter.patch('/:id', (req, res) => {
  const parsed = TradeSchema.partial().safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const trade = tradesDb.updateTrade(Number(req.params.id), parsed.data as any);
  if (!trade) return res.status(404).json({ error: 'Trade not found' });
  res.json(trade);
});

tradesRouter.delete('/:id', (req, res) => {
  const deleted = tradesDb.deleteTrade(Number(req.params.id));
  if (!deleted) return res.status(404).json({ error: 'Trade not found' });
  res.status(204).send();
});
