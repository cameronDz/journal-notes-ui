import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import PropType from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';

import Card from '../../card';
import * as _sorts from '../../../libs/articleSorts';
import { fetchArticles } from './state/actions';

const propTypes = {
  articles: PropType.array,
  fetchArticles: PropType.func
};

const articles = ({ articles, articlesLoading, fetchArticles, loadingIndex }) => {
  const SORT_TITLE = 1;
  const SORT_CREATE_DATE = 2;
  const SORT_PUBLISH_DATE = 3;
  const SORT_TITLE_REVERSE = 4;
  const SORT_CREATE_DATE_REVERSE = 5;
  const SORT_PUBLISH_DATE_REVERSE = 6;

  const [sortFunction, setSortFunction] = useState(() => _sorts.sortByTitle);
  const [currentSortOrder, setCurrentSortOrder] = useState(SORT_TITLE);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchArticles();
  }, []);

  useEffect(() => {
    setIsLoading(!!loadingIndex || articlesLoading > 0);
  }, [articlesLoading, loadingIndex]);

  const handleSortClick = (sortOrder = -1) => {
    switch (sortOrder) {
      case (SORT_TITLE):
        if (currentSortOrder !== SORT_TITLE) {
          setSortFunction(() => _sorts.sortByTitle);
          setCurrentSortOrder(SORT_TITLE);
        } else {
          setSortFunction(() => _sorts.sortByReverseTitle);
          setCurrentSortOrder(SORT_TITLE_REVERSE);
        }
        break;
      case (SORT_CREATE_DATE):
        if (currentSortOrder !== SORT_CREATE_DATE) {
          setSortFunction(() => _sorts.sortByCreatedDate);
          setCurrentSortOrder(SORT_CREATE_DATE);
        } else {
          setSortFunction(() => _sorts.sortByReverseCreatedDate);
          setCurrentSortOrder(SORT_CREATE_DATE_REVERSE);
        }
        break;
      case (SORT_PUBLISH_DATE):
        if (currentSortOrder !== SORT_PUBLISH_DATE) {
          setSortFunction(() => _sorts.sortByPublishDate);
          setCurrentSortOrder(SORT_PUBLISH_DATE);
        } else {
          setSortFunction(() => _sorts.sortByReversePublishDate);
          setCurrentSortOrder(SORT_PUBLISH_DATE_REVERSE);
        }
        break;
      default:
        console.log('Invalid sort order selected, not sorting list.');
        setSortFunction(null);
        setCurrentSortOrder(null);
    };
  };

  const isArticleDisplayable = (article = null) => {
    return !!article && !!article.title && !!((!!article.comments && !!article.comments.length) || (!!article.quotes && !!article.quotes.length));
  };

  const renderData = () => {
    return !isLoading && !!articles && articles.sort(sortFunction).map((key, index) => {
      return !!isArticleDisplayable(key) && (
        <Grid key={index} item sm={12} md={6}>
          <Card articleData={key} />
        </Grid>);
    });
  };

  const displayProgressBar = () => {
    return !!isLoading && (<LinearProgress />);
  };

  return (
    <Fragment>
    {displayProgressBar()}

    <Grid container  spacing={0}>
      <Grid item sm={12}>
        <Button onClick={() => handleSortClick(SORT_TITLE)} size="small">Order by Title</Button>
        <Button onClick={() => handleSortClick(SORT_CREATE_DATE)} size="small">Order by Created Date</Button>
        <Button onClick={() => handleSortClick(SORT_PUBLISH_DATE)} size="small">Order by Publish Date</Button>
      </Grid>
      {renderData()}
    </Grid>
    </Fragment>);
};

articles.propTypes = propTypes;
const mapStateToProps = state => ({ articles: state.articles.list, articlesLoading: state.articles.articlesLoading, loadingIndex: state.articles.isLoadingIndex });
export default connect(mapStateToProps, { fetchArticles })(articles);
