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
        currency="£"
        quantityUnit="kg"
        price={10}
        onBuyClick={() => {}} // tslint:disable-line no-empty
      />);
  });

  it('renders ok', () => (
    expect(purchasableResource.find('.resources__buy-button-text').text()).toBe('Buy')
  ));

  it('shows purchase price', () => (
    expect(purchasableResource.find('.resources__pulp-price').text()).toBe('(£10)')
  ));
});
