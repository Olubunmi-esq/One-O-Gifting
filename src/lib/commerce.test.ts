import { describe, expect, it } from 'vitest';
import { calculateCartSubtotal, normaliseQuantity } from './commerce';

describe('calculateCartSubtotal', () => {
  it('calculates a multi-item subtotal', () => {
    expect(calculateCartSubtotal([{ unitPrice: 45000, quantity: 2 }, { unitPrice: 18000, quantity: 1 }])).toBe(108000);
  });
  it('returns zero for an empty cart', () => {
    expect(calculateCartSubtotal([])).toBe(0);
  });
  it('rounds to two decimal places', () => {
    expect(calculateCartSubtotal([{ unitPrice: 10.105, quantity: 1 }])).toBe(10.11);
  });
});

describe('normaliseQuantity', () => {
  it('truncates fractional quantities', () => expect(normaliseQuantity(2.9)).toBe(2));
  it('clamps values to the accepted range', () => {
    expect(normaliseQuantity(0)).toBe(1);
    expect(normaliseQuantity(99)).toBe(20);
  });
  it('defaults non-finite values safely', () => expect(normaliseQuantity(Number.NaN)).toBe(1));
});
