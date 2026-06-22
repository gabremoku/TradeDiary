import type { Trade, CreateTradeInput, Stats } from '../types/trade';

const BASE = '/api';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error ?? 'Request failed');
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}

export const api = {
  trades: {
    list: ()                          => request<Trade[]>('/trades'),
    get:  (id: number)                => request<Trade>(`/trades/${id}`),
    create: (data: CreateTradeInput)  => request<Trade>('/trades', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: number, data: Partial<CreateTradeInput>) =>
      request<Trade>(`/trades/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
    delete: (id: number)              => request<void>(`/trades/${id}`, { method: 'DELETE' }),
    stats:  ()                        => request<Stats>('/trades/stats'),
  },
};
