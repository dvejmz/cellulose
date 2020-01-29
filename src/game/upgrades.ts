export interface Upgrade {
  id: string;
  name: string;
  cost: number;
  unlockCost: number;
  enabled: boolean;
};

export interface Upgrades {
  totalPaper: number;
  // TODO: currentTier?
  upgrades: Upgrade[];
};

export const UPGRADE_UNLOCK_TIER_1 = 100;

export const UPGRADE_ID_PPC_2X = 'upgrade-ppc-2x';
export const UPGRADE_ID_PPC_4X = 'upgrade-ppc-4x';
export const UPGRADE_ID_PPC_8X = 'upgrade-ppc-8x';

export const getUpgradeById = (id: string, upgrades: Upgrade[]): (Upgrade | undefined) => (
  [ ...upgrades ].find(u => u.id === id)
);

export const getInactiveUpgrades = (upgrades: Upgrade[]): Upgrade[] => (
  [ ...upgrades ].filter(u => !u.enabled)
);

export const getUnlockableUpgrades = (paperQty: number, upgrades: Upgrade[]): Upgrade[]  => (
  getInactiveUpgrades(upgrades).filter(u => u.unlockCost <= paperQty)
);

export const getActivePpcMultiplier = (upgrades: Upgrade[]): number => {
  if (!upgrades.length) {
    return 1;
  }

  const activeUpgrades = upgrades.filter(u => u.enabled).sort((lhs, rhs) => rhs.cost - lhs.cost)
  if (!activeUpgrades.length) {
    return 1;
  }

  const highestActiveUpgrade = activeUpgrades[0];
  switch (highestActiveUpgrade.id) {
    case UPGRADE_ID_PPC_2X:
      return 2;
    case UPGRADE_ID_PPC_4X:
      return 4;
    case UPGRADE_ID_PPC_8X:
      return 8;
    default:
      return 1;
  }
};
