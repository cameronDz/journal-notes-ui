import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropType from 'prop-types';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import TextField from '@material-ui/core/TextField';
import Card from '../../card';

import { getIndex, postArticle, putIndex } from './state/actions';
import { downloadJson } from '../../../libs/download';
import { generateDateString } from '../../../libs/date';

const propTypes = {
  getIndex: PropType.func,
  isLoadingIndex: PropType.bool,
  isProcessingArticle: PropType.bool,
  isProcessingIndex: PropType.bool,
  latestIndex: PropType.arrayOf(PropType.string),
  latestUploadKey: PropType.string,
  postArticle: PropType.func,
  putIndex: PropType.func
};

const buttonContainerStyle = { marginTop: '12px', padding: '4px', textAlign: 'center' };
const buttonStyle = { marginBottom: '8px', marginRight: '16px', width: '200px' };
const buttonTitleDownload = 'Download article notes in JSON format';
const buttonTitleReset = 'Clear input of article notes';
const buttonTitleUpload = 'Upload article notes to S3';
const buttonVariant = 'outlined';

const input = ({ getIndex, isLoadingIndex, isProcessingArticle, isProcessingIndex, latestIndex, latestUploadKey, postArticle, putIndex }) => {
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

  const [isProcessing, setIsProcessing] = useState(false);
  const [hasStartedIndexPut, setHasStartedIndexPut] = useState(false);

  useEffect(() => {
    setIsProcessing((isLoadingIndex) || (isProcessingArticle) || (isProcessingIndex));
  }, [isLoadingIndex, isProcessingArticle, isProcessingIndex]);

  useEffect(() => {
    if ((!isRequestingData()) && (!!latestUploadKey)) {
      getIndex();
    }
  }, [isProcessingArticle]);

  useEffect(() => {
    if ((hasStartedIndexPut) && (!isProcessingIndex)) {
      clearForm();
      setHasStartedIndexPut(false);
    }
  }, [isProcessingIndex]);

  useEffect(() => {
    if ((!isRequestingData()) && (Array.isArray(latestIndex)) && (!!latestUploadKey)) {
      const newIndex = [...latestIndex, latestUploadKey];
      putIndex(newIndex);
      setHasStartedIndexPut(true);
    }
  }, [isLoadingIndex]);

  const isRequestingData = () => {
    return ((isLoadingIndex) || (isProcessingArticle) || (isProcessingIndex));
  };

  const handleClearClick = () => {
    clearForm();
  };

  const clearForm = () => {
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
    postArticle(payload);
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

  const handleRemoveComment = () => {
    if (comment) {
      setComment('');
    } else {
      const index = Array.isArray(comments) && comments.length > 0 ? comments.length - 1 : 0;
      const oldComment = comments[index] ? comments[index].comment : '';
      setComment(oldComment);
      setComments([...comments.splice(0, index)]);
    }
  };

  const handleRemoveQuote = () => {
    if (quote) {
      setQuote('');
    } else {
      const index = Array.isArray(quotes) && quotes.length > 0 ? quotes.length - 1 : 0;
      const oldQuote = quotes[index] ? quotes[index].quote : '';
      setQuote(oldQuote);
      setQuotes([...quotes.splice(0, index)]);
    }
  };

  const handleRemoveTag = () => {
    if (tag) {
      setTag('');
    } else {
      const index = Array.isArray(tags) && tags.length > 0 ? tags.length - 1 : 0;
      setTag(tags[index]);
      setTags([...tags.splice(0, index)]);
    }
  };

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
      <Grid item xs={12} sm={12} md={4}>
        <Grid item xs={12}>
          <TextField fullWidth disabled={isProcessing} label="Title" onChange={event => setTitle(event.target.value)} value={title}></TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth disabled={isProcessing} label="Author" onChange={event => setAuthor(event.target.value)} value={author}></TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Publish Date"
            disabled={isProcessing}
            onChange={event => setPublishDate(event.target.value)}
            type="date"
            value={publishDate}
            InputLabelProps={{ shrink: true }}>
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth disabled={isProcessing} label="Publisher" onChange={event => setPublisher(event.target.value)} value={publisher}></TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth disabled={isProcessing} label="URL" onChange={event => setUrl(event.target.value)} value={url}></TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth disabled={isProcessing} label="Tag" onChange={event => setTag(event.target.value)} onKeyDown={event => handleKeyDown(event, 'Tag')} value={tag}></TextField>
          <Button style={{ marginRight: '16px' }} disabled={((isProcessing) || (!tag))} onClick={handleAddTag}>Add Tag</Button>
          <Button disabled={((isProcessing) || ((!tag) && (!(tags.length > 0))))} onClick={handleRemoveTag}>{tag ? 'Clear Tag' : 'Remove Tag'}</Button>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={12} md={1}>
      </Grid>
      <Grid item xs={12} sm={12} md={7}>
        <Grid item xs={12}>
          <TextField fullWidth multiline disabled={isProcessing} rows={3} label="Description" onChange={event => setDescription(event.target.value)} value={description}></TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth multiline disabled={isProcessing} rows={3} label="Comments" onChange={event => setComment(event.target.value)} onKeyDown={event => handleKeyDown(event, 'Comments')} value={comment}></TextField>
          <Button style={{ marginRight: '16px' }} disabled={((isProcessing) || (!comment))} onClick={handleAddComment}>Add Comment</Button>
          <Button disabled={((isProcessing) || ((!comment) && (!(comments.length > 0))))} onClick={handleRemoveComment}>{comment ? 'Clear Comment' : 'Remove Comment'}</Button>
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth multiline disabled={isProcessing} rows={3} label="Quotes" onChange={event => setQuote(event.target.value)} onKeyDown={event => handleKeyDown(event, 'Quotes')} value={quote}></TextField>
          <Button style={{ marginRight: '16px' }} disabled={((isProcessing) || (!quote))} onClick={handleAddQuote}>Add Quote</Button>
          <Button disabled={((isProcessing) || ((!quote) && (!(quotes.length > 0))))} onClick={handleRemoveQuote}>{quote ? 'Clear Quote' : 'Remove Quote'}</Button>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        {getProcessIndicator()}
      </Grid>
      <Grid item xs={12}>
        <div style={{ fontSize: '20px', marginBottom: '12px' }}>Card Preview</div>
        {getPreview()}
      </Grid>
      <Grid style={buttonContainerStyle} item xs={12}>
        <Button disabled={isProcessing} style={buttonStyle} title={buttonTitleUpload} variant={buttonVariant} onClick={handleUploadClick}>
          Upload
        </Button>
        <Button disabled={isProcessing} style={buttonStyle} title={buttonTitleDownload} variant={buttonVariant} onClick={handleDownloadClick}>
          Download
        </Button>
        <Button disabled={isProcessing} style={buttonStyle} title={buttonTitleReset} variant={buttonVariant} onClick={handleClearClick}>
          Reset
        </Button>
      </Grid>
    </Grid>);
};

input.propTypes = propTypes;
const mapStateToProps = state => ({
  isLoadingIndex: state.input.isLoadingIndex,
  isProcessingArticle: state.input.isProcessingArticle,
  isProcessingIndex: state.input.isProcessingIndex,
  latestIndex: state.input.latestIndex,
  latestUploadKey: state.input.latestUploadKey
});
const mapDispatchToProps = { getIndex, postArticle, putIndex };
export default connect(mapStateToProps, mapDispatchToProps)(input);
