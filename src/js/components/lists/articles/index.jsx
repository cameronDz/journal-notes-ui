import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import PropType from 'prop-types';
import get from 'lodash.get';

import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Switch from '@material-ui/core/Switch';

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
  const [sortFunction, setSortFunction] = useState(() => _sorts.sortByTitle);
  const [isLoading, setIsLoading] = useState(false);

  const [orderType, setOrderType] = useState('title');
  const [checkedTitle, setCheckedTitle] = useState(true);
  const [checkedPublishDate, setCheckedPublishDate] = useState(true);
  const [checkedCreatedDate, setCheckedCreatedDate] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  useEffect(() => {
    setIsLoading(!!loadingIndex || articlesLoading > 0);
  }, [articlesLoading, loadingIndex]);

  useEffect(() => {
    detemineSortOrder();
  }, [orderType, checkedCreatedDate, checkedPublishDate, checkedTitle]);

  const isArticleDisplayable = (article = null) => {
    return !!article && !!article.title && !!((!!article.comments && !!article.comments.length) || (!!article.quotes && !!article.quotes.length));
  };

  const detemineSortOrder = () => {
    if (orderType) {
      let newSort = null;
      if (orderType === 'title') {
        newSort = checkedTitle ? _sorts.sortByTitle : _sorts.sortByReverseTitle;
      } else if (orderType === 'createdDate') {
        newSort = checkedCreatedDate ? _sorts.sortByCreatedDate : _sorts.sortByReverseCreatedDate;
      } else if (orderType === 'publishDate') {
        newSort = checkedPublishDate ? _sorts.sortByPublishDate : _sorts.sortByReversePublishDate;
      }
      setSortFunction(() => newSort);
    }
  };

  const handleChangeOrderType = (event = {}) => {
    const newType = get(event, 'target.value', 'title');
    setOrderType(newType);
  };

  const handleChangeChecked = (value = '') => {
    if (value === 'checkedTitle') {
      setCheckedTitle(!checkedTitle);
    } else if (value === 'checkedCreatedDate') {
      setCheckedCreatedDate(!checkedCreatedDate);
    } else if (value === 'checkedPublishDate') {
      setCheckedPublishDate(!checkedPublishDate);
    }
  };

  const renderData = () => {
    return !isLoading && !!articles && articles.sort(sortFunction).map((key, index) => {
      return !!isArticleDisplayable(key) && (
        <Grid key={index} item sm={12} md={6}>
          <Card articleData={key} />
        </Grid>);
    });
  };

  const getSwitch = (keyName = '', checkName = '', checkValue = false) => {
    return ((!!keyName) && (!!checkName)) && (
      <Switch
        checked={((orderType === keyName) && (checkValue))}
        color={'primary'}
        disabled={(orderType !== keyName)}
        onChange={() => handleChangeChecked(checkName)}
        value={checkName}
      />);
  };

  const displayProgressBar = () => {
    return !!isLoading && (<LinearProgress />);
  };

  return (
    <Fragment>
      {displayProgressBar()}
      <Grid container spacing={0}>
        <div style={{ fontSize: '24px', fontWeight: '700', textAlign: 'center', width: '100%' }}>Articles List</div>
        <Grid item style={{ border: '3px solid ' + (isLoading ? '#767676' : '#3f51b5'), borderRadius: '8px', margin: '8px 24px', padding: '12px' }} sm={12}>
          <div style={{ fontSize: '20px', fontWeight: '700' }}>Sort Order</div>
          <FormControl>
            <RadioGroup
              name={'orderType'}
              style={{ marginRight: '16px' }}
              title={'Order Type'}
              value={orderType}
              onChange={handleChangeOrderType}
            >
              <FormControlLabel control={<Radio color={'primary'} />} disabled={isLoading} label={'Title'} value={'title'}/>
              <FormControlLabel control={<Radio color={'primary'} />} disabled={isLoading} label={'Created Date'} value={'createdDate'} />
              <FormControlLabel control={<Radio color={'primary'} />} disabled={isLoading} label={'Publish Date'} value={'publishDate'} />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormControlLabel
              control={getSwitch('title', 'checkedTitle', checkedTitle)}
              disabled={isLoading}
              label={orderType !== 'title' ? '' : checkedTitle ? 'Ascending' : 'Desending'}
              style={{ padding: '2px' }}
            />
            <FormControlLabel
              control={getSwitch('createdDate', 'checkedCreatedDate', checkedCreatedDate)}
              disabled={isLoading}
              label={orderType !== 'createdDate' ? '' : checkedCreatedDate ? 'Ascending' : 'Desending'}
              style={{ padding: '2px' }}
            />
            <FormControlLabel
              control={getSwitch('publishDate', 'checkedPublishDate', checkedPublishDate)}
              disabled={isLoading}
              label={orderType !== 'publishDate' ? '' : checkedPublishDate ? 'Ascending' : 'Desending'}
              style={{ padding: '2px' }}
            />
          </FormControl>
        </Grid>
        {renderData()}
      </Grid>
    </Fragment>);
};

articles.propTypes = propTypes;
const mapStateToProps = state => ({ articles: state.articles.list, articlesLoading: state.articles.articlesLoading, loadingIndex: state.articles.isLoadingIndex });
export default connect(mapStateToProps, { fetchArticles })(articles);
