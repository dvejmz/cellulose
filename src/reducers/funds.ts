import * as Actions from '../actions';
import { RootReducerAction } from '../reducers';

const fundsReducer = (currentFunds: number, action: RootReducerAction): number => {
  switch (action.type) {
    case Actions.RESOURCES_BUY_PULP:
      const pulpPrice = action.data.pulp.price;
      return currentFunds >= pulpPrice
        ? currentFunds - pulpPrice
        : currentFunds;
    case Actions.RESOURCES_SELL_PAPER:
      const purchaseRate = Math.min(action.data.paper.purchaseRate, action.data.paper.quantity)
      return action.data.paper.quantity
        ? currentFunds + (action.data.paper.price * purchaseRate)
        : currentFunds;
    case Actions.UPGRADES_BUY:
      const upgradePrice = action.data.cost;
      return currentFunds >= upgradePrice
        ? currentFunds - upgradePrice
        : currentFunds;
    default:
      return currentFunds;
  }
};

export default fundsReducer;
