"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ASSETS, DEFAULT_CONFIG, SNAPSHOT_VERSION, STORAGE_KEY } from "@/lib/simulador/activos";
import { MotorSimulacion } from "@/lib/simulador/simulacion";
import { formatMoney, formatPrice, formatQuantity, formatSigned } from "@/lib/simulador/formato";
import type { MessageKind, SimulationSnapshot, TradeSide } from "@/lib/simulador/tipos";
import { PriceChart } from "./PriceChart";

function loadFromStorage(): MotorSimulacion {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return new MotorSimulacion(ASSETS, DEFAULT_CONFIG);
    const parsed = JSON.parse(raw) as SimulationSnapshot;
    if (parsed.version !== SNAPSHOT_VERSION || typeof parsed.cash !== "number") {
      throw new Error("Snapshot inválido");
    }
    return MotorSimulacion.fromSnapshot(parsed, ASSETS);
  } catch {
    return new MotorSimulacion(ASSETS, DEFAULT_CONFIG);
  }
}

function persist(motor: MotorSimulacion): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(motor.snapshot()));
  } catch {
    // Sin almacenamiento disponible: la simulación sigue funcionando en memoria.
  }
}

export function Simulador() {
  const [motor, setMotor] = useState<MotorSimulacion | null>(null);
  const [version, setVersion] = useState(0);
  const [selected, setSelected] = useState<string>(ASSETS[0]?.id ?? "btc");
  const [side, setSide] = useState<TradeSide>("buy");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<{ text: string; kind: MessageKind } | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const loaded = loadFromStorage();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMotor(loaded);
    setSelected(ASSETS[0]?.id ?? "btc");
  }, []);

  useEffect(() => {
    if (!motor) return;
    const interval = window.setInterval(() => {
      if (motor.isPaused()) return;
      motor.step();
      persist(motor);
      setVersion((value) => value + 1);
    }, motor.getConfig().tickMs);
    return () => window.clearInterval(interval);
  }, [motor]);

  useEffect(() => {
    if (!toast) return;
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 5000);
    return () => {
      if (toastTimer.current) window.clearTimeout(toastTimer.current);
    };
  }, [toast]);

  if (!motor) {
    return <p className="loading">Cargando simulación…</p>;
  }

  const summary = motor.summary();
  const quotes = motor.quotes();
  const positions = motor.positionViews();
  const trades = motor.getTrades();
  const config = motor.getConfig();
  const current = quotes.find((quote) => quote.asset.id === selected) ?? quotes[0];
  const quantity = Number(amount);
  const price = current?.price ?? 0;
  const gross = Number.isFinite(quantity) && quantity > 0 ? quantity * price : 0;
  const fee = gross * config.feeRate;
  const total = gross + fee;
  const held = positions.find((view) => view.asset.id === selected)?.position.quantity ?? 0;

  function showToast(text: string, kind: MessageKind): void {
    setToast({ text, kind });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (!motor || !current) return;
    if (amount.trim() === "") {
      setError("Ingresa una cantidad.");
      return;
    }
    if (!Number.isFinite(quantity) || quantity <= 0) {
      setError("La cantidad debe ser un número positivo.");
      return;
    }
    const result = side === "buy" ? motor.buy(current.asset.id, quantity) : motor.sell(current.asset.id, quantity);
    if (result.ok) {
      setError(null);
      setAmount("");
      showToast(result.message, "success");
      persist(motor);
    } else {
      setError(result.message);
      showToast(result.message, "error");
    }
    setVersion((value) => value + 1);
  }

  function handlePause(): void {
    if (!motor) return;
    const paused = motor.togglePause();
    persist(motor);
    showToast(paused ? "Precios simulados en pausa." : "Precios simulados reanudados.", "info");
    setVersion((value) => value + 1);
  }

  function handleReset(): void {
    if (!motor) return;
    const confirmed = window.confirm(
      "¿Reiniciar la simulación? Se borrarán el saldo, la cartera y el historial de prueba.",
    );
    if (!confirmed) return;
    motor.reset();
    persist(motor);
    setError(null);
    setAmount("");
    showToast("Simulación reiniciada con datos de prueba.", "info");
    setVersion((value) => value + 1);
  }

  return (
    <>
      <section className="panel" aria-labelledby="sim-resumen">
        <h2 id="sim-resumen">Resumen de la simulación</h2>
        <div className="stats">
          <div className="stat">
            <span className="stat__label">Saldo ficticio</span>
            <span className="stat__value">{formatMoney(summary.cash)}</span>
          </div>
          <div className="stat">
            <span className="stat__label">Valor de cartera</span>
            <span className="stat__value">{formatMoney(summary.totalValue)}</span>
          </div>
          <div className="stat">
            <span className="stat__label">Cambio del día</span>
            <span
              className={`stat__value ${summary.dayChange >= 0 ? "is-positive" : "is-negative"}`}
            >
              {formatSigned(summary.dayChange)} ({formatSigned(summary.dayChangePct)} %)
            </span>
          </div>
          <div className="stat">
            <span className="stat__label">P/G no realizado</span>
            <span
              className={`stat__value ${summary.unrealizedPnl >= 0 ? "is-positive" : "is-negative"}`}
            >
              {formatSigned(summary.unrealizedPnl)}
            </span>
          </div>
        </div>
        <div className="nav" style={{ marginTop: "0.75rem" }}>
          <button
            type="button"
            className="btn"
            aria-pressed={motor.isPaused()}
            onClick={handlePause}
          >
            {motor.isPaused() ? "Reanudar precios" : "Pausar precios"}
          </button>
          <button type="button" className="btn btn--danger" onClick={handleReset}>
            Reiniciar simulación
          </button>
        </div>
      </section>

      <div className="grid-2">
        <section className="panel" aria-labelledby="sim-mercado">
          <h2 id="sim-mercado">Mercado de prueba</h2>
          <div className="asset-list" role="list">
            {quotes.map((quote) => (
              <button
                key={quote.asset.id}
                type="button"
                role="listitem"
                className="asset"
                aria-current={quote.asset.id === selected}
                onClick={() => setSelected(quote.asset.id)}
              >
                <span>
                  <span className="asset__symbol">{quote.asset.symbol}</span>{" "}
                  <span className="asset__name">{quote.asset.name}</span>
                </span>
                <span className="asset__price">
                  {formatPrice(quote.price, quote.asset.priceDecimals)}{" "}
                  <span className={quote.changePct >= 0 ? "is-positive" : "is-negative"}>
                    {formatSigned(quote.changePct)} %
                  </span>
                </span>
              </button>
            ))}
          </div>
          <p className="muted">
            Precios ficticios generados localmente. No representan el mercado real.
          </p>
        </section>

        <section className="panel" aria-labelledby="sim-grafico">
          <h2 id="sim-grafico">
            {current ? `${current.asset.name} (${current.asset.symbol})` : "Gráfico"}
          </h2>
          {current ? (
            <>
              <p>
                <strong>{formatPrice(current.price, current.asset.priceDecimals)}</strong>{" "}
                <span className={current.changePct >= 0 ? "is-positive" : "is-negative"}>
                  {formatSigned(current.changePct)} %
                </span>
              </p>
              <PriceChart
                points={motor.getHistory(current.asset.id)}
                color={current.asset.color}
                label="Historial generado localmente — no representa datos del mercado"
                decimals={current.asset.priceDecimals}
              />
            </>
          ) : null}
        </section>
      </div>

      <div className="grid-2">
        <section className="panel" aria-labelledby="sim-operar">
          <h2 id="sim-operar">Operar</h2>
          <form className="form" onSubmit={handleSubmit}>
            <fieldset className="field">
              <legend className="sr-only">Tipo de operación</legend>
              <div className="nav">
                <label className="btn">
                  <input
                    type="radio"
                    name="trade-side"
                    value="buy"
                    checked={side === "buy"}
                    onChange={() => setSide("buy")}
                  />{" "}
                  Comprar
                </label>
                <label className="btn">
                  <input
                    type="radio"
                    name="trade-side"
                    value="sell"
                    checked={side === "sell"}
                    onChange={() => setSide("sell")}
                  />{" "}
                  Vender
                </label>
              </div>
            </fieldset>

            <div className="field">
              <label htmlFor="trade-symbol">Activo</label>
              <select
                id="trade-symbol"
                value={selected}
                onChange={(event) => setSelected(event.target.value)}
              >
                {quotes.map((quote) => (
                  <option key={quote.asset.id} value={quote.asset.id}>
                    {quote.asset.symbol} — {quote.asset.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label htmlFor="trade-amount">
                Cantidad{side === "sell" ? " (disponible: " : " (saldo: "}
                {side === "sell" ? formatQuantity(held) : formatMoney(motor.getCash())}
                {")"}
              </label>
              <input
                id="trade-amount"
                type="number"
                min="0"
                step="any"
                inputMode="decimal"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                placeholder="0.00"
                aria-describedby="trade-quote"
              />
            </div>

            {error ? (
              <p className="form-error" role="alert">
                {error}
              </p>
            ) : null}

            <button type="submit" className="btn btn--primary btn--block">
              {side === "buy" ? "Comprar" : "Vender"} {current?.asset.symbol ?? ""}
            </button>
          </form>

          <dl className="quote" id="trade-quote" aria-live="polite">
            <div className="quote__row">
              <dt>Precio ficticio</dt>
              <dd>{formatPrice(price, current?.asset.priceDecimals ?? 2)}</dd>
            </div>
            <div className="quote__row">
              <dt>Importe</dt>
              <dd>{formatMoney(gross)}</dd>
            </div>
            <div className="quote__row">
              <dt>Comisión (0,1 %)</dt>
              <dd>{formatMoney(fee)}</dd>
            </div>
            <div className="quote__row">
              <dt>Total</dt>
              <dd>{formatMoney(total)}</dd>
            </div>
          </dl>
        </section>

        <section className="panel" aria-labelledby="sim-cartera">
          <h2 id="sim-cartera">Cartera simulada</h2>
          {positions.length === 0 ? (
            <p className="empty">Sin posiciones. Compra un activo para empezar.</p>
          ) : (
            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th>Activo</th>
                    <th>Cantidad</th>
                    <th>Precio medio</th>
                    <th>Precio actual</th>
                    <th>P/G</th>
                    <th>Valor</th>
                  </tr>
                </thead>
                <tbody>
                  {positions.map((view) => (
                    <tr key={view.asset.id}>
                      <td>{view.asset.symbol}</td>
                      <td>{formatQuantity(view.position.quantity)}</td>
                      <td>{formatPrice(view.position.avgPrice, view.asset.priceDecimals)}</td>
                      <td>{formatPrice(view.price, view.asset.priceDecimals)}</td>
                      <td className={view.unrealizedPnl >= 0 ? "is-positive" : "is-negative"}>
                        {formatSigned(view.unrealizedPnl)}
                      </td>
                      <td>{formatMoney(view.value)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>

      <section className="panel" aria-labelledby="sim-historial">
        <h2 id="sim-historial">Historial de operaciones simuladas</h2>
        {trades.length === 0 ? (
          <p className="empty">Aún no hay operaciones.</p>
        ) : (
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Fecha y hora</th>
                  <th>Activo</th>
                  <th>Tipo</th>
                  <th>Cantidad</th>
                  <th>Precio ficticio</th>
                  <th>Total</th>
                  <th>Comisión</th>
                </tr>
              </thead>
              <tbody>
                {trades.map((trade) => (
                  <tr key={trade.id}>
                    <td>{trade.date}</td>
                    <td>{trade.symbol}</td>
                    <td className={trade.side === "buy" ? "is-positive" : "is-negative"}>
                      {trade.side === "buy" ? "Compra" : "Venta"}
                    </td>
                    <td>{formatQuantity(trade.quantity)}</td>
                    <td>{formatPrice(trade.price)}</td>
                    <td>{formatMoney(trade.gross)}</td>
                    <td>{formatMoney(trade.fee)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {toast ? (
        <div className={`toast toast--${toast.kind}`} role="status" aria-live="polite">
          {toast.text}
        </div>
      ) : null}
      <span className="sr-only" aria-live="polite">
        Versión {version}
      </span>
    </>
  );
}
