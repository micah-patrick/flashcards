import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router";
import { useParams } from "react-router-dom";
import { readDeck } from "../../utils/api/index";
import BreadCrumbs from "../Common/BreadCrumbs";
import Loading from "../Common/Loading";
import Study from "../Study/Study";
import Deck from "./Deck";
import NotFound from "../NotFound";
import CardForm from "../Cards/CardForm";
import DeckForm from "./DeckForm";

// this is the parent/ grandparent component for any component that uses decks
// here we get the deck data from the library, show the loading screen, and don't route to child components until the deck object is loaded and ready to
//pass on to the child components.
export default function Decks() {
  //get the deckId from the url params.
  const deckId = useParams().deckId;
  const [deck, setDeck] = useState({});
  const [cards, setCards] = useState({});
  //decksDisplay will show Loading (default), NotFound (in case of api call error), or a route switch.
  const [decksDisplay, setDecksDisplay] = useState(<Loading />);

  //crumbs is an object used to pass name and path information to the Breadcrumbs component
  const crumbs = {
    deck: { name: deck.name, path: `/decks/${deck.id}` },
    study: { name: "Study", path: `/decks/${deck.id}/study` },
    editDeck: { name: "Edit Deck", path: `/decks/${deck.id}/edit` },
    newCard: { name: "Add Card", path: `/decks/${deck.id}/cards/new` },
    editCard: { name: `Edit Card`, path: `/` },
  };

  //fetch the deck data from the api and use it to set the deck and cards states.
  useEffect(() => {
    async function loadData() {
      try {
        const response = await readDeck(deckId);
        setDeck({ ...response });
        setCards([...response.cards]);
      } catch {
        // if the fetch fails, display the NotFound Component.
        setDecksDisplay(<NotFound />);
      }
    }
    loadData();
  }, [deckId]);

  //once the deck data is gathered return the route switch
  useEffect(() => {
    deck.id &&
      setDecksDisplay(
        <Switch>
          <Route exact={true} path="/decks/:deckId">
            <BreadCrumbs crumbs={[crumbs.deck]} />
            <Deck deck={deck} cards={cards} />
          </Route>
          <Route exact={true} path="/decks/:deckId/study">
            <BreadCrumbs crumbs={[crumbs.deck, crumbs.study]} />
            <Study deck={deck} cards={cards} />
          </Route>
          <Route exact={true} path="/decks/:deckId/edit">
            <BreadCrumbs crumbs={[crumbs.deck, crumbs.editDeck]} />
            <DeckForm deck={deck} formType={"Edit"} />
          </Route>
          <Route exact={true} path="/decks/:deckId/cards/new">
            <BreadCrumbs crumbs={[crumbs.deck, crumbs.newCard]} />
            <CardForm deck={deck} formType={"Add"} />
          </Route>
          <Route exact={true} path="/decks/:deckId/cards/:cardId/edit">
            <BreadCrumbs crumbs={[crumbs.deck, crumbs.editCard]} />
            <CardForm deck={deck} formType={"Edit"} cards={cards} />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards]);

  //decksDisplay will show Loading (default), NotFound (in case of api call error), or a route switch.
  return decksDisplay;
}
