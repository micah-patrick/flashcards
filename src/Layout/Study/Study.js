import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import NotEnoughCards from "../Cards/NotEnoughCards";

export default function Study({ deck, cards }) {
  const history = useHistory();
  const [cardNumber, setCardNumber] = useState(0); //used to decide which card to display from cards array
  const enoughCards = cards.length > 2; //boolean used to determine if there are enough cards to study (there must be at least 3)
  const [cardSide, setCardSide] = useState("front"); //front or back. always start with front.
  const [nextButtonDisplay, setNextButtonDisplay] = useState(""); //next button is hidden when cardSide === 'front'
  const [shuffledCards, setShuffledCards] = useState([...cards]);
  const [card, setCard] = useState(cards[0]); //current card object to be displayed
  const [cardClass, setCardClass] = useState("text-dark bg-light");

  //on first render, shuffle the cards
  useEffect(() => {
    setShuffledCards(shuffle(cards))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  //when cards are shuffled, set first card to first shuffled card
  useEffect(() => {
    setCard(shuffledCards[0]);
  },[shuffledCards])

  //function to make a copy of the cards array and shuffle it
  function shuffle(cards) {
      const cardsToShuffle = [...cards];
      for (let i = cardsToShuffle.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [cardsToShuffle[i], cardsToShuffle[j]] = [cardsToShuffle[j], cardsToShuffle[i]];
      }
      return cardsToShuffle
  }



  function nextHandler() {
    //handles clicking next
    if (cardNumber + 1 < cards.length) {
      //what to do if the current card if not the last card
      setNextButtonDisplay(""); //hides the next button
      setCardSide("front"); //switches the next card to front
      setCard(shuffledCards[cardNumber + 1]); //updates the 'card _ of _' number
      setCardNumber(cardNumber + 1); //moves to the next card
      setCardClass("text-dark bg-light");
    } else {
      //what to do if the deck is finished
      const message =
        "Restart cards? \n \n Clisck 'cancel' to return to the home page."; //displays message
      if (window.confirm(message)) {
        //if message is confirmed, reset the deck
        setCardSide("front");
        setCardNumber(0);
        setShuffledCards(shuffle(cards));
        setCard(shuffledCards[0]);
        setNextButtonDisplay("");
        setCardClass("text-dark bg-light");
      } else {
        //if pushed cancel, go home.
        history.push("/");
      }
    }
  }

  function flipHandler() {
    //handles flip button
    if (cardSide === "back") {
      //if previous state of the card was the backside...
      setCardSide("front"); //switch to front
      setCardClass("text-dark bg-light");
      setNextButtonDisplay(""); //hide the next button
    } else {
      //if previous state of the card was the frontside...
      setCardSide("back"); //switch to backside
      setCardClass("text-white bg-dark");
      setNextButtonDisplay(
        //display the next  button
        <button onClick={nextHandler} className="btn btn-primary mx-2">
          Next
          <span className="oi oi-chevron-right ml-2" />
        </button>
      );
    }
  }

const progressbarStyles = {
  display: 'flex',
  height: '.5rem',
  overflow: 'hidden',
  margin: '-1px'
}


  return enoughCards ? (
    <>
      <h2>Study: {deck.name}</h2>
      
      
      



      <div
        className={`card mb-3 ${cardClass}`}
        style={{ maxWidth: "40rem", minHeight: "14rem" }}
      >

<div style = {progressbarStyles}>
                  <div 
                    className="progress-bar  bg-success" 
                    role="progressbar" 
                    style={{width: `${(((cardNumber) / (cards.length )) + (1 / cards.length) ) * 100}%`}} 
                    aria-valuenow={(((cardNumber) / (cards.length )) + (1 / cards.length) ) * 100}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                  </div>
                </div>


        <div className="card-header">{`Card ${cardNumber + 1} of ${
          cards.length
        }`}
        
        </div>
        <div className="card-body">
          <p className="card-text">{card[cardSide]} </p>
        </div>
      </div>
      <button onClick={flipHandler} className="btn btn-secondary">
        <span className="oi oi-loop-circular mr-2" />
        Flip
      </button>
      {/* next button ony displays when the back of a card is showing */}
      {nextButtonDisplay}
    </>
  ) : (
    /* display NotEnoughCards component if the deck has less than 3 cards */
    <NotEnoughCards deck={deck} />
  );
}
