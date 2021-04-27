import React from "react";

//spinning wheel and "Loading..." displays on pages while waiting for api fetch
export default function Loading() {
  return (
    <div>
      <span className="spinner-border float-left mt-1 mr-3"></span>{" "}
      <h2 className="mt-1">Loading...</h2>
    </div>
  );
}
