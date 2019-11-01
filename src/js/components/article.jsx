import React, { Fragment, useEffect, useState } from 'react';
import PropType from 'prop-types';

const propTypes = {
  author: PropType.string,
  comments: PropType.array,
  createdDate: PropType.string,
  description: PropType.string,
  publishDate: PropType.string,
  publisher: PropType.string,
  quotes: PropType.array,
  showFull: PropType.bool,
  tags: PropType.array,
  title: PropType.string,
  url: PropType.string
};

const article = props => {
  // this may be a candidate for use redux
  const [author, setAuthor] = useState('');
  const [comments, setComments] = useState([]);
  const [createdDate, setCreatedDate] = useState('');
  const [description, setDescription] = useState('');
  const [publishDate, setPublishDate] = useState('');
  const [publisher, setPublisher] = useState('');
  const [quotes, setQuotes] = useState([]);
  const [showFull, setShowFull] = useState(false);
  const [tags, setTags] = useState([]);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    const { author, comments, createdDate, description, publishDate, publisher, quotes, showFull, tags, title, url } = props;
    setAuthor(author);
    setComments(comments);
    setCreatedDate(createdDate);
    setDescription(description);
    setPublishDate(publishDate);
    setPublisher(publisher);
    setQuotes(quotes);
    setShowFull(showFull);
    setTags(tags);
    setTitle(title);
    setUrl(url);
  }, [props]);

  const renderTags = () => {
    const includeComma = index => { return (index !== tags.length - 1) ? ', ' : ''; };
    return tags.length
      ? tags.map((key, index) => { return <i key={index}>{key}{includeComma(index)}</i>; })
      : <i>No associated tags.</i>;
  };

  const renderArrayConent = (array = [], identifier = '') => {
    const bullet = <span>&#8226;</span>;
    return !!identifier && !!array.length
      ? array.map((key = {}, index) => { return <div key={index}>{bullet} {key[identifier]}</div>; })
      : 'No content.';
  };

  const renderArray = (array = [], identifier = '', title = '') => {
    const header = <strong style={{ fontSize: '16px' }}>{title}</strong>;
    return (
      <Fragment>
        <div>{header}</div>
        {renderArrayConent(array, identifier)}
      </Fragment>);
  };

  const renderTopSection = () => {
    return (
      <Fragment>
        <div style={{ fontSize: '24px' }}>{title}</div>
        <div style={{ fontSize: '12px' }}>{author}, <i>Source</i>: <a href={url}>{publisher}</a>. ({publishDate})</div>
        <div style={{ fontSize: '18px' }}>{description}</div>
      </Fragment>);
  };

  const renderBottomSection = () => {
    return !!showFull && (
      <Fragment>
        <br/>
        <div>{renderArray(quotes, 'quote', 'Quotes')}</div>
        <br/>
        <div>{renderArray(comments, 'comment', 'Comments')}</div>
        <p><strong>Tags</strong>: {renderTags()}</p>
        <p><strong>Resource added</strong>: <i>{createdDate}</i></p>
      </Fragment>);
  };

  return (
    <Fragment>
      {renderTopSection()}
      {renderBottomSection()}
    </Fragment>);
};

article.propTypes = propTypes;
export default article;
