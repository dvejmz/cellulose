import * as Actions from '../actions';
import { Upgrades } from '../game/upgrades';
import { RootReducerAction } from '../reducers';

const upgradesReducer = (currentUpgrades: Upgrades, action: RootReducerAction): Upgrades => {
  switch (action.type) {
    case Actions.RESOURCES_MAKE_PAPER:
      return {
        ...currentUpgrades,
        totalPaper: currentUpgrades.totalPaper + (1 * action.data.multiplier),
      };
    case Actions.UPGRADES_BUY:
      const updatedUpgrades = [...currentUpgrades.upgrades];
      const upgradeIndex = updatedUpgrades.findIndex(u => u.id === action.data.id);
      if (upgradeIndex !== -1) {
        updatedUpgrades[upgradeIndex].enabled = true;
      }

      return {
        ...currentUpgrades,
        upgrades: updatedUpgrades,
      };
    default:
      return currentUpgrades;
  }
};

export default upgradesReducer;
