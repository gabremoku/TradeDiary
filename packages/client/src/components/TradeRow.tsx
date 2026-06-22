import type { Trade } from '../types/trade';

interface Props {
  trade: Trade;
  onDelete: (id: number) => void;
  onEdit: (trade: Trade) => void;
}

const fmt = (n: number | null) => (n == null ? '—' : n.toFixed(2));
const date = (s: string | null) => (s ? s.slice(0, 10) : '—');

export function TradeRow({ trade, onDelete, onEdit }: Props) {
  const pnlColor =
    trade.pnl == null ? '#94a3b8' : trade.pnl > 0 ? '#22c55e' : trade.pnl < 0 ? '#ef4444' : '#94a3b8';

  return (
    <tr style={{ borderBottom: '1px solid #334155' }}>
      <td>{trade.symbol}</td>
      <td style={{ color: trade.direction === 'long' ? '#22c55e' : '#ef4444' }}>
        {trade.direction.toUpperCase()}
      </td>
      <td>{date(trade.entry_date)}</td>
      <td>{fmt(trade.entry_price)}</td>
      <td>{fmt(trade.exit_price)}</td>
      <td>{trade.quantity}</td>
      <td style={{ color: pnlColor, fontWeight: 600 }}>{fmt(trade.pnl)}</td>
      <td>{trade.strategy ?? '—'}</td>
      <td style={{ color: '#64748b', fontSize: 12 }}>{trade.status}</td>
      <td>
        <button onClick={() => onEdit(trade)} style={btnStyle('#334155')}>Edit</button>
        <button onClick={() => onDelete(trade.id)} style={btnStyle('#7f1d1d')}>Del</button>
      </td>
    </tr>
  );
}

const btnStyle = (bg: string): React.CSSProperties => ({
  background: bg,
  color: '#fff',
  border: 'none',
  borderRadius: 4,
  padding: '2px 8px',
  marginRight: 4,
  cursor: 'pointer',
  fontSize: 12,
});
