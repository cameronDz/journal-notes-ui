import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropType from "prop-types";
import {
  AppBar,
  Box,
  Grid,
  LinearProgress,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import InputSection from "./input";
import LandingSeciton from "./landing";
import ArticleSection from "../lists/articles";

// example added from https://material-ui.com/components/tabs/
function TabPanel({ children, value, index, ...other }) {
  return (
    <Typography
      aria-labelledby={`nav-tab-${index}`}
      component="div"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      role="tabpanel"
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropType.node,
  index: PropType.any.isRequired,
  value: PropType.any.isRequired,
};

function LinkTab(props) {
  return (
    <Tab component="a" onClick={(event) => event.preventDefault()} {...props} />
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

const propTypes = {
  articlesLoadingCount: PropType.number,
  isArticleIndexLoading: PropType.bool,
  isInputIndexLoading: PropType.bool,
  isProcessingArticle: PropType.bool,
  isProcessingIndex: PropType.bool,
};

const NavTabs = ({
  articlesLoadingCount,
  isArticleIndexLoading,
  isInputIndexLoading,
  isProcessingArticle,
  isProcessingIndex,
}) => {
  const classes = useStyles();

  const [value, setValue] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(
      isArticleIndexLoading ||
        isInputIndexLoading ||
        isProcessingArticle ||
        isProcessingIndex ||
        articlesLoadingCount > 0
    );
  }, [
    articlesLoadingCount,
    isArticleIndexLoading,
    isInputIndexLoading,
    isProcessingArticle,
    isProcessingIndex,
  ]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const displayProgressBar = () => {
    return isLoading ? (
      <LinearProgress style={{ minHeight: "8px", paddingTop: "1px" }} />
    ) : (
      <div style={{ minHeight: "8px" }}></div>
    );
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Grid
          container
          spacing={0}
          style={{ maxWidth: "1440px", margin: "auto", textAlign: "center" }}
        >
          <Grid item xs={12} sm={1}></Grid>
          <Grid item xs={12} sm={10}>
            <Tabs
              aria-label="nav tabs example"
              onChange={handleChange}
              value={value}
              variant="fullWidth"
            >
              <LinkTab label="Overview" />
              <LinkTab label="Articles" />
              <LinkTab label="Input" />
            </Tabs>
          </Grid>
          <Grid item xs={12} sm={1}></Grid>
        </Grid>
      </AppBar>
      {displayProgressBar()}
      <Grid
        container
        spacing={0}
        style={{ maxWidth: "1440px", margin: "auto" }}
      >
        <Grid item xs={12} sm={12}>
          <TabPanel value={value} index={0}>
            <LandingSeciton />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <ArticleSection />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <InputSection />
          </TabPanel>
        </Grid>
      </Grid>
    </div>
  );
};

NavTabs.propTypes = propTypes;
const mapStateToProps = (state) => ({
  articlesLoadingCount: state.articles.articlesLoading,
  isArticleIndexLoading: state.articles.isLoadingIndex,
  isInputIndexLoading: state.input.isLoadingIndex,
  isProcessingArticle: state.input.isProcessingArticle,
  isProcessingIndex: state.input.isProcessingIndex,
});
export default connect(mapStateToProps)(NavTabs);
