import React, { Fragment } from "react";
import PropType from "prop-types";
import ListBulletpoints from "../listBulletpoints";
import TagsDisplay from "../tagsDisplay";

const propTypes = {
  comments: PropType.array,
  definitions: PropType.array,
  quotes: PropType.array,
  resources: PropType.array,
  tags: PropType.array,
};

const BookLists = ({
  comments = [],
  definitions = [],
  quotes = [],
  resources = [],
  tags = [],
}) => {
  return (
    <Fragment>
      <ListBulletpoints keyName="comment" points={comments} title="Comments" />
      <ListBulletpoints keyName="quote" points={quotes} title="Quotes" />
      <ListBulletpoints
        keyName="definition"
        points={definitions}
        title="Definitions"
      />
      <ListBulletpoints
        keyName="resource"
        points={resources}
        title="Resources"
      />
      <TagsDisplay tags={tags} />
    </Fragment>
  );
};

BookLists.propTypes = propTypes;
export default BookLists;
