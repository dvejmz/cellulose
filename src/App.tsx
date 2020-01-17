import React, { useState } from 'react';
import './App.scss';
import MakePaperButton from './components/MakePaperButton';
import PaperResource from './components/PaperResource';

export const getIncreasedPaperResource = (current: number, increment: number): number => {
  return current + increment;
};

const App: React.FC = () => {
  const [ resources, setResources ] = useState({
    paper: 0,
  });

  const handleMakePaperButtonClick = () => {
    setResources({
      ...resources,
      paper: getIncreasedPaperResource(resources.paper, 1),
    });
  };

  return (
    <div className="App">
      <MakePaperButton onClick={handleMakePaperButtonClick} />
      <div className="resources">
        <PaperResource value={resources.paper} />
      </div>
    </div>
  );
}

export default App;
