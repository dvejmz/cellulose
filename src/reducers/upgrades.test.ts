import * as Actions from '../actions';
import { Upgrades } from '../game/upgrades';
import upgradesReducer from '../reducers/upgrades';
import { getMockUpgrades } from '../utils/test/mocks';

describe('UpgradesReducer', () => {
  let initialState: Upgrades;
  let reducedState: Upgrades;

  describe(Actions.RESOURCES_MAKE_PAPER, () => {
    beforeAll(() => {
      initialState = getMockUpgrades();
      reducedState = upgradesReducer(
        initialState,
        { type: Actions.RESOURCES_MAKE_PAPER, data: { multiplier: 1 } }
      );
    });

    it('should increase total paper produced by paper increase amount', () => {
      expect(reducedState.totalPaper).toBe(1);
    });
  });

  describe(Actions.UPGRADES_BUY, () => {
    beforeEach(() => {
      reducedState = upgradesReducer(
        initialState,
        { type: Actions.UPGRADES_BUY, data: { id: 'upgrade-ppc-2x' }}
      );
    });

    it('should enable bought upgrade', () => {
      expect(reducedState.upgrades[0].enabled).toBeTruthy();
    });
  });
});
