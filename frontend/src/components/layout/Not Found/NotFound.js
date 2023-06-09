import React from "react";
import "./NotFound.css";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="pageNotFoundContainer">
      <div className="notFoundImg">
        <img src="/NF.png" alt="" />
      </div>
      {/* <h1 className="notFoundError">404</h1>
      <h1 className="notFoundHeading">Page Not Found.</h1> */}
      <p>Sorry the page you are looking for could not be found.</p>
      <Link to="/">Home</Link>
    </div>
  );
};

export default NotFound;