import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Card from '../../card';
import * as _sorts from '../../../libs/articleSorts';

const articles = () => {
  const SORT_TITLE = 1;
  const SORT_CREATE_DATE = 2;
  const SORT_PUBLISH_DATE = 3;
  const SORT_TITLE_REVERSE = 4;
  const SORT_CREATE_DATE_REVERSE = 5;
  const SORT_PUBLISH_DATE_REVERSE = 6;

  const config = { header: { 'Content-Type': 'application/json' } };
  const baseUrl = 'https://log-notes-assets.s3.amazonaws.com/';

  const [articles, setArticles] = useState([]);
  const [sortFunction, setSortFunction] = useState(() => _sorts.sortByTitle);
  const [currentSortOrder, setCurrentSortOrder] = useState(SORT_TITLE);

  useEffect(() => {
    const url = baseUrl + 'index.json';
    axios.get(url, config)
      .then(payload => { processIndexPayload(payload) })
      .catch(error => { console.error(error); });
  }, []);

  const processIndexPayload = payload => {
    const { list } = payload.data;
    for (let inc = 0; inc < list.length; inc++) {
      const url = baseUrl + list[inc] + '.json';
      axios.get(url, config)
        .then(payload => { setArticles([...articles, payload.data]); })
        .catch(error => { console.error(error); });
    }
  };

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
        console.error('Invalid sort order selected, not sorting list.');
        setSortFunction(undefined);
        setCurrentSortOrder(undefined);
    };
  };

  const renderData = () => {
    return articles.sort(sortFunction).map((key, index) => {
      return (
        <Grid key={index} item sm={12} md={6}>
          <Card articleData={key} />
        </Grid>);
    });
  };

  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <Button onClick={() => handleSortClick(SORT_TITLE)} size="small">Order by Title</Button>
        <Button onClick={() => handleSortClick(SORT_CREATE_DATE)} size="small">Order by Created Date</Button>
        <Button onClick={() => handleSortClick(SORT_PUBLISH_DATE)} size="small">Order by Publish Date</Button>
      </Grid>
      {renderData()}
    </Grid>);
};

export default articles;
