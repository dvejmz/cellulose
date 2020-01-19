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
    expect(purchasableResource.exists()).toBeTruthy()
  ));

  it('shows buy text', () => (
    expect(purchasableResource.find('.resource__buy-button').text()).toContain('Buy')
  ));

  it('shows resource price', () => (
    expect(purchasableResource.find('.resource__buy-price').text()).toContain('(£10)')
  ));
});
