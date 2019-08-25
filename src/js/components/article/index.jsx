import React, { useEffect, useState } from 'react';

const article = props => {

  // this may be a candidate for use redux
  const [author, setAuthor] = useState('');
  const [comments, setComments] = useState([]);
  const [createdDate, setCreatedDate] = useState('');
  const [description, setDescription] = useState('');
  const [publishDate, setPublishDate] = useState('');
  const [publisher, setPublisher] = useState('');
  const [quotes, setQuotes] = useState([]);
  const [tags, setTags] = useState([]);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    const { author, comments, createdDate, description, publishDate, publisher, quotes, tags, title, url } = props;
    console.log('props', props);
    setAuthor(author);
    setComments(comments);
    setCreatedDate(createdDate);
    setDescription(description);
    setPublishDate(publishDate);
    setPublisher(publisher);
    setQuotes(quotes);
    setTags(tags);
    setTitle(title);
    setUrl(url);
  }, []);

  const renderTags = () => {
    const includeComma = index => { return (index !== tags.length -1) ? ', ' : ''};
    return !!tags.length
      ? tags.map((key, index) => { return <i key={index}>{key}{includeComma(index)}</i> })
      : <i>No associated tags.</i>;
  };

  const renderArrayConent = (array = [], identifier = '') => {
    const bullet = <span>&#8226;</span>;
    return !! (!!identifier && !!array.length)
      ? array.map((key = {}, index) => { return <div key={index}>{bullet} {key[identifier]}</div> })
      : "No content."
  };

  const renderArray = (array = [], identifier = '', title = '')  => {
    const header = <strong style={{'font-size':'16px'}}>{title}</strong>;
    return (
      <React.Fragment>
        <div>{header}</div>
        {renderArrayConent(array, identifier)}
      </React.Fragment>);
  };

  return (
    <React.Fragment>
      <div style={{'font-size':'24px'}}>{title}</div>
      <div style={{'font-size':'12px'}}>{author}, <i>Source</i>: <a href={url}>{publisher}</a>. ({publishDate})</div>
      <div style={{'font-size':'18px'}}>{description}</div>
      <p>{renderArray(quotes, 'quote', "Quotes")}</p>
      <p>{renderArray(comments, 'comment', "Comments")}</p>
      <p><strong>Tags</strong>: {renderTags()}</p>
      <p><strong>Resource added</strong>: <i>{createdDate}</i></p>
    </React.Fragment>);
};

export default article;
