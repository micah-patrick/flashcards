import React from "react";
import { Link } from "react-router-dom";
import CardList from "./CardList";

//component displays when trying to study a deck with less than 3 cards
export default function NotEnoughCards({ deck }) {
  const notEnoughMessage =
    deck.cards.length === 1 ? "is 1 card" : `are ${deck.cards.length} cards`;

  return (
    <>
      <div className="alert alert-warning" role="alert">
        Not enough cards. You need at least 3 cards to study. There{" "}
        {notEnoughMessage} in this deck.
      </div>
      <h2>Study: {deck.name}</h2>

      <br />

      <Link
        className="btn btn-primary mb-3 btn"
        to={`/decks/${deck.id}/cards/new`}
      >
        <span className="oi oi-plus pr-2" />
        Add Cards
      </Link>
      <CardList deck={deck} cards={deck.cards} />
    </>
  );
}
