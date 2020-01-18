import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import createApp, { PlayerResources } from './App';
import * as serviceWorker from './serviceWorker';

const initialResources: PlayerResources = {
  paper: 0,
  pulp: 10,
};
ReactDOM.render(createApp(initialResources), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
