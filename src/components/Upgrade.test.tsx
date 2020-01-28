import { shallow } from 'enzyme';
import React from 'react';
import Upgrade, { UpgradeProps } from './Upgrade';

describe('<Upgrade />', () => {
  let upgrade: any;

  beforeEach(() => {
    const props: UpgradeProps = {
      id: 'upgrade-ppc-2x',
      name: '2x PPC',
      cost: 100,
      currency: '£',
      onBuyClick: () => {}, // tslint:disable-line no-empty
    };
    upgrade = shallow(<Upgrade {...props} />);
  });

  it('renders', () => {
    expect(upgrade).toMatchSnapshot();
  });

  it('shows paper per click boost upgrade name and cost', () => {
      expect(upgrade.text()).toContain('2x PPC');
    expect(upgrade.text()).toContain('£100');
  });
});
