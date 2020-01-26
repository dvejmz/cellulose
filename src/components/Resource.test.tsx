import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';
import Resource from './Resource';

describe('<Resource />', () => {
  let resource: ShallowWrapper;

  beforeEach(() => {
    resource = shallow(
      <Resource
        name="Paper"
        id="paper"
        quantityUnit="sheets"
        quantity={9001}
        price={0}
        purchaseRate={1}
      />);
  });

  it('renders ok', () => {
    expect(resource.exists()).toBeTruthy();
  });
});
