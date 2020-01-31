import * as Actions from '../actions';
import { Demand, getDemand } from '../game/demand';
import { RootReducerAction } from '../reducers';

const demandReducer = (currentDemand: Demand, action: RootReducerAction): Demand => {
  switch(action.type) {
    case Actions.RESOURCES_PAPER_PRICE_UPDATE:
      const prevDemandPct = currentDemand.demandPct;
      const prevPrice = currentDemand.price;
      const state = {
        ...currentDemand,
        demandPct: getDemand(
          // These values serve as the seed for the demand curve and price elasticity
          // functions used to calculate purchase rates
          0.05,     // high demand price
          70,       // high demand qty
          0.1,      // low demand price
          40,       // low demand qty
          action.data.newPrice
        ),
        price: action.data.newPrice,
      };
      action.data.dispatch({
        type: Actions.DEMAND_UPDATE,
        data: {
          prevDemandPct,
          newDemandPct: state.demandPct,
          prevPrice,
          newPrice: state.price,
          dispatch: action.data.dispatch,
        }});
      return state;
    default:
      return currentDemand;
  }
};

export default demandReducer;
