import React from "react";
import PropTypes from "prop-types";

const Button = ({ autoRefresh, toggleAutoRefresh }) => {
  return (
    <button className="btn btn-primary mb-2" onClick={toggleAutoRefresh}>
      {autoRefresh ? "Stop" : "Start"} auto-refresh
    </button>
  );
};

Button.propTypes = {
  autoRefresh: PropTypes.bool.isRequired,
  toggleAutoRefresh: PropTypes.func.isRequired
};
export default Button;
