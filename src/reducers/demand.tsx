import * as Actions from '../actions';
import { Demand, RootReducerAction } from '../App';
import { getDemand } from '../game/demand';

const demandReducer = (currentDemand: Demand, action: RootReducerAction): Demand => {
  switch(action.type) {
    case Actions.DEMAND_BUY_FACTOR_UPDATE: {
      return {
        ...currentDemand,
        demandPct: getDemand(action.data.newBuyFactor, currentDemand.demandSlope, currentDemand.price),
      }
    }
    case Actions.DEMAND_SLOPE_UPDATE: {
      return {
        ...currentDemand,
        demandPct: getDemand(currentDemand.buyFactor, action.data.newDemandSlope, currentDemand.price),
      };
    }
    case Actions.RESOURCES_PAPER_PRICE_UPDATE:
      console.log(action)
      const r = {
        ...currentDemand,
        demandPct: getDemand(currentDemand.buyFactor, currentDemand.demandSlope, action.data.newPrice),
      };
      console.log(r)
      return r;
    default:
      return currentDemand;
  }
};

export default demandReducer;
