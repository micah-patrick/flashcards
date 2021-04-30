import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck, updateDeck } from "../../utils/api";
import SubmitAlert from "../Common/SubmitAlert";

//form for creating and editing decks
//props: deck being edited (if editing) formType: (edit or create) depending on how the form is being used
export default function DeckForm({ deck, formType, deckUpdated }) {
  //name and description of the deck (being created or edited)
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [alertType, setAlertType] = useState("");
  const history = useHistory();

  //if editing a deck, set the state variables to the name and description of the deck being edited
  useEffect(() => {
    if (formType === "Edit") {
      setName(deck.name);
      setDescription(deck.description);
    }
  }, [deck, formType]);

  //submit handler
  const handleSubmit = (event) => {
    event.preventDefault();
    setAlertType("warning");
    //create a new deck object using form values
    const newDeck = { name: name, description: description };
    //update the or create the new deck
    if (formType === "Edit") {
      const updatedDeck = { ...newDeck, id: deck.id };
      updateDeck(updatedDeck).then((result) => {
        history.push(`/decks/${result.id}/success`);
        deckUpdated();
      })
      .catch(() => {
        setAlertType("danger");
      });
    } else {
      createDeck(newDeck).then((result) => {
        history.push(`/decks/${result.id}/success`);
      })
      .catch(() => {
        setAlertType("danger");
      });
    }
  };

  return (
    <>
      <h2>{formType} Deck</h2>
      <form onSubmit={handleSubmit}>
        {/*name input*/}
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            className="form-control"
            id="name"
            type="text"
            name="name"
            onChange={(event) => {
              setName(event.target.value);
            }}
            value={name}
            maxLength="50"
          />
        </div>
        {/*description input*/}
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            rows="3"
            name="description"
            onChange={(event) => {
              setDescription(event.target.value);
            }}
            value={description}
          ></textarea>
        </div>
        {/*cancel button*/}
        <Link className="btn btn-secondary mx-1 mb-3" to="/">
          <span className="oi oi-circle-x mr-2" />
          Cancel
        </Link>
        {/*submit button*/}
        <button className="btn btn-primary mx-1 mb-3" type="submit">
          <span className="oi oi-circle-check mr-2" />
          Submit
        </button>
        <SubmitAlert form="deck" alertType={alertType} />
      </form>
    </>
  );
}
