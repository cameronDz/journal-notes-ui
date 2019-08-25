import React from 'react';
import Grid from '@material-ui/core/Grid';
import NavTabs from './components/sections/tabs';

const app = () => {
  return (
    <Grid container spacing={0}>
      <Grid xs={12} sm={1}></Grid>
      <Grid xs={12} sm={10}>
        <NavTabs />
      </Grid>
      <Grid xs={12} sm={1}></Grid>
    </Grid>);
};

export default app;
