import React from 'react';
import createApp, { GameState } from './App';
import { mount, ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';
import MakePaperButton from './components/MakePaperButton';
import Funds from './components/Funds';

describe('App', () => {
  let wrapper: ReactWrapper;
  let initialState: GameState;

  beforeEach(() => {
    initialState = {
      funds: 100,
      resources: {
        paper: 0,
        pulp: 10,
      },
      purchaseRates: {
        pulp: 1,
      },
      resourcePrices: {
        pulp: 10,
      }
    };

    wrapper = mount(createApp(initialState));
  });

  it('should show make paper button', () => (
    expect(wrapper.exists(MakePaperButton)).toBeTruthy()
  ));

  it('should show initial paper resource value', () => (
    expect(findResourceValue(wrapper, 'paper')).toEqual('0')
  ));

  it('should show current paper counter', () => (
    expect(wrapper.exists('.resources__paper')).toBeTruthy()
  ));

  it('should show initial pulp resource value', () => (
    expect(findResourceValue(wrapper, 'pulp')).toEqual('10')
  ));

  it('should show current pulp counter', () => (
    expect(wrapper.exists('.resources__pulp')).toBeTruthy()
  ));

  it('should show current funds', () => (
    expect(wrapper.find(Funds).exists()).toBeTruthy()
  ));

  describe('when make paper button is clicked', () => {
      beforeEach(() => {
        act(() => {
          wrapper.find('.make-paper__button').simulate('click');
        });
      });

      it('should increase paper resource', () => (
        expect(findResourceValue(wrapper, 'paper')).toEqual('1')
      ));

      it('should decrease pulp resource', () => {
        expect(findResourceValue(wrapper, 'pulp')).toEqual('9')
      });

      describe('and there is no pulp left', () => {
        beforeEach(() => {
          const noPulpState = { ...initialState };
          noPulpState.resources.pulp = 0;
          wrapper = mount(createApp(noPulpState));
          act(() => {
            wrapper.find('.make-paper__button').simulate('click');
          });
        });

        it('does not increase paper counter', () => (
          expect(findResourceValue(wrapper, 'paper')).toEqual('0')
        ));

        it('does not decrease pulp counter', () => (
          expect(findResourceValue(wrapper, 'pulp')).toEqual('0')
        ));
      });
  });

  describe('when buy pulp button is clicked', () => {
    beforeEach(() => {
      act(() => {
        wrapper.find('.resources__pulp-buy-button').simulate('click');
      });
    });

    it('should increase pulp by current purchase rate', () => (
      expectResourceValue(wrapper, 'pulp', '11')
    ));

    it('should subtract current pulp price from funds', () => {
      expectFundsValue(wrapper, '90');
    });

    it('should not buy pulp if funds are insufficient', () => {
      const noFundsState = { ...initialState };
      noFundsState.funds = 0;
      wrapper = mount(createApp(noFundsState));
      act(() => {
        wrapper.find('.resources__pulp-buy-button').simulate('click');
      });

      expectResourceValue(wrapper, 'pulp', '10');
    });
  });
});

const expectResourceValue = (wrapper: ReactWrapper, resourceClassId: string, expectedValue: string): void => (
  expect(findResourceValue(wrapper, resourceClassId)).toEqual(expectedValue)
);

const expectFundsValue = (wrapper: ReactWrapper, expectedAmount: string): void => (
  expect(wrapper.find('.resources__funds-amount').text()).toEqual(expectedAmount)
);

const findResourceValue = (wrapper: ReactWrapper, resourceClassId: string): string | number => (
  wrapper.find(`.resources__${resourceClassId}-value`).text()
);
