import React from 'react';
import MemoryGame from './components/card';
import HelpButton from './components/HelpButton';
import './App.css'

//display the game 
function App() {
  return (
    <div className="App">
    <h2>Memory Game</h2> 
    <h2>Can you match the colors</h2>
    {/*Call the component for the game*/}
    <MemoryGame/><HelpButton/>{/*Call the component for help*/}

    </div>
  );
  
}



export default App;
