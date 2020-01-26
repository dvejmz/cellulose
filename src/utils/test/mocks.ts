import { Demand, GameState, Resources, Upgrades } from '../../App';
import { Resource } from '../../models/resource';

export const getMockGameState = (overrides: any = {}): GameState => ({
  demand: getMockDemand(overrides.demand),
  funds: overrides.funds === undefined ? 100 : overrides.funds,
  resources: getMockResources(overrides.resources),
  upgrades: getMockUpgrades(overrides.upgrades),
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

export const getMockUpgrades = (overrides: any = {}): Upgrades => ({
  totalPaper: 0,
  upgrades: [
    {
      name: '2x PPC',
      cost: 100,
      unlockTier: 1,
      enabled: false,
    },
  ]
});
