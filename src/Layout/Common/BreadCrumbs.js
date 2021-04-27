import React from "react";
import { Link, useParams } from "react-router-dom";

//breadcrumb component on the top of most pages
export default function BreadCrumbs({ crumbs }) {
  const params = useParams();
  //if the current route contains a cardId, store it in cardNumber variable.
  const cardNumber = params.cardId ? " " + params.cardId : "";

  //create list items by mapping through the crumbs passed in by props
  //if it's the last crumb it will be treated as current page, otherwise it will be a link to the crumb's path
  const crumbList = crumbs.map(({ name, path }, index) =>
    index + 1 === crumbs.length ? (
      <li
        key={index}
        className="breadcrumb-item active"
        style={{ maxWidth: "15rem" }}
        aria-current="page"
      >
        {" "}
        <span className="text-truncate">{name + cardNumber} </span>
      </li>
    ) : (
      <li key={index} className="breadcrumb-item" style={{ maxWidth: "15rem" }}>
        <Link className="text-truncate" to={path}>
          {name}
        </Link>
      </li>
    )
  );

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {/* home is always the first crumb */}
        <li className="breadcrumb-item">
          <Link to="/">
            <span className="oi oi-home mr-1 " />
            Home
          </Link>
        </li>
        {crumbList}
      </ol>
    </nav>
  );
}
