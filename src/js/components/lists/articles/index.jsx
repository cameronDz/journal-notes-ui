import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import PropType from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';

import Card from '../../card';
import { fetchArticles } from './state/actions';
import * as _sorts from '../../../libs/articleSorts';

const propTypes = {
  articles: PropType.array,
  articlesLoading: PropType.number,
  fetchArticles: PropType.func,
  loadingIndex: PropType.bool
};

const articles = ({ articles, articlesLoading, fetchArticles, loadingIndex }) => {
  const SORT_TITLE = 1;
  const SORT_CREATE_DATE = 2;
  const SORT_PUBLISH_DATE = 3;
  const SORT_TITLE_REVERSE = 4;
  const SORT_CREATE_DATE_REVERSE = 5;
  const SORT_PUBLISH_DATE_REVERSE = 6;

  const defaultButtonStyles = { marginRight: '12px' };
  const selectedButtonStyles = { ...defaultButtonStyles, backgroundColor: 'lightgrey' };
  const defaultTriangleStyles = { height: '18px', marginLeft: '12px' };
  const reverseTriangleStyles = { ...defaultTriangleStyles, transform: 'rotate(180deg)' };

  const [sortFunction, setSortFunction] = useState(() => _sorts.sortByTitle);
  const [currentSortOrder, setCurrentSortOrder] = useState(SORT_TITLE);
  const [isLoading, setIsLoading] = useState(false);

  const [titleStyle, setTitleStyle] = useState(selectedButtonStyles);
  const [createdDateStyle, setCreatedDateStyle] = useState(defaultButtonStyles);
  const [publishedDateStyle, setPublishedDateStyle] = useState(defaultButtonStyles);
  const [triangleStyle, setTriangleStyle] = useState(defaultTriangleStyles);

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
          setTriangleStyle(defaultTriangleStyles);
        } else {
          setSortFunction(() => _sorts.sortByReverseTitle);
          setCurrentSortOrder(SORT_TITLE_REVERSE);
          setTriangleStyle(reverseTriangleStyles);
        }
        setTitleStyle(selectedButtonStyles);
        setCreatedDateStyle(defaultButtonStyles);
        setPublishedDateStyle(defaultButtonStyles);
        break;
      case (SORT_CREATE_DATE):
        if (currentSortOrder !== SORT_CREATE_DATE) {
          setSortFunction(() => _sorts.sortByCreatedDate);
          setCurrentSortOrder(SORT_CREATE_DATE);
          setTriangleStyle(defaultTriangleStyles);
        } else {
          setSortFunction(() => _sorts.sortByReverseCreatedDate);
          setCurrentSortOrder(SORT_CREATE_DATE_REVERSE);
          setTriangleStyle(reverseTriangleStyles);
        }
        setTitleStyle(defaultButtonStyles);
        setCreatedDateStyle(selectedButtonStyles);
        setPublishedDateStyle(defaultButtonStyles);
        break;
      case (SORT_PUBLISH_DATE):
        if (currentSortOrder !== SORT_PUBLISH_DATE) {
          setSortFunction(() => _sorts.sortByPublishDate);
          setCurrentSortOrder(SORT_PUBLISH_DATE);
          setTriangleStyle(defaultTriangleStyles);
        } else {
          setSortFunction(() => _sorts.sortByReversePublishDate);
          setCurrentSortOrder(SORT_PUBLISH_DATE_REVERSE);
          setTriangleStyle(reverseTriangleStyles);
        }
        setTitleStyle(defaultButtonStyles);
        setCreatedDateStyle(defaultButtonStyles);
        setPublishedDateStyle(selectedButtonStyles);
        break;
      default:
        setSortFunction(null);
        setCurrentSortOrder(null);
        setTitleStyle(defaultButtonStyles);
        setCreatedDateStyle(defaultButtonStyles);
        setPublishedDateStyle(defaultButtonStyles);
        setTriangleStyle(defaultTriangleStyles);
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

  const sortTriangle = <img src="images/black-sort-triangle.png" style={triangleStyle}></img>;

  return (
    <Fragment>
      {displayProgressBar()}

      <Grid container spacing={0}>
        <Grid item style={{ marginTop: '8px' }} sm={12}>
          <span style={{ fontWeight: 600, marginRight: '12px' }}>{'Order by: '}</span>
          <Button style={titleStyle} onClick={() => handleSortClick(SORT_TITLE)} size="small">
            Title
            {(currentSortOrder === SORT_TITLE || currentSortOrder === SORT_TITLE_REVERSE) && sortTriangle}
          </Button>
          <Button style={createdDateStyle} onClick={() => handleSortClick(SORT_CREATE_DATE)} size="small">
            Created Date
            {(currentSortOrder === SORT_CREATE_DATE || currentSortOrder === SORT_CREATE_DATE_REVERSE) && sortTriangle}
          </Button>
          <Button style={publishedDateStyle} onClick={() => handleSortClick(SORT_PUBLISH_DATE)} size="small">
            Publish Date
            {(currentSortOrder === SORT_PUBLISH_DATE || currentSortOrder === SORT_PUBLISH_DATE_REVERSE) && sortTriangle}
          </Button>
        </Grid>
        {renderData()}
      </Grid>
    </Fragment>);
};

articles.propTypes = propTypes;
const mapStateToProps = state => ({ articles: state.articles.list, articlesLoading: state.articles.articlesLoading, loadingIndex: state.articles.isLoadingIndex });
export default connect(mapStateToProps, { fetchArticles })(articles);
