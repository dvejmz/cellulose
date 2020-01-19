import React, { useReducer, useEffect } from 'react';
import combineReducers from 'react-combine-reducers';
import resourcesReducer from './reducers/resources';
import fundsReducer from './reducers/funds';
import * as Actions from './actions';
import './App.scss';
import MakePaperButton from './components/MakePaperButton';
import PurchasableResource from './components/PurchasableResource';
import Funds from './components/Funds';
import { Resource } from './models/resource';
import PlayerResource from './components/Resource';

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

interface AppProps {
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
    }, 1000);
    return () => clearTimeout(timer);
  });

  const handleMakePaperButtonClick = () => {
    dispatch({ type: RESOURCES_MAKE_PAPER });
  };

  const handleBuyPulpClick = () => {
    if (!funds) {
      return;
    }
    dispatch({ type: RESOURCES_BUY_PULP, data: { pulp: resources.pulp }});
  };

  return (
    <div className="App">
      <MakePaperButton onClick={handleMakePaperButtonClick} />
      <div className="resources">
        <Funds amount={funds} currency={'£'} />
        <PlayerResource
          name="Paper"
          classNameId="paper"
          value={resources.paper.quantity}
        />
        <PurchasableResource
          name="Pulp"
          classNameId="pulp"
          value={resources.pulp.quantity}
          onBuyClick={handleBuyPulpClick}
        />
      </div>
    </div>
  );
}

const createApp = (initialState: GameState) => {
  const appProps: AppProps = {
    initialState,
  };
  return (<App {...appProps} />);
}

export default createApp;
