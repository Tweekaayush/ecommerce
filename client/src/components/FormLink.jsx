import React from "react";
import { Link } from "react-router-dom";

const FormLink = ({ text, value, link }) => {
  return (
    <p className="body-text">
      {text}
      <Link to={link} className="text-blue-500 ml-1">
        {value}
      </Link>
    </p>
  );
};

export default FormLink;
