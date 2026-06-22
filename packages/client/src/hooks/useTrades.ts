import { useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';
import type { Trade, CreateTradeInput, Stats } from '../types/trade';

export function useTrades() {
  const [trades, setTrades]   = useState<Trade[]>([]);
  const [stats, setStats]     = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [t, s] = await Promise.all([api.trades.list(), api.trades.stats()]);
      setTrades(t);
      setStats(s);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const addTrade = async (data: CreateTradeInput) => {
    const trade = await api.trades.create(data);
    setTrades(prev => [trade, ...prev]);
    load(); // refresh stats
    return trade;
  };

  const editTrade = async (id: number, data: Partial<CreateTradeInput>) => {
    const trade = await api.trades.update(id, data);
    setTrades(prev => prev.map(t => t.id === id ? trade : t));
    load();
    return trade;
  };

  const removeTrade = async (id: number) => {
    await api.trades.delete(id);
    setTrades(prev => prev.filter(t => t.id !== id));
    load();
  };

  return { trades, stats, loading, error, addTrade, editTrade, removeTrade, refresh: load };
}
