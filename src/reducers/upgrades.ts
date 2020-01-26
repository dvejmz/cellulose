import * as Actions from '../actions';
import { RootReducerAction, Upgrades } from '../App';

const upgradesReducer = (currentUpgrades: Upgrades, action: RootReducerAction): Upgrades => {
  switch (action.type) {
    case Actions.RESOURCES_MAKE_PAPER:
      return {
        ...currentUpgrades,
        totalPaper: currentUpgrades.totalPaper + 1,
      };
    default:
      return currentUpgrades;
  }
};

export default upgradesReducer;
