import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Switch as RouterSwitch, Route } from "react-router-dom";
import classNames from "classnames";
import PropType from "prop-types";
import { Grid, LinearProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import InputSection from "./input";
import LandingSeciton from "./landing";
import ArticleSection from "../lists/articles";
import { contentStyles } from "./styles";

const pages = [
  {
    name: "home",
    title: "Article Overview Application",
    index: 0,
  },
  {
    name: "view",
    title: "Articles List",
    index: 1,
  },
  {
    name: "search",
    title: "Articles Card with Filters",
    index: 2,
  },
  {
    name: "create",
    title: "Article Review Creator",
    index: 3,
  },
];

const propTypes = {
  articlesLoadingCount: PropType.number,
  isArticleIndexLoading: PropType.bool,
  isInputIndexLoading: PropType.bool,
  isProcessingArticle: PropType.bool,
  isProcessingIndex: PropType.bool,
};
const useStyles = makeStyles(() => contentStyles);
const NavTabs = ({
  articlesLoadingCount,
  isArticleIndexLoading,
  isInputIndexLoading,
  isProcessingArticle,
  isProcessingIndex,
}) => {
  const classes = useStyles();
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

  const displayProgressBar = () => {
    return isLoading ? (
      <LinearProgress
        className={classNames(classes?.contentTop, classes?.contentLoader)}
      />
    ) : (
      <div className={classNames(classes?.contentTop)}></div>
    );
  };

  const showTitle = (title) => {
    return (
      <div className={classNames(classes?.panelHeader)}>
        <h2>{title}</h2>
      </div>
    );
  };

  return (
    <div className={classNames(classes?.contentRoot)}>
      {displayProgressBar()}
      <Grid className="nssd-grid-wrapper" container spacing={0}>
        <Grid item xs={12} sm={12}>
          <RouterSwitch>
            <Route path="/">
              {showTitle(pages[0].title)}
              <LandingSeciton />
            </Route>
            <Route path="/home">
              {showTitle(pages[0].title)}
              <LandingSeciton />
            </Route>
            <Route path="/view">
              {showTitle(pages[1].title)}
              <ArticleSection pageName={page} />
            </Route>
            <Route path="/search">
              {showTitle(pages[1].title)}
              <ArticleSection pageName={page} />
            </Route>
            <Route path="/create">
              {showTitle(pages[2].title)}
              <InputSection />
            </Route>
          </RouterSwitch>
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
