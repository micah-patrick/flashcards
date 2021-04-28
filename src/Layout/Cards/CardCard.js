import React from "react";
import { Link } from "react-router-dom";
import { deleteCard } from "../../utils/api";

//individual card componant displaying both sides and edit/ delete buttons (not what is shown when studying)
export default function CardCard({ card, deckUpdated }) {

  //trunkate card text if longer than 150 characters.
  let trunkatedFront = card.front;
  let trunkatedBack = card.back;
  if (card.front.length > 150) {
    trunkatedFront = card.front.slice(0, 150) + "...";
  }
  if (card.back.length > 150) {
    trunkatedBack = card.back.slice(0, 150) + "...";
  }

  //confirm deletion than go to the deck view and refresh
  const deleteHandler = () => {
    const message =
      "Delete this card? \n \n You will not be able to recover it.";
    if (window.confirm(message)) {
      deleteCard(card.id).then(() => {
        deckUpdated();
      });
    }
  };

  return (
    <>
      <div className="my-3 col col-12 col-md-6 ">
        {/*front of card*/}
        <div
          className="card text-dark bg-light mb-1"
          style={{ minHeight: "11rem" }}
        >
          <div className="card-header">Front</div>
          <div className="card-body ">
            <p className="card-text ">{trunkatedFront} </p>
          </div>
        </div>
        {/*back of card*/}
        <div className="card text-white bg-dark" style={{ minHeight: "11rem" }}>
          <div className="card-header">Back</div>
          <div className="card-body">
            <p className="card-text">{trunkatedBack} </p>
          </div>
        </div>
        <div className="col mt-2">
          {/*delete button*/}
          <button
            to="/"
            className="btn btn-danger mx-2 float-right"
            onClick={deleteHandler}
          >
            <span className="oi oi-trash ml-1" />
          </button>
          {/*edit button*/}
          <Link
            to={`/decks/${card.deckId}/cards/${card.id}/edit`}
            className="btn btn-secondary float-right"
          >
            <span className="oi oi-pencil mr-2" />
            Edit
          </Link>
        </div>
      </div>
    </>
  );
}
