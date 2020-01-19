import ReactDOM from 'react-dom';
import createApp, { GameState } from './App';
import './index.css';
import * as serviceWorker from './serviceWorker';

const initialState: GameState = {
  funds: 0,
  resources: {
    paper: {
      name: 'Paper',
      quantity: 0,
      price: .02,
      purchaseRate: 1,
    },
    pulp: {
      name: 'Pulp',
      quantity: 1000,
      price: 10,
      purchaseRate: 1000,
    },
  },
};
ReactDOM.render(createApp(initialState), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
