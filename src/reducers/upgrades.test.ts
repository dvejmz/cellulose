import * as Actions from '../actions';
import { Upgrades } from '../App';
import upgradesReducer from '../reducers/upgrades';
import { getMockUpgrades } from '../utils/test/mocks';

describe('UpgradesReducer', () => {
  let initialState: Upgrades;
  let reducedState: Upgrades;

  describe(Actions.RESOURCES_MAKE_PAPER, () => {
    beforeEach(() => {
      initialState = getMockUpgrades();
      reducedState = upgradesReducer(
        initialState,
        { type: Actions.RESOURCES_MAKE_PAPER }
      );
    });

    it('should increase total paper produced by paper increase amount', () => {
      expect(reducedState.totalPaper).toBe(1);
    });
  });
});
