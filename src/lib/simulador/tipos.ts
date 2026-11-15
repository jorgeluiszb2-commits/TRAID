export type TradeSide = "buy" | "sell";
export type MessageKind = "success" | "error" | "info";

export interface PricePoint {
  timestamp: number;
  price: number;
}

export interface TradeRecord {
  id: string;
  date: string;
  symbol: string;
  side: TradeSide;
  quantity: number;
  price: number;
  gross: number;
  fee: number;
}

export interface Position {
  quantity: number;
  avgPrice: number;
}

export interface SimulationSnapshot {
  version: number;
  cash: number;
  positions: Record<string, Position>;
  trades: TradeRecord[];
  prices: Record<string, number>;
  history: Record<string, PricePoint[]>;
  tick: number;
  rngState: number;
  seed: number;
  paused: boolean;
  startedAt: number;
}
