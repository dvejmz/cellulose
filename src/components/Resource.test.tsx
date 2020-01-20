import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';
import Resource from './Resource';

describe('<Resource />', () => {
  let resource: ShallowWrapper;

  beforeEach(() => {
    resource = shallow(
      <Resource
        name="Paper"
        classNameId="paper"
        quantityUnit="sheets"
        quantity={9001}
        price={0}
        purchaseRate={1}
      />);
  });

  it('renders ok', () => {
    expect(resource.exists()).toBeTruthy();
  });

  it('shows resource name', () => {
    expect(resource.find('.resource__label').text()).toBe('Paper')
  });

  it('shows resource value', () => {
    expect(resource.find('.resource__value').text()).toBe('9001');
  });

  it('shows resource unit', () => {
    expect(resource.find('.resource__unit').text()).toBe('sheets')
  });
});
