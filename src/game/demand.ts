export const getDemand = (
  buyFactor: number,
  demandSlope: number,
  price: number
): number => (
  Math.max(buyFactor - (demandSlope * price), 0)
);

export const getPurchaseRateFromDemand = (demand: number): number => (
  demand / 10.0
);
