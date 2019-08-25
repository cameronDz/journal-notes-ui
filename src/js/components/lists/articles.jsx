import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Card from '../card';
import data from '../../../../assets/data/articles';
import * as _sorts from '../../libs/articleSorts';

const articles = () => {

  const [sortFunction, setSortFunction] = useState(() => _sorts.sortByTitle);

  const handleCreateClick = () => { setSortFunction(() => _sorts.sortByCreatedDate); };
  const handlePublishClick = () => { setSortFunction(() => _sorts.sortByPublishDate); };
  const handleTitleClick = () => { setSortFunction(() => _sorts.sortByTitle); };

  const renderData = () => {
    return data.sort(sortFunction).map((key, index) => {
      return (
        <Grid key={index} sm={12} md={6}>
          <Card articleData={key} />
        </Grid>);
    });
  };

  return (
    <Grid container spacing={0}>
      <Grid xs={12}>
        <Button onClick={() => handleTitleClick()} size="small">Order by Title</Button>
        <Button onClick={() => handleCreateClick()} size="small">Order by Created Date</Button>
        <Button onClick={() => handlePublishClick()} size="small">Order by Publish Date</Button>
      </Grid>
      {renderData()}
    </Grid>);
};

export default articles;
