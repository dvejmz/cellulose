import ReactDOM from 'react-dom';
import createApp from './App';
import { GameState } from './Game';
import './index.css';
import * as serviceWorker from './serviceWorker';

const initialPaperPrice = 0.1;
const initialState: GameState = {
  funds: 0,
  demand: {
    demandPct: 0,
    price: initialPaperPrice,
  },
  resources: {
    paper: {
      name: 'Unsold Paper',
      quantity: 0,
      quantityUnit: 'sheets',
      price: initialPaperPrice,
      purchaseRate: 0,
    },
    pulp: {
      name: 'Pulp',
      quantity: 1000,
      quantityUnit: 'kg',
      price: 10,
      purchaseRate: 1000,
    },
  },
  history: {
    paper: { purchaseRate: [] },
    funds: [],
  },
  upgrades: {
    totalPaper: 0,
    upgrades: [
      {
        id: 'upgrade-ppc-2x',
        previousId: null,
        name: '2x PPC',
        cost: 5,
        unlockCost: 100,
        enabled: false,
      },
      {
        id: 'upgrade-ppc-4x',
        previousId: 'upgrade-ppc-2x',
        name: '4x PPC',
        cost: 10,
        unlockCost: 300,
        enabled: false,
      },
      {
        id: 'upgrade-ppc-8x',
        previousId: 'upgrade-ppc-4x',
        name: '8x PPC',
        cost: 20,
        unlockCost: 800,
        enabled: false,
      },
      {
        id: 'upgrade-ppc-16x',
        previousId: 'upgrade-ppc-8x',
        name: '16x PPC',
        cost: 30,
        unlockCost: 1200,
        enabled: false,
      },
      {
        id: 'upgrade-papermaker-1x',
        previousId: null,
        name: 'PaperMaker',
        cost: 2.5,
        unlockCost: 500,
        enabled: false,
      },
    ],
  },
};
ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
  .render(createApp(
    initialState,
    { 
      currency: '£',
      baseGameCycleDurationMs: 1000,
      paperPriceChangeStep: .01,
    }
  ));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
