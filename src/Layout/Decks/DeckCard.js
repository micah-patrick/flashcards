import React from "react";
import { Link, useHistory } from "react-router-dom";
import { deleteDeck } from "../../utils/api";

//individual deck card as seen on home page and '/decks/:deckId' route (deck view)
//deck prop passes the deck object. the deckView prop (boolean) tells if this component is being used in the deck view route or not ('/decks/:deckId')
export default function DeckCard({ deck, deckView, deckListUpdated }) {
  const history = useHistory();

  //trunkate the deck's description if being displayed on home screen and if the description is long
  let trunkatedDescription = deck.description;
  if (!deckView & (deck.description.length > 115)) {
    trunkatedDescription = deck.description.slice(0, 115) + "...";
  }

  // some buttons should only be displayed in some cases
  const deckViewButton = deckView ? (
    ""
  ) : (
    <Link to={`/decks/${deck.id}`} className="btn btn-sm mb-1 btn-secondary mx-1">
      <span className="oi oi-eye mr-2" />
      View
    </Link>
  );

  const deckEditButton = deckView ? (
    <Link
      to={`/decks/${deck.id}/edit`}
      className="btn btn-sm mb-1 btn-secondary mx-1 float-right"
    >
      <span className="oi oi-pencil mr-2" />
      Edit
    </Link>
  ) : (
    ""
  );

  //delete deck, go to root directory and refresh
  const deleteHandler = () => {
    const message =
      "Delete this deck? \n \n You will not be able to recover it.";
    if (window.confirm(message)) {
      deleteDeck(deck.id).then(() => {
        history.push("/");
        !deckView && deckListUpdated();
      });
    }
  };

  //card count should not be plural if there is only one card
  const cardCount =
    deck.cards.length === 1 ? `1 Card` : `${deck.cards.length} cards`;

  return (
    <>
      <div className="card mb-3">
        <div className="card-header bg-dark text-white pb-0">
          {/* number of cards in the deck */}
          <span className="float-right badge bg-success text-white ml-3">
            {cardCount}
          </span>
          {/* name of the deck */}
          <h5 className="card-title text-truncate pb-2 my-0">{deck.name}</h5>
        </div>
        <div className="card-body row">



          <div className="col col-12">
            {/* deck description */}
            <p className="" style={{ minHeight: "5rem" }}>
              {trunkatedDescription}{" "}
            </p>
          </div>                    


          <div className="col">
            {/* view button */}
            {deckViewButton}
            {/* study button */}
            <Link to={`/decks/${deck.id}/study`} className="btn btn-sm mb-1 btn-primary mx-1">
              <span className="oi oi-book  mr-2" />
              Study
            </Link>

            {/* delete button */}
            <button
              className="btn btn-sm mb-1 btn-danger mx-1 float-right"
              onClick={deleteHandler}
              >
              <span className="oi oi-trash ml-1" />
            </button>
            {/* edit button */}
            {deckEditButton}
          </div>                      



        </div>
      </div>
    </>
  );
}
