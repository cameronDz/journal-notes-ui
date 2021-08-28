import React, { Fragment } from "react";
import * as indexData from "../../../../assets/index.json";

const Todo = () => {
  const renderList = (baseList = []) => {
    return baseList.map((key, index) => {
      const { id, list, name, status, type } = key;
      return type === 2 ? (
        // render a list when type is 2
        <Fragment key={id || index}>
          <h3>{name}</h3>
          <p>{`Status: ${status}`}</p>
          {renderList(list)}
        </Fragment>
      ) : (
        // render all other types as todo
        <Fragment key={id || index}>
          <p>{`${name}, ${status}`}</p>
        </Fragment>
      );
    });
  };

  return renderList(indexData?.todo?.list || []);
};

export default Todo;
