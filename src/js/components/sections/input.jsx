import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { downloadJson } from '../../libs/download';

const input = () => {

  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [publishDate, setPublishDate] = useState('');
  const [publisher, setPublisher] = useState('');
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [quote, setQuote] = useState('');
  const [quotes, setQuotes] = useState([]);
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState([]);

  const [payload, setPayload] = useState('');

  const getLocalDateString = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() < 9) ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
    const day = (date.getDate() < 9) ? "0" + date.getDate() : date.getDate();
    return year + '-' + month + '-' + day;
  };

  const handleCreateClick = () => {
    handleAddComment();
    handleAddQuote();
    handleAddTag();
    const obj = { author, comments, description, publishDate, publisher, quotes, tags, title, url, "createdDate": getLocalDateString() };
    downloadJson(obj);
    setPayload(JSON.stringify(obj));
  };

  const handleAddComment = () => {
    if (!!comment) {
      setComments([...comments, { comment, "createdDate": getLocalDateString() }]);
      setComment('');
    }
  };

  const handleAddQuote = () => {
    if (!!quote) {
      setQuotes([...quotes, { quote, "createdDate": getLocalDateString() }]);
      setQuote('');
    }
  };

  const handleAddTag = () => {
    if (!!tag) {
      setTags([...tags, tag]);
      setTag('');
    }
  };

  const handleRemoveComment = () => { setComments([...comments.splice(0, comments.length-1)]); };
  const handleRemoveQuote = () => { setQuotes([...quotes.splice(0, quotes.length-1)]); };
  const handleRemoveTag = () => { setTags([...tags.splice(0, tags.length-1)]); };

  const renderArray = (array = [], identifier = '') => {
    return array.map((key, index) => {
      const comma = (index !== array.length -1) ? ', ' : '';
      const display = (!!identifier) ? key[identifier] : key;
      return (<React.Fragment key={index}>{display}{comma}</React.Fragment>);
    });
  };

  return (
    <Grid container spacing={0}>
      <Grid xs={12} sm={12}>
        <p><strong>Create Article JSON</strong></p>
        <p><button onClick={handleCreateClick}>Create JSON</button></p>
      </Grid>
      <Grid xs={12} sm={1}></Grid>
      <Grid xs={12} sm={2}>
        <label forHtml="title">Title:</label><br/>
        <input name="title" onChange={event => setTitle(event.target.value)} type="text" value={title} />
      </Grid>
      <Grid xs={12} sm={2}>
        <label forHtml="author">Author:</label><br/>
        <input name="author" onChange={event => setAuthor(event.target.value)} type="text" value={author} />
      </Grid>
      <Grid xs={12} sm={2}>
        <label forHtml="publishDate">Publish Date:</label><br/>
        <input name="publishDate" onChange={event => setPublishDate(event.target.value)} type="date" value={publishDate} />
      </Grid>
      <Grid xs={12} sm={2}>
        <label forHtml="publisher">Publisher:</label><br/>
        <input name="publisher" onChange={event => setPublisher(event.target.value)} type="text" value={publisher} />
      </Grid>
      <Grid xs={12} sm={2}>
        <label forHtml="url">URL:</label><br/>
        <input name="url" onChange={event => setUrl(event.target.value)} type="text" value={url} />
      </Grid>
      <Grid xs={12} sm={1}></Grid>
      <Grid xs={12} sm={3}>
        <h4>Description</h4>
        <label forHtml="description">Description:</label><br/>
        <textarea name="description" onChange={event => setDescription(event.target.value)} value={description}></textarea>
      </Grid>
      <Grid xs={12} sm={3}>
        <h4>Add Comment</h4>
        <label forHtml="comments">Comments: {renderArray(comments, 'comment')}</label>
        <p>
          <textarea name="comments" onChange={event => setComment(event.target.value)} value={comment}></textarea>
        </p>
        <button onClick={handleAddComment}>Add a new Comment</button>
        <button onClick={handleRemoveComment}>Remove last Comment</button>
      </Grid>
      <Grid xs={12} sm={3}>
        <h4>Add Quote</h4>
        <label forHtml="quote">Quotes: {renderArray(quotes, 'quote')}</label>
        <p>
          <textarea name="quote" onChange={event => setQuote(event.target.value)} value={quote}></textarea>
        </p>
        <button onClick={handleAddQuote}>Add a new Quote</button>
        <button onClick={handleRemoveQuote}>Clear last Quote</button>
      </Grid>
      <Grid xs={12} sm={3}>
        <h4>Add Tag</h4>
        <label forHtml="tag">Tag: {renderArray(tags)}</label>
        <p>
          <textarea name="tag" onChange={event => setTag(event.target.value)} value={tag}></textarea>
        </p>
        <button onClick={handleAddTag}>Add a new Tag</button>
        <button onClick={handleRemoveTag}>Clear last Tag</button>
      </Grid>
      <Grid xs={12} sm={12}>
        <p>Payload: {payload}</p>
      </Grid>
    </Grid>);
};

export default input;
