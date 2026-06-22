export type Direction = 'long' | 'short';
export type TradeStatus = 'open' | 'closed';
export type Outcome = 'win' | 'loss' | 'breakeven';

export interface Trade {
  id: number;
  symbol: string;
  direction: Direction;
  status: TradeStatus;
  entry_price: number;
  exit_price: number | null;
  quantity: number;
  entry_date: string;   // ISO 8601
  exit_date: string | null;
  stop_loss: number | null;
  take_profit: number | null;
  strategy: string | null;
  tags: string | null;  // comma-separated
  notes: string | null;
  pnl: number | null;
  outcome: Outcome | null;
  created_at: string;
  updated_at: string;
}

export type CreateTradeInput = Omit<Trade, 'id' | 'pnl' | 'outcome' | 'created_at' | 'updated_at'>;
export type UpdateTradeInput = Partial<CreateTradeInput>;
