import * as Actions from '../actions';
import { Resources } from '../App';
import resourcesReducer from '../reducers/resources';
import { getMockResources } from '../utils/test/mocks';

describe('ResourcesReducer', () => {
  let initialState: Resources;
  let reducedState: Resources;

  describe(Actions.RESOURCES_SELL_PAPER, () => {
    beforeEach(() => {
      initialState = getMockResources({ paper: { quantity: 10, purchaseRate: 3 }});
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
      expect(reducedState.paper.quantity).toBe(7)
    ));

    [
      { quantity: 10, purchaseRate: 12, expected: 0 },
      { quantity: 0, purchaseRate: 12, expected: 0 },
      { quantity: 2, purchaseRate: 2, expected: 0 },
    ].forEach(t => {
        it('should not decrease paper quantity below zero', () => {
        initialState = getMockResources({ paper: { quantity: t.quantity, purchaseRate: t.purchaseRate }});
        reducedState = resourcesReducer(
          initialState,
          {
            type: Actions.RESOURCES_SELL_PAPER,
            data:
            {
              paper: { ...initialState.paper },
            }
        });
        expect(reducedState.paper.quantity).toBe(t.expected);
      });
    });
  });

  describe(Actions.RESOURCES_BUY_PULP, () => {
    beforeEach(() => {
      initialState = getMockResources();
      reducedState = resourcesReducer(
        initialState,
        {
          type: Actions.RESOURCES_BUY_PULP,
          data:
          {
            pulp: { ...initialState.pulp },
          }
      });
    });

    it('should increase pulp quantity by purchase rate amount', () => (
      expect(reducedState.pulp.quantity).toBe(11)
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

  describe(Actions.RESOURCES_PAPER_PRICE_INCREASE, () => {
    beforeEach(() => {
      initialState = getMockResources();
      reducedState = resourcesReducer(
        initialState,
        {
          type: Actions.RESOURCES_PAPER_PRICE_INCREASE,
          data: { dispatch: jest.fn(), step: .05 },
      });
    });

    it('should increase paper price', () => {
      expect(reducedState.paper.price).toBe(1.05);
    });
  });

  describe(Actions.RESOURCES_PAPER_PRICE_DECREASE, () => {
    beforeEach(() => {
      initialState = getMockResources();
      reducedState = resourcesReducer(
        initialState,
        {
          type: Actions.RESOURCES_PAPER_PRICE_DECREASE,
          data: { dispatch: jest.fn(), step: .05 },
      });
    });

    it('should increase paper price', () => {
      expect(reducedState.paper.price).toBe(0.95);
    });

    describe('and paper price is less than decrease step', () => {
    beforeEach(() => {
      initialState = getMockResources({ paper: { price: .01 }});
      reducedState = resourcesReducer(
        initialState,
        {
          type: Actions.RESOURCES_PAPER_PRICE_DECREASE,
          data: { dispatch: jest.fn(), step: .05 },
        });
      });

      it('should not decrease paper price', () => {
        expect(reducedState.paper.price).toBe(.01);
      });
    });
  });
});
