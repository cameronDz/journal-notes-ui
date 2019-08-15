import React from 'react';
import Grid from '@material-ui/core/Grid';
import GridSection from './components/sections/grid';
import InputSection from './components/sections/input';
import TodoList from './components/lists/todo';
import GoalsList from './components/lists/goals';

const app = () => {
  const augmentedGoalList = <GoalsList listPath='goals.software.augmented.list' />;
  const fitnessGoalList = <GoalsList listPath='goals.fitness.list' />;
  const raspberryPiGoalList = <GoalsList listPath='goals.software.raspberryPi.list' />;
  const todoList = <TodoList />;

  return (
    <Grid container spacing={0}>
      <React.Fragment>
        <Grid xs={12} sm={1}></Grid>
        <Grid xs={12} sm={10}>
          <InputSection />
        </Grid>
        <Grid xs={12} sm={1}></Grid>
      </React.Fragment>
      <React.Fragment>
        <GridSection section={raspberryPiGoalList} title='Software Raspberry Pi Goals' />
        <GridSection section={fitnessGoalList} title='Fitness Goals' />
        <GridSection section={augmentedGoalList} title='Software Augmented Goals' />
        <Grid xs={12} sm={4}></Grid>
        <GridSection section={todoList} title='TODO List' />
        <Grid xs={12} sm={4}></Grid>
      </React.Fragment>
    </Grid>);
};

export default app;
