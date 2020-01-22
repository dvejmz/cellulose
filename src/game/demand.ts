export const getDemand = (
  buyFactor: number,
  demandSlope: number,
  price: number
): number => (
  buyFactor - (demandSlope * price)
);

export const getPurchaseRateFromDemand = (demand: number): number => (
  demand / 10.0
);
