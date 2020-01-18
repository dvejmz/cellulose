import React, { useState, useEffect } from 'react';
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

const App: React.FC<AppProps> = (props: AppProps) => {
  const { initialState } = props;
  const [ resources, setResources ] = useState(initialState.resources);
  const [ funds, setFunds ] = useState(initialState.funds);
  const [ purchaseRates, setPurchaseRates ] = useState(initialState.purchaseRates);
  const [ resourcePrices, setResourcePrices ] = useState(initialState.resourcePrices);

  const getUpdatedPaperCounter = (): number => (
    resources.pulp
      ? resources.paper + 1
      : resources.paper
  );

  const getUpdatedPulpCounter = (): number => (
    Math.max(resources.pulp - 1, 0)
  );

  const handleMakePaperButtonClick = () => {
    setResources({
      ...resources,
      paper: getUpdatedPaperCounter(),
      pulp: getUpdatedPulpCounter(),
    });
  };

  const increasePulpByPurchaseRate = (): number => (
    resources.pulp + purchaseRates.pulp
  );

  const subtractPulpPriceFromFunds = (): number => (
    Math.max(funds - resourcePrices.pulp, 0)
  );

  const handleBuyPulpClick = () => {
    if (!funds) {
      return;
    }
    setResources({
      ...resources,
      pulp: increasePulpByPurchaseRate(),
    });
    setFunds(subtractPulpPriceFromFunds());
  };

  const doPaperSaleCycle = () => {
    if (resources.paper) {
      setFunds(funds + 3);
      setResources({
        ...resources,
        paper: resources.paper - 1,
      });
    }
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
