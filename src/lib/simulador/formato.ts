export function formatMoney(value: number): string {
  return value.toLocaleString("es-ES", { style: "currency", currency: "USD" });
}

export function formatPrice(value: number, decimals = 2): string {
  return value.toLocaleString("es-ES", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

export function formatQuantity(value: number): string {
  return value.toLocaleString("es-ES", { minimumFractionDigits: 0, maximumFractionDigits: 6 });
}

export function formatSigned(value: number): string {
  const sign = value >= 0 ? "+" : "";
  return `${sign}${value.toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
