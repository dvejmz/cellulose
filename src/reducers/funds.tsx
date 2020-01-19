import { RootReducerAction } from '../App';
import * as Actions from '../actions';

const fundsReducer = (currentFunds: number, action: RootReducerAction): number => {
  switch (action.type) {
    case Actions.RESOURCES_BUY_PULP:
      return currentFunds - action.data.pulp.price;
    case Actions.RESOURCES_SELL_PAPER:
      return action.data.paper.quantity
        ? currentFunds + action.data.paper.price
        : currentFunds;
    default:
      return currentFunds;
  }
};

export default fundsReducer;
