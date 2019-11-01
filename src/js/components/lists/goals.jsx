import React, { useEffect, useState } from 'react';
import get from 'lodash.get';
import * as indexData from '../../../../assets/index.json';

const goals = props => {
  const [listPath, setListPath] = useState('');

  useEffect(() => {
    setListPath(props.listPath);
  }, []);

  const getList = () => {
    const list = get(indexData, listPath, []);
    return list.map((key, index) => {
      const { description, name } = key;
      const includedDescription = (!!description) && ': ' + description;
      return (
        <p key={index}>
          <strong>{name}</strong>{includedDescription}
        </p>);
    });
  };

  return getList();
};

export default goals;
