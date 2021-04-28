import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { createCard, updateCard } from "../../utils/api";
import SubmitAlert from "../Common/SubmitAlert";
import NotFound from "../NotFound";
import CardList from "./CardList";

//form for adding and editing cards
export default function CardForm({ deck, formType, deckUpdated }) {
  const [frontText, setFrontText] = useState("");
  const [backText, setBackText] = useState("");
  const history = useHistory();
  const cardId = Number(useParams().cardId);
  const [card, setCard] = useState({});
  const [alertType, setAlertType] = useState("");

  //set card state variable to the card that is being edited
  useEffect(() => {
    const findCard = deck.cards.find((item) => item.id === cardId);
    setCard(findCard);
  }, [cardId, deck]);

  //set front and back text state variables to current values
  useEffect(() => {
    if ((formType === "Edit") & (card !== undefined)) {
      setFrontText(card.front);
      setBackText(card.back);
    }
  }, [card, formType]);

  //show success alert message (triggered in submit handler upon success)
  const showSuccessAlert = () => {
    // history.go(0);
    deckUpdated();
    setAlertType("success");
    setTimeout(() => {
      setAlertType("");
    }, 2000);
  };

  //show failure alert message (triggered in submit handler upon success)
  const showFailAlert = () => {
    setAlertType("danger");
    setTimeout(() => {
      setAlertType("");
    }, 2000);
  };

  //show saving alert message (triggered in submit handler upon success)
  const showSavingAlert = () => {
    setAlertType("warning");
  };

  //submit handler.
  //first show "saving..." alert
  //create new card object using form values
  // if editing, put the update, than go to deck view ('/decks/:deckId')
  // if it's a new card, post the new card, show success and reset the form.
  // if either put/post fails, show fail alert.
  const handleSubmit = (event) => {
    event.preventDefault();
    showSavingAlert();
    const newCard = { front: frontText, back: backText };
    if (formType === "Edit") {
      const updatedCard = { ...newCard, id: cardId, deckId: deck.id };
      updateCard(updatedCard)
        .then(() => {
          history.push(`/decks/${deck.id}`);
          deckUpdated();
        })
        .catch(() => {
          showFailAlert();
        });
    } else {
      createCard(deck.id, newCard)
        .then(() => {
          showSuccessAlert();
          setFrontText("");
          setBackText("");
        })
        .catch(() => {
          showFailAlert();
        });
    }
  };

  //if editing but no card is found, display not found component, otherwise display form
  return !card & (formType === "Edit") ? (
    <NotFound />
  ) : (
    <>
      <h3>
        {deck.name}: {formType} Card
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="front">Front</label>
          <textarea
            className="form-control"
            id="front"
            rows="3"
            name="front"
            onChange={(event) => {
              setFrontText(event.target.value);
            }}
            value={frontText}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="back">Back</label>
          <textarea
            className="form-control"
            id="back"
            rows="3"
            name="back"
            onChange={(event) => {
              setBackText(event.target.value);
            }}
            value={backText}
          ></textarea>
        </div>
        <button
          className="btn btn-secondary mx-1"
          onClick={() => {
            history.push(`/decks/${deck.id}`);
          }}
        >
          <span className="oi oi-circle-x mr-2" />
          Done
        </button>
        <button className="btn btn-primary mx-1" type="submit">
          <span className="oi oi-circle-check mr-2" />
          Save
        </button>
        <SubmitAlert form="card" alertType={alertType} />
      </form>
      <br />
      <CardList cards={deck.cards} deckUpdated={deckUpdated} />
    </>
  );
}
