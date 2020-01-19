import * as Actions from '../actions';
import { Resources, RootReducerAction } from '../App';

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
            ? currentResources.paper.quantity - 1
            : currentResources.paper.quantity,
        },
      };
    }
    default:
      return currentResources;
  }
};


export default resourcesReducer;
