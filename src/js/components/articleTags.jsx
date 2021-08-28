import React from "react";
import PropType from "prop-types";

const includeComma = (index, length) => {
  return length > 1 && index !== length - 1 ? `, ` : "";
};

const noContent = <i>No associated tags.</i>;
const propTypes = { tags: PropType.array };
const ArticleTags = ({ tags = [] }) => {
  const length = Array.isArray(tags) ? tags.length : -1;
  return length > 0
    ? tags.map((key, index) => {
        return (
          !!key && (
            <i key={index}>
              {key}
              {includeComma(index, length)}
            </i>
          )
        );
      })
    : noContent;
};

ArticleTags.propTypes = propTypes;
export default ArticleTags;
