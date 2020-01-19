import { shallow } from 'enzyme';
import React from 'react';
import PurchasableResource from './PurchasableResource';

describe('<PurchasableResource />', () => {
  let purchasableResource: any;

  beforeEach(() => {
    purchasableResource = shallow(
      <PurchasableResource 
        name="Pulp"
        classNameId="pulp"
        value={9001}
        onBuyClick={() => {}} // tslint:disable-line no-empty
      />);
  });

  it('renders ok', () => (
    expect(purchasableResource.find('.resources__pulp-buy-button').text()).toBe('Buy')
  ));
});
