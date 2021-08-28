import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropType from "prop-types";
import { Box, Grid, LinearProgress, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Panel from "./panel";
import InputSection from "./input";
import LandingSeciton from "./landing";
import ArticleSection from "../lists/articles";

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
  page: PropType.string,
};

const NavTabs = ({
  articlesLoadingCount,
  isArticleIndexLoading,
  isInputIndexLoading,
  isProcessingArticle,
  isProcessingIndex,
  page,
}) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let newValue = 0;
    if (page === "search" || page === "view") {
      newValue = 1;
    } else if (page === "create") {
      newValue = 2;
    }
    setValue(newValue);
  }, [page]);

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

  const displayProgressBar = () => {
    return isLoading ? (
      <LinearProgress style={{ minHeight: "8px", paddingTop: "1px" }} />
    ) : (
      <div style={{ minHeight: "8px" }}></div>
    );
  };

  return (
    <div className={classes.root}>
      {displayProgressBar()}
      <Grid
        container
        spacing={0}
        style={{ maxWidth: "1440px", margin: "auto" }}
      >
        <Grid item xs={12} sm={12}>
          <Panel value={value} index={0}>
            <LandingSeciton />
          </Panel>
          <Panel value={value} index={1}>
            <ArticleSection />
          </Panel>
          <Panel value={value} index={2}>
            <InputSection />
          </Panel>
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
