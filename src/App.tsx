import React, { useCallback, useEffect, useReducer } from 'react';

import 'spectre.css';
import './App.scss';

import combineReducers from 'react-combine-reducers';
import * as Actions from './actions';
import Funds from './components/Funds';
import MakePaperButton from './components/MakePaperButton';
import PurchasableResource from './components/PurchasableResource';
import Counter, { QuantityUnitAlignment } from './components/Counter';
import PlayerResource from './components/Resource';
import Upgrade from './components/Upgrade';
import { Resource } from './models/resource';
import demandReducer from './reducers/demand';
import fundsReducer from './reducers/funds';
import resourcesReducer from './reducers/resources';
import upgradesReducer from './reducers/upgrades'

// TODO: extract most of these into a Game component
export interface RootReducerAction {
  type: string;
  data?: any;
};

export interface Resources {
  paper: Resource;
  pulp: Resource;
}

export interface Demand {
  demandPct: number;
  price: number;
}

// TODO: Create UpgradeManager or UpgradeCollection
// To easily query and manage upgrades in the state
export interface Upgrade {
  name: string;
  cost: number;
  unlockTier: number;
  enabled: boolean;
};

export interface Upgrades {
  totalPaper: number;
  // TODO: currentTier?
  upgrades: Upgrade[];
};

export interface GameState {
  funds: number;
  resources: Resources;
  demand: Demand;
  upgrades: Upgrades;
}

export interface AppConfig {
  currency: string;
  baseGameCycleDurationMs: number;
  paperPriceChangeStep: number;
}

interface AppProps {
  config: AppConfig;
  initialState: GameState;
}

const {
  RESOURCES_BUY_PULP,
  RESOURCES_SELL_PAPER,
  RESOURCES_MAKE_PAPER,
  RESOURCES_PAPER_PRICE_INCREASE,
  RESOURCES_PAPER_PRICE_DECREASE,
} = Actions;

const App: React.FC<AppProps> = (props: AppProps) => {
  const { initialState } = props;
  const [ rootReducer, rootState ] = combineReducers({
    funds: [ fundsReducer, initialState.funds ],
    resources: [ resourcesReducer, initialState.resources ],
    demand: [ demandReducer, initialState.demand ],
    upgrades: [ upgradesReducer, initialState.upgrades ],
  });
  const [ state, dispatch ]: any[] = useReducer(rootReducer, rootState);
  const { resources, funds, demand, upgrades } = state;
  const initialiseGameState = () => {
    // TODO: this is a weird hack where we
    // dispatch two fake price update events
    // to give the demand engine enough data
    // points to generate demand data
    // Otherwise, if the player clicks on make
    // paper right after launching the game,
    // no sales will take place as purchase rate
    // will be uninitalised
    dispatch({
      type: Actions.RESOURCES_PAPER_PRICE_UPDATE,
      data: {
        newPrice: resources.paper.price + .0001,
        dispatch,
    }});

    dispatch({
      type: Actions.RESOURCES_PAPER_PRICE_UPDATE,
      data: {
        newPrice: resources.paper.price - .0001,
        dispatch,
    }});
  };
  const memoizedInitialiseGameState = useCallback(initialiseGameState, []);

  useEffect(() => {
    memoizedInitialiseGameState();
  }, [memoizedInitialiseGameState]);

  useEffect(() => {
    const timer = setTimeout(() => {
      sellPaper();
    }, props.config.baseGameCycleDurationMs);
    return () => clearTimeout(timer);
  });

  const sellPaper = () => {
    if (resources.paper) {
      dispatch({
        type: RESOURCES_SELL_PAPER,
        data: { paper: { ...resources.paper } },
      });
    }
  };

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

  const handleIncPaperPriceClick = () => {
    dispatch({ type: RESOURCES_PAPER_PRICE_INCREASE, data: { dispatch, step: props.config.paperPriceChangeStep }});
  };

  const handleDecPaperPriceClick = () => {
    dispatch({ type: RESOURCES_PAPER_PRICE_DECREASE, data: { dispatch, step: props.config.paperPriceChangeStep } });
  };

  return (
    <div className="App">
      <div className="container">
        <div className="columns">
          <div className="column col-2">
            <MakePaperButton onClick={handleMakePaperButtonClick} />
            <div className="upgrades">
              <Upgrade
                name={upgrades.upgrades[0].name}
                cost={upgrades.upgrades[0].cost}
                currency={props.config.currency}
              />
            </div>
          </div>
          <div className="column col-2">
            <Counter
              id="total-paper"
              name="Total Paper"
              quantity={upgrades.totalPaper}
              quantityUnit="sheets"
            />
            <Funds amount={funds} currency={props.config.currency} />
            <div className="resources">
              <PlayerResource
                {...resources.paper}
                showDecimals={false}
                id="paper"
              />
              <PurchasableResource
                {...resources.pulp}
                currency={props.config.currency}
                onBuyClick={handleBuyPulpClick}
                id="pulp"
              />
            </div>
            <Counter
              id="demand"
              name="Demand"
              quantity={demand.demandPct}
              quantityUnit="%"
              showDecimals
            />
            <div className="margin-top-right" data-test-id="resource-paper-price">
              <Counter
                id="paper-price"
                name="Paper Sale Price"
                quantity={resources.paper.price}
                quantityUnit={props.config.currency}
                quantityUnitAlignment={QuantityUnitAlignment.Left}
                showDecimals
              />
              <div className="resources__paper-price-adjusters" data-test-id="paper-price-adjusters">
                <button className="btn btn-sm resources__paper-price-adj" data-test-id="paper-price-inc-button" onClick={handleIncPaperPriceClick}>+</button>
                <button className="btn btn-sm resources__paper-price-adj" data-test-id="paper-price-dec-button" onClick={handleDecPaperPriceClick}>-</button>
              </div>
            </div>
          </div>
        </div>
      </div>
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
