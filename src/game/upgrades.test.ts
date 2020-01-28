import { getMockUpgrade } from '../utils/test/mocks';
import { Upgrade } from './upgrades';
import { getUnlockableUpgrades, getUpgradeById } from './upgrades';

describe('Upgrades', () => {
  let upgrades: Upgrade[];
  beforeEach(() => {
    upgrades = [
      getMockUpgrade({ enabled: true, unlockCost: 100 }),
      getMockUpgrade({ enabled: false, unlockCost: 500 }),
      getMockUpgrade({ enabled: false, unlockCost: 750 }),
      getMockUpgrade({ enabled: false, unlockCost: 1000 }),
    ];
  });

  it('should retrieve all inactive upgrades unlockable for an unlock cost', () => {
    const actual = getUnlockableUpgrades(750, upgrades);
    const expected: Upgrade[] = [
      getMockUpgrade({ enabled: false, unlockCost: 500 }),
      getMockUpgrade({ enabled: false, unlockCost: 750 }),
    ];
    expect(actual).toEqual(expected);
  });

  it('should return an upgrade given its ID', () => {
    const expected: Upgrade = {
      id: 'upgrade-ppc-4x',
      name: 'PPC 4x',
      cost: 100,
      unlockCost: 750,
      enabled: false,
    };
    upgrades.push(expected);
    const actual = getUpgradeById('upgrade-ppc-4x', upgrades);
    expect(actual).toEqual(expected);
  });
});
