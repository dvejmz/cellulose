import { shallow } from 'enzyme';
import React from 'react';
import Funds from './Funds';

describe('<Funds />', () => {
  let funds: any;

  beforeEach(() => {
    funds = shallow(<Funds amount={100} currency={'£'} />);
  });

  it('shows amount', () => (
    expect(funds.find('.funds__amount').text()).toEqual('100.00')
  ));

  it('shows currency', () => (
    expect(funds.find('.funds__currency').text()).toEqual('£')
  ));

  [
    { amount: 3.5000002324, expected: '3.50' },
    { amount: 0.277, expected: '0.27' },
    { amount: 0.99, expected: '0.99' },
    { amount: 0.40, expected: '0.40' },
    { amount: 0, expected: '0.00' },
    { amount: 1.678, expected: '1.67' },
    { amount: 2353653457.999901, expected: '2353653457.99' },
  ].forEach(t =>{
    it('shows currency rounded to 2 decimal places', () => {
      funds.setProps({ amount: t.amount, currency: '£' });
      expect(funds.find('.funds__amount').text()).toEqual(t.expected)
    })
  });
});
