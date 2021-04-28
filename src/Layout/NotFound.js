import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

//Not Found displays when api promise fails, or when navigating to a page that has no route
function NotFound() {


  const location = useLocation().pathname;
  console.log(location);

  const [homeBtnDisplay, setHomeBtnDisplay] = useState("");

  useEffect(() =>{
    location !== "/" &&
    setHomeBtnDisplay(
      <Link className="btn btn-primary btn-lg mb-3 btn" to="/">
        <span className="oi oi-home pr-2" />
        Go Home
      </Link>    
    )
  },[location])


  return (
    <div className="NotFound">
      <div className="alert alert-danger" role="alert">
        Sorry, this page is missing.
      </div>
      {homeBtnDisplay}
      <h2>Not Found</h2>
      <br />
    </div>
  );
}

export default NotFound;
