import { mount, ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';
import createApp, { AppConfig, GameState } from './App';
import Funds from './components/Funds';
import MakePaperButton from './components/MakePaperButton';

describe('App', () => {
  let wrapper: ReactWrapper;
  let initialState: GameState;

  beforeEach(() => {
    const appConfig: AppConfig = {
      currency: '£',
      baseGameCycleDurationMs: 1000,
    };

    initialState = {
      funds: 100,
      demand: {
        demandPct: 40.0,
        buyFactor: 2.0,
        demandSlope: -10/12,
        price: 0.2,
      },
      resources: {
        paper: {
          name: 'Paper',
          quantity: 0,
          quantityUnit: 'sheets',
          price: 0.2,
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
    expect(findResourceValue(wrapper, 'resource-paper')).toEqual('0')
  ));

  it('should show current paper counter', () => (
    expect(getByTestId(wrapper, 'resource-paper').exists()).toBeTruthy()
  ));

  it('should show initial pulp resource value', () => (
    expect(findResourceValue(wrapper, 'resource-purchasable-pulp')).toEqual('10')
  ));

  it('should show current pulp counter', () => (
    expect(getByTestId(wrapper, 'resource-purchasable-pulp').exists()).toBeTruthy()
  ));

  it('should show current funds', () => (
    expect(wrapper.find(Funds).exists()).toBeTruthy()
  ));

  it('should show current demand', () => {
    expect(getByTestId(wrapper, 'demand').exists()).toBeTruthy();
  });

  it('should show current demand percentage', () => {
    expect(getByTestId(wrapper, 'demand').text()).toContain('40.00%');
  });

  it('should show paper price', () => {
    expect(getByTestId(wrapper, 'resource-paper-price').text()).toContain('£0.20');
  });

  it('should show price adjustment buttons', () => {
    const adjusters = getByTestId(wrapper, 'paper-price-adjusters');
    expect(adjusters.text()).toContain('+');
    expect(adjusters.text()).toContain('-');
  });

  describe('when make paper button is clicked', () => {
      beforeEach(() => {
        act(() => {
          wrapper.find('.make-paper__button').simulate('click');
        });
      });

      it('should increase paper resource', () => (
        expect(findResourceValue(wrapper, 'resource-paper')).toEqual('1')
      ));

      it('should decrease pulp resource', () => {
        expect(findResourceValue(wrapper, 'resource-purchasable-pulp')).toEqual('9')
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
          expect(findResourceValue(wrapper, 'resource-paper')).toEqual('0')
        ));

        it('does not decrease pulp counter', () => (
          expect(findResourceValue(wrapper, 'resource-purchasable-pulp')).toEqual('0')
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
      expect(getByTestId(wrapper, 'resource-paper-price').text()).toContain('£0.30');
    });
  });

  describe('when paper price decrease button is clicked', () => {
    beforeEach(() => {
      act(() => {
        getByTestId(wrapper, 'paper-price-dec-button').simulate('click');
      });
    });

    it('paper price should increase by set amount', () => {
      expect(getByTestId(wrapper, 'resource-paper-price').text()).toContain('£0.10');
    });
  });
});

const expectResourceValue = (wrapper: ReactWrapper, testId: string, expectedValue: string): void => (
  expect(findResourceValue(wrapper, testId)).toEqual(expectedValue)
);

const expectFundsValue = (wrapper: ReactWrapper, expectedAmount: string): void => (
  expect(getByTestId(wrapper, 'funds')
    .find('.funds__amount').text())
    .toEqual(expectedAmount)
);

const findResourceValue = (wrapper: ReactWrapper, testId: string): string | number => (
  getByTestId(wrapper, testId)
    .find(`.resource__value`).text()
);

const getByTestId = (wrapper: ReactWrapper, testId: string): ReactWrapper => (
  wrapper.find(`[data-test-id="${testId}"]`)
);
