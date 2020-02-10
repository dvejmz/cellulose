import { mount, ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';
import createApp, { AppConfig } from '../App';
import { GameState } from '../Game';
import * as Upgrades from '../game/upgrades';

import {
  expectFundsValue,
  expectResourceValue,
  getByTestId,
} from './utils';

describe('Upgrades', () => {
  let wrapper: ReactWrapper;
  let initialState: GameState;

  beforeEach(() => {
    const initialPaperPrice = 0.02;
    const appConfig: AppConfig = {
      currency: '£',
      baseGameCycleDurationMs: 1000,
      paperPriceChangeStep: .01,
    };

    initialState = {
      funds: 100,
      demand: {
        demandPct: 40.0,
        price: initialPaperPrice,
      },
      resources: {
        paper: {
          name: 'Paper',
          quantity: 0,
          quantityUnit: 'sheets',
          price: initialPaperPrice,
          purchaseRate: 0,
        },
        pulp: {
          name: 'Pulp',
          quantity: 10,
          quantityUnit: 'kg',
          price: 10,
          purchaseRate: 1,
        },
      },
      upgrades: {
        totalPaper: 0,
        upgrades: [
          {
            id: 'upgrade-ppc-2x',
            name: '2x PPC',
            cost: 100,
            unlockCost: 10,
            enabled: false,
            previousId: null,
          },
        ],
      }
    };

    wrapper = mount(createApp(initialState, appConfig));
  });

  describe('when total paper produced reaches 2x paper-per-click upgrade unlock cost', () => {
    let upgradeButton: any;

    beforeEach(() => {
      const state = { ...initialState };
      state.upgrades.totalPaper = Upgrades.UPGRADE_UNLOCK_TIER_1;
      wrapper = mount(createApp(state));
      upgradeButton = getByTestId(wrapper, 'upgrade-ppc-2x');
    });

    it('shows upgrade', () => {
      expect(upgradeButton).toHaveLength(1);
    });

    describe('and there are not enough funds to buy upgrade', () => {
      let state: GameState;

      beforeEach(() => {
        state = { ...initialState };
        state.upgrades.totalPaper = Upgrades.UPGRADE_UNLOCK_TIER_1;
        state.funds = 1.00;
        wrapper = mount(createApp(state));
        upgradeButton = getByTestId(wrapper, 'upgrade-ppc-2x');
      });

      describe('and upgrade is clicked', () => {
        beforeEach(() => {
          act(() => {
            upgradeButton
              .find('button')
              .simulate('click');
          });
        });

        // TODO: not working. Button shows regardless
        // it('should still show upgrade', () => {
        //  expect(upgradeButton).toHaveLength(1);
        // });
      });
    });

    describe('and there are enough funds to buy upgrade', () => {
      describe('and upgrade is clicked', () => {
        beforeEach(() => {
          act(() => {
            upgradeButton
              .find('button')
              .simulate('click');
          });
        });

        it('subtracts upgrade cost from funds', () => {
          expectFundsValue(wrapper, "0.00");
        });

        // TODO: this test won't pass
        // Might need storing unlockableUpgrades
        // as another full-fledged piece of data
        // But it's duplicate data???
        // it('removes upgrade button', () => {
        // expect(upgradeButton).toHaveLength(0);
        // });

        describe('and make paper button is clicked', () => {
          beforeEach(() => {
            act(() => {
              getByTestId(wrapper, 'make-paper-button')
                .find('button')
                .simulate('click')
            });
          });

          it('increases unsold paper counter by twice the amount', () => {
            expectResourceValue(wrapper, 'counter-paper', "2");
          });

          it('increases total paper counter by twice the amount', () => {
            expectResourceValue(wrapper, 'counter-total-paper', "102");
          });
        });
      });
    });
  });

  describe('when papermaker upgrade is active', () => {
    beforeEach(() => {
      jest.useFakeTimers();
      const state = { ...initialState };
      state.upgrades.upgrades = [
        {
          id: 'upgrade-papermaker-1x',
          name: 'PaperMaker',
          cost: 100,
          unlockCost: 10,
          enabled: true,
        },
      ]

      wrapper = mount(createApp(state));
    });

    it('should increase paper by increase amount after some time elapses', () => {
      act(() => {
        jest.runOnlyPendingTimers();
      });
      expectResourceValue(wrapper, 'counter-total-paper', '1');
    });
  });
});
