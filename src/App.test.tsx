import { mount, ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';
import createApp, { AppConfig } from './App';
import Funds from './components/Funds';
import MakePaperButton from './components/MakePaperButton';
import Upgrade from './components/Upgrade';
import { GameState } from './Game';

import {
  expectFundsValue,
  expectResourceValue,
  findCounterValue,
  getByTestId,
} from './integration/utils';

describe('App', () => {
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
            previousId: null,
            name: '2x PPC',
            cost: 100,
            unlockCost: 10,
            enabled: false,
          },
        ],
      }
    };

    wrapper = mount(createApp(initialState, appConfig));
  });

  it('should show make paper button', () => (
    expect(wrapper.exists(MakePaperButton)).toBeTruthy()
  ));

  it('should show make paper button by test id', () => {
    expect(getByTestId(wrapper, 'make-paper-button').exists()).toBeTruthy();
  });

  it('should show initial paper resource value', () => (
    expect(findCounterValue(wrapper, 'counter-paper')).toEqual('0')
  ));

  it('should show current paper counter', () => (
    expect(getByTestId(wrapper, 'counter-paper').exists()).toBeTruthy()
  ));

  it('should show initial pulp resource value', () => (
    expect(findCounterValue(wrapper, 'resource-purchasable-pulp')).toEqual('10')
  ));

  it('should show current pulp counter', () => (
    expect(getByTestId(wrapper, 'resource-purchasable-pulp').exists()).toBeTruthy()
  ));

  it('should show current funds', () => (
    expect(wrapper.find(Funds).exists()).toBeTruthy()
  ));

  it('should show current demand', () => {
    expect(getByTestId(wrapper, 'counter-demand').exists()).toBeTruthy();
  });

  it('should show current demand percentage', () => {
    expect(getByTestId(wrapper, 'counter-demand').text()).toContain('88.06 %');
  });

  it('should show paper price', () => {
    expect(getByTestId(wrapper, 'counter-paper-price').text()).toContain('£0.02');
  });

  it('should show price adjustment buttons', () => {
    const adjusters = getByTestId(wrapper, 'paper-price-adjusters');
    expect(adjusters.text()).toContain('+');
    expect(adjusters.text()).toContain('-');
  });

  it('should show total paper produced', () => {
    expect(getByTestId(wrapper, 'counter-total-paper').text()).toContain('0 sheets')
  });

  it('should not show any upgrades', () => {
    expect(wrapper.find(Upgrade)).toHaveLength(0);
  });

  describe('when make paper button is clicked', () => {
      beforeEach(() => {
        act(() => {
          wrapper.find('.make-paper__button').simulate('click');
        });
      });

      it('should increase paper resource', () => (
        expect(findCounterValue(wrapper, 'counter-paper')).toEqual('1')
      ));

      it('should decrease pulp resource', () => {
        expect(findCounterValue(wrapper, 'resource-purchasable-pulp')).toEqual('9')
      });

      describe('and there is no pulp left', () => {
        beforeEach(() => {
          const noPulpState = { ...initialState };
          noPulpState.resources.pulp.quantity = 0;
          wrapper = mount(createApp(noPulpState));
          act(() => {
            wrapper.find('.make-paper__button').simulate('click');
          });
        });

        it('does not increase paper counter', () => (
          expect(findCounterValue(wrapper, 'counter-paper')).toEqual('0')
        ));

        it('does not decrease pulp counter', () => (
          expect(findCounterValue(wrapper, 'resource-purchasable-pulp')).toEqual('0')
        ));
      });
  });

  describe('when buy pulp button is clicked', () => {
    beforeEach(() => {
      act(() => {
        getByTestId(wrapper, 'resource-purchasable-pulp')
          .find('.resource-purchasable__buy-button')
          .simulate('click');
      });
    });

    it('should increase pulp by current purchase rate', () => (
      expectResourceValue(wrapper, 'resource-purchasable-pulp', '11')
    ));

    it('should subtract current pulp price from funds', () => {
      expectFundsValue(wrapper, '90.00');
    });

    it('should not buy pulp if funds are insufficient', () => {
      const noFundsState = { ...initialState };
      noFundsState.funds = 0;
      wrapper = mount(createApp(noFundsState));
      act(() => {
        getByTestId(wrapper, 'resource-purchasable-pulp')
          .find('.resource-purchasable__buy-button')
          .simulate('click');
      });

      expectResourceValue(wrapper, 'resource-purchasable-pulp', '10');
    });
  });

  describe('when paper price increase button is clicked', () => {
    beforeEach(() => {
      act(() => {
        getByTestId(wrapper, 'paper-price-inc-button').simulate('click');
      });
    });

    it('paper price should increase by set amount', () => {
      expect(getByTestId(wrapper, 'counter-paper-price').text()).toContain('£0.03');
    });

    it('demand percentage decreases', () => {
      expect(getByTestId(wrapper, 'counter-demand').text()).toContain('82.00 %');
    });
  });

  describe('when paper price decrease button is clicked', () => {
    beforeEach(() => {
      act(() => {
        getByTestId(wrapper, 'paper-price-dec-button').simulate('click');
      });
    });

    it('paper price should decrease by set amount', () => {
      expect(getByTestId(wrapper, 'counter-paper-price').text()).toContain('£0.01');
    });

    it('demand percentage increases', () => {
      expect(getByTestId(wrapper, 'counter-demand').text()).toContain('94.00 %');
    });
  });
});
