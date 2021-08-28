import React, { Fragment } from "react";
import PropType from "prop-types";
import ArticleBulletPoints from "./articleBulletPoints";
import ArticleSectionHeader from "./articleSectionHeader";
import ArticleTags from "./ArticleTags";

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

const Article = ({
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
}) => {
  const renderTopSection = () => {
    const display = publisher || url || "";
    const link = display && url ? <a href={url}>{display}</a> : display;
    const sourceDisplay = link && (
      <Fragment>
        <i>Source</i>
        {`: ${link}.`}
      </Fragment>
    );

    const publishDateDisplay = publishDate || "";
    const comma = !!author && (!!sourceDisplay || !!publishDateDisplay) && ",";
    const authorDisplay = !!author && (
      <Fragment>
        {author}
        {comma}
      </Fragment>
    );
    return (
      <Fragment>
        <div style={{ fontSize: "24px", lineHeight: "28px" }}>{title}</div>
        <div style={{ fontSize: "12px" }}>
          {authorDisplay} {sourceDisplay} {publishDateDisplay}
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
    return (
      !!showFull && (
        <Fragment>
          <ArticleBulletPoints
            keyName="comments"
            points={comments}
            title="Comments"
          />
          <ArticleBulletPoints keyName="quote" points={quotes} title="Quotes" />
          {(!Array.isArray(comments) || comments?.length < 1) &&
            (!Array.isArray(quotes) || quotes?.length < 1) && (
              <Fragment>
                <ArticleSectionHeader title={"Comments/Quotes"} />
                <div>No Comment or Quote content to display.</div>
              </Fragment>
            )}
          <ArticleTags tags={tags} />
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

Article.propTypes = propTypes;
export default Article;
