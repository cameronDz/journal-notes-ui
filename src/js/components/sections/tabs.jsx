import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import InputSection from './input';
import LandingSeciton from './landing';
import ArticleSection from '../lists/articles';

// example added from https://material-ui.com/components/tabs/
function TabPanel ({ children, value, index, ...other }) {
  return (
    <Typography aria-labelledby={`nav-tab-${index}`}
      component="div"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      role="tabpanel"
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>);
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function LinkTab (props) {
  return (
    <Tab
      component="a"
      onClick={event => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
}));

export default function NavTabs () {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange (event, newValue) {
    setValue(newValue);
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs aria-label="nav tabs example"
          onChange={handleChange}
          value={value}
          variant="fullWidth"
        >
          <LinkTab label="Overview" />
          <LinkTab label="Articles" />
          <LinkTab label="Input" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <LandingSeciton />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ArticleSection />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <InputSection />
      </TabPanel>
    </div>
  );
}
