import { GameState, Resources } from '../../App';
import { Resource } from '../../models/resource';

export const getMockGameState = (overrides: any = {}): GameState => ({
  funds: 100 || overrides.funds,
  resources: getMockResources(overrides.resources),
});

export const getMockResources = (overrides: any = {}): Resources => ({
  paper: getMockPaperResource(),
  pulp: getMockPulpResource(),
  ...overrides,
});

export const getMockPaperResource = (overrides: any = {}): Resource =>({
  name: 'Paper',
  quantity: 0,
  price: 1,
  purchaseRate: 1,
  ...overrides,
});

export const getMockPulpResource = (overrides: any = {}): Resource =>({
  name: 'Pulp',
  quantity: 10,
  price: 10,
  purchaseRate: 1,
  ...overrides,
});
