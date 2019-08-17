import React from 'react';
import Grid from '@material-ui/core/Grid';
import InputSection from './components/sections/input';

const app = () => {
  return (
    <Grid container spacing={0}>
      <Grid xs={12} sm={1}></Grid>
      <Grid xs={12} sm={10}>
        <InputSection />
      </Grid>
      <Grid xs={12} sm={1}></Grid>
    </Grid>);
};

export default app;
