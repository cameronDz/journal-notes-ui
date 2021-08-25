import React from "react";
import * as indexData from "../../../../assets/index.json";

const Goals = ({ listPath }) => {

  const getList = () => {
    const list = indexData?.[listPath] || [];
    return list?.map((key, index) => {
      const { description, id, name } = key;
      const includedDescription = !!description && ": " + description;
      return (
        <p key={id || index}>
          <strong>{name}</strong>
          {includedDescription}
        </p>
      );
    });
  };

  return getList();
};

export default Goals;
