import * as Actions from '../actions';
import { Resources } from '../App';
import resourcesReducer from '../reducers/resources';
import { getMockResources } from '../utils/test/mocks';

describe('ResourcesReducer', () => {
  let initialState: Resources;
  let reducedState: Resources;

  describe(Actions.RESOURCES_SELL_PAPER, () => {
    beforeEach(() => {
      initialState = getMockResources({ paper: { quantity: 10 }});
      reducedState = resourcesReducer(
        initialState,
        {
          type: Actions.RESOURCES_SELL_PAPER,
          data:
          {
            paper: { ...initialState.paper },
          }
      });
    });

    it('should decrease paper quantity by sale rate amount', () => (
      expect(reducedState.paper.quantity).toBe(9)
    ));
  });

  describe(Actions.RESOURCES_BUY_PULP, () => {
    beforeEach(() => {
      initialState = getMockResources({ paper: { quantity: 10 }});
      reducedState = resourcesReducer(
        initialState,
        {
          type: Actions.RESOURCES_SELL_PAPER,
          data:
          {
            paper: { ...initialState.paper },
          }
      });
    });

    it('should decrease paper quantity by sale rate amount', () => (
      expect(reducedState.paper.quantity).toBe(9)
    ));
  });

  describe(Actions.DEMAND_UPDATE, () => {
    beforeEach(() => {
      initialState = getMockResources({ paper: { quantity: 10 }});
      reducedState = resourcesReducer(
        initialState,
        {
          type: Actions.DEMAND_UPDATE,
          data:
          {
            newDemandPct: 45.0,
          }
      });
    });

    it('should update paper purchase rate to new rate', () => {
      expect(reducedState.paper.purchaseRate).toBe(4.5);
    });
  });
});
