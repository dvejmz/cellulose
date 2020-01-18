import React from 'react';
import { shallow } from 'enzyme';
import PurchasableResource from './PurchasableResource';

describe('<PurchasableResource />', () => {
  let purchasableResource: any;

  beforeEach(() => {
    purchasableResource = shallow(
      <PurchasableResource 
        name="Pulp"
        classNameId="pulp"
        value={9001}
        onBuyClick={() => {}}
      />);
  });

  it('renders ok', () => (
    expect(purchasableResource.find('.resources__pulp-buy-button').text()).toBe('Buy')
  ));
});
