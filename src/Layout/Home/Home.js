import React, { useEffect, useState } from "react";
import NotFound from "../NotFound";
import DeckList from "../Decks/DeckList";
import { listDecks } from "../../utils/api";
import Loading from "../Common/Loading";
import { Link } from "react-router-dom";

//home page
//displays a "create deck" button and a list of all the decks
export default function Home() {
  //deckListDisplay displays loading componant by default, then displays the list of decks once the decks are recieved from the api
  const [deckListDisplay, setDeckListDisplay] = useState(<Loading />);
  const [deckList, setDeckList] = useState();
  const [updateCount, setUpdateCount] = useState(0);

  function deckListUpdated(){ 
    setUpdateCount(updateCount + 1); 
  };

  useEffect(() => {
    listDecks() //recieve decks from the database
      .then((response) => {
        setDeckList(response);
      })
      .catch(() => {
        setDeckListDisplay(<NotFound />); //if the api fetch fails, display NotFound componant.
      });
  }, [updateCount]);

  useEffect(() => {
    deckList && //set display to DeckList componant
      setDeckListDisplay(<DeckList deckList={deckList} deckListUpdated={deckListUpdated} />);
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deckList]);

  return (
    <div>
      {/* "create deck" button */}
      <Link className="btn btn-success mb-3 btn-lg" to="/decks/new">
        <span className="oi oi-plus pr-2" />
        Create Deck
      </Link>
      {/*display Loading, NotFound, or DeckList componant*/}
      {deckListDisplay}
    </div>
  );
}
