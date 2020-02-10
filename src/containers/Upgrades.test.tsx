import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import Upgrade from '../components/Upgrade';
import { Upgrade as UpgradeType } from '../game/upgrades';
import { getMockUpgrade } from '../utils/test/mocks';
import Upgrades from './Upgrades';

describe('<Upgrades />', () => {
  let wrapper: ReactWrapper;
  let upgrades: UpgradeType[];

  beforeEach(() => {
    upgrades = [
      getMockUpgrade({ id: 'upgrade-ppc-2x', unlockCost: 10, enabled: true }),
      getMockUpgrade({ id: 'upgrade-ppc-4x', previousId: 'upgrade-ppc-2x', name: '4x PPC', unlockCost: 50, enabled: true }),
      getMockUpgrade({ id: 'upgrade-ppc-8x', previousId: 'upgrade-ppc-4x', name: '8x PPC', unlockCost: 50 }),
      getMockUpgrade({ id: 'upgrade-ppc-16x', previousId: 'upgrade-ppc-8x', name: '16x PPC', unlockCost: 110 }),
    ];
    wrapper = mount(
      <Upgrades
      upgrades={upgrades}
      totalPaper={100}
      currency="£"
      onBuyClick={() => {}} // tslint:disable-line no-empty
      />);
  });
  
  it('renders', () => {
    expect(upgrades).toMatchSnapshot();
  });

  it('only shows inactive upgrades with a paper cost less or equal than current paper and with met upgrade prereqs', () => {
    const actualUpgrades = wrapper.find(Upgrade);
    expect(actualUpgrades).toHaveLength(1);
    expect(actualUpgrades.at(0).text()).toContain('8x PPC');
  });
});
