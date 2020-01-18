import React, { useState } from 'react';
import './App.scss';
import MakePaperButton from './components/MakePaperButton';
import Resource from './components/Resource';

export interface PlayerResources {
  paper: number;
  pulp: number;
}

interface AppConfig {
  initialResources: PlayerResources;
}

interface AppProps {
  config: AppConfig;
}

const App: React.FC<AppProps> = (props: AppProps) => {
  const { config } = props;
  const [ resources, setResources ] = useState(config.initialResources);

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

  return (
    <div className="App">
      <MakePaperButton onClick={handleMakePaperButtonClick} />
      <div className="resources">
        <Resource name="Paper" classNameId="paper" value={resources.paper} />
        <Resource name="Pulp" classNameId="pulp" value={resources.pulp} />
      </div>
    </div>
  );
}

const createApp = (initialResources: PlayerResources) => {
  const appProps: AppProps = {
    config: {
      initialResources,
    }
  };
  return (<App {...appProps} />);
}

export default createApp;
