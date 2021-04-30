import React from "react";
import DeckCard from "./DeckCard";
import CardList from "../Cards/CardList";

// 'decks/:deckId' route. display the deck details and a list of cards.
export default function Deck({ deck, cards, deckUpdated }) {
  return (
    <>
      <DeckCard deck={deck} deckView={true} />
      <CardList deck={deck} cards={cards} deckUpdated={deckUpdated} />
    </>
  );
}
