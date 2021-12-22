import React from "react";
import "../Stylesheets/styles.css";
const ErrorMessage = ({ name, type }) => {
  // eslint-disable-next-line default-case
  switch (type) {
    case "add":
      return (
        <div className="addmessage">
          <p className="text">{name} has been added to the database.</p>
        </div>
      );
    case "missing":
      return (
        <div className="errormessage">
          <p className="text">
            {name} has already been deleted from the database.
          </p>
        </div>
      );
  }
};

export default ErrorMessage;
