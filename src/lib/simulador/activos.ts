export interface Asset {
  id: string;
  symbol: string;
  name: string;
  color: string;
  priceDecimals: number;
  basePrice: number;
  volatility: number;
  drift: number;
}

export const ASSETS: Asset[] = [
  { id: "btc", symbol: "BTC", name: "Bitcoin (demo)", color: "#f7931a", priceDecimals: 2, basePrice: 60000, volatility: 0.012, drift: 0.0001 },
  { id: "eth", symbol: "ETH", name: "Ethereum (demo)", color: "#627eea", priceDecimals: 2, basePrice: 3200, volatility: 0.015, drift: 0.00015 },
  { id: "neb", symbol: "NEB", name: "NebulaCoin (demo)", color: "#a855f7", priceDecimals: 2, basePrice: 12.5, volatility: 0.02, drift: 0.0002 },
  { id: "qtm", symbol: "QTM", name: "QuantumToken (demo)", color: "#22d3ee", priceDecimals: 3, basePrice: 3.2, volatility: 0.025, drift: 0.00025 },
  { id: "aur", symbol: "AUR", name: "AuroraCoin (demo)", color: "#34d399", priceDecimals: 2, basePrice: 48.75, volatility: 0.018, drift: 0.00012 },
];

export const DEFAULT_CONFIG: SimulationConfigLike = {
  seed: 20250308,
  initialUsdBalance: 10000,
  tickMs: 2000,
  maxChangePerUpdate: 0.006,
  feeRate: 0.001,
  priceHistoryLength: 60,
};

export interface SimulationConfigLike {
  seed: number;
  initialUsdBalance: number;
  tickMs: number;
  maxChangePerUpdate: number;
  feeRate: number;
  priceHistoryLength: number;
}

export const SNAPSHOT_VERSION = 1;
export const STORAGE_KEY = "traid_simulador_v1";
