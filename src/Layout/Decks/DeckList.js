import React, { useEffect, useState } from "react";
import DeckCard from "./DeckCard";

//list of all the decks (as shown on the home page)
export default function DeckList({ deckList, deckView, deckListUpdated }) {
  const [listAllDecks, setListAllDecks] = useState("");
  //map the deckList into DeckCard components wrapped in bootstrap columns.
  useEffect(() => {
    setListAllDecks(
      deckList.map((deck, index) => {
        return (
          <div key={index} className="col col-12 col-lg-6 col-xl-4">
            <DeckCard deck={deck} deckView={deckView} deckListUpdated={deckListUpdated} />
            
          </div>
        );
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deckList, deckView]);

  //render list of decks wrapped in a bootstrap row
  return (
    <>
      <h2>Decks</h2>
      <div className="row">{listAllDecks}</div>
    </>
  );
}
