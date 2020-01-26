import { shallow } from 'enzyme';
import React from 'react';
import Upgrade, { UpgradeProps } from './Upgrade';

describe('<Upgrade />', () => {
  let upgrade: any;

  beforeEach(() => {
    const props: UpgradeProps = {
      name: '2x PPC',
      cost: 100,
      currency: '£',
    };
    upgrade = shallow(<Upgrade {...props} />);
  });

  it('should render', () => {
    expect(upgrade.exists()).toBeTruthy();
  });

  it('shows paper per click boost upgrade name and cost', () => {
      expect(upgrade.text()).toContain('2x PPC');
    expect(upgrade.text()).toContain('£100');
  });
});
