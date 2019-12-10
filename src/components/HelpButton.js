import React from 'react';

function HelpButton() {
    return (
      <div className="HelpButton"> 
      {/*Display game rules*/}
      <button onClick={()=>alert('Match the two blocks together.' + ' '  +
           'Once all blocks match restart the game')}>Help</button>
      </div>
    );
    
  }
  
  
  
  export default HelpButton;