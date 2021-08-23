import React, { Fragment, useEffect, useState } from "react";
import PropType from "prop-types";

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
  url: PropType.string,
};

const article = (props) => {
  // this may be a candidate for use redux
  const [author, setAuthor] = useState("");
  const [comments, setComments] = useState([]);
  const [createdDate, setCreatedDate] = useState("");
  const [description, setDescription] = useState("");
  const [publishDate, setPublishDate] = useState("");
  const [publisher, setPublisher] = useState("");
  const [quotes, setQuotes] = useState([]);
  const [showFull, setShowFull] = useState(false);
  const [tags, setTags] = useState([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    const {
      author,
      comments,
      createdDate,
      description,
      publishDate,
      publisher,
      quotes,
      showFull,
      tags,
      title,
      url,
    } = props;
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
    const includeComma = (index) => {
      return Array.isArray(tags) && index !== tags.length - 1 ? ", " : "";
    };
    return tags.length > 0 ? (
      tags.map((key, index) => {
        return (
          <i key={index}>
            {key}
            {includeComma(index)}
          </i>
        );
      })
    ) : (
      <i>No associated tags.</i>
    );
  };

  const renderArrayContent = (array = [], identifier = "") => {
    const bullet = <span>&#8226;</span>;
    return (
      !!identifier &&
      !!array.length &&
      array.map((key = {}, index) => {
        return (
          <div key={index}>
            {bullet} {key[identifier]}
          </div>
        );
      })
    );
  };

  const renderHeader = (title) => {
    return (
      <Fragment>
        <br />
        <div>
          <strong style={{ fontSize: "16px" }}>{title}</strong>
        </div>
      </Fragment>
    );
  };

  const renderArray = (array = [], identifier = "", title = "") => {
    return (
      Array.isArray(array) &&
      array.length > 0 && (
        <div>
          {renderHeader(title)}
          {renderArrayContent(array, identifier)}
        </div>
      )
    );
  };

  const renderTopSection = () => {
    const publishLink = url ? (
      <Fragment>
        <a href={url}>{publisher || url}</a>.
      </Fragment>
    ) : (
      !!publisher && <Fragment>{publisher}.</Fragment>
    );
    const publishLinkDisplay = !!publishLink && (
      <Fragment>
        <i>Source</i>: {publishLink}
      </Fragment>
    );
    const publishDateDisplay = !!publishDate && (
      <Fragment>({publishDate})</Fragment>
    );
    const authorComma =
      !!author && (!!publishLinkDisplay || !!publishDateDisplay) && ",";
    const authorDisplay = !!author && (
      <Fragment>
        {author}
        {authorComma}
      </Fragment>
    );
    return (
      <Fragment>
        <div style={{ fontSize: "24px", lineHeight: "28px" }}>{title}</div>
        <div style={{ fontSize: "12px" }}>
          {authorDisplay} {publishLinkDisplay} {publishDateDisplay}
        </div>
        <div style={{ fontSize: "12px" }}>
          <strong>Resource added</strong>: <i>{createdDate}</i>
        </div>
        <div style={{ fontSize: "18px", lineHeight: "24px" }}>
          {description}
        </div>
      </Fragment>
    );
  };

  const renderBottomSection = () => {
    const commentsDisplay = renderArray(comments, "comment", "Comments");
    const quotesDisplay = renderArray(quotes, "quote", "Quotes");
    const noContentDisplay = !commentsDisplay && !quotesDisplay && (
      <Fragment>
        {renderHeader("Comments/Quotes")}
        <div>No Comment or Quote content to display.</div>
      </Fragment>
    );
    return (
      !!showFull && (
        <Fragment>
          {commentsDisplay}
          {quotesDisplay}
          {noContentDisplay}
          <p>
            <strong>Tags</strong>: {renderTags()}
          </p>
        </Fragment>
      )
    );
  };

  return (
    <Fragment>
      {renderTopSection()}
      {renderBottomSection()}
    </Fragment>
  );
};

article.propTypes = propTypes;
export default article;
