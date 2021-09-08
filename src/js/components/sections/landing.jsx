import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import PropType from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import ArticleCard from "../articleCard";
import RouteTitle from "./routeTitle";
import { latestArticle } from "../../libs/latestArticle";
import { landingText } from "../../libs/text";
import { landingStyles } from "./styles";

const propTypes = {
  articles: PropType.array,
  articlesLoading: PropType.number,
  loadingIndex: PropType.bool,
  title: PropType.string,
};
const useStyles = makeStyles(() => landingStyles);
const Landing = ({ articles, articlesLoading, loadingIndex, title }) => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(!!loadingIndex || articlesLoading > 0);
  }, [articlesLoading, loadingIndex]);

  const displayArticle = (article) => {
    return !!article && <ArticleCard articleData={article} />;
  };

  const displayText = (text) => {
    return (
      <span className={classNames(classes?.simpleLandingText)}>{text}</span>
    );
  };

  const displayLatestCardSection = () => {
    const text = isLoading ? landingText.loading : landingText.noArticles;
    const article = latestArticle(articles);
    return !isLoading && !!article
      ? displayArticle(article)
      : displayText(text);
  };

  return (
    <Fragment>
      <RouteTitle title={title} />
      <div>{landingText.overview}</div>
      <div>{displayLatestCardSection()}</div>
    </Fragment>
  );
};

Landing.propTypes = propTypes;
const mapStateToProps = (state) => ({
  articles: state.articles.list,
  articlesLoading: state.articles.articlesLoading,
  loadingIndex: state.articles.isLoadingIndex,
});
export default connect(mapStateToProps, {})(Landing);
