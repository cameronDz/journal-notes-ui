import React, { Fragment } from "react";
import PropType from "prop-types";
import ArticleDetails from "./articleDetails";
import ArticleOverview from "./articleOverview";

const propTypes = {
  author: PropType.string,
  comments: PropType.array,
  createdDate: PropType.string,
  definitions: PropType.array,
  description: PropType.string,
  publishDate: PropType.string,
  publisher: PropType.string,
  quotes: PropType.array,
  showFull: PropType.bool,
  tags: PropType.array,
  terms: PropType.array,
  title: PropType.string,
  url: PropType.string,
};

const Article = ({
  author,
  comments,
  createdDate,
  definitions,
  description,
  publishDate,
  publisher,
  quotes,
  showFull,
  tags,
  terms,
  title,
  url,
}) => {
  return (
    <Fragment>
      <ArticleOverview
        author={author}
        createdDate={createdDate}
        description={description}
        publishDate={publishDate}
        publisher={publisher}
        title={title}
        url={url}
      />
      {!!showFull && (
        <ArticleDetails
          comments={comments}
          definitions={definitions}
          quotes={quotes}
          tags={tags}
          terms={terms}
        />
      )}
    </Fragment>
  );
};

Article.propTypes = propTypes;
export default Article;
