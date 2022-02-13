import React, { Fragment } from "react";
import PropType from "prop-types";
import ArticleDetails from "./articleDetails";
import ArticleOverview from "./articleOverview";

const propTypes = {
  author: PropType.string,
  comments: PropType.array,
  createdDate: PropType.string,
  defintions: PropType.array,
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
  defintions,
  description,
  publishDate,
  publisher,
  quotes,
  showFull,
  tags,
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
          definitions={defintions}
          quotes={quotes}
          tags={tags}
        />
      )}
    </Fragment>
  );
};

Article.propTypes = propTypes;
export default Article;
