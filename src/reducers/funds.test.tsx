import { getMockGameState, getMockPaperResource } from '../utils/test/mocks';
import { GameState } from '../App';
import * as Actions from '../actions';
import fundsReducer from '../reducers/funds';

describe('ResourcesReducer', () => {
  let initialState: GameState;
  let reducedState: number;

  describe(Actions.RESOURCES_SELL_PAPER, () => {
    describe('when there is paper to sell', () => {
      beforeEach(() => {
        initialState = getMockGameState({
          resources: {
            paper: getMockPaperResource({ quantity: 10 })
          }
        });
        reducedState = fundsReducer(
          initialState.funds,
          {
            type: Actions.RESOURCES_SELL_PAPER,
            data: { paper: { ...initialState.resources.paper } },
        });
      });

      it('should increase funds by paper price if there is paper', () => (
        expect(reducedState).toBe(101)
      ));
    });

    describe('when there is no paper to sell', () => {
      beforeEach(() => {
        initialState = getMockGameState();
        reducedState = fundsReducer(
          initialState.funds,
          {
            type: Actions.RESOURCES_SELL_PAPER,
            data: { paper: { ...initialState.resources.paper } },
        });
      });

      it('should not increase funds', () => (
        expect(reducedState).toBe(100)
      ));
    });
  });
});
