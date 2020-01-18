import React, { useState } from 'react';
import './App.scss';
import MakePaperButton from './components/MakePaperButton';
import Resource from './components/Resource';

const App: React.FC = () => {
  const [ resources, setResources ] = useState({
    paper: 0,
  });

  const handleMakePaperButtonClick = () => {
    setResources({
      ...resources,
      paper: resources.paper + 1,
    });
  };

  return (
    <div className="App">
      <MakePaperButton onClick={handleMakePaperButtonClick} />
      <div className="resources">
        <Resource name="Paper" classNameId="paper" value={resources.paper} />
      </div>
    </div>
  );
}

export default App;
