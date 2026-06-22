interface Props {
  label: string;
  value: string | number;
  positive?: boolean;
}

export function StatCard({ label, value, positive }: Props) {
  const color =
    positive === undefined ? '#fff' : positive ? '#22c55e' : '#ef4444';
  return (
    <div style={{ background: '#1e293b', borderRadius: 8, padding: '16px 20px', minWidth: 140 }}>
      <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 24, fontWeight: 700, color }}>{value}</div>
    </div>
  );
}
