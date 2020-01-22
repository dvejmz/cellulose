import { getDemand, getPurchaseRateFromDemand } from './demand';

describe('getDemand', () => {
  it('returns correct demand', () => {
    const buyFactor = 6;
    const demandSlope = -1/2;
    const price = .2;
    const expected = 6.1;

    expect(getDemand(buyFactor, demandSlope, price)).toBe(expected);
  });
});

describe('getPurchaseRateFromDemand', () => {
  it('returns correct rate', () => {
    expect(getPurchaseRateFromDemand(10.0)).toBe(1.0);
  });
});
