import React, { Fragment } from "react";
import PropType from "prop-types";
import { hasItems } from "../../../libs/arrays";
import ListBulletpoints from "../listBulletpoints";
import SectionHeader from "../sectionHeader";
import TagsDisplay from "../tagsDisplay";

const propTypes = {
  comments: PropType.array,
  definitions: PropType.array,
  quotes: PropType.array,
  resources: PropType.array,
  tags: PropType.array,
  terms: PropType.array,
};
const textNoContent = "No Comment or Quote content to display.";
const ArticleDetails = ({
  comments = [],
  definitions = [],
  quotes = [],
  resources = [],
  tags = [],
  terms = [],
}) => {
  return (
    <Fragment>
      <ListBulletpoints keyName="comment" points={comments} title="Comments" />
      <ListBulletpoints keyName="quote" points={quotes} title="Quotes" />
      <ListBulletpoints
        keyName="resource"
        points={resources}
        title="Resources"
      />
      <ListBulletpoints
        keyName="definition"
        points={definitions}
        title="Definitions"
      />
      <ListBulletpoints keyName="term" points={terms} title="Terms" />
      {!hasItems(comments) && !hasItems(quotes) && !hasItems(definitions) && (
        <Fragment>
          <SectionHeader title={"Comments/Quotes"} />
          <div>{textNoContent}</div>
        </Fragment>
      )}
      <TagsDisplay tags={tags} />
    </Fragment>
  );
};

ArticleDetails.propTypes = propTypes;
export default ArticleDetails;
