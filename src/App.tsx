import React, { useEffect, useReducer } from 'react';

import 'spectre.css';
import './App.scss';

import combineReducers from 'react-combine-reducers';
import * as Actions from './actions';
import Funds from './components/Funds';
import MakePaperButton from './components/MakePaperButton';
import PurchasableResource from './components/PurchasableResource';
import PlayerResource from './components/Resource';
import { Resource } from './models/resource';
import fundsReducer from './reducers/funds';
import resourcesReducer from './reducers/resources';

export interface RootReducerAction {
  type: string;
  data?: any;
};

export interface Resources {
  paper: Resource;
  pulp: Resource;
}

export interface GameState {
  funds: number;
  resources: Resources;
}

export interface AppConfig {
  currency: string;
  baseGameCycleDurationMs: number;
}

interface AppProps {
  config: AppConfig;
  initialState: GameState;
}

const {
  RESOURCES_BUY_PULP,
  RESOURCES_SELL_PAPER,
  RESOURCES_MAKE_PAPER,
} = Actions;

const App: React.FC<AppProps> = (props: AppProps) => {
  const { initialState } = props;
  const [ rootReducer, rootState ] = combineReducers({
    funds: [ fundsReducer, initialState.funds ],
    resources: [ resourcesReducer, initialState.resources ],
  });
  const [ state, dispatch ]: any[] = useReducer(rootReducer, rootState);
  const { resources, funds } = state;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (resources.paper) {
        dispatch({
          type: RESOURCES_SELL_PAPER,
          data: { paper: { ...resources.paper } },
        });
      }
    }, props.config.baseGameCycleDurationMs);
    return () => clearTimeout(timer);
  });

  const handleMakePaperButtonClick = () => {
    if (resources.pulp.quantity) {
      dispatch({ type: RESOURCES_MAKE_PAPER });
    }
  };

  const handleBuyPulpClick = () => {
    if (funds >= resources.pulp.price) {
      dispatch({ type: RESOURCES_BUY_PULP, data: { pulp: resources.pulp }});
    }
  };

  return (
    <div className="App">
      <MakePaperButton onClick={handleMakePaperButtonClick} />
      <div className="resources">
        <Funds amount={funds} currency={props.config.currency} />
        <PlayerResource
          {...resources.paper}
          classNameId="paper"
        />
        <PurchasableResource
          {...resources.pulp}
          currency={props.config.currency}
          onBuyClick={handleBuyPulpClick}
          classNameId="pulp"
        />
      </div>
    </div>
  );
}

const createApp = (
  initialState: GameState,
  config: AppConfig = { currency: '£', baseGameCycleDurationMs: 1000 },
) => {
  const appProps: AppProps = {
    initialState,
    config,
  };
  return (<App {...appProps} />);
}

export default createApp;
