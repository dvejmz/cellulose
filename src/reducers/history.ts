import * as Actions from '../actions';
import { RootReducerAction } from '../reducers';
import { History } from '../game/history';

const historyReducer = (currentHistory: History, action: RootReducerAction): History => {
  switch(action.type) {
    case Actions.HISTORY_PAPER_PURCHASE_RATE:
      const newPurchaseRate = action.data.purchaseRate;
      return {
        ...currentHistory,
        paper: {
          ...currentHistory.paper,
          purchaseRate: [ ...currentHistory.paper.purchaseRate, newPurchaseRate ]
        },
      };
    default:
      return currentHistory;
  }
};

export default historyReducer;
