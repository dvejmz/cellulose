import * as Actions from '../actions';
import { Resources, RootReducerAction } from '../App';
import { getPurchaseRateFromDemand } from '../game/demand';

const getUpdatedPaperCounter = (resources: Resources): number => (
  resources.pulp.quantity 
    ? resources.paper.quantity + 1
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
          quantity: getUpdatedPaperCounter(currentResources),
        },
        pulp: {
          ...currentResources.pulp,
          quantity: getUpdatedPulpCounter(currentResources),
        }
      };
    }
    case Actions.RESOURCES_SELL_PAPER: {
      return {
        ...currentResources,
        paper: {
          ...currentResources.paper,
          quantity:
            currentResources.paper.quantity
            ? currentResources.paper.quantity - currentResources.paper.purchaseRate
            : currentResources.paper.quantity,
        },
      };
    }
    case Actions.RESOURCES_PAPER_PRICE_INCREASE: {
      const r = {
        ...currentResources,
        paper: {
          ...currentResources.paper,
          price: currentResources.paper.price + .1,
        },
      };
      //console.log(r)
      return r;
    }
    case Actions.RESOURCES_PAPER_PRICE_DECREASE: {
      const decreasedPaperPrice = currentResources.paper.price - .1;
      return {
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
    }
    case Actions.DEMAND_UPDATE:
      return {
        ...currentResources,
        paper: {
          ...currentResources.paper,
          purchaseRate: getPurchaseRateFromDemand(action.data.newDemandPct),
        }
      };
    default:
      return currentResources;
  }
};


export default resourcesReducer;
