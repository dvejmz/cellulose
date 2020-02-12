import * as Actions from '../actions';
import { History } from '../game/history';
import historyReducer from '../reducers/history';
import { getMockHistory } from '../utils/test/mocks';

describe('HistoryReducer', () => {
  let initialState: History;
  let reducedState: History;

  describe(Actions.HISTORY_PAPER_PURCHASE_RATE, () => {
    beforeAll(() => {
      initialState = getMockHistory({ paper: { purchaseRate: [1, 2, 3] }});
      reducedState = historyReducer(
        initialState,
        { type: Actions.HISTORY_PAPER_PURCHASE_RATE, data: { purchaseRate: 2.5 } },
      );
    });

    it('should append new purchase rate to history', () => {
      expect(reducedState.paper.purchaseRate).toEqual([1, 2, 3, 2.5])
    });

    describe('when history has reached max capacity', () => {
      let purchaseRateHistory: number[];
      const range =
        (stop: number, start = 0, step = 1) =>
          Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));
      beforeAll(() => {
        initialState = getMockHistory({ paper: { purchaseRate: range(199) }});
        reducedState = historyReducer(
          initialState,
          { type: Actions.HISTORY_PAPER_PURCHASE_RATE, data: { purchaseRate: 2.5 } },
        );
        purchaseRateHistory = reducedState.paper.purchaseRate;
      });

      it('should discard the oldest rate in the history', () => {
        expect(purchaseRateHistory.length).toBe(200);
        expect(purchaseRateHistory[0]).toBe(1);
      });

      it('should append new purchase rate', () => {
        const lastElement = purchaseRateHistory[purchaseRateHistory.length - 1];
        expect(lastElement).toBe(2.5);
      });
    });
  });
});

