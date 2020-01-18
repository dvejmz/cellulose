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

  const handleMakePaperButtonClick = () => {
    setResources({
      ...resources,
      paper: resources.paper + 1,
      pulp: resources.pulp - 1,
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
