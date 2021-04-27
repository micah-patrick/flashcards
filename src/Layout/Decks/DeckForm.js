import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck, updateDeck } from "../../utils/api";

//form for creating and editing decks
//props: deck being edited (if editing) formType: (edit or create) depending on how the form is being used
export default function DeckForm({ deck, formType }) {
  //name and description of the deck (being created or edited)
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
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
    //create a new deck object using form values
    const newDeck = { name: name, description: description };
    //update the or create the new deck
    if (formType === "Edit") {
      const updatedDeck = { ...newDeck, id: deck.id };
      updateDeck(updatedDeck).then((result) => {
        history.push(`/decks/${result.id}`);
        history.go(0);
      });
    } else {
      createDeck(newDeck).then((result) => {
        history.push(`/decks/${result.id}`);
      });
    }
  };

  return (
    <>
      <h1>{formType} Deck</h1>
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
        <Link className="btn btn-secondary mx-1" to="/">
          <span className="oi oi-circle-x mr-2" />
          Cancel
        </Link>
        {/*submit button*/}
        <button className="btn btn-primary mx-1" type="submit">
          <span className="oi oi-circle-check mr-2" />
          Submit
        </button>
      </form>
    </>
  );
}
