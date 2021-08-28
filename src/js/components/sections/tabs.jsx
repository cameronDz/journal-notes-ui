import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import PropType from "prop-types";
import { Grid, LinearProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Panel from "./panel";
import InputSection from "./input";
import LandingSeciton from "./landing";
import ArticleSection from "../lists/articles";
import { contentStyles } from "./styles";

const useStyles = makeStyles((theme) => contentStyles);

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
      <LinearProgress
        className={classNames(classes?.contentTop, classes?.contentLoader)}
      />
    ) : (
      <div className={classNames(classes?.contentTop)}></div>
    );
  };

  return (
    <div className={classNames(classes?.contentRoot)}>
      {displayProgressBar()}
      <Grid className="nssd-grid-wrapper" container spacing={0}>
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
