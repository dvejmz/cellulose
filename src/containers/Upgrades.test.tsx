import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import Upgrade from '../components/Upgrade';
import { UpgradeType } from '../game/upgrades';
import { getMockUpgrade } from '../utils/test/mocks';
import Upgrades from './Upgrades';

describe('<Upgrades />', () => {
  let wrapper: ReactWrapper;
  let upgrades: UpgradeType[];

  beforeEach(() => {
    upgrades = [
      getMockUpgrade({ id: 'upgrade-ppc-2x', unlockCost: 10 }),
      getMockUpgrade({ id: 'upgrade-ppc-4x', name: '4x PPC', unlockCost: 50 }),
      getMockUpgrade({ id: 'upgrade-ppc-4x', name: '8x PPC', unlockCost: 50, enabled: true }),
      getMockUpgrade({ id: 'upgrade-ppc-16x', name: '16x PPC', unlockCost: 110 }),
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

  it('only shows inactive upgrades with a paper cost less or equal than current paper', () => {
    const actualUpgrades = wrapper.find(Upgrade);
    expect(actualUpgrades).toHaveLength(2);
    expect(actualUpgrades.at(0).text()).toContain('2x PPC');
    expect(actualUpgrades.at(1).text()).toContain('4x PPC');
  });
});
