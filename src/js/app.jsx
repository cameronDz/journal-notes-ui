import React from 'react';
import Grid from '@material-ui/core/Grid';
import InputSection from './components/sections/input';
import Article from './components/article';
import * as _sampleArticle from '../../assets/data/articles/1565825763336.json';

const app = () => {
  return (
    <Grid container spacing={0}>
      <Grid xs={12} sm={1}></Grid>
      <Grid xs={12} sm={10}>
        <InputSection />
      </Grid>
      <Grid xs={12} sm={1}></Grid>
      <Grid xs={12} sm={1}></Grid>
      <Grid xs={12} sm={10}>
        <Article {..._sampleArticle} />
      </Grid>
      <Grid xs={12} sm={1}></Grid>
    </Grid>);
};

export default app;
