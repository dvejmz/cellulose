import { shallow } from 'enzyme';
import React from 'react';
import PurchasableResource from './PurchasableResource';

describe('<PurchasableResource />', () => {
  let purchasableResource: any;

  beforeEach(() => {
    purchasableResource = shallow(
      <PurchasableResource 
        name="Pulp"
        id="pulp"
        quantity={9001}
        quantityUnit="kg"
        purchaseRate={1}
        currency="£"
        price={10}
        onBuyClick={() => {}} // tslint:disable-line no-empty
      />);
  });

  it('renders ok', () => (
    expect(purchasableResource).toMatchSnapshot()
  ));

  it('shows buy text', () => (
    expect(purchasableResource.find('.resource-purchasable__buy-button').text()).toContain('Buy')
  ));

  it('shows resource price', () => (
    expect(purchasableResource.find('.resource-purchasable__buy-price').text()).toContain('(£10)')
  ));
});
