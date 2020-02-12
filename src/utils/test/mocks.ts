import { GameState } from '../../Game';
import { Demand } from '../../game/demand';
import { History } from '../../game/history';
import { Resource, Resources } from '../../game/resources';
import { Upgrade, Upgrades } from '../../game/upgrades';

export const getMockGameState = (overrides: any = {}): GameState => ({
  demand: getMockDemand(overrides.demand),
  funds: overrides.funds === undefined ? 100 : overrides.funds,
  resources: getMockResources(overrides.resources),
  upgrades: getMockUpgrades(overrides.upgrades),
  history: getMockHistory(overrides.history),
});

export const getMockDemand = (overrides: any = {}): Demand => ({
  demandPct: 40.0,
  demandSlope: -10/12,
  buyFactor: 2.0,
  price: 0.2,
  ...overrides,
});

export const getMockResources = (overrides: any = {}): Resources => ({
  paper: getMockPaperResource(),
  pulp: getMockPulpResource(),
  ...overrides,
});

export const getMockPaperResource = (overrides: any = {}): Resource => ({
  name: 'Paper',
  quantity: 0,
  price: 1,
  purchaseRate: 1,
  ...overrides,
});

export const getMockPulpResource = (overrides: any = {}): Resource => ({
  name: 'Pulp',
  quantity: 10,
  price: 10,
  purchaseRate: 1,
  ...overrides,
});

export const getMockUpgrade = (overrides: any = {}): Upgrade => ({
  id: 'upgrade-ppc-2x',
  previousId: null,
  name: '2x PPC',
  cost: 100,
  unlockCost: 10,
  enabled: false,
  ...overrides,
});

export const getMockUpgrades = (overrides: any = {}): Upgrades => ({
  totalPaper: 0,
  upgrades: [
    getMockUpgrade({ id: 'upgrade-ppc-2x' }),
    getMockUpgrade({ id: 'upgrade-ppc-4x' }),
    getMockUpgrade({ id: 'upgrade-ppc-8x' }),
  ],
  ...overrides,
});

export const getMockHistory = (overrides: any = {}): History => ({
  funds: [],
  paper: {
    purchaseRate: [],
  },
});
