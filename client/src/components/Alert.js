import React from "react";
import PropTypes from "prop-types";

function Alert(props) {
  return (
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
      role="alert"
    >
      {props.value}
    </div>
  );
}

Alert.propTypes = {
  value: PropTypes.string.isRequired,
};

export default Alert;
