import { Upgrade } from '../App';

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
