import { shallow } from 'enzyme';
import React from 'react';
import Funds from './Funds';

describe('<Funds />', () => {
  let funds: any;

  beforeEach(() => {
    funds = shallow(<Funds amount={100} currency={'£'} />);
  });

  it('shows amount', () => (
    expect(funds.find('.resources__funds-amount').text()).toEqual('100.00')
  ));

  it('shows currency', () => (
    expect(funds.find('.resources__funds-currency').text()).toEqual('£')
  ));

  it('shows currency rounded to 2 decimal places', () => {
    funds.setProps({ amount: 3.5000002324, currency: '£' });
    expect(funds.find('.resources__funds-amount').text()).toEqual('3.50')
  })
});
