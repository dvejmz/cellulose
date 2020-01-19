import * as Actions from '../actions';
import { RootReducerAction } from '../App';

const fundsReducer = (currentFunds: number, action: RootReducerAction): number => {
  switch (action.type) {
    case Actions.RESOURCES_BUY_PULP:
      const pulpPrice = action.data.pulp.price;
      return currentFunds >= pulpPrice
        ? currentFunds - pulpPrice
        : currentFunds;
    case Actions.RESOURCES_SELL_PAPER:
      return action.data.paper.quantity
        ? currentFunds + action.data.paper.price
        : currentFunds;
    default:
      return currentFunds;
  }
};

export default fundsReducer;
