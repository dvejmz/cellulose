import { getMockUpgrade } from '../utils/test/mocks';
import { getDemand, getPurchaseRateFromDemand } from './demand';

describe('getDemand', () => {
  [
    { highDemandQty: 50, highDemandPrice: 0.05, lowDemandQty: 40, lowDemandPrice: 0.1, newPrice: 0.08, expected: 44 },
    // It should not return negative demand
  ].forEach(t => {
    it('returns correct demand', () => {
      expect(getDemand(
        t.highDemandPrice,
        t.highDemandQty,
        t.lowDemandPrice,
        t.lowDemandQty,
        t.newPrice
      )).toBe(t.expected);
    });
  });
});

describe('getPurchaseRateFromDemand', () => {
  it('returns correct rate', () => {
    expect(getPurchaseRateFromDemand(2800, 3000, 70, 60).toString()).toContain(2.23);
  });
});
