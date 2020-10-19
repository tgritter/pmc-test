import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

const Loading = (props) => {
  return (
    <div className="loading-container">
      <CircularProgress color="primary" />
      <div className="spacing">Pricing your conveyance...</div>
    </div>
  );
};

export default Loading;
