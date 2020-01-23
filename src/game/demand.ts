export const getDemand = (
  highDemandPrice: number,
  highDemandQty: number,
  lowDemandPrice: number,
  lowDemandQty: number,
  currentPrice: number
): number => {
  const higherDemandParams = { price: highDemandPrice, demand: highDemandQty };
  const lowerDemandParams = { price: lowDemandPrice, demand: lowDemandQty };

  const slope = (higherDemandParams.demand - lowerDemandParams.demand) / (higherDemandParams.price - lowerDemandParams.price);
  const offset = -(slope * higherDemandParams.price) + higherDemandParams.demand;
  return Math.max(slope * currentPrice + offset, 0);
};

export const getPurchaseRateFromDemand = (prevDemand: number, newDemand: number, prevPrice: number, newPrice: number): number => {
  const changeInQtyPct = ((newDemand - prevDemand) / ((newDemand + prevDemand) / 2)) * 100;
  const changeInPricePct = ((newPrice - prevPrice) / ((newPrice + prevPrice) / 2)) * 100;
  const priceElasticityDemand = changeInQtyPct / changeInPricePct;
  return isNaN(priceElasticityDemand) || !isFinite(priceElasticityDemand) ? 0 : 1 / Math.abs(priceElasticityDemand);
};
