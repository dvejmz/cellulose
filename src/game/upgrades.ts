export interface Upgrade {
  id: string;
  previousId: string | null;
  name: string;
  cost: number;
  unlockCost: number;
  enabled: boolean;
};

export interface Upgrades {
  totalPaper: number;
  upgrades: Upgrade[];
};

export const UPGRADE_UNLOCK_TIER_1 = 100;

export const UPGRADE_ID_PPC_2X = 'upgrade-ppc-2x';
export const UPGRADE_ID_PPC_4X = 'upgrade-ppc-4x';
export const UPGRADE_ID_PPC_8X = 'upgrade-ppc-8x';
export const UPGRADE_ID_PPC_16X = 'upgrade-ppc-16x';

export const UPGRADE_ID_PAPERMAKER_1X = 'upgrade-papermaker-1x';

export const getUpgradeById = (id: string, upgrades: Upgrade[]): (Upgrade | undefined) => (
  [ ...upgrades ].find(u => u.id === id)
);

export const getInactiveUpgrades = (upgrades: Upgrade[]): Upgrade[] => (
  [ ...upgrades ].filter(u => !u.enabled)
);

const getActiveUpgrades = (upgrades: Upgrade[]) =>
  upgrades.filter(u => u.enabled).sort((lhs, rhs) => rhs.cost - lhs.cost);

// just fetch a list of everything under < UC which is not enabled and then make a reverse linked list with references
// to the previous, active upgrade for a possibly unlockable upgrade
export const getUnlockableUpgrades = (paperQty: number, upgrades: Upgrade[]): Upgrade[]  => {
  const activeUpgrades = getActiveUpgrades(upgrades);
  const inactiveUpgrades = getInactiveUpgrades(upgrades).filter(u => u.unlockCost <= paperQty);
  return inactiveUpgrades
    .filter(
      iu => (iu.previousId === null
              || activeUpgrades.findIndex(au => au.id === iu.previousId)) !== -1);
};

export const getActivePpcMultiplier = (upgrades: Upgrade[]): number => {
  if (!upgrades.length) {
    return 1;
  }

  const activeUpgrades = getActiveUpgrades(upgrades);
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
    case UPGRADE_ID_PPC_16X:
      return 16;
    default:
      return 1;
  }
};
