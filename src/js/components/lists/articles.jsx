import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '../card';
import data from '../../../../assets/data/articles';

const articles = () => {
  const renderData = () => {
    return data.map((key, index) => {
      return (
        <Grid key={index} sm={12} md={6}>
          <Card articleData={key} />
        </Grid>);
    });
  };

  return (
    <Grid container spacing={0}>
      {renderData()}
    </Grid>);
};

export default articles;
