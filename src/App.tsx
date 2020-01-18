import React, { useReducer, useEffect } from 'react';
import combineReducers from 'react-combine-reducers';
import './App.scss';
import MakePaperButton from './components/MakePaperButton';
import PurchasableResource from './components/PurchasableResource';
import Funds from './components/Funds';
import Resource from './components/Resource';

interface PlayerResources {
  paper: number;
  pulp: number;
}

interface PurchaseRates {
  pulp: number;
}

interface ResourcePrices {
  pulp: number;
}

export interface GameState {
  funds: number;
  resources: PlayerResources;
  resourcePrices: ResourcePrices;
  purchaseRates: PurchaseRates;
}

interface AppProps {
  initialState: GameState;
}

const RESOURCES_BUY_PULP = 'RESOURCES_BUY_PULP';
const RESOURCES_MAKE_PAPER = 'RESOURCES_MAKE_PAPER';
const RESOURCES_SELL_PAPER = 'RESOURCES_SELL_PAPER';

const fundsReducer = (currentFunds: number, action: { type: string, data?: any }) => {
  switch (action.type) {
    case RESOURCES_BUY_PULP:
      return currentFunds - action.data.price;
    case RESOURCES_SELL_PAPER:
      return currentFunds + action.data.price;
    default:
      return currentFunds;
  }
};

const getUpdatedPaperCounter = (resources: PlayerResources): number => (
  resources.pulp
    ? resources.paper + 1
    : resources.paper
);

const getUpdatedPulpCounter = (resources: PlayerResources): number => (
  Math.max(resources.pulp - 1, 0)
);

const resourcesReducer = (currentResources: PlayerResources, action: { type: string, data?: any }): PlayerResources => {
  switch (action.type) {
    case RESOURCES_BUY_PULP: {
      return { ...currentResources, pulp: currentResources.pulp + action.data.purchaseRate };
    }
    case RESOURCES_MAKE_PAPER: {
      return { ...currentResources, paper: getUpdatedPaperCounter(currentResources), pulp: getUpdatedPulpCounter(currentResources) };
    }
    case RESOURCES_SELL_PAPER: {
      return { ...currentResources, paper: currentResources.paper ? currentResources.paper - 1 : currentResources.paper };
    }
    default:
      return currentResources;
  }
};

const resourcePricesReducer = (resourcePrices: any, action: any) => {
  return resourcePrices;
};

const purchaseRatesReducer = (purchaseRates: any, action: any) => {
  return purchaseRates;
};

const App: React.FC<AppProps> = (props: AppProps) => {
  const { initialState } = props;
  const [ rootReducer, rootState ] = combineReducers({
    funds: [ fundsReducer, initialState.funds ],
    resources: [ resourcesReducer, initialState.resources ],
    resourcePrices: [ resourcePricesReducer, initialState.resourcePrices ],
    purchaseRates: [ purchaseRatesReducer, initialState.purchaseRates ],
  });
  const [ state, dispatch ]: any[] = useReducer(rootReducer, rootState);
  // TODO -- Collapse purchase rates and resource prices into resources object
  // if React re-renders allow it
  const { resources, funds, purchaseRates, resourcePrices } = state;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (resources.paper) {
        dispatch({
          type: RESOURCES_SELL_PAPER,
          data: { price: 1 },
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
    dispatch({ type: RESOURCES_BUY_PULP, data: { purchaseRate: purchaseRates.pulp, price: resourcePrices.pulp }});
  };

  return (
    <div className="App">
      <MakePaperButton onClick={handleMakePaperButtonClick} />
      <div className="resources">
        <Funds amount={funds} currency={'£'} />
        <Resource
          name="Paper"
          classNameId="paper"
          value={resources.paper}
        />
        <PurchasableResource
          name="Pulp"
          classNameId="pulp"
          value={resources.pulp}
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
