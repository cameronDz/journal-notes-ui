import React, { Fragment } from "react";
import PropType from "prop-types";
import ArticleBulletPoints from "./articleBulletPoints";
import ArticleSectionHeader from "./articleSectionHeader";
import ArticleTags from "./ArticleTags";

const propTypes = {
  comments: PropType.array,
  quotes: PropType.array,
  tags: PropType.array,
};
const textNoContent = "No Comment or Quote content to display.";
const ArticleDetails = ({ comments, quotes, tags }) => {
  return (
    <Fragment>
      <ArticleBulletPoints
        keyName="comment"
        points={comments}
        title="Comments"
      />
      <ArticleBulletPoints keyName="quote" points={quotes} title="Quotes" />
      {(!Array.isArray(comments) || comments?.length < 1) &&
        (!Array.isArray(quotes) || quotes?.length < 1) && (
          <Fragment>
            <ArticleSectionHeader title={"Comments/Quotes"} />
            <div>{textNoContent}</div>
          </Fragment>
        )}
      <ArticleTags tags={tags} />
    </Fragment>
  );
};

ArticleDetails.propTypes = propTypes;
export default ArticleDetails;
