import React, { useCallback, useEffect } from 'react';

import * as Actions from './actions';
import Counter, { QuantityUnitAlignment } from './components/Counter';
import Funds from './components/Funds';
import MakePaperButton from './components/MakePaperButton';
import PurchasableResource from './components/PurchasableResource';
import PlayerResource from './components/Resource';
import SalesRateChart from './components/SalesRateChart';
import Upgrades from './containers/Upgrades';
import { Demand } from './game/demand';
import { History } from './game/history';
import { Resources } from './game/resources';
import {
  getActivePpcMultiplier,
  getUpgradeById,
  UPGRADE_ID_PAPERMAKER_1X,

  Upgrades as UpgradesType,
} from './game/upgrades';

export interface RootReducerAction {
  type: string;
  data?: any;
};

export interface GameState {
  funds: number;
  resources: Resources;
  demand: Demand;
  upgrades: UpgradesType;
  history: History;
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
  HISTORY_PAPER_PURCHASE_RATE,
} = Actions;

const Game: React.FC<GameProps> = (props: GameProps) => {
  const { resources, funds, demand, upgrades, history } = props.gameState;
  const { config } = props;
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

  const applyActiveUpgrades = () => {
    const paperMakerUpgrade = getUpgradeById(UPGRADE_ID_PAPERMAKER_1X, upgrades.upgrades);
    if (paperMakerUpgrade?.enabled) {
      makePaper(1);
    }
  };

  const sellPaper = () => {
    if (resources.paper) {
      dispatch({
        type: RESOURCES_SELL_PAPER,
        data: { paper: { ...resources.paper } },
      });
    }
  };

  const pushStateToHistory = () => {
    dispatch({ type: HISTORY_PAPER_PURCHASE_RATE, data: { purchaseRate: resources.paper.purchaseRate} });
  };

  const cbInitialiseGameState = useCallback(initialiseGameState, []);
  const cbSellPaper = useCallback(sellPaper, [resources.paper]);
  const cbApplyActiveUpgrades = useCallback(applyActiveUpgrades, [upgrades.upgrades]);
  const cbPushStateToHistory = useCallback(pushStateToHistory, [history]);

  useEffect(() => {
    cbInitialiseGameState();
  }, [cbInitialiseGameState]);

  useEffect(() => {
    const timer = setInterval(() => {
      cbApplyActiveUpgrades();
      cbPushStateToHistory();
    }, props.config.baseGameCycleDurationMs * 1.5);
    return () => clearInterval(timer);
  }, [
    props.config.baseGameCycleDurationMs,
    cbApplyActiveUpgrades,
    cbPushStateToHistory,
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      cbSellPaper();
    }, props.config.baseGameCycleDurationMs);
    return () => clearInterval(timer);
  }, [props.config.baseGameCycleDurationMs, cbSellPaper]);

  const makePaper = (multiplier: number) => {
    if (resources.pulp.quantity) {
      dispatch({ type: RESOURCES_MAKE_PAPER, data: { multiplier }});
    }
  };

  const handleMakePaperButtonClick = () => {
    makePaper(getActivePpcMultiplier(upgrades.upgrades));
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
    if (funds >= cost) {
      dispatch({ type: UPGRADES_BUY, data: { id, cost }})
    }
  };

  return (
    <div className="container">
      <div className="columns">
        <div className="column col-2 col-md-12">
          <MakePaperButton onClick={handleMakePaperButtonClick} />
          <Upgrades
            upgrades={upgrades.upgrades}
            totalPaper={upgrades.totalPaper}
            currency={config.currency}
            onBuyClick={handleBuyUpgradeClick}
          />
        </div>
        <div className="column col-3 col-md-12">
          <Counter
            id="total-paper"
            name="Total Paper"
            quantity={upgrades.totalPaper}
            quantityUnit="sheets"
          />
          <Funds amount={funds} currency={config.currency} />
          <div className="resources">
            <PlayerResource
              {...resources.paper}
              showDecimals={false}
              id="paper"
            />
            <PurchasableResource
              {...resources.pulp}
              currency={config.currency}
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
        <div className="column col-3 col-md-12">
          <SalesRateChart label={'Paper Demand'} rateHistory={history.paper.purchaseRate} />
        </div>
      </div>
    </div>
  );
}

export default Game;
