export type PricedLine = { unitPrice: number; quantity: number };

/** Calculate a cart subtotal from catalogue prices, rounded to the currency's two decimal places. */
export function calculateCartSubtotal(lines: PricedLine[]): number {
  const raw = lines.reduce((total, line) => total + line.unitPrice * line.quantity, 0);
  return Math.round((raw + Number.EPSILON) * 100) / 100;
}

/** Keep cart quantities within the limits accepted by the order endpoint. */
export function normaliseQuantity(value: number): number {
  if (!Number.isFinite(value)) return 1;
  return Math.min(20, Math.max(1, Math.trunc(value)));
}
