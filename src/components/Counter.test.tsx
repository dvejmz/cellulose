import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';
import Counter from './Counter';

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

  it('renders ok', () => {
    expect(counter.exists()).toBeTruthy();
  });

  it('shows counter name', () => {
    expect(counter.find('.counter__name').text()).toBe('Total Paper')
  });

  it('shows counter quantity', () => {
    expect(counter.find('.counter__value').text()).toBe('9001');
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

  it('shows counter unit', () => {
    expect(counter.find('.counter__unit').text()).toBe('sheets')
  });
});
