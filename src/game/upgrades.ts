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

export const getUpgradeById = (id: string, upgrades: Upgrade[]): (Upgrade | undefined) => (
  [ ...upgrades ].find(u => u.id === id)
);

export const getInactiveUpgrades = (upgrades: Upgrade[]): Upgrade[] => (
  [ ...upgrades ].filter(u => !u.enabled)
);

export const getUnlockableUpgrades = (paperQty: number, upgrades: Upgrade[]): Upgrade[]  => (
  getInactiveUpgrades(upgrades).filter(u => u.unlockCost <= paperQty)
);
