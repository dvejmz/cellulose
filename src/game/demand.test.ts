import { getDemand, getPurchaseRateFromDemand } from './demand';

describe('getDemand', () => {
  [
    { buyFactor: 6.0, demandSlope: -1/2, price: .2, expected: 6.1 },
    // It should not return negative demand
    { buyFactor: 2.0, demandSlope: 10/12, price: 5.2, expected: 0 },
  ].forEach(t => {
    it('returns correct demand', () => {
      expect(getDemand(t.buyFactor, t.demandSlope, t.price)).toBe(t.expected);
    });
  });
});

describe('getPurchaseRateFromDemand', () => {
  it('returns correct rate', () => {
    expect(getPurchaseRateFromDemand(10.0)).toBe(1.0);
  });
});

describe('getPurchaseRateFromDemand', () => {
  it('returns correct rate', () => {
    expect(getPurchaseRateFromDemand(10.0)).toBe(1.0);
  });
});
