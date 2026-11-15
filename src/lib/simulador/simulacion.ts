import type { Asset } from "./activos";
import type { PricePoint, Position, SimulationSnapshot, TradeRecord } from "./tipos";
import { ASSETS, DEFAULT_CONFIG } from "./activos";

type Config = typeof DEFAULT_CONFIG;

function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export class MotorSimulacion {
  private assets: Asset[];
  private config: Config;
  private prices: Record<string, number>;
  private history: Record<string, PricePoint[]>;
  private positions: Record<string, Position>;
  private trades: TradeRecord[];
  private cash: number;
  private paused: boolean;
  private tick: number;
  private rngState: number;
  private rng: () => number;
  private startedAt: number;
  private initialTotal: number;

  constructor(assets: Asset[] = ASSETS, config: Config = DEFAULT_CONFIG) {
    this.assets = assets;
    this.config = config;
    this.prices = {};
    this.history = {};
    this.positions = {};
    this.trades = [];
    this.cash = config.initialUsdBalance;
    this.paused = false;
    this.tick = 0;
    this.rngState = config.seed;
    this.rng = mulberry32(config.seed);
    this.startedAt = Date.now();
    this.initialTotal = config.initialUsdBalance;

    for (const asset of assets) {
      this.prices[asset.id] = asset.basePrice;
      this.history[asset.id] = [{ timestamp: Date.now(), price: asset.basePrice }];
      this.positions[asset.id] = { quantity: 0, avgPrice: asset.basePrice };
    }

    // initial history
    for (let i = 0; i < config.priceHistoryLength; i++) {
      this.stepInternal();
    }
    this.initialTotal = this.cash;
  }

  static fromSnapshot(snapshot: SimulationSnapshot, assets: Asset[]): MotorSimulacion {
    const motor = new MotorSimulacion(assets, {
      seed: snapshot.seed,
      initialUsdBalance: snapshot.cash,
      tickMs: 2000,
      maxChangePerUpdate: 0.006,
      feeRate: 0.001,
      priceHistoryLength: 60,
    });
    motor.cash = snapshot.cash;
    motor.positions = snapshot.positions;
    motor.trades = snapshot.trades;
    motor.prices = snapshot.prices;
    motor.history = snapshot.history;
    motor.tick = snapshot.tick;
    motor.rngState = snapshot.rngState;
    motor.paused = snapshot.paused;
    motor.startedAt = snapshot.startedAt;
    motor.initialTotal = snapshot.cash;
    // rebuild rng
    let a = snapshot.rngState;
    motor.rng = () => {
      a = (a + 0x6d2b79f5) >>> 0;
      let t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
    return motor;
  }

  private stepInternal(): void {
    if (this.paused) return;
    const now = Date.now();
    for (const asset of this.assets) {
      const prev = this.prices[asset.id];
      const change = (this.rng() - 0.5) * 2 * asset.volatility * (this.config.maxChangePerUpdate / 0.006);
      let next = prev * (1 + change);
      if (next <= 0.0001) next = 0.0001;
      next = Math.round(next * 1000) / 1000;
      this.prices[asset.id] = next;
      const series = this.history[asset.id];
      series.push({ timestamp: now, price: next });
      if (series.length > this.config.priceHistoryLength) series.splice(0, series.length - this.config.priceHistoryLength);
    }
    this.tick += 1;
    this.rngState = Math.floor(this.rng() * 1e9);
  }

  step(): void {
    if (this.paused) return;
    this.stepInternal();
  }

  isPaused(): boolean { return this.paused; }
  togglePause(): boolean { this.paused = !this.paused; return this.paused; }
  pause(): void { this.paused = true; }
  resume(): void { this.paused = false; }

  reset(): void {
    const fresh = new MotorSimulacion(this.assets, this.config);
    this.prices = fresh.prices;
    this.history = fresh.history;
    this.positions = fresh.positions;
    this.trades = fresh.trades;
    this.cash = fresh.cash;
    this.paused = false;
    this.tick = 0;
    this.rng = fresh.rng;
    this.rngState = fresh.rngState;
    this.initialTotal = fresh.initialTotal;
  }

  getPrice(assetId: string): number {
    return this.prices[assetId] ?? 0;
  }

  getHistory(assetId: string): PricePoint[] {
    return [...(this.history[assetId] ?? [])];
  }

  getCash(): number { return this.cash; }
  getConfig(): Config { return this.config; }

  getTrades(): TradeRecord[] { return [...this.trades]; }

  quotes() {
    return this.assets.map((asset) => {
      const series = this.history[asset.id];
      const first = series.length > 1 ? series[0].price : this.prices[asset.id];
      const price = this.prices[asset.id];
      const changePct = first !== 0 ? ((price - first) / first) * 100 : 0;
      return { asset, price, changePct };
    });
  }

  positionViews() {
    return this.assets
      .filter((a) => (this.positions[a.id]?.quantity ?? 0) > 0)
      .map((asset) => {
        const pos = this.positions[asset.id];
        const price = this.prices[asset.id];
        const value = pos.quantity * price;
        const unrealizedPnl = (price - pos.avgPrice) * pos.quantity;
        return { asset, position: pos, price, unrealizedPnl, value };
      });
  }

  summary() {
    const positionsValue = this.positionViews().reduce((s, v) => s + v.value, 0);
    const totalValue = this.cash + positionsValue;
    const unrealizedPnl = this.positionViews().reduce((s, v) => s + v.unrealizedPnl, 0);
    const dayChange = totalValue - this.initialTotal;
    const dayChangePct = this.initialTotal !== 0 ? (dayChange / this.initialTotal) * 100 : 0;
    return { cash: this.cash, totalValue, dayChange, dayChangePct, unrealizedPnl };
  }

  buy(assetId: string, quantity: number): { ok: boolean; message: string } {
    if (!Number.isFinite(quantity) || quantity <= 0) {
      return { ok: false, message: "La cantidad debe ser un número positivo." };
    }
    const asset = this.assets.find((a) => a.id === assetId);
    if (!asset) return { ok: false, message: "Activo desconocido." };
    const price = this.prices[assetId];
    const gross = quantity * price;
    const fee = gross * this.config.feeRate;
    const total = gross + fee;
    if (total > this.cash + 1e-9) {
      return { ok: false, message: "Saldo ficticio insuficiente para esta compra." };
    }
    this.cash -= total;
    const pos = this.positions[assetId];
    const newQty = pos.quantity + quantity;
    pos.avgPrice = pos.quantity > 0 ? (pos.quantity * pos.avgPrice + quantity * price) / newQty : price;
    pos.quantity = newQty;

    const trade: TradeRecord = {
      id: `T${this.tick}-${this.trades.length + 1}`,
      date: new Date().toLocaleString("es-ES"),
      symbol: asset.symbol,
      side: "buy",
      quantity,
      price,
      gross,
      fee,
    };
    this.trades.unshift(trade);
    if (this.trades.length > 200) this.trades.length = 200;
    return { ok: true, message: "Compra simulada ejecutada." };
  }

  sell(assetId: string, quantity: number): { ok: boolean; message: string } {
    if (!Number.isFinite(quantity) || quantity <= 0) {
      return { ok: false, message: "La cantidad debe ser un número positivo." };
    }
    const pos = this.positions[assetId];
    if (!pos || pos.quantity <= 0) {
      return { ok: false, message: "No tienes posición en este activo." };
    }
    if (quantity > pos.quantity + 1e-9) {
      return { ok: false, message: "No puedes vender más de lo que tienes." };
    }
    const asset = this.assets.find((a) => a.id === assetId);
    if (!asset) return { ok: false, message: "Activo desconocido." };
    const price = this.prices[assetId];
    const gross = quantity * price;
    const fee = gross * this.config.feeRate;
    const net = gross - fee;
    this.cash += net;
    pos.quantity -= quantity;
    if (pos.quantity <= 1e-9) {
      pos.quantity = 0;
      pos.avgPrice = price;
    }
    const trade: TradeRecord = {
      id: `T${this.tick}-${this.trades.length + 1}`,
      date: new Date().toLocaleString("es-ES"),
      symbol: asset.symbol,
      side: "sell",
      quantity,
      price,
      gross,
      fee,
    };
    this.trades.unshift(trade);
    if (this.trades.length > 200) this.trades.length = 200;
    return { ok: true, message: "Venta simulada ejecutada." };
  }

  snapshot(): SimulationSnapshot {
    return {
      version: 1,
      cash: this.cash,
      positions: JSON.parse(JSON.stringify(this.positions)),
      trades: JSON.parse(JSON.stringify(this.trades)),
      prices: { ...this.prices },
      history: JSON.parse(JSON.stringify(this.history)),
      tick: this.tick,
      rngState: this.rngState,
      seed: this.config.seed,
      paused: this.paused,
      startedAt: this.startedAt,
    };
  }
}
