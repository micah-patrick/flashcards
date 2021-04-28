import React, { useEffect, useState } from "react";
import CardCard from "./CardCard";

//list all given cards. used on '/decks/:deckId' route
export default function CardList({ cards, deckUpdated }) {
  const [listAllCards, setListAllCards] = useState("");
  const [cardHeadDisplay, setCardHeadDisplay] = useState("");

  //map cards into list of Card components
  useEffect(() => {
    setListAllCards(
      cards.map((card, index) => {
        return <CardCard key={index} card={card} deckUpdated={deckUpdated} />;
      })
    );
    //only display "Cards" headline if there is at least one card in the deck
    cards.length > 0 && setCardHeadDisplay(<h3>Cards</h3>);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards]);

  return (
    <>
      <br />
      {cardHeadDisplay}
      <div className="row">{listAllCards}</div>
    </>
  );
}
