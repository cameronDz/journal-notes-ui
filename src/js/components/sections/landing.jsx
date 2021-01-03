import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import PropType from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';
import Card from '../card';

const propTypes = {
  articles: PropType.array,
  articlesLoading: PropType.number,
  loadingIndex: PropType.bool
};

const landing = ({ articles, articlesLoading, loadingIndex }) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(!!loadingIndex || articlesLoading > 0);
  }, [articlesLoading, loadingIndex]);

  const displayLatestArticle = () => {
    const latestArticle = articles.reduce((prev, curr) => {
      let isPrevGreater = false;
      if ((!!prev) && (!curr)) {
        isPrevGreater = true;
      } else if ((!prev) && (!!curr)) {
        isPrevGreater = false;
      } else {
        if ((!!prev.createdDate) && (!curr.createdDate)) {
          isPrevGreater = true;
        } else if ((!prev.createdDate) && (!!curr.createdDate)) {
          isPrevGreater = false;
        } else {
          isPrevGreater = new Date(prev.createdDate) > new Date(curr.createdDate);
        }
      }
      return isPrevGreater ? prev : curr;
    });
    return latestArticle && <Card articleData={latestArticle} />;
  };

  const displayLatestCardSection = () => {
    return isLoading
      ? <span style={{ fontSize: '14px', fontWeight: 600 }}>Loading latest articles for preview.</span>
      : ((!!articles) && (articles.length > 0))
        ? displayLatestArticle()
        : <span style={{ fontSize: '14px', fontWeight: 600 }}>No articles found to display.</span>;
  };

  const displayProgressBar = () => {
    return !!isLoading && (<LinearProgress />);
  };

  return (
    <Fragment>
      {displayProgressBar()}
      <h2 style={{ alignItems: 'center', justifyContent: 'center' }}>
        Article Overview Application
      </h2>
      <div>
        Purpose of this application is to find articles that have been read, and create snippets/overviews of articles as well.
      </div>
      <div>
        {displayLatestCardSection()}
      </div>
    </Fragment>);
};

landing.propTypes = propTypes;
const mapStateToProps = state => ({ articles: state.articles.list, articlesLoading: state.articles.articlesLoading, loadingIndex: state.articles.isLoadingIndex });
export default connect(mapStateToProps, {})(landing);
