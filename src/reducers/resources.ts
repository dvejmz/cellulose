import * as Actions from '../actions';
import { getPurchaseRateFromDemand } from '../game/demand';
import { Resources } from '../game/resources';
import { RootReducerAction } from './../reducers';

const getUpdatedPaperCounter = (resources: Resources, multiplier: number): number => (
  resources.pulp.quantity 
    ? resources.paper.quantity + (1 * multiplier)
    : resources.paper.quantity
);

const getUpdatedPulpCounter = (resources: Resources): number => (
  Math.max(resources.pulp.quantity - 1, 0)
);

const resourcesReducer = (currentResources: Resources, action: RootReducerAction): Resources => {
  switch (action.type) {
    case Actions.RESOURCES_BUY_PULP: {
      return {
        ...currentResources,
        pulp: {
          ...currentResources.pulp,
          quantity: currentResources.pulp.quantity + currentResources.pulp.purchaseRate,
        },
      };
    }
    case Actions.RESOURCES_MAKE_PAPER: {
      return {
        ...currentResources,
        paper: {
          ...currentResources.paper,
          quantity: getUpdatedPaperCounter(currentResources, action.data.multiplier),
        },
        pulp: {
          ...currentResources.pulp,
          quantity: getUpdatedPulpCounter(currentResources),
        }
      };
    }
    case Actions.RESOURCES_SELL_PAPER: {
      const newPaperQuantity = currentResources.paper.quantity - currentResources.paper.purchaseRate;
      return {
        ...currentResources,
        paper: {
          ...currentResources.paper,
          quantity: Math.max(newPaperQuantity, 0),
        },
      };
    }
    case Actions.RESOURCES_PAPER_PRICE_INCREASE: {
      const state = {
        ...currentResources,
        paper: {
          ...currentResources.paper,
          price: currentResources.paper.price + action.data.step,
        },
      };
      action.data.dispatch({
        type: Actions.RESOURCES_PAPER_PRICE_UPDATE,
        data: {
          newPrice: state.paper.price,
          dispatch: action.data.dispatch,
      }});
      return state;
    }
    case Actions.RESOURCES_PAPER_PRICE_DECREASE: {
      const decreasedPaperPrice = currentResources.paper.price - action.data.step;
      const state = {
        ...currentResources,
        paper: {
          ...currentResources.paper,
          price: (
            decreasedPaperPrice < 0
            ? currentResources.paper.price
            : decreasedPaperPrice
          ),
        },
      };
      action.data.dispatch({
        type: Actions.RESOURCES_PAPER_PRICE_UPDATE,
        data: { 
          newPrice: state.paper.price,
          dispatch: action.data.dispatch,
        }});
      return state;
    }
    case Actions.DEMAND_UPDATE:
      return {
        ...currentResources,
        paper: {
          ...currentResources.paper,
          purchaseRate: getPurchaseRateFromDemand(
            action.data.prevDemandPct,
            action.data.newDemandPct,
            action.data.prevPrice,
            action.data.newPrice
          ),
        }
      };
    default:
      return currentResources;
  }
};


export default resourcesReducer;
