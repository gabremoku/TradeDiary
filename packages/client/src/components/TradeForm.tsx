import { useState } from 'react';
import type { Trade, CreateTradeInput } from '../types/trade';

interface Props {
  initial?: Trade;
  onSubmit: (data: CreateTradeInput) => Promise<void>;
  onCancel: () => void;
}

const empty: CreateTradeInput = {
  symbol: '', direction: 'long', status: 'open',
  entry_price: 0, exit_price: null, quantity: 1,
  entry_date: new Date().toISOString(),
  exit_date: null, stop_loss: null, take_profit: null,
  strategy: null, tags: null, notes: null,
};

export function TradeForm({ initial, onSubmit, onCancel }: Props) {
  const [form, setForm] = useState<CreateTradeInput>(initial ? {
    symbol: initial.symbol, direction: initial.direction, status: initial.status,
    entry_price: initial.entry_price, exit_price: initial.exit_price,
    quantity: initial.quantity, entry_date: initial.entry_date,
    exit_date: initial.exit_date, stop_loss: initial.stop_loss,
    take_profit: initial.take_profit, strategy: initial.strategy,
    tags: initial.tags, notes: initial.notes,
  } : empty);
  const [saving, setSaving] = useState(false);

  const set = (k: keyof CreateTradeInput, v: unknown) =>
    setForm(f => ({ ...f, [k]: v === '' ? null : v }));

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try { await onSubmit(form); } finally { setSaving(false); }
  };

  return (
    <form onSubmit={handle} style={{ display: 'grid', gap: 10, maxWidth: 480 }}>
      <label>Symbol
        <input required value={form.symbol} onChange={e => set('symbol', e.target.value.toUpperCase())} />
      </label>
      <label>Direction
        <select value={form.direction} onChange={e => set('direction', e.target.value)}>
          <option value="long">Long</option>
          <option value="short">Short</option>
        </select>
      </label>
      <label>Entry Price
        <input required type="number" step="any" value={form.entry_price}
          onChange={e => set('entry_price', parseFloat(e.target.value))} />
      </label>
      <label>Exit Price
        <input type="number" step="any" value={form.exit_price ?? ''}
          onChange={e => set('exit_price', e.target.value ? parseFloat(e.target.value) : null)} />
      </label>
      <label>Quantity
        <input required type="number" step="any" value={form.quantity}
          onChange={e => set('quantity', parseFloat(e.target.value))} />
      </label>
      <label>Entry Date
        <input required type="datetime-local"
          value={form.entry_date.slice(0, 16)}
          onChange={e => set('entry_date', new Date(e.target.value).toISOString())} />
      </label>
      <label>Exit Date
        <input type="datetime-local"
          value={form.exit_date?.slice(0, 16) ?? ''}
          onChange={e => set('exit_date', e.target.value ? new Date(e.target.value).toISOString() : null)} />
      </label>
      <label>Stop Loss
        <input type="number" step="any" value={form.stop_loss ?? ''}
          onChange={e => set('stop_loss', e.target.value ? parseFloat(e.target.value) : null)} />
      </label>
      <label>Take Profit
        <input type="number" step="any" value={form.take_profit ?? ''}
          onChange={e => set('take_profit', e.target.value ? parseFloat(e.target.value) : null)} />
      </label>
      <label>Strategy
        <input value={form.strategy ?? ''} onChange={e => set('strategy', e.target.value)} />
      </label>
      <label>Tags (comma-separated)
        <input value={form.tags ?? ''} onChange={e => set('tags', e.target.value)} />
      </label>
      <label>Notes
        <textarea rows={3} value={form.notes ?? ''} onChange={e => set('notes', e.target.value)} />
      </label>
      <div style={{ display: 'flex', gap: 8 }}>
        <button type="submit" disabled={saving}>{saving ? 'Saving…' : initial ? 'Save Changes' : 'Add Trade'}</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}
