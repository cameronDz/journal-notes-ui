import React, { useEffect, useState } from "react";
import classNames from "classnames";
import PropType from "prop-types";
import { connect } from "react-redux";
import { Switch as RouterSwitch, Route } from "react-router-dom";
import { Grid, LinearProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ArticleSection from "../../components/lists/articles";
import InputSection from "../editor";
import LandingSeciton from "../landing/landing";
import Panel from "./panel";
import { contentStyles } from "../styles";

const pages = [
  {
    name: "home",
    title: "Article Overview",
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

  return (
    <div className={classNames(classes?.contentRoot)}>
      {displayProgressBar()}
      <Grid className="nssd-grid-wrapper" container spacing={0}>
        <Grid item xs={12} sm={12}>
          <Panel index={"empty"} value={"empty"}>
            <RouterSwitch>
              <Route exact path="/">
                <LandingSeciton title={pages[0].title} />
              </Route>
              <Route exact path={`/${pages[0].name}`}>
                <LandingSeciton title={pages[0].title} />
              </Route>
              <Route exact path={`/${pages[1].name}`}>
                <ArticleSection
                  pageName={pages[1].name}
                  title={pages[1].title}
                />
              </Route>
              <Route exact path={`/${pages[2].name}`}>
                <ArticleSection
                  pageName={pages[2].name}
                  title={pages[2].title}
                />
              </Route>
              <Route exact path={`/${pages[3].name}`}>
                <InputSection pageTitle={pages[3].title} />
              </Route>
            </RouterSwitch>
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
