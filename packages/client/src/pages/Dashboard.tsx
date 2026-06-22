import { useState } from 'react';
import { useTrades } from '../hooks/useTrades';
import { StatCard } from '../components/StatCard';
import { TradeRow } from '../components/TradeRow';
import { TradeForm } from '../components/TradeForm';
import type { Trade, CreateTradeInput } from '../types/trade';

export function Dashboard() {
  const { trades, stats, loading, error, addTrade, editTrade, removeTrade } = useTrades();
  const [showForm, setShowForm]   = useState(false);
  const [editing, setEditing]     = useState<Trade | null>(null);

  const handleAdd = async (data: CreateTradeInput) => {
    await addTrade(data);
    setShowForm(false);
  };

  const handleEdit = async (data: CreateTradeInput) => {
    if (!editing) return;
    await editTrade(editing.id, data);
    setEditing(null);
  };

  if (loading) return <p style={{ padding: 24 }}>Loading…</p>;
  if (error)   return <p style={{ padding: 24, color: '#ef4444' }}>Error: {error}</p>;

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ marginBottom: 20 }}>TradeDiary</h1>

      {/* Stats */}
      {stats && (
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 28 }}>
          <StatCard label="Total Trades"   value={stats.totalTrades} />
          <StatCard label="Win Rate"        value={`${stats.winRate}%`}
            positive={stats.winRate >= 50} />
          <StatCard label="Total P&L"       value={`$${stats.totalPnl}`}
            positive={stats.totalPnl >= 0} />
          <StatCard label="Profit Factor"   value={stats.profitFactor ?? '—'}
            positive={stats.profitFactor != null && stats.profitFactor >= 1} />
          <StatCard label="Avg P&L / Trade" value={`$${stats.avgPnl}`}
            positive={stats.avgPnl >= 0} />
        </div>
      )}

      {/* Add trade button */}
      {!showForm && !editing && (
        <button onClick={() => setShowForm(true)} style={{ marginBottom: 20 }}>
          + New Trade
        </button>
      )}

      {/* Form */}
      {(showForm || editing) && (
        <div style={{ marginBottom: 28, background: '#1e293b', padding: 20, borderRadius: 8 }}>
          <h3 style={{ marginTop: 0 }}>{editing ? 'Edit Trade' : 'New Trade'}</h3>
          <TradeForm
            initial={editing ?? undefined}
            onSubmit={editing ? handleEdit : handleAdd}
            onCancel={() => { setShowForm(false); setEditing(null); }}
          />
        </div>
      )}

      {/* Trade table */}
      {trades.length === 0 ? (
        <p style={{ color: '#64748b' }}>No trades yet. Add your first trade above.</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ textAlign: 'left', color: '#94a3b8', borderBottom: '1px solid #334155' }}>
                {['Symbol','Dir','Entry Date','Entry','Exit','Qty','P&L','Strategy','Status','Actions']
                  .map(h => <th key={h} style={{ padding: '8px 12px' }}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {trades.map(t => (
                <TradeRow
                  key={t.id}
                  trade={t}
                  onDelete={removeTrade}
                  onEdit={setEditing}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
