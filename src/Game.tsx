import React, { useCallback, useEffect } from 'react';

import * as Actions from './actions';
import Counter, { QuantityUnitAlignment } from './components/Counter';
import Funds from './components/Funds';
import MakePaperButton from './components/MakePaperButton';
import PurchasableResource from './components/PurchasableResource';
import PlayerResource from './components/Resource';
import Upgrade from './components/Upgrade';
import { Demand } from './game/demand';
import { Resources } from './game/resources';
import { getUnlockableUpgrades } from './game/upgrades';
import { Upgrades } from './game/upgrades';

export interface RootReducerAction {
  type: string;
  data?: any;
};

export interface GameState {
  funds: number;
  resources: Resources;
  demand: Demand;
  upgrades: Upgrades;
}

export interface GameConfig {
  currency: string;
  baseGameCycleDurationMs: number;
  paperPriceChangeStep: number;
};

export interface GameProps {
  gameState: GameState;
  config: GameConfig;
  dispatch: (action: RootReducerAction) => object;
};

const {
  RESOURCES_BUY_PULP,
  RESOURCES_SELL_PAPER,
  RESOURCES_MAKE_PAPER,
  RESOURCES_PAPER_PRICE_INCREASE,
  RESOURCES_PAPER_PRICE_DECREASE,
  UPGRADES_BUY,
} = Actions;

const Game: React.FC<GameProps> = (props: GameProps) => {
  const { resources, funds, demand, upgrades } = props.gameState;
  const dispatch = props.dispatch;

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

  const handleBuyUpgradeClick = (id: string, cost: number) => {
    dispatch({ type: UPGRADES_BUY, data: { id, cost }})
  };

  const getUpgrades = () => (
    getUnlockableUpgrades(upgrades.totalPaper, upgrades.upgrades)
  );

  // TODO: could refactor into its own component
  // able to manage its own state
  const unlockableUpgrades = (
    getUpgrades()
      .map(u => (
        <Upgrade
          id={u.id}
          key={u.id}
          name={u.name}
          cost={u.cost}
          currency={props.config.currency}
          onBuyClick={handleBuyUpgradeClick}
        />
      ))
  );

  return (
    <div className="container">
      <div className="columns">
        <div className="column col-2">
          <MakePaperButton onClick={handleMakePaperButtonClick} />
          <div className="upgrades">
            {unlockableUpgrades}
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
          <div className="paper-price">
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
  );
}

export default Game;
