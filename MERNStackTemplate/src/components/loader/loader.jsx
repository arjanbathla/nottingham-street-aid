import React from "react";

import PulseLoader from "react-spinners/PulseLoader";

const loader = (props) => {
  return props.loading ? (
    <PulseLoader
        color={"var(--accent)"}
        loading={props.loading}
        size={20}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
  ) : null;
};

export default loader;
