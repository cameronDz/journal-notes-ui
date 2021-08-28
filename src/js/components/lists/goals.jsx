import React from "react";
import PropType from "prop-types";
import * as indexData from "../../../../assets/index.json";

const propTypes = { listPath: PropType.string };
const Goals = ({ listPath }) => {
  return (
    Array.isArray(indexData?.[listPath]) &&
    indexData[listPath].map((key, index) => {
      return (
        key && (
          <p key={key.id || index}>
            <strong>{key.name || ""}</strong>
            {(!!key.description && `: ${key.description}`) || ""}
          </p>
        )
      );
    })
  );
};

Goals.propTypes = propTypes;
export default Goals;
