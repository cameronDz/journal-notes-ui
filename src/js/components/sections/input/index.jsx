import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropType from 'prop-types';
import Grid from '@material-ui/core/Grid';

import Card from '../../card';

import { uploadArticle } from './state/actions';
import { downloadJson } from '../../../libs/download';
import { generateDateString } from '../../../libs/date';

const PREVIEW_CARD_TITLE = 'Click to Preview Card';
const REMOVE_CARD_TITLE = 'Click to Remove Preview';

const propTypes = { uploadArticle: PropType.func };
const input = ({ uploadArticle }) => {
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
  const [previewTitle, setPreviewTitle] = useState(PREVIEW_CARD_TITLE);
  const [isPreviewing, setIsPreviewing] = useState(false);

  const handleClearClick = () => {
    setAuthor('');
    setDescription('');
    setPublishDate('');
    setPublisher('');
    setTitle('');
    setUrl('');
    setComment('');
    setComments([]);
    setQuote('');
    setQuotes([]);
    setTag('');
    setTags([]);
    setPayload('');
  };

  const handleUploadClick = () => {
    if (payload) {
      uploadArticle(payload);
    }
  };

  const handleDownloadClick = () => {
    if (payload) {
      downloadJson(JSON.parse(payload));
    }
  };

  const handleCreateClick = () => {
    handleAddComment();
    handleAddQuote();
    handleAddTag();
    const obj = { author, comments, description, publishDate, publisher, quotes, tags, title, url, createdDate: generateDateString() };
    setPayload(JSON.stringify(obj));
  };

  const handlePreviewClick = () => {
    const previewing = !isPreviewing;
    const title = previewing ? REMOVE_CARD_TITLE : PREVIEW_CARD_TITLE;
    setIsPreviewing(previewing);
    setPreviewTitle(title);
  };

  const handleAddComment = () => {
    if (comment) {
      setComments([...comments, { comment, createdDate: generateDateString() }]);
      setComment('');
    }
  };

  const handleAddQuote = () => {
    if (quote) {
      setQuotes([...quotes, { quote, createdDate: generateDateString() }]);
      setQuote('');
    }
  };

  const handleAddTag = () => {
    if (tag) {
      setTags([...tags, tag]);
      setTag('');
    }
  };

  const handleRemoveComment = () => { setComments([...comments.splice(0, comments.length - 1)]); };
  const handleRemoveQuote = () => { setQuotes([...quotes.splice(0, quotes.length - 1)]); };
  const handleRemoveTag = () => { setTags([...tags.splice(0, tags.length - 1)]); };

  const getPreview = () => {
    const content = (!!title && (comments.length || quotes.length))
      ? getCard()
      : <div>No preview availabe without a title and a comment/quote from article.</div>;
    return !!isPreviewing && (
      <Grid item sm={12}>
        {content}
      </Grid>);
  };

  const getCard = () => {
    const key = { author, comments, description, publishDate, publisher, quotes, tags, title, url };
    return <Card articleData={key} />;
  };

  const renderArray = (array = [], identifier = '') => {
    return array.map((key, index) => {
      const comma = (index !== array.length - 1) ? ', ' : '';
      const display = (identifier) ? key[identifier] : key;
      return (<Fragment key={index}>{display}{comma}</Fragment>);
    });
  };

  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <h2>Create Article JSON</h2>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Grid item xs={12}>
          <label forhtml="title">Title:</label><br/>
          <input style={{ marginBottom: '8px', width: '90%' }} name="title" onChange={event => setTitle(event.target.value)} type="text" value={title} />
        </Grid>
        <Grid item xs={12}>
          <label forhtml="author">Author:</label><br/>
          <input style={{ marginBottom: '8px', width: '90%' }} name="author" onChange={event => setAuthor(event.target.value)} type="text" value={author} />
        </Grid>
        <Grid item xs={12}>
          <label forhtml="publishDate">Publish Date:</label><br/>
          <input style={{ marginBottom: '8px', width: '90%' }} name="publishDate" onChange={event => setPublishDate(event.target.value)} type="date" value={publishDate} />
        </Grid>
        <Grid item xs={12}>
          <label forhtml="publisher">Publisher:</label><br/>
          <input style={{ marginBottom: '8px', width: '90%' }} name="publisher" onChange={event => setPublisher(event.target.value)} type="text" value={publisher} />
        </Grid>
        <Grid item xs={12}>
          <label forhtml="url">URL:</label><br/>
          <input style={{ marginBottom: '8px', width: '90%' }} name="url" onChange={event => setUrl(event.target.value)} type="text" value={url} />
        </Grid>
        <Grid item xs={12}>
          <label forhtml="tag">Tag: {renderArray(tags)}</label><br/>
          <input style={{ marginBottom: '4px', width: '90%' }} name="tag" onChange={event => setTag(event.target.value)} value={tag} />
          <button style={{ marginRight: '16px' }} onClick={handleAddTag}>Add a new Tag</button>
          <button style={{ marginBottom: '8px' }} onClick={handleRemoveTag}>Clear last Tag</button>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={8}>
        <Grid item xs={12}>
          <label forhtml="description">Description:</label><br/>
          <textarea style={{ width: '100%' }} name="description" onChange={event => setDescription(event.target.value)} value={description}></textarea>
        </Grid>
        <Grid item xs={12}>
          <label forhtml="comments">Comments: {renderArray(comments, 'comment')}</label><br/>
          <textarea style={{ width: '100%' }} name="comments" onChange={event => setComment(event.target.value)} value={comment}></textarea>
          <button style={{ marginRight: '16px' }} onClick={handleAddComment}>Add a new Comment</button>
          <button style={{ marginBottom: '8px' }} onClick={handleRemoveComment}>Remove last Comment</button>
        </Grid>
        <Grid item xs={12}>
          <label forhtml="quote">Quotes: {renderArray(quotes, 'quote')}</label><br/>
          <textarea style={{ width: '100%' }} name="quote" onChange={event => setQuote(event.target.value)} value={quote}></textarea>
          <button style={{ marginRight: '16px' }} onClick={handleAddQuote}>Add a new Quote</button>
          <button style={{ marginBottom: '8px' }} onClick={handleRemoveQuote}>Clear last Quote</button>
        </Grid>
      </Grid>
      <Grid style={{ border: '1px solid grey', padding: '4px' }} item xs={12}>
        <button style={{ marginRight: '16px', marginBottom: '8px' }} onClick={handleDownloadClick}>Download JSON Payload</button>
        <button style={{ marginRight: '16px', marginBottom: '8px' }} onClick={handleUploadClick}>Upload JSON to S3</button>
        <button style={{ marginRight: '16px', marginBottom: '8px' }} onClick={handleClearClick}>Clear Payload</button>
        <Grid item md={3} sm={6} xs={12}></Grid>
        <Grid item md={3} sm={6} xs={12}><button onClick={handleCreateClick}>Create JSON</button></Grid>
        <Grid item xs={12}><p>{' Payload: ' + payload}</p></Grid>
      </Grid>
      <Grid item xs={12}>
        <button style={{ marginRight: '16px', marginBottom: '8px' }} onClick={handlePreviewClick}>{previewTitle}</button>
      </Grid>
      <Grid item xs={12}>
        {getPreview()}
      </Grid>
    </Grid>);
};

input.propTypes = propTypes;
const mapStateToProps = null;
export default connect(mapStateToProps, { uploadArticle })(input);
