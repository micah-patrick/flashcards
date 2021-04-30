import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import CardCard from "./CardCard";

//list all given cards. used on '/decks/:deckId' route
export default function CardList({ deck, cards, deckUpdated }) {

  const deckId = useParams().deckId;
  const addCardsBtn = (
    <Link 
      to={`/decks/${deckId}/cards/new`} 
      className="btn btn-sm mb-3 btn-success mx-1 float-right"
    >
      <span className="oi oi-plus  mr-2" />
      Add Cards
    </Link>
  );

  const [listAllCards, setListAllCards] = useState("");
  const [cardHeadDisplay, setCardHeadDisplay] = useState("");
  const [addCardsBtnDisplay, setAddCardBtnDisplay] = useState(addCardsBtn);
  const location = useLocation().pathname;
  const currentPage = location.substring(location.lastIndexOf('/') + 1)

  useEffect(() => {
    if (currentPage === "new" || currentPage === "edit" || currentPage === "study"){
      setAddCardBtnDisplay("");
    }
  },[currentPage])



  //map cards into list of Card components
  useEffect(() => {
    setListAllCards(
      cards.map((card, index) => {
        return <CardCard key={index} card={card} deckUpdated={deckUpdated} />;
      })
    );
    //only display "Cards" headline if there is at least one card in the deck
    cards.length > 0 && setCardHeadDisplay(<h3 className="mb-3">Cards</h3>);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards]);

  return (
    <>
     
      {addCardsBtnDisplay}
      {cardHeadDisplay}
      <div className="row">{listAllCards}</div>
    </>
  );
}
