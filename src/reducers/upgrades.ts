import * as Actions from '../actions';
import { RootReducerAction, Upgrades } from '../App';
import { getUpgradeById } from '../game/upgrades';

const upgradesReducer = (currentUpgrades: Upgrades, action: RootReducerAction): Upgrades => {
  switch (action.type) {
    case Actions.RESOURCES_MAKE_PAPER:
      return {
        ...currentUpgrades,
        totalPaper: currentUpgrades.totalPaper + 1,
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
