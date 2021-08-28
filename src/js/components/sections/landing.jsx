import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import PropType from "prop-types";
import Card from "../card";
import { latestArticle } from "../../libs/latestArticle";
import { landingText } from "../../libs/text";

const propTypes = {
  articles: PropType.array,
  articlesLoading: PropType.number,
  loadingIndex: PropType.bool,
};

const Landing = ({ articles, articlesLoading, loadingIndex }) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(!!loadingIndex || articlesLoading > 0);
  }, [articlesLoading, loadingIndex]);

  const displayArticle = (article) => {
    return !!article && <Card articleData={article} />;
  };

  const displayText = (text) => {
    return <span style={{ fontSize: "14px", fontWeight: 600 }}>{text}</span>;
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
      <h2 style={{ alignItems: "center", justifyContent: "center" }}>
        {landingText.header}
      </h2>
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
