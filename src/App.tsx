import React, { useReducer } from 'react';

import 'spectre.css';
import './App.scss';

import combineReducers from 'react-combine-reducers';
import Game, { GameConfig, GameState } from './Game';
import demandReducer from './reducers/demand';
import fundsReducer from './reducers/funds';
import resourcesReducer from './reducers/resources';
import upgradesReducer from './reducers/upgrades'

export type AppConfig = GameConfig;

interface AppProps {
  config: AppConfig;
  initialState: GameState;
}

const App: React.FC<AppProps> = (props: AppProps) => {
  const { initialState } = props;
  const [ rootReducer, rootState ] = combineReducers({
    funds: [ fundsReducer, initialState.funds ],
    resources: [ resourcesReducer, initialState.resources ],
    demand: [ demandReducer, initialState.demand ],
    upgrades: [ upgradesReducer, initialState.upgrades ],
  });
  const [ state, dispatch ]: any[] = useReducer(rootReducer, rootState);

  return (
    <div className="App">
      <Game
        gameState={state}
        config={props.config}
        dispatch={dispatch}
      />
    </div>
  );
}

const createApp = (
  initialState: GameState,
  config: AppConfig = { currency: '£', baseGameCycleDurationMs: 1000, paperPriceChangeStep: .01 },
) => {
  const appProps: AppProps = {
    initialState,
    config,
  };
  return (<App {...appProps} />);
}

export default createApp;
