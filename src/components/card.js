import React from 'react';

import PropTypes from 'prop-types'


const CardState = {
    hiding: 0,
    showing: 1,
    matching: 2
  }
  
  const Card = props => {
    let style = {};
    if(props.showing) {
      style.backgroundColor = props.backgroundColor;
    }
    return (
      <div 
        onClick={props.onClick}
        className="card-container" 
        style={style}
      />
    )
  }

  class MemoryGame extends React.Component {
     constructor(props) {
       super(props);
       //the cards to be displayed
       let cards = [
         {id:0, cardState: CardState.hiding, backgroundColor:'red'},
         {id:1, cardState: CardState.hiding, backgroundColor:'red'},
         {id:2, cardState: CardState.hiding, backgroundColor:'navy'},
         {id:3, cardState: CardState.hiding, backgroundColor:'navy'},
         {id:4, cardState: CardState.hiding, backgroundColor:'green'},
         {id:5, cardState: CardState.hiding, backgroundColor:'green'},
         {id:6, cardState: CardState.hiding, backgroundColor:'yellow'},
         {id:7, cardState: CardState.hiding, backgroundColor:'yellow'},
         {id:8, cardState: CardState.hiding, backgroundColor:'black'},
         {id:9, cardState: CardState.hiding, backgroundColor:'black'},
         {id:10, cardState: CardState.hiding, backgroundColor:'purple'},
         {id:11, cardState: CardState.hiding, backgroundColor:'purple'},
         {id:12, cardState: CardState.hiding, backgroundColor:'pink'},
         {id:13, cardState: CardState.hiding, backgroundColor:'pink'},
         {id:14, cardState: CardState.hiding, backgroundColor:'turquoise'},
         {id:15, cardState: CardState.hiding, backgroundColor:'turquoise'},
       ];
       //shuffle cards for the game so there are not next to each other
       cards = shuffle(cards);
       this.state = {
          cards,
          noClick: false
       };
     }
    
     //shuffle cards for a new game
    handleNewGame = () => {
      let cards = this.state.cards.map(elm => ({
        ...elm,
        cardState: CardState.hiding
      }));
      cards = shuffle(cards);
      this.setState({cards});
    }
    
    handleClick = id =>  {
      const mapCardState = (cards, idsTochange, newCardState) => {
        return cards.map(elm => {
          if(idsTochange.includes(elm.id)) {
            return {
               ...elm,
               cardState: newCardState
            };
          }
          return elm;
        })
      }
      const foundCard = this.state.cards.find(elm => elm.id === id);
      
      if(this.state.noClick || foundCard.cardState !== CardState.hiding) { return; }
      //show color only when cards are clicked
      //allow two clicks at a time
      let noClick = false;
      let cards = mapCardState(this.state.cards, [id], CardState.showing);
      const showingCards = cards.filter(elm => elm.cardState === CardState.showing);
      const ids = showingCards.map(elm => elm.id);
      
      if(showingCards.length === 2 &&
         showingCards[0].backgroundColor === showingCards[1].backgroundColor) {
        cards = mapCardState(cards, ids, CardState.matching);
      } else if(showingCards.length === 2) {
        let hidingCards = mapCardState(cards, ids, CardState.hiding);
        
        //control fow long a card is displayed if wrong 
        noClick = true;
        this.setState({cards, noClick}, () => {
          setTimeout(() => {
            this.setState({cards:hidingCards, noClick: false});
          }, 500);
        })
        return;
      }
      this.setState({cards, noClick});
    }
     
     render() {
       const cards = this.state.cards.map(elm => (
         < Card 
           key={elm.id}
           showing={elm.cardState !== CardState.hiding}
           backgroundColor={elm.backgroundColor}
           onClick={() => this.handleClick(elm.id)}
         />)
       )
       //A restart button
       return (
        <div>
           <button
            type="button"
            className="btn"
            onClick={this.handleNewGame}
           >
             New Game
           </button>
           {cards}
           
        </div>
       )
     } 
   }
  
  Card.propTypes = {
    showing: PropTypes.bool.isRequired,
    backgroundColor: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
  }
   
  
  //make a function to randomize cards
  function shuffle(a) {
      var j, x, i;
      for (i = a.length - 1; i > 0; i--) {
          j = Math.floor(Math.random() * (i + 1));
          x = a[i];
          a[i] = a[j];
          a[j] = x;
      }
      return a;
  }
  
  export default MemoryGame;