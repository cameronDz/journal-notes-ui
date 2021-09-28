import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import PropType from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import ArticleCard from "../../components/displays/articleCard";
import { latestArticle } from "../../libs/latestArticle";
import { landingText } from "../../libs/text";
import { landingStyles } from "../styles";

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

  const displayLatestCardSection = () => {
    const text = isLoading ? landingText.loading : landingText.noArticles;
    const article = latestArticle(articles);
    return !isLoading && !!article ? (
      <ArticleCard articleData={article} />
    ) : (
      <span className={classNames(classes?.simpleLandingText)}>{text}</span>
    );
  };

  return (
    <Fragment>
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
