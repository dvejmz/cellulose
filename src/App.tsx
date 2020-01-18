import React, { useState } from 'react';
import './App.scss';
import MakePaperButton from './components/MakePaperButton';
import PurchasableResource from './components/PurchasableResource';
import Resource from './components/Resource';

interface PlayerResources {
  paper: number;
  pulp: number;
}

interface PurchaseRates {
  pulp: number;
}

export interface GameState {
  resources: PlayerResources;
  purchaseRates: PurchaseRates;
}

interface AppProps {
  initialState: GameState;
}

const App: React.FC<AppProps> = (props: AppProps) => {
  const { initialState } = props;
  const [ resources, setResources ] = useState(initialState.resources);
  const [ purchaseRates, setPurchaseRates ] = useState(initialState.purchaseRates);

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

  const handleBuyPulpClick = () => {
    setResources({
      ...resources,
      pulp: increasePulpByPurchaseRate(),
    });
  };

  return (
    <div className="App">
      <MakePaperButton onClick={handleMakePaperButtonClick} />
      <div className="resources">
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
