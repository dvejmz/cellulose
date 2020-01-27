import ReactDOM from 'react-dom';
import createApp, { GameState } from './App';
import './index.css';
import * as serviceWorker from './serviceWorker';

const initialPaperPrice = 0.1;
const initialState: GameState = {
  funds: 100000,
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
  upgrades: {
    totalPaper: 0,
    upgrades: [
      {
        id: 'upgrade-ppc-2x',
        name: '2x PPC',
        cost: 5,
        unlockCost: 0,
        enabled: false,
      },
    ],
  },
};
ReactDOM.render(createApp(initialState), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
