import React, { Fragment } from "react";
import PropType from "prop-types";
import ArticleSectionHeader from "./articleSectionHeader";

const propTypes = {
  keyName: PropType.string,
  points: PropType.array,
  title: PropType.string,
};

const bullet = <span>&#8226;</span>;
const ArticleBulletPoints = ({ keyName = "", points = [], title = "" }) => {
  return (
    Array.isArray(points) &&
    points.length > 0 && (
      <Fragment>
        <ArticleSectionHeader title={title} />
        {!!keyName &&
          points.map((point, index) => {
            return (
              point &&
              point?.[keyName] && (
                <div key={point?.id || index}>
                  {bullet} {point[keyName]}
                </div>
              )
            );
          })}
      </Fragment>
    )
  );
};

ArticleBulletPoints.propTypes = propTypes;
export default ArticleBulletPoints;
