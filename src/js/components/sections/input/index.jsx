import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropType from 'prop-types';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import TextField from '@material-ui/core/TextField';
import Card from '../../card';

import { uploadArticle, updateIndex } from './state/actions';
import { downloadJson } from '../../../libs/download';
import { generateDateString } from '../../../libs/date';

const propTypes = {
  index: PropType.arrayOf(PropType.number | PropType.string),
  isProcessing: PropType.bool,
  latestUploadKey: PropType.string,
  uploadArticle: PropType.func
};

const input = ({ index, isProcessing, latestUploadKey, uploadArticle, updateIndex }) => {
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

  useEffect(() => {
    if (!isProcessing && !!latestUploadKey) {
      addUploadToIndex();
    }
  }, [isProcessing]);

  const addUploadToIndex = () => {
    if (!!index && !!index.length && !index.includes(latestUploadKey)) {
      const newIndex = [...index, latestUploadKey];
      updateIndex(newIndex);
    }
  };

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
  };

  const handleUploadClick = () => {
    const payload = generatePayload();
    uploadArticle(payload);
  };

  const handleDownloadClick = () => {
    const payload = generatePayload();
    downloadJson(JSON.stringify(payload));
  };

  const generatePayload = () => {
    handleAddComment();
    handleAddQuote();
    handleAddTag();
    return generateCardPayload();
  };

  const generateCardPayload = () => {
    return { author, comments, description, publishDate, publisher, quotes, tags, title, url, createdDate: generateDateString() };
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

  const handleKeyDown = (event, field) => {
    if (event && event.key === 'Enter') {
      if (field === 'Tag') {
        handleAddTag();
      } else if (field === 'Comments') {
        handleAddComment();
      } else if (field === 'Quotes') {
        handleAddQuote();
      }
    }
  };

  const getPreview = () => {
    return (
      <Grid item sm={12}>
        <Card articleData={generateCardPayload()} show={true} />
      </Grid>);
  };

  const getProcessIndicator = () => {
    return !!isProcessing && (<LinearProgress />);
  };

  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <h2>Article Review</h2>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Grid item xs={12}>
          <TextField fullWidth label="Title" onChange={event => setTitle(event.target.value)} value={title}></TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth label="Author" onChange={event => setAuthor(event.target.value)} value={author}></TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Publish Date"
            onChange={event => setPublishDate(event.target.value)}
            type="date"
            value={publishDate}
            InputLabelProps={{ shrink: true }}>
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth label="Publisher" onChange={event => setPublisher(event.target.value)} value={publisher}></TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth label="URL" onChange={event => setUrl(event.target.value)} value={url}></TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth label="Tag" onChange={event => setTag(event.target.value)} onKeyDown={event => handleKeyDown(event, 'Tag')} value={tag}></TextField>
          <Button style={{ marginRight: '16px' }} onClick={handleAddTag} disabled={!tag}>Add Tag</Button>
          <Button onClick={handleRemoveTag} disabled={!tags.length}>Remove Tag</Button>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={1}>
      </Grid>
      <Grid item xs={12} sm={7}>
        <Grid item xs={12}>
          <TextField fullWidth multiline rows={3} label="Description" onChange={event => setDescription(event.target.value)} value={description}></TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth multiline rows={3} label="Comments" onChange={event => setComment(event.target.value)} onKeyDown={event => handleKeyDown(event, 'Comments')} value={comment}></TextField>
          <Button style={{ marginRight: '16px' }} onClick={handleAddComment} disabled={!comment}>Add Comment</Button>
          <Button onClick={handleRemoveComment} disabled={!comments.length}>Remove Comment</Button>
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth multiline rows={3} label="Quotes" onChange={event => setQuote(event.target.value)} onKeyDown={event => handleKeyDown(event, 'Quotes')} value={quote}></TextField>
          <Button style={{ marginRight: '16px' }} onClick={handleAddQuote} disabled={!quote}>Add Quote</Button>
          <Button onClick={handleRemoveQuote} disabled={!quotes.length}>Remove Quote</Button>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        {getProcessIndicator()}
      </Grid>
      <Grid item xs={12}>
        <div style={{ fontSize: '20px', marginBottom: '12px' }}>Card Preview</div>
        {getPreview()}
      </Grid>
      <Grid style={{ marginTop: '12px', padding: '4px' }} item xs={12}>
        <Button variant="outlined" disabled={isProcessing} style={{ marginRight: '16px', marginBottom: '8px' }} onClick={handleDownloadClick}>Download form Data</Button>
        <Button variant="outlined" disabled={isProcessing} style={{ marginRight: '16px', marginBottom: '8px' }} onClick={handleUploadClick}>Upload form Data to S3</Button>
        <Button variant="outlined" disabled={isProcessing} style={{ marginRight: '16px', marginBottom: '8px' }} onClick={handleClearClick}>Clear Form</Button>
      </Grid>
    </Grid>);
};

input.propTypes = propTypes;
const mapStateToProps = state => ({ index: state.articles.index, isProcessing: state.input.processingUpload, latestUploadKey: state.input.latestUploadKey });
export default connect(mapStateToProps, { uploadArticle, updateIndex })(input);
