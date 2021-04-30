import React from "react";
import { Route, Switch } from "react-router";
import Header from "./Header";
import Home from "./Home/Home";
import Decks from "./Decks/Decks";
import NotFound from "./NotFound";
import BreadCrumbs from "./Common/BreadCrumbs";
import DeckForm from "./Decks/DeckForm";

function Layout() {
  //bread crumbs for for new deck bread crumbs
  const newCrumbList = [{ name: "Create Deck", path: `/decks/new` }];



  return (
    <div>
      <Header />
      <div className="container pb-3">
        <Switch>
          <Route exact={true} path="/">
            {" "}
            {/* route for root directory */}
            <Home />
          </Route>
          <Route exact={true} path="/decks/new">
            {" "}
            {/* route for new deck */}
            <BreadCrumbs crumbs={newCrumbList} />
            <DeckForm formType={"Create"} />
          </Route>
          <Route path="/decks/:deckId">
            {" "}
            {/* route for any page that contains deckId */}
            <Decks />
          </Route>
          <Route>
            {" "}
            {/* route for unknown pages */}
            <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Layout;
