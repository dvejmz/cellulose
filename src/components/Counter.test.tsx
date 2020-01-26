import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';
import Counter, { QuantityUnitAlignment } from './Counter';

describe('<Counter />', () => {
  let counter: ShallowWrapper;

  beforeEach(() => {
    counter = shallow(
      <Counter
        id="total-paper"
        name="Total Paper"
        quantityUnit="sheets"
        quantity={9001}
      />);
  });

  it('renders', () => {
    expect(counter.exists()).toBeTruthy();
  });

  it('shows counter correctly', () => {
    expect(counter.text()).toBe('Total Paper: 9001 sheets')
  });

  it('shows counter quantity as a truncated decimal if decimal option is enabled', () => {
    counter = shallow(
      <Counter
        name="Paper"
        id="total-paper"
        quantityUnit="sheets"
        quantity={9001}
        showDecimals
      />);
    expect(counter.find('.counter__value').text()).toBe('9001.00');
  });

  it('shows counter unit to the left of the amount if it is so specified', () => {
    counter = shallow(
      <Counter
        name="Price"
        id="price"
        quantityUnit="£"
        quantity={9001}
        showDecimals
        quantityUnitAlignment={QuantityUnitAlignment.Left}
      />);
      expect(counter.text()).toContain('Price: £9001.00');
  });

  it('shows counter unit', () => {
    expect(counter.find('.counter__unit').text()).toBe('sheets')
  });
});
