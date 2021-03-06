import { getMockUpgrade } from '../utils/test/mocks';
import { Upgrade } from './upgrades';
import { getActivePpcMultiplier, getUnlockableUpgrades, getUpgradeById } from './upgrades';

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

  it('should return an upgrade given its ID', () => {
    const expected: Upgrade = {
      id: 'upgrade-ppc-4x',
      previousId: null,
      name: 'PPC 4x',
      cost: 100,
      unlockCost: 750,
      enabled: false,
    };
    upgrades.push(expected);
    const actual = getUpgradeById('upgrade-ppc-4x', upgrades);
    expect(actual).toEqual(expected);
  });

  describe('getUnlockableUpgrades', () => {
    it('should retrieve all inactive upgrades unlockable for an unlock cost', () => {
      const actual = getUnlockableUpgrades(750, upgrades);
      const expected: Upgrade[] = [
        getMockUpgrade({ enabled: false, unlockCost: 500 }),
        getMockUpgrade({ enabled: false, unlockCost: 750 }),
      ];
      expect(actual).toEqual(expected);
    });

    it('should return all upgrades with met dependencies and in unlockable state', () => {
      upgrades = [
        getMockUpgrade({ id: 'upgrade-ppc-2x', enabled: true, unlockCost: 100 }),
        getMockUpgrade({ id: 'upgrade-ppc-4x', previousId: 'upgrade-ppc-2x', enabled: false, unlockCost: 500 }),
        getMockUpgrade({ id: 'upgrade-ppc-8x', previousId: 'upgrade-ppc-4x', enabled: false, unlockCost: 600 }),
        getMockUpgrade({ id: 'upgrade-ppm-1x', enabled: false, unlockCost: 300 }),
        getMockUpgrade({ id: 'upgrade-ppm-2x', previousId: 'upgrade-ppm-1x', enabled: false, unlockCost: 700 }),
      ];
      const expected = [
        getMockUpgrade({ id: 'upgrade-ppc-4x', previousId: 'upgrade-ppc-2x', enabled: false, unlockCost: 500 }),
        getMockUpgrade({ id: 'upgrade-ppm-1x', enabled: false, unlockCost: 300 }),
      ];
      const actual = getUnlockableUpgrades(750, upgrades);
      expect(actual).toEqual(expected);
    });
  });
});

describe('getActivePpcMultiplier', () => {
  const tests = [
    {
      upgrades: [
        getMockUpgrade({ id: 'upgrade-ppc-2x', cost: 100, enabled: true }),
      ],
      expected: 2,
    },
    {
      upgrades: [
        getMockUpgrade({ id: 'upgrade-ppc-2x', cost: 100, enabled: false }),
      ],
      expected: 1,
    },
    {
      upgrades: [
        getMockUpgrade({ id: 'upgrade-ppc-2x', cost: 100, enabled: true }),
        getMockUpgrade({ id: 'upgrade-ppc-4x', cost: 200, enabled: true }),
        getMockUpgrade({ id: 'upgrade-ppc-8x', cost: 300, enabled: true }),
      ],
      expected: 8,
    },
    {
      upgrades: [
        getMockUpgrade({ id: 'upgrade-ppc-2x', cost: 100, enabled: true }),
        getMockUpgrade({ id: 'upgrade-ppc-4x', cost: 200, enabled: true }),
        getMockUpgrade({ id: 'upgrade-ppc-8x', cost: 300, enabled: false }),
      ],
      expected: 4,
    },
    {
      upgrades: [
        getMockUpgrade({ id: 'wrong-id-ppc-2x', cost: 100 }),
        getMockUpgrade({ id: 'wrong-id-upgrade-ppc-2x', cost: 200 }),
        getMockUpgrade({ id: 'wrong-upgrade-ppc-2x', cost: 300 }),
      ],
      expected: 1,
    },
    {
      upgrades: [],
      expected: 1,
    },
  ];
  tests.forEach(t => {
    it('returns highest active multiplier', () => {
      const actual = getActivePpcMultiplier(t.upgrades);
      expect(actual).toEqual(t.expected)
    })
  });
});

