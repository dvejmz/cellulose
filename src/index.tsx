import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import createApp, { GameState } from './App';
import * as serviceWorker from './serviceWorker';

const initialState: GameState = {
  funds: 100,
  resources: {
    paper: 0,
    pulp: 10,
  },
  purchaseRates: {
    pulp: 1,
  },
  resourcePrices: {
    pulp: 10,
  },
};
ReactDOM.render(createApp(initialState), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
