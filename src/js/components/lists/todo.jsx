import React from 'react';
import get from 'lodash.get';
import * as indexData from '../../../../assets/data/index.json';

const todo = () => {

  const renderTodo = (todo = {}) => {
    const { name, status } = todo;
    return (<p>{name}, {status}</p>);
  };

  const renderList = (baseList = []) => {
    return baseList.map((key, index) => {
      const { list, name, status, type } = key;
      return (type === 2)
        // render a list when type is 2
        ? <React.Fragment key={index}>
            <h3>{name}</h3>
            <p>Status: {status}</p>
            {renderList(list)}
          </React.Fragment>
        // render all other types as todo
        : <React.Fragment key={index}>
            {renderTodo(key)}
          </React.Fragment>;
    });
  };

  const renderTodoList = () => {
    const list = get(indexData, 'todo.list', []);
    return renderList(list);
  };
  
  return renderTodoList();
};

export default todo;
