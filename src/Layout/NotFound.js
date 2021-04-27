import React from "react";
import { Link } from "react-router-dom";

//Not Found displays when api promise fails, or when navigating to a page that has no route
function NotFound() {
  return (
    <div className="NotFound">
      <div className="alert alert-danger" role="alert">
        Sorry, this page is missing.
      </div>
      <h1>Not Found</h1>
      <br />
      <Link className="btn btn-primary mb-3 btn" to="/">
        <span className="oi oi-home pr-2" />
        Go Home
      </Link>
    </div>
  );
}

export default NotFound;
